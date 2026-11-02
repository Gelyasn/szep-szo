// node scripts/build-manifest.cjs [utterances.json]
// Источник текстов — data.js. Manifest нужен для воспроизведения статических MP3.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root, 'logic.js'), 'utf8'), context);
const data = context.HU_DATA;
const phrases = [
  ...data.lessons.flatMap(lesson => [...lesson.rules.map(rule => rule.example), ...lesson.words.map(word => word[0])]),
  ...data.phrases.flatMap(section => section.items.map(item => item[0]))
];
const content = data.lessons.flatMap(lesson => [
  lesson.intro, lesson.title, lesson.subtitle,
  ...lesson.rules.flatMap(rule => [rule.title, rule.text, rule.example, rule.translation]),
  ...lesson.words.flat(),
  ...lesson.quiz.flatMap(question => [question.prompt, question.explain, question.answer, ...(question.answers || []), ...(question.options || [])])
]).concat(data.phrases.flatMap(section => [section.category, ...section.items.flat()]), ['Szia', 'szép szó', 'magyar nyelv']);
const tokens = content.filter(value => typeof value === 'string').flatMap(value => context.HuLogic.hungarianTokens(value));
const manifest = Object.fromEntries([...new Set([...phrases, ...tokens])].map(text => [
  text, `audio/v2/${createHash('sha256').update(text).digest('hex').slice(0, 16)}.mp3`
]));
fs.writeFileSync(path.join(root, 'audio-manifest.js'), `// Создан автоматически: node scripts/build-manifest.cjs\nwindow.HU_AUDIO = ${JSON.stringify(manifest, null, 2)};\n`);
if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(manifest, null, 2));
console.log(`${Object.keys(manifest).length} уникальных записей`);
