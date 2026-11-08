/* ORVIN PRO — kunlik limit + obuna + Pro funksiyalar
   Sozlash: index.html ichida window.ORVIN_PRO = {freeDaily, price, payUrl, contact} */
(function () {
  'use strict';
  if (window.__orvinPro) return; window.__orvinPro = true;

  const CFG = Object.assign({
    freeDaily: 10000,                   // bepul foydalanuvchi uchun kunlik KREDIT
    costBasic: 500,                     // oddiy buyruq narxi (kredit)
    costHeavy: 700,                     // og'ir buyruq narxi (matematika, raketa, qora tuynuk, Vikipediya, test...)
    price: "29 000 so'm / oy",
    payUrl: '',                         // Payme / Click / Telegram to'lov havolasi
    contact: '@orvin_support',          // to'lovdan keyin faollashtirish uchun aloqa
    tier: window.ORVIN_TIER || 'lite'   // lite = 10 000 kredit/kun; pro va premium = 1 000 000 kredit/kun
  }, window.ORVIN_PRO || {});
  /* Kunlik kredit: Lite 10 000 · Pro 1 000 000 · Premium CHEKSIZ. Sarf (orvin_day) tariflar orasida umumiy — tarif almashtirilsa kreditlar tiklanmaydi/o'zgarmaydi. */
  CFG.freeDaily = CFG.tier === 'lite' ? 10000 : CFG.tier === 'pro' ? 1000000 : Infinity;
  if (window.ORVIN_PRO && window.ORVIN_PRO.enforce === false) CFG.enforce = false; else if (CFG.enforce === undefined) CFG.enforce = true;

  let pro = CFG.tier !== 'lite', until = 0, uid = null, email = '';
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const day = () => new Date().toLocaleDateString('en-CA');
  const fdb = () => { try { return firebase.firestore(); } catch (e) { return null; } };

  /* ---------- kunlik hisoblagich ---------- */
  function getUse() {
    try { const u = JSON.parse(localStorage.getItem('orvin_day') || '{}'); return u.d === day() ? u : { d: day(), n: 0 }; }
    catch (e) { return { d: day(), n: 0 }; }
  }
  const HEAVY = /(math|matematika|математика|rocket|raketa|ракет|black ?hole|qora tuynuk|чёрн|wiki|vikiped|globe|dunyo|earth|certificate|sertifikat|test|exam|imtihon|physics|fizika|chemistry|kimyo)/i;
  const OPENCMD = /^\s*(open|show|launch|ochish|och|ochib ber|ko.rsat|открой|открыть|покажи)?\s*(learning|learn|o.?quv|oquv|обучение|учёба|учеба|math(ematics)?|matematika|математика|physics|fizika|физика|chemistry|kimyo|химия|globe|globus|rocket|raketa|ракета|black ?holes?|qora tuynuk\w*|profile|profil|certificates?|sertifikat\w*|settings|sozlamalar|history|tarix|credits?|kredit\w*|tariffs?|plans?|tarif\w*)\s*[.!?]*\s*$/i;
  const costOf = t => OPENCMD.test(t) ? 0 : HEAVY.test(t) ? CFG.costHeavy : CFG.costBasic;
  const fmt = n => String(Math.max(0, Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  function addUse(cost) {
    const u = getUse(); u.n += cost;
    try { localStorage.setItem('orvin_day', JSON.stringify(u)); } catch (e) { }
    pushUse(u.n);
    return u.n;
  }
  /* kreditni akkauntga bog'lash: users/{uid}/usage/{kun} — qurilma almashsa ham sarf saqlanadi */
  let pushT = 0;
  function pushUse(n) {
    const db = fdb(); if (!uid || !db) return;
    clearTimeout(pushT);
    pushT = setTimeout(() => { db.collection('users').doc(uid).collection('usage').doc(day()).set({ n, t: Date.now() }).catch(() => { }); }, 1500);
  }
  async function pullUse() {
    const db = fdb(); if (!uid || !db) return;
    try {
      const d = await db.collection('users').doc(uid).collection('usage').doc(day()).get();
      const remote = d.exists ? (+d.data().n || 0) : 0, u = getUse();
      if (remote > u.n) { u.n = remote; localStorage.setItem('orvin_day', JSON.stringify(u)); }
      else if (u.n > remote) pushUse(u.n);
      ui();
    } catch (e) { console.warn('usage:', e); }
  }

  /* ---------- UI ---------- */
  const st = document.createElement('style');
  st.textContent = `
  #proChip{position:fixed;left:8px;top:calc(8px + env(safe-area-inset-top,0px));z-index:29;padding:2px 7px;border-radius:10px;
    font:700 9px 'Orbitron',system-ui,sans-serif;letter-spacing:.12em;color:#dff;background:rgba(6,18,44,.7);
    border:1px solid rgba(125,249,255,.5);cursor:pointer;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
  #proChip.pro.prem{background:linear-gradient(110deg,#ffe9a8,#ff9f2e,#ffd76a);letter-spacing:.16em}
  #proChip.pro{color:#2b1a00;background:linear-gradient(110deg,#ffd76a,#ffb020);border-color:#ffe9a8}
  #proChip.low{border-color:#ff8e9b;color:#ffd5da}
  #proBox{position:fixed;inset:0;z-index:10050;display:none;align-items:center;justify-content:center;background:rgba(0,4,16,.78);
    -webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);padding:16px;font-family:system-ui,sans-serif}
  #proBox.show{display:flex}
  #proBox .pb{width:min(92vw,400px);max-height:90vh;overflow:auto;padding:22px 20px;border-radius:20px;color:#eaf8ff;
    background:linear-gradient(160deg,rgba(10,30,72,.97),rgba(4,10,28,.97));border:1px solid rgba(125,249,255,.55);
    box-shadow:0 0 40px rgba(47,123,255,.4)}
  #proBox h2{margin:0 0 4px;font:900 22px 'Orbitron',system-ui,sans-serif;letter-spacing:.1em;
    background:linear-gradient(90deg,#7df9ff,#4db8ff);-webkit-background-clip:text;background-clip:text;color:transparent}
  #proBox .why{margin:0 0 12px;font-size:13px;color:#ffd5da}
  #proBox ul{list-style:none;margin:10px 0;padding:0;font-size:14px;line-height:1.7}
  #proBox li::before{content:"✦ ";color:#7df9ff}
  #proBox .pr{margin:12px 0;font:800 20px 'Orbitron',system-ui,sans-serif;color:#ffd76a}
  #proBox button{display:block;width:100%;margin-top:8px;padding:12px;border:0;border-radius:14px;font:700 14px system-ui,sans-serif;cursor:pointer}
  #proBox .b1{background:linear-gradient(110deg,#7df9ff,#2f7bff);color:#021}
  #proBox .b2{background:rgba(255,255,255,.08);color:#cfe3ff;border:1px solid rgba(160,200,255,.4)}
  #proBox small{display:block;margin-top:10px;font-size:11px;color:#9bb8d8;word-break:break-all}
  #proBox .ok{color:#5ce6b2;font-weight:700}#proBox .bad{color:#ff8e9b;font-weight:700}`;
  document.head.appendChild(st);

  const chip = document.createElement('div'); chip.id = 'proChip'; document.body.appendChild(chip);
  const box = document.createElement('div'); box.id = 'proBox'; document.body.appendChild(box);
  chip.onclick = () => paywall('info');
  box.addEventListener('click', e => { if (e.target === box) box.classList.remove('show'); });

  function ui() {
    if (pro) { chip.className = 'pro' + (CFG.tier === 'premium' ? ' prem' : ''); chip.textContent = CFG.tier === 'premium' ? '★ PREMIUM' : '★ PRO'; return; }
    const left = Math.max(0, CFG.freeDaily - getUse().n);
    chip.className = left < CFG.costHeavy * 2 ? 'low' : '';
    chip.textContent = fmt(left) + ' kredit';
  }

  const PW = {
    uz: { limit: 'Bugungi kreditlar tugadi. Ertaga yangilanadi.', pdf: 'Sertifikatlar (PNG/PDF) faqat Premium tarifda.', info: '', plans: 'Tariflar', close: 'Yopish' },
    ru: { limit: 'Кредиты на сегодня закончились. Завтра обновятся.', pdf: 'Сертификаты (PNG/PDF) доступны только в тарифе Premium.', info: '', plans: 'Тарифы', close: 'Закрыть' },
    en: { limit: 'Today’s credits are used up. They renew tomorrow.', pdf: 'Certificates (PNG/PDF) are available only on the Premium plan.', info: '', plans: 'Plans', close: 'Close' }
  };
  function paywall(reason) {
    const L = (window.OrvinLang && OrvinLang.code) || 'uz', w = PW[L] || PW.uz;
    if (reason === 'info' || !reason) { window.OrvinMenu && OrvinMenu.showCred(); return; }
    box.innerHTML = '<div class="pb"><h2>ORVIN ' + esc(CFG.tier.toUpperCase()) + '</h2><p class="why">' + esc(w[reason] || w.limit) + '</p>'
      + (CFG.tier === 'lite' ? '<button class="b1" data-a="plans">' + w.plans + '</button>' : '') + '<button class="b2" data-a="x">' + w.close + '</button></div>';
    box.classList.add('show');
    box.querySelectorAll('button').forEach(b => b.onclick = () => { box.classList.remove('show'); if (b.dataset.a === 'plans' && window.OrvinMenu) OrvinMenu.showTar(reason === 'pdf' ? 'premium' : 'pro'); });
  }

  /* ---------- obunani Firestore'dan o'qish (faqat o'qiladi, yozilmaydi) ---------- */

  /* ---------- OBUNA TEKSHIRUVI (Pro / Premium sahifalari): faol obunasiz kirib bo'lmaydi ---------- */
  const GL = {
    uz: { chk: 'Obuna tekshirilmoqda…', login: 'Pro/Premium dan foydalanish uchun Google bilan kiring.', none: 'Bu tarif uchun faol obuna topilmadi. Obuna oylik.', signin: 'Google bilan kirish', pay: 'Obuna bo‘lish (Click)', back: 'Bepul Lite ga qaytish', until: 'Obuna amal qiladi: ' },
    ru: { chk: 'Проверяем подписку…', login: 'Войдите через Google, чтобы пользоваться Pro/Premium.', none: 'Активная подписка на этот тариф не найдена. Подписка ежемесячная.', signin: 'Войти через Google', pay: 'Оформить подписку (Click)', back: 'Вернуться на бесплатный Lite', until: 'Подписка действует до: ' },
    en: { chk: 'Checking subscription…', login: 'Sign in with Google to use Pro/Premium.', none: 'No active subscription found for this plan. Subscriptions are monthly.', signin: 'Sign in with Google', pay: 'Subscribe (Click)', back: 'Back to free Lite', until: 'Subscription valid until: ' }
  };
  const gateEl = document.createElement('div'); gateEl.id = 'proGate';
  gateEl.style.cssText = 'position:fixed;inset:0;z-index:10040;display:none;align-items:center;justify-content:center;flex-direction:column;gap:10px;padding:24px;text-align:center;background:rgba(2,6,20,.97);color:#eaf8ff;font:600 15px system-ui,sans-serif';
  document.body.appendChild(gateEl);
  let authKnown = false, subOk = false;
  const RANK = { lite: 0, pro: 1, premium: 2 };
  function subActive(d) { return !!d && (RANK[d.plan] || 0) >= (RANK[CFG.tier] || 0) && (!d.until || +d.until > Date.now()); }
  function gate(state) {
    if (CFG.tier === 'lite' || CFG.enforce === false) { gateEl.style.display = 'none'; return; }
    const L = (window.OrvinLang && OrvinLang.code) || localStorage.getItem('orvin_lang') || 'uz', g = GL[L] || GL.uz;
    if (state === 'ok') { gateEl.style.display = 'none'; return; }
    const B = (id, txt, bg) => '<button data-g="' + id + '" style="min-width:240px;padding:13px 18px;border:0;border-radius:14px;font:800 14px system-ui;cursor:pointer;' + bg + '">' + txt + '</button>';
    gateEl.innerHTML = '<h2 style="margin:0;font:900 24px Orbitron,system-ui;letter-spacing:.1em;color:#ffd76a">ORVIN ' + CFG.tier.toUpperCase() + '</h2><p style="max-width:340px;margin:4px 0 8px;color:#cfe3ff">' + esc(state === 'chk' ? g.chk : state === 'login' ? g.login : g.none) + '</p>'
      + (state === 'none' && uid ? '<div style="max-width:340px;margin:0 0 6px;font:600 11px system-ui;color:#8fb2d6;word-break:break-all">UID: <b style="color:#fff;font-family:ui-monospace,monospace">' + esc(uid) + '</b> <button data-g="cp" style="min-width:0;padding:4px 10px;margin-left:6px;border:1px solid rgba(160,200,255,.5);border-radius:8px;background:rgba(255,255,255,.1);color:#cfe3ff;font:700 11px system-ui">' + (L === 'ru' ? 'Копировать' : L === 'en' ? 'Copy' : 'Nusxa') + '</button></div>' : '')
      + (state === 'login' ? B('in', g.signin, 'background:linear-gradient(110deg,#7df9ff,#2f7bff);color:#021') : '')
      + (state === 'none' ? B('pay', g.pay, 'background:linear-gradient(110deg,#ffe08a,#ffa21a);color:#2b1a00') : '')
      + (state !== 'chk' ? B('back', g.back, 'background:rgba(255,255,255,.08);color:#cfe3ff;border:1px solid rgba(160,200,255,.4)') : '');
    gateEl.style.display = 'flex';
    gateEl.querySelectorAll('button').forEach(b => b.onclick = () => {
      if (b.dataset.g === 'cp') { try { navigator.clipboard.writeText(uid); } catch (_) { } b.textContent = '✓'; }
      else if (b.dataset.g === 'in') window.orvinAuth && orvinAuth.signIn();
      else if (b.dataset.g === 'pay') window.OrvinMenu && OrvinMenu.pay(CFG.tier);
      else location.href = 'lite.html';
    });
  }
  window.addEventListener('orvin-lang', () => { if (gateEl.style.display === 'flex') gate(!uid ? 'login' : subOk ? 'ok' : 'none'); });
  if (CFG.tier !== 'lite' && CFG.enforce !== false) {
    if (window.firebase && firebase.apps && firebase.apps.length) gate('chk'); else console.warn('ORVIN: Firebase topilmadi — obuna tekshiruvi o‘tkazib yuborildi');
  }

  async function loadSub() {
    pro = CFG.tier !== 'lite'; until = 0; pullUse(); subOk = false;
    const db = fdb();
    if (uid && db) {
      try {
        const s = await db.collection('subs').doc(uid).get();
        if (s.exists) { const d = s.data(); until = +d.until || 0; pro = pro || ((d.plan === 'pro' || d.plan === 'premium') && (!d.until || d.until > Date.now())); }
      } catch (e) { console.warn('subs:', e); }
    }
    if (CFG.tier !== 'lite' && CFG.enforce !== false && window.firebase && firebase.apps && firebase.apps.length) {
      let d = null; try { const s = db && uid ? await db.collection('subs').doc(uid).get() : null; d = s && s.exists ? s.data() : null; } catch (e) { console.warn('subs gate:', e); }
      subOk = subActive(d); gate(!uid ? 'login' : subOk ? 'ok' : 'none');
    }
    ui();
  }
  /* foydalanuvchi Telegram'dan qaytganda obunani qayta tekshiramiz */
  document.addEventListener('visibilitychange', () => { if (!document.hidden && uid && gateEl.style.display === 'flex') loadSub(); });
  (function watchAuth() {
    if (!window.firebase || !firebase.apps || !firebase.apps.length) return;
    firebase.auth().onAuthStateChanged(u => { uid = u ? u.uid : null; email = u ? (u.email || '') : ''; loadSub(); });
  })();

  /* ---------- 1) kunlik limit: handle() ni o'rash ---------- */
  (function hook() {
    let n = 0;
    const iv = setInterval(() => {
      n++;
      const o = window.handle;
      if (!o || o._pro) { if (n > 150) clearInterval(iv); return; }
      if (!o._certList && n < 60) return;           // boshqa o'ramlar tugashini kutamiz
      const w = function (raw) {
        const t = String(raw || '').toLowerCase();
        if (!/\b(close|hide|exit|stop|mute|sleep)\b/.test(t)) {
          const cost = costOf(t);
          if (getUse().n + cost > CFG.freeDaily) {
            try { window.say && window.say("Today's free limit is over. Orvin Pro removes the limit.", false, 'en', "Bugungi bepul limit tugadi. Orvin Pro limitni olib tashlaydi."); } catch (e) { }
            paywall('limit'); return;
          }
          if (cost > 0) { addUse(cost); ui(); } window.__orvinLastUse = Date.now(); window.__orvinLastCost = cost;
        }
        return o.apply(this, arguments);
      };
      Object.keys(o).forEach(k => { w[k] = o[k]; });
      w._pro = true; window.handle = w; clearInterval(iv);
    }, 400);
  })();

  /* Adolat: ORVIN tushunmasa yoki Vikipediyadan topa olmasa, kunlik limitdan ayirilmaydi */
  (function refund() {
    let n = 0;
    const iv = setInterval(() => {
      n++; const s = window.say;
      if (!s || s._refund) { if (n > 150) clearInterval(iv); return; }
      if (!window.handle || !window.handle._pro) return;
      const w = function (text, me) {
        try {
          if (!me && window.__orvinLastUse && Date.now() - window.__orvinLastUse < 25000
            && /^(I did not understand|I could not hear|I could not find|I couldn['’]t (find|connect))/i.test(String(text).trim())) {
            window.__orvinLastUse = 0;
            const u = getUse(); if (u.n > 0) { u.n = Math.max(0, u.n - (window.__orvinLastCost || CFG.costBasic)); localStorage.setItem('orvin_day', JSON.stringify(u)); ui(); }
          }
        } catch (e) { }
        return s.apply(this, arguments);
      };
      Object.keys(s).forEach(k => { w[k] = s[k]; });
      w._refund = true; window.say = w; clearInterval(iv);
    }, 500);
  })();

  /* ---------- 2) Pro funksiya: tasdiqlangan sertifikat ---------- */
  function newCode() {
    const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', r = new Uint8Array(8); crypto.getRandomValues(r);
    return 'ORV-' + Array.from(r, x => A[x % A.length]).join('');
  }
  const verifyUrl = c => location.origin + location.pathname + '?verify=' + c;
  function register(code, label) {
    const db = fdb(), u = window.firebase && firebase.auth().currentUser;
    if (!db || !u) return;
    db.collection('certs').doc(code).set({
      uid: u.uid, name: u.displayName || '', title: String(label || '').replace(/\.(png|pdf)$/i, ''), at: Date.now()
    }).catch(e => console.warn('certs:', e));
  }

  function stampPng(dataUrl, label) {
    return new Promise((res, rej) => {
      const im = new Image();
      im.onload = () => {
        const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight;
        const x = c.getContext('2d'); x.drawImage(im, 0, 0);
        const fs = Math.max(14, c.width / 70);
        if (pro) {
          const code = newCode(); register(code, label);
          x.font = '600 ' + fs + 'px system-ui,sans-serif'; x.textAlign = 'right'; x.fillStyle = 'rgba(30,40,60,.85)';
          x.fillText('ORVIN • ' + code + ' • ' + verifyUrl(code), c.width - fs, c.height - fs);
        } else {
          x.save(); x.translate(c.width / 2, c.height / 2); x.rotate(-Math.atan2(c.height, c.width) * .8);
          x.font = '900 ' + c.width / 9 + 'px system-ui,sans-serif'; x.textAlign = 'center'; x.fillStyle = 'rgba(120,130,150,.28)';
          x.fillText('ORVIN FREE', 0, 0); x.restore();
          x.font = '600 ' + fs + 'px system-ui,sans-serif'; x.textAlign = 'right'; x.fillStyle = 'rgba(30,40,60,.7)';
          x.fillText('Tasdiqlanmagan nusxa • Orvin Pro: tasdiqlangan sertifikat', c.width - fs, c.height - fs);
        }
        res(c.toDataURL('image/png'));
      };
      im.onerror = rej; im.src = dataUrl;
    });
  }

  const _click = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    const a = this;
    if (a.download && /^ORVIN_.*\.png$/i.test(a.download) && /^data:image\/png/.test(a.href) && !a._st) {
      a._st = true;
      stampPng(a.href, a.download).then(u => { a.href = u; _click.call(a); }).catch(() => _click.call(a));
      return;
    }
    return _click.call(a);
  };

  (function patchPdf() {
    let n = 0;
    const iv = setInterval(() => {
      n++;
      const J = window.jspdf && window.jspdf.jsPDF;
      if (!J || !J.API) { if (n > 50) clearInterval(iv); return; }
      clearInterval(iv);
      if (J.API._pro) return;
      const save = J.API.save;
      J.API.save = function (name) {
        if (!pro) { paywall('pdf'); return this; }
        const code = newCode();
        try {
          const w = this.internal.pageSize.getWidth(), h = this.internal.pageSize.getHeight();
          this.setFontSize(Math.max(7, w / 110)); this.setTextColor(60);
          this.text('ORVIN • ' + code + ' • ' + verifyUrl(code), w - 10, h - 8, { align: 'right' });
        } catch (e) { }
        register(code, name);
        return save.apply(this, arguments);
      };
      J.API._pro = true;
    }, 300);
  })();

  /* ---------- 3) ?verify=KOD — sertifikatni tekshirish ---------- */
  (function verify() {
    const code = new URLSearchParams(location.search).get('verify');
    if (!code) return;
    let n = 0;
    const iv = setInterval(async () => {
      n++;
      const db = fdb();
      if (!db && n < 20) return;
      clearInterval(iv);
      let html = '<p class="bad">Tekshirib bo\'lmadi.</p>';
      try {
        const s = db && await db.collection('certs').doc(String(code).toUpperCase().slice(0, 20)).get();
        if (s && s.exists) {
          const d = s.data();
          html = '<p class="ok">✓ Haqiqiy Orvin sertifikati</p><ul><li>Egasi: ' + esc(d.name || '—') + '</li><li>Sertifikat: ' + esc(d.title) + '</li><li>Sana: ' + new Date(d.at).toLocaleDateString('en-CA') + '</li><li>ID: ' + esc(code) + '</li></ul>';
        } else html = '<p class="bad">✗ Bunday sertifikat topilmadi: ' + esc(code) + '</p>';
      } catch (e) { console.warn(e); }
      box.innerHTML = '<div class="pb"><h2>TEKSHIRUV</h2>' + html + '<button class="b2" data-a="x">Yopish</button></div>';
      box.classList.add('show');
      box.querySelector('button').onclick = () => box.classList.remove('show');
    }, 400);
  })();

  ui();
  window.orvinPro = { get isPro() { return pro; }, paywall, usage: getUse, limit: CFG.freeDaily, left: () => Math.max(0, CFG.freeDaily - getUse().n), charge: t => { const c = costOf(String(t || '').toLowerCase()); if (c > 0) { addUse(c); ui(); } } };
})();
