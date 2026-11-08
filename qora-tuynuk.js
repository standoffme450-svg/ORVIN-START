/* ORVIN — Black Holes section
   • Black holes are arranged from smallest to largest, left to right.
   • The meteor button sends a rock or iron meteor in from below.
   • Pinch or tap a meteor, drag it into a black hole, then release it.
   • Select a black hole to enlarge it and hear ORVIN explain it.
   • Tap empty space to return to the default view.
   Note: sizes use a logarithmic scale because the actual range is enormous. */
(function () {
  'use strict';
  if (window.__bhLoaded) return;
  window.__bhLoaded = true;

  /* ---------- Data, ordered by mass ---------- */
  const HOLES = [
    { id: 'cyg', n: 'Cygnus X-1', m: 21, mt: '≈ 21 solar masses', mtUz: '≈ 21 Quyosh massasi', col: '#ffb070',
      info: 'A stellar-mass black hole in the constellation Cygnus. It formed after a star collapsed and now pulls gas from a companion star, emitting X-rays.', uz: 'Oqqush yulduz turkumidagi yulduz massali qora tuynuk. Yulduz halok bo‘lgach hosil bo‘lgan; qo‘shni yulduzdan gaz tortib, rentgen nur chiqaradi.' },
    { id: 'sgr', n: 'Sagittarius A*', m: 4.3e6, mt: '≈ 4.3 million solar masses', mtUz: '≈ 4,3 million Quyosh massasi', col: '#ffd27a',
      info: 'A supermassive black hole at the center of our Milky Way galaxy. The Event Horizon Telescope captured its image in 2022.', uz: 'Bizning Somon Yo‘li galaktikasi markazidagi o‘ta massiv qora tuynuk. Uning rasmini 2022-yilda Event Horizon Telescope olgan.' },
    { id: 'm87', n: 'M87*', m: 6.5e9, mt: '≈ 6.5 billion solar masses', mtUz: '≈ 6,5 milliard Quyosh massasi', col: '#ff9a5c',
      info: 'At the center of the M87 galaxy, this was the first black hole ever photographed, in 2019. It launches a powerful jet of light and particles.', uz: 'M87 galaktikasi markazida. Inson suratga olgan birinchi qora tuynuk (2019-yil). Undan yorug‘lik oqimi, ya’ni jet otilib chiqadi.' },
    { id: 'ngc', n: 'NGC 4889', m: 2.1e10, mt: '≈ 21 billion solar masses', mtUz: '≈ 21 milliard Quyosh massasi', col: '#ff7f7f',
      info: 'An extremely massive black hole at the center of a giant elliptical galaxy in the Coma Cluster.', uz: 'Coma klasteridagi ulkan elliptik galaktika markazida joylashgan o‘ta og‘ir qora tuynuk.' },
    { id: 'ton', n: 'TON 618', m: 6.6e10, mt: '≈ 66 billion solar masses', mtUz: '≈ 66 milliard Quyosh massasi', col: '#c79bff',
      info: 'One of the most massive known black holes, located at the center of a quasar. Its mass far exceeds the others shown here.', uz: 'Kvazar markazidagi eng og‘ir ma’lum qora tuynuklardan biri. Uning massasi shu sahnadagi boshqalardan ancha ustun.' }
  ];
  const MAXLG2 = Math.pow(Math.log10(6.6e10), 2);
  HOLES.forEach(h => {
    h.lg = Math.log10(h.m);
    h.power = Math.round((h.lg * h.lg) / MAXLG2 * 100);
    h.fz = 0; h.pulse = 0; h.eaten = 0; h.hunger = 0; h.alpha = 1;
    h.bx = h.by = h.cx = h.cy = 0; h.r = h.cr = 10; h.nextFlare = 3 + Math.random() * 6; h.parts = [];
    for (let i = 0; i < 26; i++) { const rf = 1.0 + Math.random() * 0.8; h.parts.push({ a: Math.random() * 6.283, rf, w: 1.5 / Math.pow(rf, 1.5) * (0.8 + Math.random() * 0.4), sz: 0.03 + Math.random() * 0.04, al: 0.55 + Math.random() * 0.45, c: Math.random() < 0.35 ? '#fff4d8' : h.col }); }
  });
  const TYPES = {
    tosh:  { n: 'Rock',     r: 13 },
    temir: { n: 'Iron',     r: 13 },
    ast:   { n: 'Asteroid', r: 20 },
    kom:   { n: 'Comet',    r: 12 }
  };

  /* ---------- DOM and styling ---------- */
  const css = `
#bhx{position:fixed;inset:0;z-index:9999;display:none;background:#01030a;color:#dff;font-family:system-ui,sans-serif;touch-action:none;-webkit-user-select:none;user-select:none}
#bhx.show{display:block}
#bhx canvas{position:absolute;inset:0;width:100%;height:100%;transform:none!important;object-fit:fill}
#bhx .bh-top{position:absolute;left:0;right:0;top:0;display:flex;align-items:center;gap:8px;padding:calc(10px + env(safe-area-inset-top,0px)) 12px 8px;background:linear-gradient(rgba(1,4,14,.88),transparent);z-index:2;pointer-events:none}
#bhx .bh-top b{font-size:13px;letter-spacing:3px;text-shadow:0 0 10px #6bf}
#bhx .bh-top button{pointer-events:auto;margin-left:auto}
#bhx button{font:inherit;color:#dff;cursor:pointer}
#bhx .bh-x{padding:7px 12px;border:1px solid #7cf;border-radius:10px;background:rgba(5,20,42,.7);font-size:12px;font-weight:700}
#bhx .bh-hint{position:absolute;left:12px;right:12px;top:calc(52px + env(safe-area-inset-top,0px));font-size:12px;opacity:.8;line-height:1.35;z-index:2;pointer-events:none;text-shadow:0 0 6px #000}
#bhx .bh-card{position:absolute;left:10px;right:10px;top:calc(52px + env(safe-area-inset-top,0px));max-width:440px;padding:10px 12px;border:1px solid rgba(140,200,255,.6);border-radius:14px;background:rgba(4,14,34,.9);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:3;display:none;font-size:12.5px;line-height:1.4}
#bhx .bh-card.show{display:block}
#bhx .bh-card h4{margin:0 0 3px;font-size:15px;letter-spacing:1px}
#bhx .bh-card .pw{height:6px;border-radius:3px;background:rgba(120,180,255,.2);margin:6px 0;overflow:hidden}
#bhx .bh-card .pw i{display:block;height:100%;background:linear-gradient(90deg,#4db8ff,#c79bff)}
#bhx .bh-card .cx{position:absolute;right:6px;top:4px;border:0;background:none;font-size:16px;padding:4px 8px}
#bhx .bh-bar{position:absolute;left:0;right:0;bottom:calc(88px + env(safe-area-inset-bottom,0px));padding:0 10px;display:flex;flex-direction:column;gap:8px;z-index:2;pointer-events:none}
#bhx .bh-row{display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;pointer-events:auto}
#bhx .bh-chip{padding:7px 12px;border:1px solid rgba(140,200,255,.55);border-radius:18px;background:rgba(5,20,44,.78);font-size:12px;font-weight:600}
#bhx .bh-chip.on{background:linear-gradient(135deg,#7df9ff,#4a8bff);color:#021;border-color:#fff}
#bhx .bh-go{padding:13px 22px;border:1.5px solid #7df9ff;border-radius:28px;background:linear-gradient(135deg,rgba(20,70,130,.95),rgba(10,30,70,.95));font-size:15px;font-weight:800;letter-spacing:1px;box-shadow:0 0 22px rgba(80,180,255,.5)}
#bhx .bh-go:active{transform:scale(.96)}
#bhx .bh-sm{padding:10px 14px;border:1px solid rgba(140,200,255,.55);border-radius:22px;background:rgba(5,20,44,.78);font-size:13px}
#bhx .bh-st{text-align:center;font-size:12px;opacity:.9;text-shadow:0 0 6px #000;pointer-events:none}
#bhx button.hov,#bhx .hov{outline:2px solid #fff;box-shadow:0 0 16px #0ff}
body:has(#bhx.show) #gAuth{display:none!important}
body.bh-on #mic{z-index:10003!important}
body.bh-on #orvin{opacity:1!important;z-index:10002!important;pointer-events:none!important}
body.bh-on #cosFrame{display:none}
`;
  const st = document.createElement('style'); st.id = 'bhCss'; st.textContent = css; document.head.appendChild(st);

  const root = document.createElement('div'); root.id = 'bhx';
  root.innerHTML =
    '<canvas id="bhCv"></canvas>' +
    '<div class="bh-top"><b>🕳 BLACK HOLES</b><button class="bh-x" id="bhClose">✕ CLOSE</button></div>' +
    '<div class="bh-hint" id="bhHint">☄ Tap “Add Meteorite,” then drag the rock at the bottom into a black hole and release it. Tap a black hole to hear Orvin tell you about it. Tap an empty area to return to the overview.</div>' +
    '<div class="bh-card" id="bhCard"></div>' +
    '<div class="bh-bar" id="bhBar"><div class="bh-st" id="bhSt"></div>' +
    '<div class="bh-row" id="bhTypes"></div>' +
    '<div class="bh-row"><button class="bh-go" id="bhGo">☄ ADD METEORITE</button><button class="bh-sm" id="bhClr" aria-label="Clear">🧹</button></div></div>';
  document.body.appendChild(root);

  const $ = id => document.getElementById(id);
  const cv = $('bhCv'), cx = cv.getContext('2d', { alpha: false });
  let W = 0, H = 0, DPR = 1, stars = null;
  let restY = 0, rowY = 0, focY = 0, rF = 80, slotW = 80;
  let meteors = [], flashes = [], type = 'tosh', sel = null, open = false, raf = 0, last = 0, T0 = 0;
  let eatenTotal = 0, held = null, ptr = null, statMsg = '', statUntil = 0, lowQ = false, tw = [], ss = { on: false, t: 0, x: 0, y: 0, vx: 0, vy: 0, next: 4 };

  $('bhTypes').innerHTML = Object.keys(TYPES).map(k => '<button class="bh-chip' + (k === type ? ' on' : '') + '" data-t="' + k + '">' + TYPES[k].n + '</button>').join('');

  /* ---------- Yordamchilar ---------- */
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t * t * (3 - 2 * t);
  const slotXY = k => ({ x: W * (k + 0.5) / HOLES.length, y: restY });

  function layout() {
    const bt = $('bhBar').getBoundingClientRect().top;
    restY = Math.max(260, bt - 34);
    slotW = W / HOLES.length;
    const rMax = Math.min(slotW * 0.27, H * 0.075, 62), rMin = rMax * 0.38;
    rowY = Math.max(150, Math.min(restY * 0.42, restY - 170));
    focY = Math.max(rowY + 30, (240 + restY - 50) / 2);
    rF = Math.max(40, Math.min(W * 0.2, (restY - 240 - 40) * 0.3, 100));
    const lo = HOLES[0].lg, hi = HOLES[HOLES.length - 1].lg;
    HOLES.forEach((h, i) => {
      const t = 0.5 * i / (HOLES.length - 1) + 0.5 * (h.lg - lo) / (hi - lo);   // kichikdan kattaga
      h.r = rMin + (rMax - rMin) * t;
      h.bx = slotW * (i + 0.5); h.by = rowY;
    });
    placeHoles(); buildLabels();
  }
  function placeHoles() {
    let fo = 0; HOLES.forEach(h => { fo = Math.max(fo, h.fz); });
    HOLES.forEach(h => {
      const e = ease(h.fz);
      h.cx = lerp(h.bx, W / 2, e); h.cy = lerp(h.by, focY, e);
      h.cr = h.r * lerp(1, rF / h.r, e) * (1 + h.pulse * 0.12 + h.hunger * 0.07 + 0.02 * Math.sin(T0 * 1.3 + h.bx * 0.01));
      h.alpha = Math.max(0.2, 1 - 0.72 * Math.max(0, fo - h.fz));
    });
  }
  function resize() {
    DPR = Math.min(lowQ ? 1 : 1.75, window.devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
    buildSprites(); layout(); makeStars();
  }
  function makeStars() {
    stars = document.createElement('canvas'); stars.width = cv.width; stars.height = cv.height;
    const g = stars.getContext('2d'); let s = 12345; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    const grad = g.createRadialGradient(stars.width / 2, stars.height / 2, 0, stars.width / 2, stars.height / 2, Math.max(stars.width, stars.height) * 0.7);
    grad.addColorStop(0, '#07122a'); grad.addColorStop(1, '#01030a'); g.fillStyle = grad; g.fillRect(0, 0, stars.width, stars.height);
    [[0.18, 0.3, 0.5, 'rgba(90,60,200,.13)'], [0.82, 0.55, 0.55, 'rgba(0,150,200,.10)'], [0.5, 0.85, 0.6, 'rgba(200,70,120,.08)']].forEach(q => {
      const ng = g.createRadialGradient(q[0] * stars.width, q[1] * stars.height, 0, q[0] * stars.width, q[1] * stars.height, q[2] * Math.max(stars.width, stars.height));
      ng.addColorStop(0, q[3]); ng.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = ng; g.fillRect(0, 0, stars.width, stars.height);
    });
    tw = []; for (let i = 0; i < 46; i++) tw.push({ x: rnd(), y: rnd(), s: 0.8 + rnd() * 2.2, ph: rnd() * 6.28, z: 1 + rnd() * 1.4 });
    for (let i = 0; i < 260; i++) { const a = 0.25 + rnd() * 0.7; g.fillStyle = 'rgba(255,255,255,' + a + ')'; const r = (0.4 + rnd() * 1.1) * DPR; g.fillRect(rnd() * stars.width, rnd() * stars.height, r, r); }
  }
  function flashStatus(msg) { statMsg = msg; statUntil = performance.now() + 2600; $('bhSt').textContent = msg; setTimeout(updStat, 2700); }
  function updStat() {
    if (performance.now() < statUntil) return;
    $('bhSt').textContent = 'Below: ' + meteors.filter(m => m.st !== 'sink').length + ' · Absorbed: ' + eatenTotal;
  }

  /* ---------- Meteorit ---------- */
  function spawnMeteor() {
    const used = new Set(meteors.filter(m => m.st !== 'sink').map(m => m.slot)), free = [];
    for (let i = 0; i < HOLES.length; i++) if (!used.has(i)) free.push(i);
    if (!free.length) { flashStatus('No space below — drop a meteorite into a black hole first.'); return; }
    const k = free[Math.floor(Math.random() * free.length)], s = slotXY(k), T = TYPES[type], fromLeft = Math.random() < 0.5;
    const verts = [], crat = [], n = 10;
    for (let i = 0; i < n; i++) verts.push(0.78 + Math.random() * 0.38);
    for (let i = 0; i < 3; i++) crat.push({ a: Math.random() * 6.28, d: Math.random() * 0.5, s: 0.14 + Math.random() * 0.12 });
    meteors.push({ t: type, r: T.r, x: fromLeft ? -40 : W + 40, y: s.y + (Math.random() * 40 - 20), tx: s.x, ty: s.y, slot: k, st: 'in',
      rot: Math.random() * 6.28, spin: (Math.random() - 0.5) * 1.2, ph: Math.random() * 6.28, verts, crat, tail: fromLeft ? Math.PI : 0, str: 0, p: 0, trail: [] });
    updStat();
  }
  function nearestHole(x, y) {
    let b = null, bd = 1e9;
    for (const h of HOLES) { const d = Math.hypot(h.cx - x, h.cy - y); if (d < bd) { bd = d; b = h; } }
    return { h: b, d: bd };
  }
  function grab(m, x, y) {
    held = m; m.st = 'held'; m.tx = x; m.ty = y;
  }
  function release() {
    const m = held; held = null; if (!m) return;
    const q = nearestHole(m.x, m.y);
    if (q.h && q.d < q.h.cr * 2.7 + 16) {            // qora tuynuk yutadi
      m.st = 'sink'; m.h = q.h; m.a = Math.atan2(m.y - q.h.cy, m.x - q.h.cx); m.d0 = Math.max(q.d, q.h.cr * 0.9); m.p = 0; m.trail = []; m.str = 0;
    } else m.st = 'back';                             // pastga qaytadi
    updStat();
  }
  function findMeteor(x, y, pad) {
    let b = null, bd = 1e9;
    for (const m of meteors) {
      if (m.st !== 'rest' && m.st !== 'in' && m.st !== 'back') continue;
      const d = Math.hypot(m.x - x, m.y - y); if (d < m.r + pad && d < bd) { bd = d; b = m; }
    }
    return b;
  }

  /* ---------- Fizika / animatsiya ---------- */
  function step(dt) {
    T0 += dt;
    // fokus animatsiyasi
    HOLES.forEach(h => {
      const tg = sel === h ? 1 : 0; h.fz += Math.sign(tg - h.fz) * Math.min(Math.abs(tg - h.fz), dt * 3.2);
      if (h.pulse > 0) h.pulse = Math.max(0, h.pulse - dt * 1.4);
      h.hunger = Math.max(0, h.hunger - dt * 3);
      h.nextFlare -= dt; if (h.nextFlare <= 0) { h.pulse = Math.max(h.pulse, 0.65); h.nextFlare = 5 + Math.random() * 8; }   // tuynuk vaqti-vaqti bilan chaqnaydi
      const sp = 1 + h.hunger * 2.5 + h.pulse * 1.2; for (let i = 0; i < h.parts.length; i++) h.parts[i].a += h.parts[i].w * dt * sp;
    });
    if (!lowQ) {
      if (ss.on) { ss.t += dt; ss.x += ss.vx * dt; ss.y += ss.vy * dt; if (ss.t > 0.9) ss.on = false; }
      else { ss.next -= dt; if (ss.next <= 0) { ss.on = true; ss.t = 0; ss.x = Math.random() * W * 0.7; ss.y = Math.random() * H * 0.3; ss.vx = 380 + Math.random() * 200; ss.vy = 160 + Math.random() * 120; ss.next = 6 + Math.random() * 8; } }
    }
    if (held) { const q = nearestHole(held.x, held.y); if (q.h) { const R = q.h.cr * 5; if (q.d < R) q.h.hunger = Math.max(q.h.hunger, 1 - q.d / R); } }
    placeHoles();
    for (const m of meteors) {
      m.rot += m.spin * dt;
      if (m.st === 'in') {
        const s = slotXY(m.slot), dx = s.x - m.x, dy = s.y - m.y, d = Math.hypot(dx, dy) || 1, sp = Math.min(85, 12 + d * 1.2);
        if (d < 2.5) m.st = 'rest'; else { m.x += dx / d * sp * dt; m.y += dy / d * sp * dt; }
      } else if (m.st === 'rest') {
        const s = slotXY(m.slot), k = Math.min(1, dt * 6);
        m.x += (s.x - m.x) * k; m.y += (s.y + Math.sin(T0 * 1.5 + m.ph) * 4 - m.y) * k;
      } else if (m.st === 'back') {
        const s = slotXY(m.slot), dx = s.x - m.x, dy = s.y - m.y, d = Math.hypot(dx, dy) || 1, sp = Math.min(230, 30 + d * 2.2);
        if (d < 3) m.st = 'rest'; else { m.x += dx / d * sp * dt; m.y += dy / d * sp * dt; }
      } else if (m.st === 'held') {
        const k = Math.min(1, dt * 20); m.x += (m.tx - m.x) * k; m.y += (m.ty - m.y) * k;
        const q = nearestHole(m.x, m.y), R = q.h.cr * 2.7 + 16;
        m.str = q.d < R ? 1 - q.d / R : 0;
        m.sa = Math.atan2(q.h.cy - m.y, q.h.cx - m.x);
      } else if (m.st === 'sink') {
        m.p += dt / 1.15; const h = m.h;
        if (m.p >= 1) { m.done = true; h.eaten++; h.pulse = 1; eatenTotal++; flashes.push({ h, t: 0 }); if (sel === h) renderCard(h); continue; }
        m.a += dt * (4 + 12 * m.p);
        const rad = m.d0 * Math.pow(1 - m.p, 1.7);
        m.x = h.cx + Math.cos(m.a) * rad; m.y = h.cy + Math.sin(m.a) * rad;
        m.trail.push(m.x, m.y); if (m.trail.length > 36) m.trail.splice(0, 2);
      }
    }
    if (meteors.some(m => m.done)) { meteors = meteors.filter(m => !m.done); updStat(); }
    flashes.forEach(f => f.t += dt); flashes = flashes.filter(f => f.t < 0.8);
  }

  /* ---------- Sprite'lar: og'ir effektlar bir marta chizilib, keyin faqat ko'chiriladi (lag yo'q) ---------- */
  const R0 = 90, TILT = -0.32, YR = 0.297;
  const mkC = (w, h) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; };
  const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')'; };
  let orangeGlow = null;
  function buildSprites() {
    const k = Math.min(DPR, 1.5);
    HOLES.forEach(h => {
      // yorug'lik halosi
      const gs = 256, g = mkC(gs, gs), gx = g.getContext('2d');
      const gr = gx.createRadialGradient(gs / 2, gs / 2, gs * 0.1, gs / 2, gs / 2, gs / 2);
      gr.addColorStop(0, hexA(h.col, 0.8)); gr.addColorStop(0.3, hexA(h.col, 0.34)); gr.addColorStop(0.62, hexA(h.col, 0.09)); gr.addColorStop(1, hexA(h.col, 0));
      gx.fillStyle = gr; gx.fillRect(0, 0, gs, gs); h.sGlow = g;
      // akkretsiya diski: ichki qismi qizg'ish-oq, tashqisi tuynuk rangida; chap tomon yorqinroq (Doppler)
      const pad = R0 * 0.35, w = R0 * 3.5 + pad * 2, hh = R0 * 1.04 + pad * 2, d = mkC(w * k, hh * k), dx = d.getContext('2d');
      dx.scale(k, k); dx.translate(w / 2, hh / 2); dx.lineCap = 'round';
      dx.shadowColor = h.col; dx.shadowBlur = 16;
      for (let j = 0; j <= 14; j++) {
        const f = j / 14, ax = (0.98 + f * 0.8) * R0, hot = Math.pow(1 - f, 1.4);
        dx.strokeStyle = hot > 0.45 ? 'rgba(255,' + Math.round(225 + 30 * hot) + ',' + Math.round(170 + 60 * hot) + ',' + (0.35 + 0.5 * hot) + ')' : hexA(h.col, 0.28 + 0.5 * (1 - f));
        dx.lineWidth = R0 * 0.1; dx.beginPath(); dx.ellipse(0, 0, ax, ax * YR, 0, 0, Math.PI * 2); dx.stroke();
      }
      dx.shadowBlur = 0; dx.setTransform(1, 0, 0, 1, 0, 0);
      dx.globalCompositeOperation = 'destination-in';
      const dm = dx.createLinearGradient(0, 0, d.width, 0); dm.addColorStop(0, 'rgba(0,0,0,1)'); dm.addColorStop(0.5, 'rgba(0,0,0,.8)'); dm.addColorStop(1, 'rgba(0,0,0,.42)');
      dx.fillStyle = dm; dx.fillRect(0, 0, d.width, d.height);
      h.sDisc = d; h.sW = w; h.sH = hh;
    });
    const os = 128, oc = mkC(os, os), ox = oc.getContext('2d'), og = ox.createRadialGradient(os / 2, os / 2, 0, os / 2, os / 2, os / 2);
    og.addColorStop(0, 'rgba(255,200,140,.9)'); og.addColorStop(0.4, 'rgba(255,106,61,.4)'); og.addColorStop(1, 'rgba(255,106,61,0)');
    ox.fillStyle = og; ox.fillRect(0, 0, os, os); orangeGlow = oc;
  }
  function buildLabels() {
    HOLES.forEach(h => {
      let fs = Math.max(9, Math.min(13, slotW / 7.2)), nw, mw, c, x;
      for (; ;) {
        c = mkC(10, 10); x = c.getContext('2d'); x.font = '700 ' + fs + 'px system-ui,sans-serif'; nw = x.measureText(h.n).width;
        x.font = (fs - 1) + 'px system-ui,sans-serif'; mw = x.measureText(fmtMass(h.m)).width;
        if (Math.max(nw, mw) + 14 <= slotW - 4 || fs <= 8) break; fs -= 0.5;
      }
      const w = Math.ceil(Math.max(nw, mw) + 14), hh = Math.ceil(fs * 2.55 + 8), k = Math.min(DPR, 2);
      c = mkC(w * k, hh * k); x = c.getContext('2d'); x.scale(k, k);
      x.fillStyle = 'rgba(3,10,26,.66)'; x.strokeStyle = hexA(h.col, 0.55); x.lineWidth = 1;
      x.beginPath(); const rr = 9; x.moveTo(rr, .5); x.arcTo(w - .5, .5, w - .5, hh - .5, rr); x.arcTo(w - .5, hh - .5, .5, hh - .5, rr); x.arcTo(.5, hh - .5, .5, .5, rr); x.arcTo(.5, .5, w - .5, .5, rr); x.closePath(); x.fill(); x.stroke();
      x.textAlign = 'center'; x.fillStyle = '#eef8ff'; x.font = '700 ' + fs + 'px system-ui,sans-serif'; x.fillText(h.n, w / 2, 4 + fs);
      x.fillStyle = hexA(h.col, 0.95); x.font = (fs - 1) + 'px system-ui,sans-serif'; x.fillText(fmtMass(h.m), w / 2, 4 + fs * 2.1);
      h.sLab = c; h.lW = w; h.lH = hh;
    });
  }
  function makeRock(m) {
    const r = m.r, k = Math.min(DPR, 2), side = Math.ceil(r * 2.8 + 14), c = mkC(side * k, side * k), x = c.getContext('2d');
    x.scale(k, k); x.translate(side / 2, side / 2);
    const pal = { tosh: ['#e0cdb4', '#9a8468', '#5c4b3a', 'rgba(255,200,150,.5)'], temir: ['#ffffff', '#9db3cf', '#3f536b', 'rgba(159,208,255,.7)'],
      ast: ['#bba998', '#7d6b5b', '#40362d', 'rgba(255,200,150,.35)'], kom: ['#ffffff', '#bff3ff', '#4aa8d8', 'rgba(159,232,255,.8)'] }[m.t];
    const g = x.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r * 1.15);
    g.addColorStop(0, pal[0]); g.addColorStop(0.5, pal[1]); g.addColorStop(1, pal[2]);
    x.fillStyle = g; x.shadowColor = pal[3]; x.shadowBlur = 8; x.beginPath();
    if (m.t === 'kom') x.arc(0, 0, r, 0, 7);
    else m.verts.forEach((v, i) => { const a = i / m.verts.length * 6.2832, px = Math.cos(a) * r * v, py = Math.sin(a) * r * v; i ? x.lineTo(px, py) : x.moveTo(px, py); });
    x.closePath(); x.fill(); x.shadowBlur = 0;
    if (m.t === 'temir') { x.strokeStyle = 'rgba(210,230,255,.85)'; x.lineWidth = 1.2; x.stroke(); x.fillStyle = 'rgba(255,255,255,.35)'; x.beginPath(); x.ellipse(-r * 0.3, -r * 0.35, r * 0.28, r * 0.12, -0.6, 0, 7); x.fill(); }
    if (m.t === 'ast') { x.fillStyle = 'rgba(0,0,0,.28)'; m.crat.forEach(q => { x.beginPath(); x.arc(Math.cos(q.a) * r * q.d, Math.sin(q.a) * r * q.d, r * q.s, 0, 7); x.fill(); }); }
    m.spr = c; m.sw = side;
  }

  /* ---------- Chizish ---------- */
  function fmtMass(m) { return m < 1e3 ? Math.round(m) + ' M☉' : m >= 1e9 ? (m / 1e9).toFixed(m >= 1e10 ? 0 : 1) + ' mlrd M☉' : (m / 1e6).toFixed(1) + ' mln M☉'; }
  function jet(h, r, dx, dy, L, a) {
    const g = cx.createLinearGradient(0, 0, dx * L, dy * L); g.addColorStop(0, hexA(h.col, 0.7 * a)); g.addColorStop(1, hexA(h.col, 0));
    const nx = -dy, ny = dx, w0 = r * 0.14, w1 = r * 0.42;
    cx.fillStyle = g; cx.beginPath(); cx.moveTo(nx * w0, ny * w0); cx.lineTo(dx * L + nx * w1, dy * L + ny * w1); cx.lineTo(dx * L - nx * w1, dy * L - ny * w1); cx.lineTo(-nx * w0, -ny * w0); cx.closePath(); cx.fill();
    cx.fillStyle = '#fff';
    for (let i = 0; i < 4; i++) { const u = (T0 * 0.5 + i / 4) % 1; cx.globalAlpha = h.alpha * (1 - u) * a; cx.beginPath(); cx.arc(dx * L * u, dy * L * u, r * 0.11 * (1 - u * 0.5), 0, 7); cx.fill(); }
    cx.globalAlpha = h.alpha;
  }
  function fxUnder(h, r) {
    const ux = Math.sin(TILT), uy = -Math.cos(TILT);
    if (h.id === 'm87') { jet(h, r, ux, uy, r * 3.6, 1); jet(h, r, -ux, -uy, r * 1.7, 0.55); }
    else if (h.id === 'ton') { const f = 0.78 + 0.22 * Math.sin(T0 * 9 + Math.sin(T0 * 3)); jet(h, r, ux, uy, r * 3.8, f); jet(h, r, -ux, -uy, r * 2.0, f * 0.75); }
    else if (h.id === 'ngc') {
      cx.strokeStyle = h.col; for (let i = 0; i < 2; i++) { const u = (T0 * 0.28 + i * 0.5) % 1; cx.globalAlpha = h.alpha * (1 - u) * 0.55; cx.lineWidth = Math.max(1, r * 0.07); cx.beginPath(); cx.arc(0, 0, r * (1.1 + u * 2.4), 0, 7); cx.stroke(); }
      cx.globalAlpha = h.alpha;
    }
  }
  function fxOver(h, r) {
    if (h.id === 'cyg') {
      const D = Math.min(3.1 * r, W * 0.4), ac = T0 * 0.35 + 1, sx = Math.cos(ac) * D, sy = Math.sin(ac) * D * 0.5;
      cx.fillStyle = '#9fd4ff';
      for (let i = 0; i < 10; i++) {
        const u = (T0 * 0.3 + i / 10) % 1, rad = D * (1 - u) + r * 1.2 * u, an = ac + u * 2.4;
        cx.globalAlpha = h.alpha * Math.min(1, (1 - u) * 3) * 0.85; cx.beginPath(); cx.arc(Math.cos(an) * rad, Math.sin(an) * rad * 0.5, Math.max(1, r * 0.08), 0, 7); cx.fill();
      }
      cx.globalAlpha = h.alpha;
      const sg = cx.createRadialGradient(sx, sy, 0, sx, sy, r * 0.7); sg.addColorStop(0, '#fff'); sg.addColorStop(0.35, '#bfe3ff'); sg.addColorStop(1, 'rgba(120,180,255,0)');
      cx.fillStyle = sg; cx.beginPath(); cx.arc(sx, sy, r * 0.7, 0, 7); cx.fill();
    } else if (h.id === 'sgr') {
      cx.fillStyle = '#fff8d0';
      [[2.1, 0.9, 0.2], [2.7, 0.55, 2.1], [3.3, 0.38, 4.0]].forEach(q => {
        const D = Math.min(q[0] * r, W * 0.4);
        for (let t = 0; t < 4; t++) { const an = T0 * q[1] + q[2] - t * 0.13; cx.globalAlpha = h.alpha * (1 - t * 0.25); cx.beginPath(); cx.arc(Math.cos(an) * D, Math.sin(an) * D * 0.62, Math.max(1, r * (0.11 - t * 0.02)), 0, 7); cx.fill(); }
      });
      cx.globalAlpha = h.alpha;
    }
  }
  function parts(h, r, front) {
    const P = h.parts, n = P.length;
    for (let i = 0; i < n; i++) {
      if (lowQ && (i & 1)) continue;
      const p = P[i], sn = Math.sin(p.a); if ((sn > 0) !== front) continue;
      const c = Math.cos(p.a), z = Math.max(0.7, p.sz * r);
      cx.globalAlpha = h.alpha * (0.5 + 0.5 * (-c)) * p.al; cx.fillStyle = p.c; cx.fillRect(c * p.rf * r - z, sn * p.rf * r * YR - z, z * 2, z * 2);
    }
    cx.globalAlpha = h.alpha;
  }
  function drawHole(h) {
    const r = h.cr, rh = r * 0.62, sc = r / R0, al = h.alpha, w = h.sW * sc, hh = h.sH * sc;
    cx.save(); cx.translate(h.cx, h.cy); cx.globalAlpha = al; cx.globalCompositeOperation = 'lighter';
    const gd = r * 5.6; cx.drawImage(h.sGlow, -gd / 2, -gd / 2, gd, gd);
    const ex = Math.max(h.pulse * 0.75, h.hunger * 0.6);
    if (ex > 0.02) { cx.globalAlpha = al * Math.min(1, ex); cx.drawImage(h.sGlow, -gd * 0.62, -gd * 0.62, gd * 1.24, gd * 1.24); cx.globalAlpha = al; }
    fxUnder(h, r);
    cx.rotate(TILT);
    cx.drawImage(h.sDisc, 0, 0, h.sDisc.width, h.sDisc.height / 2, -w / 2, -hh / 2, w, hh / 2);   // disk orqa yarmi
    parts(h, r, false);
    cx.globalCompositeOperation = 'source-over';
    cx.fillStyle = '#000'; cx.beginPath(); cx.arc(0, 0, rh, 0, 7); cx.fill();                       // hodisa gorizonti
    cx.lineWidth = Math.max(1.3, r * 0.05); cx.strokeStyle = 'rgba(255,238,210,.92)'; cx.beginPath(); cx.arc(0, 0, rh * 1.04, 0, 7); cx.stroke();
    cx.lineWidth = Math.max(1, r * 0.12); cx.strokeStyle = hexA(h.col, 0.3); cx.beginPath(); cx.arc(0, 0, rh * 1.2, 0, 7); cx.stroke();
    cx.lineWidth = Math.max(1.5, r * 0.15); cx.strokeStyle = hexA(h.col, 0.8);                      // yorug'lik egilishi
    cx.beginPath(); cx.ellipse(0, 0, rh * 1.22, rh * 1.06, 0, Math.PI * 1.08, Math.PI * 1.92); cx.stroke();
    cx.globalCompositeOperation = 'lighter';
    cx.drawImage(h.sDisc, 0, h.sDisc.height / 2, h.sDisc.width, h.sDisc.height / 2, -w / 2, 0, w, hh / 2);  // disk old yarmi
    parts(h, r, true);
    cx.rotate(-TILT); cx.globalCompositeOperation = 'source-over';
    fxOver(h, r);
    cx.restore();
  }
  function drawLabel(h) {
    cx.globalAlpha = h.alpha; cx.drawImage(h.sLab, h.cx - h.lW / 2, h.cy + h.cr * 1.15 + 6, h.lW, h.lH); cx.globalAlpha = 1;
  }
  function drawMeteor(m) {
    const r = m.r;
    if (m.st === 'sink' && m.trail.length > 4) {
      cx.save(); cx.lineCap = 'round';
      for (let i = 2; i < m.trail.length; i += 2) {
        const a = i / m.trail.length; cx.strokeStyle = 'rgba(255,170,110,' + (a * 0.55) + ')'; cx.lineWidth = Math.max(1, r * 0.9 * a);
        cx.beginPath(); cx.moveTo(m.trail[i - 2], m.trail[i - 1]); cx.lineTo(m.trail[i], m.trail[i + 1]); cx.stroke();
      }
      cx.restore();
    }
    cx.save(); cx.translate(m.x, m.y);
    if (m.st === 'rest' || m.st === 'back') {
      cx.save(); cx.globalAlpha = 0.35 + 0.2 * Math.sin(T0 * 3 + m.ph); cx.strokeStyle = '#9fe8ff'; cx.setLineDash([4, 5]); cx.lineWidth = 1.5; cx.rotate(T0 * 0.6);
      cx.beginPath(); cx.arc(0, 0, r + 8, 0, 7); cx.stroke(); cx.restore();
    }
    if (m.t === 'kom' && m.st !== 'sink') {
      cx.save(); cx.rotate(m.tail); const g = cx.createLinearGradient(0, 0, r * 6, 0);
      g.addColorStop(0, 'rgba(159,232,255,.7)'); g.addColorStop(1, 'rgba(159,232,255,0)'); cx.fillStyle = g;
      cx.beginPath(); cx.moveTo(0, -r * 0.8); cx.lineTo(r * 6, 0); cx.lineTo(0, r * 0.8); cx.closePath(); cx.fill(); cx.restore();
    }
    if (m.st === 'sink') {
      const k = Math.max(0, 1 - Math.pow(m.p, 1.3)), a2 = Math.atan2(m.h.cy - m.y, m.h.cx - m.x);
      cx.globalCompositeOperation = 'lighter'; cx.globalAlpha = 0.9 * k; cx.drawImage(orangeGlow, -r * 2.2, -r * 2.2, r * 4.4, r * 4.4); cx.globalCompositeOperation = 'source-over'; cx.globalAlpha = 1;
      cx.rotate(a2); cx.scale(1 + m.p * 2.2, k); cx.rotate(-a2);
    } else if (m.str > 0) { cx.rotate(m.sa); cx.scale(1 + m.str * 0.7, 1 - m.str * 0.25); cx.rotate(-m.sa); }
    cx.rotate(m.rot);
    if (!m.spr) makeRock(m);
    cx.drawImage(m.spr, -m.sw / 2, -m.sw / 2, m.sw, m.sw);
    cx.restore();
    if (m.st === 'held') { cx.save(); cx.font = '34px system-ui,"Apple Color Emoji","Segoe UI Emoji",sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('🤏', m.x + 8, m.y - r - 12); cx.restore(); }
  }
  function draw() {
    cx.setTransform(DPR, 0, 0, DPR, 0, 0);
    cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-over';
    cx.drawImage(stars, 0, 0, W, H);
    if (!lowQ) {                                   // miltillovchi yulduzlar
      cx.fillStyle = '#fff';
      for (let i = 0; i < tw.length; i++) { const q = tw[i]; cx.globalAlpha = 0.2 + 0.6 * Math.abs(Math.sin(T0 * q.s + q.ph)); cx.fillRect(q.x * W, q.y * H, q.z, q.z); }
      cx.globalAlpha = 1;
    }
    if (ss.on) { const a = 1 - ss.t / 0.9; cx.strokeStyle = 'rgba(200,230,255,' + a * 0.9 + ')'; cx.lineWidth = 1.6; cx.beginPath(); cx.moveTo(ss.x, ss.y); cx.lineTo(ss.x - ss.vx * 0.09, ss.y - ss.vy * 0.09); cx.stroke(); }
    const order = HOLES.slice().sort((a, b) => a.fz - b.fz);
    order.forEach(drawHole); order.forEach(drawLabel);
    meteors.forEach(drawMeteor);
    flashes.forEach(f => { const a = 1 - f.t / 0.8; cx.strokeStyle = 'rgba(255,255,255,' + a * 0.7 + ')'; cx.lineWidth = 2; cx.beginPath(); cx.arc(f.h.cx, f.h.cy, f.h.cr * (1 + f.t * 2.4), 0, 7); cx.stroke(); });
  }
  let fAcc = 0, fN = 0;
  function frame(ts) {
    if (!open) return;
    raf = requestAnimationFrame(frame);
    const raw = (ts - (last || ts)) / 1000, dt = Math.min(0.05, raw); last = ts;
    step(dt); draw();
    if (!lowQ && raw > 0) { fN++; if (fN > 40) { fAcc += raw; if (fN > 130) { if (fAcc / 90 > 0.027) { lowQ = true; resize(); } fN = -99999; } } }   // sekin qurilmada avtomatik yengillashtirish
  }

  
  /* ---------- Information card and ORVIN speech ---------- */
  function renderCard(h) {
    const c = $('bhCard');
    c.innerHTML = '<button class="cx" id="bhCardX" aria-label="Close">✕</button><h4>' + h.n + '</h4><div>' + h.mt + '</div>' +
      '<div class="pw"><i style="width:' + Math.max(4, h.power) + '%"></i></div><div style="opacity:.85">Gravitational pull (in this scene): ' + h.power + '%  ·  Meteors swallowed: ' + h.eaten + '</div>' +
      '<div style="margin-top:6px">' + h.info + '</div><div style="margin-top:6px;opacity:.6;font-size:11px">Note: sizes use a logarithmic scale; the actual differences are much larger.</div>';
    c.classList.add('show');
    $('bhCardX').onclick = unfocus;
  }
  function focusHole(h) {
    sel = h; $('bhHint').style.display = 'none'; renderCard(h);
    try { if (window.say) window.say(h.n.replace(/\*/g, '') + '. Approximately ' + h.mt.replace('≈', '') + '. ' + h.info, false, 'en', h.n.replace(/\*/g, '') + '. Taxminan ' + h.mtUz.replace('≈', '') + '. ' + h.uz); } catch (_) { }
  }
  function unfocus() {
    sel = null; $('bhCard').classList.remove('show'); $('bhHint').style.display = '';
    try { if (window.elStop) window.elStop(); } catch (_) { }
  }
  function hitHole(x, y) {
    let b = null, bd = 1e9;
    for (const h of HOLES) { const d = Math.hypot(h.cx - x, h.cy - y), R = Math.max(h.cr * 1.9, 26); if (d < R && d < bd) { bd = d; b = h; } }
    return b;
  }
  function tapAt(x, y) {
    const h = hitHole(x, y);
    if (h) focusHole(h); else if (sel) unfocus();    // yon tomonni bossa — o'ziga keladi
  }

  /* ---------- Boshqaruv (sichqoncha / sensor) ---------- */
  cv.addEventListener('pointerdown', e => {
    try { cv.setPointerCapture(e.pointerId); } catch (_) { }
    if (ptr) return;
    ptr = { id: e.pointerId, sx: e.clientX, sy: e.clientY, moved: false, m: null };
    const m = findMeteor(e.clientX, e.clientY, 26);
    if (m) { ptr.m = m; grab(m, e.clientX, e.clientY); }
  });
  cv.addEventListener('pointermove', e => {
    if (!ptr || ptr.id !== e.pointerId) return;
    if (Math.hypot(e.clientX - ptr.sx, e.clientY - ptr.sy) > 10) ptr.moved = true;
    if (ptr.m && held === ptr.m) { ptr.m.tx = e.clientX; ptr.m.ty = e.clientY; }
  });
  const endPtr = e => {
    if (!ptr || ptr.id !== e.pointerId) return;
    const p = ptr; ptr = null;
    if (p.m && held === p.m) release();
    else if (!p.m && e.type === 'pointerup' && !p.moved) tapAt(e.clientX, e.clientY);
  };
  cv.addEventListener('pointerup', endPtr); cv.addEventListener('pointercancel', endPtr);
  $('bhGo').onclick = spawnMeteor;
  $('bhClr').onclick = () => { held = null; meteors = []; updStat(); };
  $('bhClose').onclick = () => close();
  $('bhTypes').addEventListener('click', e => {
    const b = e.target.closest('[data-t]'); if (!b) return; type = b.dataset.t;
    document.querySelectorAll('#bhTypes .bh-chip').forEach(x => x.classList.toggle('on', x === b));
  });
  addEventListener('keydown', e => { if (!open) return; if (e.key === 'Escape') close(); else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); spawnMeteor(); } });
  addEventListener('resize', () => { if (open) resize(); });

  function openBH() {
    try { window.hideMenu && window.hideMenu(); } catch (_) { }
    document.querySelectorAll('#sciHub.show,#expeditionNew.show,#oHome.show,#certList.show').forEach(el => el.classList.remove('show'));
    document.body.classList.remove('sci-on', 'exp-on');
    root.classList.add('show'); document.body.classList.add('bh-on'); open = true;
    sel = null; HOLES.forEach(h => { h.fz = 0; h.hunger = 0; });
    resize(); $('bhCard').classList.remove('show'); $('bhHint').style.display = ''; updStat(); last = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
  }
  function close() {
    open = false; cancelAnimationFrame(raf); held = null; ptr = null;
    root.classList.remove('show'); document.body.classList.remove('bh-on');
    try { if (window.elStop) window.elStop(); } catch (_) { }
  }
  window.__bh = { HOLES, meteors: () => meteors, step, spawn: spawnMeteor, focus: focusHole, unfocus, stats: () => ({ eatenTotal }), setType: k => { type = k; }, _t: { grab, release, findMeteor, tapAt, hitHole, draw, resize, get held() { return held; }, get sel() { return sel; } } };
  window.openBlackHoles = openBH; window.closeBlackHoles = close; window.isBlackHoleOpen = () => open;

  /* o'quv bo'limlari sahifasiga tugma */
  const oh = document.querySelector('#oHome .hd');
  if (oh) { const b = document.createElement('button'); b.textContent = '🕳 Black Holes'; b.style.cssText = 'padding:6px 12px;border:1px solid #7cf;border-radius:8px;background:rgba(5,20,42,.5);color:#bdf;margin-left:6px'; b.onclick = () => { document.getElementById('oHome').classList.remove('show'); openBH(); }; oh.appendChild(b); }

  /* ---------- Qo'l (kamera) bilan boshqarish: chimchilab ushlash ---------- */
  const prevH = window.__orvinHand; let latch = false, hovEl = null, handM = null;
  function setHov(el) { if (hovEl === el) return; if (hovEl) hovEl.classList.remove('hov'); hovEl = el; if (el) el.classList.add('hov'); }
  window.__orvinHand = function (h) {
    if (!open) return prevH ? prevH(h) : false;
    if (!h.has) { if (handM && held === handM) release(); handM = null; latch = false; setHov(null); return true; }
    const el = document.elementFromPoint(h.x, h.y), b = el && el.closest ? el.closest('#bhx button') : null;
    if (h.pinch) {
      if (!latch) {
        latch = true;
        if (b) b.click();
        else { const m = findMeteor(h.x, h.y, 46); if (m) { handM = m; grab(m, h.x, h.y); } else if (el === cv) tapAt(h.x, h.y); }
      } else if (handM && held === handM) { handM.tx = h.x; handM.ty = h.y; }
      setHov(handM ? null : b);
    } else {
      if (handM && held === handM) release();
      handM = null; latch = false; setHov(b);
    }
    return true;
  };

  /* ---------- Ovoz buyruqlari ---------- */
  let tries = 0;
  const iv = setInterval(() => {
    tries++; const o = window.handle;
    if (!o || o._bh) { if (o && o._bh) clearInterval(iv); if (tries > 200) clearInterval(iv); return; }
    if (!o._certList && tries < 80) return; // boshqa qatlamlar o'rnatilishini kutamiz
    const w = function (raw) {
      const t = (raw || '').toLowerCase().replace(/[‘’`ʻʼ']/g, '');
      if (open) {
        if (/\b(close|hide|exit|back)\b/.test(t)) { if (window.say) window.say(raw, true); close(); return; }
        const nm = [[/cygnus|cyg|oqqush/, 0], [/sagit|sagitt|sgr|somon/, 1], [/m\s*87|em\s*87|эм\s*87/, 2], [/ngc|4889/, 3], [/\bton\b|618/, 4]].find(x => x[0].test(t));
        if (nm) { if (window.say) window.say(raw, true); focusHole(HOLES[nm[1]]); return; }
        if (/\b(meteor|rock|iron|asteroid|comet|drop|throw|spawn)\b/.test(t)) {
          if (window.say) window.say(raw, true);
          if (/\biron\b/.test(t)) type = 'temir'; else if (/asteroid/.test(t)) type = 'ast'; else if (/\bcomet\b/.test(t)) type = 'kom'; else type = 'tosh';
          document.querySelectorAll('#bhTypes .bh-chip').forEach(x => x.classList.toggle('on', x.dataset.t === type));
           spawnMeteor(); if (window.say) window.say('A meteor is coming in from below. Grab it and drop it into a black hole.', false, 'en', 'Meteorit pastdan uchib kelmoqda. Uni ushlab, qora tuynukka olib boring'); return;
        }
      }
      // "qora tuynuk" ham, "black hole" ham (inglizcha/kirilcha talaffuz variantlari bilan)
       if (/\b(black hole|black holes|blackhole)\b/.test(t)) { if (window.say) window.say(raw, true); openBH(); if (window.say) window.say('The Black Holes section is open.', false, 'en', 'Qora tuynuklar bo‘limi ochildi'); return; }
      return o(raw);
    };
    w._bh = true; w._sci = o._sci; w._orvinExpHook = o._orvinExpHook; w._certList = o._certList; window.handle = w; clearInterval(iv);
  }, 400);
})();
