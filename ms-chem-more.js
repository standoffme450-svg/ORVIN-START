/* ORVIN — Kimyo: qo'shimcha mavzular va yetishmagan labxonalar */
window.CHEM_LABS = {
  'Le-Shatelye prinsipi': ['b', 'kat.', ['N₂', 'H₂'], 'NH₃', '✓ Katalizator ustida N₂ + 3H₂ → 2NH₃ hosil bo‘ldi (bosim ↑ → o‘ngga)'],
  'Oksidlovchi va qaytaruvchi': ['b', 'Zn', ['e⁻', 'e⁻'], 'Zn²⁺', '✓ Zn 2e⁻ berdi → Zn²⁺: Zn qaytaruvchi (oksidlandi)'],
  'Korroziya': ['b', 'Fe', ['O₂', 'H₂O'], 'Fe(OH)₃', '✓ Fe + O₂ + H₂O → zang Fe(OH)₃ hosil bo‘ldi'],
  'Izomeriya': ['b', 'C', ['C', 'C', 'C'], 'C₄', '✓ C–C–C–C zanjiri (n-butan); shoxlansa izobutan bo‘ladi'],
  'Alkenlar': ['b', 'C', ['C', 'H', 'H', 'H', 'H'], 'C₂H₄', '✓ CH₂=CH₂ (etilen) hosil bo‘ldi: bitta C=C qo‘sh bog‘'],
  'Spirtlar': ['b', 'C', ['H', 'H', 'H', 'OH'], 'CH₃OH', '✓ CH₃OH (metanol): −OH funksional guruh'],
  'Aldegidlar': ['b', 'C', ['O', 'H', 'H'], 'HCHO', '✓ HCHO (metanal): C=O va −CHO guruh'],
  'Glyukoza': ['b', 'Gl', ['C₂H₅OH', 'CO₂'], 'bijg‘ish', '✓ Bijg‘ish: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂'],
  'Aminokislotalar va peptid': ['b', 'Gly', ['Ala'], 'peptid', '✓ −CO−NH− peptid bog‘ hosil bo‘ldi (−H₂O)']
};
window.CHEM_MORE = {
  'I. UMUMIY KIMYO': [
    ['Atom, molekula, ion', 'Atom — kimyoviy bo‘linmas zarra; molekula — atomlar birikmasi; ion — zaryadli zarra (Na⁺, Cl⁻).', 'Na → Na⁺ + e⁻ (kation).', ['Cl⁻ qanday zarra?', ['Kation', 'Anion', 'Radikal'], 1], ['b', 'Na', ['Cl'], 'NaCl', '✓ Na⁺ va Cl⁻ ionlari: NaCl']],
    ['Gazlarning nisbiy zichligi', 'D(H₂) = M(gaz)/2; D(havo) = M(gaz)/29.', 'CO₂: D(H₂) = 44/2 = 22.', ['M=32 gazning vodorodga nisbatan zichligi?', ['8', '16', '32'], 1], ['s', 'D = M₁ / M₂', [['M gaz', 2, 100, 1, 44], ['M taqqoslanuvchi', 2, 30, 1, 2]], v => 'D = ' + fm2(v[0] / v[1])]]
  ],
  'II. ATOM TUZILISHI VA DAVRIY QONUN': [
    ['Davriy qonun va xossalar', 'Davrda chapdan o‘ngga: radius kamayadi, elektromanfiylik oshadi. Guruhda yuqoridan pastga: radius oshadi.', 'F — eng elektromanfiy element.', ['Qaysi element eng elektromanfiy?', ['Cs', 'F', 'O'], 1], null]
  ],
  'III. KIMYOVIY BOG‘LANISH': [
    ['Vodorod bog‘lanish', 'H atomi F, O, N bilan bog‘langan molekulalar orasida hosil bo‘ladi; qaynash haroratini oshiradi.', 'H₂O molekulalari orasida.', ['Qaysi birikmada molekulalararo vodorod bog‘ bor?', ['CH₄', 'H₂O', 'H₂'], 1], ['b', 'O', ['H', 'H'], 'H₂O', '✓ H₂O: har O ga ikkita H, molekulalar orasida H-bog‘ hosil bo‘ladi']],
    ['Valentlik va oksidlanish darajasi', 'Oddiy modda — 0; H +1; O −2 (peroksidlarda −1); molekulada yig‘indi 0.', 'H₂SO₄: 2(+1) + x + 4(−2) = 0 → x = +6.', ['KMnO₄ da Mn ning oksidlanish darajasi?', ['+2', '+5', '+7'], 2], null]
  ],
  'IV. KINETIKA VA MUVOZANAT': [
    ['Kataliz', 'Katalizator tezlikni oshiradi, o‘zi sarflanmaydi, muvozanatni siljitmaydi.', 'MnO₂ H₂O₂ ning parchalanishini tezlatadi.', ['Katalizator muvozanatni…', ['Chapga siljitadi', 'O‘ngga siljitadi', 'Siljitmaydi'], 2], null],
    ['Muvozanat konstantasi', 'aA + bB ⇌ cC + dD: K = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ). Qattiq moddalar kiritilmaydi.', 'N₂+3H₂⇌2NH₃: K = [NH₃]² / ([N₂][H₂]³).', ['H₂+I₂⇌2HI da K ifodasi?', ['[HI]/[H₂][I₂]', '[HI]²/([H₂][I₂])', '[H₂][I₂]/[HI]²'], 1], ['s', 'K = [C]² / ([A][B])', [['[C]', 1, 10, 1, 4], ['[A]', 1, 10, 1, 2], ['[B]', 1, 10, 1, 2]], v => 'K = ' + fm2(v[0] * v[0] / (v[1] * v[2]))]]
  ],
  'V. ERITMALAR VA ELEKTROLITIK DISSOTSIATSIYA': [
    ['Elektrolitik dissotsiatsiya', 'Elektrolit eritmada ionlarga ajraladi. Kuchli: HCl, NaOH, tuzlar. α = ajralgan / jami.', 'NaCl → Na⁺ + Cl⁻.', ['Qaysi biri kuchsiz elektrolit?', ['HCl', 'CH₃COOH', 'NaOH'], 1], ['s', 'α = ajralgan / jami', [['jami', 1, 100, 1, 50], ['ajralgan', 1, 100, 1, 10]], v => 'α = ' + fm2(100 * Math.min(1, v[1] / v[0])) + ' %']],
    ['Tuzlar gidrolizi', 'Kuchli asos + kuchsiz kislota tuzi → ishqoriy (Na₂CO₃); kuchsiz asos + kuchli kislota → kislotali (NH₄Cl); ikkalasi kuchli → gidrolizlanmaydi.', 'Na₂CO₃ eritmasida pH > 7.', ['NaCl eritmasi muhiti?', ['Kislotali', 'Neytral', 'Ishqoriy'], 1], null]
  ],
  'VI. OQR VA ELEKTROLIZ': [
    ['Elektron balans', 'Berilgan e⁻ soni = qabul qilingan e⁻ soni. Koeffitsiyentlar shu bilan topiladi.', 'Zn + 2HCl → ZnCl₂ + H₂: Zn⁰−2e⁻; 2H⁺+2e⁻.', ['Cu²⁺ + 2e⁻ → Cu⁰ da Cu²⁺ nima?', ['Oksidlovchi', 'Qaytaruvchi', 'Katalizator'], 0], ['b', 'Cu²⁺', ['e⁻', 'e⁻'], 'Cu', '✓ Cu²⁺ 2e⁻ qabul qildi → Cu⁰ cho‘kdi (katodda)']],
    ['Galvanik elementlar', 'Anod — oksidlanish (metall faolroq), katod — qaytarilish. Elektronlar anoddan katodga.', 'Zn|Cu elementi: Zn anod.', ['Galvanik elementda oksidlanish qayerda?', ['Katodda', 'Anodda', 'Tuz ko‘prigida'], 1], null]
  ],
  'VII. ANORGANIK BIRIKMALAR SINFLARI': [
    ['Asoslar', 'Ishqorlar (NaOH, KOH, Ca(OH)₂) suvda eriydi; boshqalari erimaydi. Fenolftalein ishqorda malina.', 'NaOH + HCl → NaCl + H₂O.', ['Qaysi gidroksid ishqor?', ['Fe(OH)₃', 'KOH', 'Cu(OH)₂'], 1], ['b', 'Na', ['OH'], 'NaOH', '✓ NaOH (ishqor) hosil bo‘ldi']],
    ['Tuzlar', 'O‘rta (NaCl), nordon (NaHCO₃), asosli (CuOHCl), qo‘sh, aralash va kompleks tuzlar.', 'NaHCO₃ — nordon tuz.', ['NaHCO₃ qanday tuz?', ['O‘rta', 'Nordon', 'Asosli'], 1], null]
  ],
  'VIII. METALLMASLAR': [
    ['Oltingugurt va sulfat kislota', 'S → SO₂ → SO₃ → H₂SO₄. Konsentrlangan H₂SO₄ suv tortuvchi va oksidlovchi.', 'S + O₂ → SO₂.', ['H₂SO₄ da S ning oksidlanish darajasi?', ['+4', '+6', '−2'], 1], ['b', 'S', ['O', 'O'], 'SO₂', '✓ SO₂ hosil bo‘ldi (S + O₂)']],
    ['Uglerod va kremniy', 'CO₂ kislotali oksid; karbonatlar kislotada CO₂ ajratadi. SiO₂ — qum, shisha xomashyosi.', 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑.', ['Karbonatni aniqlovchi reaktiv?', ['Kislota (CO₂ ajraladi)', 'Fenolftalein', 'NaCl'], 0], ['b', 'Si', ['O', 'O'], 'SiO₂', '✓ SiO₂ (kremniy(IV) oksid) hosil bo‘ldi']]
  ],
  'IX. METALLAR': [
    ['Ishqoriy metallar', 'Li, Na, K suv bilan shiddatli: 2Na + 2H₂O → 2NaOH + H₂↑. Kerosin ostida saqlanadi.', 'K Na dan faolroq.', ['Na qayerda saqlanadi?', ['Suvda', 'Kerosinda', 'Havoda'], 1], ['b', 'Na', ['H₂O'], 'NaOH', '✓ 2Na + 2H₂O → 2NaOH + H₂↑']],
    ['Suvning qattiqligi', 'Ca²⁺, Mg²⁺ ionlari. Vaqtincha: Ca(HCO₃)₂ — qaynatib yo‘qoladi. Doimiy: sulfat/xloridlar — soda bilan.', 'Ca(HCO₃)₂ → CaCO₃↓ + H₂O + CO₂↑.', ['Doimiy qattiqlikni yo‘qotuvchi?', ['Qaynatish', 'Na₂CO₃', 'Filtrlash'], 1], null],
    ['Temir va birikmalari', 'Fe²⁺ (yashil) → Fe³⁺ (sariq-qo‘ng‘ir). Fe³⁺ sifat reaktivi: KSCN (qon-qizil).', 'Fe + 2HCl → FeCl₂ + H₂.', ['Fe³⁺ ga reaktiv?', ['KSCN', 'NaCl', 'AgNO₃'], 0], ['b', 'Fe', ['Cl', 'Cl'], 'FeCl₂', '✓ FeCl₂ hosil bo‘ldi (Fe²⁺)']]
  ],
  'X. ORGANIK KIMYO NAZARIYASI': [
    ['Gomologiya', 'Gomologlar bir-biridan −CH₂− guruhga farq qiladi (CH₄, C₂H₆, C₃H₈).', 'Gomologik ayirma = CH₂ (M=14).', ['Gomologik ayirma?', ['CH₂', 'CH₃', 'C₂H₄'], 0], ['s', 'CₙH₂ₙ₊₂ qatori', [['n', 1, 10, 1, 2]], v => 'C' + v[0] + 'H' + (2 * v[0] + 2) + ', keyingisi C' + (v[0] + 1) + 'H' + (2 * v[0] + 4)]]
  ],
  'XI. UGLEVODORODLAR': [
    ['Alkinlar', 'CₙH₂ₙ₋₂; uch bog‘. Atsetilen C₂H₂; Kucherov: C₂H₂ + H₂O → CH₃CHO.', 'Ca C₂ + 2H₂O → C₂H₂ + Ca(OH)₂.', ['Atsetilen formulasi?', ['C₂H₄', 'C₂H₂', 'C₂H₆'], 1], ['b', 'C', ['C', 'H', 'H'], 'C₂H₂', '✓ HC≡CH (atsetilen): uch bog‘']],
    ['Benzol (arenlar)', 'C₆H₆ — tekis halqa, 6 ta π-elektron. Almashinish (Br₂/FeBr₃) va nitrolash afzal.', 'C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O.', ['Benzolning formulasi?', ['C₆H₁₂', 'C₆H₆', 'C₆H₁₄'], 1], null]
  ],
  'XII. KISLORODLI ORGANIK BIRIKMALAR': [
    ['Karbon kislotalar', 'Funksional guruh −COOH. Sirka kislota CH₃COOH; metallar, ishqorlar va spirtlar bilan reaksiya.', 'CH₃COOH + NaOH → CH₃COONa + H₂O.', ['−COOH qaysi sinf?', ['Spirt', 'Karbon kislota', 'Aldegid'], 1], ['b', 'C', ['H', 'H', 'H', 'COOH'], 'CH₃COOH', '✓ CH₃COOH (sirka kislota)']],
    ['Murakkab efirlar va yog‘lar', 'Kislota + spirt ⇌ efir + H₂O. Yog‘ = glitserin + yuqori kislotalar; ishqoriy gidroliz → sovun.', 'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O.', ['Yog‘ishqoriy gidrolizidan nima hosil bo‘ladi?', ['Sovun va glitserin', 'Efir', 'Aldegid'], 0], null],
    ['Fenollar', 'C₆H₅OH — −OH benzol halqada; spirtdan kuchliroq kislota; FeCl₃ bilan binafsha rang.', 'C₆H₅OH + NaOH → C₆H₅ONa + H₂O.', ['Fenolga sifat reaktivi?', ['FeCl₃', 'NaCl', 'KNO₃'], 0], null]
  ],
  'XIII. UGLEVODLAR': [
    ['Disaxarid va polisaxaridlar', 'Saxaroza → glyukoza + fruktoza (gidroliz). Kraxmal va sellyuloza (C₆H₁₀O₅)ₙ — polisaxarid; kraxmal yod bilan ko‘k.', 'Kraxmal + I₂ → ko‘k.', ['Kraxmalga reaktiv?', ['I₂', 'Br₂', 'FeCl₃'], 0], null]
  ],
  'XIV. AZOTLI ORGANIK VA YMB': [
    ['Aminlar', 'R−NH₂: asoslik xossasi (NH₃ dek). Anilin C₆H₅NH₂ — bromli suv bilan oq cho‘kma.', 'CH₃NH₂ + HCl → CH₃NH₃Cl.', ['Aminlar qanday xossa namoyon qiladi?', ['Asosli', 'Kislotali', 'Neytral'], 0], ['b', 'N', ['H', 'H', 'CH₃'], 'CH₃NH₂', '✓ CH₃NH₂ (metilamin)']],
    ['Oqsillar', 'Tuzilish: birlamchi → to‘rtlamchi. Denaturatsiya — tuzilish buzilishi. Biuret reaksiyasi: Cu(OH)₂ + oqsil → binafsha.', 'Qaynatilgan tuxum oqi — denaturatsiya.', ['Biuret reaksiyasi rangi?', ['Binafsha', 'Ko‘k-yashil', 'Qizil'], 0], null],
    ['Polimerlar', 'Polimerlanish: eten → polietilen (n CH₂=CH₂ → (−CH₂−CH₂−)ₙ). Polikondensatlanishda H₂O ajraladi.', 'Polietilenning monomeri — etilen.', ['Polietilen monomeri?', ['Etilen', 'Propan', 'Benzol'], 0], ['b', 'C₂H₄', ['C₂H₄', 'C₂H₄'], 'PE', '✓ n CH₂=CH₂ → (−CH₂−CH₂−)ₙ polietilen']]
  ],
  'XV. AMALIY MASALALAR': [
    ['Gazlar aralashmasi', 'M(o‘rt) = Σ(φᵢ·Mᵢ). Hajmiy ulush bo‘yicha.', '50% CH₄ (16) + 50% CO₂ (44): M=30.', ['50% H₂ va 50% O₂ aralashmasi M(o‘rt)?', ['9', '17', '34'], 1], ['s', 'M(o‘rt) = φ₁M₁ + φ₂M₂', [['φ₁ (%)', 0, 100, 5, 50], ['M₁', 1, 100, 1, 2], ['M₂', 1, 100, 1, 32]], v => 'M = ' + fm2(v[0] / 100 * v[1] + (1 - v[0] / 100) * v[2])]],
    ['Formulani topish', 'C:H:O = ω(C)/12 : ω(H)/1 : ω(O)/16 — eng kichik songa bo‘lib butun nisbat.', 'ω: C 40%, H 6,7%, O 53,3% → CH₂O.', ['C:H = 6:1 (massa) bo‘lsa atomlar nisbati?', ['1:2', '1:1', '2:1'], 0], null],
    ['Elektroliz hisobi', 'm = M·I·t/(n·F). 1 mol e⁻ = 96500 C.', 'Cu²⁺: 2 mol e⁻ → 1 mol Cu (64 g).', ['2 mol e⁻ qancha Cu ajratadi (M=64)?', ['32 g', '64 g', '128 g'], 1], ['s', 'm = M·I·t/(n·96500)', [['M', 1, 200, 1, 64], ['I (A)', 1, 10, 1, 2], ['t (s)', 100, 5000, 100, 1930], ['n', 1, 3, 1, 2]], v => 'm = ' + fm2(v[0] * v[1] * v[2] / (v[3] * 96500)) + ' g']]
  ]
};
function fm2(x) { return String(+(+x).toFixed(3)).replace('.', ','); }

/* ---- 2-qism: qo'l bilan lablar (slayderlar o'rniga) + MS spetsifikatsiyasidagi qo'shimcha mavzular ---- */
(function () {
  const L = {
    'Mol va molyar massa': ['b', 'N_A', ['C', 'O', 'O'], 'CO₂', '✓ 1 mol CO₂ = 44 g = 6,02·10²³ molekula (N_A)'],
    'Gazlarning molyar hajmi': ['b', '22,4 l', ['H₂', 'O₂'], 'gaz', '✓ 1 mol har qanday gaz n.sh. da 22,4 l hajm egallaydi'],
    'Gazlarning nisbiy zichligi': ['b', 'H₂', ['CO₂'], 'D', '✓ D(H₂) = M(CO₂)/M(H₂) = 44/2 = 22'],
    'Proton, neytron, elektron': ['b', 'p', ['p', 'n', 'n', 'e⁻', 'e⁻'], '⁴He', '✓ ⁴He atomi: 2p, 2n, 2e⁻ — n = A − Z = 4 − 2 = 2'],
    'Elektron konfiguratsiya': ['b', '1s²', ['2s²', '2p⁶', '3s¹'], 'Na', '✓ Na: 1s²2s²2p⁶3s¹ — Klechkovskiy tartibida to‘ldirildi'],
    'Davriy qonun va xossalar': ['b', 'F', ['O', 'N'], 'EM', '✓ Elektromanfiylik: F > O > N (davrda chapdan o‘ngga ortadi)'],
    'Valentlik va oksidlanish darajasi': ['b', 'S', ['O', 'O', 'O', 'O'], 'SO₄', '✓ SO₄²⁻ da S: +6, O: −2 → 6 − 8 = −2'],
    'Vant-Goff qoidasi': ['b', 'v', ['🔥', '🔥'], 'v×', '✓ Harorat +20 °C → tezlik γ² marta ortadi (γ=2 bo‘lsa 4 marta)'],
    'Kataliz': ['b', 'kat.', ['H₂O₂'], 'O₂', '✓ MnO₂ katalizatori H₂O₂ ni tez parchaladi (katalizator sarflanmadi)'],
    'Muvozanat konstantasi': ['b', '⇌', ['[C]', '[A]', '[B]'], 'K', '✓ K = [C]²/([A][B]) — mahsulot suratda, reagentlar maxrajda'],
    'Massa ulush (ω)': ['b', '🥛', ['tuz', 'suv'], 'eritma', '✓ ω = m(tuz)/m(eritma)·100%; m(eritma) = m(tuz) + m(suv)'],
    'pH va muhit': ['b', 'pH', ['H⁺', 'OH⁻'], 'H₂O', '✓ H⁺ + OH⁻ → H₂O: neytral muhit, pH = 7'],
    'Elektrolitik dissotsiatsiya': ['b', 'NaCl', ['Na⁺', 'Cl⁻'], 'ionlar', '✓ NaCl → Na⁺ + Cl⁻: kuchli elektrolit, α ≈ 1'],
    'Tuzlar gidrolizi': ['b', 'CO₃²⁻', ['H₂O', 'H₂O'], 'OH⁻', '✓ CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻ → ishqoriy muhit'],
    'Faraday qonuni': ['b', 'Katod', ['e⁻', 'e⁻', 'Cu²⁺'], 'Cu', '✓ Cu²⁺ + 2e⁻ → Cu⁰ (2 mol e⁻ = 2·96500 C)'],
    'Galvanik elementlar': ['b', 'Zn', ['e⁻', 'Cu²⁺'], 'Cu', '✓ Zn anod: Zn → Zn²⁺ + 2e⁻; elektronlar Cu katodiga o‘tdi'],
    'Tuzlar': ['b', 'Na', ['H', 'C', 'O', 'O', 'O'], 'NaHCO₃', '✓ NaHCO₃ — nordon tuz (tarkibida H bor)'],
    'Suvning qattiqligi': ['b', 'Ca²⁺', ['HCO₃⁻', 'HCO₃⁻'], 'Ca(HCO₃)₂', '✓ Ca(HCO₃)₂ — vaqtincha qattiqlik; qaynatsa CaCO₃↓ cho‘kadi'],
    'Gomologiya': ['b', 'CH₄', ['CH₂'], 'C₂H₆', '✓ CH₄ + CH₂ → C₂H₆: gomologik ayirma — CH₂'],
    'Alkanlar': ['b', 'C', ['C', 'H', 'H', 'H', 'H', 'H', 'H'], 'C₂H₆', '✓ C₂H₆ (etan): CₙH₂ₙ₊₂, n = 2'],
    'Benzol (arenlar)': ['b', 'C₆', ['H', 'H', 'H', 'H', 'H', 'H'], 'C₆H₆', '✓ C₆H₆ — benzol: 6 C, 6 H, yagona π-sistema'],
    'Murakkab efirlar va yog‘lar': ['b', 'CH₃COOH', ['C₂H₅OH'], 'efir', '✓ CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O'],
    'Fenollar': ['b', 'C₆H₅', ['OH'], 'C₆H₅OH', '✓ C₆H₅OH (fenol): −OH benzol halqada'],
    'Disaxarid va polisaxaridlar': ['b', 'Saxaroza', ['H₂O'], 'gidroliz', '✓ Saxaroza + H₂O → glyukoza + fruktoza'],
    'Oqsillar': ['b', 'Oqsil', ['Cu(OH)₂'], 'biuret', '✓ Biuret reaksiyasi: binafsha rang hosil bo‘ldi'],
    'Reaksiya unumi': ['b', 'η', ['m amaliy', 'm nazariy'], 'η', '✓ η = m(amaliy)/m(nazariy)·100%'],
    'Gazlar aralashmasi': ['b', 'M o‘rt', ['φ₁·M₁', 'φ₂·M₂'], 'M', '✓ M(o‘rt) = φ₁·M₁ + φ₂·M₂'],
    'Formulani topish': ['b', 'C:H', ['85,7 / 12', '14,3 / 1'], '1 : 2', '✓ C:H = 1 : 2 → CH₂ (CₙH₂ₙ)'],
    'Elektroliz hisobi': ['b', 'Katod', ['Cu²⁺', 'e⁻', 'e⁻'], 'Cu', '✓ m = M·I·t/(z·F): 2 mol e⁻ → 1 mol Cu (64 g)']
  };
  Object.assign(window.CHEM_LABS, L);
  const N = {
    'I. UMUMIY KIMYO': [['Kimyoning asosiy qonunlari', 'Massaning saqlanishi (Lomonosov–Lavuazye); tarkibning doimiyligi (Prust); karrali nisbatlar (Dalton); hajmiy nisbatlar (Gey-Lyussak).', '2H₂ + O₂ → 2H₂O: massa saqlanadi; hajmlar 2 : 1 : 2.', ['2 l H₂ bilan necha litr O₂ reaksiyaga kirishadi (n.sh.)?', ['1 l', '2 l', '4 l'], 0], ['b', 'O₂', ['H₂', 'H₂'], 'H₂O', '✓ 2H₂ + O₂ → 2H₂O: hajmiy nisbat 2 : 1 : 2']]],
    'II. ATOM TUZILISHI VA DAVRIY QONUN': [['Kvant sonlar va izotoplar', 'n — energetik qavat, l — orbital shakli (s, p, d, f), mₗ — fazoviy yo‘nalish, mₛ — spin. Izotoplar: Z bir xil, A har xil.', 'p-orbital: l=1, mₗ = −1, 0, +1 (3 ta orbital).', ['d-qavatchada nechta orbital bor?', ['3', '5', '7'], 1], ['b', 'd', ['↑↓', '↑↓', '↑↓', '↑↓', '↑↓'], '10 e⁻', '✓ d-qavatcha: 5 orbital × 2 e⁻ = 10 elektron (Pauli prinsipi)']]],
    'III. KIMYOVIY BOG‘LANISH': [['Kristall panjara turlari', 'Ionli (NaCl) — qattiq, mo‘rt; atomli (olmos, SiO₂) — juda qattiq; molekulyar (H₂O, CO₂) — oson uchuvchan; metall — elektr o‘tkazadi.', 'Olmos — atomli; quruq muz CO₂ — molekulyar.', ['Qaysi modda atomli kristall panjaraga ega?', ['NaCl', 'Olmos', 'CO₂'], 1], ['b', 'Si', ['O', 'O'], 'SiO₂', '✓ SiO₂ — atomli panjara: juda qattiq, suyuqlanish harorati yuqori']]],
    'IV. KINETIKA VA MUVOZANAT': [['Reaksiya tezligi va massalar ta‘siri qonuni', 'v = k·[A]ᵃ·[B]ᵇ (gomogen). Qattiq moddalar kiritilmaydi. Konsentratsiya oshsa tezlik ham oshadi.', '2NO + O₂ → 2NO₂: v = k[NO]²[O₂]; [NO] 2 marta ↑ → v 4 marta ↑.', ['v = k[A]²[B] da [A] 3 marta oshsa, tezlik?', ['3 marta', '6 marta', '9 marta'], 2], ['b', 'v', ['[A]', '[A]', '[B]'], 'v', '✓ v = k·[A]²·[B] — konsentratsiya darajalari bilan ortadi']]],
    'V. ERITMALAR VA ELEKTROLITIK DISSOTSIATSIYA': [
      ['Eruvchanlik', 'S — 100 g suvda erigan modda massasi. Gazlar: harorat ↑ → eruvchanlik ↓; ko‘p qattiq moddalar: ↑.', 'S = 36 g (NaCl): to‘yingan eritma ω = 36/136 ≈ 26,5%.', ['S = 25 g bo‘lsa, to‘yingan eritma ω?', ['25%', '20%', '16%'], 1], ['b', '🥛', ['tuz', 'tuz', 'suv'], 'to‘yingan', '✓ To‘yingan eritma: yana tuz erimaydi (cho‘kma qoladi)']],
      ['Ionli almashinish reaksiyalari', 'Reaksiya oxirigacha boradi, agar cho‘kma, gaz yoki kuchsiz elektrolit (H₂O) hosil bo‘lsa.', 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl; Ba²⁺ + SO₄²⁻ → BaSO₄↓.', ['Qaysi aralashmada cho‘kma hosil bo‘ladi?', ['NaCl + KNO₃', 'BaCl₂ + Na₂SO₄', 'KOH + HCl'], 1], ['b', 'Ba²⁺', ['SO₄²⁻'], 'BaSO₄', '✓ Ba²⁺ + SO₄²⁻ → BaSO₄↓ (oq cho‘kma)']]],
    'VII. ANORGANIK BIRIKMALAR SINFLARI': [['Genetik bog‘liqlik', 'Metall → asosli oksid → asos → tuz; metallmas → kislotali oksid → kislota → tuz.', 'Ca → CaO → Ca(OH)₂ → CaCO₃.', ['CaO + H₂O → ?', ['CaCO₃', 'Ca(OH)₂', 'CaCl₂'], 1], ['b', 'Ca', ['O', 'H₂O'], 'Ca(OH)₂', '✓ Ca → CaO → Ca(OH)₂ genetik zanjir']]],
    'VIII. METALLMASLAR': [['Vodorod va suv', 'H₂ — eng yengil gaz: Zn + 2HCl → ZnCl₂ + H₂↑. Peroksidlarda (H₂O₂) kislorod −1.', '2H₂ + O₂ → 2H₂O (portlash).', ['H₂O₂ da kislorodning oksidlanish darajasi?', ['−2', '−1', '0'], 1], ['b', 'O', ['H', 'H'], 'H₂O', '✓ H₂O: 2 ta H + 1 ta O']]],
    'IX. METALLAR': [
      ['Metallurgiya', 'Pirometallurgiya (yuqori T da qaytarish), gidrometallurgiya (eritmadan), elektrometallurgiya (Al, Na — elektroliz).', 'Fe₂O₃ + 3CO → 2Fe + 3CO₂; Al₂O₃ elektrolizi kriolitda.', ['Alyuminiy qanday usulda olinadi?', ['Pirometallurgiya', 'Elektroliz', 'Gidrometallurgiya'], 1], ['b', 'Fe₂O₃', ['CO', 'CO', 'CO'], 'Fe', '✓ Fe₂O₃ + 3CO → 2Fe + 3CO₂ (domna jarayoni)']],
      ['Cr, Mn, Cu, Zn, Ag birikmalari', 'Cr: +2, +3, +6 (K₂Cr₂O₇ — sariq-to‘q sariq oksidlovchi); KMnO₄ (+7) binafsha; Cu²⁺ ko‘k; Zn amfoter; Ag⁺ + Cl⁻ → AgCl↓.', 'KMnO₄ kislotali muhitda Mn²⁺ gacha qaytariladi.', ['KMnO₄ kislotali muhitda qaytarilganda hosil bo‘ladigan ion?', ['Mn²⁺', 'MnO₂', 'MnO₄²⁻'], 0], ['b', 'Ag⁺', ['Cl⁻'], 'AgCl', '✓ Ag⁺ + Cl⁻ → AgCl↓ (oq cho‘kma)']]],
    'X. ORGANIK KIMYO NAZARIYASI': [
      ['Butlerov nazariyasi, σ va π bog‘lar', 'Modda xossasi atomlarning bog‘lanish tartibiga bog‘liq. Bitta bog‘ — σ; qo‘sh — σ+π; uch — σ+2π.', 'C₂H₄: 5σ va 1π.', ['C₂H₂ da σ va π bog‘lar soni?', ['3σ, 2π', '2σ, 3π', '5σ, 0π'], 0], ['b', 'C', ['C', 'H', 'H'], 'C₂H₂', '✓ HC≡CH: 3 σ va 2 π bog‘']],
      ['Organik nomenklatura (IUPAC)', 'Eng uzun zanjir tanlanadi, shoxlar eng kichik raqamdan nomerlanadi. met-, et-, prop-, but-, pent-, geks-.', 'CH₃–CH(CH₃)–CH₃ — 2-metilpropan.', ['CH₃–CH₂–CH₂–CH₃ nomi?', ['Propan', 'Butan', 'Pentan'], 1], ['b', 'C', ['C', 'C', 'C'], 'butan', '✓ C–C–C–C zanjiri: butan (but- = 4 ta C)']]],
    'XI. UGLEVODORODLAR': [['Sikloalkanlar va dienlar', 'Sikloalkanlar CₙH₂ₙ (siklopropan, siklogeksan). Dienlar CₙH₂ₙ₋₂: butadien-1,3 polimerlanib kauchuk beradi.', 'nCH₂=CH–CH=CH₂ → (–CH₂–CH=CH–CH₂–)ₙ.', ['Sikloalkanlarning umumiy formulasi?', ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₆'], 0], ['b', 'C₃', ['H', 'H', 'H', 'H', 'H', 'H'], 'C₃H₆', '✓ C₃H₆ — siklopropan (3 a‘zoli halqa)']]],
    'XIV. AZOTLI ORGANIK VA YMB': [['Nitrobirikmalar va nuklein kislotalar', 'Nitrobenzol Zinin reaksiyasi bilan anilinga qaytariladi. DNK: A–T, G–C; RNK: A–U.', 'C₆H₅NO₂ + 3H₂ → C₆H₅NH₂ + 2H₂O.', ['DNK da adeninning juftligi?', ['Timin', 'Urasil', 'Guanin'], 0], ['b', 'A', ['T'], 'A–T', '✓ A–T juftlik (2 ta vodorod bog‘)']]],
    'XV. AMALIY MASALALAR': [
      ['Sifat analizi', 'Cl⁻ — AgNO₃ (oq cho‘kma); SO₄²⁻ — BaCl₂; CO₃²⁻ — kislota (CO₂); NH₄⁺ — ishqor + isitish (NH₃ hidi); Fe³⁺ — KSCN.', 'NH₄Cl + NaOH → NH₃↑ + NaCl + H₂O.', ['NH₄⁺ ionini aniqlash uchun?', ['Ishqor va isitish', 'AgNO₃', 'BaCl₂'], 0], ['b', 'NH₄⁺', ['OH⁻'], 'NH₃', '✓ NH₄⁺ + OH⁻ → NH₃↑ + H₂O (hid chiqadi)']],
      ['Kristallogidratlar', 'CuSO₄·5H₂O: M=250, CuSO₄ ulushi 160/250 = 64%.', '50 g kristallogidratda 32 g CuSO₄.', ['250 g CuSO₄·5H₂O da CuSO₄ massasi?', ['160 g', '90 g', '250 g'], 0], ['b', 'CuSO₄', ['H₂O', 'H₂O', 'H₂O', 'H₂O', 'H₂O'], 'gidrat', '✓ CuSO₄·5H₂O — ko‘k kristallogidrat']]]
  };
  Object.keys(N).forEach(k => { window.CHEM_MORE[k] = (window.CHEM_MORE[k] || []).concat(N[k]); });
})();

/* ---- 3-qism: spetsifikatsiyadagi qolgan bandlar ---- */
(function () {
  const N = {
    'I. UMUMIY KIMYO': [['Nisbiy atom va molekulyar massa', 'A_r — atom massasining ¹²C massasining 1/12 qismiga nisbati; M_r — molekuladagi A_r lar yig‘indisi.', 'M_r(H₂SO₄) = 2·1 + 32 + 4·16 = 98.', ['M_r(CaCO₃) nechaga teng?', ['100', '84', '56'], 0], ['b', 'Ca', ['C', 'O', 'O', 'O'], 'CaCO₃', '✓ CaCO₃: 40 + 12 + 3·16 = 100']]],
    'II. ATOM TUZILISHI VA DAVRIY QONUN': [['Pauli va Xund qoidalari', 'Pauli: bitta orbitalda ko‘pi bilan 2 ta elektron (spinlari qarama-qarshi). Xund: bir qavatchada orbitallar avval bittadan to‘ladi.', 'N: 2p³ — uchta p-orbitalda bittadan elektron (↑ ↑ ↑).', ['2p⁴ da juftlashmagan elektronlar soni?', ['4', '2', '0'], 1], ['b', '2p', ['↑', '↑', '↑', '↓'], '2p⁴', '✓ 2p⁴: avval 3 ta ↑, keyin ↓ juftlashadi → 2 ta juftlashmagan (Xund)']]],
    'III. KIMYOVIY BOG‘LANISH': [['Metall bog‘lanish', 'Metall kationlari va erkin elektronlar («elektron gaz») orasidagi bog‘lanish; elektr o‘tkazuvchanlik va plastiklik shundan.', 'Na: Na⁺ kationlari va umumiy elektron buluti.', ['Metallarning elektr o‘tkazishiga sabab?', ['Erkin elektronlar', 'Vodorod bog‘', 'Ionlar harakati'], 0], ['b', 'Na⁺', ['e⁻', 'e⁻', 'e⁻'], 'metall', '✓ Kationlar atrofida erkin elektron «gazi» — metall bog‘lanish']]],
    'V. ERITMALAR VA ELEKTROLITIK DISSOTSIATSIYA': [['Konsentratsiya turlari (C_M, C_N, titr)', 'C_M = n/V (mol/l); C_N = C_M·z (mol-ekv/l); molyal C_m = n/m(erituvchi, kg); titr T = m(modda)/V (g/ml).', '0,5 M H₂SO₄: C_N = 0,5·2 = 1 N.', ['0,2 M Al₂(SO₄)₃ ning normalligi (z=6)?', ['0,6 N', '1,2 N', '0,2 N'], 1], ['b', 'C_M', ['×', 'z'], 'C_N', '✓ C_N = C_M · z']]],
    'VIII. METALLMASLAR': [
      ['Fosfor va mineral o‘g‘itlar', 'P → P₂O₅ → H₃PO₄ → fosfatlar. Azotli (NH₄NO₃, karbamid), fosforli (superfosfat), kaliyli (KCl) o‘g‘itlar.', 'Ca₃(PO₄)₂ + 2H₂SO₄ → Ca(H₂PO₄)₂ + 2CaSO₄ (superfosfat).', ['Qaysi o‘g‘it azotli?', ['KCl', 'NH₄NO₃', 'Ca(H₂PO₄)₂'], 1], ['b', 'P₂', ['O', 'O', 'O', 'O', 'O'], 'P₂O₅', '✓ 4P + 5O₂ → 2P₂O₅ hosil bo‘ldi']],
      ['Shisha va sement', 'Shisha: Na₂CO₃ + CaCO₃ + 6SiO₂ → Na₂O·CaO·6SiO₂ + 2CO₂. Sement: ohaktosh va loy kuydiriladi.', 'Oddiy shisha tarkibi: Na₂O·CaO·6SiO₂.', ['Shisha xomashyosi?', ['Qum, soda, ohaktosh', 'Gips, loy', 'Temir rudasi'], 0], ['b', 'SiO₂', ['Na₂O', 'CaO'], 'shisha', '✓ Na₂O·CaO·6SiO₂ — oddiy shisha']]],
    'XI. UGLEVODORODLAR': [['Toluol va orientantlar', 'I tur orientantlar (−CH₃, −OH, −NH₂) o- va p- holatga, II tur (−NO₂, −COOH) m- holatga yo‘naltiradi.', 'Toluol nitrolanganda o- va p-nitrotoluol hosil bo‘ladi.', ['−NO₂ qaysi tur orientant?', ['I tur', 'II tur', 'Orientant emas'], 1], ['b', 'C₆H₅', ['CH₃'], 'toluol', '✓ C₆H₅CH₃ — toluol (−CH₃ I tur orientant)']]],
    'XIV. AZOTLI ORGANIK VA YMB': [['Getersiklik birikmalar', 'Halqada C dan boshqa atom (N, O, S) bor: pirrol, piridin, pirimidin, purin. Nuklein asoslari shulardan.', 'Piridin C₅H₅N — 6 a‘zoli halqa, 1 ta N.', ['Piridin halqasida nechta azot atomi bor?', ['1', '2', '0'], 0], ['b', 'C₅', ['H', 'H', 'H', 'H', 'H', 'N'], 'C₅H₅N', '✓ C₅H₅N — piridin']]],
    'XV. AMALIY MASALALAR': [['Stexiometrik hisoblar', 'Tenglama koeffitsiyentlari mol nisbatini beradi. Ortiqcha-kam: kam reagent bo‘yicha hisoblanadi; aralashmada har komponent alohida.', '2Mg + O₂ → 2MgO: 48 g Mg dan 80 g MgO.', ['2H₂ + O₂ → 2H₂O. 4 mol H₂ va 1 mol O₂ dan necha mol suv?', ['2', '4', '1'], 0], ['b', 'Mg', ['O'], 'MgO', '✓ 2Mg + O₂ → 2MgO']]]
  };
  Object.keys(N).forEach(k => { window.CHEM_MORE[k] = (window.CHEM_MORE[k] || []).concat(N[k]); });
})();
