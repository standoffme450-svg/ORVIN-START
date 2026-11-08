/* ORVIN — Fizika: HAR mavzu oxirida qo'l bilan amaliy lab (chimchilab sudrab yig'ish) */
(function () {
  'use strict';
  if (window.__physHand) return; window.__physHand = true;
  const L = [
    [/Elektr|tok|Om|zanjir|qarshilik|Kirxgof|Joul|kuchlanish|Transformator|Yarim o.tkazgich/i, ['🔋', '🔌', '💡'], 'Zanjir', '💡 Lampa yondi — yopiq zanjirda tok oqadi: I = U/R'],
    [/Linza|nur|Yorug|optik|Ko.zgu|sinish|qaytish|Spektr|Difraksiya|Interferensiya/i, ['🔦', '🔍'], 'Ekran', '✓ Nur fokusga yig‘ildi: 1/F = 1/a + 1/b'],
    [/Issiqlik|Gaz|harorat|Termodinamika|Bug|Erish|Qaynash|Molekulyar|Agregat/i, ['🧊', '🔥'], '🥛', '✓ Issiqlik uzatildi: Q = cmΔT; muz eriydi (Q = λm)'],
    [/Zaryad|Kulon|Kondensator|Elektrostatik/i, ['＋', '－'], 'Maydon', '✓ Qarama-qarshi zaryadlar tortishadi: F = k·q₁q₂/r²'],
    [/Magnit|Induksiya|Lorens|Amper/i, ['🧲', '🔩'], 'Maydon', '✓ Magnit temirni tortdi: magnit maydon temirni magnitlaydi'],
    [/To.lqin|tebran|Tovush|mayatnik|Rezonans/i, ['〰️', '🔊'], 'Muhit', '✓ To‘lqin tarqaldi: v = λ·f'],
    [/Yadro|Radio|Atom|Foton|Foto|Kvant|yemirilish/i, ['p', 'p', 'n', 'n'], 'Yadro', '✓ ⁴He yadrosi yig‘ildi: 2 proton + 2 neytron'],
    [/Richag|moment|Muvozanat|Statika|Blok/i, ['⚖️', '⚖️'], '🔺', '✓ Muvozanat: F₁·l₁ = F₂·l₂'],
    [/Arximed|Suyuqlik|Paskal|bosim|Gidro|Atmosfera/i, ['🧱', '💧'], 'Idish', '✓ Jism suyuqlikka botdi: F_A = ρ·g·V'],
    [/Tortishish|Kepler|Planeta|Koinot|Sun.iy/i, ['🌍', '🌙'], '🛰️', '✓ Oy orbitada: tortishish F = G·m₁m₂/r²']
  ], DEF = [['📦', '➡️'], 'Sirt', '✓ F kuch jismni siljitdi: A = F·s, F = m·a'];
  const css = document.createElement('style');
  css.textContent = '.phl{position:relative;height:210px;border:1px dashed #7cf;border-radius:12px;overflow:hidden;touch-action:none;margin:6px 0}.phl .pi{position:absolute;min-width:46px;height:46px;padding:0 6px;box-sizing:border-box;border-radius:23px;display:flex;align-items:center;justify-content:center;transform:translate(-50%,-50%);font-size:20px;font-weight:700;color:#fff;background:radial-gradient(circle at 30% 30%,#7dd3fc,#0369a1);border:2px solid rgba(255,255,255,.4);cursor:grab;user-select:none}.phl .pz{background:radial-gradient(circle at 30% 30%,#fcd34d,#b45309);cursor:default;font-size:13px}.phm{color:#6f6;font-weight:700;min-height:1.3em}';
  document.head.appendChild(css);
  let cur = null, hold = null;
  const put = (a, x, y) => { a.x = x; a.y = y; a.el.style.left = x + 'px'; a.el.style.top = y + 'px'; };
  function build(ls, title) {
    const sp = L.find(l => l[0].test(title)) || [null].concat(DEF), it = sp[1], zone = sp[2], msg = sp[3];
    const wrap = document.createElement('div'); wrap.dataset.hl = '1'; wrap.setAttribute('data-keep-uz', 'true');
    wrap.innerHTML = '<div class="stp">🖐 Qo‘l bilan amaliy lab</div><div style="font-size:13px;opacity:.85">Barmoq bilan chimchilab (yoki sichqoncha bilan) buyumlarni markazga olib boring.</div><div class="phl"></div><div class="phm"></div><button class="phr">🔄 Qaytadan</button>';
    ls.appendChild(wrap);
    const box = wrap.querySelector('.phl'), m = wrap.querySelector('.phm');
    const init = () => {
      box.innerHTML = ''; m.textContent = ''; const W = box.clientWidth || 300, H = 210;
      const mk = (s, x, y, z) => { const d = document.createElement('div'); d.className = 'pi' + (z ? ' pz' : ''); d.textContent = s; box.appendChild(d); const o = { el: d, x, y, in: false }; put(o, x, y); return o; };
      const c = mk(zone, W / 2, H / 2, 1), n = it.length;
      cur = { box, m, msg, W, H, c, as: it.map((s, i) => mk(s, 40 + (W - 80) * (i + .5) / n, i % 2 ? 40 : H - 36)), done: false };
    };
    init(); wrap.querySelector('.phr').onclick = init;
    box.addEventListener('pointerdown', e => { if (cur && cur.box === box) { const a = cur.as.find(x => x.el === e.target); if (a) hold = a; } });
    box.addEventListener('pointermove', e => { if (hold && cur) { const r = box.getBoundingClientRect(); put(hold, Math.max(0, Math.min(cur.W, e.clientX - r.left)), Math.max(0, Math.min(cur.H, e.clientY - r.top))); } });
  }
  function check() {
    const C = cur; if (!C) return; C.as.forEach(a => a.in = Math.hypot(a.x - C.c.x, a.y - C.c.y) < 70);
    if (C.as.every(a => a.in)) { C.as.forEach((a, i) => { const g = 2 * Math.PI * i / C.as.length + Math.PI / 4; put(a, C.c.x + 58 * Math.cos(g), C.c.y + 58 * Math.sin(g)); }); C.m.textContent = C.msg; }
  }
  addEventListener('pointerup', () => { if (hold) { hold = null; check(); } });
  setInterval(() => {
    const root = document.getElementById('pmLearn'); if (!root) return;
    root.querySelectorAll('.ls').forEach(ls => { if (ls.querySelector('[data-hl]')) return; const tp = ls.previousElementSibling, t = tp ? tp.textContent : ''; build(ls, t); });
    if (cur && !document.body.contains(cur.box)) { cur = null; hold = null; }
  }, 400);
  const prev = window.__orvinHand;
  window.__orvinHand = function (h) {
    const ph = document.getElementById('msPhys');
    if (!cur || !ph || !ph.classList.contains('show') || !h || !h.has) { if (!h || !h.has) hold = null; return prev ? prev(h) : false; }
    const r = cur.box.getBoundingClientRect(), x = h.x - r.left, y = h.y - r.top;
    if (!hold && !(h.pinch && x > -20 && x < r.width + 20 && y > -20 && y < r.height + 20 && cur.as.some(a => Math.hypot(a.x - x, a.y - y) < 50))) return prev ? prev(h) : false;
    if (h.pinch) { if (!hold) { let d = 50; cur.as.forEach(a => { const q = Math.hypot(a.x - x, a.y - y); if (q < d) { d = q; hold = a; } }); } if (hold) put(hold, Math.max(0, Math.min(cur.W, x)), Math.max(0, Math.min(cur.H, y))); }
    else { hold = null; check(); }
    return true;
  };
})();
