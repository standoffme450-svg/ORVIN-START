/* ORVIN — O'QUV: Matematika, Fizika va Kimyo bitta fanlar tanlovida. */
(function () {
  'use strict';
  if (window.__oquv) return; window.__oquv = true;
  const LG = () => window.ORVIN_LANG || 'en';
  const L = {
    uz: { title: "📚 O'quv", close: '✕ YOPISH', lead: "Maqsad — o'rganish. Har bir mavzuda: qoida → namuna yechim → mashq → MS darajasidagi savol. 3 ta ketma-ket to'g'ri javob — mavzu o'zlashtirildi.", math: 'Matematika', sub: "Milliy sertifikat (MS) tayyorgarligi", phys: 'Fizika', chem: 'Kimyo', sciSub: 'Darslar, amaliy topshiriqlar va testlar', topics: "mavzu o'zlashtirildi", mock: 'Oxirgi mock test', go: 'BOSHLASH', goOn: 'DAVOM ETISH' },
    ru: { title: '📚 Обучение', close: '✕ ЗАКРЫТЬ', lead: 'Цель — научиться. В каждой теме: правило → разобранный пример → упражнение → вопрос уровня MS. 3 верных ответа подряд — тема освоена.', math: 'Математика', sub: 'Подготовка к национальному сертификату (MS)', phys: 'Физика', chem: 'Химия', sciSub: 'Уроки, практические задания и тесты', topics: 'тем освоено', mock: 'Последний мок-тест', go: 'НАЧАТЬ', goOn: 'ПРОДОЛЖИТЬ' },
    en: { title: '📚 Learn', close: '✕ CLOSE', lead: 'The goal is learning. Every topic: rule → worked example → practice → MS-level question. 3 correct answers in a row = topic mastered.', math: 'Math', sub: 'National certificate (MS) preparation', phys: 'Physics', chem: 'Chemistry', sciSub: 'Lessons, practical tasks and quizzes', topics: 'topics mastered', mock: 'Last mock test', go: 'START', goOn: 'CONTINUE' }
  };
  const t = k => (L[LG()] || L.en)[k] || k;
  const K = 'data-keep-uz="true"';

  function mathStat() {
    let done = 0, total = 0, last = null;
    try {
      const M = window.MSMath, pr = JSON.parse(localStorage.getItem('orvin_math_progress') || '{}') || {}, mm = pr._m || {};
      Object.values(M.SYLLABUS).forEach(a => a.forEach(tp => { total++; if (mm[tp] && mm[tp].streak >= 3) done++; }));
      const l = pr._mockLast || JSON.parse(localStorage.getItem('orvin_ms_last') || 'null'); if (l) last = l.score;
    } catch (e) { }
    return { done, total, last, started: done > 0 || last != null };
  }
  function scienceStat(id) {
    let done = 0;
    try { const s = JSON.parse(localStorage.getItem('orvin_sci') || '{}') || {}; const tasks = s.t || {}; done = Object.keys(tasks).filter(k => k.startsWith(id) && /\d$/.test(k) && tasks[k]).length; }
    catch (_) {}
    return { done, total: 5, started: done > 0, last: null };
  }
  function rocketStat(){try{const r=window.rocketProgressInfo&&window.rocketProgressInfo();return r||{done:0,total:8,last:null,started:false}}catch(e){return {done:0,total:8,last:null,started:false}}}
  const SUBJECTS = [
    { id: 'rocket', icon: '🚀', name: () => 'Rocket Learning', sub: () => 'Kosmos, raketa tuzilishi va ekspeditsiya darslari', open: () => { root.classList.remove('show'); window.openExpedition && window.openExpedition(); }, stat: rocketStat },
    { id: 'math', icon: '➗', name: () => t('math'), sub: () => t('sub'), open: () => window.openMath && window.openMath(), stat: mathStat },
    { id: 'phys', icon: '⚛️', name: () => t('phys'), sub: () => t('sub'), open: () => { root.classList.remove('show'); if (window.openPhysics) window.openPhysics(); }, stat: () => { try { return Object.assign({ started: false }, window.PhysStat(), { started: window.PhysStat().done > 0 || window.PhysStat().last != null }); } catch (_) { return { done: 0, total: 1, last: null, started: false }; } } },
    { id: 'chem', icon: '🧪', name: () => t('chem'), sub: () => t('sciSub'), open: () => { root.classList.remove('show'); document.body.classList.remove('math-mode'); try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(false); } catch (_) {} if (window.openChemistry) window.openChemistry(); else if (window.openScience) window.openScience('chem'); }, stat: () => { try { return Object.assign({ started: false }, window.ChemStat(), { started: window.ChemStat().done > 0 }); } catch (_) { return scienceStat('chem'); } } }
  ];

  const css = document.createElement('style');
  css.textContent = `#oquv{position:fixed;inset:0;z-index:10004;display:none;flex-direction:column;color:#eafaff;font-family:system-ui,sans-serif;background:linear-gradient(rgba(1,5,14,.9),rgba(1,5,14,.97)),#030814;contain:layout paint}
#oquv.show{display:flex}
#oquv .mt{display:flex;align-items:center;gap:10px;padding:10px 14px;padding-top:calc(10px + env(safe-area-inset-top,0px));background:rgba(4,12,28,.85);border-bottom:1px solid rgba(130,200,255,.3)}
#oquv .mt b{font-size:15px;letter-spacing:2px}#oquv .mt .olang{margin-left:auto}#oquv .olang button{margin:0;padding:6px 9px;border:0;background:none;border-radius:10px;color:#dff;font:inherit;font-weight:700}#oquv .olang button.on{background:#0ff;color:#012}
#oquv button.x{font:inherit;color:#dff;border:1px solid #7cf;border-radius:10px;background:rgba(0,60,90,.6);padding:8px 12px;font-weight:700;cursor:pointer}
#oquv .bd{flex:1;overflow:auto;padding:14px;max-width:760px;width:100%;margin:0 auto;box-sizing:border-box}
#oquv .lead{opacity:.85;line-height:1.55;margin:4px 0 14px}
#oquv .sj{display:block;width:100%;text-align:left;padding:14px;margin-bottom:12px;border:1px solid rgba(125,249,255,.4);border-radius:16px;background:linear-gradient(135deg,rgba(11,42,107,.85),rgba(74,29,140,.85));color:#fff;font:inherit;cursor:pointer}
#oquv .sj h4{margin:0 0 4px;font-size:20px}#oquv .sj p{margin:0 0 10px;opacity:.8;font-size:13px}
#oquv .sj[data-s=phys]{background:linear-gradient(135deg,rgba(5,65,105,.88),rgba(8,42,75,.9))}#oquv .sj[data-s=chem]{background:linear-gradient(135deg,rgba(5,65,105,.88),rgba(8,42,75,.9))}
#oquv .pb{height:8px;border-radius:6px;background:rgba(255,255,255,.15);overflow:hidden}#oquv .pb i{display:block;height:100%;background:linear-gradient(90deg,#0ff,#4fa)}
#oquv .st{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12px;opacity:.9}
#oquv .go{margin-top:10px;display:inline-block;padding:8px 16px;border-radius:10px;background:#0ff;color:#012;font-weight:800}`;
  document.head.appendChild(css);
  const root = document.createElement('div'); root.id = 'oquv';
  root.innerHTML = `<div class="mt"><b ${K} id="oqT"></b><button class="x" id="oqX" ${K}></button></div><div class="bd" id="oqB"></div>`;
  document.body.appendChild(root);
  const $ = id => document.getElementById(id);
  let isOpen = false;

  function render() {
    $('oqT').textContent = t('title'); $('oqX').textContent = t('close');
    if (window.OrvinLang && OrvinLang.mount) OrvinLang.mount(root.querySelector('.mt'), $('oqX'));
    let h = `<p class="lead" ${K}>${t('lead')}</p>`;
    SUBJECTS.forEach(s => {
      const st = s.stat(), pct = st.total ? Math.round(100 * st.done / st.total) : 0;
      h += `<button class="sj" data-s="${s.id}" ${K}><h4>${s.icon} ${s.name()}</h4><p>${s.sub()}</p><div class="pb"><i style="width:${pct}%"></i></div><div class="st"><span>${st.done}/${st.total} ${t('topics')}</span>${st.last != null ? `<span>${t('mock')}: ${st.last}/100</span>` : ''}</div><span class="go">${st.started ? t('goOn') : t('go')} ▶</span></button>`;
    });
    $('oqB').innerHTML = h;
  }
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'oqX') return window.closeOquv();
    if (b.dataset.s) { const s = SUBJECTS.find(x => x.id === b.dataset.s); if (s) s.open(); }
  });
  window.openOquv = function () {
    isOpen = true; document.body.classList.add('math-mode');
    try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(true); } catch (_) { }
    render(); root.classList.add('show');
  };
  window.closeOquv = function () {
    isOpen = false; root.classList.remove('show');
    if (!(window.__msState && document.getElementById('msMath') && document.getElementById('msMath').classList.contains('show'))) {
      document.body.classList.remove('math-mode');
      try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(false); } catch (_) { }
    }
  };
  /* matematikadan chiqsak — O'quv bo'limiga qaytamiz (kamera hali to'xtab turadi) */
  const origClose = window.closeMath;
  if (origClose) window.closeMath = function () {
    origClose.apply(this, arguments);
    if (isOpen) { document.body.classList.add('math-mode'); try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(true); } catch (_) { } render(); }
  };
  window.addEventListener('orvin-lang', () => { if (isOpen) render(); });
  window.addEventListener('orvin-science-closed', () => { if (isOpen) { document.body.classList.add('math-mode'); try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(true); } catch (_) {} root.classList.add('show'); render(); } });
})();
