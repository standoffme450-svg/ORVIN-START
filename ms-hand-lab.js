/* ORVIN — Qo'l bilan amaliy lab (mavzuga qarab)
   Kimyo: H2O — 2 ta H ni O ga yaqinlashtirib molekula hosil qilish
   Fizika: Magnit — temir/nikel tortiladi, plastik/yog'och tortilmaydi
   API: window.OrvinHandLab.setMode('h2o'|'magnet'|'off')
        window.OrvinHandLab.onHand({x,y,pinch,has})
*/
(function () {
  'use strict';
  if (window.OrvinHandLab) return;

  let mode = 'off';
  let layer = null;
  const state = { items: [], molecule: null, hold: null, msg: '', msgT: 0 };

  function ensureLayer() {
    if (layer) return layer;
    layer = document.createElement('div');
    layer.id = 'orvinHandLab';
    layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:55;overflow:hidden';
    document.body.appendChild(layer);
    return layer;
  }

  function clear() {
    if (layer) layer.innerHTML = '';
    state.items = [];
    state.molecule = null;
    state.hold = null;
    state.msg = '';
  }

  function el(tag, css, text) {
    const n = document.createElement(tag);
    n.style.cssText = css;
    if (text != null) n.textContent = text;
    return n;
  }

  function showMsg(t) {
    state.msg = t;
    state.msgT = Date.now() + 2200;
    let m = layer && layer.querySelector('.hl-msg');
    if (!m) {
      m = el('div', 'position:fixed;left:50%;top:18%;transform:translateX(-50%);padding:10px 16px;border-radius:10px;background:rgba(6,20,40,.88);border:1px solid rgba(100,220,255,.5);color:#eafcff;font:600 14px sans-serif;z-index:56;pointer-events:none', t);
      m.className = 'hl-msg';
      ensureLayer().appendChild(m);
    } else m.textContent = t;
  }

  function placeAtom(sym, x, y, color) {
    const a = el('div',
      'position:absolute;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:700 16px sans-serif;color:#fff;transform:translate(-50%,-50%);box-shadow:0 0 16px rgba(80,200,255,.45);border:2px solid rgba(255,255,255,.35);background:' + color,
      sym);
    a.style.left = x + 'px';
    a.style.top = y + 'px';
    a.dataset.sym = sym;
    ensureLayer().appendChild(a);
    const item = { el: a, sym, x, y, kind: 'atom' };
    state.items.push(item);
    return item;
  }

  function placeObj(label, x, y, magnetic) {
    const o = el('div',
      'position:absolute;min-width:56px;padding:8px 10px;border-radius:10px;text-align:center;font:600 12px sans-serif;color:#eafcff;transform:translate(-50%,-50%);border:1px solid rgba(150,220,255,.4);background:rgba(12,28,48,.9)',
      label);
    o.style.left = x + 'px';
    o.style.top = y + 'px';
    ensureLayer().appendChild(o);
    const item = { el: o, label, x, y, magnetic, kind: 'obj' };
    state.items.push(item);
    return item;
  }

  function setupH2O() {
    clear();
    const w = innerWidth, h = innerHeight;
    placeAtom('O', w * 0.5, h * 0.45, 'radial-gradient(circle at 30% 30%,#60a5fa,#1d4ed8)');
    placeAtom('H', w * 0.28, h * 0.55, 'radial-gradient(circle at 30% 30%,#f8fafc,#94a3b8)');
    placeAtom('H', w * 0.72, h * 0.55, 'radial-gradient(circle at 30% 30%,#f8fafc,#94a3b8)');
    showMsg('Chimchilab H ni O ga yaqinlashtiring → H₂O');
  }

  function setupMagnet() {
    clear();
    const w = innerWidth, h = innerHeight;
    const mag = el('div',
      'position:absolute;width:90px;height:40px;border-radius:8px;transform:translate(-50%,-50%);display:flex;overflow:hidden;border:2px solid #cbd5e1',
      '');
    mag.innerHTML = '<div style="flex:1;background:#ef4444;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">N</div><div style="flex:1;background:#3b82f6;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700">S</div>';
    mag.style.left = (w * 0.5) + 'px';
    mag.style.top = (h * 0.4) + 'px';
    ensureLayer().appendChild(mag);
    state.items.push({ el: mag, x: w * 0.5, y: h * 0.4, kind: 'magnet' });
    placeObj('Temir mix', w * 0.25, h * 0.65, true);
    placeObj('Nikel', w * 0.4, h * 0.72, true);
    placeObj('Plastik', w * 0.6, h * 0.65, false);
    placeObj('Yog‘och', w * 0.75, h * 0.72, false);
    showMsg('Magnitni yaqinlashtiring: temir/nikel tortiladi');
  }

  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function tryFormH2O() {
    const O = state.items.find(i => i.sym === 'O');
    const Hs = state.items.filter(i => i.sym === 'H');
    if (!O || Hs.length < 2) return;
    const near = Hs.filter(h => dist(h, O) < 70);
    if (near.length >= 2 && !state.molecule) {
      state.molecule = true;
      near.forEach(h => { h.x = O.x + (h === near[0] ? -36 : 36); h.y = O.y + 28; h.el.style.left = h.x + 'px'; h.el.style.top = h.y + 'px'; });
      showMsg('✓ H₂O molekula hosil bo‘ldi!');
      // bond lines
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('style', 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none');
      near.forEach(h => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', O.x); line.setAttribute('y1', O.y);
        line.setAttribute('x2', h.x); line.setAttribute('y2', h.y);
        line.setAttribute('stroke', 'rgba(180,240,255,.7)');
        line.setAttribute('stroke-width', '3');
        svg.appendChild(line);
      });
      layer.appendChild(svg);
    }
  }

  function applyMagnetForces() {
    const mag = state.items.find(i => i.kind === 'magnet');
    if (!mag) return;
    state.items.filter(i => i.kind === 'obj').forEach(o => {
      const d = dist(o, mag);
      if (o.magnetic && d < 140) {
        const f = (140 - d) / 140;
        o.x += (mag.x - o.x) * 0.08 * f;
        o.y += (mag.y - o.y) * 0.08 * f;
        o.el.style.left = o.x + 'px';
        o.el.style.top = o.y + 'px';
        o.el.style.boxShadow = '0 0 14px rgba(34,197,94,.7)';
      } else if (!o.magnetic && d < 100) {
        o.el.style.boxShadow = '0 0 10px rgba(239,68,68,.4)';
      } else {
        o.el.style.boxShadow = 'none';
      }
    });
  }

  function onHand(h) {
    if (mode === 'off' || !h || !h.has) {
      state.hold = null;
      return;
    }
    const x = h.x, y = h.y, pinch = !!h.pinch;

    if (mode === 'h2o') {
      if (pinch) {
        if (!state.hold) {
          const hit = state.items.find(i => i.kind === 'atom' && dist(i, { x, y }) < 40);
          if (hit) state.hold = hit;
        }
        if (state.hold) {
          state.hold.x = x; state.hold.y = y;
          state.hold.el.style.left = x + 'px';
          state.hold.el.style.top = y + 'px';
        }
      } else {
        if (state.hold) tryFormH2O();
        state.hold = null;
      }
    }

    if (mode === 'magnet') {
      const mag = state.items.find(i => i.kind === 'magnet');
      if (mag && pinch) {
        mag.x = x; mag.y = y;
        mag.el.style.left = x + 'px';
        mag.el.style.top = y + 'px';
      }
      applyMagnetForces();
    }

    // clear msg
    if (state.msg && Date.now() > state.msgT) {
      const m = layer && layer.querySelector('.hl-msg');
      if (m) m.remove();
      state.msg = '';
    }
  }

  function setMode(m) {
    mode = m || 'off';
    if (mode === 'off') {
      clear();
      if (layer) { layer.remove(); layer = null; }
      return;
    }
    ensureLayer();
    if (mode === 'h2o') setupH2O();
    else if (mode === 'magnet') setupMagnet();
  }

  window.OrvinHandLab = { setMode, onHand, getMode: () => mode };
})();
