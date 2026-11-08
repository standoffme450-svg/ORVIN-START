/* ORVIN — KIMYO: O'RGANISH + MOCK TEST (fizika/matematika dizaynida). Mundarija: BMBA spetsifikatsiyasi.
   Har mavzu: 1) qoida 2) namuna 3) mashq (3 ketma-ket to'g'ri = o'zlashtirildi) 4) MS savol 5) 🖐 qo'l bilan amaliy lab */
(function () {
  'use strict';
  if (window.__msChemLearn) return; window.__msChemLearn = true;
  const K = 'data-keep-uz="true"', $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const fm = x => String(+(+x).toFixed(3)).replace('.', ',');
  const sh = a => a.map(x => [Math.random(), x]).sort((u, v) => u[0] - v[0]).map(x => x[1]);
  const B = {
    'I. UMUMIY KIMYO': [
      ['Modda: toza modda va aralashma', 'Toza modda bir xil tarkibli (H₂O, NaCl). Aralashma bir necha moddadan iborat (havo, tuzli suv) va fizik usulda ajratiladi.', 'Distillangan suv — toza modda; dengiz suvi — aralashma.', ['Qaysi biri toza modda?', ['Havo', 'Distillangan suv', 'Tuproq'], 1], ['b', 'O', ['H', 'H'], 'H₂O']],
      ['Mol va molyar massa', 'n = m/M; N = n·N_A, N_A = 6,02·10²³ 1/mol.', '18 g suv: n = 18/18 = 1 mol.', ['36 g suv (M=18) necha mol?', ['1 mol', '2 mol', '3 mol'], 1], null],
      ['Gazlarning molyar hajmi', 'Normal sharoitda 1 mol gaz 22,4 l hajm egallaydi: V = n·22,4.', '2 mol gaz → 44,8 l.', ['0,5 mol gaz n.sh. da hajmi?', ['11,2 l', '22,4 l', '44,8 l'], 0], null]
    ],
    'II. ATOM TUZILISHI VA DAVRIY QONUN': [
      ['Proton, neytron, elektron', 'Z = protonlar soni = neytral atomda elektronlar soni; A = p + n.', '²³Na: Z=11, A=23 → neytron = 12.', ['³⁵Cl atomida neytronlar soni?', ['17', '18', '35'], 1], null],
      ['Elektron konfiguratsiya', 'To‘lish tartibi (Klechkovskiy): 1s 2s 2p 3s 3p 4s 3d… Tashqi qavat elektronlari valent elektronlardir.', 'Na: 1s²2s²2p⁶3s¹ → tashqi qavatda 1 ta e⁻.', ['Cl (Z=17) tashqi qavatida nechta elektron?', ['5', '7', '17'], 1], null]
    ],
    'III. KIMYOVIY BOG‘LANISH': [
      ['Kovalent bog‘lanish', 'Umumiy elektron juftlar hosil bo‘lishi. Qutbsiz: bir xil atomlar (H₂); qutbli: turli elektromanfiylik (HCl, H₂O).', 'N atomi 3 ta H bilan 3 ta umumiy juft → NH₃.', ['NH₃ da N—H bog‘lar soni?', ['2', '3', '4'], 1], ['b', 'N', ['H', 'H', 'H'], 'NH₃']],
      ['Ionli bog‘lanish', 'Metall e⁻ beradi (kation), metallmas qabul qiladi (anion); ionlar elektrostatik tortishadi.', 'Na → Na⁺ + e⁻; Cl + e⁻ → Cl⁻; NaCl.', ['Qaysi birikmada ionli bog‘lanish bor?', ['H₂O', 'NaCl', 'CO₂'], 1], ['b', 'Na', ['Cl'], 'NaCl']],
      ['Gibridlanish va geometriya', 'sp³ — tetraedr (109°28′), sp² — tekis uchburchak (120°), sp — chiziqli (180°).', 'CH₄: C atomi sp³, 4 ta σ-bog‘.', ['CH₄ da C gibridlanishi?', ['sp', 'sp²', 'sp³'], 2], ['b', 'C', ['H', 'H', 'H', 'H'], 'CH₄']]
    ],
    'IV. KINETIKA VA MUVOZANAT': [
      ['Vant-Goff qoidasi', 'Har 10 °C da tezlik γ marta ortadi: v₂ = v₁·γ^(Δt/10).', 'γ=2, Δt=20 → 2² = 4 marta.', ['γ=2, harorat 30 °C ko‘tarilsa, tezlik necha marta ortadi?', ['6', '8', '9'], 1], null],
      ['Le-Shatelye prinsipi', 'Muvozanatga ta‘sir qilinsa, sistema ta‘sirni kamaytiradigan tomonga siljiydi. Bosim oshsa — gaz molekulalari kam tomonga.', 'N₂ + 3H₂ ⇌ 2NH₃: 4 mol → 2 mol, bosim oshsa → o‘ngga.', ['N₂+3H₂⇌2NH₃ da bosim oshirilsa muvozanat?', ['Chapga', 'O‘ngga', 'O‘zgarmaydi'], 1], null]
    ],
    'V. ERITMALAR VA ELEKTROLITIK DISSOTSIATSIYA': [
      ['Massa ulush (ω)', 'ω = m(modda) / m(eritma) · 100%. m(eritma) = m(modda) + m(erituvchi).', '20 g tuz + 80 g suv → ω = 20/100 = 20%.', ['20 g tuz 80 g suvda. ω?', ['20%', '25%', '80%'], 0], null],
      ['pH va muhit', 'pH = −lg[H⁺]. pH<7 kislotali, =7 neytral, >7 ishqoriy.', '[H⁺]=10⁻³ → pH=3.', ['[H⁺]=10⁻³ mol/l bo‘lsa pH?', ['3', '11', '−3'], 0], null]
    ],
    'VI. OQR VA ELEKTROLIZ': [
      ['Oksidlovchi va qaytaruvchi', 'Oksidlovchi e⁻ qabul qiladi (qaytariladi); qaytaruvchi e⁻ beradi (oksidlanadi).', 'Zn⁰ → Zn²⁺ + 2e⁻: Zn — qaytaruvchi.', ['Fe³⁺ + e⁻ → Fe²⁺ da Fe³⁺ qanday rol o‘ynaydi?', ['Qaytaruvchi', 'Oksidlovchi', 'Katalizator'], 1], null],
      ['Faraday qonuni', 'm = M·I·t / (n·F), F = 96500 C/mol. Q = I·t.', 'I=2 A, t=965 s → Q=1930 C = 0,02 mol e⁻.', ['1 mol elektron zaryadi?', ['96500 C', '9650 C', '6,02·10²³ C'], 0], null]
    ],
    'VII. ANORGANIK BIRIKMALAR SINFLARI': [
      ['Oksidlar', 'Asosli (Na₂O, CaO), kislotali (CO₂, SO₃), amfoter (Al₂O₃, ZnO) va befarq (CO, NO).', 'CO₂ + H₂O ⇌ H₂CO₃.', ['Amfoter oksid qaysi?', ['CaO', 'Al₂O₃', 'SO₃'], 1], ['b', 'C', ['O', 'O'], 'CO₂']],
      ['Kislotalar', 'Kislota — H⁺ beradi. Kuchli: HCl, H₂SO₄, HNO₃. Kuchsiz: H₂CO₃, H₂S, CH₃COOH.', 'HCl: H va Cl kovalent qutbli bog‘.', ['Qaysi kislota kuchsiz?', ['HCl', 'H₂CO₃', 'HNO₃'], 1], ['b', 'Cl', ['H'], 'HCl']]
    ],
    'VIII. METALLMASLAR': [
      ['Galogenlar', 'F, Cl, Br, I: yuqoridan pastga oksidlovchilik kamayadi. F₂ — eng kuchli oksidlovchi.', 'Cl₂ + 2KBr → 2KCl + Br₂.', ['Eng kuchli oksidlovchi galogen?', ['I₂', 'Cl₂', 'F₂'], 2], ['b', 'Cl', ['Cl'], 'Cl₂']],
      ['Azot va ammiak', 'N₂ havoning ~78% i. Ammiak sintezi: N₂ + 3H₂ ⇌ 2NH₃ (Gaber).', 'NH₃ suvda yaxshi eriydi, ishqoriy muhit.', ['Havoda eng ko‘p gaz?', ['O₂', 'N₂', 'CO₂'], 1], ['b', 'N', ['H', 'H', 'H'], 'NH₃']]
    ],
    'IX. METALLAR': [
      ['Korroziya', 'Temir zanglashi uchun O₂ va nam (H₂O) kerak. Himoya: bo‘yash, rux bilan qoplash.', '4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃.', ['Temir zanglashi uchun nima kerak?', ['Faqat O₂', 'O₂ va H₂O', 'Faqat H₂O'], 1], null],
      ['Alyuminiy — amfoter', 'Al(OH)₃ ham kislota, ham ishqor bilan reaksiyaga kirishadi.', 'Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O.', ['Al(OH)₃ nima bilan reaksiyaga kirishadi?', ['Faqat kislota', 'Kislota va ishqor', 'Hech qaysi'], 1], ['b', 'Al', ['Cl', 'Cl', 'Cl'], 'AlCl₃']]
    ],
    'X. ORGANIK KIMYO NAZARIYASI': [
      ['Izomeriya', 'Izomerlar — formulasi bir xil, tuzilishi har xil moddalar.', 'C₄H₁₀: n-butan va izobutan.', ['C₄H₁₀ nechta izomerga ega?', ['1', '2', '3'], 1], null]
    ],
    'XI. UGLEVODORODLAR': [
      ['Alkanlar', 'Umumiy formula CₙH₂ₙ₊₂; to‘yingan, o‘rin olish reaksiyalari.', 'n=3 → C₃H₈ (propan).', ['C₃ alkan formulasi?', ['C₃H₆', 'C₃H₈', 'C₃H₄'], 1], null],
      ['Alkenlar', 'Umumiy formula CₙH₂ₙ; biriktirish reaksiyasi (Markovnikov: H ko‘p gidrogenlangan C ga).', 'CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br.', ['Alkenning umumiy formulasi?', ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂'], 1], null]
    ],
    'XII. KISLORODLI ORGANIK BIRIKMALAR': [
      ['Spirtlar', 'Funksional guruh −OH. Etanol C₂H₅OH, glitserin — uch atomli.', 'C₂H₅OH + Na → C₂H₅ONa + ½H₂.', ['Etanolning funksional guruhi?', ['−OH', '−COOH', '−CHO'], 0], null],
      ['Aldegidlar', 'Funksional guruh −CHO. «Kumush ko‘zgu» va Cu(OH)₂ bilan reaksiya aldegidga sifat reaksiyasi.', 'CH₃CHO + Ag₂O → CH₃COOH + 2Ag↓.', ['«Kumush ko‘zgu» qaysi sinfga sifat reaksiya?', ['Spirt', 'Aldegid', 'Keton'], 1], null]
    ],
    'XIII. UGLEVODLAR': [
      ['Glyukoza', 'C₆H₁₂O₆. Bijg‘ish: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.', '180 g glyukozadan 92 g etanol (nazariy).', ['Glyukoza formulasi?', ['C₆H₁₂O₆', 'C₁₂H₂₂O₁₁', '(C₆H₁₀O₅)ₙ'], 0], null]
    ],
    'XIV. AZOTLI ORGANIK VA YMB': [
      ['Aminokislotalar va peptid', 'Aminokislota −NH₂ va −COOH tutadi (amfoter). Peptid bog‘: −CO−NH−.', 'Glitsin: NH₂−CH₂−COOH.', ['Peptid bog‘ qaysi?', ['−CO−NH−', '−CO−O−', '−N=N−'], 0], null]
    ],
    'XV. AMALIY MASALALAR': [
      ['Reaksiya unumi', 'η = m(amaliy)/m(nazariy)·100%.', 'Nazariy 50 g, amaliy 40 g → η = 80%.', ['Nazariy 50 g, amaliy 40 g. Unum?', ['80%', '125%', '90%'], 0], null]
    ]
  };

  const M = window.CHEM_MORE || {}, X = window.CHEM_LABS || {};
  Object.keys(M).forEach(b => { B[b] = (B[b] || []).concat(M[b]); });
  Object.keys(B).forEach(b => B[b].forEach(t => { t[4] = X[t[0]] || ((t[4] && t[4][0] === 'b') ? t[4] : null) || autoLab(t, b); }));
  function autoLab(t, b) { return ['b', 'Rx', ['A', 'B'], 'AB', '✓ Reagentlar birlashdi: ' + t[0]]; }
  const BN = Object.keys(B), ALL = []; BN.forEach(b => B[b].forEach(t => { t.b = b; ALL.push(t); }));
  window.__chemTopics = ALL.map(t => ({ t: t[0], q: t[3], r: t[1] }));
  let PR = {}; try { PR = JSON.parse(localStorage.getItem('orvin_chem_progress') || '{}') || {}; } catch (_) { } PR.m = PR.m || {};
  const save = () => { try { localStorage.setItem('orvin_chem_progress', JSON.stringify(PR)); } catch (_) { } };
  const st = t => Math.min(3, PR.m[t[0]] || 0), done = t => st(t) >= 3;
  const S = { tab: 'learn', b: null, t: null, pr: null, ms: null, ex: null, hold: null, L: null };

  const css = document.createElement('style');
  css.textContent = `#msChem{position:fixed;inset:0;z-index:10005;display:none;flex-direction:column;color:#eafaff;font-family:system-ui,sans-serif;background:linear-gradient(rgba(1,5,14,.9),rgba(1,5,14,.97)),#030814;contain:layout paint}#msChem.show{display:flex}
#msChem .mt{display:flex;align-items:center;gap:10px;padding:10px 14px;padding-top:calc(10px + env(safe-area-inset-top,0px));background:rgba(4,12,28,.85);border-bottom:1px solid rgba(130,200,255,.3)}#msChem .mt b{font-size:15px;letter-spacing:2px}#msChem .mt .olang{margin-left:auto}
#msChem button{font:inherit;color:#dff;border:1px solid #7cf;border-radius:10px;background:rgba(0,60,90,.6);padding:8px 12px;font-weight:700;cursor:pointer}#msChem button.pri{background:#0ff;color:#012;border-color:#0ff}
#msChem .tabs{display:none;gap:8px;padding:8px 12px}#msChem .tabs button{flex:1}#msChem .tabs button.on{background:#0ff;color:#012}
#msChem .cols{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px}
#msChem section{overflow:auto;min-height:0;padding:12px;border:1px solid rgba(130,200,255,.35);border-radius:14px;background:rgba(4,14,32,.66)}
#msChem h3{font-size:13px;letter-spacing:2px;margin-bottom:10px;color:#7df9ff}
#msChem .blk{margin-bottom:8px;border:1px solid rgba(130,200,255,.3);border-radius:10px;overflow:hidden}
#msChem .bh{width:100%;text-align:left;border:0;border-radius:0;display:flex;justify-content:space-between;gap:8px;background:rgba(0,40,70,.55)}
#msChem .tp{width:100%;text-align:left;border:0;border-radius:0;background:transparent;border-top:1px solid rgba(130,200,255,.15);display:flex;justify-content:space-between;gap:8px;font-weight:500}
#msChem .ls{padding:10px;background:rgba(0,20,40,.6);border-top:1px solid rgba(130,200,255,.15);font-size:14px;line-height:1.5}
#msChem .op{display:block;width:100%;text-align:left;margin:6px 0;font-weight:500}#msChem .op.ok{background:#0a7a4a;border-color:#4fa}#msChem .op.no{background:#7a1a2a;border-color:#f78}#msChem .op.sel{background:#0ff;color:#012}
#msChem .qn{display:grid;grid-template-columns:repeat(8,1fr);gap:4px;margin:8px 0}#msChem .qn button{padding:5px 0;font-size:12px}#msChem .qn button.dn{background:#06507a}#msChem .qn button.cu{background:#0ff;color:#012}
#msChem .qs{font-size:16px;line-height:1.5;margin:10px 0}#msChem .row{display:flex;gap:8px;justify-content:space-between;align-items:center;margin-top:10px}#msChem .big{font-size:34px;font-weight:800;color:#0ff}
#msChem .ov{margin-bottom:10px;padding:10px;border:1px solid rgba(125,249,255,.3);border-radius:12px;background:rgba(0,40,60,.5)}#msChem .pb{height:8px;border-radius:6px;background:rgba(255,255,255,.12);margin:6px 0 8px;overflow:hidden}#msChem .pb i{display:block;height:100%;background:linear-gradient(90deg,#0ff,#4fa)}#msChem .ov .pri{width:100%;text-align:left}
#msChem .stp{margin:14px 0 6px;padding:5px 9px;border-left:3px solid #0ff;background:rgba(0,255,255,.08);font-weight:800;font-size:13px;color:#7df9ff}
#msChem .idea{padding:8px 10px;border-radius:10px;background:rgba(255,220,120,.1);border:1px solid rgba(255,220,120,.3)}
#msChem .sol{margin:8px 0;padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.28);border:1px dashed rgba(125,249,255,.35);white-space:pre-wrap;font:600 14px/1.6 ui-monospace,Menlo,monospace;color:#bff}
#msChem .vd{margin:8px 0;padding:6px 10px;border-radius:8px;font-weight:700}#msChem .vd.g{background:rgba(10,122,74,.35)}#msChem .vd.b{background:rgba(122,26,42,.45)}
#msChem .mx{margin-top:6px;padding:10px;border:1px solid rgba(255,220,120,.4);border-radius:12px;background:rgba(60,45,0,.25)}#msChem .mx .bk,#msChem .mx .it{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}#msChem .mx .it button.sel{background:#ffd166;color:#012}#msChem .mx .bk button{background:rgba(0,90,120,.7)}#msChem .mx .pl{font-size:13px;opacity:.9}
#msChem .hov{outline:2px solid #fff!important;box-shadow:0 0 16px #0ff}#msChem .sim canvas{width:100%;max-width:360px;background:rgba(0,10,25,.7);border:1px solid rgba(130,200,255,.4);border-radius:12px;display:block}#msChem .sim label{display:block;margin:8px 0;font-size:13px}#msChem .sim input[type=range]{width:100%}#msChem .lab label{display:block;margin:8px 0;font-size:13px}#msChem .lab input[type=range]{width:100%}
#msChem details.rv{margin:6px 0;padding:6px 9px;border:1px solid rgba(255,120,140,.35);border-radius:10px}
@media(max-width:759px){#msChem .tabs{display:flex}#msChem .cols{grid-template-columns:1fr}#msChem[data-tab=learn] #cmMock,#msChem[data-tab=mock] #cmLearn{display:none}}
#msChem #cL{position:relative;height:230px;border:1px dashed #7cf;border-radius:12px;overflow:hidden;touch-action:none;margin:6px 0}#msChem .at{position:absolute;min-width:46px;height:46px;padding:0 6px;box-sizing:border-box;white-space:nowrap;border-radius:23px;display:flex;align-items:center;justify-content:center;font-weight:700;transform:translate(-50%,-50%);color:#fff;border:2px solid rgba(255,255,255,.4);cursor:grab;user-select:none;background:radial-gradient(circle at 30% 30%,#7dd3fc,#0369a1)}#msChem .at.c{background:radial-gradient(circle at 30% 30%,#fca5a5,#b91c1c);cursor:default}`;
  document.head.appendChild(css);
  const root = document.createElement('div'); root.id = 'msChem'; root.setAttribute('data-keep-uz', 'true');
  root.innerHTML = `<div class="mt"><b ${K}>🧪 Kimyo</b><button id="cmX" ${K}>✕ YOPISH</button></div><div class="tabs"><button id="cmTL" ${K}>📚 O‘RGANISH</button><button id="cmTM" ${K}>📝 MOCK TEST</button></div><div class="cols"><section id="cmLearn"></section><section id="cmMock"></section></div>`;
  document.body.appendChild(root);

  /* ---- savollar ---- */
  const kit = () => window.__chemMockKit;
  function fromTopic(t) {
    const q = t[3], ans = q[1][q[2]]; let w = q[1].filter((_, i) => i !== q[2]);
    if (w.length < 3) { const kd = x => /^[−+\-]?[\d,.]+( ?(N_A|N|l|g|mol|marta|ta|%|g\/mol|mol\/l|ml|C))?$/.test(x) ? 'n' : /[₀-₉\d]/.test(x) ? 'f' : 'w', same = x => kd(x) === kd(ans) && x.length < ans.length * 3 + 4 && x.length * 3 + 4 > ans.length; const pool = sh([].concat(...ALL.filter(z => z !== t).map(z => z[3][1]))).filter(x => x !== ans && !w.includes(x) && same(x)); while (w.length < 3 && pool.length) w.push(pool.pop()); }
    const o = sh([ans].concat(w.slice(0, 3))); return { s: q[0], o, c: o.indexOf(ans), x: [t[1]] };
  }
  const mkQ = (t, hard) => { let g = null; try { g = kit() && kit().genQ(t[0], hard); } catch (_) { } return g || fromTopic(t); };
  const opts = (q, p, a) => q.o.map((o, i) => `<button class="op ${p == null ? '' : i === q.c ? 'ok' : i === p ? 'no' : ''}" data-${a}="${i}" ${K}>${'ABCD'[i]}) ${esc(o)}</button>`).join('');
  const sol = q => q.x && q.x.length ? `<div class="sol" ${K}><b>Yechim:</b>\n${esc(q.x.join('\n'))}</div>` : '';
  const verdict = (q, p) => `<div class="vd ${p === q.c ? 'g' : 'b'}" ${K}>${p === q.c ? '✓ To‘g‘ri!' : '✗ Noto‘g‘ri. Javob: ' + esc(q.o[q.c])}</div>`;

  function labHtml(t) {
    const l = t[4]; return `<div class="stp" ${K}>🖐 5. Qo‘l bilan amaliy lab</div><div ${K} style="font-size:13px;opacity:.85">Buyumlarni barmoq bilan chimchilab (yoki sichqoncha bilan) markaziy zarraga olib boring → <b>${esc(l[3])}</b></div><div id="cL"></div><div id="cM" class="vd g" ${K} style="display:none"></div><button data-lr="1" ${K}>🔄 Qaytadan</button>`;
  }
  function renderLearn() {
    const N = ALL.length, dn = ALL.filter(done).length; let h = `<h3 ${K}>📚 O‘RGANISH</h3><div class="ov" ${K}><div>O‘zlashtirilgan mavzular: <b>${dn}/${N}</b></div><div class="pb"><i style="width:${Math.round(100 * dn / N)}%"></i></div>`;
    const nx = ALL.find(x => !done(x)); if (nx) h += `<button class="pri" data-go="${esc(nx[0])}">▶ Davom etish: ${esc(nx[0])}</button>`; h += '</div>';
    /* Barcha mavzular o‘zlashtirilganda Kimyo sertifikati (faqat Premium) */
    if (dn >= N && N > 0) {
      const savedName = (PR._certName || localStorage.getItem('orvin_chem_cert_name') || '').trim();
      h += `<div class="chem-cert-box" style="margin:18px 0;padding:16px;border:1px solid rgba(0,200,255,.45);border-radius:12px;background:linear-gradient(145deg,rgba(8,20,40,.92),rgba(12,40,70,.88))">
        <div style="font-size:18px;font-weight:700;margin-bottom:6px" ${K}>🎓 Kimyo sertifikati</div>
        <p style="opacity:.9;margin:0 0 12px" ${K}>Barcha mavzular o‘zlashtirildi! Sertifikatni olishingiz mumkin.</p>
        <label style="display:block;font-size:13px;opacity:.85;margin-bottom:4px" ${K}>Ism va familiya</label>
        <input id="chemCertName" type="text" maxlength="60" placeholder="Masalan: Ali Valiyev" value="${esc(savedName)}"
          style="width:100%;max-width:320px;padding:8px 12px;border-radius:8px;border:1px solid #3a6a8a;background:#0a1a2e;color:#eafcff;margin-bottom:12px">
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px">
          <button class="pri" id="chemCertPng" ${K}>PNG yuklab olish</button>
          <button class="pri" id="chemCertPdf" ${K}>PDF yuklab olish</button>
        </div>
        <img id="chemCertPreview" alt="Sertifikat" style="display:none;max-width:100%;border-radius:8px;border:1px solid #31516c;margin-top:8px">
      </div>`;
    }
    BN.forEach((b, bi) => {
      const open = S.b === bi; h += `<div class="blk"><button class="bh" data-b="${bi}"><span>${bi + 1}. ${esc(b)}</span><small ${K}>${B[b].filter(done).length}/${B[b].length} ✓ ${open ? '▾' : '▸'}</small></button>`;
      if (open) B[b].forEach((t, ti) => {
        const key = bi + '.' + ti; h += `<button class="tp" data-t="${key}"><span>${esc(t[0])}</span><small ${K}>${done(t) ? '✅' : ''}</small></button>`;
        if (S.t !== key) return;
        const sk = st(t); h += `<div class="ls"><div ${K}>Daraja: ${[0, 1, 2].map(i => i < sk ? '●' : '○').join(' ')} ${done(t) ? '✅ O‘zlashtirildi' : ''}<br><small>3 ta ketma-ket to‘g‘ri javob = o‘zlashtirildi</small></div>`;
        h += `<div class="stp" ${K}>📖 1. Qoida</div><div class="idea" ${K}>${esc(t[1])}</div><div class="stp" ${K}>🧩 2. Namuna</div><div class="qs" ${K}><i>${esc(t[2])}</i></div>`;
        h += `<div class="stp" ${K}>✍️ 3. Mashq</div>`;
        if (!S.pr || S.pr.key !== key) h += `<button class="pri" data-pr="${key}" ${K}>Mashqni boshlash</button>`; else { const q = S.pr.q; h += `<div class="qs" ${K}>${esc(q.s)}</div>${opts(q, S.pr.p, 'po')}`; if (S.pr.p != null) h += `${verdict(q, S.pr.p)}${sol(q)}<button class="pri" data-pr="${key}" ${K}>Yana savol</button>`; }
        h += `<div class="stp" ${K}>🎯 4. MS darajasidagi savol</div>`;
        if (!S.ms || S.ms.key !== key) h += `<button class="pri" data-ms="${key}" ${K}>MS savolini ochish</button>`; else { const q = S.ms.q; h += `<div class="qs" ${K}>${esc(q.s)}</div>${opts(q, S.ms.p, 'mo')}`; if (S.ms.p != null) h += `${verdict(q, S.ms.p)}${sol(q)}<button class="pri" data-ms="${key}" ${K}>Yana savol</button>`; }
        h += labHtml(t) + '</div>';
      });
      h += '</div>';
    });
    const el = $('cmLearn'), sc = el.scrollTop; el.innerHTML = h; el.scrollTop = sc; initLab();
  }
  function renderMock() {
    const R = window.ChemMock; let h = `<h3 ${K}>📝 MOCK TEST</h3><div ${K} style="opacity:.85;line-height:1.5">45 topshiriq • 100 ball • yopiq (A–D), moslashtirish va ochiq (javobni yozing) • barcha bo‘limlardan • 5 ta variant<br>⏱ ${(kit() && kit().MIN) || 150} daq</div><div class="row">${R && R.hasSession() ? `<button class="pri" id="cmResume" ${K}>Davom ettirish</button>` : ''}<button class="${R && R.hasSession() ? '' : 'pri'}" id="cmStart" ${K}>TESTNI BOSHLASH</button></div>`;
    if (PR.last) h += `<p ${K} style="margin-top:14px;opacity:.8">Oxirgi natija: <b>${PR.last.score}</b> / 100 · ${PR.last.level === 'none' ? 'Sertifikat berilmaydi' : PR.last.level}</p>`;
    $('cmMock').innerHTML = h;
  }
  const mockOpts = extra => Object.assign({ onFinish: r => { PR.last = { score: r.score, level: r.level, date: Date.now(), variant: r.variant }; save(); }, onGo: name => { const i = ALL.findIndex(x => x[0] === name); if (i >= 0) { S.b = BN.indexOf(ALL[i].b); S.t = S.b + '.' + B[ALL[i].b].indexOf(ALL[i]); S.pr = S.ms = null; S.tab = 'learn'; chrome(); renderLearn(); } }, onClose: () => renderMock() }, extra || {});
  function chrome() { root.dataset.tab = S.tab; $('cmTL').classList.toggle('on', S.tab === 'learn'); $('cmTM').classList.toggle('on', S.tab === 'mock'); if (window.OrvinLang && OrvinLang.mount && !root.querySelector('.olang')) OrvinLang.mount(root.querySelector('.mt'), $('cmX')); }

  /* ---- qo'l bilan lab ---- */
  const curT = () => { if (S.t == null) return null; const [b, t] = S.t.split('.'); return B[BN[b]][t]; };
  function initLab() {
    S.L = null; const t = curT(), box = $('cL'); if (!t || !box) return;
    const l = t[4], W = box.clientWidth || 300, H = 230, mk = (s, x, y, c) => { const d = document.createElement('div'); d.className = 'at' + (c ? ' c' : ''); d.textContent = s; d.style.left = x + 'px'; d.style.top = y + 'px'; box.appendChild(d); return d; };
    const c = { el: mk(l[1], W / 2, H / 2, 1), x: W / 2, y: H / 2 }, n = l[2].length;
    const as = l[2].map((s, i) => { const x = 40 + (W - 80) * (i + .5) / n, y = i % 2 ? 48 : H - 40; return { el: mk(s, x, y), x, y, in: false }; });
    S.L = { box, c, as, f: l[3], msg: l[4], W, H };
  }
  function put(a, x, y) { a.x = x; a.y = y; a.el.style.left = x + 'px'; a.el.style.top = y + 'px'; }
  function check() {
    const L = S.L; if (!L) return; L.as.forEach(a => { a.in = Math.hypot(a.x - L.c.x, a.y - L.c.y) < 70; });
    if (L.as.every(a => a.in)) {
      L.as.forEach((a, i) => { const g = 2 * Math.PI * i / L.as.length + Math.PI / 4; put(a, L.c.x + 58 * Math.cos(g), L.c.y + 58 * Math.sin(g)); });
      const m = $('cM'); if (m) { m.style.display = 'block'; m.textContent = L.msg || ('✓ ' + L.f + ' hosil bo‘ldi!'); } PR.lab = PR.lab || {}; PR.lab[curT()[0]] = 1; save();
    }
  }
  root.addEventListener('pointerdown', e => { const L = S.L; if (!L || !L.box.contains(e.target) || !e.target.classList.contains('at') || e.target.classList.contains('c')) return; S.hold = L.as.find(a => a.el === e.target); });
  root.addEventListener('pointermove', e => { if (!S.hold || !S.L) return; const r = S.L.box.getBoundingClientRect(); put(S.hold, Math.max(0, Math.min(S.L.W, e.clientX - r.left)), Math.max(0, Math.min(S.L.H, e.clientY - r.top))); });
  addEventListener('pointerup', () => { if (S.hold) { S.hold = null; check(); } });
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'cmX') return window.closeChemistry();
    /* Kimyo sertifikati PNG / PDF */
    if (b.id === 'chemCertPng' || b.id === 'chemCertPdf') {
      if (ALL.filter(done).length < ALL.length) { alert('Sertifikat uchun barcha mavzularni o‘zlashtiring.'); return; }
      const nameEl = root.querySelector('#chemCertName');
      const name = (nameEl && nameEl.value || '').trim().slice(0, 60);
      if (!name) { alert('Ism va familiyani yozing'); return; }
      PR._certName = name; try { localStorage.setItem('orvin_chem_cert_name', name); } catch (_) { }
      save(); drawChemCert(name, b.id === 'chemCertPdf');
      return;
    }
    if (b.id === 'cmTL') { S.tab = 'learn'; return chrome(); } if (b.id === 'cmTM') { S.tab = 'mock'; return chrome(); }
    if (b.id === 'cmStart') { if (!window.ChemMock) return; return window.ChemMock.open(mockOpts()); }
    if (b.id === 'cmResume' && window.ChemMock) return window.ChemMock.open(mockOpts({ resume: true }));
    if (b.dataset.go) { const i = ALL.findIndex(x => x[0] === b.dataset.go); S.b = BN.indexOf(ALL[i].b); S.t = S.b + '.' + B[ALL[i].b].indexOf(ALL[i]); S.pr = S.ms = null; return renderLearn(); }
    if (b.dataset.b != null) { S.b = S.b === +b.dataset.b ? null : +b.dataset.b; S.t = null; S.pr = S.ms = null; return renderLearn(); }
    if (b.dataset.t) { S.t = S.t === b.dataset.t ? null : b.dataset.t; S.pr = S.ms = null; return renderLearn(); }
    if (b.dataset.lr) return initLab();
    if (b.dataset.pr) { S.pr = { key: b.dataset.pr, q: mkQ(curT(), false), p: null }; return renderLearn(); }
    if (b.dataset.ms) { S.ms = { key: b.dataset.ms, q: mkQ(curT(), true), p: null }; return renderLearn(); }
    if (b.dataset.po != null && S.pr && S.pr.p == null) { const t = curT(), ok = +b.dataset.po === S.pr.q.c; S.pr.p = +b.dataset.po; PR.m[t[0]] = ok ? (PR.m[t[0]] || 0) + 1 : 0; save(); return renderLearn(); }
    if (b.dataset.mo != null && S.ms && S.ms.p == null) { S.ms.p = +b.dataset.mo; return renderLearn(); }
  });
  /* qo'l bilan boshqarish (chimchilash = atomni ushlash) */
  const prev = window.__orvinHand;
  window.__orvinHand = function (h) {
    if (!root.classList.contains('show')) return prev ? prev(h) : false;
    const L = S.L; if (!L || !h || !h.has) { S.hold = null; return false; }
    const r = L.box.getBoundingClientRect(), x = h.x - r.left, y = h.y - r.top;
    if (h.pinch) { if (!S.hold) { let d = 50; L.as.forEach(a => { const q = Math.hypot(a.x - x, a.y - y); if (q < d) { d = q; S.hold = a; } }); } if (S.hold) put(S.hold, Math.max(0, Math.min(L.W, x)), Math.max(0, Math.min(L.H, y))); }
    else if (S.hold) { S.hold = null; check(); }
    return true;
  };
  window.openChemistry = function () { document.body.classList.add('math-mode'); try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(true); } catch (_) { } chrome(); renderLearn(); renderMock(); root.classList.add('show'); };
  window.closeChemistry = function () { root.classList.remove('show'); S.hold = null; window.dispatchEvent(new Event('orvin-science-closed')); setTimeout(() => { const o = $('oquv'); if (!(o && o.classList.contains('show'))) { document.body.classList.remove('math-mode'); try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(false); } catch (_) { } } }, 0); };
  /* ---------- Kimyo sertifikati (canvas → PNG / PDF) ---------- */
  const chemCertImg = new Image();
  try { chemCertImg.src = 'chemistry_certificate.jpg'; } catch (_) { }
  function drawChemCert(name, asPdf) {
    const paint = () => {
      const c = document.createElement('canvas');
      const w = chemCertImg.naturalWidth || 1489, h = chemCertImg.naturalHeight || 1056;
      c.width = w; c.height = h;
      const x = c.getContext('2d');
      x.drawImage(chemCertImg, 0, 0, w, h);
      x.fillStyle = '#eafcff'; x.textAlign = 'center'; x.textBaseline = 'middle';
      let fs = Math.max(28, Math.round(w * 0.032));
      x.font = 'bold ' + fs + 'px "Segoe UI", Arial, sans-serif';
      while (x.measureText(name).width > w * 0.56 && fs > 18) { fs -= 2; x.font = 'bold ' + fs + 'px "Segoe UI", Arial, sans-serif'; }
      x.shadowColor = 'rgba(0,200,255,0.55)'; x.shadowBlur = 8;
      x.fillText(name, w / 2, h * 0.45);
      x.shadowBlur = 0;
      const prev = root.querySelector('#chemCertPreview');
      if (prev) { prev.src = c.toDataURL('image/png'); prev.style.display = 'block'; }
      const J = window.jspdf && window.jspdf.jsPDF;
      if (asPdf && J) {
        const pdf = new J({ orientation: w > h ? 'landscape' : 'portrait', unit: 'px', format: [w, h] });
        pdf.addImage(c.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, w, h);
        pdf.save('ORVIN_Chemistry_Certificate.pdf');
      } else {
        if (asPdf) alert('PDF kutubxonasi yuklanmadi. PNG sifatida saqlanadi.');
        const a = document.createElement('a');
        a.href = c.toDataURL('image/png'); a.download = 'ORVIN_Chemistry_Certificate.png'; a.click();
      }
    };
    if (chemCertImg.complete && chemCertImg.naturalWidth) paint();
    else { chemCertImg.onload = paint; chemCertImg.onerror = () => alert('Sertifikat rasmi yuklanmadi.'); }
  }
  window.ChemStat = () => ({ done: ALL.filter(done).length, total: ALL.length, last: PR.last ? PR.last.score : null });
})();
