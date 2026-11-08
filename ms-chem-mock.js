/* ORVIN — Kimyo MOCK (to'liq ekranli imtihon, matematikadagidek): tepada 1–45 raqamlar + progress chizig'i, 5 ta variant tanlash.
   Savollar ms-chemistry.js dagi window.__chemMockKit.variant(k) dan olinadi (k = 1..5, har variant qat'iy va boshqalardan farqli).
   API: ChemMock.open({variant, resume, onFinish(res), onGo(topic), onClose()}) · ChemMock.hasSession() */
(function () {
  'use strict';
  if (window.ChemMock) return;
  const SKEY = 'orvin_chem_mock_session', LG = () => window.ORVIN_LANG || 'uz';
  const L = {
    uz: { note: 'Kimyo · javoblar avtomatik saqlanadi · vaqt davom etadi', un: 'Javobsiz', ta: 'ta', q: 'savol', ball: 'ball', open: 'Ochiq topshiriq', match: 'Moslashtirish', write: 'Javobni yozing', next: 'Keyingisi', prev: 'Orqaga', finish: 'Yakunlash', sure: 'Testni yakunlaymizmi?', left: 'Javobsiz savollar', yes: 'Yakunlash', no: 'Davom etish', score: 'Ball', level: 'Daraja', nocert: 'Sertifikat berilmaydi', right: "To'g'ri javoblar", weak: 'Takrorlash kerak', study: "O'rganish →", review: 'Xatolar tahlili', your: 'Sizning javobingiz', corr: "To'g'ri javob", sol: 'Yechim', none: '—', again: 'Yangi urinish', close: 'Yopish', time: 'Vaqt tugadi — natija hisoblandi', byType: "Topshiriq turlari bo'yicha", closed: 'Yopiq', title: 'Kimyo mock test variantini tanlang', sub: 'Har bir variantda 45 ta topshiriq mavjud. Variantlar bir-biridan farq qiladi.', variant: '-variant', qs: '45 ta savol', exit: 'Chiqib ketsangiz, test saqlanadi va vaqt davom etadi' },
    ru: { note: 'Химия · ответы сохраняются автоматически · время идёт', un: 'Без ответа', ta: '', q: 'вопрос', ball: 'балла', open: 'Открытое задание', match: 'Соответствие', write: 'Введите ответ', next: 'Далее', prev: 'Назад', finish: 'Завершить', sure: 'Завершить тест?', left: 'Вопросов без ответа', yes: 'Завершить', no: 'Продолжить', score: 'Балл', level: 'Уровень', nocert: 'Сертификат не выдаётся', right: 'Верных ответов', weak: 'Нужно повторить', study: 'Изучить →', review: 'Разбор ошибок', your: 'Ваш ответ', corr: 'Верный ответ', sol: 'Решение', none: '—', again: 'Новая попытка', close: 'Закрыть', time: 'Время вышло — результат подсчитан', byType: 'По типам заданий', closed: 'Закрытые', title: 'Выберите вариант теста по химиие', sub: 'В каждом варианте 45 заданий. Варианты отличаются друг от друга.', variant: '-вариант', qs: '45 вопросов', exit: 'Если выйдете, тест сохранится, время продолжит идти' },
    en: { note: 'Chemistry · answers are saved automatically · time keeps running', un: 'Unanswered', ta: '', q: 'question', ball: 'pts', open: 'Open task', match: 'Matching', write: 'Type your answer', next: 'Next', prev: 'Back', finish: 'Finish', sure: 'Finish the test?', left: 'Unanswered questions', yes: 'Finish', no: 'Continue', score: 'Score', level: 'Level', nocert: 'No certificate', right: 'Correct answers', weak: 'Topics to review', study: 'Study →', review: 'Mistakes review', your: 'Your answer', corr: 'Correct answer', sol: 'Solution', none: '—', again: 'New attempt', close: 'Close', time: 'Time is up — result calculated', byType: 'By task type', closed: 'Closed', title: 'Choose a chemistry mock test variant', sub: 'Each variant has 45 tasks. The variants differ from each other.', variant: ' variant', qs: '45 questions', exit: 'If you leave, the test is saved and the timer keeps running' }
  };
  const t = k => (L[LG()] || L.uz)[k] != null ? (L[LG()] || L.uz)[k] : L.uz[k];
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const KIT = () => window.__chemMockKit;
  const S = { state: 'idle', v: 1, ans: {}, cur: 0, end: 0, tm: null, cb: {}, res: null, ask: false };
  const qs = () => KIT().variant(S.v), NQ = 45;
  const isAns = i => { const a = S.ans[i]; return a != null && a !== ''; };
  const unanswered = () => { let k = 0; for (let i = 0; i < NQ; i++) if (!isAns(i)) k++; return k; };
  const remaining = () => Math.max(0, Math.round((S.end - Date.now()) / 1000));
  const mm = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  const fmtPts = p => String(Math.round(p * 10) / 10).replace('.', ',');
  const save = () => { try { localStorage.setItem(SKEY, JSON.stringify({ v: S.v, end: S.end, ans: S.ans, cur: S.cur, state: S.state })); } catch (e) { } };
  const loadSession = () => { try { const s = JSON.parse(localStorage.getItem(SKEY) || 'null'); if (s && s.state === 'run' && s.end > Date.now()) return s; } catch (e) { } return null; };

  const css = document.createElement('style');
  css.textContent = `#msCMock{position:fixed;inset:0;z-index:10020;display:none;flex-direction:column;color:#eafaff;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:radial-gradient(ellipse at 50% -10%,rgba(0,120,200,.28),transparent 60%),linear-gradient(rgba(1,5,14,.92),rgba(1,5,14,.98)),#030814}
#msCMock.show{display:flex}
#msCMock .mk-variant-wrap{max-width:680px;margin:28px auto;padding:22px;width:calc(100% - 28px);box-sizing:border-box}
#msCMock .mk-variant-wrap h2{font-size:24px;margin:0 0 8px;color:#eafaff}
#msCMock .mk-variant-wrap p{color:#a9cce8;line-height:1.5;margin:0 0 22px}
#msCMock .mk-variant-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
#msCMock .mk-variant{position:relative;text-align:left;padding:18px;border:1px solid rgba(70,160,255,.55);border-radius:16px;background:linear-gradient(135deg,rgba(0,105,210,.28),rgba(0,45,100,.45));color:#eafaff!important;display:flex;flex-direction:column;gap:7px;min-height:92px}
#msCMock .mk-variant b{font-size:18px;color:#8fcaff}
#msCMock .mk-variant span{font-size:13px;color:#b8d8f5}
#msCMock .mk-variant i{position:absolute;right:16px;top:25px;font-style:normal;color:#65b5ff;font-size:22px}
#msCMock .mk-variant-back{margin-top:18px;padding:11px 18px;border-radius:12px;border:1px solid #438fd2;background:rgba(20,80,140,.3)}
@media(max-width:420px){#msCMock .mk-variant-grid{grid-template-columns:1fr}}

#msCMock button{font:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent;color:#dff}
#msCMock .mk-head{flex:none;background:rgba(4,14,32,.88);border-bottom:1px solid rgba(0,255,255,.45);box-shadow:0 4px 24px rgba(0,200,255,.18);border-radius:0 0 24px 24px;padding:calc(10px + env(safe-area-inset-top,0px)) 16px 12px;z-index:2;backdrop-filter:blur(8px)}
#msCMock .mk-note{font-size:13px;letter-spacing:.4px;color:#9fdcff;line-height:1.35;padding-right:40px;position:relative}
#msCMock .mk-x{position:absolute;right:-6px;top:-4px;width:34px;height:34px;border:1px solid rgba(124,200,255,.5);border-radius:50%;background:rgba(0,60,90,.6);font-size:15px}
#msCMock .mk-row{display:flex;gap:12px;align-items:center;justify-content:space-between;margin:12px 0 10px}
#msCMock .mk-timer{display:flex;align-items:center;gap:8px;background:rgba(0,255,255,.08);border:1px solid #0ff;color:#7df9ff;font-weight:800;font-size:22px;border-radius:16px;padding:9px 16px;font-variant-numeric:tabular-nums;text-shadow:0 0 10px rgba(0,255,255,.7);box-shadow:0 0 14px rgba(0,255,255,.25)}
#msCMock .mk-timer.low{background:rgba(255,60,90,.12);border-color:#ff6b86;color:#ff9aae;text-shadow:0 0 10px rgba(255,80,110,.7);box-shadow:0 0 14px rgba(255,80,110,.3)}
#msCMock .mk-un{background:rgba(0,60,90,.5);border:1px solid rgba(124,200,255,.4);color:#bfe9ff;font-weight:700;font-size:15px;border-radius:16px;padding:11px 16px}
#msCMock .mk-bar{height:5px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden}#msCMock .mk-bar i{display:block;height:100%;background:linear-gradient(90deg,#0ff,#4fa);box-shadow:0 0 10px #0ff;transition:width .3s}
#msCMock .mk-chips{display:flex;gap:9px;overflow-x:auto;padding:12px 2px 4px;scrollbar-width:none}#msCMock .mk-chips::-webkit-scrollbar{display:none}
#msCMock .mk-chips button{flex:none;min-width:54px;height:46px;border-radius:14px;border:1px solid rgba(124,200,255,.35);background:rgba(0,40,70,.55);color:#cfefff;font-weight:700;font-size:17px}
#msCMock .mk-chips button.dn{background:#06507a;border-color:#4cc6ff;color:#fff}
#msCMock .mk-chips button.cu{border:2px solid #0ff;color:#0ff;box-shadow:0 0 14px rgba(0,255,255,.55),inset 0 0 10px rgba(0,255,255,.2)}
#msCMock .mk-body{flex:1;min-height:0;overflow-y:auto;padding:18px 16px 24px;max-width:820px;width:100%;margin:0 auto;box-sizing:border-box;-webkit-overflow-scrolling:touch}
#msCMock .mk-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px}
#msCMock .mk-meta b{color:#7df9ff;font-size:19px;letter-spacing:1px;margin-right:4px;text-shadow:0 0 10px rgba(0,255,255,.5)}
#msCMock .mk-tag{border-radius:12px;padding:5px 12px;font-weight:700;font-size:13px;background:rgba(0,255,150,.12);border:1px solid rgba(80,255,170,.5);color:#7dffc0}#msCMock .mk-tag.o{background:rgba(0,200,255,.12);border-color:rgba(0,220,255,.6);color:#7df9ff}#msCMock .mk-tag.m{background:rgba(255,200,80,.12);border-color:rgba(255,210,100,.55);color:#ffd77a}
#msCMock .mk-card{background:rgba(4,14,32,.7);border:1px solid rgba(130,200,255,.4);border-radius:22px;padding:18px 20px;font-size:20px;line-height:1.55;margin-bottom:16px;box-shadow:0 0 22px rgba(0,160,255,.14),inset 0 0 24px rgba(0,120,200,.08)}
#msCMock .mk-sub{font-size:19px;line-height:1.5;margin:20px 2px 8px;color:#dff6ff}
#msCMock .mk-fig{background:rgba(4,14,32,.7);border:1px solid rgba(130,200,255,.4);border-radius:22px;padding:12px;margin-bottom:16px;box-shadow:0 0 22px rgba(0,160,255,.14)}
#msCMock .mk-fig>div{background:radial-gradient(ellipse at 50% 40%,rgba(0,90,150,.25),rgba(0,10,30,.35));border:1px dashed rgba(0,255,255,.25);border-radius:16px;padding:10px;display:flex;justify-content:center}
#msCMock .mk-fig svg{width:100%;max-width:430px;height:auto;display:block;filter:drop-shadow(0 0 5px rgba(0,255,255,.45))}
#msCMock .mk-fig svg text{font:600 21px system-ui,sans-serif;fill:#eafaff;filter:none}#msCMock .mk-fig svg text.r{fill:#ff8fa3}
#msCMock .mk-op{display:flex;align-items:center;gap:16px;width:100%;text-align:left;background:rgba(0,40,70,.5);border:1px solid rgba(124,200,255,.45);border-radius:20px;padding:14px 16px;margin:0 0 12px;font-size:20px;color:#eafaff;min-height:68px}
#msCMock .mk-op .l{flex:none;width:46px;height:46px;border-radius:50%;background:rgba(0,255,255,.1);border:1px solid rgba(0,255,255,.45);color:#7df9ff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px}
#msCMock .mk-op.sel{border-color:#0ff;background:rgba(0,255,255,.16);box-shadow:0 0 18px rgba(0,255,255,.4),inset 0 0 14px rgba(0,255,255,.15)}#msCMock .mk-op.sel .l{background:#0ff;color:#012;box-shadow:0 0 12px #0ff}
#msCMock .mk-in{width:100%;box-sizing:border-box;border:1px solid rgba(124,200,255,.5);border-radius:20px;background:rgba(0,20,40,.7);padding:20px 18px;font:inherit;font-size:20px;color:#eafaff;outline:none}
#msCMock .mk-in::placeholder{color:#7fa8c4}
#msCMock .mk-in:focus{border-color:#0ff;box-shadow:0 0 16px rgba(0,255,255,.45)}
#msCMock .mk-foot{flex:none;display:flex;gap:14px;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));background:rgba(4,14,32,.88);border-top:1px solid rgba(0,255,255,.3);box-sizing:border-box;width:100%}
#msCMock .mk-foot>*{max-width:none}
#msCMock .mk-back{flex:none;width:76px;height:76px;border-radius:50%;border:1px solid #7cf;background:rgba(0,60,90,.6);font-size:26px;color:#dff}
#msCMock .mk-go{flex:1;height:76px;border-radius:40px;border:0;background:#0ff;color:#012;font-weight:800;font-size:22px;letter-spacing:1px;box-shadow:0 0 22px rgba(0,255,255,.5)}
#msCMock .mk-go.fin{background:linear-gradient(90deg,#0ff,#4fa)}
#msCMock button:disabled{opacity:.35;cursor:default}
#msCMock .mk-modal{position:absolute;inset:0;background:rgba(0,5,15,.7);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:24px;z-index:5}
#msCMock .mk-box{background:rgba(4,16,36,.96);border:1px solid #0ff;box-shadow:0 0 30px rgba(0,255,255,.3);border-radius:22px;padding:24px;max-width:420px;width:100%;text-align:center;font-size:19px;line-height:1.5}
#msCMock .mk-box .b{display:flex;gap:10px;margin-top:18px}#msCMock .mk-box button{flex:1;padding:14px;border-radius:14px;border:1px solid #7cf;font-weight:800;font-size:16px;background:rgba(0,60,90,.6)}#msCMock .mk-box button.p{background:#0ff;color:#012;border-color:#0ff}
#msCMock .mk-res{padding:calc(18px + env(safe-area-inset-top,0px)) 16px 28px;max-width:820px;width:100%;margin:0 auto;overflow-y:auto;flex:1;box-sizing:border-box}
#msCMock .mk-big{font-size:56px;font-weight:900;color:#0ff;line-height:1.1;text-shadow:0 0 22px rgba(0,255,255,.7)}
#msCMock .mk-rt{display:flex;justify-content:space-between;align-items:center;gap:10px;background:rgba(0,40,70,.5);border:1px solid rgba(124,200,255,.35);border-radius:16px;padding:11px 15px;margin:8px 0;font-size:17px}
#msCMock .mk-rt button{border:0;border-radius:12px;padding:9px 14px;background:#0ff;color:#012;font-weight:700}
#msCMock details.mk-rv{background:rgba(80,10,25,.28);border:1px solid rgba(255,120,140,.4);border-radius:14px;padding:11px 14px;margin:8px 0}#msCMock details.mk-rv.ok{background:rgba(0,80,50,.25);border-color:rgba(80,255,170,.45)}
#msCMock details.mk-rv summary{cursor:pointer;font-weight:700;font-size:16px}
#msCMock .mk-sol{margin-top:8px;padding:10px 12px;border-radius:12px;background:rgba(0,0,0,.28);border:1px dashed rgba(125,249,255,.35);font-size:16px;line-height:1.6;overflow-x:auto}
#msCMock .mk-pl{font-family:Cambria,'Times New Roman',serif;font-style:italic}
#msCMock h2{font-size:14px;letter-spacing:2px;margin:22px 0 6px;color:#7df9ff;text-transform:uppercase}
#msCMock .katex{color:inherit}
@media(min-width:760px){#msCMock .mk-head,#msCMock .mk-foot{padding-left:max(16px,calc((100% - 820px)/2 + 16px));padding-right:max(16px,calc((100% - 820px)/2 + 16px))}}`;
  document.head.appendChild(css);
  const root = document.createElement('div'); root.id = 'msCMock'; root.setAttribute('data-keep-uz', 'true');
  document.body.appendChild(root);
  const $ = s => root.querySelector(s);

  function headHtml() {
    const un = unanswered(); let chips = '';
    for (let n = 1; n <= NQ; n++) chips += `<button data-n="${n}" class="${n === S.cur + 1 ? 'cu' : ''} ${isAns(n - 1) ? 'dn' : ''}">${n}</button>`;
    return `<div class="mk-note">${t('note')}<button class="mk-x" data-act="exit" aria-label="${t('close')}">✕</button></div>
<div class="mk-row"><div class="mk-timer" id="mkT">🕒 ${mm(remaining())}</div><div class="mk-un" id="mkU">${t('un')}: ${un} ${t('ta')}</div></div>
<div class="mk-bar"><i id="mkB" style="width:${Math.round((NQ - un) / NQ * 100)}%"></i></div><div class="mk-chips" id="mkC">${chips}</div>`;
  }
  function bodyHtml() {
    const i = S.cur, q = qs()[i], a = S.ans[i];
    let h = `<div class="mk-meta"><b>${i + 1}-${t('q')}</b><span class="mk-tag">${fmtPts(q.pts)} ${t('ball')}</span>${q.open ? `<span class="mk-tag o">${t('open')}</span>` : q.ty === 'M' ? `<span class="mk-tag m">${t('match')}</span>` : ''}</div><div class="mk-card">${esc(q.s)}</div>`;
    if (q.open) h += `<input class="mk-in" inputmode="decimal" autocomplete="off" placeholder="${t('write')} (${esc(q.u)})" value="${esc(a == null ? '' : a)}">`;
    else q.o.forEach((o, k) => { h += `<button class="mk-op ${a === k ? 'sel' : ''}" data-o="${k}"><span class="l">${'ABCDEF'[k]}</span><span>${esc(o)}</span></button>`; });
    return h;
  }
  const footHtml = () => { const last = S.cur === NQ - 1; return `<button class="mk-back" data-act="prev" ${S.cur ? '' : 'disabled'} aria-label="${t('prev')}">←</button><button class="mk-go ${last ? 'fin' : ''}" data-act="${last ? 'fin' : 'next'}">${last ? t('finish') : t('next') + ' →'}</button>`; };
  function renderSelect() {
    const v = []; for (let k = 1; k <= KIT().NVAR; k++) v.push(`<button class="mk-variant" data-variant="${k}"><b>${k}${t('variant')}</b><span>${t('qs')}</span><i>→</i></button>`);
    root.innerHTML = `<div class="mk-head"><div class="mk-note">${t('title')}</div></div><div class="mk-body"><div class="mk-variant-wrap"><h2>${t('title')}</h2><p>${t('sub')}</p><div class="mk-variant-grid">${v.join('')}</div><button class="mk-variant-back" data-act="close">${t('close')}</button></div></div>`;
  }
  function askHtml() { return `<div class="mk-modal"><div class="mk-box">${t('sure')}<br><small>${t('left')}: <b>${unanswered()}</b></small><div class="b"><button data-act="no">${t('no')}</button><button class="p" data-act="yes">${t('yes')}</button></div></div></div>`; }
  function render(keep) {
    if (S.state === 'select') return renderSelect();
    if (S.state === 'done') return renderResult();
    if (S.state !== 'run') return;
    const body = $('.mk-body'), sc = keep && body ? body.scrollTop : 0;
    root.innerHTML = `<div class="mk-head">${headHtml()}</div><div class="mk-body">${bodyHtml()}</div><div class="mk-foot">${footHtml()}</div>` + (S.ask ? askHtml() : '');
    const b = $('.mk-body'); if (b) b.scrollTop = sc;
    const c = $('.mk-chips .cu'); if (c) { const box = $('.mk-chips'); box.scrollLeft = c.offsetLeft - box.clientWidth / 2 + c.clientWidth / 2; }
  }
  function refreshHead() {
    const un = unanswered(), u = $('#mkU'), b = $('#mkB'); if (u) u.textContent = `${t('un')}: ${un} ${t('ta')}`; if (b) b.style.width = Math.round((NQ - un) / NQ * 100) + '%';
    const c = $(`.mk-chips [data-n="${S.cur + 1}"]`); if (c) c.classList.toggle('dn', isAns(S.cur));
  }
  function tick() { const s = remaining(), e = $('#mkT'); if (e) { e.textContent = '🕒 ' + mm(s); e.classList.toggle('low', s < 600); } if (s <= 0 && S.state === 'run') finish(true); }

  function finish(timeUp) {
    clearInterval(S.tm); const K = KIT(), Q = qs(); let sc = 0, ok = 0; const tp = {}, det = [], by = { Y: [0, 0], M: [0, 0], O: [0, 0] };
    Q.forEach((q, i) => {
      const g = K.isOk(q, S.ans[i]), x = tp[q.tp] || (tp[q.tp] = { got: 0, max: 0 }), k = q.open ? 'O' : q.ty === 'M' ? 'M' : 'Y';
      x.max += q.pts; by[k][1]++; if (g) { sc += q.pts; ok++; x.got += q.pts; by[k][0]++; } det.push({ n: i + 1, ok: g, q, a: S.ans[i] });
    });
    sc = Math.round(sc * 10) / 10;
    const weak = Object.keys(tp).filter(k => tp[k].got < tp[k].max).sort((a, b) => tp[a].got / tp[a].max - tp[b].got / tp[b].max).slice(0, 6).map(k => ({ topic: k, percent: Math.round(100 * tp[k].got / tp[k].max) }));
    S.res = { score: sc, level: sc >= 46 ? K.levelOf(sc) : 'none', ok, total: NQ, weak, det, by, timeUp: !!timeUp, variant: S.v };
    S.state = 'done'; S.ask = false; try { localStorage.removeItem(SKEY); } catch (e) { }
    if (S.cb.onFinish) { try { S.cb.onFinish({ score: S.res.score, level: S.res.level, ok, total: NQ, variant: S.v }); } catch (e) { console.warn(e); } }
    renderResult();
  }
  function renderResult() {
    const r = S.res; if (!r) return; const K = KIT();
    let h = `<div class="mk-res">${r.timeUp ? `<div class="mk-rt">${t('time')}</div>` : ''}<div>${t('score')} · ${r.variant}${t('variant')}</div><div class="mk-big">${r.score} / 100</div><div style="font-size:19px;margin:6px 0 4px">${t('level')}: <b>${r.level === 'none' ? t('nocert') : r.level}</b> · ${t('right')}: <b>${r.ok}/${r.total}</b></div>`;
    h += `<h2>${t('byType')}</h2><div class="mk-rt"><span>${t('closed')} (1–32)</span><b>${r.by.Y[0]}/${r.by.Y[1]}</b></div><div class="mk-rt"><span>${t('match')} (33–35)</span><b>${r.by.M[0]}/${r.by.M[1]}</b></div><div class="mk-rt"><span>${t('open')} (36–45)</span><b>${r.by.O[0]}/${r.by.O[1]}</b></div>`;
    if (r.weak.length) { h += `<h2>${t('weak')}</h2>`; r.weak.forEach(w => { h += `<div class="mk-rt"><span>${esc(w.topic)} <small>${w.percent}%</small></span><button data-go="${esc(w.topic)}">${t('study')}</button></div>`; }); }
    h += `<h2>${t('review')}</h2>`;
    r.det.forEach(d => {
      const q = d.q, ua = d.a == null || d.a === '' ? t('none') : q.open ? esc(d.a) : esc(q.o[d.a]), ca = q.open ? esc(K.fm(q.r) + ' ' + q.u) : esc(q.o[q.c]);
      h += `<details class="mk-rv ${d.ok ? 'ok' : ''}"><summary>${d.ok ? '✓' : '✗'} ${d.n}) ${esc(q.tp)}</summary><div class="mk-sol" style="background:none;padding:6px 0">${esc(q.s)}</div><div>${t('your')}: <b>${ua}</b><br>${t('corr')}: <b>${ca}</b></div>${q.x && q.x.length ? `<div class="mk-sol"><b>${t('sol')}:</b><br>${q.x.map(esc).join('<br>')}</div>` : ''}</details>`;
    });
    h += `<div style="display:flex;gap:10px;margin-top:18px"><button class="mk-rt" style="flex:1;justify-content:center;border:0;font-weight:800" data-act="again">${t('again')}</button><button class="mk-rt" style="flex:1;justify-content:center;border:0;font-weight:800" data-act="close">${t('close')}</button></div></div>`;
    root.innerHTML = h;
  }

  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; const d = b.dataset;
    if (d.variant) return open({ variant: +d.variant, fresh: true, ...S.cb });
    if (d.n) { S.cur = +d.n - 1; save(); return render(); }
    if (d.o != null && S.state === 'run') { S.ans[S.cur] = +d.o; save(); root.querySelectorAll('.mk-op').forEach(x => x.classList.toggle('sel', x === b)); return refreshHead(); }
    if (d.go) { const tp = d.go; close(); if (S.cb.onGo) S.cb.onGo(tp); return; }
    switch (d.act) {
      case 'next': S.cur = Math.min(NQ - 1, S.cur + 1); save(); render(); $('.mk-body').scrollTop = 0; break;
      case 'prev': S.cur = Math.max(0, S.cur - 1); save(); render(); $('.mk-body').scrollTop = 0; break;
      case 'fin': S.ask = true; render(true); break;
      case 'no': S.ask = false; render(true); break;
      case 'yes': finish(false); break;
      case 'exit': case 'close': close(); break;
      case 'again': open({ fresh: true, ...S.cb }); break;
    }
  });
  root.addEventListener('input', e => { const i = e.target.closest('input.mk-in'); if (!i || S.state !== 'run') return; S.ans[S.cur] = i.value; save(); refreshHead(); });
  window.addEventListener('orvin-lang', () => { if (root.classList.contains('show')) render(true); });

  function open(o) {
    o = o || {}; if (!KIT()) { console.warn('ChemMock: ms-chemistry.js yuklanmadi'); return false; }
    S.cb = { onFinish: o.onFinish, onGo: o.onGo, onClose: o.onClose };
    const ses = !o.fresh && o.resume !== false ? loadSession() : null; clearInterval(S.tm);
    if (!ses && !o.variant) { S.state = 'select'; S.res = null; S.ask = false; root.classList.add('show'); render(); return true; }
    if (ses) { S.v = ses.v; S.ans = ses.ans || {}; S.cur = ses.cur || 0; S.end = ses.end; }
    else { S.v = Math.min(KIT().NVAR, Math.max(1, +o.variant)); S.ans = {}; S.cur = 0; S.end = Date.now() + KIT().MIN * 60000; }
    S.state = 'run'; S.res = null; S.ask = false; S.tm = setInterval(tick, 1000); save(); root.classList.add('show'); render(); return true;
  }
  function close() { root.classList.remove('show'); if (S.state !== 'run') clearInterval(S.tm); if (S.cb.onClose) { try { S.cb.onClose(); } catch (e) { } } }
  window.ChemMock = { open, close, hasSession: () => !!loadSession(), variants: () => Array.from({ length: 5 }, (_, i) => i + 1) };
})();
