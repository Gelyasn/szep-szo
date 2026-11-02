// Не входит в быстрый набор node --test: запускать отдельно через node tests/browser-smoke.cjs.
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join, resolve } = require('node:path');

async function main() {
  const profile = mkdtempSync(join(tmpdir(), 'szep-szo-chrome-'));
  const port = 49000 + Math.floor(Math.random() * 10000);
  const chrome = spawn(process.env.CHROME || '/usr/bin/google-chrome-stable', [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-extensions',
    '--disable-background-networking', `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`, 'about:blank'
  ], { stdio: 'ignore' });
  let socket;
  try {
    let pages;
    for (let i = 0; i < 60; i++) {
      try { pages = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; }
      catch { await new Promise(done => setTimeout(done, 100)); }
    }
    assert.ok(pages?.length, 'Chrome did not start');
    const page = pages.find(target => target.type === 'page' && target.url === 'about:blank') || pages.find(target => target.type === 'page' && !target.url.startsWith('chrome-extension:'));
    assert.ok(page, `No browser page: ${JSON.stringify(pages.map(target => [target.type, target.url]))}`);
    socket = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((done, fail) => { socket.addEventListener('open', done, { once: true }); socket.addEventListener('error', fail, { once: true }); });
    let id = 0;
    const pending = new Map();
    socket.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      const callback = pending.get(message.id);
      if (callback) { pending.delete(message.id); callback(message); }
    });
    const command = (method, params = {}) => new Promise((done, fail) => {
      const requestId = ++id;
      pending.set(requestId, message => message.error ? fail(Error(message.error.message)) : done(message.result));
      socket.send(JSON.stringify({ id: requestId, method, params }));
    });
    const evalJS = async expression => {
      const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails) throw Error(result.exceptionDetails.text);
      return result.result.value;
    };
    const until = async expression => {
      for (let i = 0; i < 80; i++) {
        const value = await evalJS(expression);
        if (value) return value;
        await new Promise(done => setTimeout(done, 100));
      }
      throw Error(`Timed out waiting for: ${expression}\n${JSON.stringify(await evalJS('({url:location.href, ready:document.readyState, text:document.body?.innerText?.slice(0,300)})'))}`);
    };

    await command('Page.navigate', { url: process.env.APP_URL || `file://${resolve(__dirname, '..', 'index.html')}` });
    assert.equal(await until("document.querySelector('.hero h1')?.textContent.includes('Сначала')"), true);
    await evalJS("document.querySelector('a[href=\"#lesson/sounds\"]').click()");
    assert.equal(await until("!!document.querySelector('[data-action=\"start-quiz\"]')"), true);
    assert.equal(await evalJS(`new Promise(resolve => {
      const phrase = document.querySelector('.sound').dataset.speak;
      const audio = new Audio(HU_AUDIO[phrase]);
      setTimeout(() => resolve('timeout'), 12000);
      audio.onloadedmetadata = () => resolve(audio.duration > 0);
      audio.onerror = () => resolve(false);
      audio.load();
    })`), true, 'recorded Hungarian voice should load in browser');
    await evalJS("document.querySelector('[data-action=\"start-quiz\"]').click()");
    for (let index = 0; index < 4; index++) {
      assert.equal(await until("!!document.querySelector('.quiz-box')"), true);
      await evalJS(`(() => {
        const q = HU_DATA.lessons[0].quiz[${index}];
        if (q.type === 'choice') document.querySelectorAll('[data-action="answer"]')[q.options.indexOf(q.answer)].click();
        else { const form = document.querySelector('#answer-form'); form.elements.answer.value = q.answers[0]; form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); }
      })()`);
      assert.equal(await until("!!document.querySelector('.feedback-ok')"), true);
      await evalJS("document.querySelector('[data-action=\"next-question\"]').click()");
    }
    assert.equal(await until("!!document.querySelector('.quiz-result')"), true);
    assert.equal(await evalJS("JSON.parse(localStorage.getItem('szep-szo-progress-v1')).completed.sounds"), true);
    await evalJS("location.hash = '#practice'");
    assert.equal(await until("!!document.querySelector('.flashcard')"), true);
    await evalJS("document.querySelector('[data-action=\"reveal\"]').click()");
    assert.equal(await until("!!document.querySelector('.flash-answer')"), true);
    await evalJS("document.querySelector('[data-value=\"remembered\"]').click()");
    assert.equal(await evalJS("Object.values(JSON.parse(localStorage.getItem('szep-szo-progress-v1')).cards).length"), 1);
    assert.equal(await evalJS("!!document.querySelector('.flash-answer')"), false);
    console.log('Browser smoke passed: урок, ответы, прогресс и карточки.');
  } finally {
    socket?.close();
    chrome.kill();
    rmSync(profile, { recursive: true, force: true });
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
