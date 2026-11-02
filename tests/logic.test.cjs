const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const context = vm.createContext({});
for (const file of ['data.js', 'logic.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
}
const { HuLogic: logic, HU_DATA: data } = context;
const audioContext = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'audio-manifest.js'), 'utf8'), audioContext);

test('12 lessons have rules, vocab and answerable questions', () => {
  assert.equal(data.lessons.length, 12);
  assert.equal(new Set(data.lessons.map(lesson => lesson.id)).size, 12);
  for (const lesson of data.lessons) {
    assert.ok(lesson.rules.length >= 2);
    assert.ok(lesson.words.length >= 6);
    assert.equal(lesson.quiz.length, 4);
    for (const question of lesson.quiz) {
      assert.ok(question.explain);
      if (question.type === 'choice') assert.ok(question.options.includes(question.answer));
      else assert.ok(question.answers.length);
    }
  }
});

test('answers ignore case, final punctuation and whitespace but retain accents', () => {
  const q = { answers: ['Köszönöm'] };
  assert.equal(logic.isCorrect(q, '  KÖSZÖNÖM!  '), true);
  assert.equal(logic.isCorrect(q, 'koszonom'), false);
  assert.equal(logic.isCorrect({ answer: 'Anna vagyok' }, ' ANNA   VAGYOK. '), true);
});

test('restores only valid progress', () => {
  const raw = { visited: ['sounds', 'sounds', 'absent'], completed: { sounds: true, absent: true },
    cards: { 'sounds:0': { level: 2, due: 100 }, 'sounds:99': { level: 1, due: 5 }, 'absent:0': { level: 1, due: 5 } } };
  const state = logic.restoreState(raw, data.lessons);
  assert.deepEqual(Array.from(state.visited), ['sounds']);
  assert.deepEqual(Object.keys(state.completed), ['sounds']);
  assert.deepEqual(Object.keys(state.cards), ['sounds:0']);
});

test('cards are due immediately, then after 1/3 days; forgotten after 10 min', () => {
  const state = logic.initialState();
  state.visited.push('sounds');
  assert.equal(logic.practiceStats(state, data.lessons, 1000).due, 6);
  logic.updateCard(state, 'sounds:0', true, 1000);
  assert.equal(state.cards['sounds:0'].due, 1000 + 86400000);
  assert.equal(logic.practiceStats(state, data.lessons, 1000).due, 5);
  logic.updateCard(state, 'sounds:0', true, 1000 + 86400000);
  assert.equal(state.cards['sounds:0'].due, 1000 + 4 * 86400000);
  logic.updateCard(state, 'sounds:0', false, 1000);
  assert.equal(state.cards['sounds:0'].due, 1000 + 600000);
  assert.equal(logic.practiceStats(state, data.lessons, 1000 + 600000).due, 6);
});

test('every speaking button has a real MP3 file', () => {
  const expected = [
    ...data.lessons.flatMap(lesson => [...lesson.rules.map(rule => rule.example), ...lesson.words.map(word => word[0])]),
    ...data.phrases.flatMap(section => section.items.map(item => item[0]))
  ];
  const audio = audioContext.window.HU_AUDIO;
  assert.equal(Object.keys(audio).length, new Set(expected).size);
  for (const text of expected) {
    assert.ok(audio[text], `No recording for ${text}`);
    const file = path.join(__dirname, '..', audio[text]);
    assert.ok(fs.statSync(file).size > 1000, `Empty recording for ${text}`);
  }
});
