/* ORVIN — Kimyo MOCK bazasi: 5 ta mustaqil variant × 45 topshiriq = 100 ball (fizika/matematikadagidek).
   1–10 yopiq (1,3) · 11–32 yopiq (2,2) · 33–35 moslashtirish A–F (2,2) · 36–45 ochiq (3,2).
   Qiyinlik: BMBA namunalari darajasida (ko'p bosqichli hisoblar: atomlar soni, ekvivalent, konfiguratsiya, unum, elektroliz...). */
(function () {
  'use strict';
  if (window.__chemMockKit) return;
  let rng = Math.random;
  const mulberry = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const R = (a, b) => a + Math.floor(rng() * (b - a + 1)), P = a => a[R(0, a.length - 1)];
  const sh = a => { for (let i = a.length - 1; i > 0; i--) { const j = R(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fm = x => String(+(+x).toFixed(3)).replace('.', ',').replace('-', '−');
  const NQ = 45, NVAR = 5, MIN = (window.MSMock && window.MSMock.duration) || 150;
  const TYPE = i => i < 10 ? 'Y1' : i < 32 ? 'Y2' : i < 35 ? 'M' : 'O', PTSX = { Y1: 1.3, Y2: 2.2, M: 2.2, O: 3.2 };
  const LEV = [[70, 'A+'], [65, 'A'], [60, 'B+'], [55, 'B'], [50, 'C+'], [46, 'C']], levelOf = x => (LEV.find(l => x >= l[0]) || [0, 'none'])[1];
  const isOk = (q, a) => q.open ? (a != null && a !== '' && Math.abs(parseFloat(String(a).replace(',', '.').replace('−', '-')) - q.r) <= Math.abs(q.r) * 0.01 + 1e-9) : a === q.c;
  const SALTS = [['Na[Al(OH)₄]', 10], ['Al₂(SO₄)₃', 17], ['Ca₃(PO₄)₂', 13], ['K₂Cr₂O₇', 11], ['(NH₄)₂SO₄', 15], ['CuSO₄·5H₂O', 21], ['Fe(OH)₃', 7], ['Ca(HCO₃)₂', 13], ['K₄[Fe(CN)₆]', 17]];
  const GAS = [['H₂', 2], ['He', 4], ['CH₄', 16], ['N₂', 28], ['O₂', 32], ['CO₂', 44], ['SO₂', 64]];
  const EQ = [['H₂SO₄', 98, 2], ['Ca(OH)₂', 74, 2], ['Al₂(SO₄)₃', 342, 6], ['Na₂CO₃', 106, 2], ['NaOH', 40, 1], ['Mg(OH)₂', 58, 2]];
  const ISO = [['Cl', 17, 35], ['Cl', 17, 37], ['Fe', 26, 56], ['Cu', 29, 64], ['Zn', 30, 65], ['K', 19, 39], ['Br', 35, 80], ['Ag', 47, 108]];
  /* [mavzu, daraja(0 oson,1 qiyin), () => [savol, javob, birlik, qadamlar]] */
  const G = [
    ['Mol va molyar massa', 1, () => { const [f, a] = P(SALTS), n = R(1, 5) / 5; return [`${fm(n)} mol ${f} tarkibidagi umumiy atomlar soni necha N_A ga teng?`, n * a, 'N_A', [`1 formula birligida ${a} ta atom`, `N = ${fm(n)}·${a} = ${fm(n * a)} N_A`]]; }],
    ['Nisbiy atom va molekulyar massa', 0, () => { const [f, M] = P([['Al₂(SO₄)₃', 342], ['Ca₃(PO₄)₂', 310], ['(NH₄)₂SO₄', 132], ['CuSO₄·5H₂O', 250], ['K₂Cr₂O₇', 294], ['Ca(OH)₂', 74]]); return [`${f} ning nisbiy molekulyar massasi M_r?`, M, '', ['A_r lar yig‘indisi: H=1, C=12, N=14, O=16, S=32, Ca=40, Al=27, K=39, Cr=52, Cu=64, P=31']]; }],
    ['Konsentratsiya turlari (C_M, C_N, titr)', 1, () => { const [f, z] = P([['H₂SO₄', 2], ['Al₂(SO₄)₃', 6], ['Ca(OH)₂', 2], ['H₃PO₄', 3]]), c = P([.1, .2, .5, 1]); return [`${fm(c)} M ${f} eritmasining normal konsentratsiyasi (N)? (z=${z})`, c * z, 'N', [`C_N = C_M·z = ${fm(c)}·${z} = ${fm(c * z)}`]]; }],
    ['Mol va molyar massa', 0, () => { const [f, M, z] = P(EQ); return [`${f} (M=${M} g/mol) ning kimyoviy ekvivalent massasi (g/mol)?`, M / z, 'g/mol', [`E = M/z = ${M}/${z} = ${fm(M / z)}`]]; }],
    ['Massa ulush (ω)', 0, () => { const e = R(2, 10) * 50, w = P([5, 10, 15, 20, 25, 30, 40]); return [`${e} g ${w}% li eritma tayyorlash uchun kerak bo‘lgan tuz massasi?`, e * w / 100, 'g', [`m = ${e}·${w}/100 = ${fm(e * w / 100)} g`]]; }],
    ['Massa ulush (ω)', 1, () => { const m = R(1, 8) * 25; return [`${m} g CuSO₄·5H₂O (M=250) tarkibidagi CuSO₄ (M=160) massasi?`, m * .64, 'g', [`m = ${m}·160/250 = ${fm(m * .64)} g`]]; }],
    ['Massa ulush (ω)', 1, () => { const m = R(1, 10) * 4, v = P([.5, 1, 2]); return [`${m} g NaOH (M=40) suvda eritilib ${fm(v)} l eritma olindi. Molyar konsentratsiya (mol/l)?`, m / 40 / v, 'mol/l', [`n = ${m}/40 = ${fm(m / 40)} mol`, `C = n/V = ${fm(m / 40 / v)}`]]; }],
    ['Massa ulush (ω)', 1, () => { const c = P([2, 4, 6, 8, 10, 20]), k = P([2, 4, 5]); return [`${c} mol/l li eritma ${k} marta suyultirildi (hajm ${k} marta oshdi). Yangi konsentratsiya (mol/l)?`, c / k, 'mol/l', [`C₁V₁ = C₂V₂ ⇒ C₂ = ${c}/${k} = ${fm(c / k)}`]]; }],
    ['Gazlarning molyar hajmi', 0, () => { const m = R(1, 10) * 10; return [`${m} g CaCO₃ (M=100) kislota bilan to‘liq reaksiyaga kirishsa, n.sh. da CO₂ hajmi (l)?`, m / 100 * 22.4, 'l', [`n(CO₂) = ${m}/100 = ${fm(m / 100)} mol`, `V = n·22,4 = ${fm(m / 100 * 22.4)} l`]]; }],
    ['Reaksiya unumi', 0, () => { const t = R(2, 10) * 10, e = P([60, 70, 75, 80, 90]); return [`Nazariy massa ${t} g, amaliy massa ${t * e / 100} g. Reaksiya unumi (%)?`, e, '%', [`η = ${t * e / 100}/${t}·100% = ${e}%`]]; }],
    ['Reaksiya unumi', 1, () => { const h = R(2, 10), o = R(1, 6), n = Math.min(h, 2 * o); return [`${h} mol H₂ va ${o} mol O₂ reaksiyaga kirishdi (2H₂+O₂→2H₂O). Hosil bo‘lgan suv massasi (g)?`, n * 18, 'g', [`H₂ ga: ${h} mol; O₂ ga: ${2 * o} mol — kami: ${n} mol`, `m = ${n}·18 = ${n * 18} g`]]; }],
    ['pH va muhit', 0, () => { const n = R(1, 6), b = rng() < .5; return b ? [`[OH⁻] = 10⁻${n} mol/l bo‘lgan eritma pH i?`, 14 - n, '', [`pOH = ${n}`, `pH = 14 − ${n} = ${14 - n}`]] : [`[H⁺] = 10⁻${n} mol/l bo‘lgan eritma pH i?`, n, '', [`pH = −lg[H⁺] = ${n}`]]; }],
    ['Gazlar aralashmasi', 1, () => { const [a, M1] = P(GAS), [b, M2] = P(GAS.filter(g => g[0] !== a)), f = P([20, 25, 40, 50, 60, 75]); return [`Aralashma: ${f}% ${a} va ${100 - f}% ${b} (hajmiy). O‘rtacha molyar massa?`, f / 100 * M1 + (100 - f) / 100 * M2, 'g/mol', [`M = ${f / 100}·${M1} + ${(100 - f) / 100}·${M2}`, `M = ${fm(f / 100 * M1 + (100 - f) / 100 * M2)}`]]; }],
    ['Gazlarning nisbiy zichligi', 0, () => { const M = P([16, 28, 32, 44, 64, 34, 30]); return [`Molyar massasi ${M} g/mol bo‘lgan gazning vodorodga nisbatan zichligi?`, M / 2, '', [`D = ${M}/2 = ${fm(M / 2)}`]]; }],
    ['Faraday qonuni', 1, () => { const cu = rng() < .5, k = R(1, 5), I = R(1, 5), t = 965 * k, M = cu ? 64 : 108, z = cu ? 2 : 1, m = M * I * t / (z * 96500); return [`${cu ? 'CuSO₄' : 'AgNO₃'} eritmasi ${I} A tok bilan ${t} s elektroliz qilindi. Katodda ajralgan metall massasi (g)? (M=${M}, F=96500)`, m, 'g', [`m = M·I·t/(z·F) = ${M}·${I}·${t}/(${z}·96500)`, `m = ${fm(m)} g`]]; }],
    ['Vant-Goff qoidasi', 1, () => { const g = P([2, 3, 4]), d = P([10, 20, 30]); return [`γ = ${g}. Harorat ${d} °C ga oshirilsa, reaksiya tezligi necha marta ortadi?`, Math.pow(g, d / 10), 'marta', [`v₂/v₁ = γ^(Δt/10) = ${g}^${d / 10} = ${Math.pow(g, d / 10)}`]]; }],
    ['Vant-Goff qoidasi', 1, () => { const a = P([1, 2]), b = P([1, 2]), x = P([2, 3]), y = P([2, 3]); return [`v = k·[A]^${a}·[B]^${b}. [A] ${x} marta, [B] ${y} marta oshirilsa, tezlik necha marta ortadi?`, Math.pow(x, a) * Math.pow(y, b), 'marta', [`${x}^${a}·${y}^${b} = ${Math.pow(x, a) * Math.pow(y, b)}`]]; }],
    ['Proton, neytron, elektron', 0, () => { const [s, z, a] = P(ISO); return [`${a}${s} (Z=${z}) atomida neytronlar soni?`, a - z, 'ta', [`n = A − Z = ${a} − ${z} = ${a - z}`]]; }],
    ['Muvozanat konstantasi', 1, () => { const c = R(1, 4), a = R(1, 3), b = R(1, 3); return [`A + B ⇌ 2C muvozanatda [A]=${a}, [B]=${b}, [C]=${c} mol/l. Muvozanat konstantasi?`, c * c / (a * b), '', [`K = [C]²/([A][B]) = ${c * c}/${a * b} = ${fm(c * c / (a * b))}`]]; }],
    ['Alkanlar', 0, () => { const n = R(2, 9); return [`Alkanning molyar massasi ${14 * n + 2} g/mol. Uglerod atomlari soni?`, n, 'ta', [`14n + 2 = ${14 * n + 2} ⇒ n = ${n}`]]; }],
    ['Alkenlar', 1, () => { const n = R(2, 6); return [`Alkenning molyar massasi ${14 * n} g/mol bo‘lsa, 1 molida jami nechta atom bor? (N_A ga nisbatan)`, 3 * n, 'N_A', [`CₙH₂ₙ: n = ${n}, atomlar = 3n = ${3 * n}`]]; }],
    ['Glyukoza', 1, () => { const k = R(1, 5); return [`${180 * k} g glyukoza spirtli bijg‘ishda necha gramm etanol (M=46) beradi? (C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂)`, 92 * k, 'g', [`n = ${k} mol, etanol ${2 * k} mol`, `m = ${2 * k}·46 = ${92 * k} g`]]; }],
    ['Formulani topish', 1, () => { const n = R(2, 6); return [`Uglevodorod tarkibida ω(C) = 85,7%, M = ${14 * n} g/mol. Molekuladagi C atomlari soni?`, n, 'ta', ['C:H = 85,7/12 : 14,3/1 = 1 : 2', `CₙH₂ₙ, 14n = ${14 * n} ⇒ n = ${n}`]]; }]
  ];
  /* konsentratsion savollar: [savol, to'g'ri, x, y, z, mavzu] */
  const C = [
    ['Gidrid ionning (H⁻) elektron konfiguratsiyasi?', '1s²', '1s¹', '[Ar]3d⁵', '1s²2s²2p⁶', 'Elektron konfiguratsiya'],
    ['Na⁺ ionining elektron konfiguratsiyasi?', '1s²2s²2p⁶', '1s²2s²2p⁶3s¹', '1s²2s²2p⁵', '[Ar]', 'Elektron konfiguratsiya'],
    ['Qaysi zarra Ne bilan bir xil konfiguratsiyaga ega?', 'F⁻', 'Cl⁻', 'K⁺', 'S²⁻', 'Elektron konfiguratsiya'],
    ['KOH : H₃PO₄ = 2 : 1 nisbatda qaysi tuz hosil bo‘ladi?', 'K₂HPO₄', 'KH₂PO₄', 'K₃PO₄', 'KPO₃', 'Kislotalar'],
    ['Eng kuchli oksidlovchi qaysi?', 'F₂', 'Cl₂', 'Br₂', 'I₂', 'Galogenlar'],
    ['Qaysi birikmada S ning oksidlanish darajasi +4?', 'Na₂SO₃', 'Na₂SO₄', 'Na₂S', 'SO₃', 'Oksidlovchi va qaytaruvchi'],
    ['Qaysi gaz suvda eng yaxshi eriydi?', 'NH₃', 'N₂', 'H₂', 'CH₄', 'Azot va ammiak'],
    ['sp² gibridlanishda molekula geometriyasi?', 'Tekis uchburchak', 'Tetraedr', 'Chiziqli', 'Oktaedr', 'Gibridlanish va geometriya'],
    ['Qaysi birikmada donor-akseptor bog‘ bor?', 'NH₄⁺', 'CH₄', 'H₂O', 'N₂', 'Kovalent bog‘lanish'],
    ['Amfoter gidroksid qaysi?', 'Zn(OH)₂', 'NaOH', 'Ca(OH)₂', 'KOH', 'Oksidlar'],
    ['Qaysi tuz suvda gidrolizlanib ishqoriy muhit beradi?', 'Na₂CO₃', 'NH₄Cl', 'NaCl', 'KNO₃', 'Tuzlar gidrolizi'],
    ['Elektrolizda katodda nima sodir bo‘ladi?', 'Qaytarilish', 'Oksidlanish', 'Neytrallanish', 'Gidroliz', 'Faraday qonuni'],
    ['Qaysi ion kumush nitrat bilan oq cho‘kma beradi?', 'Cl⁻', 'NO₃⁻', 'Na⁺', 'SO₄²⁻', 'Sifat analizi'],
    ['SO₄²⁻ ioniga reaktiv?', 'BaCl₂', 'AgNO₃', 'KSCN', 'NaOH', 'Sifat analizi'],
    ['Markovnikov qoidasi bo‘yicha CH₃–CH=CH₂ + HBr mahsuloti?', '2-bromopropan', '1-bromopropan', 'Propan', 'Allilbromid', 'Alkenlar'],
    ['Benzol uchun xos reaksiya?', 'Almashinish', 'Biriktirish (oson)', 'Polimerlanish', 'Parchalanish', 'Benzol (arenlar)'],
    ['Aldegidning «kumush ko‘zgu» reaksiyasida nima hosil bo‘ladi?', 'Karbon kislota va Ag', 'Spirt va Ag', 'Keton', 'Efir', 'Aldegidlar'],
    ['Glitseringa sifat reaksiya?', 'Cu(OH)₂ — to‘q ko‘k eritma', 'FeCl₃ — binafsha', 'I₂ — ko‘k', 'Br₂ — oq cho‘kma', 'Spirtlar'],
    ['Oqsilga biuret reaksiyasi natijasi?', 'Binafsha rang', 'Qizil cho‘kma', 'Ko‘k rang', 'Oq cho‘kma', 'Oqsillar'],
    ['Qaysi birikma amfoter xossaga ega?', 'Aminokislota', 'Spirt', 'Alkan', 'Efir', 'Aminokislotalar va peptid'],
    ['Suvning ion ko‘paytmasi 25 °C da?', '10⁻¹⁴', '10⁻⁷', '10⁻¹', '10⁻²⁸', 'pH va muhit'],
    ['Katalizator reaksiyada nimani o‘zgartiradi?', 'Tezlikni', 'Muvozanat konstantasini', 'Mahsulot unumini', 'Reaksiya issiqligini', 'Kataliz'],
    ['Qaysi metall kerosin ostida saqlanadi?', 'Na', 'Fe', 'Cu', 'Au', 'Ishqoriy metallar'],
    ['Eng elektromanfiy element?', 'F', 'O', 'Cl', 'N', 'Davriy qonun va xossalar'],
    ['Vodorod bog‘ qaysi birikmada hosil bo‘ladi?', 'H₂O', 'CH₄', 'H₂S', 'HCl (gaz)', 'Vodorod bog‘lanish']
  ];
  const MSETS = [
    ['Modda sinfini tanlang', ['Asosli oksid', 'Kislotali oksid', 'Amfoter oksid', 'Kuchli kislota', 'Ishqor', 'Kuchsiz kislota'], [['CaO', 0], ['SO₃', 1], ['Al₂O₃', 2], ['HNO₃', 3], ['KOH', 4], ['H₂CO₃', 5]], 'Oksidlar'],
    ['Organik birikma sinfini tanlang', ['Alkan', 'Alken', 'Alkin', 'Spirt', 'Aldegid', 'Karbon kislota'], [['C₂H₆', 0], ['C₂H₄', 1], ['C₂H₂', 2], ['C₂H₅OH', 3], ['CH₃CHO', 4], ['CH₃COOH', 5]], 'Alkanlar'],
    ['Oksidlanish darajasini tanlang', ['+7', '+6', '+5', '+4', '+2', '−3'], [['KMnO₄ dagi Mn', 0], ['H₂SO₄ dagi S', 1], ['HNO₃ dagi N', 2], ['CO₂ dagi C', 3], ['FeO dagi Fe', 4], ['NH₃ dagi N', 5]], 'Valentlik va oksidlanish darajasi'],
    ['Aniqlash uchun reaktivni tanlang', ['AgNO₃', 'BaCl₂', 'KSCN', 'I₂', 'Cu(OH)₂', 'FeCl₃'], [['Cl⁻ ioni', 0], ['SO₄²⁻ ioni', 1], ['Fe³⁺ ioni', 2], ['Kraxmal', 3], ['Glitserin', 4], ['Fenol', 5]], 'Sifat analizi'],
    ['Bog‘lanish turini tanlang', ['Ionli', 'Kovalent qutbsiz', 'Kovalent qutbli', 'Metall', 'Vodorod', 'Donor-akseptor'], [['NaCl', 0], ['O₂', 1], ['HCl', 2], ['Fe', 3], ['H₂O molekulalari orasida', 4], ['NH₄⁺ dagi 4-bog‘', 5]], 'Kovalent bog‘lanish']
  ];
  const num = (g, tp) => { const [s, a, u, x] = g, uu = u ? ' ' + u : '', ca = fm(a) + uu, set = [ca]; [a * 2, a / 2, a + R(1, 3), Math.abs(a - R(1, 3)), a * 10, a / 10, a + 5, a + 7, a + 11, a * 3, a * 4].forEach(v => { const f = fm(v) + uu; if (v > 0 && !set.includes(f) && set.length < 4) set.push(f); }); let k = 1; while (set.length < 4) set.push(fm(a + 13 * k++) + uu); const o = sh(set.slice()); return { tp, s, o, c: o.indexOf(ca), x: x.concat('Javob: ' + ca) }; };
  const openQ = (g, tp) => { const [s, a, u, x] = g; return { tp, s, open: 1, r: +a, u, o: [], c: -1, x: x.concat('Javob: ' + fm(a) + (u ? ' ' + u : '')) }; };
  const T = () => (window.__chemTopics || []);
  const byTopic = t => G.filter(g => g[0] === t);
  const conceptPool = () => { const out = C.map(c => ({ tp: c[5], s: c[0], a: c[1], w: c.slice(2, 5) })); T().forEach(t => { const q = t.q; if (q) { const a = q[1][q[2]], w = q[1].filter((_, i) => i !== q[2]); out.push({ tp: t.t, s: q[0], a, w, r: t.r }); } }); return out; };
  const mc = (c, all) => { const w = c.w.slice(); if (w.length < 3) { const kd = x => /^[−+\-]?[\d,.]+( ?(N_A|N|l|g|mol|marta|ta|%|g\/mol|mol\/l|ml|C))?$/.test(x) ? 'n' : /[₀-₉\d]/.test(x) ? 'f' : 'w', same = z => kd(z) === kd(c.a) && z.length < c.a.length * 3 + 4 && z.length * 3 + 4 > c.a.length; const extra = sh([].concat(...all.filter(z => z !== c).map(z => [z.a]))).filter(x => x !== c.a && !w.includes(x) && same(x)); while (w.length < 3 && extra.length) w.push(extra.pop()); } const o = sh([c.a].concat(w.slice(0, 3))); return { tp: c.tp, s: c.s, o, c: o.indexOf(c.a), x: ['To‘g‘ri javob: ' + c.a].concat(c.r ? [c.r] : []) }; };
  const USED = new Set(), VARS = {};
  function genVariant(k) {
    const old = rng; rng = mulberry(k * 7919 + 211);
    try {
      const pool = sh(conceptPool().filter(c => !USED.has(c.s))), all = conceptPool(), sets = sh(MSETS.slice()), qs = [];
      let ci = 0;
      for (let i = 0; i < NQ; i++) {
        const ty = TYPE(i); let q = null;
        if (ty === 'M') { const m = sets[i - 32], its = sh(m[2].slice()), it = its.find(x => !USED.has(`«${x[0]}» — ${m[0]}`)) || its[0], idx = sh([0, 1, 2, 3, 4, 5]); q = { tp: m[3], s: `«${it[0]}» — ${m[0]}`, o: idx.map(j => m[1][j]), c: idx.indexOf(it[1]), x: ['To‘g‘ri javob: ' + m[1][it[1]]] }; }
        else if (ty === 'O') { for (let tr = 0; tr < 40 && !q; tr++) { const g = P(G), c = openQ(g[2](), g[0]); if (tr === 39 || !(USED.has(c.s))) q = c; } }
        else {
          const wantConcept = ty === 'Y1' ? i % 2 === 0 : i % 3 === 0;
          if (wantConcept && ci < pool.length) q = mc(pool[ci++], all);
          else for (let tr = 0; tr < 40 && !q; tr++) { const g = P(ty === 'Y1' ? G.filter(z => !z[1]) : G), c = num(g[2](), g[0]); if (tr === 39 || !USED.has(c.s)) q = c; }
        }
        if (!q) q = openQ(G[0][2](), G[0][0]);
        q.ty = ty; q.pts = PTSX[ty]; USED.add(q.s); qs.push(q);
      }
      return qs;
    } finally { rng = old; }
  }
  const variant = k => { for (let i = 1; i <= k; i++) if (!VARS[i]) VARS[i] = genVariant(i); return VARS[k]; };
  /* o'rganish bo'limi uchun: mavzuga mos yangi hisoblash savoli (yoki null) */
  const genQ = (title, hard) => { const g = byTopic(title).filter(z => hard ? z[1] : true); if (!g.length) return null; const old = rng; rng = Math.random; try { const x = P(g); return num(x[2](), title); } finally { rng = old; } };
  window.__chemMockKit = { variant, NVAR, NQ, MIN, TYPE, PTSX, levelOf, isOk, get ALLT() { return T(); }, fm, genQ };
})();
