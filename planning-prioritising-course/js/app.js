/* ==========================================================================
   App shell: state + persistence, time tracking, routing, navigation,
   block rendering (quiz, video, reflection, name, paths, results).
   ========================================================================== */
(function () {
  'use strict';
  const C = window.COURSE, M = window.MODULES, A = window.ACTIVITIES,
        Q = window.QUIZZES, V = window.VIDEOS, R = window.REFLECTIONS, P = window.PATHS;

  /* ---------------- State ---------------- */
  const blank = () => ({ v: 1, name: '', path: null, visited: {}, act: {}, quiz: {}, video: {},
    refl: {}, reflSaved: {}, seconds: 0, last: null, started: new Date().toISOString(), completedAt: null });
  let S;
  function load() {
    try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(C.storageKey) || 'null') || {}); }
    catch (e) { S = blank(); }
  }
  let saveT = null;
  function persist() {
    try { localStorage.setItem(C.storageKey, JSON.stringify(S)); } catch (e) { console.warn('Could not save progress', e); }
  }
  function save(now) {
    clearTimeout(saveT);
    if (now) { persist(); return; }
    saveT = setTimeout(persist, 250);
  }
  load();

  /* ---------------- Time tracking ----------------
     Counts only while the tab is visible and the learner has interacted in
     the last 5 minutes. Any gap between ticks over 15 s (sleep, throttled
     background tab) is discarded rather than counted.                      */
  const IDLE_MS = 5 * 60 * 1000, MAX_GAP = 15000;
  let lastTick = Date.now(), lastInput = Date.now(), sinceSave = 0;
  const markInput = () => { lastInput = Date.now(); };
  ['pointerdown', 'keydown', 'scroll', 'touchstart', 'input'].forEach(ev => window.addEventListener(ev, markInput, { passive: true, capture: true }));
  let mmT = 0;
  window.addEventListener('mousemove', () => { const n = Date.now(); if (n - mmT > 2000) { mmT = n; markInput(); } }, { passive: true });
  function tick() {
    const now = Date.now(), d = now - lastTick; lastTick = now;
    if (document.visibilityState !== 'visible') return;
    if (now - lastInput > IDLE_MS) return;
    if (d <= 0 || d > MAX_GAP) return;
    S.seconds += d / 1000; sinceSave += d;
    if (sinceSave > 10000) { sinceSave = 0; save(true); }
    const t = document.getElementById('time-spent'); if (t) t.textContent = fmtTime(S.seconds);
  }
  setInterval(tick, 1000);
  document.addEventListener('visibilitychange', () => { lastTick = Date.now(); if (document.visibilityState === 'hidden') save(true); else markInput(); });
  window.addEventListener('pagehide', () => save(true));

  function fmtTime(sec) {
    sec = Math.round(sec || 0);
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
    if (h) return `${h} h ${m} min`;
    if (m) return `${m} min`;
    return sec < 60 ? 'under 1 min' : '1 min';
  }

  /* ---------------- Helpers ---------------- */
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    kids.flat().forEach(k => { if (k == null || k === false) return; el.append(k.nodeType ? k : document.createTextNode(k)); });
    return el;
  }
  const modById = id => M.find(m => m.id === id);

  /* ---------------- Completion logic ---------------- */
  function requiredItems(mod) {
    const items = [];
    mod.pages.forEach(p => p.blocks.forEach(b => {
      if (b.t === 'act' && !A[b.id].optional) items.push(['act', b.id]);
      if (b.t === 'quiz') items.push(['quiz', b.id]);
      if (b.t === 'video') items.push(['video', b.id]);
    }));
    return items;
  }
  function itemDone(kind, id) {
    if (kind === 'act') return !!(S.act[id] && S.act[id].done);
    if (kind === 'video') return !!(S.video[id] && S.video[id].reviewed);
    if (kind === 'quiz') {
      const q = S.quiz[id]; if (!q || !q.attempts) return false;
      return Q[id].graded ? q.best >= C.passMark : true;
    }
    return false;
  }
  function pagesVisited(mod) { return mod.pages.every((p, i) => S.visited[mod.id + '/' + i]); }
  function modStatus(mod) {
    if (mod.id === 'choose') return S.path ? 'done' : (S.visited['choose/0'] ? 'started' : 'todo');
    if (mod.id === 'finish') return pagesVisited(mod) && certReady() ? 'done' : (mod.pages.some((p, i) => S.visited[mod.id + '/' + i]) ? 'started' : 'todo');
    const req = requiredItems(mod), done = req.filter(r => itemDone(...r)).length;
    const visitedAny = mod.pages.some((p, i) => S.visited[mod.id + '/' + i]);
    if (done === req.length && pagesVisited(mod)) return 'done';
    return (visitedAny || done) ? 'started' : 'todo';
  }
  function modFraction(mod) {
    // Visiting pages counts for a quarter; finishing the required work counts for the rest.
    const req = requiredItems(mod);
    const seen = mod.pages.filter((p, i) => S.visited[mod.id + '/' + i]).length / mod.pages.length;
    if (mod.id === 'choose') return S.path ? 1 : 0;
    if (!req.length) return seen;
    return 0.25 * seen + 0.75 * req.filter(r => itemDone(...r)).length / req.length;
  }
  const part1 = () => M.filter(m => m.part === 'p1');
  function certChecklist() {
    const own = S.path ? modById(P[S.path].module) : null;
    return [
      { label: 'Enter your name for the certificate', ok: !!S.name.trim(), go: '#/welcome/0' },
      { label: 'Complete Part 1 (all four modules)', ok: part1().every(m => modStatus(m) === 'done'), go: '#/' + (part1().find(m => modStatus(m) !== 'done') || part1()[0]).id + '/0' },
      { label: own ? `Complete your path: ${P[S.path].title}` : 'Choose and complete your path', ok: !!own && modStatus(own) === 'done', go: own ? '#/' + own.id + '/0' : '#/choose/0' },
      { label: `Pass the final knowledge check (${C.passMark}% or more)`, ok: itemDone('quiz', 'final'), go: '#/wrap/1' }
    ];
  }
  const certReady = () => certChecklist().every(c => c.ok);

  /* ---------------- Linear order ---------------- */
  function flow() {
    const order = ['welcome', 'm1', 'm2', 'm3', 'm4', 'choose'];
    if (S.path) order.push(P[S.path].module);
    order.push('wrap', 'finish');
    return order;
  }
  function neighbours(modId, idx) {
    const mod = modById(modId);
    let prev = null, next = null;
    if (idx > 0) prev = [modId, idx - 1];
    if (idx < mod.pages.length - 1) next = [modId, idx + 1];
    const fl = flow();
    let pos = fl.indexOf(modId);
    if (pos === -1) { // an optional, non-chosen path: slot it after "choose"
      pos = fl.indexOf('choose');
      if (!prev) prev = ['choose', 0];
      if (!next) next = ['wrap', 0];
    }
    if (!prev && pos > 0) { const pm = modById(fl[pos - 1]); prev = [pm.id, pm.pages.length - 1]; }
    if (!next && pos < fl.length - 1) next = [fl[pos + 1], 0];
    return { prev, next };
  }

  /* ---------------- Sidebar ---------------- */
  const groups = [['start', 'Start'], ['p1', 'Part 1: the foundation'], ['p2', 'Part 2: your path'], ['wrap', 'Wrap-up']];
  function renderNav() {
    const nav = $('#nav-list'); nav.innerHTML = '';
    const cur = currentRoute();
    groups.forEach(([part, label]) => {
      nav.append(h('p', { class: 'nav-group' }, label));
      const ul = h('ul', { class: 'nav-mods' });
      M.filter(m => m.part === part).forEach(m => {
        const st = modStatus(m), frac = st === 'done' ? 1 : modFraction(m);
        let tag = null;
        if (m.path && S.path) tag = S.path === m.path ? h('span', { class: 'nav-tag own' }, 'Your path') : h('span', { class: 'nav-tag' }, 'Optional');
        const a = h('a', { href: `#/${m.id}/0`, class: 'nav-link' + (cur.mod === m.id ? ' current' : ''), 'aria-current': cur.mod === m.id ? 'page' : null },
          h('span', { class: 'bar-mark st-' + st, style: `--fill:${Math.round(frac * 100)}%`, 'aria-hidden': 'true' }),
          h('span', { class: 'nav-text' }, m.title, tag),
          h('span', { class: 'sr-only' }, st === 'done' ? ' (complete)' : st === 'started' ? ' (in progress)' : ''));
        a.addEventListener('click', () => document.body.classList.remove('nav-open'));
        ul.append(h('li', null, a));
      });
      nav.append(ul);
    });
    const core = flow().map(modById).filter(m => m.id !== 'finish');
    const pct = Math.round(core.reduce((s, m) => s + (modStatus(m) === 'done' ? 1 : Math.min(modFraction(m), 0.95)), 0) / core.length * 100);
    $('#overall-pct').textContent = pct + '%';
    $('#overall-bar').style.width = pct + '%';
    $('#overall-bar').parentElement.setAttribute('aria-valuenow', pct);
    $('#time-spent').textContent = fmtTime(S.seconds);
  }

  /* ---------------- Routing ---------------- */
  function currentRoute() {
    const m = location.hash.match(/^#\/([\w-]+)\/(\d+)/);
    if (m && modById(m[1]) && +m[2] < modById(m[1]).pages.length) return { mod: m[1], page: +m[2] };
    return null || { mod: 'welcome', page: 0 };
  }
  function go(mod, page) { location.hash = `#/${mod}/${page}`; }

  function renderPage() {
    const { mod: modId, page: idx } = currentRoute();
    const mod = modById(modId), page = mod.pages[idx];
    S.visited[modId + '/' + idx] = true; S.last = [modId, idx]; save();
    const main = $('#page'); main.innerHTML = '';
    main.classList.toggle('is-hero', !!page.hero);

    // Header
    const head = h('header', { class: 'page-head' + (page.hero ? ' hero' : '') });
    if (page.hero) {
      head.append(h('img', { class: 'hero-mark', src: 'assets/img/hrc-mark-outline.png', alt: '', 'aria-hidden': 'true' }));
      head.append(h('p', { class: 'hero-kicker' }, `${C.programme} \u00b7 About 50 minutes`));
      head.append(h('h1', { id: 'page-title', tabindex: '-1' }, page.title));
    } else {
      const partLabel = (groups.find(g => g[0] === mod.part) || [])[1];
      head.append(h('p', { class: 'crumb' }, partLabel && mod.part !== 'start' ? `${partLabel} \u203a ${mod.title}` : mod.title));
      head.append(h('h1', { id: 'page-title', tabindex: '-1' }, page.title));
      if (mod.pages.length > 1) {
        const dots = h('ol', { class: 'page-dots', 'aria-label': `Page ${idx + 1} of ${mod.pages.length}` });
        mod.pages.forEach((p, i) => dots.append(h('li', null, h('a', {
          href: `#/${modId}/${i}`, class: (i === idx ? 'cur ' : '') + (S.visited[modId + '/' + i] ? 'seen' : ''),
          title: p.title, 'aria-label': `Page ${i + 1}: ${p.title}`, 'aria-current': i === idx ? 'step' : null
        }))));
        head.append(dots);
      }
    }
    main.append(head);

    const body = h('div', { class: 'page-body' });
    page.blocks.forEach(b => body.append(renderBlock(b)));
    main.append(body);

    // Footer nav
    const { prev, next } = neighbours(modId, idx);
    const foot = h('nav', { class: 'page-foot', 'aria-label': 'Page navigation' });
    foot.append(prev ? h('a', { class: 'btn ghost', href: `#/${prev[0]}/${prev[1]}` }, 'Back') : h('span'));
    if (modId === 'choose' && !S.path) {
      foot.append(h('span', { class: 'foot-note' }, 'Choose a path to continue'));
    } else if (next) {
      const nm = modById(next[0]);
      const label = next[0] !== modId ? `Next: ${nm.title}` : 'Next';
      foot.append(h('a', { class: 'btn primary', href: `#/${next[0]}/${next[1]}` }, label));
    }
    main.append(foot);

    renderNav();
    window.scrollTo(0, 0);
    const t = $('#page-title'); if (t && document.activeElement !== document.body) t.focus({ preventScroll: true });
  }

  /* ---------------- Blocks ---------------- */
  function renderBlock(b) {
    switch (b.t) {
      case 'html': return h('div', { class: 'prose', html: b.html });
      case 'act': return window.Activities.render(b.id, actCtx(b.id));
      case 'quiz': return renderQuiz(b.id);
      case 'video': return renderVideo(b.id);
      case 'reflect': return renderReflect(b.id);
      case 'name': return renderName();
      case 'pathpicker': return renderPaths();
      case 'results': return renderResults();
      case 'downloads': return renderDownloads();
      case 'certificate': return window.Cert.render(certCtx());
    }
    return h('div');
  }

  function actCtx(id) {
    if (!S.act[id]) S.act[id] = {};
    return {
      def: A[id], state: S.act[id],
      save: () => save(),
      complete: () => { S.act[id].done = true; S.act[id].doneAt = new Date().toISOString(); save(true); renderNav(); },
      h, esc
    };
  }

  /* Quiz */
  function renderQuiz(id) {
    const def = Q[id];
    if (!S.quiz[id]) S.quiz[id] = { answers: {}, attempts: 0, best: null, last: null, submitted: false };
    const st = S.quiz[id];
    const wrap = h('section', { class: 'quiz' + (def.graded ? ' graded' : ''), 'aria-labelledby': 'qz-' + id });
    function draw() {
      wrap.innerHTML = '';
      wrap.append(h('h2', { id: 'qz-' + id, class: 'block-title' }, def.title));
      def.questions.forEach((q, qi) => {
        const fs = h('fieldset', { class: 'qz-q' });
        fs.append(h('legend', null, h('span', { class: 'qz-n' }, `${qi + 1}`), q.q));
        q.options.forEach((o, oi) => {
          const chosen = st.answers[qi] === oi;
          let cls = 'qz-opt';
          if (st.submitted) { if (oi === q.answer) cls += ' right'; else if (chosen) cls += ' wrong'; }
          const input = h('input', { type: 'radio', name: `${id}-q${qi}`, value: oi, disabled: st.submitted ? true : null });
          input.checked = chosen;
          input.addEventListener('change', () => { st.answers[qi] = oi; save(); err.textContent = ''; });
          fs.append(h('label', { class: cls }, input, h('span', null, o)));
        });
        if (st.submitted) {
          const ok = st.answers[qi] === q.answer;
          const fb = h('div', { class: 'qz-fb ' + (ok ? 'ok' : 'no') });
          fb.append(h('strong', null, ok ? 'Correct. ' : 'Not quite. '));
          if (q.optionFeedback && !ok && st.answers[qi] != null) fb.append(h('span', null, q.optionFeedback[st.answers[qi]] + ' '));
          fb.append(h('span', null, q.explain));
          fs.append(fb);
        }
        wrap.append(fs);
      });
      const err = h('p', { class: 'form-error', role: 'alert' });
      const actions = h('div', { class: 'qz-actions' });
      if (!st.submitted) {
        actions.append(h('button', { class: 'btn primary', type: 'button', onclick: () => {
          const left = def.questions.filter((q, qi) => st.answers[qi] == null).length;
          if (left) { err.textContent = `Answer every question before checking (${left} left).`; return; }
          const score = def.questions.filter((q, qi) => st.answers[qi] === q.answer).length;
          const pct = Math.round(score / def.questions.length * 100);
          st.submitted = true; st.attempts++; st.last = pct; st.lastRaw = score;
          st.best = st.best == null ? pct : Math.max(st.best, pct);
          if (id === 'final' && certReady() && !S.completedAt) S.completedAt = new Date().toISOString();
          save(true); draw(); renderNav();
          wrap.querySelector('.qz-score').focus();
        } }, def.graded ? 'Submit my answers' : 'Check my answers'));
      } else {
        const pct = st.last, pass = pct >= C.passMark;
        const sc = h('div', { class: 'qz-score ' + (def.graded ? (pass ? 'pass' : 'fail') : ''), tabindex: '-1', role: 'status' });
        sc.append(h('strong', null, `${st.lastRaw} of ${def.questions.length} correct (${pct}%)`));
        if (def.graded) sc.append(h('span', null, pass ? ` You passed. Best score: ${st.best}%.` : ` The pass mark is ${C.passMark}%. Review the explanations above and try again.${st.best != null && st.best >= C.passMark ? ` You\u2019ve already passed with ${st.best}%.` : ''}`));
        actions.append(sc);
        actions.append(h('button', { class: 'btn ghost', type: 'button', onclick: () => { st.submitted = false; st.answers = {}; save(true); draw(); } }, 'Retake'));
      }
      wrap.append(err, actions);
    }
    draw();
    return wrap;
  }

  /* Video */
  function embedUrl(url) {
    if (!url || /\[|\]/.test(url)) return null;
    const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0` : url;
  }
  function renderVideo(id) {
    const def = V[id];
    if (!S.video[id]) S.video[id] = { optOut: false, reviewed: false };
    const st = S.video[id];
    const wrap = h('section', { class: 'video-block' });
    function draw() {
      wrap.innerHTML = '';
      const src = embedUrl(def.url);
      const optId = `opt-${id}`, revId = `rev-${id}`;
      const opt = h('input', { type: 'checkbox', id: optId });
      opt.checked = st.optOut;
      opt.addEventListener('change', () => { st.optOut = opt.checked; save(true); draw(); $('#' + optId).focus(); });
      wrap.append(h('div', { class: 'opt-out' }, opt, h('label', { for: optId }, 'YouTube is blocked on my network: show me a text summary instead')));
      if (st.optOut) {
        wrap.append(h('div', { class: 'video-summary' }, h('h3', null, def.title.replace(/^Video:\s*/, 'Summary: ')), h('div', { class: 'prose', html: def.summary })));
      } else if (src) {
        wrap.append(h('div', { class: 'video-frame' }, h('iframe', { src, title: def.title, loading: 'lazy', allow: 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen', allowfullscreen: true, referrerpolicy: 'strict-origin-when-cross-origin' })));
        wrap.append(h('p', { class: 'hint' }, 'If the video doesn\u2019t load, tick the box above to read a summary instead.'));
      } else {
        wrap.append(h('div', { class: 'video-frame missing' }, h('p', null, 'This video hasn\u2019t been linked yet. Tick the box above to read the summary.')));
      }
      const rev = h('input', { type: 'checkbox', id: revId });
      rev.checked = st.reviewed;
      rev.addEventListener('change', () => { st.reviewed = rev.checked; st.reviewedVia = st.optOut ? 'summary' : 'video'; save(true); draw(); renderNav(); $('#' + revId).focus(); });
      wrap.append(h('div', { class: 'reviewed' + (st.reviewed ? ' on' : '') }, rev,
        h('label', { for: revId }, st.optOut ? 'I\u2019ve read the summary' : 'I\u2019ve watched the video')));
      if (!st.reviewed) wrap.append(h('p', { class: 'hint' }, 'Tick this to mark the video complete.'));
    }
    draw();
    return wrap;
  }

  /* Reflection */
  function renderReflect(id) {
    const wrap = h('div', { class: 'reflect' });
    const tid = 'rf-' + id;
    const ta = h('textarea', { id: tid, rows: '4' }); ta.value = S.refl[id] || '';
    const status = h('p', { class: 'rf-status', 'aria-live': 'polite' });
    const err = h('p', { class: 'form-error', role: 'alert' });
    const setStatus = () => { status.textContent = S.reflSaved[id] ? `Saved ${new Date(S.reflSaved[id]).toLocaleString()}` : (S.refl[id] ? 'Draft saved in this browser' : ''); };
    let t;
    ta.addEventListener('input', () => {
      S.refl[id] = ta.value; err.textContent = '';
      if (S.reflSaved[id] && !ta.value.trim()) delete S.reflSaved[id];
      clearTimeout(t); t = setTimeout(() => { save(true); setStatus(); }, 400);
    });
    const btn = h('button', { class: 'btn small', type: 'button', onclick: () => {
      if (!ta.value.trim()) { err.textContent = 'Write a few words before saving.'; ta.focus(); return; }
      S.refl[id] = ta.value; S.reflSaved[id] = new Date().toISOString(); save(true); setStatus();
    } }, 'Save reflection');
    wrap.append(h('label', { for: tid }, R[id]), ta, h('div', { class: 'rf-row' }, btn, status), err);
    setStatus();
    return wrap;
  }

  /* Name */
  function renderName() {
    const wrap = h('div', { class: 'name-field' });
    const inp = h('input', { id: 'learner-name', type: 'text', autocomplete: 'name', maxlength: '60' }); inp.value = S.name;
    const msg = h('p', { class: 'rf-status', 'aria-live': 'polite' }, S.name ? `Saved as \u201c${S.name}\u201d` : '');
    const err = h('p', { class: 'form-error', role: 'alert' });
    const btn = h('button', { class: 'btn primary', type: 'button', onclick: () => {
      const v = inp.value.trim().replace(/\s+/g, ' ');
      if (!v) { err.textContent = 'Enter your name as you\u2019d like it to appear on your certificate.'; inp.focus(); return; }
      S.name = v; err.textContent = ''; msg.textContent = `Saved as \u201c${v}\u201d`; save(true); renderNav();
    } }, 'Save name');
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
    wrap.append(h('label', { for: 'learner-name' }, 'Your name, as it should appear on your certificate'), h('div', { class: 'nf-row' }, inp, btn), msg, err);
    return wrap;
  }

  /* Path picker */
  function renderPaths() {
    const wrap = h('div', { class: 'paths' });
    Object.values(P).forEach(p => {
      const own = S.path === p.id;
      const card = h('div', { class: `path-card tone-${p.tone}` + (own ? ' own' : '') });
      card.append(h('p', { class: 'pc-role' }, p.role), h('h3', null, p.title),
        h('ul', null, p.bullets.map(b => h('li', null, b))));
      if (own) {
        card.append(h('p', { class: 'pc-own' }, 'Your path'),
          h('a', { class: 'btn primary', href: `#/${p.module}/0` }, 'Start this path'));
      } else {
        card.append(h('button', { class: 'btn ' + (S.path ? 'ghost' : 'primary'), type: 'button', onclick: () => { S.path = p.id; save(true); renderPage(); } }, S.path ? 'Switch to this path' : 'Choose this path'),
          S.path ? h('a', { class: 'pc-explore', href: `#/${p.module}/0` }, 'Explore without switching') : null);
      }
      wrap.append(card);
    });
    return wrap;
  }

  /* Results */
  function scoreRows() {
    const rows = [];
    const add = (label, qid) => { const q = S.quiz[qid]; rows.push([label, q && q.attempts ? `${q.best}% (best of ${q.attempts})` : 'Not attempted']); };
    add('Module 1: Why planning matters', 'cfu1');
    add('Module 2: Urgent vs important', 'cfu2');
    add('Module 3: The RCM priority lens', 'cfu3');
    add('Module 4: Plan, Do, Review', 'cfu4');
    Object.values(P).forEach(p => { if (S.path === p.id || (S.quiz['cfu' + p.id] && S.quiz['cfu' + p.id].attempts)) add(`Path: ${p.title}`, 'cfu' + p.id); });
    return rows;
  }
  function renderResults() {
    const wrap = h('div', { class: 'results' });
    const fq = S.quiz.final, fin = fq && fq.attempts ? fq.best : null;
    const acts = Object.keys(A).filter(k => !A[k].optional);
    const relevant = acts.filter(k => { const m = M.find(mm => mm.pages.some(p => p.blocks.some(b => b.t === 'act' && b.id === k))); return !m.path || m.path === S.path; });
    const doneActs = relevant.filter(k => S.act[k] && S.act[k].done).length;
    wrap.append(h('div', { class: 'stat-row' },
      h('div', { class: 'stat' }, h('span', { class: 'stat-v' }, fin == null ? '\u2014' : fin + '%'), h('span', { class: 'stat-l' }, 'Final knowledge check')),
      h('div', { class: 'stat' }, h('span', { class: 'stat-v' }, `${doneActs}/${relevant.length}`), h('span', { class: 'stat-l' }, 'Activities completed')),
      h('div', { class: 'stat' }, h('span', { class: 'stat-v' }, fmtTime(S.seconds)), h('span', { class: 'stat-l' }, 'Time invested'))));
    const tb = h('tbody');
    scoreRows().forEach(r => tb.append(h('tr', null, h('td', null, r[0]), h('td', null, r[1]))));
    tb.append(h('tr', { class: 'total' }, h('td', null, 'Final knowledge check (graded)'), h('td', null, fin == null ? 'Not attempted' : `${fin}% \u00b7 ${fin >= C.passMark ? 'Passed' : 'Not yet passed'}`)));
    wrap.append(h('h2', { class: 'block-title' }, 'Scores'), h('div', { class: 'table-wrap' }, h('table', { class: 'data' }, h('thead', null, h('tr', null, h('th', null, 'Check'), h('th', null, 'Score'))), tb)));
    wrap.append(h('h2', { class: 'block-title' }, 'Certificate requirements'), checklistEl());
    return wrap;
  }
  function checklistEl() {
    const ul = h('ul', { class: 'checklist' });
    certChecklist().forEach(c => ul.append(h('li', { class: c.ok ? 'ok' : '' },
      h('span', { class: 'ck', 'aria-hidden': 'true' }), h('span', null, c.label, h('span', { class: 'sr-only' }, c.ok ? ' (done)' : ' (to do)')),
      c.ok ? null : h('a', { href: c.go }, 'Go'))));
    return ul;
  }

  function renderDownloads() {
    const wrap = h('div', { class: 'downloads' });
    const msg = h('p', { class: 'rf-status', 'aria-live': 'polite' });
    wrap.append(h('h2', { class: 'block-title' }, 'Take your answers with you'),
      h('p', null, 'One document with every reflection, activity result and score, ready for your mentor session.'),
      h('div', { class: 'dl-row' },
        h('button', { class: 'btn primary', type: 'button', id: 'pdf-btn', onclick: () => window.Report.download(reportCtx(), msg) }, 'Download PDF of my answers'),
        h('a', { class: 'btn ghost', href: '#/finish/2' }, 'Go to my certificate')), msg);
    return wrap;
  }

  /* Context objects for report + certificate modules */
  function reportCtx() { return { S, C, M, A, Q, R, P, V, fmtTime, scoreRows, modById }; }
  function certCtx() { return { S, C, P, h, fmtTime, certReady, checklistEl, markComplete: () => { if (!S.completedAt) { S.completedAt = new Date().toISOString(); save(true); } } }; }

  /* ---------------- Shell wiring ---------------- */
  function init() {
    $('#menu-btn').addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      $('#menu-btn').setAttribute('aria-expanded', open);
    });
    $('#scrim').addEventListener('click', () => { document.body.classList.remove('nav-open'); $('#menu-btn').setAttribute('aria-expanded', 'false'); });
    $('#reset-btn').addEventListener('click', () => {
      if (confirm('Reset all progress, answers and reflections in this browser? This can\u2019t be undone.')) {
        localStorage.removeItem(C.storageKey); load(); go('welcome', 0); renderPage();
      }
    });
    window.addEventListener('hashchange', renderPage);
    if (!/^#\/[\w-]+\/\d+/.test(location.hash) && S.last && modById(S.last[0])) { history.replaceState(null, '', `#/${S.last[0]}/${S.last[1]}`); }
    renderPage();
  }
  window.App = { get state() { return S; }, save, renderNav, fmtTime };
  document.addEventListener('DOMContentLoaded', init);
})();
