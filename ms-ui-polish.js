/* ORVIN — yagona ko'rinish: variant kartalari (matematika/fizika/kimyo bir xil + qiyinlik), ORVIN klaviatura (ko'kroq), til tugmasi */
(function () {
  'use strict';
  const css = document.createElement('style'); css.id = 'orvinPolish';
  css.textContent = `#kb{background:linear-gradient(160deg,rgba(14,52,118,.94),rgba(7,24,62,.96))!important;border-color:rgba(96,176,255,.95)!important;box-shadow:0 0 24px rgba(40,140,255,.5),inset 0 0 18px rgba(80,160,255,.18)!important}
#kbh{color:#9fd2ff!important}
#kb .key{background:rgba(30,90,190,.5)!important;border-color:rgba(110,180,255,.8)!important;color:#eaf4ff!important;text-shadow:0 0 6px #5af!important}
#kb .key.hov{background:rgba(110,190,255,.85)!important;color:#021634!important;box-shadow:0 0 14px #6bf!important}
#kb .key.pr{background:#fff!important;color:#021634!important}
#kb .key.caps-on{background:#6bf!important;color:#021634!important;box-shadow:0 0 12px #6bf!important}
#kb.caps .key:not([data-k=BS]):not([data-k=SP]):not([data-k=EN]):not([data-k=SH]):not([data-k=CL]):not([data-k=MIC]):not([data-k=".com"]){text-transform:uppercase}
.mk-variant .mk-lv{display:block;font-style:normal;font-size:12px;color:#8fd0ff;margin-top:2px}
.mk-variant .mk-lv2{display:block;font-style:normal;font-size:12px;color:#ffd98a}`;
  document.head.appendChild(css);
  const T = {
    uz: ['45 topshiriq · 100 ball · 150 daq', 'Qiyinlik: MS darajasi — oson → qiyin'],
    ru: ['45 заданий · 100 баллов · 150 мин', 'Сложность: уровень НС — от лёгких к сложным'],
    en: ['45 tasks · 100 pts · 150 min', 'Difficulty: MS level — easy → hard']
  };
  setInterval(() => {
    const L = T[window.ORVIN_LANG] || T.uz;
    document.querySelectorAll('.mk-variant').forEach(b => {
      let a = b.querySelector('.mk-lv'); if (!a) { a = document.createElement('em'); a.className = 'mk-lv'; b.appendChild(a); const c = document.createElement('em'); c.className = 'mk-lv2'; b.appendChild(c); }
      a.textContent = L[0]; b.querySelector('.mk-lv2').textContent = L[1];
      const sp = b.querySelector('span'); if (sp && /45/.test(sp.textContent)) sp.style.display = 'none';
    });
  }, 400);
})();
