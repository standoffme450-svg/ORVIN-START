/* ORVIN — Matematika MOCK (milliy sertifikat shakli)
   • 45 topshiriq: yopiq (A–D), moslashtirish (A–F), ochiq (a va b qismlar, javob yoziladi)
   • rasmli masalalar (SVG), formulalar KaTeX bilan (internet bo'lmasa oddiy ko'rinishga o'tadi)
   • vaqt 150 daqiqa, javoblar avtomatik saqlanadi, sahifa yangilansa davom etadi
   • variantlar ms-mock-v1.js, ms-mock-v2.js ... fayllarida (window.MSMockBanks.push({...}))
   API: MSMock.open({variant, resume, onFinish(res), onGo(topic), onClose()}) · MSMock.variants() · MSMock.hasSession() */
(function () {
  'use strict';
  if (window.MSMock) return;
  const M = window.MSMath;
  const DURATION_MIN = 150;
  const SKEY = 'orvin_ms_mock_session';
  const LG = () => window.ORVIN_LANG || 'en';
  window.MSMockBanks = window.MSMockBanks || [];

  /* ---------- matnlar ---------- */
  const L = {
    uz: { note: 'Javoblar avtomatik saqlanadi · vaqt davom etadi', un: 'Javobsiz', ta: 'ta', q: 'savol', ball: 'ball', open: 'Ochiq topshiriq', match: 'Moslashtirish', write: 'Javobni yozing', next: 'Keyingisi', prev: 'Orqaga', finish: 'Yakunlash', see: 'rasmga qarang', sure: 'Testni yakunlaymizmi?', left: 'Javobsiz savollar', yes: 'Yakunlash', no: 'Davom etish', score: 'Ball', level: 'Daraja', nocert: 'Sertifikat berilmaydi', right: "To'g'ri javoblar", weak: 'Takrorlash kerak', study: "O'rganish →", review: 'Xatolar tahlili', your: 'Sizning javobingiz', corr: "To'g'ri javob", sol: 'Yechim', none: '—', again: 'Yangi urinish', close: 'Yopish', pick: 'Quyidagi variantlardan har bir topshiriq uchun javob tanlang', time: "Vaqt tugadi — natija hisoblandi", part: 'qism', byType: 'Topshiriq turlari bo\'yicha', closed: 'Yopiq', exitHint: 'Chiqib ketsangiz, test saqlanadi va vaqt davom etadi' },
    ru: { note: 'Ответы сохраняются автоматически · время идёт', un: 'Без ответа', ta: '', q: 'вопрос', ball: 'балла', open: 'Открытое задание', match: 'Соответствие', write: 'Введите ответ', next: 'Далее', prev: 'Назад', finish: 'Завершить', see: 'см. рисунок', sure: 'Завершить тест?', left: 'Вопросов без ответа', yes: 'Завершить', no: 'Продолжить', score: 'Балл', level: 'Уровень', nocert: 'Сертификат не выдаётся', right: 'Верных ответов', weak: 'Нужно повторить', study: 'Изучить →', review: 'Разбор ошибок', your: 'Ваш ответ', corr: 'Верный ответ', sol: 'Решение', none: '—', again: 'Новая попытка', close: 'Закрыть', pick: 'Выберите ответ для каждого задания', time: 'Время вышло — результат подсчитан', part: 'часть', byType: 'По типам заданий', closed: 'Закрытые', exitHint: 'Если выйдете, тест сохранится, а время продолжит идти' },
    en: { note: 'Answers are saved automatically · the clock keeps running', un: 'Unanswered', ta: '', q: 'Question', ball: 'pts', open: 'Open task', match: 'Matching', write: 'Type your answer', next: 'Next', prev: 'Back', finish: 'Finish', see: 'see the figure', sure: 'Finish the test?', left: 'Unanswered questions', yes: 'Finish', no: 'Keep going', score: 'Score', level: 'Level', nocert: 'No certificate', right: 'Correct answers', weak: 'Topics to review', study: 'Study →', review: 'Mistakes review', your: 'Your answer', corr: 'Correct answer', sol: 'Solution', none: '—', again: 'New attempt', close: 'Close', pick: 'Choose an answer for each task', time: 'Time is up — result calculated', part: 'part', byType: 'By task type', closed: 'Closed', exitHint: 'If you leave, the test is saved and the clock keeps running' }
  };
  const t = k => (L[LG()] || L.en)[k] || k;
  const pick = o => o && (o[LG()] || o.uz || o.en || '');
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const fmtPts = p => String(Math.round(p * 10) / 10).replace('.', ',');

  /* ---------- formulalar: KaTeX (CDN) + oflayn zaxira ---------- */
  let katexLoading = false;
  function loadKatex() {
    if (window.katex || katexLoading) return; katexLoading = true;
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css'; document.head.appendChild(l);
    const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js';
    s.onload = () => { if (root.classList.contains('show')) render(); }; document.head.appendChild(s);
  }
  function plain(s) {
    let r = String(s);
    for (let i = 0; i < 6; i++) r = r.replace(/\\d?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '($1)/($2)').replace(/\\d?frac\s*(\d)\s*(\d+)/g, '$1/$2');
    r = r.replace(/\\sqrt\[(\d)\]\s*\{([^{}]*)\}/g, (_, n, x) => ({ 3: '∛', 4: '∜' }[n] || n + '√') + '(' + x + ')').replace(/\\sqrt\[(\d)\]\s*(\d+)/g, (_, n, x) => ({ 3: '∛', 4: '∜' }[n] || n + '√') + x)
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, '√($1)').replace(/\\sqrt\s*(\d+)/g, '√$1');
    const map = { '\\cdot': '·', '\\le': '≤', '\\leq': '≤', '\\ge': '≥', '\\geq': '≥', '\\ne': '≠', '\\pi': 'π', '\\circ': '°', '\\%': '%', '\\angle': '∠', '\\triangle': '△', '\\cup': '∪', '\\cap': '∩', '\\in': '∈', '\\infty': '∞', '\\Rightarrow': '⇒', '\\to': '→', '\\alpha': 'α', '\\beta': 'β', '\\varphi': 'φ', '\\perp': '⊥', '\\parallel': '∥', '\\sim': '∼', '\\int': '∫', '\\,': ' ', '\\;': ' ', '\\ ': ' ', '\\quad': '  ', '\\left': '', '\\right': '', '\\lg': 'lg', '\\log': 'log', '\\sin': 'sin', '\\cos': 'cos', '\\tg': 'tg', '\\ctg': 'ctg', '\\ln': 'ln', '\\times': '×', '\\pm': '±', '\\mathrm': '', '\\vec': '' };
    Object.keys(map).sort((a, b) => b.length - a.length).forEach(k => { r = r.split(k).join(map[k]); });
    r = r.replace(/\\text\s*\{([^{}]*)\}/g, '$1').replace(/_\{([^{}]*)\}/g, '_$1').replace(/\^\{([^{}]*)\}/g, '^$1').replace(/\{,\}/g, ',').replace(/[{}]/g, '');
    return r;
  }
  function kx(m, display) {
    if (window.katex) { try { return window.katex.renderToString(m, { throwOnError: false, displayMode: !!display }); } catch (e) { } }
    return '<span class="mk-pl">' + esc(plain(m)) + '</span>';
  }
  const rich = s => String(s == null ? '' : s).split(/\$([^$]+)\$/).map((p, i) => i % 2 ? kx(p) : esc(p).replace(/\n/g, '<br>')).join('');
  const mth = s => kx(String(s));

  /* ---------- rasm (SVG) yordamchilari ---------- */
  const INK = '#d8f6ff', ACC = '#0ff', PINK = 'rgba(0,255,255,.16)';
  const Fg = {
    svg: (w, h, b) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${b}</svg>`,
    line: (a, b, o = {}) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${o.c || INK}" stroke-width="${o.w || 2.8}"${o.d ? ' stroke-dasharray="' + o.d + '"' : ''} stroke-linecap="round"/>`,
    poly: (pts, o = {}) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${o.f || 'none'}" stroke="${o.c || INK}" stroke-width="${o.w || 2.8}" stroke-linejoin="round"/>`,
    circ: (c, r, o = {}) => `<circle cx="${c[0]}" cy="${c[1]}" r="${r}" fill="${o.f || 'none'}" stroke="${o.c || INK}" stroke-width="${o.w || 2.8}"/>`,
    dot: p => `<circle cx="${p[0]}" cy="${p[1]}" r="4.6" fill="${INK}"/>`,
    txt: (p, s, o = {}) => `<text x="${p[0]}" y="${p[1]}" text-anchor="${o.a || 'middle'}" class="${o.r ? 'r' : ''}">${esc(s)}</text>`,
    inter: (p1, p2, p3, p4) => { const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]); const a = p1[0] * p2[1] - p1[1] * p2[0], b = p3[0] * p4[1] - p3[1] * p4[0]; return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d]; },
    mid: (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2],
    lerp: (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k],
    add: (p, dx, dy) => [p[0] + dx, p[1] + dy],
    wsum: (ws, ps) => { const s = ws.reduce((x, y) => x + y, 0); return [ps.reduce((x, p, i) => x + p[0] * ws[i], 0) / s, ps.reduce((x, p, i) => x + p[1] * ws[i], 0) / s]; }
  };
  window.MSMockFig = Fg;

  /* ---------- holat ---------- */
  const S = { state: 'idle', v: null, ans: {}, cur: 0, end: 0, perm: {}, tm: null, cb: {}, res: null, ask: false };
  const bank = id => window.MSMockBanks.find(b => b.id === id) || window.MSMockBanks[0];
  const typeOf = n => M.BLUEPRINT[n - 1].type;
  const ptsOf = n => M.BLUEPRINT[n - 1].points;

  function save() {
    try { localStorage.setItem(SKEY, JSON.stringify({ v: S.v, end: S.end, ans: S.ans, cur: S.cur, perm: S.perm, state: S.state })); } catch (e) { }
  }
  function loadSession() {
    try { const s = JSON.parse(localStorage.getItem(SKEY) || 'null'); if (s && s.state === 'run' && s.end > Date.now() && bank(s.v)) return s; } catch (e) { }
    return null;
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  /* ---------- javoblarni tekshirish ---------- */
  function num(s) {
    s = String(s == null ? '' : s).trim().replace(/\u2212|\u2013/g, '-').replace(/\s+/g, '').replace(',', '.');
    let m = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/); if (m) return +m[1] / +m[2];
    return /^-?\d+(?:\.\d+)?$/.test(s) ? parseFloat(s) : NaN;
  }
  const openOk = (sub, val) => { const v = num(val); return isFinite(v) && (Array.isArray(sub.a) ? sub.a : [sub.a]).some(a => Math.abs(num(a) - v) < 1e-4); };
  function qItem(n) { return bank(S.v).q[n - 1]; }
  function displayOpts(n) {
    const q = qItem(n), ty = typeOf(n); if (ty === 'O') return null;
    if (ty === 'M' || q.fixed) return q.o.map((o, i) => ({ o, i }));
    if (!S.perm[n]) S.perm[n] = shuffle(q.o.map((_, i) => i));
    return S.perm[n].map(i => ({ o: q.o[i], i }));
  }
  function isAnswered(n) {
    const a = S.ans[n]; if (typeOf(n) === 'O') return !!(a && ((a.a || '').trim() || (a.b || '').trim())); return a != null;
  }
  const unanswered = () => { let k = 0; for (let n = 1; n <= 45; n++) if (!isAnswered(n)) k++; return k; };

  /* ---------- DOM ---------- */
  const css = document.createElement('style');
  css.textContent = `#msMock{position:fixed;inset:0;z-index:10020;display:none;flex-direction:column;color:#eafaff;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:radial-gradient(ellipse at 50% -10%,rgba(0,120,200,.28),transparent 60%),linear-gradient(rgba(1,5,14,.92),rgba(1,5,14,.98)),#030814}
#msMock.show{display:flex}
#msMock .mk-variant-wrap{max-width:680px;margin:28px auto;padding:22px;width:calc(100% - 28px);box-sizing:border-box}
#msMock .mk-variant-wrap h2{font-size:24px;margin:0 0 8px;color:#eafaff}
#msMock .mk-variant-wrap p{color:#a9cce8;line-height:1.5;margin:0 0 22px}
#msMock .mk-variant-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
#msMock .mk-variant{position:relative;text-align:left;padding:18px;border:1px solid rgba(70,160,255,.55);border-radius:16px;background:linear-gradient(135deg,rgba(0,105,210,.28),rgba(0,45,100,.45));color:#eafaff!important;display:flex;flex-direction:column;gap:7px;min-height:92px}
#msMock .mk-variant b{font-size:18px;color:#8fcaff}
#msMock .mk-variant span{font-size:13px;color:#b8d8f5}
#msMock .mk-variant i{position:absolute;right:16px;top:25px;font-style:normal;color:#65b5ff;font-size:22px}
#msMock .mk-variant-back{margin-top:18px;padding:11px 18px;border-radius:12px;border:1px solid #438fd2;background:rgba(20,80,140,.3)}
@media(max-width:420px){#msMock .mk-variant-grid{grid-template-columns:1fr}}

#msMock button{font:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent;color:#dff}
#msMock .mk-head{flex:none;background:rgba(4,14,32,.88);border-bottom:1px solid rgba(0,255,255,.45);box-shadow:0 4px 24px rgba(0,200,255,.18);border-radius:0 0 24px 24px;padding:calc(10px + env(safe-area-inset-top,0px)) 16px 12px;z-index:2;backdrop-filter:blur(8px)}
#msMock .mk-note{font-size:13px;letter-spacing:.4px;color:#9fdcff;line-height:1.35;padding-right:40px;position:relative}
#msMock .mk-x{position:absolute;right:-6px;top:-4px;width:34px;height:34px;border:1px solid rgba(124,200,255,.5);border-radius:50%;background:rgba(0,60,90,.6);font-size:15px}
#msMock .mk-row{display:flex;gap:12px;align-items:center;justify-content:space-between;margin:12px 0 10px}
#msMock .mk-timer{display:flex;align-items:center;gap:8px;background:rgba(0,255,255,.08);border:1px solid #0ff;color:#7df9ff;font-weight:800;font-size:22px;border-radius:16px;padding:9px 16px;font-variant-numeric:tabular-nums;text-shadow:0 0 10px rgba(0,255,255,.7);box-shadow:0 0 14px rgba(0,255,255,.25)}
#msMock .mk-timer.low{background:rgba(255,60,90,.12);border-color:#ff6b86;color:#ff9aae;text-shadow:0 0 10px rgba(255,80,110,.7);box-shadow:0 0 14px rgba(255,80,110,.3)}
#msMock .mk-un{background:rgba(0,60,90,.5);border:1px solid rgba(124,200,255,.4);color:#bfe9ff;font-weight:700;font-size:15px;border-radius:16px;padding:11px 16px}
#msMock .mk-bar{height:5px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden}#msMock .mk-bar i{display:block;height:100%;background:linear-gradient(90deg,#0ff,#4fa);box-shadow:0 0 10px #0ff;transition:width .3s}
#msMock .mk-chips{display:flex;gap:9px;overflow-x:auto;padding:12px 2px 4px;scrollbar-width:none}#msMock .mk-chips::-webkit-scrollbar{display:none}
#msMock .mk-chips button{flex:none;min-width:54px;height:46px;border-radius:14px;border:1px solid rgba(124,200,255,.35);background:rgba(0,40,70,.55);color:#cfefff;font-weight:700;font-size:17px}
#msMock .mk-chips button.dn{background:#06507a;border-color:#4cc6ff;color:#fff}
#msMock .mk-chips button.cu{border:2px solid #0ff;color:#0ff;box-shadow:0 0 14px rgba(0,255,255,.55),inset 0 0 10px rgba(0,255,255,.2)}
#msMock .mk-body{flex:1;min-height:0;overflow-y:auto;padding:18px 16px 24px;max-width:820px;width:100%;margin:0 auto;box-sizing:border-box;-webkit-overflow-scrolling:touch}
#msMock .mk-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px}
#msMock .mk-meta b{color:#7df9ff;font-size:19px;letter-spacing:1px;margin-right:4px;text-shadow:0 0 10px rgba(0,255,255,.5)}
#msMock .mk-tag{border-radius:12px;padding:5px 12px;font-weight:700;font-size:13px;background:rgba(0,255,150,.12);border:1px solid rgba(80,255,170,.5);color:#7dffc0}#msMock .mk-tag.o{background:rgba(0,200,255,.12);border-color:rgba(0,220,255,.6);color:#7df9ff}#msMock .mk-tag.m{background:rgba(255,200,80,.12);border-color:rgba(255,210,100,.55);color:#ffd77a}
#msMock .mk-card{background:rgba(4,14,32,.7);border:1px solid rgba(130,200,255,.4);border-radius:22px;padding:18px 20px;font-size:20px;line-height:1.55;margin-bottom:16px;box-shadow:0 0 22px rgba(0,160,255,.14),inset 0 0 24px rgba(0,120,200,.08)}
#msMock .mk-sub{font-size:19px;line-height:1.5;margin:20px 2px 8px;color:#dff6ff}
#msMock .mk-fig{background:rgba(4,14,32,.7);border:1px solid rgba(130,200,255,.4);border-radius:22px;padding:12px;margin-bottom:16px;box-shadow:0 0 22px rgba(0,160,255,.14)}
#msMock .mk-fig>div{background:radial-gradient(ellipse at 50% 40%,rgba(0,90,150,.25),rgba(0,10,30,.35));border:1px dashed rgba(0,255,255,.25);border-radius:16px;padding:10px;display:flex;justify-content:center}
#msMock .mk-fig svg{width:100%;max-width:430px;height:auto;display:block;filter:drop-shadow(0 0 5px rgba(0,255,255,.45))}
#msMock .mk-fig svg text{font:600 21px system-ui,sans-serif;fill:#eafaff;filter:none}#msMock .mk-fig svg text.r{fill:#ff8fa3}
#msMock .mk-op{display:flex;align-items:center;gap:16px;width:100%;text-align:left;background:rgba(0,40,70,.5);border:1px solid rgba(124,200,255,.45);border-radius:20px;padding:14px 16px;margin:0 0 12px;font-size:20px;color:#eafaff;min-height:68px}
#msMock .mk-op .l{flex:none;width:46px;height:46px;border-radius:50%;background:rgba(0,255,255,.1);border:1px solid rgba(0,255,255,.45);color:#7df9ff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px}
#msMock .mk-op.sel{border-color:#0ff;background:rgba(0,255,255,.16);box-shadow:0 0 18px rgba(0,255,255,.4),inset 0 0 14px rgba(0,255,255,.15)}#msMock .mk-op.sel .l{background:#0ff;color:#012;box-shadow:0 0 12px #0ff}
#msMock .mk-in{width:100%;box-sizing:border-box;border:1px solid rgba(124,200,255,.5);border-radius:20px;background:rgba(0,20,40,.7);padding:20px 18px;font:inherit;font-size:20px;color:#eafaff;outline:none}
#msMock .mk-in::placeholder{color:#7fa8c4}
#msMock .mk-in:focus{border-color:#0ff;box-shadow:0 0 16px rgba(0,255,255,.45)}
#msMock .mk-foot{flex:none;display:flex;gap:14px;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));background:rgba(4,14,32,.88);border-top:1px solid rgba(0,255,255,.3);box-sizing:border-box;width:100%}
#msMock .mk-foot>*{max-width:none}
#msMock .mk-back{flex:none;width:76px;height:76px;border-radius:50%;border:1px solid #7cf;background:rgba(0,60,90,.6);font-size:26px;color:#dff}
#msMock .mk-go{flex:1;height:76px;border-radius:40px;border:0;background:#0ff;color:#012;font-weight:800;font-size:22px;letter-spacing:1px;box-shadow:0 0 22px rgba(0,255,255,.5)}
#msMock .mk-go.fin{background:linear-gradient(90deg,#0ff,#4fa)}
#msMock button:disabled{opacity:.35;cursor:default}
#msMock .mk-modal{position:absolute;inset:0;background:rgba(0,5,15,.7);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:24px;z-index:5}
#msMock .mk-box{background:rgba(4,16,36,.96);border:1px solid #0ff;box-shadow:0 0 30px rgba(0,255,255,.3);border-radius:22px;padding:24px;max-width:420px;width:100%;text-align:center;font-size:19px;line-height:1.5}
#msMock .mk-box .b{display:flex;gap:10px;margin-top:18px}#msMock .mk-box button{flex:1;padding:14px;border-radius:14px;border:1px solid #7cf;font-weight:800;font-size:16px;background:rgba(0,60,90,.6)}#msMock .mk-box button.p{background:#0ff;color:#012;border-color:#0ff}
#msMock .mk-res{padding:calc(18px + env(safe-area-inset-top,0px)) 16px 28px;max-width:820px;width:100%;margin:0 auto;overflow-y:auto;flex:1;box-sizing:border-box}
#msMock .mk-big{font-size:56px;font-weight:900;color:#0ff;line-height:1.1;text-shadow:0 0 22px rgba(0,255,255,.7)}
#msMock .mk-rt{display:flex;justify-content:space-between;align-items:center;gap:10px;background:rgba(0,40,70,.5);border:1px solid rgba(124,200,255,.35);border-radius:16px;padding:11px 15px;margin:8px 0;font-size:17px}
#msMock .mk-rt button{border:0;border-radius:12px;padding:9px 14px;background:#0ff;color:#012;font-weight:700}
#msMock details.mk-rv{background:rgba(80,10,25,.28);border:1px solid rgba(255,120,140,.4);border-radius:14px;padding:11px 14px;margin:8px 0}#msMock details.mk-rv.ok{background:rgba(0,80,50,.25);border-color:rgba(80,255,170,.45)}
#msMock details.mk-rv summary{cursor:pointer;font-weight:700;font-size:16px}
#msMock .mk-sol{margin-top:8px;padding:10px 12px;border-radius:12px;background:rgba(0,0,0,.28);border:1px dashed rgba(125,249,255,.35);font-size:16px;line-height:1.6;overflow-x:auto}
#msMock .mk-pl{font-family:Cambria,'Times New Roman',serif;font-style:italic}
#msMock h2{font-size:14px;letter-spacing:2px;margin:22px 0 6px;color:#7df9ff;text-transform:uppercase}
#msMock .katex{color:inherit}
@media(min-width:760px){#msMock .mk-head,#msMock .mk-foot{padding-left:max(16px,calc((100% - 820px)/2 + 16px));padding-right:max(16px,calc((100% - 820px)/2 + 16px))}}`;
  document.head.appendChild(css);
  const root = document.createElement('div'); root.id = 'msMock'; root.setAttribute('data-keep-uz', 'true');
  document.body.appendChild(root);
  const $ = s => root.querySelector(s);

  /* ---------- ko'rinish ---------- */
  const mm = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  const remaining = () => Math.max(0, Math.round((S.end - Date.now()) / 1000));

  function headHtml() {
    const un = unanswered();
    let chips = ''; for (let n = 1; n <= 45; n++) chips += `<button data-n="${n}" class="${n === S.cur + 1 ? 'cu' : ''} ${isAnswered(n) ? 'dn' : ''}">${n}</button>`;
    return `<div class="mk-note">${t('note')}<button class="mk-x" data-act="exit" aria-label="${t('close')}">✕</button></div>
<div class="mk-row"><div class="mk-timer" id="mkT">🕒 ${mm(remaining())}</div><div class="mk-un" id="mkU">${t('un')}: ${un} ${t('ta')}</div></div>
<div class="mk-bar"><i id="mkB" style="width:${Math.round((45 - un) / 45 * 100)}%"></i></div><div class="mk-chips" id="mkC">${chips}</div>`;
  }
  function figHtml(q) { if (!q.fig) return ''; let s = ''; try { s = typeof q.fig === 'function' ? q.fig() : q.fig; } catch (e) { s = ''; } return s ? `<div class="mk-fig"><div>${s}</div></div>` : ''; }
  function bodyHtml() {
    const n = S.cur + 1, q = qItem(n), ty = typeOf(n);
    let h = `<div class="mk-meta"><b>${n}-${t('q')}</b><span class="mk-tag">${fmtPts(ptsOf(n))} ${t('ball')}</span>${ty === 'O' ? `<span class="mk-tag o">${t('open')}</span>` : ty === 'M' ? `<span class="mk-tag m">${t('match')}</span>` : ''}</div>`;
    h += `<div class="mk-card">${rich(pick(q.t))}</div>` + figHtml(q);
    if (ty === 'O') {
      const a = S.ans[n] || {};
      h += `<div class="mk-sub">a) ${rich(pick(q.qa))}</div><input class="mk-in" data-p="a" inputmode="text" autocomplete="off" placeholder="${t('write')}" value="${esc(a.a || '')}">`;
      h += `<div class="mk-sub">b) ${rich(pick(q.qb))}</div><input class="mk-in" data-p="b" inputmode="text" autocomplete="off" placeholder="${t('write')}" value="${esc(a.b || '')}">`;
    } else {
      if (ty === 'M' && q.sub) h += `<div class="mk-sub">${n}) ${rich(pick(q.sub))}</div>`;
      displayOpts(n).forEach((d, k) => { h += `<button class="mk-op ${S.ans[n] === d.i ? 'sel' : ''}" data-o="${d.i}"><span class="l">${'ABCDEF'[k]}</span><span>${mth(d.o)}</span></button>`; });
    }
    return h;
  }
  function footHtml() {
    const last = S.cur === 44;
    return `<button class="mk-back" data-act="prev" ${S.cur ? '' : 'disabled'} aria-label="${t('prev')}">←</button><button class="mk-go ${last ? 'fin' : ''}" data-act="${last ? 'fin' : 'next'}">${last ? t('finish') : t('next') + ' →'}</button>`;
  }
  function renderVariantSelect() {
    const variants = window.MSMockBanks || [];
    const uz = LG() === 'uz';
    const title = uz ? 'Mock test variantini tanlang' : (LG() === 'ru' ? 'Выберите вариант теста' : 'Choose a mock test variant');
    const sub = uz ? 'Har bir variantda 45 ta topshiriq mavjud. Boshlashdan oldin variantni tanlang.' : (LG() === 'ru' ? 'В каждом варианте 45 заданий. Выберите вариант перед началом.' : 'Each variant has 45 questions. Choose one before starting.');
    root.innerHTML = `<div class="mk-head"><div class="mk-note">${title}</div></div><div class="mk-body"><div class="mk-variant-wrap"><h2>${title}</h2><p>${sub}</p><div class="mk-variant-grid">${variants.map((v,i)=>`<button class="mk-variant" data-variant="${v.id}"><b>${v.name.uz || (i+1)+'-variant'}</b><span>${uz ? '45 ta savol' : (LG()==='ru'?'45 вопросов':'45 questions')}</span><i>→</i></button>`).join('')}</div><button class="mk-variant-back" data-act="close">${uz?'Yopish':(LG()==='ru'?'Закрыть':'Close')}</button></div></div>`;
  }
  function render(keepScroll) {
    if (S.state === 'select') return renderVariantSelect();
    if (S.state === 'done') return renderResult();
    if (S.state !== 'run') return;
    loadKatex();
    const body = $('.mk-body'), sc = keepScroll && body ? body.scrollTop : 0;
    root.innerHTML = `<div class="mk-head">${headHtml()}</div><div class="mk-body">${bodyHtml()}</div><div class="mk-foot">${footHtml()}</div>` + (S.ask ? askHtml() : '');
    const b = $('.mk-body'); if (b) b.scrollTop = sc;
    const c = $('.mk-chips .cu'); if (c && c.scrollIntoView) { const box = $('.mk-chips'); box.scrollLeft = c.offsetLeft - box.clientWidth / 2 + c.clientWidth / 2; }
  }
  function askHtml() { const un = unanswered(); return `<div class="mk-modal"><div class="mk-box">${t('sure')}<br><small>${t('left')}: <b>${un}</b></small><div class="b"><button data-act="no">${t('no')}</button><button class="p" data-act="yes">${t('yes')}</button></div></div></div>`; }
  function refreshHead() {
    const un = unanswered(), u = $('#mkU'), b = $('#mkB'); if (u) u.textContent = `${t('un')}: ${un} ${t('ta')}`; if (b) b.style.width = Math.round((45 - un) / 45 * 100) + '%';
    const c = $(`.mk-chips [data-n="${S.cur + 1}"]`); if (c) c.classList.toggle('dn', isAnswered(S.cur + 1));
  }
  function tick() {
    const s = remaining(), e = $('#mkT'); if (e) { e.textContent = '🕒 ' + mm(s); e.classList.toggle('low', s < 600); }
    if (s <= 0 && S.state === 'run') finish(true);
  }

  /* ---------- yakunlash va natija ---------- */
  function finish(timeUp) {
    clearInterval(S.tm); const ok = [], det = [];
    for (let n = 1; n <= 45; n++) {
      const q = qItem(n), ty = typeOf(n), a = S.ans[n];
      if (ty === 'O') { const A = a && openOk(q.pa, a.a), B = a && openOk(q.pb, a.b); if (A) ok.push(n + 'a'); if (B) ok.push(n + 'b'); det.push({ n, ok: !!(A && B), part: !!(A || B) }); }
      else { const g = a === q.c; if (g) ok.push(String(n)); det.push({ n, ok: g, part: g }); }
    }
    const sc = M.score(ok), weak = M.byTopic(ok).filter(x => x.percent < 100).slice(0, 6);
    S.res = { score: sc.score, level: sc.score >= 46 ? sc.level : 'none', correctCount: sc.correctCount, total: sc.total, weak, det, timeUp: !!timeUp, variant: S.v };
    S.state = 'done'; S.ask = false; try { localStorage.removeItem(SKEY); } catch (e) { }
    if (S.cb.onFinish) { try { S.cb.onFinish({ score: S.res.score, level: S.res.level, correctCount: S.res.correctCount, total: S.res.total, weak: S.res.weak }); } catch (e) { console.warn(e); } }
    renderResult();
  }
  function solBlock(q) { return q.x ? `<div class="mk-sol"><b>${t('sol')}:</b><br>${mth(q.x)}</div>` : ''; }
  function ansText(n, a) {
    const q = qItem(n), ty = typeOf(n);
    if (ty === 'O') return a ? `a) ${esc(a.a || t('none'))} · b) ${esc(a.b || t('none'))}` : t('none');
    return a == null ? t('none') : mth(q.o[a]);
  }
  function corrText(n) { const q = qItem(n); if (typeOf(n) === 'O') return `a) ${esc([].concat(q.pa.a)[0])} · b) ${esc([].concat(q.pb.a)[0])}`; return mth(q.o[q.c]); }
  function renderResult() {
    loadKatex(); const r = S.res; if (!r) return;
    const bt = { Y: [0, 0], M: [0, 0], O: [0, 0] };
    r.det.forEach(d => { const ty = typeOf(d.n), k = ty === 'M' ? 'M' : ty === 'O' ? 'O' : 'Y'; bt[k][1]++; if (d.ok) bt[k][0]++; });
    let h = `<div class="mk-res">${r.timeUp ? `<div class="mk-rt">${t('time')}</div>` : ''}<div>${t('score')}</div><div class="mk-big">${r.score} / 100</div><div style="font-size:19px;margin:6px 0 4px">${t('level')}: <b>${r.level === 'none' ? t('nocert') : r.level}</b> · ${t('right')}: <b>${r.correctCount}/${r.total}</b></div>`;
    h += `<h2>${t('byType')}</h2><div class="mk-rt"><span>${t('closed')} (1–32)</span><b>${bt.Y[0]}/${bt.Y[1]}</b></div><div class="mk-rt"><span>${t('match')} (33–35)</span><b>${bt.M[0]}/${bt.M[1]}</b></div><div class="mk-rt"><span>${t('open')} (36–45)</span><b>${bt.O[0]}/${bt.O[1]}</b></div>`;
    if (r.weak.length) { h += `<h2>${t('weak')}</h2>`; r.weak.forEach(w => { h += `<div class="mk-rt"><span>${esc(w.topic)} <small>${w.percent}%</small></span><button data-go="${esc(w.topic)}">${t('study')}</button></div>`; }); }
    h += `<h2>${t('review')}</h2>`;
    r.det.forEach(d => { const q = qItem(d.n); h += `<details class="mk-rv ${d.ok ? 'ok' : ''}"><summary>${d.ok ? '✓' : d.part ? '◐' : '✗'} ${d.n}) ${esc(M.BLUEPRINT[d.n - 1].topic)}</summary><div class="mk-sol" style="background:none;padding:6px 0">${rich(pick(q.t))}${typeOf(d.n) === 'M' && q.sub ? '<br>' + rich(pick(q.sub)) : ''}</div>${figHtml(q)}<div>${t('your')}: <b>${ansText(d.n, S.ans[d.n])}</b><br>${t('corr')}: <b>${corrText(d.n)}</b></div>${solBlock(q)}</details>`; });
    h += `<div style="display:flex;gap:10px;margin-top:18px"><button class="mk-rt" style="flex:1;justify-content:center;border:0;font-weight:800" data-act="again">${t('again')}</button><button class="mk-rt" style="flex:1;justify-content:center;border:0;font-weight:800" data-act="close">${t('close')}</button></div></div>`;
    root.innerHTML = h;
  }

  /* ---------- hodisalar ---------- */
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; const d = b.dataset;
    if (d.variant) { const cb = S.cb; return open({ variant: d.variant, fresh: true, ...cb }); }
    if (d.n) { S.cur = +d.n - 1; save(); return render(); }
    if (d.o != null && S.state === 'run') { const n = S.cur + 1; S.ans[n] = +d.o; save(); root.querySelectorAll('.mk-op').forEach(x => x.classList.toggle('sel', x === b)); return refreshHead(); }
    if (d.go) { const tp = d.go; close(); if (S.cb.onGo) S.cb.onGo(tp); return; }
    switch (d.act) {
      case 'next': S.cur = Math.min(44, S.cur + 1); save(); render(); $('.mk-body').scrollTop = 0; break;
      case 'prev': S.cur = Math.max(0, S.cur - 1); save(); render(); $('.mk-body').scrollTop = 0; break;
      case 'fin': S.ask = true; render(true); break;
      case 'no': S.ask = false; render(true); break;
      case 'yes': finish(false); break;
      case 'exit': close(); break;
      case 'again': open({ variant: S.v, fresh: true, ...S.cb }); break;
      case 'close': close(); break;
    }
  });
  root.addEventListener('input', e => {
    const i = e.target.closest('input.mk-in'); if (!i || S.state !== 'run') return;
    const n = S.cur + 1, a = S.ans[n] = S.ans[n] || { a: '', b: '' }; a[i.dataset.p] = i.value; save(); refreshHead();
  });
  window.addEventListener('orvin-lang', () => { if (root.classList.contains('show')) render(true); });

  /* ---------- ochish / yopish ---------- */
  function open(o) {
    o = o || {}; S.cb = { onFinish: o.onFinish, onGo: o.onGo, onClose: o.onClose };
    if (!window.MSMockBanks.length) { console.warn('MSMock: variantlar yuklanmadi'); return false; }
    const ses = !o.fresh && o.resume !== false ? loadSession() : null;
    clearInterval(S.tm);
    if (!ses && !o.variant) {
      S.state = 'select'; S.res = null; S.ask = false;
      root.classList.add('show'); render(); return true;
    }
    if (ses) { S.v = ses.v; S.ans = ses.ans || {}; S.cur = ses.cur || 0; S.end = ses.end; S.perm = ses.perm || {}; }
    else { S.v = bank(o.variant).id; S.ans = {}; S.cur = 0; S.perm = {}; S.end = Date.now() + DURATION_MIN * 60000; }
    S.state = 'run'; S.res = null; S.ask = false; S.tm = setInterval(tick, 1000);
    save(); root.classList.add('show'); render(); return true;
  }
  function close() { root.classList.remove('show'); if (S.state !== 'run') clearInterval(S.tm); if (S.cb.onClose) { try { S.cb.onClose(); } catch (e) { } } }

  window.MSMock = {
    open, close,
    variants: () => window.MSMockBanks.map(b => ({ id: b.id, name: b.name })),
    hasSession: () => !!loadSession(),
    sessionInfo: () => { const s = loadSession(); return s ? { v: s.v, left: Math.round((s.end - Date.now()) / 1000), answered: Object.keys(s.ans || {}).length } : null; },
    duration: DURATION_MIN, _num: num
  };
})();
