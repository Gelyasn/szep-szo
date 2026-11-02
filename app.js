(function () {
  'use strict';

  const data = window.HU_DATA;
  const logic = window.HuLogic;
  const main = document.querySelector('#main');
  const nav = document.querySelector('#nav');
  const mobileNav = document.querySelector('#mobile-nav');
  const storeKey = 'szep-szo-progress-v1';
  const audioSpeedKey = 'szep-szo-audio-speed-v1';
  const audioRates = { slower: .68, slow: .85, normal: 1 };
  let state;
  try { state = logic.restoreState(JSON.parse(localStorage.getItem(storeKey)), data.lessons); }
  catch { state = logic.initialState(); }
  let audioSpeed = 'slow';
  try { if (Object.hasOwn(audioRates, localStorage.getItem(audioSpeedKey))) audioSpeed = localStorage.getItem(audioSpeedKey); }
  catch { /* Без localStorage скорость останется на значении по умолчанию. */ }

  const quizSession = new Map();
  let practice = { queue: [], current: 0, revealed: false, count: 0 };
  let toastTimer;
  let currentAudio;

  function save() {
    try { localStorage.setItem(storeKey, JSON.stringify(state)); }
    catch { toast('Браузер не сохранил прогресс: проверьте настройки хранилища.'); }
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }

  function toast(message) {
    const element = document.querySelector('#toast');
    element.textContent = message;
    element.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove('visible'), 3500);
  }

  function speaker(text, className = '') {
    return `<button class="sound ${className}" type="button" data-speak="${escapeHTML(text)}" aria-label="Произнести ${escapeHTML(text)}" title="Слушать произношение">◖))</button>`;
  }

  function speedControl() {
    return `<div class="audio-toolbar"><label for="audio-speed">Скорость произношения</label><select id="audio-speed" aria-label="Скорость произношения"><option value="slower" ${audioSpeed === 'slower' ? 'selected' : ''}>Очень медленно</option><option value="slow" ${audioSpeed === 'slow' ? 'selected' : ''}>Медленно</option><option value="normal" ${audioSpeed === 'normal' ? 'selected' : ''}>Обычно</option></select></div>`;
  }

  function intro(eyebrow, title, text, aside = '') {
    return `<header class="page-head"><div><div class="eyebrow"><span class="small-sun">✳</span> ${eyebrow}</div><h1>${title}</h1><p>${text}</p></div>${aside}</header>`;
  }

  function route() {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash === 'home' || !hash) return { page: 'home' };
    if (hash === 'lessons') return { page: 'lessons' };
    if (hash === 'practice') return { page: 'practice' };
    if (hash === 'reference') return { page: 'reference' };
    if (hash.startsWith('lesson/')) {
      const lesson = data.lessons.find(item => item.id === hash.slice(7));
      if (lesson) return { page: 'lesson', lesson };
    }
    return { page: 'home' };
  }

  function renderNavigation(current) {
    const items = [
      ['home', '⌂', 'Главная'], ['lessons', '▤', 'Все уроки'],
      ['practice', '◇', 'Повторение'], ['reference', '☷', 'Справочник']
    ];
    nav.innerHTML = items.map(([id, icon, title]) => `<a href="#${id}" class="nav-item ${current === id || (current === 'lesson' && id === 'lessons') ? 'active' : ''}" ${current === id ? 'aria-current="page"' : ''}><span class="nav-icon">${icon}</span><span>${title}</span>${id === 'practice' && logic.practiceStats(state, data.lessons).due ? `<b class="nav-badge">${logic.practiceStats(state, data.lessons).due}</b>` : ''}</a>`).join('');
    mobileNav.innerHTML = items.map(([id, icon, title]) => `<a href="#${id}" class="${current === id || (current === 'lesson' && id === 'lessons') ? 'active' : ''}" ${current === id ? 'aria-current="page"' : ''}><span>${icon}</span><small>${title}</small></a>`).join('');
  }

  function lessonTile(lesson, index) {
    const done = state.completed[lesson.id];
    const visited = state.visited.includes(lesson.id);
    return `<a href="#lesson/${lesson.id}" class="lesson-tile">
      <span class="lesson-number">${lesson.unit}</span><span class="lesson-icon" aria-hidden="true">${lesson.icon}</span>
      <span class="lesson-info"><strong>${lesson.title}</strong><small>${lesson.subtitle}</small></span>
      <span class="lesson-status ${done ? 'done' : ''}">${done ? '✓ Пройден' : visited ? 'Продолжить' : `${lesson.minutes} мин`}</span><span class="tile-arrow" aria-hidden="true">↗</span>
    </a>`;
  }

  function renderHome() {
    const completed = data.lessons.filter(lesson => state.completed[lesson.id]).length;
    const next = data.lessons.find(lesson => !state.completed[lesson.id]) || data.lessons[0];
    const stats = logic.practiceStats(state, data.lessons);
    main.innerHTML = `<div class="content home-content">
      <div class="topline"><span>УЧИМСЯ В СВОЁМ ТЕМПЕ</span><span>MAGYAR NYELV · УРОВЕНЬ С НУЛЯ</span></div>
      <section class="hero">
        <div class="hero-copy"><div class="hero-overline">ВАШ ПУТЬ К ВЕНГЕРСКОМУ <span>✳</span></div>
          <h1>Сначала <em>слово.</em><br>Потом целый мир.</h1>
          <p>Понятные правила, живые фразы и маленькие шаги каждый день. Начнём с самого начала — без спешки.</p>
          <a class="button button-dark" href="#lesson/${next.id}">${completed ? 'Продолжить обучение' : 'Начать первый урок'} <span>↗</span></a>
        </div>
        <div class="hero-art" aria-hidden="true"><div class="art-circle art-circle-one"></div><div class="art-circle art-circle-two"></div><div class="art-stitch">✳</div><div class="art-word">Szia<span>!</span></div><div class="art-caption">ПРИВЕТ — ЭТО НАЧАЛО</div><div class="art-ornament">✦ &nbsp; ✳ &nbsp; ✦</div></div>
      </section>
      <section class="home-grid" aria-label="Ваш прогресс">
        <div class="progress-panel"><div class="panel-top"><span class="section-kicker">ВАШ ПРОГРЕСС</span><span class="panel-decoration">✳</span></div>
          <div class="progress-value">${completed}<span> / ${data.lessons.length}</span></div><p>уроков пройдено</p>
          <div class="progress-track" role="progressbar" aria-label="Пройденные уроки" aria-valuenow="${completed}" aria-valuemin="0" aria-valuemax="${data.lessons.length}"><div style="width:${completed / data.lessons.length * 100}%"></div></div>
          <small>Даже один урок — уже движение вперёд.</small>
        </div>
        <a href="#practice" class="review-panel"><span class="section-kicker">ПОВТОРЕНИЕ СЛОВ</span><span class="review-symbol">✿</span><strong>${stats.due}</strong><span>слов ждут повторения</span><small>${stats.total ? 'Немного практики — и слова останутся с вами.' : 'Откройте урок, чтобы появились карточки.'}</small><b>К карточкам <span>↗</span></b></a>
      </section>
      <div class="section-heading"><div><span class="section-kicker">С ЧЕГО НАЧАТЬ</span><h2>Ближайшие уроки</h2></div><a href="#lessons">Все ${data.lessons.length} уроков ↗</a></div>
      <div class="lesson-list">${data.lessons.slice(Math.max(0, data.lessons.indexOf(next) - 1), Math.min(data.lessons.length, data.lessons.indexOf(next) + 2)).map(lessonTile).join('')}</div>
      <div class="bottom-note"><span>✳</span> Слушайте фразы, отвечайте на вопросы и возвращайтесь к словам. Прогресс сохраняется в этом браузере.</div>
    </div>`;
  }

  function renderLessons() {
    const completed = data.lessons.filter(lesson => state.completed[lesson.id]).length;
    main.innerHTML = `<div class="content">${intro('МАРШРУТ ОБУЧЕНИЯ', 'Все уроки', 'От первого «Szia!» до короткого рассказа о себе. Уроки открыты в любом порядке — выбирайте свой темп.', `<div class="head-counter"><strong>${completed}<span> / ${data.lessons.length}</span></strong><small>пройдено</small></div>`)}
      <div class="section-heading compact"><div><span class="section-kicker">ЧАСТЬ I · ОСНОВЫ</span><h2>Сначала познакомимся</h2></div><span class="heading-note">Уроки 01—04</span></div>
      <div class="lesson-list">${data.lessons.slice(0, 4).map(lessonTile).join('')}</div>
      <div class="section-heading compact"><div><span class="section-kicker">ЧАСТЬ II · СТРОИМ ФРАЗЫ</span><h2>Понимаем систему</h2></div><span class="heading-note">Уроки 05—09</span></div>
      <div class="lesson-list">${data.lessons.slice(4, 9).map(lessonTile).join('')}</div>
      <div class="section-heading compact"><div><span class="section-kicker">ЧАСТЬ III · О СЕБЕ</span><h2>Начинаем говорить</h2></div><span class="heading-note">Уроки 10—12</span></div>
      <div class="lesson-list">${data.lessons.slice(9).map(lessonTile).join('')}</div>
    </div>`;
  }

  function renderLesson(lesson) {
    if (!state.visited.includes(lesson.id)) { state.visited.push(lesson.id); save(); }
    const session = quizSession.get(lesson.id);
    main.innerHTML = `<div class="content lesson-content">
      <a class="back-link" href="#lessons">← Все уроки</a>
      ${intro(`УРОК ${lesson.unit} <span class="eyebrow-divider">/</span> ~${lesson.minutes} МИН`, escapeHTML(lesson.title), escapeHTML(lesson.intro), `<div class="lesson-head-icon" aria-hidden="true">${lesson.icon}</div>`)}
      ${speedControl()}
      <div class="lesson-layout"><div class="lesson-body">
        <div class="section-heading compact"><div><span class="section-kicker">РАЗБИРАЕМСЯ</span><h2>Правила без сложности</h2></div></div>
        <div class="rule-list">${lesson.rules.map((rule, i) => `<article class="rule-card"><span class="rule-index">0${i + 1}</span><div><h3>${escapeHTML(rule.title)}</h3><p>${escapeHTML(rule.text)}</p><div class="example"><div><strong lang="hu">${escapeHTML(rule.example)}</strong><small>${escapeHTML(rule.translation)}</small></div>${speaker(rule.example)}</div></div></article>`).join('')}</div>
        <div class="section-heading compact"><div><span class="section-kicker">ЗАПОМИНАЕМ</span><h2>Слова урока</h2></div><span class="heading-note">Нажмите ◖)) для произношения</span></div>
        <div class="words-grid">${lesson.words.map(([word, translation]) => `<div class="word-card"><div><strong lang="hu">${escapeHTML(word)}</strong><small>${escapeHTML(translation)}</small></div>${speaker(word)}</div>`).join('')}</div>
        <div class="section-heading compact quiz-heading" id="quiz-heading"><div><span class="section-kicker">ПРОВЕРЯЕМ СЕБЯ</span><h2>Небольшая практика</h2></div><span class="heading-note">${lesson.quiz.length} вопроса</span></div>
        <div id="quiz-area"></div>
      </div><aside class="lesson-aside"><div class="aside-card"><span class="section-kicker">МАЛЕНЬКИЙ СОВЕТ</span><span class="aside-flower">❊</span><p>Прочитайте пример вслух. Не страшно, если с первого раза получается неидеально.</p><span class="aside-stitch">✳ &nbsp; ✳ &nbsp; ✳</span></div><a href="#reference" class="aside-link">Нужна подсказка? <strong>Откройте справочник ↗</strong></a></aside></div>
    </div>`;
    renderQuiz(lesson, session);
  }

  function renderQuiz(lesson, session) {
    const area = document.querySelector('#quiz-area');
    if (!area) return;
    if (!session) {
      area.innerHTML = `<div class="quiz-start"><div><span class="quiz-symbol">✦</span><h3>Готовы попробовать?</h3><p>Четыре коротких вопроса. Можно ошибаться и проходить ещё раз — здесь никто не ставит оценок.</p></div><button class="button button-dark" data-action="start-quiz" data-lesson="${lesson.id}">Начать упражнение <span>→</span></button></div>`;
      return;
    }
    if (session.index >= lesson.quiz.length) {
      const passed = session.correct >= Math.ceil(lesson.quiz.length * .75);
      if (passed && !state.completed[lesson.id]) { state.completed[lesson.id] = true; save(); renderNavigation('lesson'); }
      const next = data.lessons[data.lessons.indexOf(lesson) + 1];
      area.innerHTML = `<div class="quiz-result"><div class="result-icon">${passed ? '✳' : '↺'}</div><span class="section-kicker">${passed ? 'УРОК ЗАВЕРШЁН' : 'ПОПРОБУЕМ ЕЩЁ РАЗ'}</span><h3>${passed ? 'У вас получилось!' : 'Почти получилось'}</h3><p>Правильных ответов: <strong>${session.correct} из ${lesson.quiz.length}</strong>. ${passed ? 'Новые слова уже ждут вас в повторении.' : 'Вернитесь к правилам и повторите упражнение — для завершения нужно 3 из 4.'}</p><div class="result-actions"><button class="button button-outline" data-action="start-quiz" data-lesson="${lesson.id}">Пройти ещё раз</button>${passed && next ? `<a class="button button-dark" href="#lesson/${next.id}">Следующий урок →</a>` : ''}${passed && !next ? '<a class="button button-dark" href="#practice">Повторить слова →</a>' : ''}</div></div>`;
      return;
    }
    const q = lesson.quiz[session.index];
    const answered = session.answer !== null;
    area.innerHTML = `<div class="quiz-box"><div class="quiz-top"><span>ВОПРОС ${String(session.index + 1).padStart(2, '0')} / ${String(lesson.quiz.length).padStart(2, '0')}</span><span>${session.correct} правильных</span></div>
      <div class="quiz-progress"><div style="width:${session.index / lesson.quiz.length * 100}%"></div></div>
      <h3>${escapeHTML(q.prompt)}</h3>
      ${q.type === 'choice' ? `<div class="choices">${q.options.map((option, i) => `<button class="choice ${answered && option === session.answer ? (session.wasCorrect ? 'correct' : 'incorrect') : ''} ${answered && option === q.answer ? 'correct' : ''}" data-action="answer" data-lesson="${lesson.id}" data-value="${escapeHTML(option)}" ${answered ? 'disabled' : ''}><span>${String.fromCharCode(65 + i)}</span>${escapeHTML(option)}</button>`).join('')}</div>` : `<form id="answer-form" data-lesson="${lesson.id}"><label class="input-label" for="answer-input">Ваш ответ по-венгерски</label><input id="answer-input" name="answer" lang="hu" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Напишите ответ здесь" ${answered ? 'disabled' : ''} required><div class="accent-row"><span>Буквы:</span>${['á', 'é', 'í', 'ó', 'ö', 'ő', 'ú', 'ü', 'ű'].map(letter => `<button type="button" data-action="accent" data-value="${letter}" ${answered ? 'disabled' : ''}>${letter}</button>`).join('')}</div>${!answered ? '<button class="button button-dark quiz-submit" type="submit">Проверить ответ →</button>' : ''}</form>`}
      ${answered ? `<div class="feedback ${session.wasCorrect ? 'feedback-ok' : 'feedback-no'}"><strong>${session.wasCorrect ? 'Верно! ✳' : 'Пока не совсем.'}</strong><span>${escapeHTML(q.explain)}</span>${!session.wasCorrect && q.type === 'input' ? `<small>Правильный ответ: <b lang="hu">${escapeHTML(q.answers[0])}</b></small>` : ''}</div><button class="button button-dark quiz-next" data-action="next-question" data-lesson="${lesson.id}">${session.index === lesson.quiz.length - 1 ? 'Узнать результат' : 'Следующий вопрос'} →</button>` : ''}
    </div>`;
    if (answered && q.type === 'input') area.querySelector('#answer-input').value = session.answer;
  }

  function renderPractice(reset = false) {
    if (reset) practice = { queue: logic.cardsForPractice(state, data.lessons), current: 0, revealed: false, count: 0 };
    const stats = logic.practiceStats(state, data.lessons);
    const card = practice.queue[practice.current];
    main.innerHTML = `<div class="content">${intro('КАРТОЧКИ СЛОВ', 'Повторение', 'Вспоминайте перевод до того, как открыть карточку. Слова вернутся через день, три дня и позже — как раз вовремя.', `<div class="head-counter"><strong>${stats.due}</strong><small>сейчас к повторению</small></div>`)}${speedControl()}
      ${!stats.total ? `<div class="empty-state"><div class="empty-icon">✿</div><h2>Здесь скоро появятся слова</h2><p>Откройте любой урок — и его словарь станет доступен для повторения.</p><a class="button button-dark" href="#lesson/${data.lessons[0].id}">Открыть первый урок →</a></div>` : !card ? `<div class="empty-state"><div class="empty-icon">✳</div><h2>На сегодня всё!</h2><p>Вы повторили доступные карточки. Новые появятся позже — или откройте следующий урок.</p><a class="button button-dark" href="#lessons">К урокам →</a></div>` : `<div class="practice-wrap"><div class="practice-meta"><span>${escapeHTML(card.lesson)}</span><span>КАРТОЧКА ${practice.current + 1} / ${practice.queue.length}</span></div>
      <div class="flashcard"><span class="flash-overline">${practice.revealed ? 'ПЕРЕВОД' : 'КАК ПЕРЕВОДИТСЯ?'}</span><div class="flash-word" lang="hu">${escapeHTML(card.word)} ${speaker(card.word)}</div>${practice.revealed ? `<div class="flash-answer">${escapeHTML(card.translation)}</div>` : '<div class="flash-hint">Вспомните перевод, прежде чем открыть</div>'}<div class="flash-ornament" aria-hidden="true">✳ &nbsp; ✦ &nbsp; ✳</div></div>
      <div class="flash-actions">${practice.revealed ? `<button class="button button-outline" data-action="grade" data-value="again">Не вспомнила ↺</button><button class="button button-dark" data-action="grade" data-value="remembered">Вспомнила ✓</button>` : '<button class="button button-dark" data-action="reveal">Показать перевод →</button>'}</div><p class="practice-note">«Вспомнила» перенесёт слово на следующий день. «Не вспомнила» вернёт его через 10 минут.</p></div>`}
    </div>`;
  }

  function renderReference() {
    main.innerHTML = `<div class="content">${intro('БЫСТРАЯ ПОДСКАЗКА', 'Справочник', 'Правила и готовые фразы — всё под рукой. Нажимайте на значок звука, чтобы послушать произношение.')}${speedControl()}
      <div class="reference-grid"><div><div class="section-heading compact"><div><span class="section-kicker">ГРАММАТИКА В ДВУХ СЛОВАХ</span><h2>Опорные правила</h2></div></div>
      <div class="reference-rules">
        <article><span>01</span><div><h3>Произношение</h3><p>Ударение обычно на первом слоге. s ≈ ш, sz ≈ с, cs ≈ ч; ő и ű — долгие гласные.</p></div></article>
        <article><span>02</span><div><h3>Артикли</h3><p>a перед согласным, az перед гласным; egy — «один / какой-то».</p></div></article>
        <article><span>03</span><div><h3>Где? Куда? Откуда?</h3><p>boltban — в магазине; boltba — в магазин; boltból — из магазина.</p></div></article>
        <article><span>04</span><div><h3>«Быть» в 3-м лице</h3><p>Ő tanár — он/она учитель (без van); Ő itt van — он/она здесь (с van).</p></div></article>
        <article><span>05</span><div><h3>Винительный падеж</h3><p>Прямое дополнение получает -t: kávé → kávét, víz → vizet.</p></div></article>
      </div></div><aside class="reference-aside"><div class="aside-card"><span class="section-kicker">ПОМОЩЬ С ПРОИЗНОШЕНИЕМ</span><span class="aside-flower">◖))</span><p>Все фразы и слова озвучены заранее. Нажмите на значок, чтобы послушать венгерское произношение — голос в системе не требуется.</p></div></aside></div>
      <div class="section-heading compact"><div><span class="section-kicker">ПОХОЖЕ НА НАСТОЯЩИЙ РАЗГОВОР</span><h2>Полезные фразы</h2></div></div>
      <div class="phrase-sections">${data.phrases.map(group => `<section class="phrase-group"><h3>${escapeHTML(group.category)}</h3>${group.items.map(([hu, ru]) => `<div class="phrase-row"><div><strong lang="hu">${escapeHTML(hu)}</strong><small>${escapeHTML(ru)}</small></div>${speaker(hu)}</div>`).join('')}</section>`).join('')}</div>
      <div class="bottom-note"><span>✳</span> Фразы о семье — примеры для практики. Рассказывайте о себе только то, что соответствует действительности.</div>
    </div>`;
  }

  function render(options = {}) {
    const current = route();
    renderNavigation(current.page);
    if (current.page === 'home') renderHome();
    else if (current.page === 'lessons') renderLessons();
    else if (current.page === 'lesson') renderLesson(current.lesson);
    else if (current.page === 'practice') renderPractice(options.resetPractice || false);
    else renderReference();
    if (options.scroll !== false) window.scrollTo(0, 0);
  }

  function speak(text) {
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
    const file = window.HU_AUDIO?.[text];
    if (file) {
      currentAudio = new Audio(file);
      currentAudio.playbackRate = audioRates[audioSpeed];
      currentAudio.play().catch(() => toast('Не удалось воспроизвести запись. Проверьте звук и подключение.'));
      return;
    }
    const voice = 'speechSynthesis' in window && speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith('hu'));
    if (!voice) { toast('Для этой фразы нет записи.'); return; }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hu-HU';
    utterance.voice = voice;
    utterance.rate = audioRates[audioSpeed];
    speechSynthesis.speak(utterance);
  }

  main.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.speak) { speak(button.dataset.speak); return; }
    const action = button.dataset.action;
    if (action === 'start-quiz') {
      quizSession.set(button.dataset.lesson, { index: 0, correct: 0, answer: null, wasCorrect: false });
      renderQuiz(data.lessons.find(item => item.id === button.dataset.lesson), quizSession.get(button.dataset.lesson));
    } else if (action === 'answer') {
      answer(button.dataset.lesson, button.dataset.value);
    } else if (action === 'next-question') {
      const session = quizSession.get(button.dataset.lesson);
      session.index++;
      session.answer = null;
      renderQuiz(data.lessons.find(item => item.id === button.dataset.lesson), session);
    } else if (action === 'accent') {
      const input = document.querySelector('#answer-input');
      if (!input) return;
      const start = input.selectionStart, end = input.selectionEnd;
      input.setRangeText(button.dataset.value, start, end, 'end');
      input.focus();
    } else if (action === 'reveal') {
      practice.revealed = true;
      renderPractice();
    } else if (action === 'grade') {
      const card = practice.queue[practice.current];
      if (!card) return;
      logic.updateCard(state, card.key, button.dataset.value === 'remembered');
      save();
      practice.current++;
      practice.revealed = false;
      renderNavigation('practice');
      renderPractice();
    }
  });

  function answer(lessonId, value) {
    const session = quizSession.get(lessonId);
    const lesson = data.lessons.find(item => item.id === lessonId);
    if (!session || session.answer !== null || !lesson) return;
    const question = lesson.quiz[session.index];
    if (!value.trim()) return;
    session.answer = value;
    session.wasCorrect = logic.isCorrect(question, value);
    if (session.wasCorrect) session.correct++;
    renderQuiz(lesson, session);
  }

  main.addEventListener('submit', event => {
    if (event.target.id !== 'answer-form') return;
    event.preventDefault();
    answer(event.target.dataset.lesson, event.target.elements.answer.value);
  });

  main.addEventListener('change', event => {
    if (event.target.id !== 'audio-speed' || !Object.hasOwn(audioRates, event.target.value)) return;
    audioSpeed = event.target.value;
    if (currentAudio) currentAudio.playbackRate = audioRates[audioSpeed];
    try { localStorage.setItem(audioSpeedKey, audioSpeed); }
    catch { /* Настройка останется до перезагрузки страницы. */ }
  });

  window.addEventListener('hashchange', () => render({ resetPractice: route().page === 'practice' }));
  render({ resetPractice: true });
})();
