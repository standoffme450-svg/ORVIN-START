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
  const MO = [r`36`, r`8`, r`60`, r`96`, r`48`, r`25`];   // 33–35 uchun umumiy A–F

  // 1–10
  add_({ t: T(r`$a\cdot b=30$ bo'lgan natural $a,b$ uchun $a+2b-1$ ifodaning eng kichik qiymatini toping.`, r`Найдите наименьшее значение выражения $a+2b-1$ для натуральных $a,b$ с $a\cdot b=30$.`, r`Find the smallest value of $a+2b-1$ for natural numbers $a,b$ with $a\cdot b=30$.`), o: [r`16`, r`15`, r`12`, r`31`], c: 1, x: r`(1;30)\to60,(2;15)\to31,(3;10)\to22,(5;6)\to16,(6;5)\to15,(10;3)\to15,(15;2)\to18,(30;1)\to31;\ min=15` });
  add_({ t: T(r`Hisoblang: $\dfrac{0{,}(3)+0{,}1(6)}{0{,}(54)}$`, r`Вычислите: $\dfrac{0{,}(3)+0{,}1(6)}{0{,}(54)}$`, r`Evaluate: $\dfrac{0{,}(3)+0{,}1(6)}{0{,}(54)}$`), o: [r`\frac{11}{12}`, r`\frac78`, r`\frac56`, r`\frac{13}{12}`], c: 0, x: r`0{,}(3)=\tfrac13,\ 0{,}1(6)=\tfrac16,\ 0{,}(54)=\tfrac6{11};\ \frac{1/2}{6/11}=\frac{11}{12}` });
  add_({ t: T(r`Do'kon 3 kunda jami 175 kg kartoshka sotdi. Ikkinchi kun uchinchi kunga nisbatan 1,5 marta ko'p, birinchi kun esa ikkinchi kunga nisbatan 2,4 marta kam sotgan. Birinchi kun necha kg sotilgan?`, r`Магазин за 3 дня продал 175 кг картофеля. Во второй день в 1,5 раза больше, чем в третий, а в первый день в 2,4 раза меньше, чем во второй. Сколько кг продано в первый день?`, r`A shop sold 175 kg of potatoes in 3 days. The second day was 1.5 times the third, the first day was 2.4 times less than the second. How many kg on the first day?`), o: [r`35`, r`44`, r`56`, r`27`], c: 0, x: r`3-kun=t,\ 2-kun=1{,}5t,\ 1-kun=1{,}5t/2{,}4=0{,}625t;\ 0{,}625t+1{,}5t+t=3{,}125t=175\Rightarrow t=56,\ 1-kun=35` });
  add_({ t: T(r`$30\%$ li $40$ kg tuz eritmasiga necha kg suv qo'shilsa, $16\%$ li eritma hosil bo'ladi?`, r`Сколько килограммов воды нужно добавить к $40$ кг $30\%$-ного раствора соли, чтобы получить $16\%$-ный раствор?`, r`How many kg of water must be added to $40$ kg of a $30\%$ salt solution to get a $16\%$ solution?`), o: [r`30`, r`35`, r`25`, r`40`], c: 1, x: r`0{,}3\cdot40=12;\ \frac{12}{0{,}16}=75;\ 75-40=35` });
  add_({ t: T(r`$\sqrt{7+4\sqrt3}-\sqrt{7-4\sqrt3}$ ning qiymatini toping.`, r`Найдите значение $\sqrt{7+4\sqrt3}-\sqrt{7-4\sqrt3}$.`, r`Find the value of $\sqrt{7+4\sqrt3}-\sqrt{7-4\sqrt3}$.`), o: [r`4`, r`2`, r`2\sqrt3`, r`\sqrt3`], c: 2, x: r`\sqrt{7\pm4\sqrt3}=2\pm\sqrt3\Rightarrow(2+\sqrt3)-(2-\sqrt3)=2\sqrt3` });
  add_({ t: T(r`$a=\sqrt[3]{4},\ b=\sqrt3,\ c=\sqrt[6]{14}$ sonlarni o'sish tartibida joylashtiring.`, r`Расположите числа $a=\sqrt[3]{4},\ b=\sqrt3,\ c=\sqrt[6]{14}$ в порядке возрастания.`, r`Arrange $a=\sqrt[3]{4},\ b=\sqrt3,\ c=\sqrt[6]{14}$ in increasing order.`), o: [r`b<a<c`, r`a<c<b`, r`c<a<b`, r`c<b<a`], c: 2, x: r`\sqrt[6]{14}<\sqrt[6]{16}=\sqrt[3]4<\sqrt[6]{27}=\sqrt3` });
  add_({ t: T(r`$x=\sqrt5+2$ bo'lsa, $x^3-\dfrac1{x^3}$ ning qiymatini toping.`, r`Если $x=\sqrt5+2$, найдите $x^3-\dfrac1{x^3}$.`, r`If $x=\sqrt5+2$, find $x^3-\dfrac1{x^3}$.`), o: [r`64`, r`68`, r`80`, r`76`], c: 3, x: r`x-\tfrac1x=4;\ x^2+\tfrac1{x^2}=18;\ x^3-\tfrac1{x^3}=4\cdot19=76` });
  add_({ t: T(r`Arifmetik progressiyada $a_{10}+a_{12}=25$ va $a_{20}+a_{22}=45$ bo'lsa, $a_{11}+a_{21}$ ni toping.`, r`В арифметической прогрессии $a_{10}+a_{12}=25$ и $a_{20}+a_{22}=45$. Найдите $a_{11}+a_{21}$.`, r`In an arithmetic progression $a_{10}+a_{12}=25$ and $a_{20}+a_{22}=45$. Find $a_{11}+a_{21}$.`), o: [r`25`, r`35`, r`30`, r`20`], c: 1, x: r`2a_{11}=25\Rightarrow a_{11}=12{,}5;\ 2a_{21}=45\Rightarrow a_{21}=22{,}5;\ yig'indi=35` });
  add_({ t: T(r`Geometrik progressiyada $b_3=18$, $S_3=26$ bo'lsa, $b_1$ ning mumkin bo'lgan qiymatlarini toping.`, r`В геометрической прогрессии $b_3=18$, $S_3=26$. Найдите возможные значения $b_1$.`, r`In a geometric progression $b_3=18$, $S_3=26$. Find possible values of $b_1$.`), o: [r`8\ \text{yoki}\ 16`, r`6\ \text{yoki}\ 36`, r`2\ \text{yoki}\ 32`, r`4\ \text{yoki}\ 64`], c: 2, x: r`b_1(1+q)+18=26\Rightarrow b_1(1+q)=8,\ b_1q^2=18\Rightarrow(8-b_1)^2=18b_1\Rightarrow b_1^2-34b_1+64=0\Rightarrow b_1=2,32` });
  add_({ t: T(r`$a-b=2$ va $ab=15$ bo'lsa, $a^3-b^3$ ni toping.`, r`Если $a-b=2$ и $ab=15$, найдите $a^3-b^3$.`, r`If $a-b=2$ and $ab=15$, find $a^3-b^3$.`), o: [r`78`, r`98`, r`118`, r`68`], c: 1, x: r`a^3-b^3=(a-b)^3+3ab(a-b)=8+90=98` });
  // 11–20
  add_({ t: T(r`$\dfrac ab=3$ bo'lsa, $\dfrac{a^2-ab+b^2}{a^2+ab-2b^2}$ ning qiymatini toping.`, r`Если $\dfrac ab=3$, найдите значение $\dfrac{a^2-ab+b^2}{a^2+ab-2b^2}$.`, r`If $\dfrac ab=3$, find $\dfrac{a^2-ab+b^2}{a^2+ab-2b^2}$.`), o: [r`\frac35`, r`\frac9{10}`, r`\frac7{10}`, r`\frac78`], c: 2, x: r`a=3b:\ \frac{9-3+1}{9+3-2}=\frac7{10}` });
  add_({ t: T(r`$\sin\alpha+\cos\alpha=\dfrac12$ bo'lsa, $\sin2\alpha$ ning qiymatini toping.`, r`Если $\sin\alpha+\cos\alpha=\dfrac12$, найдите $\sin2\alpha$.`, r`If $\sin\alpha+\cos\alpha=\dfrac12$, find $\sin2\alpha$.`), o: [r`\frac34`, r`-\frac14`, r`-\frac12`, r`-\frac34`], c: 3, x: r`1+\sin2\alpha=\tfrac14\Rightarrow\sin2\alpha=-\tfrac34` });
  add_({ t: T(r`$\sin10^\circ\cdot\sin50^\circ\cdot\sin70^\circ$ ni hisoblang.`, r`Вычислите $\sin10^\circ\cdot\sin50^\circ\cdot\sin70^\circ$.`, r`Evaluate $\sin10^\circ\cdot\sin50^\circ\cdot\sin70^\circ$.`), o: [r`\frac14`, r`\frac18`, r`\frac{\sqrt3}8`, r`\frac1{16}`], c: 1, x: r`=\cos80^\circ\cos40^\circ\cos20^\circ=\frac{\sin160^\circ}{8\sin20^\circ}=\frac18` });
  add_({ t: T(r`$2^{2x+1}-5\cdot2^{x}+2=0$ tenglama ildizlarining ko'paytmasini toping.`, r`Найдите произведение корней уравнения $2^{2x+1}-5\cdot2^{x}+2=0$.`, r`Find the product of the roots of $2^{2x+1}-5\cdot2^{x}+2=0$.`), o: [r`0`, r`1`, r`2`, r`-1`], c: 3, x: r`t=2^x:\ 2t^2-5t+2=0,\ t=2,\tfrac12;\ x=1,-1;\ x_1x_2=-1` });
  add_({ t: T(r`$\log_2x+\log_x2=\dfrac52$ tenglama ildizlarining ko'paytmasini toping.`, r`Найдите произведение корней уравнения $\log_2x+\log_x2=\dfrac52$.`, r`Find the product of the roots of $\log_2x+\log_x2=\dfrac52$.`), o: [r`4`, r`2\sqrt2`, r`6`, r`4\sqrt2`], c: 3, x: r`t=\log_2x:\ t+\tfrac1t=\tfrac52,\ t=2,\tfrac12;\ x=4,\sqrt2;\ 4\sqrt2` });
  add_({ t: T(r`$x^2-5x+3=0$ tenglamaning ildizlari $x_1$ va $x_2$ bo'lsa, $x_1^3+x_2^3$ ni toping.`, r`Корни уравнения $x^2-5x+3=0$ равны $x_1$ и $x_2$. Найдите $x_1^3+x_2^3$.`, r`The roots of $x^2-5x+3=0$ are $x_1$ and $x_2$. Find $x_1^3+x_2^3$.`), o: [r`70`, r`85`, r`80`, r`100`], c: 2, x: r`x_1+x_2=5,\ x_1x_2=3;\ 5^3-3\cdot3\cdot5=80` });
  add_({ t: T(r`$\dfrac{x+1}{x-1}+\dfrac{x-1}{x+1}=\dfrac{10}3$ tenglama ildizlari kvadratlarining yig'indisini toping.`, r`Найдите сумму квадратов корней уравнения $\dfrac{x+1}{x-1}+\dfrac{x-1}{x+1}=\dfrac{10}3$.`, r`Find the sum of the squares of the roots of $\dfrac{x+1}{x-1}+\dfrac{x-1}{x+1}=\dfrac{10}3$.`), o: [r`4`, r`10`, r`8`, r`5`], c: 2, x: r`t=\tfrac{x+1}{x-1}:\ t+\tfrac1t=\tfrac{10}3,\ t=3,\tfrac13;\ x=2,-2;\ 4+4=8` });
  add_({ t: T(r`$\sqrt{x+6}>x$ tengsizlikning butun yechimlari sonini toping.`, r`Найдите количество целых решений неравенства $\sqrt{x+6}>x$.`, r`Find the number of integer solutions of $\sqrt{x+6}>x$.`), o: [r`8`, r`6`, r`10`, r`9`], c: 3, x: r`-6\le x<0\ (6\ \text{ta});\ x\ge0:\ x^2-x-6<0\Rightarrow0\le x<3\ (3\ \text{ta});\ 6+3=9` });
  add_({ t: T(r`$\dfrac{(x-1)(x+3)^2}{(x-4)(x+2)}\le0$ tengsizlikning $[-5;5]$ kesmadagi butun yechimlari sonini toping.`, r`Найдите количество целых решений неравенства $\dfrac{(x-1)(x+3)^2}{(x-4)(x+2)}\le0$ на отрезке $[-5;5]$.`, r`Find the number of integer solutions of $\dfrac{(x-1)(x+3)^2}{(x-4)(x+2)}\le0$ on $[-5;5]$.`), o: [r`7`, r`5`, r`8`, r`6`], c: 3, x: r`x\in(-\infty;-2)\cup[1;4);\ x=-5,-4,-3,1,2,3\Rightarrow6` });
  add_({ t: T(r`$f(x)=(a-2)x^2+(a^2-4)x+3$ funksiya juft bo'ladigan $a$ ning barcha qiymatlari ko'paytmasini toping.`, r`Найдите произведение всех значений $a$, при которых функция $f(x)=(a-2)x^2+(a^2-4)x+3$ чётная.`, r`Find the product of all values of $a$ for which $f(x)=(a-2)x^2+(a^2-4)x+3$ is an even function.`), o: [r`4`, r`0`, r`-2`, r`-4`], c: 3, x: r`a^2-4=0\Rightarrow a=\pm2;\ 2\cdot(-2)=-4` });
  // 21–32
  add_({ t: T(r`$f(x)=2x-3$, $g(x)=x^2+1$ funksiyalar berilgan. $f(g(x))=g(f(x))$ tenglama ildizlarining yig'indisini toping.`, r`Даны функции $f(x)=2x-3$, $g(x)=x^2+1$. Найдите сумму корней уравнения $f(g(x))=g(f(x))$.`, r`Given $f(x)=2x-3$ and $g(x)=x^2+1$, find the sum of the roots of $f(g(x))=g(f(x))$.`), o: [r`3`, r`6`, r`12`, r`-6`], c: 1, x: r`2x^2-1=4x^2-12x+10\Rightarrow2x^2-12x+11=0;\ x_1+x_2=6` });
  add_({ t: T(r`$y=\sqrt{6x-x^2-5}+\dfrac1{\sqrt{x-2}}$ funksiyaning aniqlanish sohasidagi barcha butun sonlar yig'indisini toping.`, r`Найдите сумму всех целых чисел из области определения функции $y=\sqrt{6x-x^2-5}+\dfrac1{\sqrt{x-2}}$.`, r`Find the sum of all integers in the domain of $y=\sqrt{6x-x^2-5}+\dfrac1{\sqrt{x-2}}$.`), o: [r`15`, r`12`, r`9`, r`14`], c: 1, x: r`1\le x\le5,\ x>2\Rightarrow x\in(2;5];\ 3+4+5=12` });
  add_({ t: T(r`$f(x)=6x^2-4x+1$ funksiyaning boshlang'ich funksiyalaridan biri $F(x)$ ning grafigi $(1;3)$ nuqtadan o'tadi. $F(2)$ ni toping.`, r`График одной из первообразных $F(x)$ функции $f(x)=6x^2-4x+1$ проходит через точку $(1;3)$. Найдите $F(2)$.`, r`The graph of an antiderivative $F(x)$ of $f(x)=6x^2-4x+1$ passes through $(1;3)$. Find $F(2)$.`), o: [r`10`, r`14`, r`12`, r`16`], c: 2, x: r`F=2x^3-2x^2+x+C;\ F(1)=1+C=3,\ C=2;\ F(2)=16-8+2+2=12` });
  add_({ t: T(r`$ABC$ uchburchakda $\angle B=70^\circ$. $A$ va $C$ burchaklarning bissektrisalari $I$ nuqtada kesishadi (rasmga qarang). $\angle AIC$ ni toping.`, r`В треугольнике $ABC$ угол $B=70^\circ$. Биссектрисы углов $A$ и $C$ пересекаются в точке $I$ (см. рисунок). Найдите $\angle AIC$.`, r`In triangle $ABC$, $\angle B=70^\circ$. The bisectors of angles $A$ and $C$ meet at $I$ (see figure). Find $\angle AIC$.`), fig: fig24, o: [r`110^\circ`, r`125^\circ`, r`115^\circ`, r`135^\circ`], c: 1, x: r`\angle AIC=90^\circ+\tfrac{\angle B}2=90^\circ+35^\circ=125^\circ` });
  add_({ t: T(r`Tomonlari $13$, $14$ va $15$ bo'lgan uchburchakning eng kichik balandligini toping (rasmga qarang).`, r`Найдите наименьшую высоту треугольника со сторонами $13$, $14$ и $15$ (см. рисунок).`, r`Find the smallest altitude of the triangle with sides $13$, $14$, $15$ (see figure).`), fig: fig25, o: [r`12`, r`\frac{168}{13}`, r`\frac{56}{5}`, r`13`], c: 2, x: r`S=\sqrt{21\cdot8\cdot7\cdot6}=84;\ h_{\min}=\frac{2\cdot84}{15}=\frac{56}5` });
  add_({ t: T(r`$P$ nuqtadan aylanaga $PA$ urinma va $PBC$ kesuvchi o'tkazilgan. $PA=12$, $PB=8$ (rasmga qarang). $BC$ ni toping.`, r`Из точки $P$ к окружности проведены касательная $PA$ и секущая $PBC$. $PA=12$, $PB=8$ (см. рисунок). Найдите $BC$.`, r`From point $P$ a tangent $PA$ and a secant $PBC$ are drawn to a circle. $PA=12$, $PB=8$ (see figure). Find $BC$.`), fig: fig26, o: [r`18`, r`8`, r`10`, r`12`], c: 2, x: r`PA^2=PB\cdot PC\Rightarrow PC=\frac{144}8=18;\ BC=18-8=10` });
  add_({ t: T(r`Rombning diagonallari $10$ va $24$ ga teng. Rombning balandligini toping.`, r`Диагонали ромба равны $10$ и $24$. Найдите высоту ромба.`, r`The diagonals of a rhombus are $10$ and $24$. Find the height of the rhombus.`), o: [r`\frac{60}{13}`, r`12`, r`\frac{120}{13}`, r`10`], c: 2, x: r`a=\sqrt{5^2+12^2}=13;\ S=\tfrac12\cdot10\cdot24=120;\ h=\frac{120}{13}` });
  add_({ t: T(r`$ABCDEF$ muntazam oltiburchakning tomoni $6$ ga teng. $AC$ va $BF$ diagonallar $K$ nuqtada kesishadi (rasmga qarang). $AK$ ni toping.`, r`Сторона правильного шестиугольника $ABCDEF$ равна $6$. Диагонали $AC$ и $BF$ пересекаются в точке $K$ (см. рисунок). Найдите $AK$.`, r`The side of the regular hexagon $ABCDEF$ is $6$. Diagonals $AC$ and $BF$ meet at $K$ (see figure). Find $AK$.`), fig: fig28, o: [r`3`, r`3\sqrt3`, r`2`, r`2\sqrt3`], c: 3, x: r`A(6;0),\ C(-3;3\sqrt3),\ BF:\ x=3;\ t=\tfrac13\Rightarrow AK=\tfrac13AC=\tfrac13\cdot6\sqrt3=2\sqrt3` });
  add_({ t: T(r`$ABCDA_1B_1C_1D_1$ kubning qirrasi $2$ ga teng. $A$ nuqtadan $BD_1$ to'g'ri chiziqqacha bo'lgan masofani toping (rasmga qarang).`, r`Ребро куба $ABCDA_1B_1C_1D_1$ равно $2$. Найдите расстояние от точки $A$ до прямой $BD_1$ (см. рисунок).`, r`The edge of the cube $ABCDA_1B_1C_1D_1$ is $2$. Find the distance from $A$ to the line $BD_1$ (see figure).`), fig: fig29, o: [r`\sqrt2`, r`\frac{2\sqrt3}3`, r`\frac43`, r`\frac{2\sqrt6}3`], c: 3, x: r`\triangle ABD_1:\ \angle A=90^\circ;\ h=\frac{AB\cdot AD_1}{BD_1}=\frac{2\cdot2\sqrt2}{2\sqrt3}=\frac{2\sqrt6}3` });
  add_({ t: T(r`$|\vec a|=3$, $|\vec b|=4$ va ular orasidagi burchak $60^\circ$. $|2\vec a-\vec b|$ ni toping.`, r`$|\vec a|=3$, $|\vec b|=4$, угол между ними $60^\circ$. Найдите $|2\vec a-\vec b|$.`, r`$|\vec a|=3$, $|\vec b|=4$ and the angle between them is $60^\circ$. Find $|2\vec a-\vec b|$.`), o: [r`2\sqrt{19}`, r`2\sqrt7`, r`4\sqrt3`, r`6`], c: 1, x: r`\vec a\cdot\vec b=3\cdot4\cos60^\circ=6;\ |2\vec a-\vec b|^2=36-24+16=28` });
  add_({ t: T(r`Sinfdagi $40$ o'quvchidan $20$ tasi matematika, $18$ tasi fizika, $15$ tasi kimyo to'garagiga qatnashadi. Matematika va fizikaga $8$ ta, matematika va kimyoga $7$ ta, fizika va kimyoga $6$ ta, uchala to'garakka $3$ ta o'quvchi qatnashadi. Hech qaysi to'garakka qatnashmaydigan o'quvchilar nechta?`, r`Из $40$ учеников класса $20$ посещают кружок математики, $18$ — физики, $15$ — химии. Математику и физику посещают $8$, математику и химию — $7$, физику и химию — $6$, все три кружка — $3$ ученика. Сколько учеников не посещают ни один кружок?`, r`Of $40$ students, $20$ attend math club, $18$ physics, $15$ chemistry. Math and physics: $8$; math and chemistry: $7$; physics and chemistry: $6$; all three: $3$. How many students attend no club?`), o: [r`3`, r`8`, r`5`, r`2`], c: 2, x: r`20+18+15-8-7-6+3=35;\ 40-35=5` });
  add_({ t: T(r`Qutida $5$ ta oq va $4$ ta qora shar bor. Tasodifan $3$ ta shar olinganda, ularning aynan ikkitasi oq bo'lish ehtimolini toping.`, r`В коробке $5$ белых и $4$ чёрных шара. Наугад берут $3$ шара. Найдите вероятность того, что ровно два из них белые.`, r`A box has $5$ white and $4$ black balls. Three balls are drawn at random. Find the probability that exactly two are white.`), o: [r`\frac5{14}`, r`\frac{10}{21}`, r`\frac12`, r`\frac{20}{63}`], c: 1, x: r`\frac{C_5^2\,C_4^1}{C_9^3}=\frac{10\cdot4}{84}=\frac{10}{21}` });
  // 33–35 moslashtirish
  const cone = T(r`Konusning asosi radiusi $6$, yasovchisi $10$ (rasmga qarang). Har bir topshiriq uchun javobni A–F variantlaridan tanlang.`, r`Радиус основания конуса равен $6$, образующая — $10$ (см. рисунок). Для каждого задания выберите ответ из вариантов A–F.`, r`A cone has base radius $6$ and slant height $10$ (see figure). For each task choose the answer from options A–F.`);
  add_({ t: cone, fig: fig33, sub: T(r`Konusning balandligini toping.`, r`Найдите высоту конуса.`, r`Find the height of the cone.`), o: MO, c: 1, x: r`h=\sqrt{10^2-6^2}=8` });
  add_({ t: cone, fig: fig33, sub: T(r`Konus hajmini $\pi$ ga bo'lgandagi qiymatini $\left(\dfrac V\pi\right)$ toping.`, r`Найдите значение $\dfrac V\pi$, где $V$ — объём конуса.`, r`Find $\dfrac V\pi$, where $V$ is the volume of the cone.`), o: MO, c: 3, x: r`V=\tfrac13\pi r^2h=\tfrac13\pi\cdot36\cdot8=96\pi` });
  add_({ t: cone, fig: fig33, sub: T(r`Konusning balandligi o'zgarmay, asosining radiusi $20\%$ ga kamaytirilsa, hajmi necha foizga kamayadi?`, r`На сколько процентов уменьшится объём конуса, если радиус основания уменьшить на $20\%$ при неизменной высоте?`, r`By what percent does the volume decrease if the base radius is reduced by $20\%$ with the height unchanged?`), o: MO, c: 0, x: r`V\sim r^2:\ 0{,}8^2=0{,}64\Rightarrow100\%-64\%=36\%` });
  // 36–45 ochiq
  add_({ t: T(r`$(x^2-x)^2-8(x^2-x)+12=0$ tenglama berilgan.`, r`Дано уравнение $(x^2-x)^2-8(x^2-x)+12=0$.`, r`Consider the equation $(x^2-x)^2-8(x^2-x)+12=0$.`),
    qa: T(r`Tenglama nechta haqiqiy ildizga ega?`, r`Сколько действительных корней имеет уравнение?`, r`How many real roots does the equation have?`), qb: T(r`Tenglama ildizlarining ko'paytmasini toping.`, r`Найдите произведение корней уравнения.`, r`Find the product of the roots.`), pa: { a: '4' }, pb: { a: '12' },
    x: r`t=x^2-x:\ t^2-8t+12=0,\ t=2,6;\ x=2,-1,3,-2\ (4\ \text{ta});\ 2\cdot(-1)\cdot3\cdot(-2)=12` });
  add_({ t: T(r`$\cos2x+3\sin x=2$ tenglama berilgan.`, r`Дано уравнение $\cos2x+3\sin x=2$.`, r`Consider the equation $\cos2x+3\sin x=2$.`),
    qa: T(r`$[0;2\pi]$ oraliqda tenglama nechta ildizga ega?`, r`Сколько корней имеет уравнение на промежутке $[0;2\pi]$?`, r`How many roots does the equation have on $[0;2\pi]$?`), qb: T(r`Shu oraliqdagi ildizlar yig'indisini $S$ desak, $\dfrac S\pi$ ni toping.`, r`Если $S$ — сумма корней на этом промежутке, найдите $\dfrac S\pi$.`, r`If $S$ is the sum of the roots on this interval, find $\dfrac S\pi$.`), pa: { a: '3' }, pb: { a: ['3/2', '1.5'] },
    x: r`2s^2-3s+1=0,\ s=\sin x=1,\tfrac12;\ x=\tfrac\pi6,\tfrac\pi2,\tfrac{5\pi}6;\ S=\tfrac{3\pi}2,\ \tfrac S\pi=\tfrac32` });
  add_({ t: T(r`$y=x^2-6x+5$ parabola berilgan.`, r`Дана парабола $y=x^2-6x+5$.`, r`Consider the parabola $y=x^2-6x+5$.`),
    qa: T(r`Parabolaning $Ox$ o'qi bilan kesishish nuqtalari orasidagi masofani toping.`, r`Найдите расстояние между точками пересечения параболы с осью $Ox$.`, r`Find the distance between the points where the parabola meets the $Ox$ axis.`), qb: T(r`$y=2x-k$ to'g'ri chiziq parabola bilan faqat bitta umumiy nuqtaga ega bo'ladigan $k$ ni toping.`, r`Найдите $k$, при котором прямая $y=2x-k$ имеет с параболой ровно одну общую точку.`, r`Find $k$ such that the line $y=2x-k$ has exactly one common point with the parabola.`), pa: { a: '4' }, pb: { a: '11' },
    x: r`x^2-6x+5=0\Rightarrow x=1,5\Rightarrow d=4;\ x^2-8x+5+k=0,\ D=0\Rightarrow k=11` });
  add_({ t: T(r`$f(x)=x^3-6x^2+9x+2$ funksiya berilgan.`, r`Дана функция $f(x)=x^3-6x^2+9x+2$.`, r`Consider the function $f(x)=x^3-6x^2+9x+2$.`),
    qa: T(r`Funksiya kamayadigan oraliqning uzunligini toping.`, r`Найдите длину промежутка убывания функции.`, r`Find the length of the interval on which the function decreases.`), qb: T(r`Funksiyaning lokal maksimum va lokal minimum qiymatlari ayirmasini toping.`, r`Найдите разность между локальным максимумом и локальным минимумом функции.`, r`Find the difference between the local maximum and local minimum values.`), pa: { a: '2' }, pb: { a: '4' },
    x: r`f'=3(x-1)(x-3);\ \text{kamayadi }(1;3),\ \ell=2;\ f(1)-f(3)=6-2=4` });
  add_({ t: T(r`Aniq integral va yuzga doir topshiriqlar.`, r`Задания на определённый интеграл и площадь.`, r`Tasks on definite integrals and area.`),
    qa: T(r`$\displaystyle\int_0^2(x^3-2x+1)\,dx$ ni hisoblang.`, r`Вычислите $\displaystyle\int_0^2(x^3-2x+1)\,dx$.`, r`Evaluate $\displaystyle\int_0^2(x^3-2x+1)\,dx$.`), qb: T(r`$y=4-x^2$ va $y=x+2$ chiziqlar bilan chegaralangan shaklning yuzini toping.`, r`Найдите площадь фигуры, ограниченной линиями $y=4-x^2$ и $y=x+2$.`, r`Find the area of the region bounded by $y=4-x^2$ and $y=x+2$.`), pa: { a: '2' }, pb: { a: ['9/2', '4.5'] },
    x: r`\int_0^2(x^3-2x+1)dx=4-4+2=2;\ \int_{-2}^{1}(2-x-x^2)dx=\tfrac92` });
  add_({ t: T(r`Radiusi $10$ bo'lgan aylanada $AB=16$ vatar o'tkazilgan. $C$ nuqta aylananing katta yoyida yotadi va $CA=CB$ (rasmga qarang).`, r`В окружности радиуса $10$ проведена хорда $AB=16$. Точка $C$ лежит на большей дуге, $CA=CB$ (см. рисунок).`, r`In a circle of radius $10$ a chord $AB=16$ is drawn. Point $C$ lies on the major arc and $CA=CB$ (see figure).`), fig: fig41,
    qa: T(r`Aylana markazidan $AB$ vatargacha bo'lgan masofani toping.`, r`Найдите расстояние от центра окружности до хорды $AB$.`, r`Find the distance from the center of the circle to the chord $AB$.`), qb: T(r`$ABC$ uchburchakning yuzini toping.`, r`Найдите площадь треугольника $ABC$.`, r`Find the area of triangle $ABC$.`), pa: { a: '6' }, pb: { a: '128' },
    x: r`d=\sqrt{10^2-8^2}=6;\ h_C=10+6=16;\ S=\tfrac12\cdot16\cdot16=128` });
  add_({ t: T(r`$ABCD$ trapetsiyada $AD\parallel BC$, $AD=12$, $BC=6$. Diagonallar $O$ nuqtada kesishadi va $S_{BOC}=9$ (rasmga qarang).`, r`В трапеции $ABCD$ $AD\parallel BC$, $AD=12$, $BC=6$. Диагонали пересекаются в точке $O$, $S_{BOC}=9$ (см. рисунок).`, r`In trapezoid $ABCD$, $AD\parallel BC$, $AD=12$, $BC=6$. The diagonals meet at $O$ and $S_{BOC}=9$ (see figure).`), fig: fig42,
    qa: T(r`$AOD$ uchburchakning yuzini toping.`, r`Найдите площадь треугольника $AOD$.`, r`Find the area of triangle $AOD$.`), qb: T(r`$ABCD$ trapetsiyaning yuzini toping.`, r`Найдите площадь трапеции $ABCD$.`, r`Find the area of trapezoid $ABCD$.`), pa: { a: '36' }, pb: { a: '81' },
    x: r`S_{AOD}=4S_{BOC}=36;\ S_{AOB}=S_{COD}=\sqrt{9\cdot36}=18;\ 9+36+18+18=81` });
  add_({ t: T(r`Koordinatalar tekisligida $A(-2;1)$, $B(4;1)$, $C(1;5)$ uchlari bo'lgan uchburchak berilgan (rasmga qarang).`, r`На координатной плоскости дан треугольник с вершинами $A(-2;1)$, $B(4;1)$, $C(1;5)$ (см. рисунок).`, r`A triangle has vertices $A(-2;1)$, $B(4;1)$, $C(1;5)$ (see figure).`), fig: fig43,
    qa: T(r`$ABC$ uchburchakning yuzini toping.`, r`Найдите площадь треугольника $ABC$.`, r`Find the area of triangle $ABC$.`), qb: T(r`$ABC$ uchburchakka tashqi chizilgan aylananing radiusini toping.`, r`Найдите радиус окружности, описанной около треугольника $ABC$.`, r`Find the radius of the circumscribed circle of triangle $ABC$.`), pa: { a: '12' }, pb: { a: ['25/8', '3.125'] },
    x: r`AB=6,\ h=4,\ S=12;\ AC=BC=5;\ R=\frac{5\cdot5\cdot6}{4\cdot12}=\frac{25}8` });
  add_({ t: T(r`Muntazam to'rtburchakli $SABCD$ piramidaning asosi tomoni $6$, yon qirrasi $\sqrt{34}$ ga teng (rasmga qarang).`, r`В правильной четырёхугольной пирамиде $SABCD$ сторона основания равна $6$, боковое ребро — $\sqrt{34}$ (см. рисунок).`, r`In the regular quadrilateral pyramid $SABCD$ the base side is $6$ and the lateral edge is $\sqrt{34}$ (see figure).`), fig: fig44,
    qa: T(r`Piramidaning hajmini toping.`, r`Найдите объём пирамиды.`, r`Find the volume of the pyramid.`), qb: T(r`Piramidaning to'la sirt yuzini toping.`, r`Найдите площадь полной поверхности пирамиды.`, r`Find the total surface area of the pyramid.`), pa: { a: '48' }, pb: { a: '96' },
    x: r`m=\sqrt{34-9}=5;\ h=\sqrt{25-9}=4;\ V=\tfrac13\cdot36\cdot4=48;\ S=36+4\cdot\tfrac12\cdot6\cdot5=96` });
  add_({ t: T(r`$f(x)=x^4-8x^2+3$ funksiya $[-1;3]$ kesmada qaralmoqda.`, r`Рассматривается функция $f(x)=x^4-8x^2+3$ на отрезке $[-1;3]$.`, r`Consider $f(x)=x^4-8x^2+3$ on the segment $[-1;3]$.`),
    qa: T(r`Funksiyaning eng katta qiymatini toping.`, r`Найдите наибольшее значение функции.`, r`Find the greatest value of the function.`), qb: T(r`Funksiyaning eng kichik qiymatini toping.`, r`Найдите наименьшее значение функции.`, r`Find the least value of the function.`), pa: { a: '12' }, pb: { a: '-13' },
    x: r`f'=4x(x^2-4);\ x=0,2;\ f(-1)=-4,\ f(0)=3,\ f(2)=-13,\ f(3)=12` });

  if (Q.length !== 45) console.warn('MSMock v1: 45 ta savol kerak, hozir', Q.length);
  window.MSMockBanks.push({ id: 'v1', name: T('1-variant (MS)', 'Вариант 1 (МС)', 'Variant 1 (NC)'), q: Q });
})();
