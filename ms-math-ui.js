/* ORVIN — Matematika bo'limi: chapda O'RGANISH, o'ngda MOCK TEST (uz / ru / en)
   Mavzular va 45 topshiriqli reja ms-matematika.js dan olinadi.
   Savollar generator orqali yaratiladi (BANK ga o'z savollaringizni qo'shishingiz mumkin). */
(function () {
  'use strict';
  if (window.__msUi) return; window.__msUi = true;
  const M = window.MSMath; if (!M) { console.warn('MSMath topilmadi'); return; }
  const DURATION_MIN = (window.MSMock && window.MSMock.duration) || 150;                       // mock test vaqti (daqiqa) — kerak bo'lsa o'zgartiring
  const LG = () => window.ORVIN_LANG || 'en';

  /* ---------- interfeys matnlari (3 til) ---------- */
  const L = {
    uz: { rule:'📖 1. Qoida',example:'🧩 2. Namuna yechim',prHead:'✍️ 3. Mashq',msq:'🎯 4. MS darajasidagi savol',solution:'Yechim:',ans:'Javob',another:'🔄 Boshqa namuna',startPr:'Mashqni boshlash',startMs:'MS savolini ochish',mastered:"O'zlashtirilgan mavzular",mastery:'Daraja',masteryHint:"3 ta ketma-ket to'g'ri javob = o'zlashtirildi",done:"O'zlashtirildi",cont:'Davom etish',review:'Xatolar tahlili',yourAns:'Sizning javobingiz',title: '➗ Matematika', learn: "📚 O'RGANISH", mock: '📝 MOCK TEST', close: '✕ YOPISH', start: 'TESTNI BOSHLASH', finish: 'YAKUNLASH', next: 'Keyingi', prev: 'Oldingi', left: 'Qolgan vaqt', q: 'Savol', answered: 'Javob berilgan', score: 'Ball', level: 'Daraja', correct: "To'g'ri javoblar", weak: 'Takrorlash kerak', again: 'Qayta topshirish', practice: '✏️ Mashq', formulas: 'Asosiy formulalar', inTest: 'Testda', pts: 'ball', info: '45 topshiriq • 100 ball • yopiq (A–D), moslashtirish (A–F) va ochiq (a, b) topshiriqlar • rasmli masalalar', resume: 'Davom ettirish', variant: 'Variant', noGen: 'Bu mavzu uchun mashq tez orada qo\'shiladi', ok: "✓ To'g'ri!", bad: "✗ Noto'g'ri. Javob:", nocert: 'Sertifikat berilmaydi', last: "Oxirgi natija", go: "O'rganish →", more: 'Yana savol', min: 'daq', topics: 'mavzu', confirm: 'Testni yakunlaymizmi?', paraTest: 'Paragraf testi', saved: 'Profilga saqlandi', choose: 'Javobni tanlang', certTitle: '🎓 Matematika sertifikati', certCongrats: 'Barcha paragraflar o‘zlashtirildi! Sertifikatni olishingiz mumkin.', certName: 'Ism va familiya', certNamePh: 'Masalan: Ali Valiyev', certPng: 'PNG yuklab olish', certPdf: 'PDF yuklab olish', certPreview: 'Sertifikat' },
    ru: { rule:'📖 1. Правило',example:'🧩 2. Пример решения',prHead:'✍️ 3. Упражнение',msq:'🎯 4. Вопрос уровня MS',solution:'Решение:',ans:'Ответ',another:'🔄 Другой пример',startPr:'Начать упражнение',startMs:'Открыть вопрос MS',mastered:'Освоено тем',mastery:'Уровень',masteryHint:'3 верных ответа подряд = тема освоена',done:'Освоено',cont:'Продолжить',review:'Разбор ошибок',yourAns:'Ваш ответ',title: '➗ Математика', learn: '📚 ОБУЧЕНИЕ', mock: '📝 МОК-ТЕСТ', close: '✕ ЗАКРЫТЬ', start: 'НАЧАТЬ ТЕСТ', finish: 'ЗАВЕРШИТЬ', next: 'Далее', prev: 'Назад', left: 'Осталось', q: 'Вопрос', answered: 'Отвечено', score: 'Балл', level: 'Уровень', correct: 'Верных ответов', weak: 'Нужно повторить', again: 'Пройти снова', practice: '✏️ Практика', formulas: 'Основные формулы', inTest: 'В тесте', pts: 'балл.', info: '45 заданий • 100 баллов • закрытые (A–D), на соответствие (A–F) и открытые (a, b) задания • задачи с рисунками', resume: 'Продолжить', variant: 'Вариант', noGen: 'Практика по этой теме скоро появится', ok: '✓ Верно!', bad: '✗ Неверно. Ответ:', nocert: 'Сертификат не выдаётся', last: 'Последний результат', go: 'Изучить →', more: 'Ещё вопрос', min: 'мин', topics: 'тем', confirm: 'Завершить тест?', paraTest: 'Тест по параграфу', saved: 'Сохранено в профиле', choose: 'Выберите ответ', certTitle: '🎓 Сертификат по математике', certCongrats: 'Все параграфы освоены! Вы можете получить сертификат.', certName: 'Имя и фамилия', certNamePh: 'Например: Али Валиев', certPng: 'Скачать PNG', certPdf: 'Скачать PDF', certPreview: 'Сертификат' },
    en: { rule:'📖 1. Rule',example:'🧩 2. Worked example',prHead:'✍️ 3. Practice',msq:'🎯 4. MS-level question',solution:'Solution:',ans:'Answer',another:'🔄 Another example',startPr:'Start practice',startMs:'Open MS question',mastered:'Topics mastered',mastery:'Level',masteryHint:'3 correct answers in a row = mastered',done:'Mastered',cont:'Continue',review:'Mistakes review',yourAns:'Your answer',title: '➗ Math', learn: '📚 LEARN', mock: '📝 MOCK TEST', close: '✕ CLOSE', start: 'START TEST', finish: 'FINISH', next: 'Next', prev: 'Back', left: 'Time left', q: 'Question', answered: 'Answered', score: 'Score', level: 'Level', correct: 'Correct answers', weak: 'Topics to review', again: 'Try again', practice: '✏️ Practice', formulas: 'Key formulas', inTest: 'In the test', pts: 'pts', info: '45 tasks • 100 points • closed (A–D), matching (A–F) and open (a, b) tasks • tasks with figures', resume: 'Resume', variant: 'Variant', noGen: 'Practice for this topic is coming soon', ok: '✓ Correct!', bad: '✗ Wrong. Answer:', nocert: 'No certificate', last: 'Last result', go: 'Study →', more: 'Another question', min: 'min', topics: 'topics', confirm: 'Finish the test?', paraTest: 'Paragraph test', saved: 'Saved to profile', choose: 'Choose an answer', certTitle: '🎓 Mathematics Certificate', certCongrats: 'All paragraphs mastered! You can get your certificate.', certName: 'Full name', certNamePh: 'e.g. Ali Valiyev', certPng: 'Download PNG', certPdf: 'Download PDF', certPreview: 'Certificate' }
  };
  const t = k => (L[LG()] || L.en)[k] || k;

  /* ---------- asosiy formulalar (til talab qilmaydi) ---------- */
  const F = {
    "EKUB va EKUK": "EKUB(a,b)·EKUK(a,b) = a·b",
    "Foiz va proporsiya": "x ning p% i = x·p/100\na:b = c:d ⇒ ad = bc",
    "Daraja va ildiz": "aᵐ·aⁿ=aᵐ⁺ⁿ   aᵐ/aⁿ=aᵐ⁻ⁿ   (aᵐ)ⁿ=aᵐⁿ\n√(ab)=√a·√b   a⁰=1   a⁻ⁿ=1/aⁿ",
    "Daraja xossalari": "aᵐ·aⁿ=aᵐ⁺ⁿ   aᵐ/aⁿ=aᵐ⁻ⁿ   (aᵐ)ⁿ=aᵐⁿ",
    "Qisqa ko'paytirish formulalari": "(a±b)²=a²±2ab+b²\na²−b²=(a−b)(a+b)\na³±b³=(a±b)(a²∓ab+b²)",
    "Kvadrat tenglamalar va Viyet teoremasi": "ax²+bx+c=0,  D=b²−4ac\nx=(−b±√D)/2a\nx₁+x₂=−b/a   x₁·x₂=c/a",
    "Chiziqli tenglamalar": "ax+b=c ⇒ x=(c−b)/a",
    "Modul va uning xossalari": "|x|=x (x≥0),  |x|=−x (x<0)\n|x|=a ⇒ x=±a",
    "Arifmetik progressiya": "aₙ=a₁+(n−1)d\nSₙ=(a₁+aₙ)·n/2=(2a₁+(n−1)d)·n/2",
    "Geometrik progressiya": "bₙ=b₁·qⁿ⁻¹\nSₙ=b₁(qⁿ−1)/(q−1)",
    "Cheksiz kamayuvchi progressiya": "|q|<1:   S=b₁/(1−q)",
    "Ko'rsatkichli tenglamalar": "a^f(x)=a^g(x) ⇒ f(x)=g(x)   (a>0, a≠1)",
    "Logarifm ta'rifi va xossalari": "logₐb=c ⇔ aᶜ=b\nlogₐ(xy)=logₐx+logₐy   logₐ(x/y)=logₐx−logₐy\nlogₐxᵏ=k·logₐx   logₐb=log_c b / log_c a",
    "Asosiy ayniyatlar": "sin²α+cos²α=1   tgα=sinα/cosα\n1+tg²α=1/cos²α",
    "Qo'shish va ikkilangan burchak": "sin(α±β)=sinα·cosβ±cosα·sinβ\ncos(α±β)=cosα·cosβ∓sinα·sinβ\nsin2α=2sinα·cosα   cos2α=cos²α−sin²α",
    "Hosila qoidalari": "(xⁿ)'=n·xⁿ⁻¹   (uv)'=u'v+uv'   (u/v)'=(u'v−uv')/v²\n(sin x)'=cos x   (cos x)'=−sin x   (eˣ)'=eˣ   (ln x)'=1/x",
    "Urinma tenglamasi": "y = f(x₀) + f'(x₀)(x − x₀)",
    "Aniq integral va yuz": "∫ₐᵇ f(x)dx = F(b) − F(a)\n∫xⁿdx = xⁿ⁺¹/(n+1) + C",
    "Burchaklar": "180°·(n−2)",
    "Uchburchaklar": "c²=a²+b²\nS=½·a·h=½·ab·sinC",
    "Sinus va kosinus teoremalari": "c²=a²+b²−2ab·cosC\na/sinA=b/sinB=c/sinC=2R",
    "Aylana va doira": "C=2πr   S=πr²",
    "To'rtburchaklar": "S=ab   S=½(a+b)h   S=½·d₁d₂·sinφ",
    "Prizma": "V=S·h",
    "Piramida": "V=⅓·S·h",
    "Silindr va konus": "V=πr²h   S=2πrh\nV=⅓πr²h   S=πrl",
    "Shar": "V=4πR³/3   S=4πR²",
    "Vektorlar ustida amallar": "a±b=(x₁±x₂; y₁±y₂)   |a|=√(x²+y²)",
    "Skalyar ko'paytma": "a·b=x₁x₂+y₁y₂=|a||b|cosφ",
    "Koordinatalar usuli": "d=√((x₂−x₁)²+(y₂−y₁)²)\nM=((x₁+x₂)/2; (y₁+y₂)/2)",
    "Kombinatorika": "Pₙ=n!   Cₙᵏ=n!/(k!(n−k)!)   Aₙᵏ=n!/(n−k)!",
    "Klassik ehtimollik": "P(A)=m/n",
    "To'plamlar": "|A∪B|=|A|+|B|−|A∩B|",
    "Statistika (o'rta, mediana, moda)": "x̄=Σxᵢ/n",
    "Harakat masalalari": "S=v·t     t=S/(v₁+v₂)",
    "Ish va unumdorlik": "t=ab/(a+b)"
  };

  /* ---------- savol generatorlari ---------- */
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1)), P = a => a[R(0, a.length - 1)];
  const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
  const fr = (p, q) => { const g = gcd(p, q); p /= g; q /= g; return q === 1 ? String(p) : p + '/' + q; };
  const T = (uz, ru, en) => ({ uz, ru, en });
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = R(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a; };
  const quad = (S, Q) => `x² ${S >= 0 ? '−' : '+'} ${Math.abs(S)}x ${Q >= 0 ? '+' : '−'} ${Math.abs(Q)}`;
  const roots = () => { let r1, r2; do { r1 = R(-5, 3); r2 = R(r1 + 2, 7); } while (r1 + r2 === 0 || r1 * r2 === 0); return [r1, r2]; };
  const TRI = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
  const dot = () => { const [a, b, c, d] = [R(-4, 6), R(-4, 6), R(-3, 7), R(-3, 7)]; return { s: T("a=({0}; {1}), b=({2}; {3}). a·b = ?", "a=({0}; {1}), b=({2}; {3}). a·b = ?", "a=({0}; {1}), b=({2}; {3}). a·b = ?"), v: [a, b, c, d], a: a * c + b * d }; };
  const pct = () => { const x = P([40, 60, 80, 120, 200, 250]), p = P([10, 20, 25, 30, 40, 50]); return { s: T("{0} sonining {1}% i nechaga teng?", "Чему равны {1}% от числа {0}?", "What is {1}% of {0}?"), v: [x, p], a: +(x * p / 100).toFixed(2) }; };
  const G = {
    "Natural sonlar": () => { const a = R(12, 49), b = R(6, 19), c = R(10, 90); return { s: T("Hisoblang: {0}", "Вычислите: {0}", "Calculate: {0}"), v: [`${a}·${b} − ${c}`], a: a * b - c }; },
    "Bo'linish alomatlari": () => { const k = P([3, 4, 6, 7, 9]), m = R(8, 20), N = k * m + R(0, k - 1); return { s: T("{0} dan oshmaydigan, {1} ga karrali natural sonlar soni?", "Сколько натуральных чисел, не больших {0}, кратны {1}?", "How many natural numbers up to {0} are multiples of {1}?"), v: [N, k], a: m }; },
    "EKUB va EKUK": () => { const g = R(2, 9), [m, n] = P([[2, 3], [3, 5], [4, 5], [2, 5], [3, 4], [5, 7]]); return { s: T("{0} va {1} sonlarining EKUK i?", "НОК чисел {0} и {1}?", "LCM of {0} and {1}?"), v: [g * m, g * n], a: g * m * n }; },
    "Oddiy kasrlar": () => { const b = P([2, 3, 4, 5, 6]), d = P([2, 3, 4, 5, 6].filter(x => x !== b)), a = R(1, b - 1), c = R(1, d - 1); return { s: T("Hisoblang: {0}", "Вычислите: {0}", "Calculate: {0}"), v: [`${a}/${b} + ${c}/${d}`], a: fr(a * d + c * b, b * d), w: [fr(a + c, b + d), fr(a * d + c * b + 1, b * d), fr(a * d + c * b, b * d + 1)] }; },
    "O'nli va davriy kasrlar": () => { const x = R(2, 9) / 10, y = R(2, 9) / 10; return { s: T("Hisoblang: {0}", "Вычислите: {0}", "Calculate: {0}"), v: [`${x} · ${y}`], a: +(x * y).toFixed(2), w: [+(x * y * 10).toFixed(2), +(x * y / 10).toFixed(3), +(x + y).toFixed(2)] }; },
    "Foiz va proporsiya": pct,
    "Harakat masalalari": () => { const v1 = R(40, 70), v2 = R(30, 60), tt = R(2, 5); return { s: T("Ikki shahar orasi {0} km. Ikki avtomobil bir-biriga qarab {1} va {2} km/soat tezlikda chiqdi. Necha soatdan so'ng uchrashadi?", "Расстояние между городами {0} км. Два автомобиля выехали навстречу со скоростями {1} и {2} км/ч. Через сколько часов они встретятся?", "Two cities are {0} km apart. Two cars drive toward each other at {1} and {2} km/h. After how many hours do they meet?"), v: [(v1 + v2) * tt, v1, v2], a: tt }; },
    "Ish va unumdorlik": () => { const [a, b, c] = P([[12, 6, 4], [6, 3, 2], [10, 15, 6], [20, 5, 4], [30, 15, 10], [12, 4, 3]]); return { s: T("Birinchi ishchi ishni {0} kunda, ikkinchisi {1} kunda bajaradi. Birgalikda necha kunda bajaradi?", "Первый рабочий выполняет работу за {0} дн., второй — за {1} дн. За сколько дней они сделают её вместе?", "One worker finishes a job in {0} days, another in {1} days. How many days together?"), v: [a, b], a: c }; },
    "Son va yosh masalalari": () => { const a = R(20, 50), b = R(5, 19); return { s: T("Ikki son yig'indisi {0}, ayirmasi {1}. Katta sonni toping.", "Сумма двух чисел {0}, разность {1}. Найдите большее число.", "Two numbers have sum {0} and difference {1}. Find the larger one."), v: [a + b, a - b], a }; },
    "Daraja va ildiz": () => { const a = R(3, 12), b = R(2, 5), c = R(2, 4); return { s: T("Hisoblang: {0}", "Вычислите: {0}", "Calculate: {0}"), v: [`√${a * a} + ∛${b ** 3} − ${c}²`], a: a + b - c * c }; },
    "Daraja xossalari": () => { const b = P([2, 3, 5]), x = R(5, 9), y = R(2, 4), z = R(1, 4); return { s: T("{0}^{1} · {0}^{2} : {0}^{3} = {0}^k bo'lsa, k = ?", "Если {0}^{1} · {0}^{2} : {0}^{3} = {0}^k, то k = ?", "If {0}^{1} · {0}^{2} : {0}^{3} = {0}^k, then k = ?"), v: [b, x, y, z], a: x + y - z }; },
    "Qisqa ko'paytirish formulalari": () => { const a = R(4, 9), b = R(1, 6); return { s: T("x + y = {0}, xy = {1} bo'lsa, x² + y² = ?", "Если x + y = {0}, xy = {1}, то x² + y² = ?", "If x + y = {0} and xy = {1}, then x² + y² = ?"), v: [a, b], a: a * a - 2 * b }; },
    "Chiziqli tenglamalar": () => { const a = R(2, 9), x = R(-6, 9), b = R(1, 15); return { s: T("Yeching: {0}", "Решите: {0}", "Solve: {0}"), v: [`${a}x + ${b} = ${a * x + b}`], a: x }; },
    "Kvadrat tenglamalar va Viyet teoremasi": () => { const [r1, r2] = roots(); return { s: T("{0} = 0 tenglamaning katta ildizi?", "Больший корень уравнения {0} = 0?", "Larger root of {0} = 0?"), v: [quad(r1 + r2, r1 * r2)], a: r2 }; },
    "Tenglamalar sistemasi": () => { const x = R(3, 12), y = R(1, x - 1); return { s: T("x + y = {0}, x − y = {1} bo'lsa, x·y = ?", "Если x + y = {0}, x − y = {1}, то x·y = ?", "If x + y = {0} and x − y = {1}, then x·y = ?"), v: [x + y, x - y], a: x * y }; },
    "Ko'rsatkichli tenglamalar": () => { const b = P([2, 3, 5]), k = R(2, 4), x = R(1, 5); return { s: T("Yeching: {0}", "Решите: {0}", "Solve: {0}"), v: [`${b}^(${k}x+1) = ${b}^${k * x + 1}`], a: x }; },
    "Logarifm ta'rifi va xossalari": () => { const p = R(3, 6), q = R(2, 4); return { s: T("Hisoblang: {0}", "Вычислите: {0}", "Calculate: {0}"), v: [`log₂${2 ** p} + log₃${3 ** q}`], a: p + q }; },
    "Modul va uning xossalari": () => { const a = R(2, 8), b = R(1, a - 1); return { s: T("|x − {0}| = {1} tenglama ildizlari yig'indisi?", "Сумма корней уравнения |x − {0}| = {1}?", "Sum of roots of |x − {0}| = {1}?"), v: [a, b], a: 2 * a }; },
    "Arifmetik progressiya": () => { const a1 = R(-5, 10), d = R(2, 6), n = R(8, 20); return { s: T("Arifmetik progressiyada a₁ = {0}, d = {1}. a_{2} = ?", "В арифметической прогрессии a₁ = {0}, d = {1}. a_{2} = ?", "In an arithmetic progression a₁ = {0}, d = {1}. a_{2} = ?"), v: [a1, d, n], a: a1 + (n - 1) * d }; },
    "Geometrik progressiya": () => { const b1 = P([1, 2, 3]), q = P([2, 3]), n = R(4, 6); return { s: T("Geometrik progressiyada b₁ = {0}, q = {1}. b_{2} = ?", "В геометрической прогрессии b₁ = {0}, q = {1}. b_{2} = ?", "In a geometric progression b₁ = {0}, q = {1}. b_{2} = ?"), v: [b1, q, n], a: b1 * q ** (n - 1) }; },
    "Cheksiz kamayuvchi progressiya": () => { const k = P([2, 3, 4]), m = R(2, 6); return { s: T("Cheksiz kamayuvchi progressiyada b₁ = {0}, q = 1/{1}. Yig'indisi?", "В бесконечно убывающей прогрессии b₁ = {0}, q = 1/{1}. Найдите сумму.", "Infinite decreasing progression: b₁ = {0}, q = 1/{1}. Find the sum."), v: [(k - 1) * m, k], a: k * m }; },
    "Kvadrat tengsizliklar": () => { const [r1, r2] = roots(); return { s: T("{0} < 0 tengsizlikning butun yechimlari soni?", "Сколько целых решений у неравенства {0} < 0?", "How many integer solutions does {0} < 0 have?"), v: [quad(r1 + r2, r1 * r2)], a: r2 - r1 - 1 }; },
    "Aniqlanish va qiymatlar sohasi": () => { const a = R(2, 8), b = R(1, 7); return { s: T("f(x) = √({0} − x) + √(x + {1}) ning aniqlanish sohasidagi butun sonlar soni?", "Сколько целых чисел в области определения f(x) = √({0} − x) + √(x + {1})?", "How many integers lie in the domain of f(x) = √({0} − x) + √(x + {1})?"), v: [a, b], a: a + b + 1 }; },
    "Juft va toq funksiyalar": () => { const k = R(2, 9), m = R(1, 8); return { s: T("f — juft, g — toq funksiya, f(3) = {0}, g(3) = {1}. f(−3) + g(−3) = ?", "f — чётная, g — нечётная функция, f(3) = {0}, g(3) = {1}. f(−3) + g(−3) = ?", "f is even, g is odd, f(3) = {0}, g(3) = {1}. f(−3) + g(−3) = ?"), v: [k, m], a: k - m }; },
    "Hosila qoidalari": () => { const a = R(1, 4), b = R(1, 5), c = R(1, 9), k = R(1, 3); return { s: T("f(x) = {0} bo'lsa, f'({1}) = ?", "Если f(x) = {0}, то f'({1}) = ?", "If f(x) = {0}, then f'({1}) = ?"), v: [`${a}x³ + ${b}x² + ${c}x`, k], a: 3 * a * k * k + 2 * b * k + c }; },
    "Aniq integral va yuz": () => { const a = R(1, 4), b = R(1, 5), k = P([2, 4, 6]); return { s: T("Hisoblang: {0}", "Вычислите: {0}", "Calculate: {0}"), v: [`∫₀^${k} (${a}x + ${b}) dx`], a: a * k * k / 2 + b * k }; },
    "Burchaklar": () => { const n = P([5, 6, 8, 9, 10, 12]); return { s: T("Muntazam {0} burchakning ichki burchagi (gradus)?", "Внутренний угол правильного {0}-угольника (в градусах)?", "Interior angle of a regular {0}-gon (degrees)?"), v: [n], a: 180 * (n - 2) / n }; },
    "Uchburchaklar": () => { const [a, b, c] = P(TRI), m = R(1, 3); return { s: T("To'g'ri burchakli uchburchak katetlari {0} va {1}. Gipotenuzasi?", "Катеты прямоугольного треугольника {0} и {1}. Гипотенуза?", "Legs of a right triangle are {0} and {1}. Hypotenuse?"), v: [a * m, b * m], a: c * m }; },
    "Aylana va doira": () => { const r = R(3, 12); return { s: T("Doira yuzi {0}π ga teng. Radiusi?", "Площадь круга равна {0}π. Радиус?", "A circle has area {0}π. Its radius?"), v: [r * r], a: r }; },
    "To'rtburchaklar": () => { const a = R(3, 12), b = R(2, 10); return { s: T("To'g'ri to'rtburchak perimetri {0}, tomonlaridan biri {1}. Yuzi?", "Периметр прямоугольника {0}, одна сторона {1}. Площадь?", "A rectangle has perimeter {0} and one side {1}. Its area?"), v: [2 * (a + b), a], a: a * b }; },
    "Silindr va konus": () => { const r = R(2, 6), h = 3 * R(1, 4); return { s: T("Konus radiusi {0}, balandligi {1}. Hajmi V = kπ bo'lsa, k = ?", "Радиус конуса {0}, высота {1}. Если V = kπ, то k = ?", "A cone has radius {0} and height {1}. If V = kπ, then k = ?"), v: [r, h], a: r * r * h / 3 }; },
    "Piramida": () => { const m = R(2, 9), h = R(3, 12); return { s: T("Piramida asosining yuzi {0}, balandligi {1}. Hajmi?", "Площадь основания пирамиды {0}, высота {1}. Объём?", "A pyramid has base area {0} and height {1}. Its volume?"), v: [3 * m, h], a: m * h }; },
    "Prizma": () => { const s = R(4, 15), h = R(2, 9); return { s: T("Prizma asosining yuzi {0}, balandligi {1}. Hajmi?", "Площадь основания призмы {0}, высота {1}. Объём?", "A prism has base area {0} and height {1}. Its volume?"), v: [s, h], a: s * h }; },
    "Kombinatorika": () => { const n = R(5, 12); return { s: T("{0} kishidan 2 kishilik guruhni necha usulda tanlash mumkin?", "Сколькими способами можно выбрать 2 человек из {0}?", "In how many ways can 2 people be chosen from {0}?"), v: [n], a: n * (n - 1) / 2 }; },
    "Klassik ehtimollik": () => { const r = R(2, 7), b = R(2, 8); return { s: T("Qutida {0} ta qizil va {1} ta ko'k shar bor. Tasodifan olingan shar qizil bo'lish ehtimoli?", "В коробке {0} красных и {1} синих шаров. Вероятность вынуть красный?", "A box has {0} red and {1} blue balls. Probability of drawing a red one?"), v: [r, b], a: fr(r, r + b), w: [fr(b, r + b), fr(r, b), fr(r + 1, r + b)] }; },
    "Statistika (o'rta, mediana, moda)": () => { const m = R(5, 12), xs = shuffle([-4, -1, 0, 2, 3].map(d => m + d)); return { s: T("{0} sonlarining o'rta arifmetigi?", "Среднее арифметическое чисел {0}?", "Arithmetic mean of {0}?"), v: [xs.join(', ')], a: m }; },
    "To'plamlar": () => { const a = R(10, 30), b = R(8, 25), c = R(2, 7); return { s: T("|A| = {0}, |B| = {1}, |A∩B| = {2}. |A∪B| = ?", "|A| = {0}, |B| = {1}, |A∩B| = {2}. |A∪B| = ?", "|A| = {0}, |B| = {1}, |A∩B| = {2}. |A∪B| = ?"), v: [a, b, c], a: a + b - c }; },
    "Asosiy ayniyatlar": () => { const [a, b, c] = P(TRI); return { s: T("sinα = {0}, α ∈ (0; π/2). cosα = ?", "sinα = {0}, α ∈ (0; π/2). cosα = ?", "sinα = {0}, α ∈ (0; π/2). cosα = ?"), v: [a + '/' + c], a: fr(b, c), w: [fr(a, b), fr(c, b), fr(b, a)] }; },
    "Qo'shish va ikkilangan burchak": () => { const [a, b, c] = P(TRI); return { s: T("sinα = {0}, α ∈ (0; π/2). sin2α = ?", "sinα = {0}, α ∈ (0; π/2). sin2α = ?", "sinα = {0}, α ∈ (0; π/2). sin2α = ?"), v: [a + '/' + c], a: fr(2 * a * b, c * c), w: [fr(a * b, c * c), fr(2 * a, c), fr(b * b - a * a, c * c)] }; },
    "Skalyar ko'paytma": dot,
    "Koordinatalar usuli": () => { const m = R(1, 4), x = R(-5, 5), y = R(-5, 5); return { s: T("A({0}; {1}) va B({2}; {3}) nuqtalar orasidagi masofa?", "Расстояние между A({0}; {1}) и B({2}; {3})?", "Distance between A({0}; {1}) and B({2}; {3})?"), v: [x, y, x + 3 * m, y + 4 * m], a: 5 * m }; }
  };
  const ALIAS = { "Foizga doir masalalar": "Foiz va proporsiya", "Vektorlar ustida amallar": "Skalyar ko'paytma", "Tub va murakkab sonlar": "Bo'linish alomatlari", "Ratsional tengsizliklar (oraliqlar usuli)": "Kvadrat tengsizliklar", "Modulli tenglamalar": "Modul va uning xossalari", "Modulli tengsizliklar": "Modul va uning xossalari", "Logarifmik tenglamalar": "Logarifm ta'rifi va xossalari", "Yuzlar": "To'rtburchaklar", "Hajm va sirt yuzi": "Silindr va konus", "Shar": "Silindr va konus", "Kvadrat funksiya va parabola": "Aniqlanish va qiymatlar sohasi", "Murakkab funksiya": "Aniqlanish va qiymatlar sohasi", "Irratsional ifodalar": "Daraja va ildiz", "Sonlarni taqqoslash va yaxlitlash": "O'nli va davriy kasrlar", "Aralashma va qotishma": "Foiz va proporsiya", "Muntazam ko'pburchaklar": "Burchaklar", "Yig'indilar": "Arifmetik progressiya", "Sinus va kosinus teoremalari": "Uchburchaklar", "Boshlang'ich funksiya": "Aniq integral va yuz", "Monotonlik va ekstremum": "Hosila qoidalari", "Eng katta va eng kichik qiymat": "Hosila qoidalari", "Yuqori darajali tenglamalar": "Kvadrat tenglamalar va Viyet teoremasi", "Trigonometrik tenglamalar": "Asosiy ayniyatlar", "Yig'indini ko'paytmaga aylantirish": "Qo'shish va ikkilangan burchak", "Kasr-ratsional tenglamalar": "Chiziqli tenglamalar", "Algebraik kasrlar": "Daraja xossalari", "Ratsional ifodalar": "Daraja xossalari", "To'g'ri chiziq va tekislik": "Uchburchaklar", "Irratsional tengsizliklar": "Kvadrat tengsizliklar" };
  const own = topic => G[topic] || (ALIAS[topic] && G[ALIAS[topic]]) || null;
  const LS = window.MSLessons ? window.MSLessons({ R, P, T, fr, shuffle, roots, quad }) : { THEORY: {}, EXPL: {}, G2: {} };
  const own2 = topic => LS.G2[topic] || (ALIAS[topic] && LS.G2[ALIAS[topic]]) || null;
  const GN = new Map(); Object.keys(G).forEach(k => GN.set(G[k], k));
  function blockOf(topic) { for (const k in M.SYLLABUS) if (M.SYLLABUS[k].includes(topic)) return k; return null; }
  function genFor(topic, alt) {                 // asosiy mavzu → almashtirish mavzulari → bo'lim → umumiy
    let g = own(topic); if (g) return g;
    for (const a of (alt || [])) if ((g = own(a))) return g;
    const b = blockOf(topic); if (b) for (const x of M.SYLLABUS[b]) if ((g = own(x))) return g;
    return G["Natural sonlar"];
  }
  const BANK = [];   // o'z savollaringiz: {topic, s:{uz,ru,en}, v:[], a, w:[]}
  function opts(a, w) {
    const A = String(a), set = [A]; (w || []).forEach(x => { x = String(x); if (!set.includes(x)) set.push(x); });
    if (!isNaN(+A)) { const n = +A; let k = 1; while (set.length < 4) { [n + k, n - k, n + 2 * k, n * 2].forEach(x => { x = String(+x.toFixed(2)); if (set.length < 4 && !set.includes(x)) set.push(x); }); k++; } }
    else while (set.length < 4) { const x = fr(R(1, 9), R(10, 20)); if (!set.includes(x)) set.push(x); }
    const o = shuffle(set.slice(0, 4)); return { o, c: o.indexOf(A) };
  }
  function build(g, topic) {
    const q = g(), { o, c } = opts(q.a, q.w), r = { topic, s: q.s, v: q.v, o, c };
    try { const st = q.x || (LS.EXPL[GN.get(g)] ? LS.EXPL[GN.get(g)](q.v, q.a) : null); if (st && st.length) r.x = st; } catch (e) { }
    return r;
  }
  const qText = q => q.s[LG()].replace(/\{(\d)\}/g, (_, i) => q.v[i]);

  /* ---------- holat va ko'rinish ---------- */
  let savedMathProgress = {};
  try { savedMathProgress = JSON.parse(localStorage.getItem('orvin_math_progress') || '{}') || {}; } catch (_) {}
  const S = { tab: 'learn', openB: {}, openT: null, pr: null, qs: null, ans: [], cur: 0, end: 0, state: 'idle', res: null, tm: null, lessonTests: savedMathProgress };
  function saveMathProgress() {
    try { localStorage.setItem('orvin_math_progress', JSON.stringify(S.lessonTests)); } catch (e) { console.warn('Math progress local save failed', e); }
  }
  function paragraphTestKey(topic, index) { return topic + '::' + index; }
  function ensureParagraphTest(topic, index) {
    const key = paragraphTestKey(topic, index);
    if (!S.lessonTests[key]) {
      const q = build(genFor(topic), topic);
      S.lessonTests[key] = { q, answer: null, correct: null, updatedAt: Date.now() };
      saveMathProgress();
    }
    return S.lessonTests[key];
  }
  const css = document.createElement('style');
  css.textContent = `#msMath{position:fixed;inset:0;z-index:10005;display:none;flex-direction:column;color:#eafaff;font-family:system-ui,sans-serif;background:linear-gradient(rgba(1,5,14,.55),rgba(1,5,14,.85)),var(--spaceBg) 50% 50%/cover no-repeat,#030814}
#msMath.show{display:flex}
#msMath .mt{display:flex;align-items:center;gap:10px;padding:10px 14px;padding-top:calc(10px + env(safe-area-inset-top,0px));background:rgba(4,12,28,.85);border-bottom:1px solid rgba(130,200,255,.3)}
#msMath .mt b{font-size:15px;letter-spacing:2px}#msMath .mt #mmX{margin-left:8px}#msMath .mt .olang{margin-left:auto}#msMath .olang button{margin:0;padding:6px 9px;border:0;background:none;border-radius:10px}#msMath .olang button.on{background:#0ff;color:#012}
#msMath button{font:inherit;color:#dff;border:1px solid #7cf;border-radius:10px;background:rgba(0,60,90,.6);padding:8px 12px;font-weight:700;cursor:pointer}
#msMath button.pri{background:#0ff;color:#012;border-color:#0ff}
#msMath .tabs{display:none;gap:8px;padding:8px 12px}#msMath .tabs button{flex:1}#msMath .tabs button.on{background:#0ff;color:#012}
#msMath .cols{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px}
#msMath section{overflow:auto;min-height:0;padding:12px;border:1px solid rgba(130,200,255,.35);border-radius:14px;background:rgba(4,14,32,.66)}
#msMath h3{font-size:13px;letter-spacing:2px;margin-bottom:10px;color:#7df9ff}
#msMath .blk{margin-bottom:8px;border:1px solid rgba(130,200,255,.3);border-radius:10px;overflow:hidden}
#msMath .bh{width:100%;text-align:left;border:0;border-radius:0;display:flex;justify-content:space-between;gap:8px;background:rgba(0,40,70,.55)}
#msMath .tp{width:100%;text-align:left;border:0;border-radius:0;background:transparent;border-top:1px solid rgba(130,200,255,.15);display:flex;justify-content:space-between;gap:8px;font-weight:500}
#msMath .tp small{opacity:.7;white-space:nowrap}
#msMath .ls{padding:10px;background:rgba(0,20,40,.6);border-top:1px solid rgba(130,200,255,.15);font-size:14px;line-height:1.5}
#msMath .p-test{margin:8px 0 14px;padding:10px;border:1px solid rgba(125,249,255,.24);border-radius:12px;background:rgba(0,35,55,.42)}#msMath .p-test>b{display:block;color:#7df9ff;font-size:12px;letter-spacing:.5px;margin-bottom:5px}#msMath .p-test .qs{font-size:14px;margin:6px 0}#msMath .p-test .op{font-size:13px;padding:7px 9px}#msMath .p-test .op:disabled{opacity:1;cursor:default}#msMath .pt-feedback{margin-top:7px;font-weight:700}#msMath .p-test small{display:block;margin-top:5px;opacity:.65}
#msMath .fm{white-space:pre-wrap;font:600 14px/1.7 ui-monospace,Menlo,monospace;color:#bff;margin:6px 0 10px}
#msMath .op{display:block;width:100%;text-align:left;margin:6px 0;font-weight:500}
#msMath .op.ok{background:#0a7a4a;border-color:#4fa}#msMath .op.no{background:#7a1a2a;border-color:#f78}#msMath .op.sel{background:#0ff;color:#012}
#msMath .qn{display:grid;grid-template-columns:repeat(9,1fr);gap:4px;margin:8px 0}
#msMath .qn button{padding:5px 0;font-size:12px}#msMath .qn button.dn{background:#06507a}#msMath .qn button.cu{background:#0ff;color:#012}
#msMath .qs{font-size:17px;line-height:1.5;margin:10px 0}
#msMath .row{display:flex;gap:8px;justify-content:space-between;align-items:center;margin-top:10px}
#msMath .big{font-size:34px;font-weight:800;color:#0ff}
#msMath .ov{margin-bottom:10px;padding:10px;border:1px solid rgba(125,249,255,.3);border-radius:12px;background:rgba(0,40,60,.5)}#msMath .pb{height:8px;border-radius:6px;background:rgba(255,255,255,.12);margin:6px 0 8px;overflow:hidden}#msMath .pb i{display:block;height:100%;background:linear-gradient(90deg,#0ff,#4fa)}#msMath .ov .pri{width:100%;text-align:left}
#msMath .stp{margin:14px 0 6px;padding:5px 9px;border-left:3px solid #0ff;background:rgba(0,255,255,.08);font-weight:800;font-size:13px;letter-spacing:.5px;color:#7df9ff}
#msMath .idea{padding:8px 10px;border-radius:10px;background:rgba(255,220,120,.1);border:1px solid rgba(255,220,120,.3);line-height:1.5}
#msMath .mb{margin:4px 0 6px;font-size:13px;letter-spacing:2px}#msMath .mb small{letter-spacing:0;opacity:.7}
#msMath .sol{margin:8px 0;padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.28);border:1px dashed rgba(125,249,255,.35)}#msMath .sol .fm{margin:4px 0 0}
#msMath .vd{margin:8px 0;padding:6px 10px;border-radius:8px;font-weight:700}#msMath .vd.g{background:rgba(10,122,74,.35)}#msMath .vd.b{background:rgba(122,26,42,.45)}
#msMath details.rv{margin:6px 0;padding:6px 9px;border:1px solid rgba(255,120,140,.35);border-radius:10px;background:rgba(80,10,25,.25)}#msMath details.rv summary{cursor:pointer;font-weight:700}
body.math-mode #mic,body.math-mode #bub,body.math-mode #bubu,body.math-mode #orvinLang{display:none!important}
#msMath{contain:layout paint;background:linear-gradient(rgba(1,5,14,.9),rgba(1,5,14,.97)),#030814!important}
#msMath section{contain:content;will-change:auto}
@media(max-width:759px){#msMath .tabs{display:flex}#msMath .cols{grid-template-columns:1fr}#msMath[data-tab=learn] #mmMock,#msMath[data-tab=mock] #mmLearn{display:none}}`;
  document.head.appendChild(css);
  const root = document.createElement('div'); root.id = 'msMath';
  root.innerHTML = `<div class="mt"><b data-keep-uz="true" id="mmTitle"></b><button id="mmX" data-keep-uz="true"></button></div><div class="tabs"><button id="mmTL" data-keep-uz="true"></button><button id="mmTM" data-keep-uz="true"></button></div><div class="cols"><section id="mmLearn"></section><section id="mmMock"></section></div>`;
  document.body.appendChild(root);
  const $ = id => document.getElementById(id);
  const K = 'data-keep-uz="true"';

  function chrome() {
    $('mmTitle').textContent = t('title'); $('mmX').textContent = t('close'); $('mmTL').textContent = t('learn'); $('mmTM').textContent = t('mock');
    if (window.OrvinLang && OrvinLang.mount) OrvinLang.mount(root.querySelector('.mt'), $('mmX'));
    root.dataset.tab = S.tab; $('mmTL').classList.toggle('on', S.tab === 'learn'); $('mmTM').classList.toggle('on', S.tab === 'mock');
  }
  function topicInfo(tp) {
    const qs = M.BLUEPRINT.filter(q => q.topic === tp); if (!qs.length) return '';
    const pts = qs.reduce((s, q) => s + q.points, 0);
    return `${t('inTest')}: №${qs.map(q => q.n).join(', ')} · ${Math.round(pts * 10) / 10} ${t('pts')}`;
  }
  /* ---------- O'QUV TIZIMI: qoida → namuna → mashq → MS savol; o'zlashtirish hisobi ---------- */
  const IDX = () => ({ uz: 0, ru: 1, en: 2 }[LG()] || 2);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const dsp = o => String(o).replace(/^-/, '−');
  const isDone = tp => { const m = (S.lessonTests._m || {})[tp]; return !!(m && m.streak >= 3); };
  const streakOf = tp => { const m = (S.lessonTests._m || {})[tp]; return m ? Math.min(3, m.streak) : 0; };
  function record(tp, ok) {
    const all = (S.lessonTests._m = S.lessonTests._m || {}), m = all[tp] || (all[tp] = { ok: 0, no: 0, streak: 0 });
    if (ok) { m.ok++; m.streak++; } else { m.no++; m.streak = 0; }
    saveMathProgress();
  }
  const solHtml = q => (q && q.x && q.x.length) ? `<div class="sol" ${K}><b>${t('solution')}</b><div class="fm">${esc(q.x.join('\n'))}</div></div>` : '';
  const optBtns = (q, p, attr) => q.o.map((o, i) => { const cls = p == null ? '' : i === q.c ? 'ok' : i === p ? 'no' : ''; return `<button class="op ${cls}" data-${attr}="${i}" ${K}>${'ABCD'[i]}) ${dsp(o)}</button>`; }).join('');
  const verdict = (q, p) => `<div class="vd ${p === q.c ? 'g' : 'b'}" ${K}>${p === q.c ? t('ok') : t('bad') + ' ' + dsp(q.o[q.c])}</div>`;
  const wq = tp => tp.replace(/"/g, '&quot;');

  function renderLearn() {
    const ALLT = Object.values(M.SYLLABUS).reduce((n, a) => n + a.length, 0);
    const doneN = Object.values(M.SYLLABUS).reduce((n, a) => n + a.filter(isDone).length, 0);
    let h = `<h3 ${K}>${t('learn')}</h3>`;
    h += `<div class="ov"><div ${K}>${t('mastered')}: <b>${doneN}/${ALLT}</b></div><div class="pb"><i style="width:${Math.round(100 * doneN / ALLT)}%"></i></div>`;
    const rec = M.BLUEPRINT.slice().sort((a, b) => b.points - a.points).map(b => b.topic).find(tp => own(tp) && !isDone(tp));
    if (rec) h += `<button class="pri" data-go="${wq(rec)}"><span ${K}>▶ ${t('cont')}:</span> <span>${rec}</span></button>`;
    h += `</div>`;
    /* ----- Barcha paragraflar o‘zlashtirilganda sertifikat ----- */
    if (doneN >= ALLT && ALLT > 0) {
      const savedName = (S.lessonTests._certName || localStorage.getItem('orvin_math_cert_name') || '').trim();
      h += `<div class="math-cert-box" style="margin:18px 0;padding:16px;border:1px solid rgba(0,200,255,.45);border-radius:12px;background:linear-gradient(145deg,rgba(8,20,40,.92),rgba(12,40,70,.88))">
        <div style="font-size:18px;font-weight:700;margin-bottom:6px" ${K}>${t('certTitle')}</div>
        <p style="opacity:.9;margin:0 0 12px" ${K}>${t('certCongrats')}</p>
        <label style="display:block;font-size:13px;opacity:.85;margin-bottom:4px" ${K}>${t('certName')}</label>
        <input id="mathCertName" type="text" maxlength="60" placeholder="${t('certNamePh')}" value="${esc(savedName)}"
          style="width:100%;max-width:320px;padding:8px 12px;border-radius:8px;border:1px solid #3a6a8a;background:#0a1a2e;color:#eafcff;margin-bottom:12px">
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px">
          <button class="pri" id="mathCertPng" ${K}>${t('certPng')}</button>
          <button class="pri" id="mathCertPdf" ${K}>${t('certPdf')}</button>
        </div>
        <canvas id="mathCertCanvas" style="display:none;max-width:100%;border-radius:8px;border:1px solid #31516c"></canvas>
        <img id="mathCertPreview" alt="${t('certPreview')}" style="display:none;max-width:100%;border-radius:8px;border:1px solid #31516c;margin-top:8px">
      </div>`;
    }
    Object.keys(M.SYLLABUS).forEach((b, bi) => {
      const open = S.openB[b], tps = M.SYLLABUS[b], bd = tps.filter(isDone).length;
      h += `<div class="blk"><button class="bh" data-b="${bi}"><span>${bi + 1}. ${b}</span><small ${K}>${bd}/${tps.length} ✓ ${open ? '▾' : '▸'}</small></button>`;
      if (open) tps.forEach((tp, ti) => {
        const key = bi + '.' + ti, info = topicInfo(tp);
        h += `<button class="tp" data-t="${key}"><span>${tp}</span><small ${K}>${isDone(tp) ? '✅' : (info ? '★' : '')}</small></button>`;
        if (S.openT === key) {
          h += `<div class="ls">`;
          if (info) h += `<div ${K} style="opacity:.8;font-size:12px">${info}</div>`;
          const sk = streakOf(tp);
          h += `<div class="mb" ${K}>${t('mastery')}: ${[0, 1, 2].map(i => i < sk ? '●' : '○').join(' ')} ${isDone(tp) ? '✅ ' + t('done') : ''}<br><small>${t('masteryHint')}</small></div>`;
          /* 1) QOIDA */
          h += `<div class="stp" ${K}>${t('rule')}</div>`;
          const th = LS.THEORY[tp] || (ALIAS[tp] && LS.THEORY[ALIAS[tp]]);
          if (th) { const ruleText = Array.isArray(th) ? (th[IDX()] || th[0] || '') : th; h += `<div class="idea" ${K}>${ruleText}</div>`; }
          if (F[tp]) {
            h += `<div ${K}><b>${t('formulas')}</b></div>`;
            const paragraphs = String(F[tp]).split(/\n+/).map(x => x.trim()).filter(Boolean);
            paragraphs.forEach((paragraph, pi) => {
              const item = ensureParagraphTest(tp, pi), q = item.q;
              h += `<div class="fm" ${K}>${paragraph}</div>`;
              h += `<div class="p-test" data-pt="${encodeURIComponent(tp)}" data-pi="${pi}"><b>${t('paraTest')} ${pi + 1}</b><div class="qs">${qText(q)}</div>`;
              q.o.forEach((option, oi) => {
                const cls = item.answer == null ? '' : (oi === q.c ? 'ok' : (oi === item.answer ? 'no' : ''));
                h += `<button class="op ${cls}" data-pto="${oi}" ${item.answer != null ? 'disabled' : ''}>${'ABCD'[oi]}) ${dsp(option)}</button>`;
              });
              if (item.answer != null) h += `<div class="pt-feedback">${item.correct ? t('ok') : t('bad') + ' ' + dsp(q.o[q.c])}</div><small>${t('saved')}</small>`;
              h += `</div>`;
            });
          }
          if (own(tp)) {
            /* 2) NAMUNA */
            if (!S.ex || S.ex.key !== key) S.ex = { key, q: build(own(tp), tp) };
            const eq = S.ex.q;
            h += `<div class="stp" ${K}>${t('example')}</div><div class="qs" ${K}>${qText(eq)}</div>${solHtml(eq)}<div class="vd g" ${K}>${t('ans')}: <b>${dsp(eq.o[eq.c])}</b></div><button data-ex="${key}" ${K}>${t('another')}</button>`;
            /* 3) MASHQ */
            h += `<div class="stp" ${K}>${t('prHead')}</div>`;
            if (!S.pr || S.pr.key !== key) h += `<button class="pri" data-pr="${key}" ${K}>${t('startPr')}</button>`;
            else {
              const q = S.pr.q; h += `<div class="qs" ${K}>${qText(q)}</div>${optBtns(q, S.pr.p, 'po')}`;
              if (S.pr.p != null) h += `${verdict(q, S.pr.p)}${solHtml(q)}<button class="pri" data-pr="${key}" ${K}>${t('more')}</button>`;
            }
          } else h += `<div ${K} style="opacity:.7">${t('noGen')}</div>`;
          /* 4) MS DARAJASIDAGI SAVOL */
          const g2 = own2(tp);
          if (g2) {
            h += `<div class="stp" ${K}>${t('msq')}</div>`;
            if (!S.ms || S.ms.key !== key) h += `<button class="pri" data-ms="${key}" ${K}>${t('startMs')}</button>`;
            else {
              const q = S.ms.q; h += `<div class="qs" ${K}>${qText(q)}</div>${optBtns(q, S.ms.p, 'mo')}`;
              if (S.ms.p != null) h += `${verdict(q, S.ms.p)}${solHtml(q)}<button class="pri" data-ms="${key}" ${K}>${t('more')}</button>`;
            }
          }
          h += `</div>`;
        }
      });
      h += `</div>`;
    });
    const el = $('mmLearn'), sc = el.scrollTop; el.innerHTML = h; el.scrollTop = sc;
  }
  const mm = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  function renderMock() {
    const el = $('mmMock'); let h = `<h3 ${K}>${t('mock')}</h3>`;
    if (S.state === 'idle') {
      h += `<div ${K} style="opacity:.85;line-height:1.5">${t('info')}<br>⏱ ${DURATION_MIN} ${t('min')}</div><div class="row">${window.MSMock && window.MSMock.hasSession() ? `<button class="pri" id="mmResume" ${K}>${t('resume')}</button>` : ''}<button class="${window.MSMock && window.MSMock.hasSession() ? '' : 'pri'}" id="mmStart" ${K}>${t('start')}</button></div>`;
      try { const l = S.lessonTests._mockLast || JSON.parse(localStorage.getItem('orvin_ms_last') || 'null'); if (l) h += `<p ${K} style="margin-top:14px;opacity:.8">${t('last')}: <b>${l.score}</b> / 100 · ${l.level === 'none' ? t('nocert') : l.level}</p>`; } catch (e) { }
    } else if (S.state === 'run') {
      const q = S.qs[S.cur], bp = M.BLUEPRINT[S.cur], a = S.ans[S.cur];
      h += `<div class="row" ${K}><span>${t('left')}: <b id="mmTimer">${mm(Math.max(0, Math.round((S.end - Date.now()) / 1000)))}</b></span><span>${t('answered')}: ${S.ans.filter(x => x != null).length}/45</span></div>`;
      h += `<div class="qn">${S.qs.map((_, i) => `<button data-qn="${i}" class="${i === S.cur ? 'cu' : S.ans[i] != null ? 'dn' : ''}">${i + 1}</button>`).join('')}</div>`;
      h += `<div ${K} style="opacity:.7;font-size:12px">${t('q')} ${S.cur + 1} · ${bp.points.toFixed(1)} ${t('pts')}</div><div class="qs" ${K}>${qText(q)}</div>`;
      q.o.forEach((o, i) => { h += `<button class="op ${a === i ? 'sel' : ''}" data-o="${i}" ${K}>${'ABCD'[i]}) ${dsp(o)}</button>`; });
      h += `<div class="row" ${K}><button data-nv="-1" ${S.cur ? '' : 'disabled'}>${t('prev')}</button><button class="pri" id="mmFin">${t('finish')}</button><button data-nv="1" ${S.cur < 44 ? '' : 'disabled'}>${t('next')}</button></div>`;
    } else {
      const r = S.res; h += `<div ${K}><div class="big">${r.score} / 100</div><div>${t('level')}: <b>${r.level === 'none' ? t('nocert') : r.level}</b></div><div>${t('correct')}: ${r.correctCount}/${r.total}</div></div>`;
      if (r.weak.length) { h += `<h3 style="margin-top:14px" ${K}>${t('weak')}</h3>`; r.weak.forEach(w => { h += `<div class="row"><span>${w.topic} <small ${K}>${w.percent}%</small></span><button data-go="${w.topic.replace(/"/g, '&quot;')}" ${K}>${t('go')}</button></div>`; }); }
      if ((S.rev || []).length) { h += `<h3 style="margin-top:14px" ${K}>${t('review')}</h3>`; S.rev.forEach(r => { h += `<details class="rv"><summary><span ${K}>№${r.n}</span> ${r.q.topic}</summary><div class="qs" ${K}>${qText(r.q)}</div><div ${K}>${t('yourAns')}: <b>${r.a == null ? '—' : dsp(r.q.o[r.a])}</b> · ${t('ans')}: <b>${dsp(r.q.o[r.q.c])}</b></div>${solHtml(r.q)}</details>`; }); }
      h += `<div class="row"><button class="pri" id="mmAgain" ${K}>${t('again')}</button></div>`;
    }
    el.innerHTML = h;
  }
  function renderAll() { chrome(); renderLearn(); renderMock(); }

  /* ---------- yangi mock (ms-mock.js): to'liq ekranli imtihon ---------- */
  function goTopic(tp) { const bk = blockOf(tp); if (bk) { S.openB[bk] = true; S.openT = Object.keys(M.SYLLABUS).indexOf(bk) + '.' + M.SYLLABUS[bk].indexOf(tp); S.pr = null; S.ex = null; S.ms = null; S.tab = 'learn'; renderAll(); } }
  function saveMock(res) {
    S.res = res; try { localStorage.setItem('orvin_ms_last', JSON.stringify({ score: res.score, level: res.level })); } catch (e) { }
    const stamp = Date.now(); S.lessonTests._mockLast = { ...res, updatedAt: stamp };
    S.lessonTests._mockHistory = S.lessonTests._mockHistory || {}; S.lessonTests._mockHistory[String(stamp)] = { ...res, updatedAt: stamp };
    saveMathProgress();
  }
  function openMock(fresh) {
    if (!window.MSMock || !window.MSMock.open({ fresh: !!fresh, onFinish: saveMock, onGo: goTopic, onClose: () => { S.state = 'idle'; renderMock(); } })) return startTest();
  }
  function startTest() {
    S.qs = M.BLUEPRINT.map(b => { const bank = BANK.filter(x => x.topic === b.topic); if (bank.length) { const x = P(bank), { o, c } = opts(x.a, x.w); return { topic: b.topic, s: x.s, v: x.v, o, c }; } const g2 = own2(b.topic) || (b.alt || []).map(own2).find(Boolean); if (g2 && Math.random() < 0.6) return build(g2, b.topic); return build(genFor(b.topic, b.alt), b.topic); });
    S.ans = new Array(45).fill(null); S.cur = 0; S.end = Date.now() + DURATION_MIN * 60000; S.state = 'run'; clearInterval(S.tm);
    S.tm = setInterval(() => { const s = Math.round((S.end - Date.now()) / 1000), e = $('mmTimer'); if (e) e.textContent = mm(Math.max(0, s)); if (s <= 0) finish(true); }, 1000);
    renderMock();
  }
  function finish(force) {
    if (!force && !confirm(t('confirm'))) return;
    clearInterval(S.tm); const ok = [];
    M.BLUEPRINT.forEach((b, i) => { if (S.ans[i] === S.qs[i].c) { if (b.type === 'O') ok.push(b.n + 'a', b.n + 'b'); else ok.push(String(b.n)); } });
    const sc = M.score(ok), weak = M.byTopic(ok).filter(x => x.percent < 100).slice(0, 5);
    S.res = { score: sc.score, level: sc.score >= 46 ? sc.level : 'none', correctCount: S.ans.filter((a, i) => a === S.qs[i].c).length, total: 45, weak };
    try { localStorage.setItem('orvin_ms_last', JSON.stringify({ score: sc.score, level: S.res.level })); } catch (e) { }
    const stamp = Date.now();
    S.lessonTests._mockLast = { ...S.res, updatedAt: stamp };
    S.lessonTests._mockHistory = S.lessonTests._mockHistory || {};
    S.lessonTests._mockHistory[String(stamp)] = { ...S.res, updatedAt: stamp };
    saveMathProgress();
    S.rev = M.BLUEPRINT.map((b, i) => ({ n: b.n, q: S.qs[i], a: S.ans[i] })).filter(r => r.a !== r.q.c);
    S.state = 'done'; renderMock();
  }

  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; const d = b.dataset;
    if (b.id === 'mmX') return window.closeMath();
    if (b.id === 'mmTL') { S.tab = 'learn'; return chrome(); }
    if (b.id === 'mmTM') { S.tab = 'mock'; return chrome(); }
    if (d.b != null) { const k = Object.keys(M.SYLLABUS)[+d.b]; S.openB[k] = !S.openB[k]; return renderLearn(); }
    if (d.t != null) { S.openT = S.openT === d.t ? null : d.t; S.pr = null; S.ex = null; S.ms = null; return renderLearn(); }
    if (d.ex != null) { const [bi, ti] = d.ex.split('.').map(Number), tp = M.SYLLABUS[Object.keys(M.SYLLABUS)[bi]][ti]; S.ex = { key: d.ex, q: build(own(tp), tp) }; return renderLearn(); }
    if (d.ms != null) { const [bi, ti] = d.ms.split('.').map(Number), tp = M.SYLLABUS[Object.keys(M.SYLLABUS)[bi]][ti]; S.ms = { key: d.ms, q: build(own2(tp), tp), p: null }; return renderLearn(); }
    if (d.mo != null && S.ms && S.ms.p == null) { S.ms.p = +d.mo; record(S.ms.q.topic, S.ms.p === S.ms.q.c); return renderLearn(); }
    if (d.pr != null) { const [bi, ti] = d.pr.split('.').map(Number), tp = M.SYLLABUS[Object.keys(M.SYLLABUS)[bi]][ti]; S.pr = { key: d.pr, q: build(own(tp), tp), p: null }; return renderLearn(); }
    if (d.pto != null) {
      const card = b.closest('[data-pt]'); if (!card) return;
      const topic = decodeURIComponent(card.dataset.pt), index = +card.dataset.pi, item = ensureParagraphTest(topic, index);
      if (item.answer != null) return;
      item.answer = +d.pto; item.correct = item.answer === item.q.c; item.updatedAt = Date.now();
      saveMathProgress(); return renderLearn();
    }
    if (d.po != null && S.pr && S.pr.p == null) { S.pr.p = +d.po; record(S.pr.q.topic, S.pr.p === S.pr.q.c); return renderLearn(); }
    if (b.id === 'mmResume') return openMock(false);
    if (b.id === 'mmStart' || b.id === 'mmAgain') return openMock(true);
    if (b.id === 'mmFin') return finish(false);
    if (d.qn != null) { S.cur = +d.qn; return renderMock(); }
    if (d.nv != null) { S.cur = Math.min(44, Math.max(0, S.cur + +d.nv)); return renderMock(); }
    if (d.o != null) { S.ans[S.cur] = +d.o; return renderMock(); }
    if (d.go) { const tp = d.go, bk = blockOf(tp); if (bk) { S.openB[bk] = true; S.openT = Object.keys(M.SYLLABUS).indexOf(bk) + '.' + M.SYLLABUS[bk].indexOf(tp); S.pr = null; S.ex = null; S.ms = null; S.tab = 'learn'; renderAll(); } }
    /* Matematika sertifikati: PNG / PDF */
    if (b.id === 'mathCertPng' || b.id === 'mathCertPdf') {
      const nameEl = root.querySelector('#mathCertName');
      const name = (nameEl && nameEl.value || '').trim().slice(0, 60);
      if (!name) { alert(t('certNamePh')); return; }
      S.lessonTests._certName = name;
      try { localStorage.setItem('orvin_math_cert_name', name); } catch (_) {}
      drawMathCert(name, b.id === 'mathCertPdf');
      return;
    }
  });
  window.__msState = S;

  /* ---------- Matematika sertifikati (canvas → PNG / PDF) ---------- */
  const mathCertImg = new Image();
  mathCertImg.src = (document.querySelector('script[src*="ms-math"]') ? '' : '') + 'math_certificate.png';
  // fallback path relative to index
  try { mathCertImg.src = 'math_certificate.png'; } catch (_) {}

  function drawMathCert(name, asPdf) {
    const paint = () => {
      const c = document.createElement('canvas');
      const w = mathCertImg.naturalWidth || 1600;
      const h = mathCertImg.naturalHeight || 1131;
      c.width = w; c.height = h;
      const x = c.getContext('2d');
      x.drawImage(mathCertImg, 0, 0, w, h);
      // Ism-familiya (sertifikat markaziga yaqin, "This is to certify that" ostida)
      x.fillStyle = '#eafcff';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      const fontSize = Math.max(28, Math.round(w * 0.032));
      let fs2 = fontSize; x.font = `bold ${fs2}px "Segoe UI", Arial, sans-serif`;
      while (x.measureText(name).width > w * 0.56 && fs2 > 18) { fs2 -= 2; x.font = `bold ${fs2}px "Segoe UI", Arial, sans-serif`; }
      x.shadowColor = 'rgba(0,200,255,0.6)';
      x.shadowBlur = 8;
      x.fillText(name, w / 2, h * 0.435);
      x.shadowBlur = 0;

      // Preview
      const prev = root.querySelector('#mathCertPreview');
      if (prev) { prev.src = c.toDataURL('image/png'); prev.style.display = 'block'; }
      const canvasEl = root.querySelector('#mathCertCanvas');
      if (canvasEl) { canvasEl.width = w; canvasEl.height = h; canvasEl.getContext('2d').drawImage(c, 0, 0); }

      if (asPdf) {
        // jsPDF mavjud bo‘lsa PDF, aks holda PNG
        const J = window.jspdf && window.jspdf.jsPDF;
        if (J) {
          const pdf = new J({ orientation: w > h ? 'landscape' : 'portrait', unit: 'px', format: [w, h] });
          pdf.addImage(c.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, w, h);
          pdf.save('ORVIN_Mathematics_Certificate.pdf');
        } else {
          // fallback PNG
          const a = document.createElement('a');
          a.href = c.toDataURL('image/png');
          a.download = 'ORVIN_Mathematics_Certificate.png';
          a.click();
        }
      } else {
        const a = document.createElement('a');
        a.href = c.toDataURL('image/png');
        a.download = 'ORVIN_Mathematics_Certificate.png';
        a.click();
      }
    };
    if (mathCertImg.complete && mathCertImg.naturalWidth) paint();
    else mathCertImg.onload = paint;
  }
  window.addEventListener('orvin-math-progress-updated', () => {
    try {
      const cloud = JSON.parse(localStorage.getItem('orvin_math_progress') || '{}') || {};
      S.lessonTests = { ...S.lessonTests, ...cloud };
      if (root.classList.contains('show') && S.tab === 'learn') renderLearn();
    } catch (_) {}
  });
  window.openMath = function () {
    document.body.classList.add('math-mode');
    try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(true); } catch (_) {}
    renderAll(); root.classList.add('show');
  };
  window.closeMath = function () {
    root.classList.remove('show'); document.body.classList.remove('math-mode');
    try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(false); } catch (_) {}
  };
  window.addEventListener('orvin-lang', () => { renderAll(); });
  /* Bosh sahifadagi tugma: "O'quv" (ichida Matematika) */
  const NAME = { uz: "O'quv", ru: 'Обучение', en: 'Learn' };
  const SUBT = { uz: "Matematika · dars, mashq, MS savollar", ru: 'Математика · уроки, практика, вопросы MS', en: 'Math · lessons, practice, MS questions' };
  function fixCard() {
    const sp = document.querySelector('[data-go="math"] span'); if (!sp) return;
    let b = sp.querySelector('.mmLbl'), sm = sp.querySelector('small');
    if (!b) { b = document.createElement('b'); b.className = 'mmLbl'; b.setAttribute('data-keep-uz', 'true'); sp.insertBefore(b, sp.firstChild); [...sp.childNodes].forEach(n => { if (n.nodeType === 3) n.remove(); }); }
    const v = '📚 ' + NAME[LG()]; if (b.textContent !== v) b.textContent = v;
    if (sm) { sm.setAttribute('data-keep-uz', 'true'); if (sm.textContent !== SUBT[LG()]) sm.textContent = SUBT[LG()]; }
  }
  fixCard(); setInterval(fixCard, 1500); window.addEventListener('orvin-lang', fixCard);
})();
