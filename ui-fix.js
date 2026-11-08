/* ORVIN — mouse interaction fixes
   Ensure the profile opens when its icon is clicked. */
(function () {
  'use strict';
  if (window.__uiFixLoaded) return;
  window.__uiFixLoaded = true;

  /* ---- Profile icon: single click/tap ---- */
  // Pointer capture in the original code could prevent the click from reaching the button.
  const box = document.getElementById('gAuth');
  if (box) {
    let last = 0;
    const origToggle = () => window.toggleProfile;
    const tap = () => {
      const n = Date.now(); if (n - last < 350) return; last = n;
      const f = origToggle(); if (typeof f === 'function') f();
    };
    // Prevent duplicate activation from click plus pointerup.
    const wrapInt = setInterval(() => {
      if (!window.toggleProfile) return; clearInterval(wrapInt);
      const orig = window.toggleProfile; let t0 = 0;
      window.toggleProfile = function () { const n = Date.now(); if (n - t0 < 350) return; t0 = n; return orig.apply(this, arguments); };
      box.__wrapped = true;
    }, 200);
    const ptrs = new Set(); let multi = false, sx = 0, sy = 0, moved = false;
    box.addEventListener('pointerdown', e => { ptrs.add(e.pointerId); if (ptrs.size > 1) multi = true; else { multi = false; moved = false; sx = e.clientX; sy = e.clientY; } });
    box.addEventListener('pointermove', e => { if (Math.hypot(e.clientX - sx, e.clientY - sy) > 8) moved = true; });
    const end = e => {
      const wasTap = ptrs.size === 1 && !multi && !moved && e.type === 'pointerup';
      ptrs.delete(e.pointerId);
      if (!ptrs.size) multi = false;
      if (wasTap) tap();
    };
    box.addEventListener('pointerup', end); box.addEventListener('pointercancel', end);
  }
})();
