/* ==========================================================================
   Activity renderers. Every renderer writes to ctx.state and calls
   ctx.save() on each interaction, so a mid-activity refresh loses nothing.
   ========================================================================== */
(function () {
  'use strict';

  const ICONS = {
    cash: '<path d="M3 7h18v10H3z"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/>',
    fire: '<path d="M12 3c1 3 4 5 4 9a4 4 0 1 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z"/>',
    battery: '<rect x="3" y="8" width="16" height="8" rx="1.5"/><path d="M21 11v2M6 11v2"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    hand: '<path d="M8 12V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 7-6 7-2.5 0-4-1.5-5.5-4L4 12.5a1.5 1.5 0 0 1 2.5-1.5L8 13"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2c3 .3 5 2.6 5 5.8"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    swap: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
    plus: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v8M8 12h8"/>',
    handshake: '<path d="M3 11l4-4 4 2 3-2 7 5-4 4"/><path d="M7 7l-4 4 6 6c1 1 2 1 3 0l5-5"/>'
  };
  const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[n] || ''}</svg>`;

  function shuffleOnce(st, key, ids) {
    // Fixed on first render and saved, so the layout is stable across refreshes.
    if (!Array.isArray(st[key]) || st[key].length !== ids.length || !ids.every(i => st[key].includes(i))) {
      const a = ids.slice();
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      if (a.every((v, i) => v === ids[i]) && a.length > 2) a.push(a.shift());
      st[key] = a;
    }
    return st[key];
  }

  function shell(ctx, cls) {
    const { h, def } = ctx;
    const sec = h('section', { class: 'activity ' + cls });
    const head = h('div', { class: 'act-head' },
      h('h2', { class: 'block-title' }, def.title),
      def.instructions ? h('p', { class: 'act-inst' }, def.instructions) : null);
    const body = h('div', { class: 'act-body' });
    const foot = h('div', { class: 'act-foot' });
    sec.append(head, body, foot);
    return { sec, body, foot };
  }

  function keyPoints(ctx) {
    const { h, def } = ctx;
    if (!def.keyPoints) return null;
    return h('aside', { class: 'keypoints', role: 'note', 'aria-label': 'Coaching key points' },
      h('h3', null, 'Coaching key points'),
      h('ul', null, def.keyPoints.map(k => h('li', null, k))));
  }
  function status(ctx, text, kind) { return ctx.h('p', { class: 'act-status ' + (kind || ''), role: 'status' }, text); }

  /* ---------------- Buckets (drag/tap into fixed categories) ---------------- */
  function buckets(ctx) {
    const { h, def, state: st } = ctx;
    st.place = st.place || {}; st.attempts = st.attempts || 0;
    const { sec, body, foot } = shell(ctx, 'buckets');
    let selected = null;
    const order = shuffleOnce(st, 'order', def.items.map(i => i.id));
    const item = id => def.items.find(i => i.id === id);

    function place(id, bucket) {
      if (st.done || (st.result && st.result[id])) return;
      if (bucket) st.place[id] = bucket; else delete st.place[id];
      if (st.result) delete st.result[id];
      selected = null; ctx.save(); draw();
    }
    function chip(id) {
      const it = item(id);
      const locked = st.done || (st.result && st.result[id] === true);
      const wrong = st.result && st.result[id] === false;
      const b = h('button', {
        type: 'button', class: 'chip' + (selected === id ? ' sel' : '') + (locked ? ' ok' : '') + (wrong ? ' bad' : ''),
        draggable: locked ? null : 'true', 'aria-pressed': selected === id ? 'true' : 'false', 'data-id': id,
        'aria-label': it.text + (locked ? ' (correct)' : wrong ? ' (incorrect)' : '')
      }, it.text);
      if (wrong) b.append(h('span', { class: 'chip-why' }, it.why));
      if (!locked) {
        b.addEventListener('click', e => {
          e.stopPropagation();
          // With another item selected, tapping a chip that sits in a bucket means "put it here".
          if (selected && selected !== id && st.place[id]) { const target = selected; place(target, st.place[id]); focusChip(target); return; }
          selected = selected === id ? null : id; draw(); focusChip(id);
        });
        b.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', id); e.dataTransfer.effectAllowed = 'move'; b.classList.add('dragging'); });
        b.addEventListener('dragend', () => b.classList.remove('dragging'));
      }
      return b;
    }
    function focusChip(id) { const el = sec.querySelector(`.chip[data-id="${id}"]`); if (el) el.focus(); }
    function zone(el, bucketId) {
      el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('over'); });
      el.addEventListener('dragleave', () => el.classList.remove('over'));
      el.addEventListener('drop', e => { e.preventDefault(); el.classList.remove('over'); const id = e.dataTransfer.getData('text/plain'); if (id) place(id, bucketId); });
      el.addEventListener('click', () => { if (selected) place(selected, bucketId); });
      el.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === el && selected) { e.preventDefault(); place(selected, bucketId); } });
    }
    function draw() {
      body.innerHTML = ''; foot.innerHTML = '';
      const unplaced = order.filter(id => !st.place[id]);
      if (!st.done) {
        const tray = h('div', { class: 'tray' + (selected ? ' armed' : ''), tabindex: selected ? '0' : null, role: selected ? 'button' : null, 'aria-label': 'Unsorted items' });
        tray.append(h('p', { class: 'zone-label' }, unplaced.length ? `To sort (${unplaced.length})` : 'All items placed'));
        const list = h('div', { class: 'chips' }); unplaced.forEach(id => list.append(chip(id)));
        tray.append(list); zone(tray, null); body.append(tray);
      }
      const grid = h('div', { class: 'bucket-grid n' + def.buckets.length });
      def.buckets.forEach(bk => {
        const z = h('div', { class: `bucket tone-${bk.tone}` + (selected ? ' armed' : ''), tabindex: selected ? '0' : '-1', role: 'group', 'aria-label': `${bk.label}: ${bk.hint}` });
        z.append(h('div', { class: 'bucket-head' }, h('strong', null, bk.label), h('span', null, bk.hint)));
        const list = h('div', { class: 'chips' });
        order.filter(id => st.place[id] === bk.id).forEach(id => list.append(chip(id)));
        if (selected) z.append(h('span', { class: 'drop-cue', 'aria-hidden': 'true' }, 'Place here'));
        z.append(list); zone(z, bk.id); grid.append(z);
      });
      body.append(grid);

      if (st.done) {
        foot.append(status(ctx, `All ${def.items.length} sorted correctly${st.attempts > 1 ? ` in ${st.attempts} attempts` : ''}.`, 'ok'), keyPoints(ctx));
        return;
      }
      const err = h('p', { class: 'form-error', role: 'alert' });
      const anyWrong = st.result && Object.values(st.result).some(v => v === false);
      if (anyWrong) {
        const n = Object.values(st.result).filter(v => v === false).length;
        foot.append(status(ctx, `${def.items.length - n} of ${def.items.length} correct. Read the notes on the items marked in pink, then move them.`, 'bad'));
        foot.append(h('button', { class: 'btn ghost', type: 'button', onclick: () => {
          Object.keys(st.result).forEach(id => { if (st.result[id] === false) { delete st.place[id]; delete st.result[id]; } });
          ctx.save(); draw();
        } }, 'Move incorrect items back'));
      }
      foot.append(h('button', { class: 'btn primary', type: 'button', onclick: () => {
        const left = def.items.filter(i => !st.place[i.id]).length;
        if (left) { err.textContent = `Place all ${def.items.length} items before checking (${left} left).`; return; }
        st.attempts++; st.result = {};
        def.items.forEach(i => { st.result[i.id] = st.place[i.id] === i.bucket; });
        if (Object.values(st.result).every(Boolean)) { st.done = true; ctx.complete(); }
        else ctx.save();
        draw();
      } }, 'Check answers'), err);
    }
    draw();
    return sec;
  }

  /* ---------------- Sequence (unique ordered steps) ---------------- */
  function sequence(ctx) {
    const { h, def, state: st } = ctx;
    st.picks = st.picks || []; st.attempts = st.attempts || 0;
    const { sec, body, foot } = shell(ctx, 'sequence');
    const order = shuffleOnce(st, 'order', def.items.map(i => i.id));
    const item = id => def.items.find(i => i.id === id);
    const posOK = (id, pos) => item(id).accept.includes(pos);

    function draw() {
      body.innerHTML = ''; foot.innerHTML = '';
      if (st.done) {
        const ol = h('ol', { class: 'seq-answer' });
        def.items.forEach(i => ol.append(h('li', null, h('strong', null, i.text), h('span', null, i.detail))));
        body.append(h('p', { class: 'zone-label' }, st.revealed ? 'Suggested order' : 'Your order, with the reasoning'), ol);
        if (def.note) body.append(h('p', { class: 'hint' }, def.note));
        foot.append(status(ctx, st.revealed ? 'Compare the suggested order with yours and note where your reasoning differed.' : `Correct${st.attempts > 1 ? ` after ${st.attempts} attempts` : ''}.`, st.revealed ? '' : 'ok'), keyPoints(ctx));
        return;
      }
      const list = h('div', { class: 'seq-list' + (def.showTable ? ' tabular' : '') });
      if (def.showTable) list.append(h('div', { class: 'seq-row seq-th', 'aria-hidden': 'true' }, h('span'), ...def.columns.map(c => h('span', null, c))));
      order.forEach(id => {
        const it = item(id), n = st.picks.indexOf(id) + 1;
        const res = st.checked && n ? (posOK(id, n) ? 'ok' : 'bad') : '';
        const locked = st.locked && st.locked.includes(id);
        const b = h('button', { type: 'button', class: `seq-row ${n ? 'picked' : ''} ${res} ${locked ? 'locked' : ''}`,
          'aria-label': `${it.text}${n ? `, step ${n}` : ', not yet ordered'}${res === 'ok' ? ', correct' : res === 'bad' ? ', incorrect' : ''}`,
          onclick: () => {
            if (locked) return;
            if (st.checked) { st.checked = false; }
            const k = st.picks.indexOf(id);
            if (k >= 0) st.picks.splice(k, 1); else st.picks.push(id);
            ctx.save(); draw();
            const again = body.querySelectorAll('.seq-row:not(.seq-th)')[order.indexOf(id)]; if (again) again.focus();
          } },
          h('span', { class: 'seq-dot' }, n ? String(n) : ''),
          h('span', { class: 'seq-text' }, it.text),
          ...(def.showTable ? it.cells.map(c => h('span', { class: 'seq-cell' }, c)) : []));
        list.append(b);
      });
      body.append(list);
      if (st.picks.length) body.append(h('p', { class: 'seq-trail', 'aria-hidden': 'true' }, st.picks.map((id, i) => `${i + 1}. ${item(id).text}`).join('   \u2192   ')));

      const err = h('p', { class: 'form-error', role: 'alert' });
      if (st.checked) {
        const good = st.picks.filter((id, i) => posOK(id, i + 1)).length;
        foot.append(status(ctx, `${good} of ${def.items.length} in a correct position. Items marked in pink are out of place.`, 'bad'));
        foot.append(h('button', { class: 'btn ghost', type: 'button', onclick: () => {
          let k = 0; while (k < st.picks.length && posOK(st.picks[k], k + 1)) k++;
          st.picks = st.picks.slice(0, k); st.locked = st.picks.slice(); st.checked = false; ctx.save(); draw();
        } }, 'Keep the correct start and try again'));
      }
      if (st.attempts >= 2) foot.append(h('button', { class: 'btn ghost', type: 'button', onclick: () => { st.revealed = true; st.done = true; ctx.complete(); draw(); } }, 'Show the suggested order'));
      if (!st.checked) foot.append(h('button', { class: 'btn primary', type: 'button', onclick: () => {
        const left = def.items.length - st.picks.length;
        if (left) { err.textContent = `Number all ${def.items.length} items before checking (${left} left).`; return; }
        st.attempts++;
        if (st.picks.every((id, i) => posOK(id, i + 1))) { st.done = true; ctx.complete(); }
        else { st.checked = true; ctx.save(); }
        draw();
      } }, 'Check my order'));
      foot.append(err);
    }
    draw();
    return sec;
  }

  /* ---------------- Match (1:1 pairs with connector lines) ---------------- */
  function match(ctx) {
    const { h, def, state: st } = ctx;
    st.links = st.links || {}; st.attempts = st.attempts || 0; st.locked = st.locked || [];
    const { sec, body, foot } = shell(ctx, 'match');
    const rOrder = shuffleOnce(st, 'order', def.right.map(r => r.id));
    let sel = null; // {side, id}
    const colors = ['#05B4E0', '#8B7CF6', '#E8890C', '#1FA97A', '#FF6F91', '#2DD4C8'];
    let svg, wrap, ro;

    function linkIndex(lid) { return def.left.findIndex(l => l.id === lid); }
    function rightOwner(rid) { return Object.keys(st.links).find(l => st.links[l] === rid); }
    function pick(side, id) {
      if (st.done) return;
      const lid = side === 'L' ? id : rightOwner(id);
      if (lid && st.locked.includes(lid)) return;
      if (st.lastWrong) st.lastWrong = null;
      // Clicking a linked item unlinks it
      if (side === 'L' && st.links[id] && !sel) { delete st.links[id]; ctx.save(); draw(); return; }
      if (side === 'R' && rightOwner(id) && !sel) { delete st.links[rightOwner(id)]; ctx.save(); draw(); return; }
      if (!sel || sel.side === side) { sel = (sel && sel.id === id) ? null : { side, id }; draw(); return; }
      const L = side === 'L' ? id : sel.id, Rr = side === 'R' ? id : sel.id;
      const prevOwner = rightOwner(Rr); if (prevOwner) delete st.links[prevOwner];
      st.links[L] = Rr; sel = null; ctx.save(); draw();
    }
    function itemBtn(side, it) {
      const linked = side === 'L' ? st.links[it.id] : rightOwner(it.id);
      const lid = side === 'L' ? it.id : rightOwner(it.id);
      const idx = lid ? linkIndex(lid) : -1;
      const locked = lid && (st.done || st.locked.includes(lid));
      const isSel = sel && sel.side === side && sel.id === it.id;
      const b = h('button', { type: 'button', class: `m-item ${linked ? 'linked' : ''} ${isSel ? 'sel' : ''} ${locked ? 'ok' : ''}`, 'data-side': side, 'data-id': it.id,
        'aria-pressed': isSel ? 'true' : 'false', style: linked ? `--lc:${colors[idx % colors.length]}` : null,
        onclick: () => { pick(side, it.id); const el = sec.querySelector(`.m-item[data-side="${side}"][data-id="${it.id}"]`); if (el) el.focus(); } },
        h('span', { class: 'm-badge', 'aria-hidden': 'true' }, linked ? String(idx + 1) : ''),
        h('span', { class: 'm-text' }, it.text));
      if (linked) b.setAttribute('aria-label', `${it.text}. Linked as pair ${idx + 1}${locked ? ', correct' : ''}`);
      return b;
    }
    function drawLines() {
      if (!svg || !wrap.isConnected) return;
      svg.innerHTML = '';
      // Decide by the container's own width (not by where the columns ended up), so
      // there's no feedback loop. Narrow: one column, no lines; numbered badges carry the pairing.
      const narrow = wrap.clientWidth < 560;
      wrap.classList.toggle('stacked', narrow);
      if (narrow) return;
      const colL = wrap.querySelector('.m-col.left'), colR = wrap.querySelector('.m-col.right');
      if (colR.getBoundingClientRect().left < colL.getBoundingClientRect().right - 2) return; // safety: never draw across overlapping columns
      const base = wrap.getBoundingClientRect();
      svg.setAttribute('width', base.width); svg.setAttribute('height', base.height);
      Object.keys(st.links).forEach(lid => {
        const a = wrap.querySelector(`.m-item[data-side="L"][data-id="${lid}"]`), b = wrap.querySelector(`.m-item[data-side="R"][data-id="${st.links[lid]}"]`);
        if (!a || !b) return;
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        const x1 = ra.right - base.left, y1 = ra.top + ra.height / 2 - base.top, x2 = rb.left - base.left, y2 = rb.top + rb.height / 2 - base.top;
        const mx = (x1 + x2) / 2;
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('d', `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
        p.setAttribute('stroke', colors[linkIndex(lid) % colors.length]);
        svg.append(p);
      });
    }
    function draw() {
      body.innerHTML = ''; foot.innerHTML = '';
      wrap = h('div', { class: 'm-wrap' });
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'm-lines'); svg.setAttribute('aria-hidden', 'true');
      const L = h('div', { class: 'm-col left' }, h('p', { class: 'zone-label' }, 'Predictable risk'), def.left.map(it => itemBtn('L', it)));
      const Rc = h('div', { class: 'm-col right' }, h('p', { class: 'zone-label' }, 'Planning control'), rOrder.map(id => itemBtn('R', def.right.find(r => r.id === id))));
      wrap.append(svg, L, Rc); body.append(wrap);
      if (ro) ro.disconnect();
      let lastW = -1;
      ro = new ResizeObserver(entries => {
        // Only react to width changes, and defer the layout change to the next frame so it
        // never happens inside the observer callback (avoids "ResizeObserver loop" errors).
        const w = Math.round(entries[0].contentRect.width);
        if (w === lastW) return;
        lastW = w; requestAnimationFrame(drawLines);
      });
      ro.observe(wrap);
      requestAnimationFrame(drawLines);

      if (st.done) {
        const ul = h('ul', { class: 'm-why' });
        def.left.forEach(l => ul.append(h('li', null, h('strong', null, l.text + ': '), def.why[l.id])));
        body.append(ul);
        foot.append(status(ctx, `All pairs matched${st.attempts > 1 ? ` in ${st.attempts} attempts` : ''}.`, 'ok'), keyPoints(ctx));
        return;
      }
      if (st.lastWrong) foot.append(status(ctx, `${def.left.length - st.lastWrong} of ${def.left.length} correct. The incorrect links were removed; correct pairs are locked in green.`, 'bad'));
      const err = h('p', { class: 'form-error', role: 'alert' });
      foot.append(h('button', { class: 'btn primary', type: 'button', onclick: () => {
        const left = def.left.filter(l => !st.links[l.id]).length;
        if (left) { err.textContent = `Link every item before checking (${left} left).`; return; }
        st.attempts++;
        let wrong = 0;
        def.left.forEach(l => { if (st.links[l.id] === def.pairs[l.id]) { if (!st.locked.includes(l.id)) st.locked.push(l.id); } else { delete st.links[l.id]; wrong++; } });
        if (!wrong) { st.done = true; ctx.complete(); } else { st.lastWrong = wrong; ctx.save(); }
        draw();
      } }, 'Check my matches'), err);
    }
    draw();
    return sec;
  }

  /* ---------------- Flip cards ---------------- */
  function flip(ctx) {
    const { h, def, state: st } = ctx;
    st.flipped = st.flipped || {};
    const { sec, body, foot } = shell(ctx, 'flip');
    function draw() {
      body.innerHTML = ''; foot.innerHTML = '';
      const grid = h('div', { class: 'flip-grid n' + def.cards.length });
      def.cards.forEach((c, i) => {
        const on = !!st.flipped[i];
        const card = h('button', { type: 'button', class: 'flip-card' + (on ? ' on' : ''), 'aria-pressed': on ? 'true' : 'false',
          'aria-label': `${c.front}. ${on ? 'Showing details' : 'Flip to see details'}`,
          onclick: () => {
            const was = !!st.flipped[i]; st.flipped[i] = true; card.classList.toggle('on');
            st.view = st.view || {}; st.view[i] = !card.classList.contains('on') ? 0 : 1;
            card.setAttribute('aria-pressed', card.classList.contains('on'));
            ctx.save();
            if (!was) { const all = def.cards.every((_, k) => st.flipped[k]); if (all && !st.done) { st.done = true; ctx.complete(); } drawFoot(); }
          } },
          h('span', { class: 'fc-inner' },
            h('span', { class: 'fc-face fc-front' }, h('span', { class: 'fc-icon', html: icon(c.icon) }), h('strong', null, c.front), h('span', { class: 'fc-sub' }, c.sub), h('span', { class: 'fc-cue' }, st.flipped[i] ? 'Seen \u00b7 tap to flip' : 'Tap to flip')),
            h('span', { class: 'fc-face fc-back', html: c.back })));
        if (st.view && st.view[i] === 0) card.classList.remove('on');
        grid.append(card);
      });
      body.append(grid); drawFoot();
    }
    function drawFoot() {
      foot.innerHTML = '';
      const n = def.cards.filter((_, k) => st.flipped[k]).length;
      if (st.done) foot.append(status(ctx, 'All cards explored.', 'ok'), keyPoints(ctx));
      else foot.append(status(ctx, `${n} of ${def.cards.length} explored`));
    }
    draw();
    return sec;
  }

  /* ---------------- Hunt (find the thing that matters) ---------------- */
  function hunt(ctx) {
    const { h, def, state: st } = ctx;
    st.tried = st.tried || [];
    const { sec, body, foot } = shell(ctx, 'hunt');
    let lastFb = st.lastId || null;
    function hot(id, content, tag = 'button', extra = '') {
      const tried = st.tried.includes(id), sp = def.spots[id];
      const cls = `hot ${extra} ${tried ? (sp.correct ? 'found' : 'miss') : ''} ${lastFb === id ? 'cur' : ''}`;
      return h('button', { type: 'button', class: cls, 'data-id': id, disabled: st.done && !sp.correct ? true : null,
        'aria-label': (typeof content === 'string' ? content : '') || null,
        onclick: () => {
          if (st.done) return;
          if (!st.tried.includes(id)) st.tried.push(id);
          lastFb = st.lastId = id;
          if (sp.correct) { st.done = true; ctx.complete(); } else ctx.save();
          draw();
          const el = sec.querySelector(`.hot[data-id="${id}"]`); if (el && !el.disabled) el.focus();
        } }, content);
    }
    function draw() {
      body.innerHTML = ''; foot.innerHTML = '';
      if (def.render === 'worklist') {
        const list = h('div', { class: 'worklist', role: 'list' });
        list.append(h('div', { class: 'wl-row wl-th', 'aria-hidden': 'true' }, ['Claim', 'Payer', 'Value', 'Days left', 'Note'].map(t => h('span', null, t))));
        def.rows.forEach(r => {
          const b = hot(r.id, [r.claim, r.payer, r.value, r.days, r.note].map((t, k) => h('span', { 'data-l': ['Claim', 'Payer', 'Value', 'Days left', 'Note'][k] }, t)), 'button', 'wl-row');
          b.setAttribute('aria-label', `${r.claim}, ${r.payer}, ${r.value}, ${r.days} days left. Note: ${r.note}`);
          list.append(h('div', { role: 'listitem' }, b));
        });
        body.append(list);
      } else if (def.render === 'tiles') {
        const g = h('div', { class: 'tiles' });
        def.tiles.forEach(t => { const b = hot(t.id, [h('span', { class: 'tl-l' }, t.label), h('span', { class: 'tl-v' }, t.value), h('span', { class: 'tl-s' }, t.sub)], 'button', 'tile'); b.setAttribute('aria-label', `${t.label}: ${t.value}. ${t.sub}`); g.append(b); });
        body.append(g);
      } else if (def.render === 'grid') {
        const tw = h('div', { class: 'table-wrap' });
        const t = h('table', { class: 'data hunt-grid' });
        t.append(h('thead', null, h('tr', null, h('th', null, 'Indicator'), def.weeks.map(w => h('th', null, w)))));
        const tb = h('tbody');
        def.gridRows.forEach(r => tb.append(h('tr', null, h('th', { scope: 'row' }, r.label), r.cells.map(([id, v], k) => {
          const b = hot(id, v, 'button', 'cell'); b.setAttribute('aria-label', `${r.label}, ${def.weeks[k]}: ${v}`); return h('td', null, b);
        }))));
        t.append(tb); tw.append(t); body.append(tw);
      }
      if (lastFb) {
        const sp = def.spots[lastFb];
        foot.append(h('div', { class: 'hunt-fb ' + (sp.correct ? 'ok' : 'bad'), role: 'status' }, h('strong', null, sp.correct ? 'Found it. ' : 'Not this one. '), sp.feedback));
      }
      if (st.done) foot.append(keyPoints(ctx));
      else if (st.tried.length) foot.append(h('p', { class: 'hint' }, `Tried ${st.tried.length}. Keep looking.`));
    }
    draw();
    return sec;
  }

  /* ---------------- Branching simulation ---------------- */
  function sim(ctx) {
    const { h, def, state: st } = ctx;
    st.step = st.step || 0; if (st.done && st.finished == null) st.finished = true; st.wrong = st.wrong || {}; st.history = st.history || [];
    const { sec, body, foot } = shell(ctx, 'sim');
    function draw() {
      body.innerHTML = ''; foot.innerHTML = '';
      if (st.step === 0 && !st.pick) body.append(h('p', { class: 'sim-intro' }, def.intro));
      else body.append(h('details', { class: 'sim-context' }, h('summary', null, 'Scenario'), h('p', null, def.intro)));
      if (st.finished) {
        const ol = h('ol', { class: 'sim-path' });
        def.steps.forEach((s, i) => {
          const c = s.options.find(o => o.correct);
          const tries = (st.wrong[i] || []).length;
          ol.append(h('li', null, h('strong', null, c.text), h('span', null, tries ? ` (${tries} other response${tries > 1 ? 's' : ''} tried first)` : ' (first try)')));
        });
        body.append(h('p', { class: 'zone-label' }, 'Your path through the scenario'), ol);
        foot.append(status(ctx, 'Scenario complete.', 'ok'), keyPoints(ctx),
          h('button', { class: 'btn ghost small', type: 'button', onclick: () => { if (!st.firstRun) st.firstRun = JSON.parse(JSON.stringify(st.wrong)); st.step = 0; st.wrong = {}; st.pick = null; st.finished = false; st.replays = (st.replays || 0) + 1; ctx.save(); draw(); } }, 'Replay the scenario'));
        return;
      }
      const s = def.steps[st.step];
      body.append(h('p', { class: 'sim-progress' }, `Decision ${st.step + 1} of ${def.steps.length}`));
      const pr = h('div', { class: 'sim-bar', 'aria-hidden': 'true' }); def.steps.forEach((_, i) => pr.append(h('span', { class: i < st.step ? 'done' : i === st.step ? 'cur' : '' }))); body.append(pr);
      body.append(h('div', { class: 'sim-situation prose', html: s.situation }));
      const opts = h('div', { class: 'sim-opts', role: 'group', 'aria-label': 'Choose a response' });
      const wrongHere = st.wrong[st.step] || [];
      s.options.forEach((o, oi) => {
        const isPick = st.pick === oi, tried = wrongHere.includes(oi);
        const cls = 'sim-opt' + (isPick ? (o.correct ? ' ok' : ' bad') : '') + (tried && !isPick ? ' tried' : '');
        opts.append(h('button', { type: 'button', class: cls, disabled: (st.pick != null) || tried ? true : null, onclick: () => {
          st.pick = oi;
          if (!o.correct) { st.wrong[st.step] = wrongHere.concat(oi); }
          ctx.save(); draw(); const f = sec.querySelector('.sim-fb'); if (f) f.focus();
        } }, h('span', { class: 'sim-letter' }, 'ABCD'[oi]), h('span', null, o.text)));
      });
      body.append(opts);
      if (st.pick != null) {
        const o = s.options[st.pick];
        const fb = h('div', { class: 'sim-fb ' + (o.correct ? 'ok' : 'bad'), tabindex: '-1', role: 'status' }, h('strong', null, o.correct ? 'Strong choice. ' : 'Think again. '), o.feedback);
        foot.append(fb);
        if (o.correct) {
          foot.append(h('button', { class: 'btn primary', type: 'button', onclick: () => {
            st.pick = null;
            if (st.step < def.steps.length - 1) st.step++; else { st.finished = true; st.done = true; ctx.complete(); }
            ctx.save(); draw(); const t = sec.querySelector('.sim-situation, .sim-path'); if (t) { t.setAttribute('tabindex', '-1'); t.focus(); }
          } }, st.step < def.steps.length - 1 ? 'Continue' : 'Finish the scenario'));
        } else {
          foot.append(h('button', { class: 'btn primary', type: 'button', onclick: () => { st.pick = null; ctx.save(); draw(); const b = sec.querySelector('.sim-opt:not([disabled])'); if (b) b.focus(); } }, 'Try again'));
        }
      }
    }
    draw();
    return sec;
  }

  /* ---------------- Self-check ---------------- */
  function selfcheck(ctx) {
    const { h, def, state: st } = ctx;
    st.answers = st.answers || {};
    const { sec, body, foot } = shell(ctx, 'selfcheck');
    function draw() {
      body.innerHTML = ''; foot.innerHTML = '';
      const ol = h('ol', { class: 'sc-list' });
      def.statements.forEach((s, i) => {
        const v = st.answers[i];
        const set = val => () => { st.answers[i] = val; ctx.save(); const all = def.statements.every((_, k) => st.answers[k] != null); if (all && !st.done) { st.done = true; ctx.complete(); } draw(); sec.querySelectorAll('.sc-row')[i].querySelector(`[data-v="${val}"]`).focus(); };
        ol.append(h('li', { class: 'sc-row' }, h('span', { class: 'sc-text', id: `sc-${i}` }, s),
          h('span', { class: 'sc-toggle', role: 'group', 'aria-labelledby': `sc-${i}` },
            h('button', { type: 'button', 'data-v': 'true', class: v === true ? 'on' : '', 'aria-pressed': v === true ? 'true' : 'false', onclick: set(true) }, 'True for me'),
            h('button', { type: 'button', 'data-v': 'false', class: v === false ? 'on' : '', 'aria-pressed': v === false ? 'true' : 'false', onclick: set(false) }, 'Not really'))));
      });
      body.append(ol);
      const answered = Object.keys(st.answers).length, score = Object.values(st.answers).filter(Boolean).length;
      const band = def.bands.find(b => score <= b.max);
      const meter = h('div', { class: 'sc-meter', 'aria-hidden': 'true' });
      def.bands.forEach(b => meter.append(h('span', { class: band === b ? 'on' : '' }, b.label)));
      foot.append(h('div', { class: 'sc-score', role: 'status' }, h('strong', null, `Your score: ${score} of ${def.statements.length}`),
        answered < def.statements.length ? h('span', null, ` \u00b7 ${def.statements.length - answered} still to answer`) : h('span', null, ` \u00b7 ${band.label}. ${band.text}`)), meter);
      if (st.done) foot.append(keyPoints(ctx));
    }
    draw();
    return sec;
  }

  /* ---------------- Capacity calculator ---------------- */
  function calculator(ctx) {
    const { h, def, state: st } = ctx;
    st.values = Object.assign({}, def.defaults, st.values || {});
    const { sec, body, foot } = shell(ctx, 'calc');
    const fields = [['people', 'People available', 1, 1, 200], ['hours', 'Hours each', 0.5, 1, 12], ['productive', 'Productive time (%)', 1, 10, 100], ['volume', 'Claims due', 1, 0, 100000], ['rate', 'Claims per hour', 0.5, 0.5, 100]];
    const out = h('div', { class: 'calc-out', role: 'status', 'aria-live': 'polite' });
    const grid = h('div', { class: 'calc-grid' });
    fields.forEach(([k, label, step, min, max]) => {
      const id = 'calc-' + k;
      const inp = h('input', { id, type: 'number', step, min, max, inputmode: 'decimal' }); inp.value = st.values[k];
      inp.addEventListener('input', () => { const n = parseFloat(inp.value); if (!isNaN(n) && n >= 0) { st.values[k] = n; ctx.save(); calc(); } });
      grid.append(h('label', { for: id }, label, inp));
    });
    function calc() {
      const v = st.values, cap = v.people * v.hours * v.productive / 100, need = v.rate > 0 ? v.volume / v.rate : 0, gap = need - cap;
      out.innerHTML = '';
      out.append(h('p', null, h('strong', null, `Capacity \u2248 ${cap.toFixed(1)} hrs`), `  \u00b7  Work due \u2248 ${need.toFixed(1)} hrs`));
      out.className = 'calc-out ' + (gap > 0.05 ? 'bad' : 'ok');
      out.append(h('p', null, gap > 0.05 ? `Short by about ${gap.toFixed(1)} hours. Decide now what moves, what gets help, and what you escalate.` : `Fits, with about ${(-gap).toFixed(1)} hours to spare. Keep 10\u201315% buffer in busy weeks.`));
    }
    body.append(grid, out);
    foot.append(h('button', { class: 'btn ghost small', type: 'button', onclick: () => { st.values = Object.assign({}, def.defaults); ctx.save(); grid.querySelectorAll('input').forEach((i, n) => { i.value = st.values[fields[n][0]]; }); calc(); } }, 'Reset to example'));
    calc();
    return sec;
  }

  const R = { buckets, sequence, match, flip, hunt, sim, selfcheck, calculator };
  window.Activities = { render: (id, ctx) => R[ctx.def.type](ctx), icon };
})();
