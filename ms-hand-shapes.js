/* ORVIN — Bosh ekran qo'l shakllari: 1 barmoq = aylana, 2 = kesma, 3 = uchburchak piramida, 4 = kub, 5 = beshburchak prizma.
   Shakl qo'l ortidan yuradi; qo'l yopilsa (musht), ekran chetiga chiqsa yoki yo'qolsa shakl darhol yo'qoladi. Eski wireframe-burchak varianti olib tashlangan. */
(function () {
  'use strict';
  if (window.OrvinShapes) return;
  const NAME = { uz: ['Aylana', 'Kesma', 'Uchburchak (piramida)', 'Kvadrat (kub)', 'Beshburchak (prizma)'], ru: ['Окружность', 'Отрезок', 'Треугольник (пирамида)', 'Квадрат (куб)', 'Пятиугольник (призма)'], en: ['Circle', 'Segment', 'Triangle (pyramid)', 'Square (cube)', 'Pentagon (prism)'] };
  const ring = (n, y, r) => Array.from({ length: n }, (_, i) => { const a = i * 2 * Math.PI / n - Math.PI / 2; return [r * Math.cos(a), y, r * Math.sin(a)]; });
  const prism = n => { const t = ring(n, -1, 1), b = ring(n, 1, 1), f = [Array.from({ length: n }, (_, i) => i), Array.from({ length: n }, (_, i) => n + n - 1 - i)]; for (let i = 0; i < n; i++) f.push([i, (i + 1) % n, n + (i + 1) % n, n + i]); return { v: t.concat(b), f }; };
  const MESH = {
    3: { v: [[0, -1.2, 0], ...ring(3, 0.9, 1.25)].map(p => p), f: [[1, 2, 3], [0, 2, 1], [0, 3, 2], [0, 1, 3]] },
    4: (() => { const m = prism(4); m.v = m.v.map(p => [p[0] * 1.0, p[1], p[2]]); return m; })(),
    5: prism(5)
  };
  /* piramida: tepa [0], asos uchburchak — yuzlar tashqariga qaragan tartibda */
  MESH[3] = { v: [[0, -1.3, 0], ...ring(3, 0.9, 1.3).reverse()], f: [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]] };
  const S = { n: 0, hold: 0, x: 0, y: 0, sc: 0, tg: 0, ang: 0, tilt: -0.4, on: false, raf: 0, last: 0, shown: 0 };
  let cv, cx, dpr = 1;
  function ensure() {
    if (cv) return; cv = document.createElement('canvas'); cv.id = 'orvinShape'; cv.setAttribute('data-keep-uz', 'true');
    cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:41;transform:none!important';
    document.body.appendChild(cv); cx = cv.getContext('2d'); size(); addEventListener('resize', size);
  }
  function size() { dpr = Math.min(2, devicePixelRatio || 1); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; }
  const busy = () => document.body.classList.contains('math-mode') || document.body.classList.contains('exp-on') || document.body.classList.contains('sci-on') || document.body.classList.contains('phys-mode') || !!document.querySelector('#msPhys.show,#msChem.show,#msMock.show,#msCMock.show,#msPMock.show,#oHome.show,#oquv.show,#space.show');
  function proj(p, R) { const ca = Math.cos(S.ang), sa = Math.sin(S.ang), ct = Math.cos(S.tilt), st = Math.sin(S.tilt); let x = p[0] * ca - p[2] * sa, z = p[0] * sa + p[2] * ca, y = p[1] * ct - z * st; z = p[1] * st + z * ct; const f = 1 / (1 - z * 0.12); return { x: S.x + x * R * f, y: S.y + y * R * f, z, w: [x, y, z] }; }
  function R() { return Math.max(46, Math.min(92, Math.min(innerWidth, innerHeight) * 0.12)) * S.sc; }
  function draw() {
    cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, innerWidth, innerHeight);
    if (S.sc < 0.02 || !S.n) return;
    const r = R(), n = S.n; cx.save(); cx.lineJoin = 'round'; cx.lineCap = 'round';
    const glow = (a) => { cx.shadowColor = 'rgba(0,229,255,.9)'; cx.shadowBlur = 16 * S.sc; cx.strokeStyle = `rgba(150,240,255,${a})`; };
    if (n === 1) {
      const g = cx.createRadialGradient(S.x - r * .3, S.y - r * .35, r * .1, S.x, S.y, r); g.addColorStop(0, 'rgba(140,235,255,.55)'); g.addColorStop(1, 'rgba(0,80,150,.18)');
      cx.beginPath(); cx.arc(S.x, S.y, r, 0, 7); cx.fillStyle = g; cx.fill(); glow(.95); cx.lineWidth = 2.6; cx.stroke(); cx.shadowBlur = 0; cx.lineWidth = 1.2; cx.strokeStyle = 'rgba(170,240,255,.55)';
      for (let k = 0; k < 3; k++) { const a = S.ang + k * Math.PI / 3; cx.beginPath(); cx.ellipse(S.x, S.y, Math.abs(Math.cos(a)) * r, r, 0, 0, 7); cx.stroke(); }
      cx.beginPath(); cx.ellipse(S.x, S.y, r, r * .28, 0, 0, 7); cx.stroke();
    } else if (n === 2) {
      const a = proj([-1.2, 0, 0], r), b = proj([1.2, 0, 0], r); glow(.98); cx.lineWidth = 4; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
      cx.shadowBlur = 0; [a, b].forEach(p => { cx.beginPath(); cx.arc(p.x, p.y, 7, 0, 7); cx.fillStyle = '#e6fdff'; cx.fill(); cx.strokeStyle = '#0ff'; cx.lineWidth = 2; cx.stroke(); });
    } else {
      const m = MESH[n], P = m.v.map(p => proj(p, r * (n === 4 ? .78 : .85)));
      const faces = m.f.map(f => { const q = f.map(i => P[i]), z = q.reduce((s, p) => s + p.z, 0) / q.length; const u = [q[1].w[0] - q[0].w[0], q[1].w[1] - q[0].w[1], q[1].w[2] - q[0].w[2]], v = [q[2].w[0] - q[0].w[0], q[2].w[1] - q[0].w[1], q[2].w[2] - q[0].w[2]]; const nx = u[1] * v[2] - u[2] * v[1], ny = u[2] * v[0] - u[0] * v[2], nz = u[0] * v[1] - u[1] * v[0], l = Math.hypot(nx, ny, nz) || 1; return { q, z, lit: Math.max(0, (-nx * .3 - ny * .6 + nz * .75) / l) }; }).sort((a, b) => a.z - b.z);
      faces.forEach(f => { cx.beginPath(); f.q.forEach((p, i) => i ? cx.lineTo(p.x, p.y) : cx.moveTo(p.x, p.y)); cx.closePath(); cx.fillStyle = `rgba(${40 + 90 * f.lit | 0},${150 + 90 * f.lit | 0},255,${.16 + .3 * f.lit})`; cx.fill(); glow(.95); cx.lineWidth = 2.2; cx.stroke(); });
    }
    cx.restore();
    cx.font = '700 13px system-ui,sans-serif'; cx.textAlign = 'center'; cx.fillStyle = `rgba(190,245,255,${Math.min(1, S.sc)})`; cx.shadowColor = '#0ff'; cx.shadowBlur = 8;
    const L = (NAME[window.ORVIN_LANG] || NAME.uz)[n - 1]; cx.fillText(L, S.x, Math.min(innerHeight - 14, S.y + r * 1.35 + 18));
  }
  function loop(t) {
    S.raf = requestAnimationFrame(loop); const dt = Math.min(50, t - (S.last || t)); S.last = t;
    S.sc += (S.tg - S.sc) * (1 - Math.exp(-dt / 70)); if (S.tg === 0 && S.sc < 0.02) { S.sc = 0; S.n = 0; draw(); cancelAnimationFrame(S.raf); S.raf = 0; return; }
    S.ang += dt * 0.0016; draw();
  }
  const start = () => { if (!S.raf) { S.last = 0; S.raf = requestAnimationFrame(loop); } };
  window.OrvinShapes = {
    clear() { S.hold = 0; S.tg = 0; S.sc = 0; S.n = 0; if (cv) { cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, innerWidth, innerHeight); } },
    /* o = {n: barmoqlar soni, pts: [[x,y]...21 ta nuqta (ekran koordinatasida)], pinch, grabbed} */
    update(o) {
      ensure(); const pts = o.pts, pm = 26, key = [0, 5, 9, 13, 17, 12].map(i => pts[i]);
      const edge = key.some(p => p[0] < pm || p[0] > innerWidth - pm || p[1] < pm || p[1] > innerHeight - pm);
      const ok = !busy() && !o.grabbed && !o.pinch && !edge && o.n >= 1 && o.n <= 5;
      if (!ok) { S.hold = 0; S.tg = 0; if (S.sc > 0) { S.sc = Math.min(S.sc, 0.0); S.n = 0; this.clear(); } return; }
      S.hold = (S.cand === o.n) ? S.hold + 1 : 0; S.cand = o.n;
      const top = Math.min(...pts.map(p => p[1])), mx = (pts[0][0] + pts[9][0]) / 2, R0 = R() || 60, tx = Math.max(R0 + 10, Math.min(innerWidth - R0 - 10, mx)), ty = Math.max(R0 + 14, top - R0 * 1.25 - 14);
      if (S.hold >= 5) { if (S.n !== o.n) { S.n = o.n; if (!S.sc) { S.x = tx; S.y = ty; } } S.tg = 1; }
      if (S.n) { const a = 0.42; S.x += (tx - S.x) * a; S.y += (ty - S.y) * a; start(); }
    }
  };
})();
