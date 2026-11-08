/* ORVIN 1.0 — Sertifikatlar faqat PREMIUM tarifda.
   Bu fayl LITE va PRO sahifalarida yuklanadi: sertifikat bo'limlari qulflanadi va Premium tarifga yo'naltiradi. */
(function () {
  'use strict';
  if (window.__orvinCertLock) return; window.__orvinCertLock = true;
  const T = {
    uz: { t: 'Sertifikatlar faqat Premium tarifda', p: 'Matematika, Fizika, Kimyo va Raketa sertifikatlarini barcha mavzularni tugatgach PNG yoki PDF qilib yuklab olish faqat PREMIUM tarifda mavjud.', b: 'PREMIUM’GA O‘TISH', back: 'MISSIYA XARITASI', n: '🏅 Sertifikatlar faqat PREMIUM tarifda beriladi.' },
    ru: { t: 'Сертификаты — только в тарифе Premium', p: 'Сертификаты по математике, физике, химии и ракетам (PNG или PDF) после прохождения всех тем доступны только в тарифе PREMIUM.', b: 'ПЕРЕЙТИ НА PREMIUM', back: 'КАРТА МИССИИ', n: '🏅 Сертификаты выдаются только в тарифе PREMIUM.' },
    en: { t: 'Certificates are Premium only', p: 'Mathematics, Physics, Chemistry and Rocket certificates (PNG or PDF, after finishing all topics) are available only on the PREMIUM plan.', b: 'GO PREMIUM', back: 'MISSION MAP', n: '🏅 Certificates are available only on the PREMIUM plan.' }
  };
  const L = () => T[(window.OrvinLang && window.OrvinLang.code) || document.documentElement.lang] || T.uz;
  const card = (back) => { const x = L(); return '<div class="exp-card" style="text-align:center;padding:22px 16px"><div style="font-size:44px">🔒</div><h2 style="font-size:22px;margin:8px 0">' + x.t + '</h2><p class="exp-copy">' + x.p + '</p>' +
    '<div class="exp-nav" style="justify-content:center;flex-wrap:wrap"><button class="exp-btn primary" data-premium-upgrade="1">' + x.b + '</button>' + (back ? '<button class="exp-btn ghost" data-action="home">' + x.back + '</button>' : '') + '</div></div>'; };
  window.orvinCertLockHTML = (compact) => '<div class="exp-kicker">ORVIN • PREMIUM</div>' + card(!compact);
  window.orvinCertLockProfile = () => { const x = L(); return '<h4>🏅 ' + x.t.toUpperCase() + '</h4><div class="em0" style="padding:14px 6px"><div style="font-size:38px">🔒</div><p style="margin:8px 0 14px">' + x.p + '</p><button data-premium-upgrade="1" style="padding:10px 18px;border:1px solid #ffd76a;border-radius:10px;background:rgba(80,60,0,.55);color:#ffe9a8;font-weight:800;letter-spacing:1px">' + x.b + '</button></div>'; };
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-premium-upgrade]'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    try { window.hideCertList && window.hideCertList(); } catch (_) { }
    try { if (window.OrvinMenu && window.OrvinMenu.showTar) window.OrvinMenu.showTar('premium'); } catch (_) { }
  }, true);
})();
