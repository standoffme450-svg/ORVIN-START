/* ORVIN — MOCK 1-variant (45 topshiriq). Tuzilishi ms-matematika.js dagi BLUEPRINT bilan bir xil:
   1–32 yopiq (A–D), 33–35 moslashtirish (A–F), 36–45 ochiq (a va b).
   Yangi variant qo'shish: shu faylni nusxalab ms-mock-v2.js qiling, id ni o'zgartiring va index.html ga ulang. */
(function () {
  'use strict';
  const Fg = window.MSMockFig; if (!Fg || !window.MSMockBanks) return;
  const r = String.raw, T = (uz, ru, en) => ({ uz, ru, en });
  const { svg, line, poly, circ, dot, txt, inter, mid, lerp, add, wsum } = Fg;
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const ACC = '#0ff', PINK = 'rgba(0,255,255,.16)', GR = 'rgba(130,200,255,.28)';

  /* ===================== RASMLAR ===================== */
  const fig24 = () => {
    const A = [40, 215], B = [205, 45], C = [300, 215], a = dist(B, C), b = dist(C, A), c = dist(A, B);
    const D = wsum([b, c], [B, C]), E = wsum([a, b], [A, B]), I = inter(A, D, C, E);
    return svg(340, 250, poly([A, I, C], { f: PINK, c: 'none' }) + poly([A, B, C]) + line(A, D, { c: ACC }) + line(C, E, { c: ACC }) + dot(I) +
      txt(add(A, -8, 24), 'A') + txt(add(B, 0, -12), 'B') + txt(add(C, 10, 24), 'C') + txt(add(I, 4, -12), 'I') + txt(add(B, 0, 40), '70°', { r: 1 }));
  };
  const fig25 = () => {
    const B = [50, 205], C = [218, 205], A = [120, 61];
    return svg(300, 250, poly([A, B, C]) + txt(add(B, -10, 24), 'B') + txt(add(C, 12, 24), 'C') + txt(add(A, 0, -12), 'A') +
      txt(add(mid(A, B), -22, -4), '13', { r: 1 }) + txt(add(mid(B, C), 0, 28), '14', { r: 1 }) + txt(add(mid(A, C), 24, -4), '15', { r: 1 }));
  };
  const fig26 = () => {
    const O = [105, 125], R = 80, P = [330, 125], d = P[0] - O[0], phi = Math.acos(R / d);
    const A = [O[0] + R * Math.cos(phi), O[1] - R * Math.sin(phi)];
    const th = 12 * Math.PI / 180, u = [-Math.cos(th), Math.sin(th)];
    const w = [P[0] - O[0], P[1] - O[1]], bq = w[0] * u[0] + w[1] * u[1], cq = w[0] * w[0] + w[1] * w[1] - R * R, disc = Math.sqrt(bq * bq - cq);
    const t1 = -bq - disc, t2 = -bq + disc, B = [P[0] + u[0] * t1, P[1] + u[1] * t1], C = [P[0] + u[0] * t2, P[1] + u[1] * t2];
    return svg(360, 250, circ(O, R) + line(P, A) + line(P, C) + dot(A) + dot(B) + dot(C) + dot(P) +
      txt(add(A, 4, -12), 'A') + txt(add(P, 14, 6), 'P') + txt(add(B, 6, -12), 'B') + txt(add(C, -14, 22), 'C') +
      txt(add(mid(P, A), 4, -14), '12', { r: 1 }) + txt(add(mid(P, B), 6, 26), '8', { r: 1 }));
  };
  const fig28 = () => {
    const c = [170, 130], R = 100, V = [0, 60, 120, 180, 240, 300].map(a => [c[0] + R * Math.cos(a * Math.PI / 180), c[1] - R * Math.sin(a * Math.PI / 180)]);
    const [A, B, C, D, E, F] = V, K = inter(A, C, B, F);
    return svg(340, 260, poly(V) + line(A, C, { c: ACC }) + line(B, F, { c: ACC }) + dot(K) +
      txt(add(A, 16, 6), 'A') + txt(add(B, 12, -10), 'B') + txt(add(C, -12, -10), 'C') + txt(add(D, -16, 6), 'D') + txt(add(E, -12, 24), 'E') + txt(add(F, 12, 24), 'F') + txt(add(K, -14, -8), 'K'));
  };
  const fig29 = () => {
    const P = (x, y, z) => [50 + 75 * x + 25 * y, 230 - 20 * y - 75 * z];
    const A = P(0, 0, 0), B = P(2, 0, 0), C = P(2, 2, 0), D = P(0, 2, 0), A1 = P(0, 0, 2), B1 = P(2, 0, 2), C1 = P(2, 2, 2), D1 = P(0, 2, 2);
    const H = P(4 / 3, 2 / 3, 2 / 3);
    return svg(340, 260, poly([A, B, D1], { f: PINK, c: 'none' }) +
      line(A, D, { d: '6 6' }) + line(D, C, { d: '6 6' }) + line(D, D1, { d: '6 6' }) +
      poly([A, B, B1, A1]) + line(B, C) + line(C, C1) + line(B1, C1) + line(A1, D1) + line(C1, D1) +
      line(B, D1, { c: ACC }) + line(A, D1, { c: ACC }) + line(A, H, { c: '#ff8fa3', d: '5 4', w: 2.4 }) + dot(H) +
      txt(add(A, -14, 8), 'A') + txt(add(B, 14, 14), 'B') + txt(add(C, 16, 4), 'C') + txt(add(D, -12, 10), 'D') +
      txt(add(A1, -16, 0), 'A₁') + txt(add(B1, -4, -12), 'B₁') + txt(add(C1, 20, 0), 'C₁') + txt(add(D1, -6, -12), 'D₁') + txt(add(H, 16, 16), 'H'));
  };
  const fig33 = () => {
    const c = [160, 190], rx = 100, ry = 26, ap = [160, 35];
    return svg(320, 250, `<path d="M${c[0] - rx},${c[1]} A${rx},${ry} 0 0 0 ${c[0] + rx},${c[1]}" fill="none" stroke="#d8f6ff" stroke-width="2.8"/><path d="M${c[0] - rx},${c[1]} A${rx},${ry} 0 0 1 ${c[0] + rx},${c[1]}" fill="none" stroke="#d8f6ff" stroke-width="2.4" stroke-dasharray="6 6"/>` +
      line([c[0] - rx, c[1]], ap) + line([c[0] + rx, c[1]], ap) + line(c, ap, { d: '6 6', c: ACC }) + line(c, [c[0] + rx, c[1]], { d: '6 6', c: ACC }) + dot(c) + dot(ap) +
      txt(add(ap, 0, -12), 'S') + txt(add(c, -12, 20), 'O') + txt(add(mid(c, [c[0] + rx, c[1]]), 0, -8), '6', { r: 1 }) + txt(add(mid([c[0] + rx, c[1]], ap), 18, -2), '10', { r: 1 }));
  };
  const fig41 = () => {
    const O = [160, 120], R = 100, A = [80, 180], B = [240, 180], C = [160, 20];
    return svg(320, 245, poly([A, C, B], { f: PINK, c: 'none' }) + circ(O, R) + poly([A, C, B]) + line(O, A, { d: '6 6', c: ACC }) + dot(O) +
      txt(add(A, -14, 16), 'A') + txt(add(B, 14, 16), 'B') + txt(add(C, 0, -10), 'C') + txt(add(O, 16, -6), 'O') + txt(add(mid(O, A), -6, -10), '10', { r: 1 }) + txt([160, 206], '16', { r: 1 }));
  };
  const fig42 = () => {
    const A = [40, 200], D = [290, 200], B = [102, 70], C = [227, 70], O = inter(A, C, B, D);
    return svg(330, 250, poly([B, O, C], { f: PINK, c: 'none' }) + poly([A, B, C, D]) + line(A, C, { c: ACC }) + line(B, D, { c: ACC }) + dot(O) +
      txt(add(A, -12, 22), 'A') + txt(add(D, 12, 22), 'D') + txt(add(B, -10, -10), 'B') + txt(add(C, 10, -10), 'C') + txt(add(O, 0, 30), 'O') +
      txt([165, 52], '6', { r: 1 }) + txt([165, 228], '12', { r: 1 }));
  };
  const fig43 = () => {
    const u = 36, ox = 120, oy = 235, X = x => ox + u * x, Y = y => oy - u * y;
    let g = ''; for (let x = -3; x <= 5; x++) g += line([X(x), Y(-0.5)], [X(x), Y(6)], { c: GR, w: 1 }); for (let y = 0; y <= 6; y++) g += line([X(-3), Y(y)], [X(5.3), Y(y)], { c: GR, w: 1 });
    const A = [X(-2), Y(1)], B = [X(4), Y(1)], C = [X(1), Y(5)];
    return svg(360, 270, g + line([X(-3), Y(0)], [X(5.4), Y(0)], { w: 2 }) + line([X(0), Y(-0.5)], [X(0), Y(6.2)], { w: 2 }) +
      poly([A, B, C], { f: PINK }) + dot(A) + dot(B) + dot(C) + txt([X(5.4), Y(0) + 22], 'x') + txt([X(0) + 14, Y(6.2) + 6], 'y') + txt([X(0) - 12, Y(0) + 22], 'O') +
      txt(add(A, -14, 22), 'A') + txt(add(B, 14, 22), 'B') + txt(add(C, 0, -12), 'C'));
  };
  const fig44 = () => {
    const A = [50, 210], B = [210, 210], C = [270, 175], D = [110, 175], O = inter(A, C, B, D), S = [O[0], 40];
    return svg(330, 255, line(A, D, { d: '6 6' }) + line(D, C, { d: '6 6' }) + line(S, D, { d: '6 6' }) + line(A, C, { d: '4 5', c: GR, w: 2 }) + line(B, D, { d: '4 5', c: GR, w: 2 }) +
      line(S, O, { d: '6 6', c: ACC }) + poly([A, B, C], { c: 'none' }) + line(A, B) + line(B, C) + line(S, A) + line(S, B) + line(S, C) + dot(O) + dot(S) +
      txt(add(S, 0, -12), 'S') + txt(add(A, -14, 22), 'A') + txt(add(B, 6, 26), 'B') + txt(add(C, 16, 6), 'C') + txt(add(D, -14, -6), 'D') + txt(add(O, 14, 20), 'O') +
      txt(add(mid(A, B), 0, 28), '6', { r: 1 }) + txt(add(mid(S, B), 30, 0), '√34', { r: 1 }));
  };

  /* ===================== SAVOLLAR ===================== */
  const Q = [];
  const add_ = o => Q.push(o);
  const MO = [r`36`, r`8`, r`60`, r`96`, r`48`, r`25`]; 
  // Q and add_ are declared in the shared scaffold;
add_({ t: T(r`$a\cdot b=30$ bo'lgan natural $a,b$ uchun $a+2b-1$ ifodaning eng kichik qiymatini toping.`, r`Найдите наименьшее значение $a+2b-1$ для натуральных $a,b$ с $a\cdot b=30$.`, r`Find the smallest value of $a+2b-1$ for natural $a,b$ with $a\cdot b=30$.`), o: [r`16`, r`15`, r`12`, r`31`], c: 1, x: r`(6;5)\to15,\ (5;6)\to16;\ min=15` });
add_({ t: T(r`Mahsulot narxi avval $25\%$ ga oshirildi, keyin yangi narxdan $20\%$ chegirma qilindi. Oxirgi narx $200\,000$ so'm. Dastlabki narxni toping.`, r`Цену сначала повысили на $25\%$, затем снизили на $20\%$. Конечная $200\,000$. Найдите первоначальную.`, r`Raised 25% then reduced 20%. Final $200\,000$. Original?`), o: [r`200000`, r`250000`, r`160000`, r`180000`], c: 0, x: r`x\cdot1{,}25\cdot0{,}8=x=200000` });
add_({ t: T(r`Do'kon 3 kunda jami 175 kg kartoshka sotdi. Ikkinchi kun uchinchi kunga nisbatan 1,5 marta ko'p, birinchi kun ikkinchi kunga nisbatan 2,4 marta kam. Birinchi kun necha kg?`, r`За 3 дня 175 кг. Второй в 1,5 раза больше третьего, первый в 2,4 раза меньше второго. Сколько в первый день?`, r`175 kg in 3 days. Day2=1.5·day3, day1=day2/2.4. Day1?`), o: [r`35`, r`44`, r`56`, r`27`], c: 0, x: r`0{,}625t+1{,}5t+t=3{,}125t=175\Rightarrow t=56,\ day1=35` });
add_({ t: T(r`$(\sqrt7+1-\sqrt3)(\sqrt7+\sqrt3-1)$ ni soddalashtiring.`, r`Упростите $(\sqrt7+1-\sqrt3)(\sqrt7+\sqrt3-1)$.`, r`Simplify $(\sqrt7+1-\sqrt3)(\sqrt7+\sqrt3-1)$.`), o: [r`5+2\sqrt3`, r`3-2\sqrt3`, r`5-2\sqrt3`, r`3+2\sqrt3`], c: 3, x: r`a=\sqrt7,b=\sqrt3;\ (a+1-b)(a-1+b)=a^2-(1-b)^2=7-(1-2b+b^2)=3+2\sqrt3` });
add_({ t: T(r`$a=6$, $b=4\sqrt2$, $c=2\sqrt{10}$ sonlarni o'sish tartibida joylashtiring.`, r`Расположите $a=6$, $b=4\sqrt2$, $c=2\sqrt{10}$.`, r`Arrange $a=6$, $b=4\sqrt2$, $c=2\sqrt{10}$.`), o: [r`a<b<c`, r`c<b<a`, r`b<a<c`, r`c<a<b`], c: 2, x: r`b^2=32<a^2=36<c^2=40` });
add_({ t: T(r`Arifmetik progressiyada $a_{10}+a_{12}=25$ va $a_{20}+a_{22}=45$ bo'lsa, $a_{11}+a_{21}$ ni toping.`, r`В АП $a_{10}+a_{12}=25$, $a_{20}+a_{22}=45$. Найдите $a_{11}+a_{21}$.`, r`In AP $a_{10}+a_{12}=25$, $a_{20}+a_{22}=45$. Find $a_{11}+a_{21}$.`), o: [r`25`, r`35`, r`30`, r`20`], c: 1, x: r`2a_{11}=25\Rightarrow12{,}5;\ 2a_{21}=45\Rightarrow22{,}5;\ sum=35` });
add_({ t: T(r`Geometrik progressiyada $b_3=18$, $S_3=26$ bo'lsa, $b_1$ ning mumkin bo'lgan qiymatlarini toping.`, r`В ГП $b_3=18$, $S_3=26$. Возможные $b_1$.`, r`In GP $b_3=18$, $S_3=26$. Possible $b_1$.`), o: [r`8\ \text{yoki}\ 16`, r`6\ \text{yoki}\ 36`, r`2\ \text{yoki}\ 32`, r`4\ \text{yoki}\ 64`], c: 2, x: r`(8-b_1)^2=18b_1\Rightarrow b_1=2,32` });
add_({ t: T(r`$x-y=5$ bo'lsa, $6x+5-6y$ ning qiymatini toping.`, r`Если $x-y=5$, найдите $6x+5-6y$.`, r`If $x-y=5$, find $6x+5-6y$.`), o: [r`35`, r`25`, r`30`, r`40`], c: 0, x: r`6(x-y)+5=35` });
add_({ t: T(`Tenglamani yeching: $\\frac{x+18}{x-18}=4$.`, `Tenglamani yeching: $\\frac{x+18}{x-18}=4$.`, `Tenglamani yeching: $\\frac{x+18}{x-18}=4$.`), o: [`30`, `36`, `27`, `33`], c: 0, x: `x+18=4x-72;\\ (b-1)x=90;\\ x=30` });
add_({ t: T(`$\\log_2(x-4)+\\log_2(x+4)=\\log_2(9)$ tenglamani yeching (soha shartini hisobga oling).`, `$\\log_2(x-4)+\\log_2(x+4)=\\log_2(9)$ tenglamani yeching (soha shartini hisobga oling).`, `$\\log_2(x-4)+\\log_2(x+4)=\\log_2(9)$ tenglamani yeching (soha shartini hisobga oling).`), o: [`4`, `5`, `6`, `7`], c: 1, x: `(x-4)(x+4)=9;\\ x^2=25;\\ x=5` });
add_({ t: T(`$2\\sin^2x-3\\sin x+1=0$ tenglamaning $[0;2\\pi]$ dagi ildizlari sonini toping.`, `$2\\sin^2x-3\\sin x+1=0$ tenglamaning $[0;2\\pi]$ dagi ildizlari sonini toping.`, `$2\\sin^2x-3\\sin x+1=0$ tenglamaning $[0;2\\pi]$ dagi ildizlari sonini toping.`), o: [`2`, `5`, `4`, `3`], c: 3, x: `(2\\sin x-1)(\\sin x-1)=0;\\ x=\\pi/6,\\pi/2,5\\pi/6;\\ 3 ta ildiz` });
add_({ t: T(`Tomonlari $26$, $28$, $30$ bo'lgan uchburchak yuzini toping.`, `Tomonlari $26$, $28$, $30$ bo'lgan uchburchak yuzini toping.`, `Tomonlari $26$, $28$, $30$ bo'lgan uchburchak yuzini toping.`), o: [`336`, `294`, `378`, `420`], c: 0, x: `Heron formulasi: p=42;\\ S=\\sqrt{42\\cdot16\\cdot14\\cdot12}=336` });
add_({ t: T(`$3^{2x}-(10)\\cdot3^x+9=0$ tenglama ildizlari yig'indisini toping.`, `$3^{2x}-(10)\\cdot3^x+9=0$ tenglama ildizlari yig'indisini toping.`, `$3^{2x}-(10)\\cdot3^x+9=0$ tenglama ildizlari yig'indisini toping.`), o: [`4`, `3`, `2`, `1`], c: 2, x: `t=3^x>0: t^2-(10)t+9=0; t=1 yoki 9; x=0 yoki 2; yig'indi=2` });
add_({ t: T(`$|x-4|<4$ tengsizlik yechimlari to'plamining uzunligini toping.`, `$|x-4|<4$ tengsizlik yechimlari to'plamining uzunligini toping.`, `$|x-4|<4$ tengsizlik yechimlari to'plamining uzunligini toping.`), o: [`8`, `10`, `7`, `9`], c: 0, x: `4-4<x<4+4;\\ uzunlik=2\\cdot4=8` });
add_({ t: T(`$10$ ta elementdan tartibni hisobga olmagan holda 2 tadan tanlashlar sonini toping.`, `$10$ ta elementdan tartibni hisobga olmagan holda 2 tadan tanlashlar sonini toping.`, `$10$ ta elementdan tartibni hisobga olmagan holda 2 tadan tanlashlar sonini toping.`), o: [`50`, `55`, `45`, `40`], c: 2, x: `C_{10}^2=\\frac{10(10-1)}2=45` });
add_({ t: T(`Kvadrat tenglama ildizlari $x_1,x_2$ bo'lib, $x_1+x_2=9$ va $x_1x_2=4$. $x_1^2+x_2^2$ ni toping.`, `Kvadrat tenglama ildizlari $x_1,x_2$ bo'lib, $x_1+x_2=9$ va $x_1x_2=4$. $x_1^2+x_2^2$ ni toping.`, `Kvadrat tenglama ildizlari $x_1,x_2$ bo'lib, $x_1+x_2=9$ va $x_1x_2=4$. $x_1^2+x_2^2$ ni toping.`), o: [`91`, `64`, `82`, `73`], c: 3, x: `x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=81-2\\cdot4=73` });
add_({ t: T(`$225$ sonining barcha natural bo'luvchilari sonini toping.`, `$225$ sonining barcha natural bo'luvchilari sonini toping.`, `$225$ sonining barcha natural bo'luvchilari sonini toping.`), o: [`10`, `9`, `8`, `11`], c: 1, x: `225=3^2\\cdot5^2;\\ d(n)=(2+1)(2+1)=9` });
add_({ t: T(`Mahsulot narxi avval $20\\%$ ga oshirildi\\, keyin $16\\%$ ga kamaytirildi. Yakuniy narx $100\\,800$ so'm. Dastlabki narxni toping.`, `Mahsulot narxi avval $20\\%$ ga oshirildi\\, keyin $16\\%$ ga kamaytirildi. Yakuniy narx $100\\,800$ so'm. Dastlabki narxni toping.`, `Mahsulot narxi avval $20\\%$ ga oshirildi\\, keyin $16\\%$ ga kamaytirildi. Yakuniy narx $100\\,800$ so'm. Dastlabki narxni toping.`), o: [`100000`, `87500`, `125000`, `112500`], c: 0, x: `x\\cdot1.20\\cdot0.84=100800;\\ x=100000` });
add_({ t: T(`$30\\%$ li $30$ kg eritmaga suv qo'shib, $10\\%$ li eritma olindi. Necha kg suv qo'shilgan?`, `$30\\%$ li $30$ kg eritmaga suv qo'shib, $10\\%$ li eritma olindi. Necha kg suv qo'shilgan?`, `$30\\%$ li $30$ kg eritmaga suv qo'shib, $10\\%$ li eritma olindi. Necha kg suv qo'shilgan?`), o: [`53`, `60`, `74`, `67`], c: 1, x: `m_{tuz}=30\\cdot30/100=9.0;\\ m_{yakuniy}=9.0/(10/100)=90;\\ x=60` });
add_({ t: T(`Soddalashtiring: $(6+2)^2-(6-2)^2$.`, `Soddalashtiring: $(6+2)^2-(6-2)^2$.`, `Soddalashtiring: $(6+2)^2-(6-2)^2$.`), o: [`48`, `54`, `60`, `42`], c: 0, x: `(a+b)^2-(a-b)^2=4ab=4\\cdot6\\cdot2=48` });
add_({ t: T(`$\\sqrt{625}$ ning qiymatini toping.`, `$\\sqrt{625}$ ning qiymatini toping.`, `$\\sqrt{625}$ ning qiymatini toping.`), o: [`25`, `31`, `22`, `28`], c: 0, x: `\\sqrt{625}=25` });
add_({ t: T(`Arifmetik progressiyada $a_1=3$, $d=6$. $a_{9}$ ni toping.`, `Arifmetik progressiyada $a_1=3$, $d=6$. $a_{9}$ ni toping.`, `Arifmetik progressiyada $a_1=3$, $d=6$. $a_{9}$ ni toping.`), o: [`63`, `45`, `51`, `57`], c: 2, x: `a_n=a_1+(n-1)d=3+(9-1)\\cdot6=51` });
add_({ t: T(`Geometrik progressiyada $b_1=4$, $q=2$. $b_{4}$ ni toping.`, `Geometrik progressiyada $b_1=4$, $q=2$. $b_{4}$ ni toping.`, `Geometrik progressiyada $b_1=4$, $q=2$. $b_{4}$ ni toping.`), o: [`40`, `32`, `36`, `28`], c: 1, x: `b_n=b_1q^{n-1}=4\\cdot2^{3}=32` });
add_({ t: T(`Agar $x=2$ va $y=4$ bo'lsa, $x^2-y^2$ ni hisoblang.`, `Agar $x=2$ va $y=4$ bo'lsa, $x^2-y^2$ ni hisoblang.`, `Agar $x=2$ va $y=4$ bo'lsa, $x^2-y^2$ ni hisoblang.`), o: [`-13`, `-12`, `-10`, `-11`], c: 1, x: `2^2-4^2=-12` });
add_({ t: T(`Tenglamani yeching: $\\frac{x+6}{x-6}=3$.`, `Tenglamani yeching: $\\frac{x+6}{x-6}=3$.`, `Tenglamani yeching: $\\frac{x+6}{x-6}=3$.`), o: [`14`, `13`, `11`, `12`], c: 3, x: `x+6=3x-18;\\ (b-1)x=24;\\ x=12` });
add_({ t: T(`$\\log_2(x-4)+\\log_2(x+4)=\\log_2(65)$ tenglamani yeching (soha shartini hisobga oling).`, `$\\log_2(x-4)+\\log_2(x+4)=\\log_2(65)$ tenglamani yeching (soha shartini hisobga oling).`, `$\\log_2(x-4)+\\log_2(x+4)=\\log_2(65)$ tenglamani yeching (soha shartini hisobga oling).`), o: [`8`, `9`, `10`, `11`], c: 1, x: `(x-4)(x+4)=65;\\ x^2=81;\\ x=9` });
add_({ t: T(`$2\\sin^2x-3\\sin x+1=0$ tenglamaning $[0;2\\pi]$ dagi ildizlari sonini toping.`, `$2\\sin^2x-3\\sin x+1=0$ tenglamaning $[0;2\\pi]$ dagi ildizlari sonini toping.`, `$2\\sin^2x-3\\sin x+1=0$ tenglamaning $[0;2\\pi]$ dagi ildizlari sonini toping.`), o: [`2`, `4`, `3`, `5`], c: 2, x: `(2\\sin x-1)(\\sin x-1)=0;\\ x=\\pi/6,\\pi/2,5\\pi/6;\\ 3 ta ildiz` });
add_({ t: T(`Tomonlari $39$, $42$, $45$ bo'lgan uchburchak yuzini toping.`, `Tomonlari $39$, $42$, $45$ bo'lgan uchburchak yuzini toping.`, `Tomonlari $39$, $42$, $45$ bo'lgan uchburchak yuzini toping.`), o: [`662`, `756`, `944`, `850`], c: 1, x: `Heron formulasi: p=63;\\ S=\\sqrt{63\\cdot24\\cdot21\\cdot18}=756` });
add_({ t: T(`$3^{2x}-(244)\\cdot3^x+243=0$ tenglama ildizlari yig'indisini toping.`, `$3^{2x}-(244)\\cdot3^x+243=0$ tenglama ildizlari yig'indisini toping.`, `$3^{2x}-(244)\\cdot3^x+243=0$ tenglama ildizlari yig'indisini toping.`), o: [`6`, `5`, `4`, `7`], c: 1, x: `t=3^x>0: t^2-(244)t+243=0; t=1 yoki 243; x=0 yoki 5; yig'indi=5` });
add_({ t: T(`$|x-2|<2$ tengsizlik yechimlari to'plamining uzunligini toping.`, `$|x-2|<2$ tengsizlik yechimlari to'plamining uzunligini toping.`, `$|x-2|<2$ tengsizlik yechimlari to'plamining uzunligini toping.`), o: [`4`, `5`, `6`, `3`], c: 0, x: `2-2<x<2+2;\\ uzunlik=2\\cdot2=4` });
add_({ t: T(`$9$ ta elementdan tartibni hisobga olmagan holda 2 tadan tanlashlar sonini toping.`, `$9$ ta elementdan tartibni hisobga olmagan holda 2 tadan tanlashlar sonini toping.`, `$9$ ta elementdan tartibni hisobga olmagan holda 2 tadan tanlashlar sonini toping.`), o: [`36`, `40`, `32`, `44`], c: 0, x: `C_{9}^2=\\frac{9(9-1)}2=36` });
add_({ t: T(`Kvadrat tenglama ildizlari $x_1,x_2$ bo'lib, $x_1+x_2=10$ va $x_1x_2=4$. $x_1^2+x_2^2$ ni toping.`, `Kvadrat tenglama ildizlari $x_1,x_2$ bo'lib, $x_1+x_2=10$ va $x_1x_2=4$. $x_1^2+x_2^2$ ni toping.`, `Kvadrat tenglama ildizlari $x_1,x_2$ bo'lib, $x_1+x_2=10$ va $x_1x_2=4$. $x_1^2+x_2^2$ ni toping.`), o: [`103`, `114`, `92`, `81`], c: 2, x: `x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=100-2\\cdot4=92` });
add_({ t: T(`Moslikni aniqlash uchun berilgan ifodalardan III ning qiymatini toping: I) $8+4$; II) $8\\cdot4$; III) $8^2$; IV) $4^2$; V) $8^2+4$; VI) $8\\cdot4+4$.`, `Moslikni aniqlash uchun berilgan ifodalardan III ning qiymatini toping: I) $8+4$; II) $8\\cdot4$; III) $8^2$; IV) $4^2$; V) $8^2+4$; VI) $8\\cdot4+4$.`, `Moslikni aniqlash uchun berilgan ifodalardan III ning qiymatini toping: I) $8+4$; II) $8\\cdot4$; III) $8^2$; IV) $4^2$; V) $8^2+4$; VI) $8\\cdot4+4$.`), sub: T(`Tanlangan ifoda qiymatini belgilang.`, `Укажите значение выбранного выражения.`, `Select the value of the selected expression.`), o: [`12`, `16`, `32`, `36`, `64`, `68`], c: 4, fixed: true, x: `Ifodani hisoblaymiz: 64` });
add_({ t: T(`Moslikni aniqlash uchun berilgan ifodalardan III ning qiymatini toping: I) $8+2$; II) $8\\cdot2$; III) $8^2$; IV) $2^2$; V) $8^2+2$; VI) $8\\cdot2+2$.`, `Moslikni aniqlash uchun berilgan ifodalardan III ning qiymatini toping: I) $8+2$; II) $8\\cdot2$; III) $8^2$; IV) $2^2$; V) $8^2+2$; VI) $8\\cdot2+2$.`, `Moslikni aniqlash uchun berilgan ifodalardan III ning qiymatini toping: I) $8+2$; II) $8\\cdot2$; III) $8^2$; IV) $2^2$; V) $8^2+2$; VI) $8\\cdot2+2$.`), sub: T(`Tanlangan ifoda qiymatini belgilang.`, `Укажите значение выбранного выражения.`, `Select the value of the selected expression.`), o: [`4`, `10`, `16`, `18`, `64`, `66`], c: 4, fixed: true, x: `Ifodani hisoblaymiz: 64` });
add_({ t: T(`Moslikni aniqlash uchun berilgan ifodalardan II ning qiymatini toping: I) $9+3$; II) $9\\cdot3$; III) $9^2$; IV) $3^2$; V) $9^2+3$; VI) $9\\cdot3+3$.`, `Moslikni aniqlash uchun berilgan ifodalardan II ning qiymatini toping: I) $9+3$; II) $9\\cdot3$; III) $9^2$; IV) $3^2$; V) $9^2+3$; VI) $9\\cdot3+3$.`, `Moslikni aniqlash uchun berilgan ifodalardan II ning qiymatini toping: I) $9+3$; II) $9\\cdot3$; III) $9^2$; IV) $3^2$; V) $9^2+3$; VI) $9\\cdot3+3$.`), sub: T(`Tanlangan ifoda qiymatini belgilang.`, `Укажите значение выбранного выражения.`, `Select the value of the selected expression.`), o: [`9`, `12`, `27`, `30`, `34`, `38`], c: 2, fixed: true, x: `Ifodani hisoblaymiz: 27` });
add_({ t: T(`$x^2-121=0$ tenglama berilgan.`, `$x^2-121=0$ tenglama berilgan.`, `$x^2-121=0$ tenglama berilgan.`), qa: T(`Tenglamaning musbat ildizini toping.`, `Tenglamaning musbat ildizini toping.`, `Tenglamaning musbat ildizini toping.`), qb: T(`Ildizlar ko'paytmasini toping.`, `Ildizlar ko'paytmasini toping.`, `Ildizlar ko'paytmasini toping.`), pa: { a: `11` }, pb: { a: `-121` }, x: `x=\\pm\\sqrt{121}=\\pm11;\\ x_1x_2=-121` });
add_({ t: T(`$f(x)=x^2-18x+80$ funksiya berilgan.`, `$f(x)=x^2-18x+80$ funksiya berilgan.`, `$f(x)=x^2-18x+80$ funksiya berilgan.`), qa: T(`Parabola uchining abssissasini toping.`, `Parabola uchining abssissasini toping.`, `Parabola uchining abssissasini toping.`), qb: T(`Funksiyaning eng kichik qiymatini toping.`, `Funksiyaning eng kichik qiymatini toping.`, `Funksiyaning eng kichik qiymatini toping.`), pa: { a: `9` }, pb: { a: `-1` }, x: `x_0=-\\frac{-29}{2}=9;\\ f(9)=-1` });
add_({ t: T(`Arifmetik progressiyada $a_1=8$, $d=2$, $n=10$.`, `Arifmetik progressiyada $a_1=8$, $d=2$, $n=10$.`, `Arifmetik progressiyada $a_1=8$, $d=2$, $n=10$.`), qa: T(`O'ninchi hadni toping.`, `O'ninchi hadni toping.`, `O'ninchi hadni toping.`), qb: T(`Birinchi 10 ta had yig'indisini toping.`, `Birinchi 10 ta had yig'indisini toping.`, `Birinchi 10 ta had yig'indisini toping.`), pa: { a: `26` }, pb: { a: `170` }, x: `a_{10}=8+9\\cdot2=26;\\ S_{10}=5(28+9\\cdot2)=170` });
add_({ t: T(`Radiusi $9$ bo'lgan doira berilgan.`, `Radiusi $9$ bo'lgan doira berilgan.`, `Radiusi $9$ bo'lgan doira berilgan.`), qa: T(`Doira uzunligini $\\pi$ orqali ifodalang (koeffitsiyent).`, `Doira uzunligini $\\pi$ orqali ifodalang (koeffitsiyent).`, `Doira uzunligini $\\pi$ orqali ifodalang (koeffitsiyent).`), qb: T(`Doira yuzini $\\pi$ orqali ifodalang (koeffitsiyent).`, `Doira yuzini $\\pi$ orqali ifodalang (koeffitsiyent).`, `Doira yuzini $\\pi$ orqali ifodalang (koeffitsiyent).`), pa: { a: `18` }, pb: { a: `81` }, x: `L=2\\pi r=18\\pi;\\ S=\\pi r^2=81\\pi` });
add_({ t: T(`$\\frac{7}{x}=1$ tenglama berilgan.`, `$\\frac{7}{x}=1$ tenglama berilgan.`, `$\\frac{7}{x}=1$ tenglama berilgan.`), qa: T(`Tenglamaning yechimini toping.`, `Tenglamaning yechimini toping.`, `Tenglamaning yechimini toping.`), qb: T(`Topilgan yechimning kvadratini toping.`, `Topilgan yechimning kvadratini toping.`, `Topilgan yechimning kvadratini toping.`), pa: { a: `7` }, pb: { a: `49` }, x: `x=7/1=7;\\ x^2=49` });
add_({ t: T(`$x^2-144=0$ tenglama berilgan.`, `$x^2-144=0$ tenglama berilgan.`, `$x^2-144=0$ tenglama berilgan.`), qa: T(`Tenglamaning musbat ildizini toping.`, `Tenglamaning musbat ildizini toping.`, `Tenglamaning musbat ildizini toping.`), qb: T(`Ildizlar ko'paytmasini toping.`, `Ildizlar ko'paytmasini toping.`, `Ildizlar ko'paytmasini toping.`), pa: { a: `12` }, pb: { a: `-144` }, x: `x=\\pm\\sqrt{144}=\\pm12;\\ x_1x_2=-144` });
add_({ t: T(`$f(x)=x^2-14x+48$ funksiya berilgan.`, `$f(x)=x^2-14x+48$ funksiya berilgan.`, `$f(x)=x^2-14x+48$ funksiya berilgan.`), qa: T(`Parabola uchining abssissasini toping.`, `Parabola uchining abssissasini toping.`, `Parabola uchining abssissasini toping.`), qb: T(`Funksiyaning eng kichik qiymatini toping.`, `Funksiyaning eng kichik qiymatini toping.`, `Funksiyaning eng kichik qiymatini toping.`), pa: { a: `7` }, pb: { a: `-1` }, x: `x_0=-\\frac{-27}{2}=7;\\ f(7)=-1` });
add_({ t: T(`Arifmetik progressiyada $a_1=8$, $d=3$, $n=10$.`, `Arifmetik progressiyada $a_1=8$, $d=3$, $n=10$.`, `Arifmetik progressiyada $a_1=8$, $d=3$, $n=10$.`), qa: T(`O'ninchi hadni toping.`, `O'ninchi hadni toping.`, `O'ninchi hadni toping.`), qb: T(`Birinchi 10 ta had yig'indisini toping.`, `Birinchi 10 ta had yig'indisini toping.`, `Birinchi 10 ta had yig'indisini toping.`), pa: { a: `35` }, pb: { a: `215` }, x: `a_{10}=8+9\\cdot3=35;\\ S_{10}=5(28+9\\cdot3)=215` });
add_({ t: T(`Radiusi $7$ bo'lgan doira berilgan.`, `Radiusi $7$ bo'lgan doira berilgan.`, `Radiusi $7$ bo'lgan doira berilgan.`), qa: T(`Doira uzunligini $\\pi$ orqali ifodalang (koeffitsiyent).`, `Doira uzunligini $\\pi$ orqali ifodalang (koeffitsiyent).`, `Doira uzunligini $\\pi$ orqali ifodalang (koeffitsiyent).`), qb: T(`Doira yuzini $\\pi$ orqali ifodalang (koeffitsiyent).`, `Doira yuzini $\\pi$ orqali ifodalang (koeffitsiyent).`, `Doira yuzini $\\pi$ orqali ifodalang (koeffitsiyent).`), pa: { a: `14` }, pb: { a: `49` }, x: `L=2\\pi r=14\\pi;\\ S=\\pi r^2=49\\pi` });
add_({ t: T(`$\\frac{7}{x}=1$ tenglama berilgan.`, `$\\frac{7}{x}=1$ tenglama berilgan.`, `$\\frac{7}{x}=1$ tenglama berilgan.`), qa: T(`Tenglamaning yechimini toping.`, `Tenglamaning yechimini toping.`, `Tenglamaning yechimini toping.`), qb: T(`Topilgan yechimning kvadratini toping.`, `Topilgan yechimning kvadratini toping.`, `Topilgan yechimning kvadratini toping.`), pa: { a: `7` }, pb: { a: `49` }, x: `x=7/1=7;\\ x^2=49` });
  if (Q.length !== 45) console.warn('MSMock v4: 45 ta savol kerak, hozir', Q.length);
  window.MSMockBanks.push({ id: 'v4', name: T('4-variant (Normal)', 'Вариант 4 (Обычный)', 'Variant 4 (Normal)'), q: Q });
})();
