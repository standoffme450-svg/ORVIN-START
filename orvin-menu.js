window.ORVIN_VERSION = '1.0';
/* ORVIN — umumiy burger menyu (Lite / Pro / Premium): profil, akkaunt, sozlamalar (til, kreditlar...), tariflar, tarix.
   Sozlash: index.html ichida  window.ORVIN_TIER = 'lite' | 'pro' | 'premium'  (va ixtiyoriy window.ORVIN_URLS). */
(function () {
  'use strict';
  if (window.__orvinMenu) return; window.__orvinMenu = true;
  const TIER = window.ORVIN_TIER || 'lite';
  const URLS = Object.assign({ lite: 'lite.html', pro: 'pro.html', premium: 'premium.html' }, window.ORVIN_URLS || {});
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const lang = () => { const c = (window.OrvinLang && OrvinLang.code) || localStorage.getItem('orvin_lang') || 'uz'; return /^(uz|ru|en)$/.test(c) ? c : 'uz'; };
  const T = {
    uz: { menu: 'Menyu', guest: 'Mehmon', signin: 'Google bilan kirish', signout: 'Chiqish', guestSub: 'Natijalar saqlanishi uchun kiring', profile: 'Profil', settings: 'Sozlamalar', language: 'Til', credits: 'Kreditlar', perf: 'Yengil rejim', perfSub: 'Zaif qurilmalar uchun', clearH: 'Tarixni tozalash', support: 'Yordam (Telegram)', tariffs: 'Tariflar', history: 'Tarix', noH: 'Hali hech narsa ochilmagan', left: 'Qolgan kredit', daily: 'Kunlik limit', resets: 'Har kuni 00:00 da yangilanadi', free: 'BEPUL', current: 'Hozirgi tarif', upPro: 'Pro ga o‘tish', upPrem: 'Premium ga o‘tish', close: 'Yopish', today: 'bugun', ago: 'oldin', nowl: 'hozir',
      ph: ['Yuzni skanerlash', 'Mikrofon tugmasi', 'Astronomik ma’lumotlar', 'Mock testlar'],
      f: { lite: ['10 000 kredit / kun — bepul', 'Ovozli yordamchi ORVIN', 'Yengil va tez ishlaydi', 'Zaif telefon va elektron doskalar uchun'], pro: ['1 000 000 kredit / kun', 'Yuzni skanerlash — ORVIN sizni ismingiz bilan taniydi', 'Mikrofon tugmasi va yaxshilangan ovoz tanish', 'Astronomik savollarga javob: o‘zbek, rus, ingliz tillarida', 'Qo‘l ishoralari: barmoq bilan boshqarish'], premium: ['Cheksiz kredit — kunlik limit yo‘q', 'Pro dagi barcha imkoniyatlar', 'Yuzni skanerlash va mikrofon tugmasi', 'Astronomik ma’lumotlar — 3 tilda', 'Mock testlar: matematika, fizika, kimyo (45 topshiriq)', 'O‘quv markazi va qo‘l bilan amaliy laboratoriyalar', '🏅 Sertifikatlar (PNG/PDF) — faqat Premium tarifda'] },
      pl: { lite: 'LITE · BEPUL', pro: 'PRO', premium: 'PREMIUM' }, pv: { astro: 'Yulduzlar haqida ma’lumot ber…', mock: 'MOCK TEST · 45 topshiriq' } },
    ru: { menu: 'Меню', guest: 'Гость', signin: 'Войти через Google', signout: 'Выйти', guestSub: 'Войдите, чтобы сохранять результаты', profile: 'Профиль', settings: 'Настройки', language: 'Язык', credits: 'Кредиты', perf: 'Лёгкий режим', perfSub: 'Для слабых устройств', clearH: 'Очистить историю', support: 'Помощь (Telegram)', tariffs: 'Тарифы', history: 'История', noH: 'Пока ничего не открывали', left: 'Осталось кредитов', daily: 'Дневной лимит', resets: 'Обновляется каждый день в 00:00', free: 'БЕСПЛАТНО', current: 'Текущий тариф', upPro: 'Перейти на Pro', upPrem: 'Перейти на Premium', close: 'Закрыть', today: 'сегодня', ago: 'назад', nowl: 'сейчас',
      ph: ['Сканирование лица', 'Кнопка микрофона', 'Астрономические сведения', 'Mock-тесты'],
      f: { lite: ['10 000 кредитов в день — бесплатно', 'Голосовой помощник ORVIN', 'Лёгкий и быстрый', 'Для слабых телефонов и школьных досок'], pro: ['1 000 000 кредитов в день', 'Сканирование лица — ORVIN узнаёт вас по имени', 'Кнопка микрофона и улучшенное распознавание речи', 'Ответы на вопросы по астрономии на узбекском, русском и английском', 'Жесты рук: управление пальцами'], premium: ['Безлимитные кредиты — без дневного лимита', 'Все возможности Pro', 'Сканирование лица и кнопка микрофона', 'Астрономические сведения на 3 языках', 'Mock-тесты: математика, физика, химия (45 заданий)', 'Учебный центр и практические лаборатории руками', '🏅 Сертификаты (PNG/PDF) — только в тарифе Premium'] },
      pl: { lite: 'LITE · БЕСПЛАТНО', pro: 'PRO', premium: 'PREMIUM' }, pv: { astro: 'Расскажи о звёздах…', mock: 'MOCK-ТЕСТ · 45 заданий' } },
    en: { menu: 'Menu', guest: 'Guest', signin: 'Sign in with Google', signout: 'Sign out', guestSub: 'Sign in to save your results', profile: 'Profile', settings: 'Settings', language: 'Language', credits: 'Credits', perf: 'Light mode', perfSub: 'For weak devices', clearH: 'Clear history', support: 'Help (Telegram)', tariffs: 'Plans', history: 'History', noH: 'Nothing opened yet', left: 'Credits left', daily: 'Daily limit', resets: 'Renews every day at 00:00', free: 'FREE', current: 'Current plan', upPro: 'Upgrade to Pro', upPrem: 'Upgrade to Premium', close: 'Close', today: 'today', ago: 'ago', nowl: 'now',
      ph: ['Face scanning', 'Microphone button', 'Astronomy facts', 'Mock tests'],
      f: { lite: ['10,000 credits / day — free', 'ORVIN voice assistant', 'Light and fast', 'For weak phones and school boards'], pro: ['1,000,000 credits / day', 'Face scanning — ORVIN knows you by name', 'Microphone button and better speech recognition', 'Astronomy answers in Uzbek, Russian and English', 'Hand gestures: control with your fingers'], premium: ['Unlimited credits — no daily limit', 'Everything in Pro', 'Face scanning and microphone button', 'Astronomy facts in 3 languages', 'Mock tests: math, physics, chemistry (45 tasks)', 'Learning center and hands-on labs', '🏅 Certificates (PNG/PDF) — Premium plan only'] },
      pl: { lite: 'LITE · FREE', pro: 'PRO', premium: 'PREMIUM' }, pv: { astro: 'Tell me about stars…', mock: 'MOCK TEST · 45 tasks' } }
  };
  const t = k => (T[lang()] || T.uz)[k];

  /* ---------------- CSS ---------------- */
  const css = document.createElement('style'); css.id = 'omCss';
  css.textContent = `
#omBurger{position:fixed;left:10px;top:calc(10px + env(safe-area-inset-top,0px));z-index:10030;width:40px;height:40px;border-radius:12px;border:1px solid rgba(125,249,255,.7);background:rgba(6,22,56,.78);box-shadow:0 0 14px rgba(47,160,255,.4);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0;cursor:pointer;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);transition:transform .25s,box-shadow .25s}
#omBurger:active{transform:scale(.92)}#omBurger i{display:block;width:20px;height:2px;border-radius:2px;background:#bff4ff;transition:transform .3s,opacity .2s;box-shadow:0 0 6px #5cf}
body.om-open #omBurger i:nth-child(1){transform:translateY(7px) rotate(45deg)}body.om-open #omBurger i:nth-child(2){opacity:0}body.om-open #omBurger i:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
body:has(#start) #omBurger,body.math-mode #omBurger:not(.keep){opacity:0;pointer-events:none}
#proChip,#gAuth,#orvinLang.fixed{display:none!important}
#omShade{position:fixed;inset:0;z-index:10031;background:rgba(0,4,18,.6);opacity:0;pointer-events:none;transition:opacity .3s;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}
body.om-open #omShade{opacity:1;pointer-events:auto}
#omPanel{position:fixed;left:0;top:0;bottom:0;width:min(86vw,340px);z-index:10032;display:flex;flex-direction:column;color:#eaf8ff;font-family:system-ui,sans-serif;overflow:hidden;
background:linear-gradient(172deg,#0d4094 0%,#08266a 38%,#04143e 72%,#020a24 100%);border-right:1px solid rgba(125,249,255,.65);box-shadow:8px 0 40px rgba(30,120,255,.45),inset -1px 0 0 rgba(125,249,255,.25);
transform:translateX(-104%);transition:transform .42s cubic-bezier(.2,.8,.2,1)}
body.om-open #omPanel{transform:none}
#omPanel::before{content:"";position:absolute;inset:-40% -60%;background:conic-gradient(from 0deg,transparent 0 30%,rgba(125,249,255,.13) 38%,transparent 46% 100%);animation:omSpin 9s linear infinite;pointer-events:none}
#omPanel::after{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,transparent,#7df9ff,transparent);animation:omSweep 3.2s ease-in-out infinite}
@keyframes omSpin{to{transform:rotate(360deg)}}@keyframes omSweep{0%,100%{transform:translateX(-100%)}50%{transform:translateX(100%)}}
#omPanel>*{position:relative;z-index:1}
.omTop{display:flex;align-items:center;justify-content:space-between;padding:calc(12px + env(safe-area-inset-top,0px)) 14px 6px}
.omTop b{font:800 13px 'Orbitron',system-ui,sans-serif;letter-spacing:.2em;color:#7df9ff;text-shadow:0 0 10px #4cf}
.omX{width:36px;height:36px;border-radius:50%;border:1px solid rgba(125,249,255,.7);background:rgba(0,40,90,.6);color:#dff;font-size:18px;cursor:pointer;box-shadow:0 0 12px rgba(80,180,255,.5)}
.omProf{display:flex;align-items:center;gap:12px;margin:6px 14px 10px;padding:12px;border:1px solid rgba(125,249,255,.4);border-radius:16px;background:rgba(2,16,46,.55)}
.omAv{flex:none;width:54px;height:54px;border-radius:50%;border:2px solid #7cf;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#06223a;color:#dff;font:800 22px system-ui;cursor:pointer;padding:0;box-shadow:0 0 14px rgba(100,200,255,.6)}
.omAv img{width:100%;height:100%;object-fit:cover}
.omAcc{min-width:0;flex:1}.omAcc b{display:block;font-size:15px;word-break:break-word}.omAcc span{display:block;font-size:11px;opacity:.75;margin-top:2px;word-break:break-all}
.omAcc button{margin-top:6px;padding:5px 10px;border-radius:10px;border:1px solid #7cf;background:rgba(0,70,130,.6);color:#dff;font-weight:700;font-size:12px;cursor:pointer}
.omNav{padding:0 14px}.omItem{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;margin:5px 0;padding:12px 14px;border-radius:14px;border:1px solid rgba(125,249,255,.35);background:rgba(4,30,76,.6);color:#eaf8ff;font:700 14px system-ui;cursor:pointer;text-align:left;transition:background .2s,transform .15s}
.omItem:active{transform:scale(.98)}.omItem:hover{background:rgba(20,80,170,.55)}.omItem em{font:700 10px 'Orbitron',system-ui;font-style:normal;color:#ffd76a;letter-spacing:.08em}
#omSet{display:none;margin:2px 0 6px;padding:10px;border:1px solid rgba(125,249,255,.25);border-radius:14px;background:rgba(2,14,40,.55)}#omSet.open{display:block;animation:omIn .3s}
@keyframes omIn{from{opacity:0;transform:translateY(-6px)}}
#omSet h5{margin:8px 0 6px;font-size:11px;letter-spacing:.12em;opacity:.7;text-transform:uppercase}#omSet h5:first-child{margin-top:0}
.omLang{display:flex;gap:6px}.omLang button{flex:1;padding:8px 0;border-radius:10px;border:1px solid rgba(125,249,255,.5);background:rgba(0,40,90,.5);color:#cfe;font-weight:800;cursor:pointer}.omLang button.on{background:#7df9ff;color:#012}
.omRow{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;margin:5px 0;padding:9px 10px;border-radius:10px;border:1px solid rgba(125,249,255,.3);background:rgba(0,40,90,.45);color:#eaf8ff;font:600 13px system-ui;cursor:pointer;text-align:left}
.omRow small{display:block;font-weight:400;opacity:.65;font-size:11px}.omSw{flex:none;width:38px;height:22px;border-radius:12px;background:#12315e;border:1px solid #5ac;position:relative;transition:background .2s}.omSw::after{content:"";position:absolute;left:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#bde;transition:transform .2s}.omSw.on{background:#2bd1ff}.omSw.on::after{transform:translateX(16px);background:#fff}
.omHT{margin:8px 14px 4px;font:800 11px 'Orbitron',system-ui;letter-spacing:.16em;color:#7df9ff}
.omHist{flex:1;overflow:auto;margin:0 10px 10px;padding:0 4px calc(8px + env(safe-area-inset-bottom,0px))}
.omH{display:flex;align-items:center;gap:8px;margin:5px 0;padding:9px 10px;border-radius:12px;border:1px solid rgba(125,249,255,.28);background:rgba(2,18,52,.6);cursor:pointer}.omH:hover{background:rgba(20,70,150,.5)}
.omH .ic{font-size:18px}.omH .tx{flex:1;min-width:0}.omH .tx b{display:block;font-size:13px}.omH .tx small{opacity:.65;font-size:10px}.omH .dl{border:0;background:none;color:#ff9aa8;font-size:16px;cursor:pointer;padding:4px 6px}
.omNone{text-align:center;opacity:.6;font-size:12px;padding:16px 6px}
#omCred{position:fixed;inset:0;z-index:10060;display:none;align-items:center;justify-content:center;background:rgba(0,4,18,.55)}#omCred.show{display:flex}
#omCred .bx{position:relative;width:min(84vw,300px);padding:18px 16px;border-radius:18px;text-align:center;color:#eaf8ff;background:linear-gradient(160deg,rgba(14,56,130,.97),rgba(4,14,40,.97));border:1px solid rgba(125,249,255,.7);box-shadow:0 0 34px rgba(47,140,255,.5);animation:omIn .3s}
#omCred .bx b.n{display:block;font:900 30px 'Orbitron',system-ui;color:#7df9ff;text-shadow:0 0 14px #4cf;margin:6px 0}#omCred .bar{height:8px;border-radius:6px;background:#0b2350;overflow:hidden;margin:8px 0}#omCred .bar i{display:block;height:100%;background:linear-gradient(90deg,#2bd1ff,#7df9ff);transition:width .4s}
#omCred small{display:block;opacity:.7;font-size:11px;margin-top:4px}#omCred .omX{position:absolute;right:8px;top:8px;width:30px;height:30px;font-size:15px}
#omAns{position:fixed;left:50%;bottom:calc(92px + env(safe-area-inset-bottom,0px));transform:translate(-50%,20px);width:min(92vw,420px);max-height:38vh;overflow:auto;z-index:10020;padding:12px 14px;border-radius:16px;color:#eaf8ff;font:14px/1.5 system-ui;background:linear-gradient(160deg,rgba(10,44,110,.94),rgba(4,14,40,.94));border:1px solid rgba(125,249,255,.6);box-shadow:0 0 26px rgba(47,140,255,.45);opacity:0;pointer-events:none;transition:opacity .3s,transform .3s}
#omAns.show{opacity:1;transform:translate(-50%,0);pointer-events:auto}
/* tariflar */
#omTar{position:fixed;inset:0;z-index:10070;display:none;flex-direction:column;align-items:center;color:#eaf8ff;font-family:system-ui,sans-serif;overflow:hidden;background:#020816}#omTar.show{display:flex;animation:omIn .35s}
#omTar canvas{position:absolute;inset:0;width:100%;height:100%;transform:none!important}
#omTar .earth{position:absolute;left:50%;bottom:-78vw;width:150vw;height:150vw;max-width:1500px;max-height:1500px;border-radius:50%;transform:translateX(-50%);background:radial-gradient(circle at 50% 6%,#9fe6ff 0,#3a9bff 5%,#1356b8 16%,#0a3278 34%,#041a46 58%,#010714 82%);box-shadow:0 -14px 70px 10px rgba(70,170,255,.6),inset 0 24px 50px rgba(160,225,255,.4);overflow:hidden}
#omTar .earth::after{content:"";position:absolute;inset:0;background:repeating-radial-gradient(ellipse at 30% 10%,rgba(255,255,255,.1) 0 6px,transparent 7px 38px);animation:omSpin 160s linear infinite;opacity:.6}
#omTar.premium .earth{background:radial-gradient(circle at 50% 6%,#ffe9a8 0,#ffb64a 4%,#7a3fd0 14%,#3a1c86 34%,#150a42 58%,#050314 82%);box-shadow:0 -14px 80px 14px rgba(255,190,90,.55),0 -30px 120px 30px rgba(150,90,255,.4),inset 0 24px 50px rgba(255,230,170,.35)}
#omTar.premium::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 20% 15%,rgba(160,90,255,.35),transparent 55%),radial-gradient(ellipse at 85% 35%,rgba(255,170,60,.25),transparent 50%);animation:omAur 8s ease-in-out infinite alternate}
@keyframes omAur{to{opacity:.55;transform:scale(1.08)}}
#omTar .tbar{position:relative;z-index:2;width:100%;max-width:560px;display:flex;align-items:center;gap:8px;padding:calc(12px + env(safe-area-inset-top,0px)) 14px 6px}
#omTar .pills{flex:1;display:flex;gap:6px}#omTar .pills button{flex:1;padding:9px 4px;border-radius:12px;border:1px solid rgba(125,249,255,.5);background:rgba(4,24,64,.7);color:#cfe;font:800 11px 'Orbitron',system-ui;letter-spacing:.06em;cursor:pointer}
#omTar .pills button.on{background:#7df9ff;color:#012;box-shadow:0 0 14px #5cf}#omTar.premium .pills button.on{background:linear-gradient(110deg,#ffe08a,#ffb020);box-shadow:0 0 14px #fb4}
#omTar .tmain{position:relative;z-index:2;width:100%;max-width:520px;flex:1;overflow:auto;padding:4px 16px 0;text-align:center}
#omTar h2{margin:6px 0 0;font:900 26px 'Orbitron',system-ui;letter-spacing:.16em;background:linear-gradient(90deg,#7df9ff,#4db8ff);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 18px rgba(80,180,255,.5)}
#omTar.premium h2{background:linear-gradient(90deg,#fff1b8,#ffc13a,#ff9ae0);-webkit-background-clip:text;background-clip:text;color:transparent;animation:omShine 3s linear infinite;background-size:200% 100%}
@keyframes omShine{to{background-position:200% 0}}
#omTar .stage{position:relative;height:210px;margin:6px auto 0;width:min(100%,360px)}
.fig{position:absolute;left:50%;top:26px;width:120px;transform:translateX(-50%)}.fig .hd{width:58px;height:58px;margin:0 auto;border-radius:50%;background:linear-gradient(160deg,#cfefff,#6aa8e8);box-shadow:0 0 16px rgba(120,200,255,.6)}
.fig .bd{width:120px;height:58px;margin:4px auto 0;border-radius:60px 60px 8px 8px;background:linear-gradient(160deg,#9fd4ff,#3b78c8);box-shadow:0 0 16px rgba(80,160,255,.5)}
.fig .dot{position:absolute;width:6px;height:6px;border-radius:50%;background:#7df9ff;box-shadow:0 0 8px #7df9ff;opacity:0}.stage.p-scan .fig .dot{animation:omDot 2.4s forwards}
@keyframes omDot{0%{opacity:0;transform:scale(0)}30%{opacity:1;transform:scale(1.4)}100%{opacity:1;transform:scale(1)}}
.stage.p-mic .fig .dot,.stage.p-astro .fig .dot,.stage.p-mock .fig .dot{opacity:1}
.beam{position:absolute;left:50%;top:24px;width:150px;height:3px;margin-left:-75px;background:linear-gradient(90deg,transparent,#7df9ff,transparent);box-shadow:0 0 14px 3px #5cf;opacity:0}.stage.p-scan .beam{opacity:1;animation:omBeam 1.2s ease-in-out infinite alternate}
@keyframes omBeam{from{transform:translateY(0)}to{transform:translateY(118px)}}
.chk{position:absolute;left:50%;top:6px;margin-left:34px;width:26px;height:26px;border-radius:50%;background:#2ee6a0;color:#012;font-weight:900;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(0)}.stage.p-mic .chk,.stage.p-astro .chk,.stage.p-mock .chk{opacity:1;transform:none;transition:all .4s}
.micb{position:absolute;left:50%;bottom:6px;width:54px;height:54px;margin-left:-27px;border-radius:50%;background:linear-gradient(160deg,#7df9ff,#2f7bff);display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(0);box-shadow:0 0 20px #4cf}.micb svg{width:26px;height:26px;stroke:#012;fill:none;stroke-width:2}
.stage.p-mic .micb,.stage.p-astro .micb,.stage.p-mock .micb{opacity:1;transform:scale(1);transition:all .45s cubic-bezier(.3,1.6,.5,1)}
.micb::before,.micb::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #7df9ff;opacity:0}.stage.p-mic .micb::before{animation:omRip 1.4s infinite}.stage.p-mic .micb::after{animation:omRip 1.4s .5s infinite}
@keyframes omRip{from{opacity:.9;transform:scale(1)}to{opacity:0;transform:scale(2.3)}}
.orb{position:absolute;left:50%;top:78px;width:0;height:0;opacity:0}.stage.p-astro .orb{opacity:1}.orb i{position:absolute;display:block;border-radius:50%;animation:omOrb 4s linear infinite}
.orb i:nth-child(1){width:16px;height:16px;left:-8px;top:-8px;background:radial-gradient(circle at 35% 35%,#ffe9a8,#ff9f2e);--r:96px}.orb i:nth-child(2){width:11px;height:11px;left:-5px;top:-5px;background:radial-gradient(circle at 35% 35%,#bff,#3a8dff);--r:78px;animation-duration:2.8s}.orb i:nth-child(3){width:8px;height:8px;left:-4px;top:-4px;background:#fff;--r:112px;animation-duration:5.5s;box-shadow:0 0 8px #fff}
@keyframes omOrb{from{transform:rotate(0) translateX(var(--r)) rotate(0)}to{transform:rotate(360deg) translateX(var(--r)) rotate(-360deg)}}
.sheet{position:absolute;right:2px;top:34px;width:84px;padding:8px;border-radius:10px;background:#eaf6ff;color:#06224a;font:700 9px system-ui;text-align:left;opacity:0;transform:translateX(40px) rotate(6deg)}.stage.p-mock .sheet{opacity:1;transform:rotate(-4deg);transition:all .5s}
.sheet i{display:block;height:5px;margin:4px 0;border-radius:3px;background:#9bc0ea}.sheet u{display:inline-block;width:12px;height:12px;margin:2px 2px 0 0;border-radius:50%;border:1.5px solid #2f6fd0;text-decoration:none}.sheet u.g{background:#2ee6a0;border-color:#2ee6a0}
#omTar .cap{min-height:22px;margin-top:2px;font:700 14px system-ui;color:#bff4ff;text-shadow:0 0 10px #4cf}
#omTar ul{list-style:none;margin:10px auto 0;padding:0;max-width:420px;text-align:left}#omTar li{position:relative;margin:7px 0;padding:9px 12px 9px 34px;border-radius:12px;border:1px solid rgba(125,249,255,.25);background:rgba(2,14,40,.62);font-size:13.5px;opacity:0;transform:translateY(10px);animation:omLi .5s forwards}
#omTar li::before{content:"✓";position:absolute;left:11px;top:8px;color:#2ee6a0;font-weight:900}#omTar.premium li::before{color:#ffc13a}
@keyframes omLi{to{opacity:1;transform:none}}
#omTar .go{position:relative;z-index:3;margin:12px auto 0;display:block;padding:13px 22px;min-width:220px;border:0;border-radius:16px;font:800 15px system-ui;cursor:pointer;color:#012;background:linear-gradient(110deg,#7df9ff,#2f7bff);box-shadow:0 0 22px rgba(60,160,255,.6);animation:omPulse 2s infinite}
#omTar.premium .go{background:linear-gradient(110deg,#ffe08a,#ffa21a);box-shadow:0 0 24px rgba(255,170,40,.6)}#omTar .go[disabled]{opacity:.6;animation:none;cursor:default;background:#2a4a7a;color:#cfe;box-shadow:none}
@keyframes omPulse{50%{transform:scale(1.04)}}
.om-perf *{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}.om-perf #omPanel::before{animation:none}
@media (max-height:640px){#omTar .stage{height:170px;transform:scale(.85);transform-origin:top center}}
`;
  document.head.appendChild(css);

  /* ---------------- DOM ---------------- */
  const burger = document.createElement('button'); burger.id = 'omBurger'; burger.setAttribute('aria-label', 'Menu'); burger.innerHTML = '<i></i><i></i><i></i>'; burger.className = 'keep';
  const shade = document.createElement('div'); shade.id = 'omShade';
  const panel = document.createElement('aside'); panel.id = 'omPanel'; panel.setAttribute('data-keep-uz', 'true');
  const cred = document.createElement('div'); cred.id = 'omCred'; cred.setAttribute('data-keep-uz', 'true');
  const tar = document.createElement('div'); tar.id = 'omTar'; tar.setAttribute('data-keep-uz', 'true');
  const ans = document.createElement('div'); ans.id = 'omAns'; ans.setAttribute('data-keep-uz', 'true');
  [burger, shade, panel, cred, tar, ans].forEach(e => document.body.appendChild(e));

  const open = o => { document.body.classList.toggle('om-open', o); if (o) refresh(); };
  burger.onclick = () => open(!document.body.classList.contains('om-open'));
  shade.onclick = () => open(false);

  /* ---------------- panel ---------------- */
  let setOpen = false;
  const user = () => (window.orvinAuth && orvinAuth.user) || null;
  const PANELS = { msMock: ['📝', { uz: 'Matematika MOCK', ru: 'Математика MOCK', en: 'Math MOCK' }], msPMock: ['📝', { uz: 'Fizika MOCK', ru: 'Физика MOCK', en: 'Physics MOCK' }], msCMock: ['📝', { uz: 'Kimyo MOCK', ru: 'Химия MOCK', en: 'Chemistry MOCK' }], msMath: ['📐', { uz: 'Matematika', ru: 'Математика', en: 'Mathematics' }], msPhys: ['⚛️', { uz: 'Fizika', ru: 'Физика', en: 'Physics' }], msChem: ['🧪', { uz: 'Kimyo', ru: 'Химия', en: 'Chemistry' }], oquv: ['📚', { uz: 'O‘quv', ru: 'Обучение', en: 'Learning' }], oHome: ['📚', { uz: 'O‘quv bo‘limlari', ru: 'Разделы обучения', en: 'Learning sections' }], globe: ['🌍', { uz: '3D globus', ru: '3D глобус', en: '3D globe' }], expeditionNew: ['🚀', { uz: 'Raketa ekspeditsiyasi', ru: 'Ракетная экспедиция', en: 'Rocket expedition' }], sciHub: ['🔬', { uz: 'Fan markazi', ru: 'Научный центр', en: 'Science hub' }], certList: ['🏅', { uz: 'Sertifikatlar', ru: 'Сертификаты', en: 'Certificates' }] };
  const RESTORE = {
    msMock: () => { call('openMath'); setTimeout(() => window.MSMock && MSMock.open({ resume: true }), 450); },
    msPMock: () => { call('openPhysics'); setTimeout(() => window.PhysMock && PhysMock.open({ resume: true }), 450); },
    msCMock: () => { call('openChemistry'); setTimeout(() => window.ChemMock && ChemMock.open({ resume: true }), 450); },
    msMath: () => call('openMath'), msPhys: () => call('openPhysics'), msChem: () => call('openChemistry'), oquv: () => call('openOquv'), oHome: () => call('openOquv'),
    globe: () => { try { window.handle && window.handle('globe'); } catch (_) { } }, expeditionNew: () => call('openExpedition'), sciHub: () => call('openScience'), certList: () => window.toggleProfile && window.toggleProfile()
  };
  function call(n) { try { window[n] && window[n](); } catch (e) { console.warn(e); } }
  function ago(ts) { const m = Math.max(0, (Date.now() - ts) / 60000 | 0); if (m < 1) return t('nowl'); if (m < 60) return m + ' min ' + t('ago'); const h = m / 60 | 0; if (h < 24) return h + ' h ' + t('ago'); return (h / 24 | 0) + ' d ' + t('ago'); }
  function render() {
    const u = user(), nm = u ? (u.displayName || u.email || '') : t('guest'), init = (nm[0] || 'G').toUpperCase();
    const av = u && u.photoURL ? '<img src="' + esc(u.photoURL) + '" alt="" referrerpolicy="no-referrer">' : (u ? esc(init) : '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="8.2" r="3.9"/><path d="M4.2 20.4c.9-4 4-6 7.8-6s6.9 2 7.8 6"/></svg>');
    const L = lang(), H = loadHist();
    panel.innerHTML = '<div class="omTop"><b>ORVIN · ' + esc(T[L].pl[TIER].split(' ')[0]) + '</b><button class="omX" data-a="x" aria-label="' + t('close') + '">✕</button></div>'
      + '<div class="omProf"><button class="omAv" data-a="prof" aria-label="' + t('profile') + '">' + av + '</button><div class="omAcc"><b>' + esc(nm) + '</b><span>' + esc(u ? (u.email || '') : t('guestSub')) + '</span><button data-a="' + (u ? 'out' : 'in') + '">' + (u ? t('signout') : t('signin')) + '</button></div></div>'
      + '<div class="omNav"><button class="omItem" data-a="set"><span>⚙️ ' + t('settings') + '</span><span>' + (setOpen ? '▾' : '▸') + '</span></button>'
      + '<div id="omSet" class="' + (setOpen ? 'open' : '') + '"><h5>' + t('language') + '</h5><div class="omLang">' + ['uz', 'ru', 'en'].map(l => '<button data-l="' + l + '" class="' + (l === L ? 'on' : '') + '">' + l.toUpperCase() + '</button>').join('') + '</div>'
      + '<h5>' + t('credits') + '</h5><button class="omRow" data-a="cred"><span>💳 ' + t('credits') + '</span><span>›</span></button>'
      + '<h5>' + t('settings') + '</h5><button class="omRow" data-a="perf"><span>⚡ ' + t('perf') + '<small>' + t('perfSub') + '</small></span><i class="omSw ' + (perfOn() ? 'on' : '') + '"></i></button>'
      + '<button class="omRow" data-a="clr"><span>🗑 ' + t('clearH') + '</span></button><button class="omRow" data-a="help"><span>💬 ' + t('support') + '</span></button></div>'
      + '<button class="omItem" data-a="tar"><span>💎 ' + t('tariffs') + '</span><em>' + esc(T[L].pl[TIER]) + '</em></button></div>'
      + '<div class="omHT">🕘 ' + t('history').toUpperCase() + '</div><div class="omHist">'
      + (H.length ? H.map(h => { const p = PANELS[h.k] || ['•', { uz: h.k, ru: h.k, en: h.k }]; return '<div class="omH" data-h="' + esc(h.k) + '"><span class="ic">' + p[0] + '</span><span class="tx"><b>' + esc(p[1][L]) + '</b><small>' + ago(h.t) + '</small></span><button class="dl" data-d="' + esc(h.k) + '" aria-label="delete">✕</button></div>'; }).join('') : '<div class="omNone">' + t('noH') + '</div>') + '</div>';
  }
  const perfOn = () => document.documentElement.classList.contains('om-perf');
  function refresh() { render(); }
  panel.addEventListener('click', e => {
    const b = e.target.closest('[data-a],[data-l],[data-h],[data-d]'); if (!b) return;
    if (b.dataset.d) { e.stopPropagation(); delHist(b.dataset.d); return render(); }
    if (b.dataset.l) { try { window.OrvinLang ? OrvinLang.set(b.dataset.l) : localStorage.setItem('orvin_lang', b.dataset.l); } catch (_) { } setTimeout(render, 80); return; }
    if (b.dataset.h) { open(false); const f = RESTORE[b.dataset.h]; setTimeout(() => f && f(), 350); return; }
    const a = b.dataset.a;
    if (a === 'x') open(false);
    else if (a === 'prof') { open(false); setTimeout(() => window.toggleProfile && window.toggleProfile(), 300); }
    else if (a === 'in') window.orvinAuth && orvinAuth.signIn();
    else if (a === 'out') window.orvinAuth && orvinAuth.signOut();
    else if (a === 'set') { setOpen = !setOpen; render(); }
    else if (a === 'cred') showCred();
    else if (a === 'perf') { setPerf(!perfOn()); render(); }
    else if (a === 'clr') { saveHist([]); remoteClear(); render(); }
    else if (a === 'help') window.open('https://t.me/orvin_startup', '_blank', 'noopener');
    else if (a === 'tar') { open(false); setTimeout(() => showTar(TIER === 'lite' ? 'pro' : TIER), 250); }
  });
  window.addEventListener('orvin-lang', () => { render(); if (tar.classList.contains('show')) drawTar(); });

  /* ---------------- yengil rejim ---------------- */
  function setPerf(v) { document.documentElement.classList.toggle('om-perf', v); try { localStorage.setItem('orvin_perf', v ? '1' : '0'); } catch (_) { } }
  (function () { let p = null; try { p = localStorage.getItem('orvin_perf'); } catch (_) { } const weak = (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 3); setPerf(p === null ? !!weak : p === '1'); })();

  /* ---------------- kreditlar ---------------- */
  const fmt = n => String(Math.max(0, Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  function showCred() {
    const P = window.orvinPro, lim = P ? P.limit : (TIER === 'lite' ? 10000 : 1000000), left = P ? P.left() : lim;
    cred.innerHTML = '<div class="bx"><button class="omX" data-x="1">✕</button><div style="font:800 11px Orbitron,system-ui;letter-spacing:.14em;color:#7df9ff">' + esc(T[lang()].pl[TIER]) + '</div><small>' + t('left') + '</small><b class="n">' + (isFinite(lim) ? fmt(left) : '∞') + '</b><div class="bar"><i style="width:' + (isFinite(lim) ? Math.round(100 * left / lim) : 100) + '%"></i></div><small>' + t('daily') + ': ' + fmt(lim) + '</small><small>' + t('resets') + '</small></div>';
    cred.classList.add('show');
  }
  cred.addEventListener('click', e => { if (e.target === cred || e.target.dataset.x) cred.classList.remove('show'); });

  /* ---------------- tarif oynasi ---------------- */
  let curPlan = 'pro', phTimer = 0, raf = 0, stars = [];
  function startStars() {
    const c = tar.querySelector('canvas'); if (!c) return; const x = c.getContext('2d'), W = c.width = innerWidth, H = c.height = innerHeight, N = perfOn() ? 70 : 140, prem = curPlan === 'premium';
    stars = Array.from({ length: N }, () => ({ x: Math.random() * W, y: Math.random() * H, z: Math.random() * 1.6 + .3, t: Math.random() * 6 }));
    cancelAnimationFrame(raf); const col = prem ? ['#fff3c4', '#ffd98a', '#e6c9ff', '#ffffff'] : ['#cfe8ff', '#ffffff', '#9fd0ff', '#bfe9ff'];
    (function f() { if (!tar.classList.contains('show')) return; x.clearRect(0, 0, W, H); for (const s of stars) { s.y += s.z * .9; s.t += .03; if (s.y > H) { s.y = -4; s.x = Math.random() * W; } x.globalAlpha = .35 + .65 * Math.abs(Math.sin(s.t)); x.fillStyle = col[(s.z * 3 | 0) % 4]; x.beginPath(); x.arc(s.x, s.y, s.z, 0, 6.3); x.fill(); if (s.z > 1.5) { x.globalAlpha *= .35; x.fillRect(s.x - .5, s.y - 9, 1, 9); } } raf = requestAnimationFrame(f); })();
  }
  function showTar(p) { curPlan = p; tar.classList.add('show'); drawTar(); }
  const MIC = '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
  function drawTar() {
    const L = lang(), p = curPlan, F = T[L].f[p];
    tar.className = 'show ' + p;
    const dots = [[34, 18], [54, 16], [44, 30], [30, 34], [60, 34], [44, 44], [38, 24], [52, 24]].map(d => '<i class="dot" style="left:' + (d[0] + 20) + 'px;top:' + d[1] + 'px;animation-delay:' + (Math.random() * 1.4).toFixed(2) + 's"></i>').join('');
    const cur = p === TIER || (p === 'lite' && TIER === 'lite');
    tar.innerHTML = '<canvas></canvas><div class="earth"></div><div class="tbar"><div class="pills">' + ['lite', 'pro', 'premium'].map(k => '<button data-p="' + k + '" class="' + (k === p ? 'on' : '') + '">' + esc(T[L].pl[k]) + '</button>').join('') + '</div><button class="omX" data-x="1" aria-label="close">✕</button></div>'
      + '<div class="tmain"><h2>' + (p === 'premium' ? 'PREMIUM' : p === 'pro' ? 'PRO' : 'LITE') + '</h2>'
      + '<div class="stage p-scan" id="omStage"><div class="fig"><div class="hd"></div><div class="bd"></div>' + dots + '</div><div class="beam"></div><div class="chk">✓</div><div class="micb">' + MIC + '</div><div class="orb"><i></i><i></i><i></i></div>' + (p === 'premium' ? '<div class="sheet"><b>MOCK</b><i></i><i></i><u class="g"></u><u></u><u></u><u></u></div>' : '') + '</div>'
      + '<div class="cap" id="omCap"></div><ul>' + F.map((x, i) => '<li style="animation-delay:' + (i * .12 + .1) + 's">' + esc(x) + '</li>').join('') + '</ul>'
      + '<button class="go" data-go="' + p + '" ' + (cur ? 'disabled' : '') + '>' + esc(cur ? t('current') : p === 'lite' ? t('free') : (p === 'pro' ? t('upPro') : t('upPrem')) + ' · ' + fmt(PRICES[p])) + '</button><div style="height:34vw;min-height:110px"></div></div>';
    startStars(); phases(p);
  }
  function phases(p) {
    clearInterval(phTimer); const st = $('omStage'), cap = $('omCap'); if (!st) return;
    const seq = p === 'premium' ? ['scan', 'mic', 'astro', 'mock'] : p === 'pro' ? ['scan', 'mic', 'astro'] : ['mic'];
    const names = { scan: 0, mic: 1, astro: 2, mock: 3 }; let i = 0;
    const step = () => { const k = seq[i % seq.length]; if (i % seq.length === 0) st.className = 'stage'; if (k !== 'scan') st.classList.remove('p-scan'); st.classList.add('p-' + k); cap.textContent = k === 'astro' ? T[lang()].pv.astro : k === 'mock' ? T[lang()].pv.mock : T[lang()].ph[names[k]]; i++; };
    step(); phTimer = setInterval(() => { if (!tar.classList.contains('show')) return clearInterval(phTimer); step(); }, 2600);
  }
  tar.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.x) { tar.classList.remove('show'); cancelAnimationFrame(raf); clearInterval(phTimer); }
    else if (b.dataset.p) { curPlan = b.dataset.p; drawTar(); }
    else if (b.dataset.go && !b.disabled) startPayment(b.dataset.go);
  });

  /* ---------------- TO'LOV: Click (oylik obuna) ---------------- */
  const PRICES = Object.assign({ pro: 29000, premium: 49000 }, window.ORVIN_PRICES || {});   // so'm / oy — kerak bo'lsa shu yerda o'zgartiring
  const PAY = Object.assign({ phone: '+998 50 998 46 22', card: '8800 8112 6455 4685', name: 'Sharipov Solihbek', tg: 'https://t.me/orvin_startup', bot: 'orvin_payments_bot', clickUrl: 'https://click.uz' }, window.ORVIN_CLICK || {});
  const PT = {
    uz: { per: 'so‘m / oy', st: ['1. Click’da to‘lang', '2. Chekni botga yuboring', '3. Tasdiqlanishini kuting'],
      a1: 'Click ilovasini oching → «Pul o‘tkazish» → quyidagi hamyonga to‘lang:', card: 'Click hamyon', ph: 'Telefon', nm: 'Qabul qiluvchi', amt: 'Summa', openClick: 'Click’ni ochish', paid: 'To‘lov qildim →',
      a2: 'To‘lov chekining skrinshotini ORVIN to‘lov botiga yuboring. Tugmani bossangiz bot ochiladi — «Start» ni bosing va chek rasmini tashlang.', needLogin: 'Avval Google bilan kiring (obuna hisobingizga yoqiladi).', signin: 'Google bilan kirish', bot: 'Telegram botga o‘tish →', back: '← Orqaga',
      a3: 'Chekingiz adminga yuborildi. Tasdiqlangach tarif o‘zi yoqiladi — odatda bir necha daqiqa. Tasdiqlanganini bot ham yozadi.', check: 'Tasdiqlandimi? Tekshirish', close: 'Yopish', copy: 'Nusxa', copied: 'Nusxalandi ✓', note: 'Obuna 30 kunga yoqiladi, har oy yangilanadi.', cert: '🏅 Sertifikatlar (PNG/PDF) faqat Premium tarifda beriladi.', certNo: '🏅 Sertifikatlar Pro tarifga kirmaydi — ular faqat Premium tarifda.' },
    ru: { per: 'сум / мес', st: ['1. Оплатите в Click', '2. Отправьте чек боту', '3. Дождитесь подтверждения'],
      a1: 'Откройте Click → «Перевод» → оплатите на кошелёк:', card: 'Кошелёк Click', ph: 'Телефон', nm: 'Получатель', amt: 'Сумма', openClick: 'Открыть Click', paid: 'Я оплатил →',
      a2: 'Отправьте скриншот чека в платёжный бот ORVIN. Нажмите кнопку — откроется бот: нажмите «Start» и отправьте фото чека.', needLogin: 'Сначала войдите через Google (подписка включится на ваш аккаунт).', signin: 'Войти через Google', bot: 'Перейти в Telegram-бот →', back: '← Назад',
      a3: 'Чек отправлен администратору. После подтверждения тариф включится сам — обычно за несколько минут. Бот тоже напишет вам.', check: 'Подтвердили? Проверить', close: 'Закрыть', copy: 'Копировать', copied: 'Скопировано ✓', note: 'Подписка включается на 30 дней и продлевается каждый месяц.', cert: '🏅 Сертификаты (PNG/PDF) выдаются только в тарифе Premium.', certNo: '🏅 Сертификаты не входят в Pro — только в Premium.' },
    en: { per: 'UZS / month', st: ['1. Pay in Click', '2. Send the receipt to the bot', '3. Wait for confirmation'],
      a1: 'Open Click → “Transfer” → pay to this wallet:', card: 'Click wallet', ph: 'Phone', nm: 'Recipient', amt: 'Amount', openClick: 'Open Click', paid: 'I paid →',
      a2: 'Send a screenshot of the receipt to the ORVIN payments bot. Tap the button, press “Start” in the bot and send the receipt photo.', needLogin: 'Sign in with Google first (the plan is activated on your account).', signin: 'Sign in with Google', bot: 'Go to Telegram bot →', back: '← Back',
      a3: 'Your receipt went to the admin. Once approved the plan turns on automatically — usually within minutes. The bot will message you too.', check: 'Approved? Check now', close: 'Close', copy: 'Copy', copied: 'Copied ✓', note: 'The subscription is activated for 30 days and renews monthly.', cert: '🏅 Certificates (PNG/PDF) are issued only on the Premium plan.', certNo: '🏅 Certificates are not part of Pro — they are Premium only.' }
  };
  const payEl = document.createElement('div'); payEl.id = 'omPay'; payEl.setAttribute('data-keep-uz', 'true'); document.body.appendChild(payEl);
  const payCss = document.createElement('style');
  payCss.textContent = '#omPay{position:fixed;inset:0;z-index:10080;display:none;align-items:center;justify-content:center;padding:14px;background:rgba(0,4,16,.82);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);font-family:system-ui,sans-serif}#omPay.show{display:flex}#omPay .bx{position:relative;width:min(94vw,400px);max-height:92vh;overflow:auto;padding:20px 18px;border-radius:20px;color:#eaf8ff;background:linear-gradient(160deg,rgba(10,30,72,.98),rgba(4,10,28,.98));border:1px solid rgba(255,200,90,.55);box-shadow:0 0 40px rgba(255,170,40,.28)}#omPay h3{margin:0 0 2px;font:900 20px Orbitron,system-ui;letter-spacing:.08em;color:#ffd76a}#omPay .pr{font:800 22px system-ui;color:#fff;margin:2px 0 10px}#omPay p{margin:8px 0;font-size:13px;color:#cfe3ff;line-height:1.45}#omPay .row{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:6px 0;padding:9px 11px;border-radius:12px;background:rgba(255,255,255,.07);border:1px solid rgba(125,249,255,.25);font-size:13px}#omPay .row b{font:700 14px ui-monospace,monospace;color:#fff;word-break:break-all}#omPay .row small{display:block;font-size:10px;color:#8fb2d6}#omPay .row button{flex:none;padding:7px 10px;border:0;border-radius:10px;background:#2f7bff;color:#fff;font:700 12px system-ui;cursor:pointer}#omPay .go2{display:block;width:100%;margin-top:12px;padding:13px;border:0;border-radius:14px;font:800 14px system-ui;cursor:pointer;color:#2b1a00;background:linear-gradient(110deg,#ffe08a,#ffa21a)}#omPay .x2{position:absolute;right:10px;top:8px;width:30px;height:30px;border:0;border-radius:50%;background:rgba(255,255,255,.1);color:#fff;font-size:15px;cursor:pointer}#omPay .nt{font-size:11px;color:#9bb8d8}#omPay .stp{display:flex;gap:5px;margin:2px 0 12px}#omPay .stp i{flex:1;height:4px;border-radius:3px;background:rgba(255,255,255,.15)}#omPay .stp i.on{background:linear-gradient(90deg,#ffe08a,#ffa21a)}#omPay .sh{margin:0 0 6px;font:800 14px system-ui;color:#ffd76a}#omPay .go3{display:block;width:100%;margin-top:9px;padding:12px;border:1px solid rgba(160,200,255,.4);border-radius:14px;background:rgba(255,255,255,.07);color:#cfe3ff;font:700 13px system-ui;cursor:pointer}';
  document.head.appendChild(payCss);
  function money(n) { return fmt(n); }
  function receipt(plan) { const u = user(); return 'ORVIN ' + plan.toUpperCase() + ' — ' + money(PRICES[plan]) + " so'm/oy. Email: " + (u ? (u.email || '-') : '-') + '. UID: ' + (u ? u.uid : '-'); }
  let payStep = 1;
  function pay(plan, step) {
    plan = plan === 'premium' ? 'premium' : 'pro'; payStep = step || 1; const L = lang(), p = PT[L], u = user();
    const row = (lbl, val, raw) => '<div class="row"><span><small>' + lbl + '</small><b>' + esc(val) + '</b></span>' + (raw ? '<button data-c="' + esc(raw) + '">' + p.copy + '</button>' : '') + '</div>';
    const dots = '<div class="stp">' + [1, 2, 3].map(n => '<i class="' + (n <= payStep ? 'on' : '') + '"></i>').join('') + '</div>';
    let body;
    if (payStep === 1) {
      body = '<div class="sh">' + p.st[0] + '</div><p>' + p.a1 + '</p>'
        + row(p.card, PAY.card, PAY.card.replace(/\s/g, '')) + row(p.ph, PAY.phone, PAY.phone.replace(/\s/g, '')) + row(p.nm, PAY.name) + row(p.amt, money(PRICES[plan]) + " so'm", String(PRICES[plan]))
        + '<button class="go2" data-o="1">' + p.openClick + '</button><button class="go3" data-n="2">' + p.paid + '</button>';
    } else if (payStep === 2) {
      body = '<div class="sh">' + p.st[1] + '</div><p>' + p.a2 + '</p>'
        + (u ? row('UID', u.uid, u.uid) : '')
        + (u ? '<button class="go2" data-b="1">' + p.bot + '</button>' : '<p style="color:#ffd5da">' + p.needLogin + '</p><button class="go2" data-s="1">' + p.signin + '</button>')
        + '<button class="go3" data-n="3">' + (L === 'ru' ? 'Я отправил чек →' : L === 'en' ? 'I sent the receipt →' : 'Chekni yubordim →') + '</button><button class="go3" data-n="1">' + p.back + '</button>';
    } else {
      body = '<div class="sh">' + p.st[2] + '</div><p>' + p.a3 + '</p><button class="go2" data-r="1">' + p.check + '</button><button class="go3" data-x="1">' + p.close + '</button>';
    }
    payEl.innerHTML = '<div class="bx"><button class="x2" data-x="1">✕</button><h3>ORVIN ' + plan.toUpperCase() + '</h3><div class="pr">' + money(PRICES[plan]) + ' ' + p.per + '</div>' + dots + body + '<p class="nt" style="color:#ffe9a8;font-weight:700">' + (plan === 'premium' ? p.cert : p.certNo) + '</p><p class="nt">' + p.note + '</p></div>';
    payEl.classList.add('show');
    payEl.onclick = e => {
      const b = e.target.closest('button');
      if (e.target === payEl || (b && b.dataset.x)) { payEl.classList.remove('show'); return; }
      if (!b) return;
      if (b.dataset.c) { const v = b.dataset.c; try { navigator.clipboard.writeText(v); } catch (_) { } const o = b.textContent; b.textContent = p.copied; setTimeout(() => { b.textContent = o; }, 1400); }
      else if (b.dataset.o) { try { navigator.clipboard.writeText(PAY.card.replace(/\s/g, '')); } catch (_) { } window.open(PAY.clickUrl, '_blank', 'noopener'); }
      else if (b.dataset.n) pay(plan, +b.dataset.n);
      else if (b.dataset.s) { try { window.orvinAuth && orvinAuth.signIn(); } catch (_) { } let k = 0; const iv = setInterval(() => { k++; if (user()) { clearInterval(iv); if (payEl.classList.contains('show')) pay(plan, 2); } else if (k > 75) clearInterval(iv); }, 800); }
      else if (b.dataset.b) { const uu = user(); if (uu) window.open('https://t.me/' + PAY.bot + '?start=' + plan + '_' + uu.uid, '_blank', 'noopener'); }
      else if (b.dataset.r) location.reload();
    };
  }
  /* Obuna tugmasi bosilganda tarif oynasi yopiladi, to'lov ma'lumotlari oynasi esa ustida ochiladi */
  function closeTar() { tar.classList.remove('show'); cancelAnimationFrame(raf); clearInterval(phTimer); }
  function startPayment(plan) { if (plan === 'lite') { location.href = URLS.lite; return; } closeTar(); if (typeof window.ORVIN_PAY === 'function') return window.ORVIN_PAY(plan); pay(plan); }
  window.addEventListener('keydown', e => { if (e.key === 'Escape') { open(false); tar.classList.remove('show'); cred.classList.remove('show'); } });

  /* ---------------- tarix (Firestore + localStorage) ---------------- */
  const HK = 'orvin_hist_v2'; let synced = null;
  const loadHist = () => { try { return (JSON.parse(localStorage.getItem(HK)) || []).sort((a, b) => b.t - a.t).slice(0, 40); } catch (_) { return []; } };
  const saveHist = a => { try { localStorage.setItem(HK, JSON.stringify(a.slice(0, 40))); } catch (_) { } };
  const fdb = () => { try { return firebase.firestore(); } catch (_) { return null; } };
  const hcol = () => { const u = user(), db = fdb(); return u && db ? db.collection('users').doc(u.uid).collection('history') : null; };
  function addHist(k) { const a = loadHist().filter(x => x.k !== k); a.unshift({ k, t: Date.now() }); saveHist(a); const c = hcol(); if (c) c.doc(k).set({ k, t: Date.now() }).catch(() => { }); if (document.body.classList.contains('om-open')) render(); }
  function delHist(k) { saveHist(loadHist().filter(x => x.k !== k)); const c = hcol(); if (c) c.doc(k).delete().catch(() => { }); }
  function remoteClear() { const c = hcol(); if (c) c.get().then(s => s.forEach(d => d.ref.delete())).catch(() => { }); }
  async function syncHist() {
    const c = hcol(); if (!c) return; try {
      const s = await c.get(), m = {}; loadHist().forEach(x => m[x.k] = x.t); s.forEach(d => { const v = d.data(); if (v && v.k && (!m[v.k] || v.t > m[v.k])) m[v.k] = v.t; });
      const arr = Object.keys(m).map(k => ({ k, t: m[k] })).sort((a, b) => b.t - a.t).slice(0, 40); saveHist(arr); arr.forEach(x => c.doc(x.k).set(x).catch(() => { })); if (document.body.classList.contains('om-open')) render();
    } catch (e) { console.warn('history sync', e); }
  }
  /* ochilgan joylarni kuzatish */
  let seen = {};
  setInterval(() => {
    const vis = {}; Object.keys(PANELS).forEach(id => { const el = $(id); if (el && el.classList.contains('show')) vis[id] = 1; });
    if (vis.msMock || vis.msPMock || vis.msCMock) { delete vis.msMath; delete vis.msPhys; delete vis.msChem; }
    if (vis.oquv || vis.msMath || vis.msPhys || vis.msChem) delete vis.oHome;
    Object.keys(vis).forEach(id => { if (!seen[id]) addHist(id); });
    seen = vis;
    const u = user(), key = u ? u.uid : 'guest'; if (key !== synced) { synced = key; if (u) syncHist(); if (document.body.classList.contains('om-open')) render(); }
  }, 1200);

  /* ---------------- astronomiya (Pro/Premium) ---------------- */
  function hideAns() { ans.classList.remove('show'); }
  function speakIn(text, L) {
    try {
      const ss = window.speechSynthesis; if (!ss) return; ss.cancel();
      const u = new SpeechSynthesisUtterance(String(text).replace(/<[^>]*>/g, '')), vs = ss.getVoices() || [], pre = L + '-';
      const all = vs.filter(x => String(x.lang || '').toLowerCase().replace('_', '-').startsWith(pre));
      const fem = /female|woman|samantha|victoria|karen|moira|tessa|susan|zira|hazel|aria|jenny|sara|laura|lucy|libby|sonia|natasha|eva|ava|serena|svetlana|irina|milena|katya/i;
      const v = all.find(x => !fem.test(x.name)) || all[0];
      u.lang = v ? v.lang : ({ uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' })[L] || 'en-US'; if (v) u.voice = v; ss.speak(u);
    } catch (e) { console.warn('speak', e); }
  }
  window.addEventListener('orvin-astro', e => {
    const d = e.detail; ans.innerHTML = '<b style="color:#7df9ff">🔭 ' + esc(d.key.toUpperCase()) + '</b><br>' + esc(d.text); ans.classList.add('show'); clearTimeout(ans._t); ans._t = setTimeout(hideAns, Math.min(30000, 6000 + d.text.length * 70));
    speakIn(d.text, d.lang);
  });
  ans.onclick = hideAns;
  (function hook() {
    let n = 0; const iv = setInterval(() => {
      n++; const o = window.handle; if (!o || o._astro) { if (n > 200) clearInterval(iv); return; }
      if (!o._pro && n < 80) return;
      const w = function (raw) { try { const t0 = String(raw || ''); if (window.OrvinAstro && OrvinAstro.find(t0)) { if (window.orvinPro && orvinPro.charge) orvinPro.charge(t0); OrvinAstro.answer(t0); return; } } catch (_) { } return o.apply(this, arguments); };
      Object.keys(o).forEach(k => { w[k] = o[k]; }); w._astro = true; window.handle = w; clearInterval(iv);
    }, 400);
  })();

  /* mikrofon: bir nechta variantdan eng ishonchlisini va ORVIN buyrug'iga mosini tanlash */
  window.__bestAlt = function (e) {
    const r = e.results[0]; let best = r[0], sc = -1;
    const CMD = /^\s*(open|show|ochish|och|открой|покажи)?\s*(learning|learn|o.?quv|oquv|обучение|учёба|учеба|math(ematics)?|matematika|математика|physics|fizika|физика|chemistry|kimyo|химия|globe|globus|rocket|raketa|profile|profil|settings|sozlamalar|credits?|kredit\w*)\s*[.!?]*\s*$/i;
    for (let i = 0; i < r.length; i++) { const a = r[i], tx = String(a.transcript || '').trim(); let s = (a.confidence || 0) - i * 0.01; if (CMD.test(tx)) s += 0.6; try { if (window.OrvinAstro && OrvinAstro.find(tx)) s += 0.4; } catch (_) { } if (s > sc) { sc = s; best = a; } }
    return String(best.transcript || '').replace(/\s+/g, ' ').trim();
  };
  window.OrvinMenu = { open, showTar, showCred, addHist, pay, tier: TIER };
})();
