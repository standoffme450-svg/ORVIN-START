/* ORVIN — Kimyo moduli (asos): paragraflar + MS uslubidagi savollar
   PDF (Kimyo yopiq-ochiq / yozma) qiyinchiligiga moslash uchun asos */
(function () {
  'use strict';
  if (window.__msChem) return; window.__msChem = true;

  const SYLLABUS = {
    "Umumiy kimyo": [
      "Atom tuzilishi va elektron konfiguratsiya",
      "Mol, ekvivalent, Avogadro",
      "Valentlik va oksidlanish darajasi",
      "Reaksiya tenglamalari va hisoblashlar"
    ],
    "Noorganik kimyo": [
      "Kislota, asos, tuz",
      "Elektroliz",
      "Metalllar va amfoterlik",
      "Eritmalar va foiz konsentratsiya"
    ],
    "Organik kimyo": [
      "Alkan, alken, alkin",
      "Aromatik birikmalar",
      "Spirtlar va kislotalar",
      "Uglevodlar (glukoza)"
    ]
  };

  /* Namuna MS uslubidagi yopiq savollar (PDF dan) */
  const SAMPLE = [
    {
      s: "0,2 mol natriyl tetragidroksoaluminat tarkibidagi umumiy atomlar sonini toping.",
      o: ["12,04·10²⁴", "2·N_A", "2 mol", "10"],
      c: 0,
      x: "Na[Al(OH)₄]: 1 Na + 1 Al + 4 O + 4 H = 10 atom. 0,2·10·N_A = 2·N_A = 12,04·10²³ ≈ 1,204·10²⁴ (variant A shu tartibda)."
    },
    {
      s: "Kaliy gidroksid va ortofosfat kislota qanday mol nisbatda (KOH : H₃PO₄) reaksiyaga kirishganda hosil bo‘lgan tuzning ekvivalenti 87 ga teng bo‘ladi?",
      o: ["1:1", "3:1", "2:3", "2:1"],
      c: 3,
      x: "K₂HPO₄ uchun M=174, ekvivalent = M/2 = 87 → 2 KOH : 1 H₃PO₄."
    },
    {
      s: "Gidrid ionning elektron konfiguratsiyasi qaysi?",
      o: ["1s¹", "1s²", "[Ar] 3d⁵", "1s²2s²2p⁶"],
      c: 1,
      x: "H⁻ → 1s²."
    }
  ];

  /* Amaliy: paragraflarda chimchilab element qo‘shish uchun oddiy bank */
  const ELEMENTS = [
    { sym: 'H', name: 'Vodorod', z: 1 },
    { sym: 'C', name: 'Uglerod', z: 6 },
    { sym: 'N', name: 'Azot', z: 7 },
    { sym: 'O', name: 'Kislorod', z: 8 },
    { sym: 'Na', name: 'Natriy', z: 11 },
    { sym: 'Al', name: 'Alyuminiy', z: 13 },
    { sym: 'S', name: 'Oltingugurt', z: 16 },
    { sym: 'Cl', name: 'Xlor', z: 17 },
    { sym: 'K', name: 'Kaliy', z: 19 },
    { sym: 'Cu', name: 'Mis', z: 29 },
    { sym: 'Zn', name: 'Rux', z: 30 },
    { sym: 'Ba', name: 'Bariy', z: 56 }
  ];

  window.MSChem = {
    startH2OLab() { if (window.OrvinHandLab) window.OrvinHandLab.setMode('h2o'); },
    stopLab() { if (window.OrvinHandLab) window.OrvinHandLab.setMode('off'); },

    SYLLABUS,
    SAMPLE,
    ELEMENTS,
    /* keyingi bosqichda: 5 ta 45-savollik mock generator */
    ready: true
  };

  /* Chimchilab element chiqarish (kimyo/fizika darsi ochiq bo‘lsa) */
  window.__chemPinchSpawn = function (x, y) {
    if (!document.body.classList.contains('sci-on') && !document.getElementById('msPhys')) return;
    const el = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
    const d = document.createElement('div');
    d.textContent = el.sym;
    d.title = el.name + ' (Z=' + el.z + ')';
    d.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;transform:translate(-50%,-50%);z-index:60;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#eafcff;background:radial-gradient(circle at 30% 30%,#3b82f6,#0ea5e9 60%,#083344);border:1px solid rgba(180,240,255,.6);box-shadow:0 0 18px rgba(56,189,248,.55);pointer-events:none;transition:opacity .8s,transform .8s';
    document.body.appendChild(d);
    requestAnimationFrame(() => { d.style.opacity = '0'; d.style.transform = 'translate(-50%,-120%) scale(1.2)'; });
    setTimeout(() => d.remove(), 900);
  };
})();
