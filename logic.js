(function (root) {
  'use strict';

  const intervals = [1, 3, 7, 14, 30];
  const day = 24 * 60 * 60 * 1000;

  function normalizeAnswer(value) {
    return String(value).normalize('NFC').trim().toLocaleLowerCase('hu-HU')
      .replace(/[.!?…]+$/u, '').trim().replace(/\s+/gu, ' ');
  }

  function hungarianTokens(value) {
    return [...String(value).matchAll(/[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+/gu)]
      .map(match => match[0].toLocaleLowerCase('hu-HU'));
  }

  function isCorrect(question, value) {
    const possible = question.answers || [question.answer];
    return possible.some(answer => normalizeAnswer(answer) === normalizeAnswer(value));
  }

  function initialState() {
    return { completed: {}, visited: [], cards: {} };
  }

  function restoreState(raw, lessons) {
    const state = initialState();
    if (!raw || typeof raw !== 'object') return state;
    const known = new Map(lessons.map(lesson => [lesson.id, lesson]));
    if (Array.isArray(raw.visited)) state.visited = [...new Set(raw.visited.filter(id => known.has(id)))];
    if (raw.completed && typeof raw.completed === 'object') {
      for (const id of known.keys()) {
        if (raw.completed[id] === true) state.completed[id] = true;
      }
    }
    if (raw.cards && typeof raw.cards === 'object') {
      for (const [key, value] of Object.entries(raw.cards)) {
        const [id, position] = key.split(':');
        const lesson = known.get(id);
        if (!lesson || !/^(0|[1-9]\d*)$/.test(position) || +position >= lesson.words.length) continue;
        if (!value || !Number.isInteger(value.level) || value.level < 0 || value.level > intervals.length ||
            !Number.isFinite(value.due) || value.due < 0) continue;
        state.cards[key] = { level: value.level, due: value.due };
      }
    }
    return state;
  }

  function cardsForPractice(state, lessons, now = Date.now()) {
    const cards = [];
    for (const lesson of lessons) {
      if (!state.visited.includes(lesson.id)) continue;
      lesson.words.forEach(([word, translation], index) => {
        const key = `${lesson.id}:${index}`;
        const record = state.cards[key];
        if (!record || record.due <= now) cards.push({ key, word, translation, lesson: lesson.title });
      });
    }
    return cards;
  }

  function practiceStats(state, lessons, now = Date.now()) {
    let total = 0;
    for (const lesson of lessons) if (state.visited.includes(lesson.id)) total += lesson.words.length;
    return { total, due: cardsForPractice(state, lessons, now).length };
  }

  function updateCard(state, key, remembered, now = Date.now()) {
    const previous = state.cards[key];
    const level = remembered ? Math.min((previous?.level || 0) + 1, intervals.length) : 0;
    state.cards[key] = { level, due: now + (remembered ? intervals[level - 1] * day : 10 * 60 * 1000) };
    return state.cards[key];
  }

  root.HuLogic = { normalizeAnswer, hungarianTokens, isCorrect, initialState, restoreState, cardsForPractice, practiceStats, updateCard };
})(typeof window !== 'undefined' ? window : globalThis);
