/* ORVIN — O'quv tizimi: qoida (THEORY), yechim bosqichlari (EXPL), MS darajasidagi savollar (G2)
   ms-math-ui.js tomonidan chaqiriladi: window.MSLessons(H) → { THEORY, EXPL, G2 } */
(function () {
  'use strict';
  const m = s => String(s).replace(/-/g, '−');          // chiroyli minus
  const p = n => (n < 0 ? '(' + m(n) + ')' : String(n));
  const sg = n => (n < 0 ? '− ' + (-n) : '+ ' + n);

  /* ---------- 1) QOIDA: asosiy g'oya (uz / ru / en) ---------- */
  const THEORY = {
    "Natural sonlar": ["Avval ko'paytirish, keyin qo'shish/ayirish. Qavs ichi birinchi bajariladi. Qo‘shimcha MS qamrovi: butun, ratsional, irratsional va haqiqiy sonlar ustida amallar; sonning moduli; o‘rta arifmetik va o‘rta geometrik qiymat; kompleks son z=a+bi, i²=−1, qo‘shish-ko‘paytirish va qo‘shma kompleks son. Standart ko‘rinish a·10ⁿ (1≤a<10).", "Сначала умножение, потом сложение/вычитание. Скобки — первыми. Дополнение MS: целые, рациональные, иррациональные и действительные числа; модуль; среднее арифметическое и геометрическое; комплексное число z=a+bi, i²=−1, действия и сопряжённое число. Стандартный вид a·10ⁿ.", "Multiply first, then add/subtract. Brackets go first. MS additions: integers, rational, irrational and real numbers; absolute value; arithmetic and geometric means; complex numbers z=a+bi, i²=−1, operations and conjugates. Scientific notation a·10ⁿ."],
    "Bo'linish alomatlari": ["N dan oshmaydigan k ga karrali sonlar soni = N ni k ga bo'lgandagi butun qism.", "Количество чисел ≤ N, кратных k, равно целой части N/k.", "The count of multiples of k up to N is the whole part of N/k."],
    "EKUB va EKUK": ["EKUB·EKUK = a·b. Avval EKUB ni toping, keyin EKUK = a·b/EKUB.", "НОД·НОК = a·b. Найдите НОД, затем НОК = a·b/НОД.", "GCD·LCM = a·b. Find the GCD first, then LCM = a·b/GCD."],
    "Oddiy kasrlar": ["Kasrlarni qo'shishdan oldin umumiy maxrajga keltiring. Maxrajlarni qo'shmang!", "Перед сложением приведите дроби к общему знаменателю.", "Bring fractions to a common denominator before adding."],
    "O'nli va davriy kasrlar": ["Vergulsiz ko'paytiring, keyin vergulni ikkala son xonalari yig'indisi qadar suring.", "Умножьте без запятой, затем верните запятую (сумма знаков после запятой).", "Multiply ignoring the decimal point, then restore it (sum of decimal places)."],
    "Foiz va proporsiya": ["p% = p/100. Sonning p% i: son·p/100. Ketma-ket o'zgarishlar ko'paytiriladi. Murakkab foiz, to‘g‘ri va teskari proporsionallik, masshtab; jadval va diagrammalardan ma’lumot olish. Amaliy vaziyatni formula, jadval yoki tenglama bilan modellashtiring.", "p% = p/100. p% от числа: число·p/100. Последовательные изменения перемножаются. Сложные проценты, прямая и обратная пропорциональность, масштаб; чтение таблиц и диаграмм. Моделируйте ситуацию формулой, таблицей или уравнением.", "p% = p/100. p% of x is x·p/100. Successive changes multiply.Compound interest, direct and inverse proportion, scale; read tables and charts. Model a real situation with a formula, table or equation."],
    "Harakat masalalari": ["Qarama-qarshi harakatda tezliklar qo'shiladi: t = S/(v₁+v₂). Oqim bo'ylab v+u, oqimga qarshi v−u. Modellashtirish: chiziqli, kvadratik, trigonometrik, ko‘rsatkichli va logarifmik bog‘lanishlarni vaziyatga mos tanlash; ikki tur ma’lumot orasidagi bog‘liqlikni jadval/grafikdan tahlil qilish. O‘lchov birliklarini bir xil qiling.", "При встречном движении скорости складываются: t = S/(v₁+v₂). По течению v+u, против v−u.Моделирование: выбор линейной, квадратичной, тригонометрической, показательной или логарифмической зависимости; анализ связи двух наборов данных по таблице/графику. Согласуйте единицы измерения.", "Moving toward each other, speeds add: t = S/(v₁+v₂). With the current v+u, against v−u.Modelling: choose a linear, quadratic, trigonometric, exponential or logarithmic relationship; analyse relationships between two data sets using tables/graphs. Keep units consistent."],
    "Ish va unumdorlik": ["Butun ishni 1 deb oling. Birgalikdagi unumdorlik = 1/a + 1/b, vaqt = 1 : (1/a+1/b).", "Всю работу примите за 1. Совместная производительность = 1/a + 1/b.", "Treat the whole job as 1. Combined rate = 1/a + 1/b."],
    "Son va yosh masalalari": ["Noma'lumni x deb belgilang va shartdan tenglama tuzing.", "Обозначьте неизвестное x и составьте уравнение по условию.", "Let the unknown be x and build an equation from the condition."],
    "Daraja va ildiz": ["√(a²)=a, ∛(a³)=a. Avval ildizlarni hisoblang, so'ng amallarni bajaring. Ratsional va irratsional ko‘rsatkichli darajalar: a^(m/n)=ⁿ√(aᵐ) (aniqlanish shartlarini tekshiring); manfiy va nol ko‘rsatkich; ildizlarni ko‘paytirish/bo‘lish; sonli tengsizlikni musbat darajaga ko‘tarish shartlari.", "√(a²)=a, ∛(a³)=a. Сначала вычислите корни, затем действия. Рациональные и иррациональные показатели: a^(m/n)=ⁿ√(aᵐ) с учётом области определения; отрицательная и нулевая степень; свойства корней; условия возведения неравенства в степень.", "√(a²)=a, ∛(a³)=a. Evaluate roots first, then the operations. Rational and irrational exponents: a^(m/n)=ⁿ√(aᵐ), respecting domain conditions; negative and zero powers; radical rules; conditions for raising inequalities to a power."],
    "Daraja xossalari": ["Asoslar bir xil: ko'paytirishda darajalar qo'shiladi, bo'lishda ayiriladi.", "При одинаковых основаниях степени при умножении складываются, при делении вычитаются.", "Same base: exponents add when multiplying, subtract when dividing."],
    "Qisqa ko'paytirish formulalari": ["x²+y² = (x+y)² − 2xy. Berilganlarni formulaga qo'ying, ildizlarni topish shart emas. Ko‘phadlar: hadlarni o‘xshash hadlarga keltirish, ko‘phadlarni qo‘shish/ayirish/ko‘paytirish, ko‘paytuvchilarga ajratish, algebraik kasrlarni qisqartirish va umumiy maxrajga keltirish. Zarur joyda qo‘shma ifodaga ko‘paytirib maxrajni irratsionallikdan qutqaring.", "x²+y² = (x+y)² − 2xy. Подставьте данные — искать x и y не нужно. Многочлены: приведение подобных, сложение, вычитание и умножение; разложение на множители; сокращение и общий знаменатель алгебраических дробей; рационализация знаменателя.", "x²+y² = (x+y)² − 2xy. Plug in the givens — no need to find x and y. Polynomials: combine like terms; add, subtract and multiply; factorise; simplify algebraic fractions and find common denominators; rationalise denominators when needed."],
    "Chiziqli tenglamalar": ["Noma'lumli hadlarni bir tomonga, sonlarni ikkinchi tomonga o'tkazing (ishorasi o'zgaradi).", "Неизвестные — в одну сторону, числа — в другую (знак меняется).", "Move unknowns to one side, numbers to the other (sign flips)."],
    "Kvadrat tenglamalar va Viyet teoremasi": ["x²+px+q=0 da x₁+x₂=−p, x₁·x₂=q. Ildizlarni topmasdan ham ifodalarni hisoblash mumkin.", "В x²+px+q=0: x₁+x₂=−p, x₁·x₂=q. Выражения можно считать, не находя корни.", "In x²+px+q=0: x₁+x₂=−p, x₁·x₂=q. Expressions can be found without solving."],
    "Tenglamalar sistemasi": ["Qo'shish usuli: tenglamalarni qo'shsangiz bitta noma'lum yo'qoladi.", "Метод сложения: сложите уравнения — одна переменная исчезнет.", "Elimination: add the equations and one unknown disappears."],
    "Ko'rsatkichli tenglamalar": ["Asoslar teng bo'lsa, ko'rsatkichlar ham teng: a^f = a^g ⇒ f = g.", "При равных основаниях равны и показатели: a^f = a^g ⇒ f = g.", "Equal bases ⇒ equal exponents: a^f = a^g ⇒ f = g."],
    "Logarifm ta'rifi va xossalari": ["log_a b = c ⇔ a^c = b. Yig'indi logarifmi — ko'paytma logarifmi. Ko‘rsatkichli va logarifmik funksiyalar: y=aˣ va y=logₐx (a>0, a≠1), aniqlanish/qiymatlar sohasi, monotonlik, grafiklar va ularning siljishi; logarifmik ifodalarda argument musbat bo‘lishi shart.", "log_a b = c ⇔ a^c = b. Сумма логарифмов — логарифм произведения. Показательная и логарифмическая функции: y=aˣ и y=logₐx (a>0, a≠1), области определения и значений, монотонность, графики и сдвиги; аргумент логарифма должен быть положительным.", "log_a b = c ⇔ a^c = b. A sum of logs is the log of the product. Exponential and logarithmic functions: y=aˣ and y=logₐx (a>0, a≠1), domains/ranges, monotonicity, graphs and shifts; logarithm arguments must be positive."],
    "Modul va uning xossalari": ["|x−a|=b ⇒ x=a±b (b>0). Modul — sondan nolgacha masofa.", "|x−a|=b ⇒ x=a±b (b>0). Модуль — расстояние до нуля.", "|x−a|=b ⇒ x=a±b (b>0). Absolute value is distance from zero."],
    "Arifmetik progressiya": ["Har bir hadga bir xil d qo'shiladi: aₙ = a₁ + (n−1)d.", "К каждому члену прибавляется одно и то же d: aₙ = a₁ + (n−1)d.", "Each term adds the same d: aₙ = a₁ + (n−1)d."],
    "Geometrik progressiya": ["Har bir had bir xil q ga ko'paytiriladi: bₙ = b₁·qⁿ⁻¹.", "Каждый член умножается на одно и то же q: bₙ = b₁·qⁿ⁻¹.", "Each term is multiplied by the same q: bₙ = b₁·qⁿ⁻¹."],
    "Cheksiz kamayuvchi progressiya": ["|q|<1 bo'lsa yig'indi chekli: S = b₁/(1−q).", "При |q|<1 сумма конечна: S = b₁/(1−q).", "If |q|<1 the sum is finite: S = b₁/(1−q)."],
    "Kvadrat tengsizliklar": ["Avval ildizlarni toping. a>0 bo'lsa '<0' yechimi — ildizlar orasi. Tengsizliklar sistemasi va ikki o‘zgaruvchili tengsizliklar; yechimlar kesishmasini sonlar o‘qida yoki koordinata tekisligida ko‘rsating. Ratsional tengsizliklarda maxraj nol bo‘ladigan nuqtalar yechimga kirmaydi.", "Найдите корни. При a>0 решение '<0' — между корнями.Системы неравенств и неравенства с двумя переменными; показывайте пересечение решений на числовой оси или координатной плоскости. Нули знаменателя не входят в решение рационального неравенства.", "Find the roots. For a>0 the solution of '<0' lies between them.Systems of inequalities and two-variable inequalities; show the solution intersection on a number line or coordinate plane. Denominator zeros are excluded from rational inequality solutions."],
    "Aniqlanish va qiymatlar sohasi": ["Ildiz ostidagi ifoda ≥ 0, maxraj ≠ 0. Barcha shartlarning umumiy qismini oling. Funksiya grafiklarini parallel ko‘chirish va o‘qlarga nisbatan akslantirish; chiziqli, kvadrat, teskari proporsional, darajali, ko‘rsatkichli, logarifmik va trigonometrik funksiyalar. Limit tushunchasi, uzluksizlikning sodda holatlari, lokal maksimum/minimum va eng katta-kichik qiymatlarni grafikdan aniqlash.", "Подкоренное выражение ≥ 0, знаменатель ≠ 0. Берите пересечение условий. Сдвиги и отражения графиков; линейная, квадратичная, обратная пропорциональность, степенная, показательная, логарифмическая и тригонометрические функции. Предел, простейшие случаи непрерывности, локальные экстремумы и наибольшее/наименьшее значения.", "Radicand ≥ 0, denominator ≠ 0. Take the intersection of conditions. Function graph shifts and reflections; linear, quadratic, inverse variation, power, exponential, logarithmic and trigonometric functions. Limits, basic continuity, local extrema and absolute maximum/minimum."],
    "Juft va toq funksiyalar": ["Juft: f(−x)=f(x). Toq: f(−x)=−f(x).", "Чётная: f(−x)=f(x). Нечётная: f(−x)=−f(x).", "Even: f(−x)=f(x). Odd: f(−x)=−f(x)."],
    "Hosila qoidalari": ["(xⁿ)′ = n·xⁿ⁻¹. Avval hosilani toping, so'ng nuqtani qo'ying. Hosilaning geometrik ma’nosi — urinma qiyaligi, fizik ma’nosi — oniy o‘zgarish tezligi. Murakkab funksiya zanjir qoidasi, urinma va normal tenglamalari; hosila orqali o‘sish-kamayish, ekstremum va optimallashtirish masalalari. Milliy sertifikat darajasida: f'(x)=0 nuqtalarini topib lokal maks/min aniqlash, ikkinchi hosila yoki belgi o‘zgarishi bilan tekshirish; berilgan oraliqda eng katta/kichik qiymat (uchlar + kritik nuqtalar); grafikli masalalarda f' grafigidan f ning ekstremumlari sonini o‘qish (PDF 39-savol tipidagi).", "(xⁿ)′ = n·xⁿ⁻¹. Сначала найдите производную, затем подставьте точку. Геометрический смысл — наклон касательной. Правило цепочки, касательная и нормаль; исследование монотонности и экстремумов. На уровне НС: находить локальные макс/мин по f'=0, проверка второй производной или сменой знака; наибольшее/наименьшее на отрезке (концы + критические точки); по графику f' читать число экстремумов f (тип вопроса 39).", "(xⁿ)′ = n·xⁿ⁻¹. Differentiate first, then plug in the point. Geometric meaning: tangent slope. Chain rule, tangent/normal; monotonicity and extrema. National level: locate local max/min via f'=0, second-derivative or sign-change test; absolute max/min on a closed interval (endpoints + critical points); from the graph of f' read the number of extrema of f (PDF-style Q39)."],
    "Aniq integral va yuz": ["Boshlang'ich funksiya F ni toping: ∫ₐᵇ f = F(b) − F(a). Boshlang‘ich funksiya va aniqmas integral: ∫f(x)dx=F(x)+C. Nyuton–Leybnits formulasi, egri chiziq ostidagi yuza va sodda amaliy tatbiqlar; chegaralarni qo‘yishda yuqori qiymatdan quyi qiymat ayiriladi. Milliy sertifikat darajasida: ikki funksiya grafigi bilan chegaralangan shakl yuzi, almashtirish usuli, qismlarga ajratish, trigonometrik va irratsional integrallar (sodda hollar), yuzani hisoblashda kesishish nuqtalarini avval topish. Masalan, f(x)=2√x va g(x)=2x kabi funksiyalar orasidagi yuza ∫(yuqori − pastki) dx formulasi bilan.", "Найдите первообразную F: ∫ₐᵇ f = F(b) − F(a). Первообразная и неопределённый интеграл: ∫f(x)dx=F(x)+C. Формула Ньютона–Лейбница. На уровне национального сертификата: площадь фигуры, ограниченной двумя графиками; метод подстановки, интегрирование по частям, простые тригонометрические и иррациональные интегралы; сначала находите точки пересечения. Пример: площадь между f(x)=2√x и g(x)=2x вычисляется как ∫(верхняя − нижняя) dx.", "Find the antiderivative F: ∫ₐᵇ f = F(b) − F(a). Antiderivatives and indefinite integrals: ∫f(x)dx=F(x)+C. Newton–Leibniz formula. National-certificate level: area between two graphs; substitution, integration by parts, simple trigonometric and irrational integrals; first find intersection points. Example: area between f(x)=2√x and g(x)=2x is ∫(upper − lower) dx."],
    "Burchaklar": ["n-burchakning ichki burchaklar yig'indisi 180°(n−2). Muntazamda hammasi teng.", "Сумма углов n-угольника 180°(n−2). У правильного все равны.", "Angles of an n-gon sum to 180°(n−2). Regular: all equal."],
    "Uchburchaklar": ["To'g'ri burchakli uchburchakda c² = a² + b² (Pifagor). Uchburchakning medianasi, bissektrisasi, balandligi; ichki/tashqi chizilgan aylana va radiuslar; yuz formulalari, o‘xshashlik, Fales teoremasi, sinuslar va kosinuslar teoremasi. Masalada chizma va berilgan burchaklarni aniq belgilang.", "В прямоугольном треугольнике c² = a² + b² (Пифагор). Медиана, биссектриса и высота треугольника; вписанная и описанная окружности и радиусы; площади, подобие, теорема Фалеса, теоремы синусов и косинусов.", "In a right triangle c² = a² + b² (Pythagoras). Triangle medians, angle bisectors and altitudes; incircle/circumcircle and radii; area formulas, similarity, Thales’ theorem, sine and cosine rules."],
    "Aylana va doira": ["Doira yuzi S = πr², aylana uzunligi 2πr. Vatar, yoy, urinma va kesuvchi; markaziy va ichki chizilgan burchaklar; urinma-vatar xossalari; uchburchakka ichki/tashqi chizilgan aylana; doira sektori va segmenti yuzi.", "Площадь круга S = πr², длина окружности 2πr. Хорда, дуга, касательная и секущая; центральный и вписанный углы; свойства касательной и хорды; окружности треугольника; площади сектора и сегмента.", "Circle area S = πr², circumference 2πr. Chords, arcs, tangents and secants; central and inscribed angles; tangent-chord properties; triangle incircles/circumcircles; sector and segment areas."],
    "To'rtburchaklar": ["Perimetr P = 2(a+b), yuz S = a·b. Avval ikkinchi tomonni toping. Parallelogramm, to‘g‘ri to‘rtburchak, romb, kvadrat va trapetsiya xossalari; diagonallar, balandlik, o‘rta chiziq va yuzalar. Murakkab shaklni sodda shakllarga ajratib hisoblang.", "Периметр P = 2(a+b), площадь S = a·b. Сначала найдите вторую сторону. Свойства параллелограмма, прямоугольника, ромба, квадрата и трапеции; диагонали, высота, средняя линия и площади.", "Perimeter P = 2(a+b), area S = a·b. Find the other side first. Properties of parallelograms, rectangles, rhombi, squares and trapezoids; diagonals, altitudes, midlines and areas."],
    "Silindr va konus": ["Konus hajmi V = ⅓πr²h, silindr hajmi V = πr²h. Silindr, konus va kesik konus; yasovchi, o‘q kesimi, yoyilma, yon va to‘la sirt; sfera va shar kesimlari. Hajm hamda sirt yuzasida radius, diametr va balandlikni adashtirmang.", "Объём конуса V = ⅓πr²h, цилиндра V = πr²h.Цилиндр, конус и усечённый конус; образующая, осевое сечение, развёртка, боковая и полная поверхности; сечения сферы и шара. Не путайте радиус, диаметр и высоту.", "Cone volume V = ⅓πr²h, cylinder V = πr²h.Cylinder, cone and truncated cone; slant height, axial section, net, lateral and total surface; sphere and ball sections. Distinguish radius, diameter and height."],
    "Piramida": ["Piramida hajmi V = ⅓·S_asos·h. Muntazam piramida: asos muntazam ko‘pburchak, uch asos markaziga proyeksiyalanadi. Yon qirra, balandlik, apofema va yon yo‘l uzunliklari o‘rtasidagi bog‘lanishlarni to‘g‘ri uchburchaklardan toping. Kesimlar, o‘xshashlik va stereometriya masalalarida proyeksiya va o‘rtacha kesimlardan foydalaning. Milliy sertifikat darajasida yon qirra asos tomonidan necha marta katta ekanligi, mediana va balandlik nisbatlari kabi murakkab nisbatlar uchraydi.", "Объём пирамиды V = ⅓·S_осн·h. Правильная пирамида: основание — правильный многоугольник, вершина проектируется в центр. Связи между боковым ребром, высотой, апофемой находите из прямоугольных треугольников. В задачах на сечения и подобие используйте проекции и средние сечения. На уровне национального сертификата встречаются сложные отношения (боковое ребро в 2 раза больше стороны основания, отношения медиан и высот).", "Pyramid volume V = ⅓·base·h. Regular pyramid: base is a regular polygon, apex projects to the centre. Relate lateral edge, height and apothem via right triangles. Use projections and mid-sections for cross-sections and similarity. National-certificate level includes harder ratios (lateral edge twice a base side, median–height ratios)."],
    "Prizma": ["Prizma hajmi V = S_asos·h. Fazodagi geometriya: kub va to‘g‘ri burchakli parallelepiped; prizma/piramida kesimlari, muntazam piramida va kesik piramida; fazoda parallel, ayqash va perpendikulyar chiziqlar hamda tekisliklar orasidagi burchak va masofalar.", "Объём призмы V = S_осн·h. Пространственная геометрия: куб и прямоугольный параллелепипед; сечения призмы и пирамиды, правильная и усечённая пирамида; углы и расстояния между параллельными, скрещивающимися и перпендикулярными прямыми и плоскостями.", "Prism volume V = base·h. Solid geometry: cubes and cuboids; prism/pyramid sections, regular and frustum pyramids; angles and distances involving parallel, skew and perpendicular lines and planes."],
    "Kombinatorika": ["Tartib muhim emas bo'lsa C(n,k) = n!/(k!(n−k)!). Tartib muhim bo'lsa A(n,k). O‘rin almashtirish Pₙ=n!, o‘rinlashtirish Aₙᵏ va guruhlash Cₙᵏ; Nyuton binomi (a+b)ⁿ yoyilmasi va binomial koeffitsiyentlar. Tartib muhim yoki muhim emasligini avval aniqlang.", "Если порядок неважен — C(n,k). Если важен — A(n,k). Перестановки Pₙ=n!, размещения Aₙᵏ и сочетания Cₙᵏ; биномиальная формула Ньютона и биномиальные коэффициенты. Сначала определите, важен ли порядок.", "If order doesn't matter use C(n,k); if it does, A(n,k). Permutations Pₙ=n!, arrangements Aₙᵏ and combinations Cₙᵏ; the binomial theorem and coefficients. First decide whether order matters."],
    "Klassik ehtimollik": ["P = qulay holatlar / barcha holatlar. Qarama-qarshi hodisa, hodisalar yig‘indisi va ko‘paytmasi; o‘zaro birgalikda bo‘lmagan hodisalar uchun qo‘shish, mustaqil hodisalar uchun ko‘paytirish qoidasi. Venn diagrammasi bilan kesishma va birlashmani ajrating.", "P = благоприятные / все исходы. Противоположное событие, сумма и произведение событий; правило сложения для несовместных и умножения для независимых событий. Различайте пересечение и объединение по диаграмме Венна.", "P = favourable outcomes / all outcomes. Complementary events, unions and intersections; addition rule for mutually exclusive events and multiplication rule for independent events. Use Venn diagrams to distinguish union and intersection."],
    "Statistika (o'rta, mediana, moda)": ["O'rta = yig'indi / sonlar soni. Ma’lumotlar jadvali va diagrammalarini o‘qish; variatsion qator, oraliq (range), chetlanish va standart chetlanishning mazmuni. O‘rtacha qiymatni chastotalar bilan hisoblashda har qiymatni chastotasiga ko‘paytiring. Ikki tur ma’lumot orasidagi bog‘liqlikni jadval yoki diagrammadan aniqlash; chastotali qator, o‘rtacha qiymat, mediana, moda, variatsiya kengligi va standart chetlanishni talqin qilish.", "Среднее = сумма / количество. Чтение таблиц и диаграмм; вариационный ряд, размах, отклонение и смысл стандартного отклонения. Среднее с частотами вычисляйте как взвешенную сумму.Определение связи двух наборов данных по таблице или диаграмме; частотный ряд, среднее, медиана, мода, размах вариации и стандартное отклонение.", "Mean = sum / count. Read tables and charts; variation series, range, deviation and the meaning of standard deviation. For frequency data, calculate the weighted mean.Identify relationships between two data sets from tables or charts; frequency distributions, mean, median, mode, range and standard deviation."],
    "To'plamlar": ["|A∪B| = |A| + |B| − |A∩B| (umumiy qismi ikki marta sanalgan). Matematik mantiq: mulohaza va uning inkori; ‘va’ (kon’yunksiya), ‘yoki’ (diz’yunksiya), implikatsiya va ekvivalentlik; zarur/yetarli shart, predikat va kvantorlar. ‘Kamida’, ‘ko‘pi bilan’, ‘faqat’ iboralarini mantiqan talqin qiling.", "|A∪B| = |A| + |B| − |A∩B| (пересечение посчитано дважды). Математическая логика: высказывание и отрицание; конъюнкция, дизъюнкция, импликация и эквивалентность; необходимые/достаточные условия, предикаты и кванторы.", "|A∪B| = |A| + |B| − |A∩B| (overlap counted twice). Mathematical logic: propositions and negation; conjunction, disjunction, implication and equivalence; necessary/sufficient conditions, predicates and quantifiers."],
    "Asosiy ayniyatlar": ["sin²α + cos²α = 1. Chorakka qarab ishorani tanlang. Trigonometriya: gradus-radian o‘tishi (180°=π), birlik aylana, ixtiyoriy burchak sin/cos/tg/ctg, keltirish formulalari, trigonometrik funksiyalar grafiklari, davr va ishoralar. Ifodalarni ayniy almashtirishda chorakni tekshiring.", "sin²α + cos²α = 1. Знак выбирайте по четверти. Тригонометрия: переход градусы–радианы (180°=π), единичная окружность, sin/cos/tg/ctg произвольного угла, формулы приведения, графики и периоды тригонометрических функций.", "sin²α + cos²α = 1. Pick the sign by quadrant. Trigonometry: degree-radian conversion (180°=π), unit circle, sin/cos/tan/cot of any angle, reduction formulas, trigonometric graphs, periods and signs."],
    "Qo'shish va ikkilangan burchak": ["sin2α = 2sinα·cosα. Avval cosα ni toping.", "sin2α = 2sinα·cosα. Сначала найдите cosα.", "sin2α = 2sinα·cosα. Find cosα first."],
    "Skalyar ko'paytma": ["a·b = x₁x₂ + y₁y₂ = |a||b|cosφ.", "a·b = x₁x₂ + y₁y₂ = |a||b|cosφ.", "a·b = x₁x₂ + y₁y₂ = |a||b|cosφ."],
    "Koordinatalar usuli": ["Masofa d = √((x₂−x₁)² + (y₂−y₁)²). Tekislik va fazoda Dekart koordinatalari; kesmani berilgan nisbatda bo‘luvchi nuqta; to‘g‘ri chiziq tenglamasi, aylana/sfera tenglamasi; fazoda ikki nuqta orasidagi masofa. Vektorlar uchun kollinearlik, komplanarlik va skalyar ko‘paytma.", "Расстояние d = √((x₂−x₁)² + (y₂−y₁)²). Декартовы координаты на плоскости и в пространстве; деление отрезка в заданном отношении; уравнения прямой, окружности и сферы; расстояние в пространстве. Коллинеарность, компланарность и скалярное произведение векторов.", "Distance d = √((x₂−x₁)² + (y₂−y₁)²). Cartesian coordinates in 2D/3D; section formula; line, circle and sphere equations; 3D distance. Collinearity, coplanarity and scalar product of vectors."],
  };

  /* ---------- 2) YECHIM BOSQICHLARI (oddiy generatorlar uchun) ---------- */
  const nums = s => (String(s).match(/-?\d+(\.\d+)?/g) || []).map(Number);
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  const EXPL = {
    "Natural sonlar": (v, a) => { const [A, B, C] = nums(v[0]); return [`${A}·${B} = ${A * B}`, `${A * B} − ${C} = ${a}`]; },
    "Bo'linish alomatlari": (v, a) => [`⌊${v[0]} : ${v[1]}⌋ = ${a}`],
    "EKUB va EKUK": (v, a) => { const g = gcd(v[0], v[1]); return [`EKUB(${v[0]}; ${v[1]}) = ${g}`, `EKUK = ${v[0]}·${v[1]} : ${g} = ${a}`]; },
    "Oddiy kasrlar": (v, a) => { const [A, B, C, D] = nums(v[0]); return [`${A}/${B} + ${C}/${D} = (${A}·${D} + ${C}·${B}) / (${B}·${D})`, `= ${A * D + C * B}/${B * D} = ${a}`]; },
    "O'nli va davriy kasrlar": (v, a) => { const [x, y] = nums(v[0]); return [`${Math.round(x * 10)}·${Math.round(y * 10)} = ${Math.round(x * 10) * Math.round(y * 10)}`, `2 xona → ${a}`]; },
    "Foiz va proporsiya": (v, a) => [`${v[0]}·${v[1]} : 100 = ${a}`],
    "Harakat masalalari": (v, a) => [`v₁ + v₂ = ${v[1]} + ${v[2]} = ${v[1] + v[2]}`, `t = ${v[0]} : ${v[1] + v[2]} = ${a}`],
    "Ish va unumdorlik": (v, a) => [`1/${v[0]} + 1/${v[1]} = ${v[0] + v[1]}/${v[0] * v[1]}`, `t = ${v[0] * v[1]} : ${v[0] + v[1]} = ${a}`],
    "Son va yosh masalalari": (v, a) => [`x + y = ${v[0]},  x − y = ${v[1]}`, `2x = ${v[0] + v[1]} ⇒ x = ${a}`],
    "Daraja va ildiz": (v, a) => { const [A, B, C] = nums(v[0].replace(/[²]/g, '')); return [`√${A} = ${Math.round(Math.sqrt(A))},  ∛${B} = ${Math.round(Math.cbrt(B))},  ${C}² = ${C * C}`, `${Math.round(Math.sqrt(A))} + ${Math.round(Math.cbrt(B))} − ${C * C} = ${a}`]; },
    "Daraja xossalari": (v, a) => [`k = ${v[1]} + ${v[2]} − ${v[3]}`, `k = ${a}`],
    "Qisqa ko'paytirish formulalari": (v, a) => [`x² + y² = (x+y)² − 2xy`, `= ${v[0]}² − 2·${v[1]} = ${v[0] * v[0]} − ${2 * v[1]} = ${a}`],
    "Chiziqli tenglamalar": (v, a) => { const [A, B, N] = nums(v[0].replace('x', ' ')); return [`${A}x = ${N} − ${B} = ${N - B}`, `x = ${N - B} : ${A} = ${a}`]; },
    "Kvadrat tenglamalar va Viyet teoremasi": (v, a) => { const mt = v[0].match(/x² ([−+]) (\d+)x ([−+]) (\d+)/); if (!mt) return null; const S = mt[1] === '−' ? +mt[2] : -mt[2], Q = mt[3] === '+' ? +mt[4] : -mt[4]; return [`x₁ + x₂ = ${m(S)},  x₁·x₂ = ${m(Q)}  (Viyet)`, `D = ${S}² − 4·${p(Q)} = ${S * S - 4 * Q}`, `x = (${m(S)} ± ${Math.sqrt(S * S - 4 * Q)}) / 2  ⇒  ${m(S - a)}  va  ${m(a)}`, `Katta ildiz: ${m(a)}`]; },
    "Tenglamalar sistemasi": (v, a) => [`x = (${v[0]} + ${v[1]})/2 = ${(v[0] + v[1]) / 2}`, `y = (${v[0]} − ${v[1]})/2 = ${(v[0] - v[1]) / 2}`, `x·y = ${a}`],
    "Ko'rsatkichli tenglamalar": (v, a) => { const [b, k, N] = nums(v[0].replace(/x/g, ' ')); return [`Asoslar teng ⇒ ${k}x + 1 = ${N}`, `x = ${N - 1} : ${k} = ${a}`]; },
    "Logarifm ta'rifi va xossalari": (v, a) => { const [A, B] = nums(v[0].replace(/[₂₃]/g, ' ')); const l2 = Math.round(Math.log2(A)), l3 = Math.round(Math.log(B) / Math.log(3)); return [`log₂${A} = ${l2}  (2^${l2} = ${A})`, `log₃${B} = ${l3}  (3^${l3} = ${B})`, `${l2} + ${l3} = ${a}`]; },
    "Modul va uning xossalari": (v, a) => [`x − ${v[0]} = ±${v[1]}`, `x = ${v[0] + v[1]}  yoki  x = ${v[0] - v[1]}`, `Yig'indi: ${a}`],
    "Arifmetik progressiya": (v, a) => [`aₙ = a₁ + (n−1)d`, `= ${m(v[0])} + ${v[2] - 1}·${v[1]} = ${a}`],
    "Geometrik progressiya": (v, a) => [`bₙ = b₁·qⁿ⁻¹`, `= ${v[0]}·${v[1]}^${v[2] - 1} = ${a}`],
    "Cheksiz kamayuvchi progressiya": (v, a) => [`q = 1/${v[1]},  |q| < 1`, `S = ${v[0]} : (1 − 1/${v[1]}) = ${v[0]} : ${(v[1] - 1)}/${v[1]} = ${a}`],
    "Kvadrat tengsizliklar": (v, a) => { const mt = v[0].match(/x² ([−+]) (\d+)x ([−+]) (\d+)/); if (!mt) return null; const S = mt[1] === '−' ? +mt[2] : -mt[2], Q = mt[3] === '+' ? +mt[4] : -mt[4], D = Math.sqrt(S * S - 4 * Q), r1 = (S - D) / 2, r2 = (S + D) / 2; return [`Ildizlar: x₁ = ${m(r1)},  x₂ = ${m(r2)}`, `${m(r1)} < x < ${m(r2)}`, `Butun sonlar soni: ${r2} − ${p(r1)} − 1 = ${a}`]; },
    "Aniqlanish va qiymatlar sohasi": (v, a) => [`${v[0]} − x ≥ 0 ⇒ x ≤ ${v[0]}`, `x + ${v[1]} ≥ 0 ⇒ x ≥ −${v[1]}`, `−${v[1]} ≤ x ≤ ${v[0]}  ⇒  ${v[0]} + ${v[1]} + 1 = ${a}`],
    "Juft va toq funksiyalar": (v, a) => [`f(−3) = f(3) = ${v[0]}  (juft)`, `g(−3) = −g(3) = −${v[1]}  (toq)`, `${v[0]} − ${v[1]} = ${a}`],
    "Hosila qoidalari": (v, a) => { const [A, B, C] = nums(v[0].replace(/[³²]/g, ' ').replace(/x/g, ' ')); return [`f′(x) = ${3 * A}x² + ${2 * B}x + ${C}`, `f′(${v[1]}) = ${3 * A}·${v[1] * v[1]} + ${2 * B}·${v[1]} + ${C} = ${a}`]; },
    "Aniq integral va yuz": (v, a) => { const [k, A, B] = nums(v[0].replace(/[₀∫]/g, ' ').replace(/\^/g, ' ').replace(/x/g, ' ')); return [`F(x) = ${A}x²/2 + ${B}x`, `F(${k}) − F(0) = ${A * k * k / 2} + ${B * k} = ${a}`]; },
    "Burchaklar": (v, a) => [`180°·(${v[0]} − 2) : ${v[0]} = ${180 * (v[0] - 2)} : ${v[0]} = ${a}°`],
    "Uchburchaklar": (v, a) => [`c² = ${v[0]}² + ${v[1]}² = ${v[0] * v[0] + v[1] * v[1]}`, `c = ${a}`],
    "Aylana va doira": (v, a) => [`πr² = ${v[0]}π ⇒ r² = ${v[0]}`, `r = ${a}`],
    "To'rtburchaklar": (v, a) => [`a + b = ${v[0]} : 2 = ${v[0] / 2}`, `b = ${v[0] / 2} − ${v[1]} = ${v[0] / 2 - v[1]}`, `S = ${v[1]}·${v[0] / 2 - v[1]} = ${a}`],
    "Silindr va konus": (v, a) => [`V = ⅓·π·r²·h = ⅓·π·${v[0] * v[0]}·${v[1]}`, `k = ${a}`],
    "Piramida": (v, a) => [`V = ⅓·S·h = ⅓·${v[0]}·${v[1]}`, `V = ${a}`],
    "Prizma": (v, a) => [`V = S·h = ${v[0]}·${v[1]} = ${a}`],
    "Kombinatorika": (v, a) => [`C(${v[0]}; 2) = ${v[0]}·${v[0] - 1} : 2 = ${a}`],
    "Klassik ehtimollik": (v, a) => [`Barcha holat: ${v[0]} + ${v[1]} = ${v[0] + v[1]}`, `P = ${v[0]}/${v[0] + v[1]} = ${a}`],
    "Statistika (o'rta, mediana, moda)": (v, a) => { const xs = String(v[0]).split(',').map(Number); const s = xs.reduce((x, y) => x + y, 0); return [`Yig'indi: ${s}`, `${s} : ${xs.length} = ${a}`]; },
    "To'plamlar": (v, a) => [`|A∪B| = ${v[0]} + ${v[1]} − ${v[2]} = ${a}`],
    "Asosiy ayniyatlar": (v, a) => { const [A, C] = nums(v[0].replace('/', ' ')); const B = Math.round(Math.sqrt(C * C - A * A)); return [`cos²α = 1 − (${A}/${C})² = ${B * B}/${C * C}`, `cosα = ${B}/${C}  (I chorak, +)`, `Javob: ${a}`]; },
    "Qo'shish va ikkilangan burchak": (v, a) => { const [A, C] = nums(v[0].replace('/', ' ')); const B = Math.round(Math.sqrt(C * C - A * A)); return [`cosα = ${B}/${C}`, `sin2α = 2·(${A}/${C})·(${B}/${C}) = ${2 * A * B}/${C * C}`, `Javob: ${a}`]; },
    "Skalyar ko'paytma": (v, a) => [`a·b = x₁x₂ + y₁y₂`, `= ${p(v[0])}·${p(v[2])} + ${p(v[1])}·${p(v[3])} = ${m(a)}`],
    "Koordinatalar usuli": (v, a) => [`Δx = ${m(v[2] - v[0])},  Δy = ${m(v[3] - v[1])}`, `d = √(${(v[2] - v[0]) ** 2} + ${(v[3] - v[1]) ** 2}) = √${(v[2] - v[0]) ** 2 + (v[3] - v[1]) ** 2} = ${a}`]
  };

  /* ---------- 3) MS DARAJASIDAGI SAVOLLAR (ko'p bosqichli) ---------- */
  function makeG2(H) {
    const { R, P, T, fr, shuffle, roots, quad } = H;
    const divs = n => { const d = []; for (let i = 2; i < n; i++) if (n % i === 0) d.push(i); return d; };
    const piStr = (num, den) => { const g = gcd(num, den); num /= g; den /= g; const n = num === 1 ? 'π' : num + 'π'; return den === 1 ? n : n + '/' + den; };
    const poly3 = (c2, c1) => `x³ ${c2 < 0 ? '+ ' + (-c2) : '− ' + c2}x² ${c1 < 0 ? '− ' + (-c1) : '+ ' + c1}x`;
    return {
      "Kvadrat tenglamalar va Viyet teoremasi": () => {
        const [r1, r2] = roots(), S = r1 + r2, Q = r1 * r2;
        return { s: T("{0} = 0 tenglama ildizlari x₁, x₂. x₁² + x₂² = ?", "Корни уравнения {0} = 0 — x₁, x₂. Найдите x₁² + x₂².", "x₁, x₂ are the roots of {0} = 0. Find x₁² + x₂²."), v: [quad(S, Q)], a: S * S - 2 * Q,
          x: [`Viyet: x₁ + x₂ = ${m(S)},  x₁·x₂ = ${m(Q)}`, `x₁² + x₂² = (x₁ + x₂)² − 2x₁x₂`, `= ${S * S} − 2·${p(Q)} = ${S * S - 2 * Q}`] };
      },
      "Modul va uning xossalari": () => {
        const a = R(-3, 2), b = a + R(2, 5), k = R(1, 4), c = (b - a) + 2 * k;
        return { s: T("|x {0}| + |x {1}| = {2} tenglamaning katta ildizi?", "Больший корень уравнения |x {0}| + |x {1}| = {2}?", "Larger root of |x {0}| + |x {1}| = {2}?"), v: [sg(-a), sg(-b), c], a: b + k,
          x: [`x ≤ ${m(a)}: (${m(a)} − x) + (${m(b)} − x) = ${c} ⇒ x = ${m(a - k)}`, `x ≥ ${m(b)}: (x − ${p(a)}) + (x − ${m(b)}) = ${c} ⇒ x = ${m(b + k)}`, `Katta ildiz: ${m(b + k)}`] };
      },
      "Arifmetik progressiya": () => {
        const a1 = R(-4, 8), d = R(2, 5), i = R(2, 4), j = R(6, 9), X = a1 + (i - 1) * d, Y = a1 + (j - 1) * d, S = (2 * a1 + 9 * d) * 5;
        return { s: T("Arifmetik progressiyada a_{0} = {1}, a_{2} = {3}. S₁₀ = ?", "В арифметической прогрессии a_{0} = {1}, a_{2} = {3}. Найдите S₁₀.", "In an arithmetic progression a_{0} = {1}, a_{2} = {3}. Find S₁₀."), v: [i, X, j, Y], a: S,
          x: [`d = (${m(Y)} − ${p(X)}) : (${j} − ${i}) = ${d}`, `a₁ = ${m(X)} − ${i - 1}·${d} = ${m(a1)}`, `S₁₀ = (2a₁ + 9d)·10/2 = (${m(2 * a1)} + ${9 * d})·5 = ${m(S)}`] };
      },
      "Geometrik progressiya": () => {
        const b1 = R(1, 3), q = P([2, 3]), b2 = b1 * q, b5 = b1 * q ** 4, b7 = b1 * q ** 6;
        return { s: T("Geometrik progressiyada b₂ = {0}, b₅ = {1} (q > 0). b₇ = ?", "В геометрической прогрессии b₂ = {0}, b₅ = {1} (q > 0). Найдите b₇.", "In a geometric progression b₂ = {0}, b₅ = {1} (q > 0). Find b₇."), v: [b2, b5], a: b7,
          x: [`q³ = b₅ : b₂ = ${b5} : ${b2} = ${q ** 3} ⇒ q = ${q}`, `b₇ = b₅·q² = ${b5}·${q * q} = ${b7}`] };
      },
      "Foiz va proporsiya": () => {
        const [pp, qq] = P([[20, 25], [10, 10], [50, 20], [25, 20], [20, 50], [40, 25]]), res = +(((1 + pp / 100) * (1 - qq / 100) - 1) * 100).toFixed(2);
        return { s: T("Narx {0}% ga oshirildi, so'ng {1}% ga arzonlashtirildi. Narx dastlabkisiga nisbatan necha foizga o'zgardi? (kamaygan bo'lsa minus)", "Цену повысили на {0}%, затем снизили на {1}%. На сколько процентов изменилась цена? (при уменьшении — минус)", "A price rose {0}% then fell {1}%. By what percent did it change overall? (use minus if it dropped)"), v: [pp, qq], a: res,
          x: [`(1 + ${pp / 100})·(1 − ${qq / 100}) = ${+((1 + pp / 100) * (1 - qq / 100)).toFixed(4)}`, `O'zgarish: (${+((1 + pp / 100) * (1 - qq / 100)).toFixed(4)} − 1)·100% = ${m(res)}%`] };
      },
      "Harakat masalalari": () => {
        const [v, u] = P([[8, 2], [10, 5], [9, 3], [12, 4]]), l = (v + u) * (v - u) / gcd(v + u, v - u), S = l * R(1, 2), t = S / (v + u) + S / (v - u);
        return { s: T("Kema oqim bo'ylab {0} km va qaytib oqimga qarshi shuncha yo'l bosdi. Kema tezligi {1} km/soat, oqim tezligi {2} km/soat. Jami necha soat sarflandi?", "Катер прошёл {0} км по течению и столько же обратно. Скорость катера {1} км/ч, течения {2} км/ч. Сколько часов в пути?", "A boat travelled {0} km downstream and the same back upstream. Boat speed {1} km/h, current {2} km/h. Total hours?"), v: [S, v, u], a: t,
          x: [`Oqim bo'ylab: ${v} + ${u} = ${v + u} km/soat ⇒ t₁ = ${S}/${v + u} = ${S / (v + u)}`, `Oqimga qarshi: ${v} − ${u} = ${v - u} km/soat ⇒ t₂ = ${S}/${v - u} = ${S / (v - u)}`, `t = ${S / (v + u)} + ${S / (v - u)} = ${t}`] };
      },
      "Son va yosh masalalari": () => {
        const s = R(5, 14), k = R(3, 5), T0 = s * (k + 1);
        return { s: T("Otaning yoshi o'g'lining yoshidan {0} marta katta. Ularning yoshlari yig'indisi {1}. Otaning yoshi?", "Отец старше сына в {0} раза(ов). Сумма их возрастов {1}. Возраст отца?", "A father is {0} times as old as his son. Their ages sum to {1}. Father's age?"), v: [k, T0], a: k * s,
          x: [`O'g'il = x, ota = ${k}x`, `x + ${k}x = ${T0} ⇒ ${k + 1}x = ${T0} ⇒ x = ${s}`, `Ota: ${k}·${s} = ${k * s}`] };
      },
      "Logarifm ta'rifi va xossalari": () => {
        if (R(0, 1)) {
          const b = P([2, 3, 5, 6]), n = R(2, 3), N = b ** n, d = divs(N), u = P(d.length ? d : [b]), w = N / u;
          return { s: T("Hisoblang: log_{0}{1} + log_{0}{2}", "Вычислите: log_{0}{1} + log_{0}{2}", "Calculate: log_{0}{1} + log_{0}{2}"), v: [b, u, w], a: n,
            x: [`log_${b}${u} + log_${b}${w} = log_${b}(${u}·${w}) = log_${b}${N}`, `${b}^${n} = ${N} ⇒ javob ${n}`] };
        }
        const b = P([2, 3]), n = R(2, 4), a = R(1, 6), x = b ** n - a;
        return { s: T("log_{0}(x + {1}) = {2} tenglamani yeching.", "Решите уравнение log_{0}(x + {1}) = {2}.", "Solve log_{0}(x + {1}) = {2}."), v: [b, a, n], a: x,
          x: [`x + ${a} = ${b}^${n} = ${b ** n}`, `x = ${b ** n} − ${a} = ${x}`, `Tekshiruv: x + ${a} = ${b ** n} > 0 ✓`] };
      },
      "Ko'rsatkichli tenglamalar": () => {
        const b = P([2, 3, 5]), x = R(2, 4), N = (b + 1) * b ** x;
        return { s: T("{0}^(x+1) + {0}^x = {1} tenglamani yeching.", "Решите уравнение {0}^(x+1) + {0}^x = {1}.", "Solve {0}^(x+1) + {0}^x = {1}."), v: [b, N], a: x,
          x: [`${b}^x·(${b} + 1) = ${N}`, `${b}^x = ${N} : ${b + 1} = ${b ** x}`, `x = ${x}`] };
      },
      "Eng katta va eng kichik qiymat": () => {
        const q = P([1, 2]), f = z => z ** 3 - 3 * q * q * z, mn = Math.min(f(0), f(q), f(3));
        return { s: T("f(x) = x³ − {0}x funksiyaning [0; 3] kesmadagi eng kichik qiymati?", "Наименьшее значение f(x) = x³ − {0}x на отрезке [0; 3]?", "Smallest value of f(x) = x³ − {0}x on [0; 3]?"), v: [3 * q * q], a: mn,
          x: [`f′(x) = 3x² − ${3 * q * q} = 0 ⇒ x = ${q}  (kesmada)`, `f(0) = 0,  f(${q}) = ${m(f(q))},  f(3) = ${m(f(3))}`, `Eng kichigi: ${m(mn)}`] };
      },
      "Urinma tenglamasi": () => {
        const b = R(-4, 5), c = R(-5, 5), x0 = R(-3, 4), k = 2 * x0 + b, f0 = x0 * x0 + b * x0 + c, mm = f0 - k * x0;
        return { s: T("f(x) = x² {0} grafigiga x₀ = {1} nuqtada o'tkazilgan urinma y = kx + m. m = ?", "Касательная к графику f(x) = x² {0} в точке x₀ = {1}: y = kx + m. Найдите m.", "The tangent to f(x) = x² {0} at x₀ = {1} is y = kx + m. Find m."), v: [`${sg(b)}x ${sg(c)}`, x0], a: mm,
          x: [`f′(x) = 2x ${sg(b)} ⇒ k = f′(${p(x0)}) = ${m(k)}`, `f(${p(x0)}) = ${m(f0)}`, `m = f(x₀) − k·x₀ = ${m(f0)} − ${p(k)}·${p(x0)} = ${m(mm)}`] };
      },
      "Qo'shish va ikkilangan burchak": () => {
        const bb = R(2, 5), aa = R(1, bb - 1);
        return { s: T("sinα + cosα = {0}/{1} bo'lsa, sin2α = ?", "Если sinα + cosα = {0}/{1}, то sin2α = ?", "If sinα + cosα = {0}/{1}, then sin2α = ?"), v: [aa, bb], a: fr(aa * aa - bb * bb, bb * bb), w: [fr(bb * bb - aa * aa, bb * bb), fr(aa * aa, bb * bb), fr(2 * aa, bb)],
          x: [`Ikkala tomonni kvadratga ko'taramiz:`, `sin²α + 2sinα·cosα + cos²α = ${aa * aa}/${bb * bb}`, `1 + sin2α = ${aa * aa}/${bb * bb} ⇒ sin2α = ${fr(aa * aa - bb * bb, bb * bb)}`] };
      },
      "Trigonometrik tenglamalar": () => {
        const L = [["sin x = 1/2", "π/6 va 5π/6", "π", ["2π", "π/2", "3π"]], ["sin x = −1/2", "7π/6 va 11π/6", "3π", ["2π", "π", "4π"]], ["cos x = 1/2", "π/3 va 5π/3", "2π", ["π", "3π", "π/2"]], ["cos x = −1/2", "2π/3 va 4π/3", "2π", ["π", "3π/2", "4π"]], ["tg x = 1", "π/4 va 5π/4", "3π/2", ["π", "π/2", "2π"]], ["cos x = 0", "π/2 va 3π/2", "2π", ["π", "3π/2", "π/2"]], ["sin x = 0", "0, π va 2π", "3π", ["2π", "π", "4π"]]];
        const [e, rr, ans, w] = P(L);
        return { s: T("{0} tenglamaning [0; 2π] kesmadagi ildizlari yig'indisi?", "Сумма корней уравнения {0} на отрезке [0; 2π]?", "Sum of the roots of {0} on [0; 2π]?"), v: [e], a: ans, w,
          x: [`Birlik aylana bo'yicha ildizlar: ${rr}`, `Yig'indi: ${ans}`] };
      },
      "Davriylik": () => {
        const k = P([2, 3, 4, 6]);
        return { s: T("f(x) = sin({0}x) funksiyaning eng kichik musbat davri?", "Наименьший положительный период f(x) = sin({0}x)?", "Smallest positive period of f(x) = sin({0}x)?"), v: [k], a: piStr(2, k), w: [piStr(1, k), piStr(4, k), piStr(2 * k, 1)],
          x: [`T = 2π / ${k}`, `T = ${piStr(2, k)}`] };
      },
      "Uchburchaklar": () => {
        const [a, b, c] = P([[5, 12, 13], [13, 14, 15], [8, 15, 17], [7, 24, 25], [6, 8, 10]]), pp = (a + b + c) / 2, S = Math.sqrt(pp * (pp - a) * (pp - b) * (pp - c)), r = Math.round(S) / pp;
        return { s: T("Uchburchak tomonlari {0}, {1}, {2}. Ichki chizilgan aylana radiusi?", "Стороны треугольника {0}, {1}, {2}. Радиус вписанной окружности?", "A triangle has sides {0}, {1}, {2}. Radius of its incircle?"), v: [a, b, c], a: r,
          x: [`p = (${a} + ${b} + ${c}) : 2 = ${pp}`, `Geron: S = √(${pp}·${pp - a}·${pp - b}·${pp - c}) = ${Math.round(S)}`, `r = S/p = ${Math.round(S)}/${pp} = ${r}`] };
      },
      "Aylana va doira": () => {
        let R0, th, k; do { R0 = R(3, 12); th = P([60, 90, 120, 180, 45]); k = R0 * R0 * th / 360; } while (!Number.isInteger(k));
        return { s: T("Radiusi {0} bo'lgan doiraning {1}° li sektori yuzi kπ ga teng. k = ?", "Площадь сектора круга радиуса {0} с углом {1}° равна kπ. k = ?", "A sector of a circle of radius {0} with angle {1}° has area kπ. k = ?"), v: [R0, th], a: k,
          x: [`S = πR²·α/360° = π·${R0 * R0}·${th}/360`, `k = ${R0 * R0}·${th} : 360 = ${k}`] };
      },
      "Silindr va konus": () => {
        if (R(0, 1)) {
          const [r, h, l] = P([[3, 4, 5], [6, 8, 10], [5, 12, 13], [4, 3, 5]]);
          return { s: T("Konusning asos radiusi {0}, yasovchisi {1}. Hajmi V = kπ bo'lsa, k = ?", "Радиус основания конуса {0}, образующая {1}. Если V = kπ, то k = ?", "A cone has base radius {0} and slant height {1}. If V = kπ, then k = ?"), v: [r, l], a: r * r * h / 3,
            x: [`h = √(${l}² − ${r}²) = √${l * l - r * r} = ${h}`, `V = ⅓πr²h = ⅓·π·${r * r}·${h}`, `k = ${r * r * h / 3}`] };
        }
        const r = R(2, 6);
        return { s: T("Silindrning o'q kesimi kvadrat, asos radiusi {0}. To'la sirti S = kπ bo'lsa, k = ?", "Осевое сечение цилиндра — квадрат, радиус основания {0}. Если полная поверхность S = kπ, то k = ?", "A cylinder's axial section is a square, base radius {0}. If total surface S = kπ, then k = ?"), v: [r], a: 6 * r * r,
          x: [`h = 2r = ${2 * r}`, `S = 2πr·h + 2πr² = 2π·${r}·${2 * r} + 2π·${r * r}`, `= ${4 * r * r}π + ${2 * r * r}π ⇒ k = ${6 * r * r}`] };
      },
      "Prizma": () => {
        const k = R(2, 6);
        return { s: T("Kub diagonali {0}√3 ga teng. Kub hajmi?", "Диагональ куба равна {0}√3. Объём куба?", "A cube's diagonal is {0}√3. Its volume?"), v: [k], a: k ** 3,
          x: [`d = a√3 ⇒ a = ${k}`, `V = a³ = ${k ** 3}`] };
      },
      "Piramida": () => {
        const a = 3 * R(1, 3), h = R(2, 8);
        return { s: T("Muntazam to'rtburchakli piramida asosining tomoni {0}, balandligi {1}. Hajmi?", "Сторона основания правильной четырёхугольной пирамиды {0}, высота {1}. Объём?", "A regular square pyramid has base side {0} and height {1}. Volume?"), v: [a, h], a: a * a * h / 3,
          x: [`S_asos = ${a}² = ${a * a}`, `V = ⅓·${a * a}·${h} = ${a * a * h / 3}`] };
      },
      "Kombinatorika": () => {
        const t = R(0, 2);
        if (t === 0) { const n = R(6, 10); return { s: T("{0} ta talabadan 3 kishilik komissiyani necha usulda tanlash mumkin?", "Сколькими способами из {0} студентов можно выбрать комиссию из 3 человек?", "In how many ways can a 3-person committee be chosen from {0} students?"), v: [n], a: n * (n - 1) * (n - 2) / 6, x: [`C(${n}; 3) = ${n}·${n - 1}·${n - 2} : 6`, `= ${n * (n - 1) * (n - 2) / 6}`] }; }
        if (t === 1) { const n = R(4, 6), f = [1, 1, 2, 6, 24, 120, 720][n]; return { s: T("{0} xil kitobni javonga necha usulda tizish mumkin?", "Сколькими способами можно расставить {0} разных книг на полке?", "In how many ways can {0} different books be arranged on a shelf?"), v: [n], a: f, x: [`P(${n}) = ${n}! = ${f}`] }; }
        const n = R(5, 9); return { s: T("{0} ta ishtirokchidan 1-, 2-o'rinlarni necha usulda taqsimlash mumkin?", "Сколькими способами можно распределить 1-е и 2-е места среди {0} участников?", "In how many ways can 1st and 2nd place be awarded among {0} participants?"), v: [n], a: n * (n - 1), x: [`Tartib muhim: A(${n}; 2) = ${n}·${n - 1} = ${n * (n - 1)}`] };
      },
      "Klassik ehtimollik": () => {
        const s = R(4, 10); let w = 0; for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j === s) w++;
        return { s: T("Ikkita o'yin kubi tashlandi. Ochkolar yig'indisi {0} bo'lish ehtimoli?", "Бросают два кубика. Вероятность, что сумма очков равна {0}?", "Two dice are rolled. Probability the sum is {0}?"), v: [s], a: fr(w, 36),
          w: [fr(w + 1, 36), fr(w, 12), fr(w, 6)], x: [`Barcha holat: 6·6 = 36`, `Qulay holatlar (yig'indi ${s}): ${w} ta`, `P = ${w}/36 = ${fr(w, 36)}`] };
      },
      "Statistika (o'rta, mediana, moda)": () => {
        const mu = R(5, 12), x = R(mu + 3, mu + 15), tot = 5 * mu + x;
        const nn = (() => { for (let y = mu + 1; y < mu + 40; y++) if ((5 * mu + y) % 6 === 0) return y; return mu + 1; })();
        return { s: T("5 ta sonning o'rta arifmetigi {0}. Ularga {1} soni qo'shilsa, 6 ta sonning o'rtachasi?", "Среднее 5 чисел равно {0}. Добавили число {1}. Каково среднее 6 чисел?", "The mean of 5 numbers is {0}. A number {1} is added. What is the mean of the 6 numbers?"), v: [mu, nn], a: (5 * mu + nn) / 6,
          x: [`Yig'indi: 5·${mu} = ${5 * mu}`, `Yangi yig'indi: ${5 * mu} + ${nn} = ${5 * mu + nn}`, `O'rta: ${5 * mu + nn} : 6 = ${(5 * mu + nn) / 6}`] };
      },
      "Skalyar ko'paytma": () => {
        const a = R(2, 6), b = 2 * R(1, 3);
        return { s: T("|a| = {0}, |b| = {1}, a va b orasidagi burchak 60°. |a + b|² = ?", "|a| = {0}, |b| = {1}, угол между a и b равен 60°. |a + b|² = ?", "|a| = {0}, |b| = {1}, the angle between a and b is 60°. |a + b|² = ?"), v: [a, b], a: a * a + b * b + a * b,
          x: [`a·b = |a||b|cos60° = ${a}·${b}·½ = ${a * b / 2}`, `|a + b|² = |a|² + 2a·b + |b|² = ${a * a} + ${a * b} + ${b * b}`, `= ${a * a + b * b + a * b}`] };
      },
      "Koordinatalar usuli": () => {
        const a = R(-4, 4), b = R(-4, 4), r = R(2, 6), c = a * a + b * b - r * r;
        return { s: T("x² + y² {0}x {1}y {2} = 0 aylananing radiusi?", "Радиус окружности x² + y² {0}x {1}y {2} = 0?", "Radius of the circle x² + y² {0}x {1}y {2} = 0?"), v: [sg(-2 * a), sg(-2 * b), sg(c)], a: r,
          x: [`To'la kvadratga keltiramiz: (x − ${p(a)})² + (y − ${p(b)})² = ${a * a} + ${b * b} ${sg(-c)}`, `r² = ${r * r} ⇒ r = ${r}`] };
      },
      "Kvadrat tengsizliklar": () => {
        const [r1, r2] = roots(); let cnt = 0; for (let z = Math.max(1, r1); z <= r2; z++) cnt++;
        return { s: T("{0} ≤ 0 tengsizlikning natural yechimlari soni?", "Сколько натуральных решений у неравенства {0} ≤ 0?", "How many natural-number solutions does {0} ≤ 0 have?"), v: [quad(r1 + r2, r1 * r2)], a: cnt,
          x: [`Ildizlar: ${m(r1)} va ${m(r2)}`, `${m(r1)} ≤ x ≤ ${m(r2)}`, `Natural sonlar (x ≥ 1): ${cnt} ta`] };
      },
      "Kvadrat funksiya va parabola": () => {
        const a = P([1, 2, -1, -2]), h = R(-3, 4), k = R(-6, 6), b = -2 * a * h, c = a * h * h + k;
        return { s: T("f(x) = {0}x² {1}x {2} parabola uchining ordinatasi?", "Ордината вершины параболы f(x) = {0}x² {1}x {2}?", "Ordinate of the vertex of f(x) = {0}x² {1}x {2}?"), v: [a === 1 ? '' : a === -1 ? '−' : m(a), sg(b), sg(c)], a: k,
          x: [`x₀ = −b/(2a) = ${m(-b)}/${m(2 * a)} = ${m(h)}`, `y₀ = f(${p(h)}) = ${m(a * h * h)} ${sg(b * h)} ${sg(c)}`, `y₀ = ${m(k)}`] };
      },
      "Monotonlik va ekstremum": () => {
        const r1 = R(-4, 1), r2 = r1 + 2 * R(1, 3), c2 = 3 * (r1 + r2) / 2, c1 = 3 * r1 * r2;
        return { s: T("f(x) = {0} funksiyaning maksimum nuqtasi?", "Точка максимума функции f(x) = {0}?", "Maximum point of f(x) = {0}?"), v: [poly3(c2, c1)], a: r1,
          x: [`f′(x) = 3x² ${sg(-2 * c2)}x ${sg(c1)} = 3(x − ${p(r1)})(x − ${p(r2)})`, `Kritik nuqtalar: ${m(r1)} va ${m(r2)}`, `f′ ishorasi: + → − (x = ${m(r1)} da) ⇒ maksimum x = ${m(r1)}`] };
      },
      "Aniq integral va yuz": () => {
        const k = P([3, 6]);
        return { s: T("y = x² va y = {0}x chiziqlar bilan chegaralangan shakl yuzi?", "Площадь фигуры, ограниченной линиями y = x² и y = {0}x?", "Area enclosed by y = x² and y = {0}x?"), v: [k], a: fr(k ** 3, 6),
          x: [`x² = ${k}x ⇒ x = 0 va x = ${k}`, `S = ∫₀^${k} (${k}x − x²) dx = ${k}x²/2 − x³/3 |₀^${k}`, `= ${k ** 3 / 2} − ${k ** 3 / 3} = ${fr(k ** 3, 6)}`] };
      },
      "Yuqori darajali tenglamalar": () => {
        const set = new Set(); while (set.size < 3) { const z = R(-4, 5); if (z !== 0) set.add(z); }
        const [r1, r2, r3] = [...set], e1 = r1 + r2 + r3, e2 = r1 * r2 + r1 * r3 + r2 * r3, e3 = r1 * r2 * r3;
        return { s: T("x³ {0}x² {1}x {2} = 0 tenglama ildizlari kvadratlarining yig'indisi?", "Сумма квадратов корней уравнения x³ {0}x² {1}x {2} = 0?", "Sum of squares of the roots of x³ {0}x² {1}x {2} = 0?"), v: [sg(-e1), sg(e2), sg(-e3)], a: e1 * e1 - 2 * e2,
          x: [`Viyet: x₁+x₂+x₃ = ${m(e1)},  x₁x₂ + x₁x₃ + x₂x₃ = ${m(e2)}`, `Σx² = (Σx)² − 2·Σxy = ${e1 * e1} − 2·${p(e2)}`, `= ${e1 * e1 - 2 * e2}`] };
      },
      "Irratsional tenglamalar": () => {
        const b = R(2, 6), j = R(1, 3), a = j * j + j - b, x1 = b + j + 1;
        return { s: T("√(x {0}) = x − {1} tenglamani yeching.", "Решите уравнение √(x {0}) = x − {1}.", "Solve √(x {0}) = x − {1}."), v: [sg(a), b], a: x1,
          x: [`Kvadratga ko'taramiz: x ${sg(a)} = (x − ${b})²`, `x² − ${2 * b + 1}x + ${b * b - a} = 0 ⇒ x = ${b - j}  yoki  x = ${x1}`, `x − ${b} ≥ 0 shart: x = ${b - j} yaramaydi (begona ildiz)`, `Javob: ${x1}`] };
      }
    };
  }

  window.MSLessons = function (H) { return { THEORY, EXPL, G2: makeG2(H) }; };
})();
