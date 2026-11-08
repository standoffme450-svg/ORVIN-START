/* ORVIN — tuzatishlar (Lite / Pro / Premium uchun umumiy)
   1) Profil oynasi boshqa elementlar (chat, mikrofon, menyu) ustida turadi
   2) Profilda foydalanuvchi UID si va "Nusxa" tugmasi
   3) Ovozli buyruqlar UZ / RU / EN: "quyosh sistemasi", "солнечная система", "solar system"
      -> ORVIN so'raydi: ma'lumot beraymi yoki bo'limni ochaymi? (sayyoralar uchun ham)
      + raketa, ob-havo, globus, kosmos, brauzer buyruqlari rus/o'zbek tilida ham ishlaydi
   4) ORVIN klaviaturasida EN <-> RU (kirill) almashtirish tugmasi */
(function () {
  'use strict';
  if (window.__orvinFix) return; window.__orvinFix = true;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const lang = () => { let c = 'uz'; try { c = (window.OrvinLang && OrvinLang.code) || window.ORVIN_LANG || localStorage.getItem('orvin_lang') || 'uz'; } catch (_) { } return /^(uz|ru|en)$/.test(c) ? c : 'uz'; };

  /* ---------------- CSS: qatlamlar (z-index) ---------------- */
  const css = document.createElement('style');
  css.textContent = `
/* Profil: mikrofon (10004), chat javobi (10020), menyu tugmasi (10030) va boshqalar ustida; to'lov/tarif oynalaridan (10040+) pastda */
#certList{z-index:10035!important;background:linear-gradient(rgba(1,5,14,.82),rgba(1,5,14,.94)),var(--spaceBg) 50% 50%/cover no-repeat,#030814!important}
body.orvin-prof-open #mic,body.orvin-prof-open #omAns,body.orvin-prof-open #proChip,body.orvin-prof-open #omBurger,body.orvin-prof-open #kb,body.orvin-prof-open #wlink{visibility:hidden!important;pointer-events:none!important}
/* To'lov oynasi tarif oynasidan (10070) ham yuqorida */
#omPay{z-index:10080!important}
#pfUid{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 0 12px;padding:10px 12px;border:1px solid rgba(125,249,255,.28);border-radius:12px;background:rgba(5,20,42,.55);color:#eaf8ff}
#pfUid span{min-width:0}#pfUid small{display:block;font-size:10px;letter-spacing:2px;color:#8fb2d6}
#pfUid b{display:block;font:700 12px ui-monospace,Menlo,monospace;word-break:break-all;color:#fff}
#pfUid button{flex:none;padding:8px 12px;border:1px solid #7cf;border-radius:10px;background:rgba(0,60,90,.6);color:#dff;font-weight:700}
#kbh{position:relative}
#kbLang{position:absolute;right:2px;top:-1px;padding:2px 9px;border:1px solid rgba(0,229,255,.8);border-radius:8px;background:rgba(0,70,95,.6);color:#dff;font:700 11px system-ui;letter-spacing:1px}
#ofAsk{position:fixed;left:50%;bottom:calc(150px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:10027;display:none;gap:8px;padding:10px;border-radius:16px;background:rgba(4,14,34,.92);border:1px solid rgba(125,249,255,.6);box-shadow:0 0 24px rgba(47,123,255,.4);max-width:96vw}
#ofAsk.show{display:flex;flex-wrap:wrap;justify-content:center}
#ofAsk b{flex:1 1 100%;text-align:center;font:600 13px system-ui;color:#eaf8ff;margin:0 4px 2px}
#ofAsk button{padding:11px 14px;border:0;border-radius:12px;font:800 13px system-ui;cursor:pointer;color:#012;background:linear-gradient(110deg,#7df9ff,#4a8bff)}
#ofAsk button.g{background:rgba(255,255,255,.1);color:#cfe3ff;border:1px solid rgba(160,200,255,.4)}`;
  document.head.appendChild(css);

  /* ---------------- 1) Profil: sinf + UID ---------------- */
  const UT = {
    uz: { copy: 'Nusxa', ok: 'Nusxalandi ✓', t: 'FOYDALANUVCHI UID' },
    ru: { copy: 'Копировать', ok: 'Скопировано ✓', t: 'UID ПОЛЬЗОВАТЕЛЯ' },
    en: { copy: 'Copy', ok: 'Copied ✓', t: 'USER UID' }
  };
  function copyText(v) {
    try { if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(v); } catch (_) { }
    try { const a = document.createElement('textarea'); a.value = v; a.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove(); } catch (_) { }
  }
  function addUid() {
    const b = $('certListB'); if (!b || b.querySelector('#pfUid')) return;
    const A = window.orvinAuth, u = A && A.user, pf = b.querySelector('.pf'); if (!u || !u.uid || !pf) return;
    const T = UT[lang()], d = document.createElement('div'); d.id = 'pfUid';
    d.innerHTML = '<span><small>' + T.t + '</small><b>' + esc(u.uid) + '</b></span><button type="button">' + T.copy + '</button>';
    d.querySelector('button').onclick = e => { copyText(u.uid); const x = e.currentTarget; x.textContent = T.ok; setTimeout(() => { x.textContent = T.copy; }, 1400); };
    pf.insertAdjacentElement('afterend', d);
  }
  (function watchProfile() {
    let n = 0; const iv = setInterval(() => {
      const box = $('certList'), body = $('certListB'); n++;
      if (box && body) {
        clearInterval(iv);
        const sync = () => document.body.classList.toggle('orvin-prof-open', box.classList.contains('show'));
        new MutationObserver(sync).observe(box, { attributes: true, attributeFilter: ['class'] });
        new MutationObserver(addUid).observe(body, { childList: true });
        sync(); addUid();
      } else if (n > 100) clearInterval(iv);
    }, 300);
  })();

  /* ---------------- 2) Ovozli buyruqlar (UZ / RU / EN) ---------------- */
  const norm = s => String(s == null ? '' : s).toLowerCase().replace(/[‘’`ʻʼ´]/g, "'").replace(/[.,!?;:"«»()]/g, ' ').replace(/\s+/g, ' ').trim();
  const ASKQ = /(haqida|ma'lumot|malumot|nima|qanday|qayerdan|qachon|nega|nimaga|kim\b|aytib|tushuntir|gapir|tell|what|why|when|who|how|about|explain|расскаж|что такое|что\b|почему|когда|откуда|кто\b|как\b|объясни|информаци|\bо\s)/i;
  const SOLAR = /(quyosh|kuyosh)\s*(sistema|tizim)|\b(solar|sun)\s*system\b|солнечн\w*\s*систем/;
  const PLANETS = [
    [/merkuriy|merkuri|\bmercury\b|меркури/, 'mercury', 'Merkuriy', 'Меркурий', 'Mercury'],
    [/venera|zuhra|\bvenus\b|венер/, 'venus', 'Venera', 'Венера', 'Venus'],
    [/\bmars\b|mirrix|марс/, 'mars', 'Mars', 'Марс', 'Mars'],
    [/yupiter|mushtariy|jupiter|юпитер/, 'jupiter', 'Yupiter', 'Юпитер', 'Jupiter'],
    [/\bsaturn\b|zuhal|сатурн/, 'saturn', 'Saturn', 'Сатурн', 'Saturn'],
    [/\buran\b|uranus|(^|\s)уран\b/, 'uranus', 'Uran', 'Уран', 'Uranus'],
    [/neptun|neptune|нептун/, 'neptune', 'Neptun', 'Нептун', 'Neptune']
  ];
  /* oddiy buyruqlar: o'zbek/rus so'zlari inglizcha ekvivalentga o'giriladi (tarjimasiz ham ishlaydi).
     3-element: true = savol shaklida aytilsa ham ishlaydi */
  const DIRECT = [
    [/raketa|ракет/, 'open rocket', false],
    [/ob.?havo|погод/, 'weather', true],
    [/o'zbekiston.*(hudud|viloyat|xarita)|узбекистан.*(област|регион|карт)/, 'regions', false],
    [/globus|yer\s*shari|zilzila|глобус|землетряс/, 'globe', false],
    [/kosmos|koinot|космос|вселенн/, 'open space', false],
    [/brauzer|браузер|интернет/, 'browser', false]
  ];
  const NOTDIRECT = /o'?rgan|organ|learn|ekspe|expe|эксп|обуч|dars|урок|sertifikat|certificate|matemat|math|fizik|physic|kimyo|chem|математ|физик|хим/;
  const TX = {
    askSolar: { uz: "Quyosh sistemasi haqida ma'lumot beraymi yoki bo'limni ochaymi?", ru: 'Рассказать о Солнечной системе или открыть раздел?', en: 'Should I tell you about the Solar System or open the section?' },
    askPlanet: { uz: n => n + " haqida ma'lumot beraymi yoki sayyorani ko'rsataymi?", ru: n => 'Рассказать о планете ' + n + ' или показать её?', en: n => 'Should I tell you about ' + n + ' or show it?' },
    info: { uz: "Ma'lumot", ru: 'Рассказать', en: 'Tell me' }, open: { uz: "Bo'limni ochish", ru: 'Открыть раздел', en: 'Open section' }, show: { uz: "Ko'rsatish", ru: 'Показать', en: 'Show it' }
  };
  const INFO_RE = /(ma'lumot|malumot|haqida|info|tell|explain|about|расскаж|информац|узнать|справк|объясни|гапир|gapir|aytib)/;
  const OPEN_RE = /(och\b|ochish|ochib|bo'lim|bolim|open|show|ko'rsat|korsat|hologram|section|открой|открыть|покаж|раздел|покажи)/;
  let pending = null, pendTimer = 0, busy = false;
  let ask = null;
  function say(en, uz) { try { if (window.say) window.say(en, false, 'en', uz); } catch (_) { } }
  function hideAsk() { clearTimeout(pendTimer); pending = null; if (ask) ask.classList.remove('show'); }
  function showAsk(kind, key, label) {
    const L = lang(); hideAsk();
    if (!ask) { ask = document.createElement('div'); ask.id = 'ofAsk'; document.body.appendChild(ask); }
    const q = kind === 'solar' ? TX.askSolar[L] : TX.askPlanet[L](label[L]);
    ask.innerHTML = '<b>' + esc(q) + '</b><button type="button" data-a="info">ℹ️ ' + esc(TX.info[L]) + '</button><button type="button" data-a="open">🪐 ' + esc(kind === 'solar' ? TX.open[L] : TX.show[L]) + '</button><button type="button" class="g" data-a="x">✕</button>';
    ask.classList.add('show'); pending = { kind, key, label };
    ask.onclick = e => { const b = e.target.closest('button'); if (!b) return; const a = b.dataset.a; const p = pending; hideAsk(); if (p && a !== 'x') choose(p, a); };
    pendTimer = setTimeout(hideAsk, 30000);
    const en = kind === 'solar' ? TX.askSolar.en : TX.askPlanet.en(label.en), uz = kind === 'solar' ? TX.askSolar.uz : TX.askPlanet.uz(label.uz);
    say(en, uz);
  }
  function choose(p, a) {
    let h = window.handle; if (!h) return;
    if (a === 'info') {
      const topic = p.kind === 'solar' ? 'tell me about the solar system' : 'tell me about ' + p.key;
      try { if (window.orvinPro && orvinPro.charge) orvinPro.charge(topic); } catch (_) { }
      try { if (window.OrvinAstro && OrvinAstro.answer(topic)) return; } catch (_) { }
      busy = true; try { h(topic); } finally { busy = false; }
    } else {
      /* "open ..." astro-javob bloklaydigan qoidadan (NOT) o'tmaydi va to'g'ridan-to'g'ri bo'limni ochadi */
      busy = true; try { h(p.kind === 'solar' ? 'open solar system' : 'open ' + p.key); } finally { busy = false; }
    }
  }
  function intercept(texts) {
    const all = texts.map(norm).filter(Boolean); if (!all.length) return false;
    const joined = all.join(' | ');
    /* 1) savolga javob (ma'lumot / ochish) */
    if (pending) {
      const reply = all.every(t => t.split(' ').length <= 4 && !NOTDIRECT.test(t) && !/raketa|rocket|ракет/.test(t));
      const wantInfo = reply && all.some(t => INFO_RE.test(t)), wantOpen = reply && all.some(t => OPEN_RE.test(t));
      if (wantInfo || wantOpen) { const p = pending, a = wantOpen && !wantInfo ? 'open' : (wantInfo && !wantOpen ? 'info' : 'open'); hideAsk(); choose(p, a); return true; }
      if (/\b(yo'q|yoq|no|cancel|bekor|нет|отмена)\b/.test(joined)) { hideAsk(); return true; }
      hideAsk();
    }
    const q = all.some(t => ASKQ.test(t)), short = all.every(t => t.split(' ').length <= 4);
    /* 2) quyosh sistemasi */
    const openNow = all.some(t => OPEN_RE.test(t));
    if (all.some(t => SOLAR.test(t))) { if (q) return false; if (openNow) { choose({ kind: 'solar', key: 'solar' }, 'open'); return true; } showAsk('solar', 'solar', null); return true; }
    /* 3) sayyoralar: faqat qisqa buyruq bo'lsa so'raymiz; savol bo'lsa astro ma'lumot beradi */
    if (short && !q) for (const p of PLANETS) if (all.some(t => p[0].test(t))) { if (openNow) { choose({ kind: 'planet', key: p[1] }, 'open'); return true; } showAsk('planet', p[1], { uz: p[2], ru: p[3], en: p[4] }); return true; }
    return false;
  }
  function direct(texts) {
    const all = texts.map(norm).filter(Boolean);
    if (all.some(t => /^(close|yop|yopish|закрой)/.test(t) || NOTDIRECT.test(t))) return null;
    const q = all.some(t => ASKQ.test(t));
    for (const d of DIRECT) if (all.some(t => d[0].test(t)) && (d[2] || !q)) return d[1];
    return null;
  }
  const hasLocal = text => { const t = norm(text); return !!t && (SOLAR.test(t) || PLANETS.some(p => p[0].test(t)) || DIRECT.some(d => d[0].test(t)) || !!pending); };
  (function patchToEn() {
    let n = 0; const iv = setInterval(() => {
      n++; const L = window.OrvinLang;
      if (L && typeof L.toEn === 'function' && !L.toEn._fix) {
        clearInterval(iv); const t0 = L.toEn;
        L.toEn = function (text) { const p = t0.apply(this, arguments); return Promise.resolve(p).catch(err => { if (hasLocal(text)) return text; throw err; }); };
        L.toEn._fix = true;
      } else if (n > 100) clearInterval(iv);
    }, 300);
  })();
  function install() {
    const o = window.handle; if (typeof o !== 'function' || o._fix) return false;
    const w = function (raw) {
      if (busy) return o.apply(this, arguments);
      const texts = [raw, window.__orvinRaw].filter(x => x != null && String(x).trim());
      try {
        if (intercept(texts)) return;
        /* inglizcha matn allaqachon tushunarli bo'lsa tegmaymiz; rus/o'zbekcha bo'lsa mahalliy xaritadan o'tkazamiz */
        const cmd = direct(texts);
        if (cmd && norm(raw) !== cmd) {
          busy = true; try { return o.call(this, cmd); } finally { busy = false; }
        }
      } catch (e) { console.warn('orvin-fix:', e); busy = false; }
      return o.apply(this, arguments);
    };
    Object.keys(o).forEach(k => { w[k] = o[k]; }); w._fix = true; window.handle = w; return true;
  }
  (function hook() {
    let n = 0; const iv = setInterval(() => {
      n++; const o = window.handle;
      if (!o) { if (n > 300) clearInterval(iv); return; }
      if (o._fix) { clearInterval(iv); return; }
      if (!o._astro && n < 100) return;          // boshqa o'ramlar (pro, astro) tugashini kutamiz (~40 s)
      install(); clearInterval(iv);
    }, 400);
  })();

  /* ---------------- 3) ORVIN klaviaturasi: EN <-> RU ---------------- */
  const LAYOUT = {
    en: ['qwertyuiop', "asdfghjkl'", 'zxcvbnm'],
    ru: ['йцукенгшщзхъ', 'фывапролджэё', 'ячсмитьбю']
  };
  let kbLangNow = 'en';
  function mkKey(ch) {
    const b = document.createElement('button'); b.className = 'key'; b.dataset.k = ch; b.textContent = ch;
    b.addEventListener('click', () => { b.classList.add('pr'); setTimeout(() => b.classList.remove('pr'), 140); try { window.pressKey(b.dataset.k); } catch (_) { } });
    return b;
  }
  function applyKb(code) {
    const kb = $('kb'); if (!kb) return; kbLangNow = code;
    const rows = kb.querySelectorAll('.kr');
    for (let r = 1; r <= 3 && r < rows.length; r++) {
      const row = rows[r]; row.querySelectorAll('.key').forEach(k => { if (!k.classList.contains('w2')) k.remove(); });
      const anchor = row.querySelector('.key.w2');
      LAYOUT[code][r - 1].split('').forEach(ch => { const k = mkKey(ch); if (anchor) row.insertBefore(k, anchor); else row.appendChild(k); });
    }
    const btn = $('kbLang'); if (btn) btn.textContent = '🌐 ' + code.toUpperCase();
    try { localStorage.setItem('orvin_kb_lang', code); } catch (_) { }
  }
  (function kbInit() {
    let n = 0; const iv = setInterval(() => {
      n++; const kb = $('kb'), h = $('kbh');
      if (kb && h && typeof window.pressKey === 'function') {
        clearInterval(iv);
        if (!$('kbLang')) {
          const b = document.createElement('button'); b.id = 'kbLang'; b.type = 'button'; b.textContent = '🌐 EN';
          b.addEventListener('click', e => { e.stopPropagation(); applyKb(kbLangNow === 'en' ? 'ru' : 'en'); });
          h.appendChild(b);
        }
        let saved = 'en'; try { saved = localStorage.getItem('orvin_kb_lang') || 'en'; } catch (_) { }
        if (saved === 'ru') applyKb('ru');
      } else if (n > 150) clearInterval(iv);
    }, 300);
  })();
})();
