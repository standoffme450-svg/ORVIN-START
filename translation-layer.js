/* ORVIN language layer: English interface + English speech + Uzbek captions.
   Uses Google's public web translation endpoint; no translation API key required. */
(function () {
  'use strict';
  const LANGS = ['uz', 'ru', 'en'];
  let LANG = 'en'; try { const l = localStorage.getItem('orvin_lang'); if (LANGS.includes(l)) LANG = l; } catch (_) {}
  window.ORVIN_LANG = LANG;
  let EPOCH = 0;
  const cacheKey = () => 'orvin_translation_to_' + LANG + '_v1';
  const ENG = /\b(the|and|is|are|to|of|you|your|me|my|open|opened|close|start|search|speak|click|tap|press|please|what|how|with|for|not|can|yes|settings|profile|voice|send|loading|learn|test|quiz|lesson|rocket|physics|chemistry)\b/i;
  const memory = new Map();
  // Local UI phrasebook: common controls and messages stay English even if
  // the online translator is unavailable. Dynamic/long text still uses Google Translate.
  const phrasebook = new Map(Object.entries({
    'ISHGA TUSHIRISH':'START','ORVIN KLAVIATURA':'ORVIN KEYBOARD','YOPISH':'CLOSE',
    'ORVIN • FAN LABORATORIYASI':'ORVIN • SCIENCE LAB','O‘QUV BO‘LIMLARI':'LEARNING MODULES',
    'BO‘LIMNI TANLANG':'CHOOSE A MODULE','🚀 ROKET YASASH':'🚀 ROCKET BUILDER',
    'Ekspeditsiya: dars, 3D model, test':'Expedition: lesson, 3D model, quiz',
    '⚛️ FIZIKA':'⚛️ PHYSICS','Dars, 10 test, 5 topshiriq':'Lesson, 10-question quiz, 5 tasks',
    '🧪 KIMYO':'🧪 CHEMISTRY','👤 PROFIL':'👤 PROFILE','MEHMON':'GUEST',
    'Sozlamalar':'Settings','Ovoz':'Voice','Yuborish':'Send',
    'Qidiring yoki sayt manzili...':'Search or enter website address...',
    'Yuklanmoqda...':'Loading...','Qidirilmoqda...':'Searching...',
    'Qidiryapman...':'Searching...','Xatolik yuz berdi':'An error occurred',
    'Ovoz eshitilmadi. Mikrofon tugmasini bosib, aniqroq gapiring.':'I could not hear you. Press the microphone button and speak more clearly.',
    'Mikrofon topilmadi yoki band (boshqa ilova ishlatyapti).':'Microphone not found or busy (another app may be using it).',
    'Internet kerak: ovoz tanish Google serveriga ulanadi.':'Internet is required because speech recognition connects to Google servers.',
    'Tanlangan til qo‘llanmadi, rus tiliga o‘tdim. Mikrofonni qayta bosing.':'That language is not supported. Switched to Russian. Press the microphone again.',
    'O‘zbekistonning barcha hududlari xaritada belgilandi.':'All regions of Uzbekistan have been marked on the map.',
    'O‘quv bo‘limlari ochildi':'Learning sections opened','Ekspeditsiya yopildi':'Expedition closed',
    'Ekspeditsiya ochildi':'Expedition opened','Fizika darsi ochildi':'Physics lesson opened',
    'Kimyo darsi ochildi':'Chemistry lesson opened','Fan laboratoriyasi ochildi':'Science lab opened',
    'Vikipediyaga ulanib bo‘lmadi. Internetni tekshiring, ':'Could not connect to Wikipedia. Check your internet connection, ',
    'Vikipediyadan topa olmadim. Boshqacha aytib ko‘ring.':'I could not find that on Wikipedia. Please try asking another way.',
    'Globusni yuklab bo‘lmadi.':'Could not load the globe.'
  }));
  const subtitleBook = new Map(Object.entries({
    'Hello! I am Orvin. How can I help you?':'Salom! Men Orvinman. Sizga qanday yordam bera olaman?',
    'I am your personal AI assistant.':'Men sizning shaxsiy sun’iy intellekt yordamchingizman.',
    'Closed.':'Yopildi.',
    'I am listening.':'Eshitaman.',
    'Listening… speak now.':'Eshitaman... gapiring.',
    'I could not hear you. Press the microphone button and speak more clearly.':'Ovoz eshitilmadi. Mikrofon tugmasini bosib, aniqroq gapiring.',
    'Microphone is busy. Tap again.':'Mikrofon band, qayta bosing.',
    'I am checking the weather…':'Ob-havoni tekshiryapman...',
    'I could not determine your location. Allow location access.':'Joylashuvni aniqlab bo‘lmadi. Joylashuvga ruxsat bering.',
    'Contacts could not be selected.':'Kontaktlarni tanlab bo‘lmadi.',
    'No contact was added.':'Kontakt qo‘shilmadi.',
    'I am calling the number…':'Raqamga qo‘ng‘iroq qilyapman...',
    'I am searching…':'Qidiryapman...',
    'The Wikipedia page is open.':'Vikipediya sahifasi ochildi.',
    'I could not find that on Wikipedia. Please try asking another way.':'Vikipediyadan topa olmadim. Boshqacha aytib ko‘ring.',
    'The rocket is not ready. Missing: ':'Raketa tayyor emas. Yetishmaydi: ',
    'I am building the rocket.':'Raketani yig‘yapman.',
    'The rocket builder is open. Pinch and drag parts onto the rocket, add fuel to the tank, name it, and say “launch.”':'Raketa yasash stoli ochildi. Qismlarni chimchilab raketaga olib boring, yoqilg‘ini bakka quying, nom bering va uchir deng.',
    'The microphone is off. Tap the button to turn it on.':'Mikrofon o‘chirildi. Yoqish uchun tugmani bosing.',
    'The solar system hologram is open. Tap a planet or say its name. Say “rocket” to build one.':'Quyosh tizimi gologrammasi ochildi. Sayyorani bosing yoki nomini ayting. Raketa desangiz uni yasaymiz.',
    'Timer stopped.':'Taymer to‘xtatildi.',
    'How many minutes should I set?':'Necha daqiqaga qo‘yay?',
    'The note was saved.':'Eslatma saqlandi.',
    'The notes were cleared.':'Eslatmalar tozalandi.',
    'I did not understand, ':'Tushunmadim, ',
    'Welcome, ':'Xush kelibsiz, ',
    'Your profile is open.':'Profil ochildi',
    'Your certificates are open.':'Sertifikatlaringiz ro‘yxati ochildi'
  }));
  /* Offline lug'atlar: bepul tarjimon ishlamasa ham asosiy matnlar to'g'ri chiqadi */
  const cl = x => String(x).replace(/\s+/g, ' ').trim();
  const RU_UI = ["ЗАПУСТИТЬ", "КЛАВИАТУРА ORVIN", "ЗАКРЫТЬ", "ORVIN • НАУЧНАЯ ЛАБОРАТОРИЯ", "УЧЕБНЫЕ РАЗДЕЛЫ", "ВЫБЕРИТЕ РАЗДЕЛ", "🚀 СБОРКА РАКЕТЫ", "Экспедиция: урок, 3D-модель, тест", "⚛️ ФИЗИКА", "Урок, 10 вопросов, 5 заданий", "🧪 ХИМИЯ", "👤 ПРОФИЛЬ", "ГОСТЬ", "Настройки", "Голос", "Отправить", "Поиск или адрес сайта...", "Загрузка...", "Идёт поиск...", "Ищу...", "Произошла ошибка", "Не слышно. Нажмите кнопку микрофона и говорите чётче.", "Микрофон не найден или занят (его использует другое приложение).", "Нужен интернет: распознавание речи работает через серверы Google.", "Выбранный язык не поддерживается, переключено на русский. Нажмите микрофон ещё раз.", "Все регионы Узбекистана отмечены на карте.", "Учебные разделы открыты", "Экспедиция закрыта", "Экспедиция открыта", "Урок физики открыт", "Урок химии открыт", "Научная лаборатория открыта", "Не удалось подключиться к Википедии. Проверьте интернет,", "Я не нашёл это в Википедии. Попробуйте сказать иначе.", "Не удалось загрузить глобус."], RU_SAY = ["Привет! Я Орвин. Чем могу помочь?", "Я ваш личный ИИ-помощник.", "Закрыто.", "Слушаю.", "Слушаю… говорите.", "Не слышно. Нажмите кнопку микрофона и говорите чётче.", "Микрофон занят. Нажмите ещё раз.", "Проверяю погоду…", "Не удалось определить местоположение. Разрешите доступ к геолокации.", "Не удалось выбрать контакты.", "Контакт не добавлен.", "Звоню по номеру…", "Ищу…", "Страница Википедии открыта.", "Я не нашёл это в Википедии. Попробуйте спросить иначе.", "Ракета не готова. Не хватает:", "Собираю ракету.", "Стол сборки ракеты открыт. Щипком перетащите детали на ракету, залейте топливо в бак, дайте имя и скажите «запуск».", "Микрофон выключен. Нажмите кнопку, чтобы включить.", "Голограмма Солнечной системы открыта. Нажмите на планету или назовите её. Скажите «ракета», чтобы собрать ракету.", "Таймер остановлен.", "На сколько минут поставить?", "Заметка сохранена.", "Заметки удалены.", "Я не понял,", "Добро пожаловать,", "Профиль открыт.", "Список сертификатов открыт."];
  const ruMap = new Map(), uzMap = new Map();
  [...phrasebook.keys()].forEach((k, i) => ruMap.set(cl(k), RU_UI[i]));
  [...subtitleBook.keys()].forEach((k, i) => { ruMap.set(cl(k), RU_SAY[i]); uzMap.set(cl(k), subtitleBook.get(k)); });
  ruMap.set("Today's free limit is over. Orvin Pro removes the limit.", 'Бесплатный лимит на сегодня исчерпан. Orvin Pro снимает ограничение.');
  uzMap.set("Today's free limit is over. Orvin Pro removes the limit.", 'Bugungi bepul limit tugadi. Orvin Pro limitni olib tashlaydi.');
  try {
    const saved = JSON.parse(localStorage.getItem(cacheKey()) || '{}');
    Object.keys(saved).forEach(k => memory.set(k, saved[k]));
  } catch (_) {}
  let saveTimer = 0, retryT = 0;
  const pending = [];
  let active = 0;
  const MAX_ACTIVE = 6;
  const skipTags = new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE','SVG','CANVAS','IFRAME']);

  function shouldSkip(node) {
    if (!node || !node.parentElement) return true;
    const el = node.nodeType === 1 ? node : node.parentElement;
    if (el.closest('#orvinUzSubtitle, [data-keep-uz="true"], script, style, noscript, textarea, code, pre, svg, canvas, iframe, [contenteditable="true"]')) return true;
    if (node.nodeType === 1 && skipTags.has(node.tagName)) return true;
    return false;
  }
  function clean(s) { return String(s || '').replace(/\s+/g, ' ').trim(); }
  function saveCache() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      const arr = [...memory];
      for (const n of [4000, 1200, 300]) {
        try { const o = {}; arr.slice(-n).forEach(([k, v]) => { o[k] = v; }); localStorage.setItem(cacheKey(), JSON.stringify(o)); return; } catch (_) {}
      }
    }, 2000);
  }
  async function fetchJson(url, ms) {
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), ms || 8000);
    try { const r = await fetch(url, { signal: ctl.signal, mode: 'cors' }); if (!r.ok) throw new Error('HTTP ' + r.status); return await r.json(); }
    finally { clearTimeout(to); }
  }
  const HOSTS = ['https://translate.googleapis.com', 'https://translate.google.com'];
  async function requestTranslation(text, sourceLang, target) {
    const tg = target || LANG;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const data = await fetchJson(HOSTS[attempt % HOSTS.length] + '/translate_a/single?client=gtx&sl=auto&tl=' + tg + '&dt=t&q=' + encodeURIComponent(text));
        if (data && data[2] === tg) return text;                  // matn allaqachon shu tilda
        const out = ((data && data[0]) || []).map(part => part && part[0] || '').join('');
        if (out) return out;
      } catch (_) {}
      await new Promise(r => setTimeout(r, 350 * (attempt + 1)));
    }
    let lang = /^(uz|ru|en)$/i.test(String(sourceLang || '')) ? String(sourceLang).toLowerCase() : 'uz';
    if (lang === tg) lang = tg === 'en' ? 'uz' : 'en';
    const data = await fetchJson('https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text.slice(0, 480)) + '&langpair=' + encodeURIComponent(lang + '|' + tg));
    const translated = data && data.responseStatus === 200 && data.responseData && data.responseData.translatedText;
    if (!translated || /^MYMEMORY WARNING:/i.test(translated)) throw new Error('No translation');
    return translated;
  }
  async function translateOne(input, sourceLang) {
    const text = clean(input);
    if (!text || text.length < 2 || !/[A-Za-z\u0400-\u04FF]/.test(text)) return input;
    if (LANG === 'en' && phrasebook.has(text)) return phrasebook.get(text);
    { const off = LANG === 'ru' ? ruMap.get(text) : LANG === 'uz' ? uzMap.get(text) : null; if (off) return off; }
    if (memory.has(text)) return memory.get(text);
    // Emoji va belgilar (🚀, →, ...) tarjimada yo'qolmasin: chetlarini ajratib, o'rtasini tarjima qilamiz
    const pre = (text.match(/^[^\p{L}\p{N}]+/u) || [''])[0];
    const suf = (text.match(/[^\p{L}\p{N}.?!…:;,"')\]]+$/u) || [''])[0];
    const core = text.slice(pre.length, text.length - suf.length);
    if (!core || !/\p{L}/u.test(core)) return input;
    if (core.length <= 4 && /^[A-Z0-9 .:\-—%+]+$/.test(core)) return input;   // OK, H2O kabi qisqa belgilar
    const chunks = [];
    let rest = core;
    while (rest.length > 2800) {
      let cut = Math.max(rest.lastIndexOf(' ', 2800), rest.lastIndexOf('. ', 2800), rest.lastIndexOf('! ', 2800), rest.lastIndexOf('? ', 2800));
      if (cut < 1000) cut = 2800;
      chunks.push(rest.slice(0, cut));
      rest = rest.slice(cut).trimStart();
    }
    if (rest) chunks.push(rest);
    let out = (await Promise.all(chunks.map(chunk => requestTranslation(chunk, sourceLang)))).join(' ').trim();
    if (!out) throw new Error('empty');
    if (core.length > 2 && core === core.toUpperCase() && core !== core.toLowerCase()) out = out.toUpperCase();   // KATTA HARFLAR saqlansin
    out = pre + out + suf;
    memory.set(text, out);
    saveCache();
    return out;
  }
  function failed() {            // internet yo'q yoki tarjimon band: keyinroq qayta urinamiz
    if (retryT || navigator.onLine === false) return;
    retryT = setTimeout(() => { retryT = 0; scan(document.body); }, 15000);
  }
  window.addEventListener('online', () => scan(document.body));
  const UZ = /(o['‘’ʻ`]|g['‘’ʻ`])|\b(va|bilan|uchun|ham|dars|savol|javob|mavzu|ball|topshiriq|yopish|natija|keyingi|oldingi|bo'lim|test)\b/i;
  const skipUz = x => LANG === 'uz' && UZ.test(x) && !ENG.test(x);
  function queuedTranslate(input) {
    return new Promise(resolve => {
      pending.push({ input, resolve });
      pump();
    });
  }
  function pump() {
    while (active < MAX_ACTIVE && pending.length) {
      const job = pending.shift(); active++;
      translateOne(job.input).then(job.resolve).catch(() => { failed(); job.resolve(null); }).finally(() => { active--; pump(); });
    }
  }
  function setText(node, original) {
    if (!node || !original || !original.trim() || shouldSkip(node)) return;
    const now = node.nodeValue;
    if (node.__orvinEnglish === now) return;
    const source = original;
    if (skipUz(source)) return;
    const ep = EPOCH;
    queuedTranslate(source).then(translated => {
      if (ep !== EPOCH || translated == null) return;
      if (!node.isConnected || shouldSkip(node)) return;
      // Only apply if the node has not changed while translation was pending.
      if (node.nodeValue !== source && node.nodeValue !== now) return;
      const val = source.match(/^\s*/)[0] + String(translated).trim() + source.match(/\s*$/)[0];   // bo'shliqlar saqlanadi
      node.__orvinSource = source;
      node.nodeValue = val;
      node.__orvinEnglish = val;
    });
  }
  function translateTextNode(node) {
    if (!node || node.nodeType !== 3 || shouldSkip(node)) return;
    const value = node.nodeValue;
    if (!value || !value.trim()) return;
    if (node.__orvinEnglish === value) return;
    setText(node, value);
  }
  const attrNames = ['placeholder','title','aria-label','alt'];
  function translateAttributes(el) {
    if (!el || el.nodeType !== 1 || shouldSkip(el)) return;
    attrNames.forEach(attr => {
      const value = el.getAttribute(attr);
      if (!value || !value.trim() || el.dataset['orvin' + attr.replace(/(^|-)(.)/g, (_,a,c)=>c.toUpperCase())] === value) return;
      const marker = 'orvin' + attr.replace(/(^|-)(.)/g, (_,a,c)=>c.toUpperCase());
      if (skipUz(value)) return;
      el.dataset[marker] = value;
      const ep = EPOCH;
      queuedTranslate(value).then(translated => {
        if (ep !== EPOCH) return;
        if (translated == null) { if (el.dataset[marker] === value) delete el.dataset[marker]; return; }
        if (el.isConnected && el.getAttribute(attr) === value && !shouldSkip(el)) el.setAttribute(attr, translated);
      });
    });
  }
  function scan(root) {
    if (!root) return;
    if (root.nodeType === 3) { translateTextNode(root); return; }
    if (root.nodeType === 1) translateAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node; while ((node = walker.nextNode())) translateTextNode(node);
    if (root.querySelectorAll) root.querySelectorAll('*').forEach(translateAttributes);
  }

  // Dedicated bottom subtitles stay in Uzbek while ORVIN speaks English.
  function ensureSubtitle() {
    let el = document.getElementById('orvinUzSubtitle');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'orvinUzSubtitle';
    el.setAttribute('data-keep-uz', 'true');
    el.style.cssText = 'position:fixed;top:calc(76px + env(safe-area-inset-top,0px));right:12px;left:auto;transform:none;width:min(76vw,520px);max-height:12vh;overflow:auto;box-sizing:border-box;padding:7px 11px;border:1px solid rgba(90,190,255,.48);border-left:3px solid #36d9ff;border-radius:10px;background:rgba(3,14,32,.82);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#e5f7ff;font:500 12px/1.4 system-ui,sans-serif;text-align:left;text-shadow:0 1px 3px #000;z-index:9000;display:none;white-space:pre-wrap;pointer-events:none;box-shadow:0 5px 18px rgba(0,0,0,.24)';
    document.body.appendChild(el);
    return el;
  }
  const subtitleAllowed = () => !document.body.classList.contains('math-mode') && !document.body.classList.contains('sci-on') && !document.body.classList.contains('exp-on') && !document.getElementById('oquv')?.classList.contains('show') && !document.getElementById('msMath')?.classList.contains('show') && !document.getElementById('sciHub')?.classList.contains('show') && !document.getElementById('expeditionNew')?.classList.contains('show');
  const originalSay = window.say;
  if (typeof originalSay === 'function') {
    window.say = function (text, me, lang) {
      if (!me && text != null && String(text).trim()) {
        const sub = ensureSubtitle();
        if (!subtitleAllowed()) { sub.style.display = 'none'; return originalSay.apply(this, arguments); }
        const cleanText = String(text).replace(/<[^>]*>/g, '').trim();
        sub.textContent = LANG === 'uz' ? (arguments[3] || subtitleBook.get(cleanText) || cleanText) : cleanText;
        if (LANG !== 'uz') translateOne(cleanText).then(x => { sub.textContent = x; }).catch(() => {});
        sub.style.display = 'block';
      }
      return originalSay.apply(this, arguments);
    };
  }
  const subtitleGuard = new MutationObserver(() => { const sub = document.getElementById('orvinUzSubtitle'); if (sub && !subtitleAllowed()) sub.style.display = 'none'; });
  subtitleGuard.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });
  const originalSpeak = window.speak;
  if (typeof originalSpeak === 'function') {
    window.speak = async function (text, lang) {
      const original = String(text == null ? '' : text);
      try {
        const english = await translateOne(original, lang || 'uz');
        return originalSpeak(english, LANG);
      } catch (_) {
        return originalSpeak(({ uz: 'Hozir tarjima qila olmadim. Qayta urinib ko‘ring.', ru: 'Сейчас не удалось перевести. Попробуйте ещё раз.', en: "I couldn't translate that right now. Please try again." })[LANG], LANG);
      }
    };
  }

  /* ---------- Til almashtirish (UZ / RU / EN) ---------- */
  const MON = { uz: ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentabr','oktabr','noyabr','dekabr'], ru: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'], en: ['January','February','March','April','May','June','July','August','September','October','November','December'] };
  const DAY = { uz: ['yakshanba','dushanba','seshanba','chorshanba','payshanba','juma','shanba'], ru: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'], en: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] };
  const p2 = n => String(n).padStart(2, '0');
  function timeText() { const d = new Date(), hm = p2(d.getHours()) + ':' + p2(d.getMinutes()); return ({ uz: 'Soat ' + hm + '.', ru: 'Сейчас ' + hm + '.', en: "It's " + hm + '.' })[LANG]; }
  function dateText() { const d = new Date(), w = DAY[LANG][d.getDay()], m = MON[LANG][d.getMonth()], y = d.getFullYear(), n = d.getDate();
    return ({ uz: `Bugun ${w}, ${n}-${m}, ${y}-yil.`, ru: `Сегодня ${w}, ${n} ${m} ${y} года.`, en: `Today is ${w}, ${m} ${n}, ${y}.` })[LANG]; }
  function restoreAll() {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) { if (n.__orvinSource !== undefined && n.__orvinEnglish === n.nodeValue) n.nodeValue = n.__orvinSource; n.__orvinEnglish = undefined; n.__orvinSource = undefined; }
    document.querySelectorAll('*').forEach(el => attrNames.forEach(a => {
      const mk = 'orvin' + a.replace(/(^|-)(.)/g, (_, x, c) => c.toUpperCase());
      if (el.dataset && el.dataset[mk] !== undefined) { el.setAttribute(a, el.dataset[mk]); delete el.dataset[mk]; }
    }));
  }
  function langBox(id, cls) {
    const box = document.createElement('div');
    if (id) box.id = id;
    box.className = 'olang ' + (cls || '');
    box.setAttribute('data-keep-uz', 'true');
    const t = document.createElement('button'); t.className = 'olt'; t.type = 'button'; t.textContent = '🌐'; t.setAttribute('aria-label', 'Language');
    const m = document.createElement('span'); m.className = 'olo';
    LANGS.forEach(l => { const b = document.createElement('button'); b.dataset.l = l; b.textContent = l.toUpperCase(); b.onclick = e => { e.stopPropagation(); setLang(l); box.classList.remove('open'); t.textContent = '🌐'; }; m.appendChild(b); });
    t.onclick = e => { e.stopPropagation(); const o = box.classList.toggle('open'); t.textContent = o ? '✕' : '🌐'; };
    box.appendChild(t); box.appendChild(m);
    return box;
  }
  function paintSwitch() {
    try {
      if (!document.getElementById('orvinLangCss')) {
        const st = document.createElement('style'); st.id = 'orvinLangCss';
        st.textContent = '.olang{display:flex;align-items:center;gap:3px;padding:3px;border:1px solid rgba(125,249,255,.65);border-radius:16px;background:rgba(6,18,44,.82);box-shadow:0 0 12px rgba(0,220,255,.25)}.olang.fixed{position:fixed;right:10px;top:calc(12px + env(safe-area-inset-top,0px));z-index:10040}.olang.inline{margin-left:8px}.olang button{border:0;background:none;color:#bff;font:700 13px system-ui,sans-serif;letter-spacing:.06em;padding:7px 11px;border-radius:12px;cursor:pointer}.olang .olt{width:34px;height:34px;padding:0;font-size:18px;line-height:34px;text-align:center;border-radius:50%}.olang .olo{display:none;gap:3px}.olang.open .olo{display:flex}.olang button.on{background:#0ff;color:#012}';
        document.head.appendChild(st);
      }
      if (!document.getElementById('orvinLang')) document.body.appendChild(langBox('orvinLang', 'fixed'));
      const hd = document.querySelector('#oHome .hd');
      if (hd && !hd.querySelector('.olang')) hd.insertBefore(langBox(null, 'inline'), hd.querySelector('#oHomeX') || null);
      document.querySelectorAll('.olang button').forEach(b => b.classList.toggle('on', b.dataset.l === LANG));
    } catch (e) { console.warn('lang switch:', e); }
  }
  function mount(parent, before) { if (!parent || parent.querySelector('.olang')) return; parent.insertBefore(langBox(null, 'inline'), before || null); paintSwitch(); }
  function setLang(l) {
    if (!LANGS.includes(l) || l === LANG) return;
    LANG = l; EPOCH++; window.ORVIN_LANG = l;
    try { localStorage.setItem('orvin_lang', l); } catch (_) {}
    memory.clear(); pending.length = 0;
    try { const sv = JSON.parse(localStorage.getItem(cacheKey()) || '{}'); Object.keys(sv).forEach(k => memory.set(k, sv[k])); } catch (_) {}
    document.documentElement.lang = l;
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (_) {}
    const sub = document.getElementById('orvinUzSubtitle'); if (sub) sub.style.display = 'none';
    restoreAll(); scan(document.body); paintSwitch();
    window.dispatchEvent(new Event('orvin-lang'));
  }
  window.OrvinLang = { get code() { return LANG; }, set: setLang, mount, translate: translateOne, timeText, dateText, toEn: text => requestTranslation(String(text), LANG, 'en') };

  function start() {
    document.documentElement.lang = LANG;
    paintSwitch();
    if (document.title) queuedTranslate(document.title).then(t => { document.title = t; });
    scan(document.body);
    const observer = new MutationObserver(records => {
      for (const rec of records) {
        if (rec.type === 'characterData') {
          const n = rec.target;
          if (n.__orvinEnglish === n.nodeValue) continue;
          translateTextNode(n);
        } else {
          rec.addedNodes && rec.addedNodes.forEach(n => scan(n));
          if (rec.type === 'attributes') translateAttributes(rec.target);
        }
      }
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attrNames });
  }
  try { if (document.body) paintSwitch(); } catch (_) {}
  setInterval(paintSwitch, 2000);
  window.addEventListener('load', paintSwitch);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
