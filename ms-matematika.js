/* ORVIN — Matematika (Milliy sertifikat) moduli
   1) SYLLABUS   — o'rganiladigan mavzular (14 blok)
   2) BLUEPRINT  — 45 topshiriq, jami 100 ball (rasmiy namunaviy variant tuzilishi bo'yicha)
   3) score()    — oddiy hisob: to'g'ri javoblar balli yig'indisi (0–100) va daraja
   Brauzerda: window.MSMath, Node'da: require('./ms-matematika.js') */
(function (root) {
  'use strict';

  /* ---------- 1) O'QUV DASTURI ---------- */
  const SYLLABUS = {
    "Sonlar va amallar": ["Natural sonlar", "Tub va murakkab sonlar", "Bo'linish alomatlari", "EKUB va EKUK", "Oddiy kasrlar", "O'nli va davriy kasrlar", "Foiz va proporsiya", "Daraja va ildiz", "Sonlarni taqqoslash va yaxlitlash", "Standart ko'rinish"],
    "Matnli masalalar": ["Harakat masalalari", "Ish va unumdorlik", "Aralashma va qotishma", "Foizga doir masalalar", "Son va yosh masalalari"],
    "Algebraik shakl almashtirish": ["Birhad va ko'phad", "Qisqa ko'paytirish formulalari", "Ko'paytuvchilarga ajratish", "Algebraik kasrlar", "Ratsional ifodalar", "Irratsional ifodalar", "Modul va uning xossalari"],
    "Tenglamalar": ["Chiziqli tenglamalar", "Kvadrat tenglamalar va Viyet teoremasi", "Bikvadrat tenglamalar", "Kasr-ratsional tenglamalar", "Irratsional tenglamalar", "Modulli tenglamalar", "Parametrli tenglamalar", "Tenglamalar sistemasi", "Yuqori darajali tenglamalar", "Almashtirish usuli"],
    "Tengsizliklar": ["Chiziqli tengsizliklar", "Kvadrat tengsizliklar", "Ratsional tengsizliklar (oraliqlar usuli)", "Irratsional tengsizliklar", "Modulli tengsizliklar", "Ko'rsatkichli tengsizliklar", "Logarifmik tengsizliklar", "Tengsizliklar sistemasi"],
    "Ko'rsatkichli va logarifmik": ["Daraja xossalari", "Ko'rsatkichli tenglamalar", "Logarifm ta'rifi va xossalari", "Logarifmik tenglamalar"],
    "Funksiyalar": ["Aniqlanish va qiymatlar sohasi", "Juft va toq funksiyalar", "Davriylik", "Monotonlik", "Murakkab funksiya", "Teskari funksiya", "Kvadrat funksiya va parabola", "Grafiklarni almashtirish", "Ko'rsatkichli va logarifmik funksiyalar", "Trigonometrik funksiyalar"],
    "Ketma-ketliklar": ["Arifmetik progressiya", "Geometrik progressiya", "Cheksiz kamayuvchi progressiya", "Yig'indilar"],
    "Trigonometriya": ["Burchak o'lchovlari", "Asosiy ayniyatlar", "Keltirish formulalari", "Qo'shish va ikkilangan burchak", "Yig'indini ko'paytmaga aylantirish", "Teskari trigonometrik funksiyalar", "Trigonometrik tenglamalar", "Trigonometrik tengsizliklar"],
    "Hosila va integral": ["Hosila qoidalari", "Urinma tenglamasi", "Monotonlik va ekstremum", "Eng katta va eng kichik qiymat", "Boshlang'ich funksiya", "Aniq integral va yuz", "Funksiya limiti"],
    "Planimetriya": ["Burchaklar", "Uchburchaklar", "O'xshashlik", "To'rtburchaklar", "Aylana va doira", "Muntazam ko'pburchaklar", "Yuzlar", "Sinus va kosinus teoremalari"],
    "Stereometriya": ["To'g'ri chiziq va tekislik", "Prizma", "Piramida", "Silindr va konus", "Shar", "Hajm va sirt yuzi", "Kesimlar"],
    "Vektor va koordinatalar": ["Vektorlar ustida amallar", "Skalyar ko'paytma", "Koordinatalar usuli", "To'g'ri chiziq va aylana tenglamasi", "Fazoda koordinatalar"],
    "To'plam, kombinatorika, ehtimollik": ["To'plamlar", "Kombinatorika", "Klassik ehtimollik", "Statistika (o'rta, mediana, moda)", "Nyuton binomi"]
  };
  const ALL_TOPICS = new Set(Object.values(SYLLABUS).reduce((a, b) => a.concat(b), []));

  /* ---------- 2) REJA: 45 topshiriq = 100 ball ----------
     Y1: yopiq, 1,3 ball (10 ta)      Y2: yopiq, 2,2 ball (22 ta)
     M : moslashtirish, 2,2 ball (3 ta, bitta umumiy sharoit, 33–35)
     O : ochiq, a=1,5 + b=1,7 = 3,2 ball (10 ta, 36–45)
     10*1,3 + 22*2,2 + 3*2,2 + 10*3,2 = 13 + 48,4 + 6,6 + 32 = 100 */
  const PTS = { Y1: 1.3, Y2: 2.2, M: 2.2, Oa: 1.5, Ob: 1.7 };
  // [raqam, tur, asosiy mavzu, almashtirish uchun mavzular (boshqa variantlarda aylantiriladi)]
  const BP = [
    [1, 'Y1', "Natural sonlar", ["Tub va murakkab sonlar", "EKUB va EKUK", "Bo'linish alomatlari"]],
    [2, 'Y2', "O'nli va davriy kasrlar", ["Oddiy kasrlar", "Sonlarni taqqoslash va yaxlitlash"]],
    [3, 'Y2', "Foizga doir masalalar", ["Harakat masalalari", "Ish va unumdorlik", "Aralashma va qotishma", "Son va yosh masalalari"]],
    [4, 'Y2', "Foiz va proporsiya", ["Foizga doir masalalar", "Yuzlar"]],
    [5, 'Y1', "Irratsional ifodalar", ["Daraja va ildiz"]],
    [6, 'Y1', "Sonlarni taqqoslash va yaxlitlash", ["Daraja va ildiz", "Standart ko'rinish"]],
    [7, 'Y2', "Irratsional ifodalar", ["Algebraik kasrlar", "Daraja va ildiz"]],
    [8, 'Y2', "Arifmetik progressiya", ["Yig'indilar"]],
    [9, 'Y2', "Geometrik progressiya", ["Cheksiz kamayuvchi progressiya"]],
    [10, 'Y1', "Qisqa ko'paytirish formulalari", ["Birhad va ko'phad", "Ko'paytuvchilarga ajratish"]],
    [11, 'Y2', "Ratsional ifodalar", ["Algebraik kasrlar", "Daraja xossalari"]],
    [12, 'Y1', "Qo'shish va ikkilangan burchak", ["Asosiy ayniyatlar", "Keltirish formulalari", "Burchak o'lchovlari"]],
    [13, 'Y2', "Yig'indini ko'paytmaga aylantirish", ["Keltirish formulalari", "Qo'shish va ikkilangan burchak"]],
    [14, 'Y2', "Ko'rsatkichli tenglamalar", ["Almashtirish usuli"]],
    [15, 'Y2', "Logarifmik tenglamalar", ["Logarifm ta'rifi va xossalari"]],
    [16, 'Y1', "Kvadrat tenglamalar va Viyet teoremasi", ["Chiziqli tenglamalar"]],
    [17, 'Y2', "Kasr-ratsional tenglamalar", ["Almashtirish usuli", "Bikvadrat tenglamalar"]],
    [18, 'Y1', "Irratsional tengsizliklar", ["Modulli tengsizliklar", "Chiziqli tengsizliklar", "Modul va uning xossalari"]],
    [19, 'Y2', "Ratsional tengsizliklar (oraliqlar usuli)", ["Kvadrat tengsizliklar", "Ko'rsatkichli tengsizliklar", "Logarifmik tengsizliklar", "Tengsizliklar sistemasi"]],
    [20, 'Y1', "Juft va toq funksiyalar", ["Davriylik", "Monotonlik"]],
    [21, 'Y2', "Murakkab funksiya", ["Teskari funksiya", "Aniqlanish va qiymatlar sohasi"]],
    [22, 'Y2', "Aniqlanish va qiymatlar sohasi", ["Kvadrat funksiya va parabola", "Grafiklarni almashtirish"]],
    [23, 'Y2', "Boshlang'ich funksiya", ["Hosila qoidalari"]],
    [24, 'Y1', "Burchaklar", ["Uchburchaklar"]],
    [25, 'Y1', "Uchburchaklar", ["O'xshashlik"]],
    [26, 'Y2', "Aylana va doira", ["Muntazam ko'pburchaklar", "Sinus va kosinus teoremalari"]],
    [27, 'Y2', "To'rtburchaklar", ["Yuzlar", "O'xshashlik"]],
    [28, 'Y2', "Muntazam ko'pburchaklar", ["Aylana va doira", "Yuzlar"]],
    [29, 'Y2', "To'g'ri chiziq va tekislik", ["Kesimlar"]],
    [30, 'Y2', "Vektorlar ustida amallar", ["Skalyar ko'paytma"]],
    [31, 'Y2', "To'plamlar", []],
    [32, 'Y2', "Klassik ehtimollik", ["Kombinatorika", "Statistika (o'rta, mediana, moda)"]],
    [33, 'M', "Silindr va konus", ["Prizma", "Piramida", "Shar"]],
    [34, 'M', "Hajm va sirt yuzi", ["Prizma", "Piramida", "Shar"]],
    [35, 'M', "Foiz va proporsiya", ["Hajm va sirt yuzi"]],
    [36, 'O', "Yuqori darajali tenglamalar", ["Modulli tenglamalar", "Tenglamalar sistemasi", "Parametrli tenglamalar", "Bikvadrat tenglamalar", "Irratsional tenglamalar"]],
    [37, 'O', "Trigonometrik tenglamalar", ["Trigonometrik tengsizliklar", "Teskari trigonometrik funksiyalar"]],
    [38, 'O', "Kvadrat funksiya va parabola", ["Grafiklarni almashtirish"]],
    [39, 'O', "Monotonlik va ekstremum", ["Urinma tenglamasi", "Hosila qoidalari"]],
    [40, 'O', "Aniq integral va yuz", ["Boshlang'ich funksiya"]],
    [41, 'O', "Aylana va doira", ["Sinus va kosinus teoremalari", "Burchaklar"]],
    [42, 'O', "Yuzlar", ["To'rtburchaklar", "O'xshashlik"]],
    [43, 'O', "Koordinatalar usuli", ["To'g'ri chiziq va aylana tenglamasi"]],
    [44, 'O', "Piramida", ["Prizma", "Kesimlar", "Shar"]],
    [45, 'O', "Eng katta va eng kichik qiymat", ["Tenglamalar sistemasi", "Harakat masalalari"]]
  ];
  const BLUEPRINT = BP.map(([n, type, topic, alt]) => ({
    n, type, topic, alt,
    points: type === 'O' ? PTS.Oa + PTS.Ob : PTS[type]
  }));

  /* Dixotomik elementlar: yopiq/moslashtirish = 1 ta, ochiq = 2 ta (a va b). Jami 55. */
  function buildItems() {
    const groups = { Y1: [], Y2: [], M: [], Oa: [], Ob: [] };
    BLUEPRINT.forEach(q => {
      if (q.type === 'O') {
        groups.Oa.push({ id: q.n + 'a', n: q.n, part: 'a', pts: PTS.Oa, topic: q.topic });
        groups.Ob.push({ id: q.n + 'b', n: q.n, part: 'b', pts: PTS.Ob, topic: q.topic });
      } else groups[q.type].push({ id: String(q.n), n: q.n, part: '', pts: q.points, topic: q.topic });
    });
    const out = [];
    Object.keys(groups).forEach(g => groups[g].forEach(it => out.push(it)));
    return out.sort((x, y) => x.n - y.n || x.part.localeCompare(y.part));
  }
  const ITEMS = buildItems();

  /* ---------- 3) ODDIY HISOB ----------
     Ball = to'g'ri javoblar ballari yig'indisi (maksimum 100). Daraja rasmiy chegaralar bo'yicha. */
  const LEVELS = [
    { min: 70, name: 'A+' }, { min: 65, name: 'A' }, { min: 60, name: 'B+' },
    { min: 55, name: 'B' }, { min: 50, name: 'C+' }, { min: 46, name: 'C' }
  ];
  function levelOf(ball) {
    for (const l of LEVELS) if (ball >= l.min) return l.name;
    return "Sertifikat berilmaydi";
  }
  /* correct: to'g'ri javob berilgan element id'lari, masalan ["1","2","36a","36b"] */
  function score(correct) {
    const set = new Set(Array.from(correct || []).map(String));
    let ball = 0, cnt = 0;
    ITEMS.forEach(it => { if (set.has(it.id)) { ball += it.pts; cnt++; } });
    ball = Math.round(ball * 10) / 10;
    return { score: ball, max: 100, correctCount: cnt, total: ITEMS.length, level: levelOf(ball) };
  }
  /* Mavzu bo'yicha natija: zaif mavzularni topish uchun */
  function byTopic(correct) {
    const set = new Set(Array.from(correct || []).map(String)), t = {};
    ITEMS.forEach(it => { const x = t[it.topic] || (t[it.topic] = { got: 0, max: 0 }); x.max += it.pts; if (set.has(it.id)) x.got += it.pts; });
    return Object.keys(t).map(k => ({ topic: k, got: +t[k].got.toFixed(1), max: +t[k].max.toFixed(1), percent: Math.round(100 * t[k].got / t[k].max) })).sort((a, b) => a.percent - b.percent);
  }

  const api = { SYLLABUS, ALL_TOPICS, BLUEPRINT, ITEMS, PTS, LEVELS, score, levelOf, byTopic };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.MSMath = api;
})(typeof window !== 'undefined' ? window : this);
