/* ==========================================================================
   Certificate (canvas -> PNG) and "PDF of my answers" (jsPDF, with a
   print-to-PDF fallback if the CDN script is blocked).
   ========================================================================== */
(function () {
  'use strict';
  const NAVY = '#0B1E3A', CYAN = '#05B4E0', TEAL = '#2DD4C8', SLATE = '#5B6B80', LINE = '#DAE4EA';

  function loadImg(src) {
    return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  }
  async function fontsReady() {
    try {
      await Promise.all(['400', '600', '700'].map(w => document.fonts.load(`${w} 40px "Proxima Nova"`)));
      await document.fonts.ready;
    } catch (e) { /* fall back to system font */ }
  }
  function fmtDate(iso) {
    const d = iso ? new Date(iso) : new Date();
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  }
  function slantBar(ctx, x, y, w, hgt, rise, fill) {
    // A parallelogram like the logo mark: vertical sides, top and bottom rising to the right.
    const r = Math.min(10, w / 4);
    ctx.beginPath();
    ctx.moveTo(x, y + rise + r);
    ctx.quadraticCurveTo(x, y + rise, x + r, y + rise - r * rise / w);
    ctx.lineTo(x + w - r, y + r * rise / w);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + hgt - rise - r);
    ctx.quadraticCurveTo(x + w, y + hgt - rise, x + w - r, y + hgt - rise + r * rise / w);
    ctx.lineTo(x + r, y + hgt - r * rise / w);
    ctx.quadraticCurveTo(x, y + hgt, x, y + hgt - r);
    ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
  }

  async function drawCert(canvas, c) {
    const S = c.S, W = 2000, H = 1414;
    canvas.width = W; canvas.height = H;
    const g = canvas.getContext('2d');
    await fontsReady();
    const F = (w, s) => `${w} ${s}px "Proxima Nova", "Helvetica Neue", Arial, sans-serif`;

    g.fillStyle = '#FFFFFF'; g.fillRect(0, 0, W, H);
    // Left navy panel with rising bars motif
    g.fillStyle = NAVY; g.fillRect(0, 0, 520, H);
    const grad = g.createLinearGradient(0, H, 520, 300);
    grad.addColorStop(0, CYAN); grad.addColorStop(1, TEAL);
    const bars = [[70, 900, 340], [180, 760, 480], [290, 620, 620], [400, 470, 770]];
    bars.forEach(([x, y, hh]) => slantBar(g, x, y, 80, hh, 40, grad));
    g.fillStyle = 'rgba(255,255,255,0.72)'; g.font = F(600, 26);
    g.fillText('Plan the work.', 70, 160); g.fillText('Work the plan.', 70, 198);

    // Border on the content side
    g.strokeStyle = LINE; g.lineWidth = 3; g.strokeRect(560, 40, W - 600, H - 80);

    try {
      const logo = await loadImg('assets/img/logo-horizontal-dark.png');
      const lw = 440, lh = lw * logo.height / logo.width;
      g.drawImage(logo, W - 100 - lw, 100, lw, lh);
    } catch (e) { /* logo optional */ }

    const x = 660;
    g.fillStyle = CYAN; g.font = F(700, 30); g.fillText('Certificate of completion', x, 260);
    g.fillStyle = SLATE; g.font = F(400, 34); g.fillText('This certifies that', x, 380);
    // Name, shrink to fit
    let size = 110; const maxW = W - x - 120;
    g.font = F(700, size);
    while (g.measureText(S.name).width > maxW && size > 48) { size -= 4; g.font = F(700, size); }
    g.fillStyle = NAVY; g.fillText(S.name, x, 380 + size + 20);
    const y0 = 380 + size + 110;
    g.fillStyle = SLATE; g.font = F(400, 34); g.fillText('has completed the self-paced course', x, y0);
    g.fillStyle = NAVY; g.font = F(700, 58); g.fillText(c.C.title, x, y0 + 80);
    g.fillStyle = SLATE; g.font = F(400, 30);
    const pathLine = S.path ? `${c.C.programme}  \u00b7  ${c.P[S.path].role} path` : c.C.programme;
    g.fillText(pathLine, x, y0 + 135);

    // Stats row
    const fq = S.quiz.final, score = fq && fq.best != null ? fq.best + '%' : '\u2014';
    const stats = [['Knowledge check score', score], ['Time invested', c.fmtTime(S.seconds)], ['Date completed', fmtDate(S.completedAt)]];
    const sy = H - 300, colW = (W - x - 120) / 3;
    g.strokeStyle = LINE; g.lineWidth = 2; g.beginPath(); g.moveTo(x, sy - 60); g.lineTo(W - 120, sy - 60); g.stroke();
    stats.forEach(([l, v], i) => {
      const sx = x + i * colW;
      g.fillStyle = SLATE; g.font = F(600, 24); g.fillText(l, sx, sy);
      g.fillStyle = NAVY; g.font = F(700, 48); g.fillText(v, sx, sy + 66);
    });
    g.fillStyle = SLATE; g.font = F(400, 22);
    g.fillText(`Development need: ${c.C.need}  \u00b7  HealthRecon Connect`, x, H - 90);
  }

  window.Cert = {
    draw: drawCert,
    render(c) {
      const { h } = c;
      const wrap = h('div', { class: 'cert' });
      if (!c.certReady()) {
        wrap.append(h('p', null, 'Your certificate unlocks when you\u2019ve finished these:'), c.checklistEl());
        return wrap;
      }
      c.markComplete();
      const canvas = h('canvas', { class: 'cert-canvas', role: 'img', 'aria-label': `Certificate of completion for ${c.S.name}` });
      const msg = h('p', { class: 'rf-status', 'aria-live': 'polite' }, 'Drawing your certificate\u2026');
      const btn = h('button', { class: 'btn primary', type: 'button', disabled: true }, 'Download certificate (PNG)');
      btn.addEventListener('click', () => {
        try {
          const a = document.createElement('a');
          a.download = `Certificate - ${c.C.title} - ${c.S.name}.png`.replace(/[\\/:*?"<>|]/g, '');
          a.href = canvas.toDataURL('image/png');
          document.body.append(a); a.click(); a.remove();
          msg.textContent = 'Certificate downloaded.';
        } catch (e) {
          msg.textContent = 'Your browser blocked the download. Open the course from its web address (not a local file) and try again.';
        }
      });
      wrap.append(h('p', null, `Congratulations, ${c.S.name}. Here\u2019s your certificate.`), canvas, h('div', { class: 'dl-row' }, btn, h('a', { class: 'btn ghost', href: '#/finish/1' }, 'Download PDF of my answers')), msg);
      drawCert(canvas, c).then(() => { btn.disabled = false; msg.textContent = ''; window.__certDrawn = true; });
      return wrap;
    }
  };

  /* ---------------- Report ---------------- */
  function actSummary(def, st) {
    st = st || {};
    const lines = [];
    const status = st.done ? 'Completed' : (Object.keys(st).length ? 'In progress' : 'Not started');
    switch (def.type) {
      case 'buckets': {
        lines.push(`${status}${st.attempts ? ` \u00b7 ${st.attempts} check${st.attempts > 1 ? 's' : ''}` : ''}`);
        def.buckets.forEach(b => {
          const its = def.items.filter(i => (st.place || {})[i.id] === b.id).map(i => i.text);
          if (its.length) lines.push(`${b.label}: ${its.join('; ')}`);
        });
        break;
      }
      case 'sequence': {
        lines.push(`${status}${st.attempts ? ` \u00b7 ${st.attempts} check${st.attempts > 1 ? 's' : ''}` : ''}${st.revealed ? ' \u00b7 suggested order revealed' : ''}`);
        const ids = st.done && !st.revealed ? def.items.map(i => i.id) : (st.picks || []);
        ids.forEach((id, k) => { const it = def.items.find(i => i.id === id); lines.push(`${k + 1}. ${it.text}${st.done ? ' \u2014 ' + it.detail : ''}`); });
        break;
      }
      case 'match': {
        lines.push(`${status}${st.attempts ? ` \u00b7 ${st.attempts} check${st.attempts > 1 ? 's' : ''}` : ''}`);
        def.left.forEach(l => { const r = (st.links || {})[l.id]; if (r) lines.push(`${l.text} \u2192 ${def.right.find(x => x.id === r).text}`); });
        break;
      }
      case 'flip': lines.push(`${status} \u00b7 ${def.cards.filter((_, k) => (st.flipped || {})[k]).length} of ${def.cards.length} cards explored`); break;
      case 'hunt': {
        lines.push(`${status}${st.tried ? ` \u00b7 ${st.tried.length} attempt${st.tried.length > 1 ? 's' : ''}` : ''}`);
        if (st.done) { const k = Object.keys(def.spots).find(s => def.spots[s].correct); lines.push(def.spots[k].feedback); }
        break;
      }
      case 'sim': {
        lines.push(status);
        const wrong = st.firstRun || st.wrong || {};
        const reached = st.done ? def.steps.length : (st.step || 0);
        def.steps.forEach((s, i) => {
          if (i >= reached) return;
          const t = (wrong[i] || []).length;
          lines.push(`Decision ${i + 1}: ${s.options.find(o => o.correct).text} (${t ? `${t} other response${t > 1 ? 's' : ''} tried first` : 'first try'})`);
        });
        break;
      }
      case 'selfcheck': {
        const a = st.answers || {}, sc = Object.values(a).filter(Boolean).length;
        const band = def.bands.find(b => sc <= b.max);
        lines.push(`${status} \u00b7 score ${sc} of ${def.statements.length}${Object.keys(a).length === def.statements.length ? ` (${band.label})` : ''}`);
        def.statements.forEach((s, i) => { if (a[i] != null) lines.push(`${a[i] ? 'True for me' : 'Not really'}: ${s}`); });
        break;
      }
      case 'calculator': {
        const v = Object.assign({}, def.defaults, st.values || {});
        const cap = v.people * v.hours * v.productive / 100, need = v.rate ? v.volume / v.rate : 0;
        lines.push(`${v.people} people \u00d7 ${v.hours} hrs \u00d7 ${v.productive}% = ${cap.toFixed(1)} hrs capacity; ${v.volume} claims \u00f7 ${v.rate}/hr = ${need.toFixed(1)} hrs due`);
        break;
      }
    }
    return lines;
  }

  function buildReport(c) {
    const { S, C, M, A, Q, R, P, V } = c;
    const fq = S.quiz.final;
    const doc = { title: 'My answers: ' + C.title, meta: [
      ['Learner', S.name || '(name not entered)'],
      ['Path', S.path ? `${P[S.path].role}: ${P[S.path].title}` : 'Not chosen yet'],
      ['Time invested', c.fmtTime(S.seconds)],
      ['Final knowledge check', fq && fq.attempts ? `${fq.best}% (${fq.best >= C.passMark ? 'passed' : 'not yet passed'}; pass mark ${C.passMark}%)` : 'Not attempted'],
      ['Generated', new Date().toLocaleString()]
    ], sections: [] };
    doc.sections.push({ heading: 'Scores', items: c.scoreRows().map(r => ({ label: r[0], lines: [r[1]] })) });
    M.forEach(m => {
      if (m.path && m.path !== S.path) {
        const touched = m.pages.some(p => p.blocks.some(b => (b.t === 'act' && S.act[b.id] && Object.keys(S.act[b.id]).length > 1) || (b.t === 'reflect' && S.refl[b.id])));
        if (!touched) return;
      }
      const items = [];
      m.pages.forEach(p => p.blocks.forEach(b => {
        if (b.t === 'act') items.push({ label: A[b.id].title, lines: actSummary(A[b.id], S.act[b.id]) });
        if (b.t === 'video') { const v = S.video[b.id] || {}; items.push({ label: V[b.id].title, lines: [v.reviewed ? `Reviewed (${v.reviewedVia === 'summary' ? 'read the text summary' : 'watched the video'})` : 'Not yet reviewed'] }); }
        if (b.t === 'reflect') items.push({ label: 'Reflection: ' + R[b.id], lines: [S.refl[b.id] && S.refl[b.id].trim() ? S.refl[b.id].trim() : '(No answer yet)'], quote: true });
        if (b.t === 'quiz' && b.id !== 'final') { const q = S.quiz[b.id]; items.push({ label: Q[b.id].title, lines: [q && q.attempts ? `Best score ${q.best}% over ${q.attempts} attempt${q.attempts > 1 ? 's' : ''}` : 'Not attempted'] }); }
      }));
      if (items.length) doc.sections.push({ heading: m.title + (m.path && m.path !== S.path ? ' (optional path)' : ''), items });
    });
    return doc;
  }

  // jsPDF's built-in fonts use WinAnsi encoding; map characters outside it.
  const pdfSafe = s => String(s).replace(/\u2212/g, '-').replace(/\u2192/g, '->').replace(/\u2190/g, '<-').replace(/\u2265/g, '>=').replace(/\u2248/g, '~').replace(/\u203a/g, '>').replace(/[\u00a0\u202f]/g, ' ');

  function viaJsPDF(doc, fname) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const W = pdf.internal.pageSize.getWidth(), H = pdf.internal.pageSize.getHeight(), M = 50, TW = W - 2 * M;
    let y = M;
    const ensure = n => { if (y + n > H - M) { pdf.addPage(); y = M; } };
    const write = (text, size, style, color, gap = 4, indent = 0) => {
      pdf.setFont('helvetica', style); pdf.setFontSize(size); pdf.setTextColor(color);
      pdf.splitTextToSize(pdfSafe(text), TW - indent).forEach(line => { ensure(size + gap); pdf.text(line, M + indent, y + size); y += size + gap; });
    };
    pdf.setFillColor(11, 30, 58); pdf.rect(0, 0, W, 8, 'F');
    write(doc.title, 18, 'bold', '#0B1E3A', 6); y += 6;
    doc.meta.forEach(([k, v]) => write(`${k}: ${v}`, 10, 'normal', '#5B6B80', 3));
    doc.sections.forEach(sec => {
      y += 14; ensure(40);
      pdf.setDrawColor(218, 228, 234); pdf.line(M, y, W - M, y); y += 8;
      write(sec.heading, 14, 'bold', '#0B1E3A', 6);
      sec.items.forEach(it => {
        y += 4; write(it.label, 10.5, 'bold', '#0B1E3A', 3);
        it.lines.forEach(l => write(l, 10, it.quote ? 'italic' : 'normal', '#26384F', 3, 10));
      });
    });
    const n = pdf.getNumberOfPages();
    for (let i = 1; i <= n; i++) { pdf.setPage(i); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(8); pdf.setTextColor('#8A97A8'); pdf.text(`HealthRecon Connect \u00b7 ${pdfSafe(doc.title)} \u00b7 Page ${i} of ${n}`, M, H - 24); }
    pdf.save(fname);
  }

  function viaPrint(doc) {
    let el = document.getElementById('print-report');
    if (!el) { el = document.createElement('div'); el.id = 'print-report'; document.body.append(el); }
    const e = s => String(s).replace(/[&<>]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[ch]));
    el.innerHTML = `<img src="assets/img/logo-horizontal-dark.png" alt="HealthRecon Connect" class="pr-logo"><h1>${e(doc.title)}</h1>
      <dl>${doc.meta.map(([k, v]) => `<dt>${e(k)}</dt><dd>${e(v)}</dd>`).join('')}</dl>
      ${doc.sections.map(s => `<section><h2>${e(s.heading)}</h2>${s.items.map(it => `<h3>${e(it.label)}</h3>${it.lines.map(l => `<p class="${it.quote ? 'q' : ''}">${e(l)}</p>`).join('')}`).join('')}</section>`).join('')}`;
    document.body.classList.add('printing-report');
    const done = () => { document.body.classList.remove('printing-report'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    setTimeout(() => window.print(), 50);
  }

  /* jsPDF is fetched only when a learner asks for a PDF, so a blocked CDN never
     produces an error on page load. Falls back to the print dialog. */
  const JSPDF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  let jspdfPromise = null;
  function loadJsPDF() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve();
    if (jspdfPromise) return jspdfPromise;
    jspdfPromise = new Promise((resolve, reject) => {
      const sc = document.createElement('script');
      const timer = setTimeout(() => fail(new Error('timeout')), 8000);
      function fail(err) { clearTimeout(timer); sc.remove(); jspdfPromise = null; reject(err); }
      sc.src = JSPDF_URL; sc.async = true;
      sc.onload = () => { clearTimeout(timer); (window.jspdf && window.jspdf.jsPDF) ? resolve() : fail(new Error('jsPDF missing')); };
      sc.onerror = () => fail(new Error('blocked'));
      document.head.append(sc);
    });
    return jspdfPromise;
  }

  window.Report = {
    build: buildReport,
    async download(c, msgEl) {
      const doc = buildReport(c);
      const fname = `My answers - ${c.C.title}${c.S.name ? ' - ' + c.S.name : ''}.pdf`.replace(/[\\/:*?"<>|]/g, '');
      if (msgEl) msgEl.textContent = 'Preparing your PDF\u2026';
      try {
        await loadJsPDF();
        viaJsPDF(doc, fname);
        if (msgEl) msgEl.textContent = 'PDF downloaded.';
        return 'jspdf';
      } catch (e) {
        if (msgEl) msgEl.textContent = 'The PDF library couldn\u2019t load on this network, so your print dialog is opening instead. Choose \u201cSave as PDF\u201d as the destination.';
        viaPrint(doc);
        return 'print';
      }
    }
  };
})();
