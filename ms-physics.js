/* ORVIN — Fizika bo'limi (matematikadagidek): chapda O'RGANISH, o'ngda MOCK TEST.
   Har mavzu: qoida → namuna yechim → mashq → MS savol → birlashtirish. 3 ta ketma-ket to'g'ri javob = o'zlashtirildi. */
(function () {
  'use strict';
  if (window.__msPhys || !window.PHYS_DATA) return; window.__msPhys = true;
  const D = window.PHYS_DATA, BL = D.blocks, BN = Object.keys(BL), K = 'data-keep-uz="true"', $ = id => document.getElementById(id);
  let rng = Math.random; const mulberry = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const R = (a, b) => a + Math.floor(rng() * (b - a + 1)), P = a => a[R(0, a.length - 1)];
  const sh = a => { for (let i = a.length - 1; i > 0; i--) { const j = R(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fm = x => String(+(+x).toFixed(3)).replace('.', ',').replace('-', '−'), esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  let PR = {}; try { PR = JSON.parse(localStorage.getItem('orvin_phys_progress') || '{}') || {}; } catch (_) { }
  PR._m = PR._m || {}; PR._x = PR._x || {};
  const save = () => { try { localStorage.setItem('orvin_phys_progress', JSON.stringify(PR)); } catch (_) { } };
  const ALLT = []; BN.forEach(b => BL[b].forEach(t => { t.b = b; ALLT.push(t); }));
  const done = t => (PR._m[t] || {}).streak >= 3, streak = t => Math.min(3, (PR._m[t] || {}).streak || 0);
  const rec = (t, ok) => { const m = PR._m[t] || (PR._m[t] = { ok: 0, no: 0, streak: 0 }); if (ok) { m.ok++; m.streak++; } else { m.no++; m.streak = 0; } save(); };

  /* ---- hisoblash generatorlari: [mavzu regex, oson(), qiyin()] → [savol, javob, birlik, yechim qadamlari] (g = 10 m/s²) ---- */
  const G = [
    [/To‘g‘ri chiziqli tekis/, () => { const v = R(2, 15), t = R(2, 12); return [`Jism ${v} m/s tezlik bilan ${t} s tekis harakatlandi. Yo‘l?`, v * t, 'm', [`s = v·t = ${v}·${t} = ${v * t} m`]]; }, () => { const a = R(2, 9), b = R(2, 9), c = R(2, 6), d = R(2, 6); return [`Jism ${a} m/s bilan ${c} s, so‘ng ${b} m/s bilan ${d} s harakatlandi. Jami yo‘l?`, a * c + b * d, 'm', [`s₁=${a}·${c}=${a * c} m`, `s₂=${b}·${d}=${b * d} m`, `s=s₁+s₂=${a * c + b * d} m`]]; }],
    [/Notekis/, () => { const s1 = R(2, 8) * 10, t1 = R(2, 5) * 5, s2 = R(2, 8) * 10, t2 = R(2, 5) * 5, a = (s1 + s2) / (t1 + t2); return [`${s1} m ${t1} s da, keyin ${s2} m ${t2} s da bosildi. O‘rtacha tezlik?`, a, 'm/s', [`v = (s₁+s₂)/(t₁+t₂) = ${s1 + s2}/${t1 + t2} = ${fm(a)} m/s`]]; }],
    [/Tezlanish|Tekis o‘zgaruvchan/, () => { const v0 = R(0, 5), a = R(1, 5), t = R(2, 8); return [`v₀=${v0} m/s, a=${a} m/s², t=${t} s. Oxirgi tezlik?`, v0 + a * t, 'm/s', [`v = v₀ + at = ${v0}+${a}·${t} = ${v0 + a * t} m/s`]]; }, () => { const v0 = R(1, 5), a = 2 * R(1, 3), t = R(2, 6), s = v0 * t + a * t * t / 2; return [`v₀=${v0} m/s, a=${a} m/s², t=${t} s. Bosib o‘tilgan yo‘l?`, s, 'm', [`s = v₀t + at²/2 = ${v0 * t} + ${a * t * t / 2} = ${s} m`]]; }],
    [/Erkin tushish|Vertikal harakat|Yuqoriga tik/, () => { const t = R(1, 6); return [`Jism tinch holatdan ${t} s erkin tushdi (g=10 m/s²). Oxirgi tezligi?`, 10 * t, 'm/s', [`v = gt = 10·${t} = ${10 * t} m/s`]]; }, () => { const t = R(2, 6); return [`Jism tinch holatdan ${t} s erkin tushdi (g=10 m/s²). Tushish balandligi?`, 5 * t * t, 'm', [`h = gt²/2 = 5·${t}² = ${5 * t * t} m`]]; }],
    [/Aylana bo‘ylab|Egri chiziqli/, () => { const v = R(2, 10), r = R(1, 5) * 2; return [`v=${v} m/s, aylana radiusi ${r} m. Markazga intilma tezlanish?`, v * v / r, 'm/s²', [`a = v²/R = ${v * v}/${r} = ${fm(v * v / r)} m/s²`]]; }],
    [/Nyutonning ikkinchi/, () => { const m = R(2, 12), a = R(1, 6); return [`Massasi ${m} kg jismga ${a} m/s² tezlanish berish uchun kuch?`, m * a, 'N', [`F = ma = ${m}·${a} = ${m * a} N`]]; }, () => { const m = R(2, 8), a = R(1, 4), f2 = R(1, 5), f1 = m * a + f2; return [`Jismga bir tomonga ${f1} N, qarama-qarshi tomonga ${f2} N kuch ta’sir qiladi. m=${m} kg. Tezlanish?`, a, 'm/s²', [`F = ${f1}−${f2} = ${f1 - f2} N`, `a = F/m = ${f1 - f2}/${m} = ${a} m/s²`]]; }],
    [/Guk|Elastiklik kuchi/, () => { const k = R(2, 10) * 50, x = R(1, 8) / 100; return [`Bikrligi ${k} N/m prujina ${fm(x)} m cho‘zildi. Elastiklik kuchi?`, k * x, 'N', [`F = kx = ${k}·${fm(x)} = ${fm(k * x)} N`]]; }, () => { const k = R(2, 10) * 50, x = R(1, 8) / 100; return [`Prujina ${fm(k * x)} N kuch ta’sirida ${fm(x)} m cho‘zildi. Bikrligi?`, k, 'N/m', [`k = F/x = ${fm(k * x)}/${fm(x)} = ${k} N/m`]]; }],
    [/Ishqalanish/, () => { const m = R(2, 20), u = P([0.1, 0.2, 0.3, 0.4, 0.5]); return [`Massasi ${m} kg jism gorizontal sirtda sirpanmoqda, μ=${fm(u)} (g=10). Ishqalanish kuchi?`, u * m * 10, 'N', [`N = mg = ${m * 10} N`, `F = μN = ${fm(u * m * 10)} N`]]; }],
    [/Impuls/, () => { const m = R(2, 10), v = R(2, 12); return [`Massasi ${m} kg jism ${v} m/s tezlikda. Impulsi?`, m * v, 'kg·m/s', [`p = mv = ${m}·${v} = ${m * v}`]]; }, () => { const m1 = R(2, 6), m2 = R(1, 4), v = R(2, 6), r = m1 * v / (m1 + m2); return [`${m1} kg jism ${v} m/s bilan tinch turgan ${m2} kg jismga urilib yopishib qoldi. Umumiy tezlik?`, r, 'm/s', [`m₁v = (m₁+m₂)u`, `u = ${m1 * v}/${m1 + m2} = ${fm(r)} m/s`]]; }],
    [/Mexanik ish/, () => { const f = R(2, 20), s = R(2, 15); return [`${f} N kuch jismni o‘z yo‘nalishida ${s} m siljitdi. Ish?`, f * s, 'J', [`A = Fs = ${f}·${s} = ${f * s} J`]]; }, () => { const f = R(2, 10), s = R(5, 20), t = R(2, 5), a = f * s; return [`${f} N kuch ${s} m yo‘lda ${t} s ishladi. Quvvati?`, a / t, 'W', [`A = ${a} J`, `P = A/t = ${a}/${t} = ${fm(a / t)} W`]]; }],
    [/Kinetik va potensial|energiyaning saqlanishi/, () => { const m = R(2, 10), v = R(2, 10); return [`Massasi ${m} kg jism ${v} m/s tezlikda. Kinetik energiyasi?`, m * v * v / 2, 'J', [`E = mv²/2 = ${m}·${v * v}/2 = ${fm(m * v * v / 2)} J`]]; }, () => { const h = R(2, 20), m = R(1, 5); return [`${m} kg jism ${h} m balandlikdan tushdi (g=10). Yerga urilish tezligi (v² = 2gh)? v² ni toping.`, 20 * h, 'm²/s²', [`mgh = mv²/2 ⇒ v² = 2gh = 20·${h} = ${20 * h}`]]; }],
    [/Suyuqlik va gaz bosimi|Gidrostatik|Paskal/, () => { const r = P([800, 1000, 1000, 13600]), h = R(1, 5); return [`Zichligi ${r} kg/m³ suyuqlikda ${h} m chuqurlikdagi bosim (g=10)?`, r * 10 * h, 'Pa', [`p = ρgh = ${r}·10·${h} = ${r * 10 * h} Pa`]]; }],
    [/Arximed/, () => { const v = R(1, 9) / 10, r = P([800, 1000]); return [`Hajmi ${fm(v)} m³ jism ρ=${r} kg/m³ suyuqlikka to‘liq botirildi (g=10). Arximed kuchi?`, r * 10 * v, 'N', [`F = ρgV = ${r}·10·${fm(v)} = ${fm(r * 10 * v)} N`]]; }],
    [/Elektr toki\. Tok|qarshiligi/, () => { const i = R(1, 8), r = R(2, 20); return [`Qarshiligi ${r} Ω o‘tkazgichdan ${i} A tok o‘tmoqda. Kuchlanish?`, i * r, 'V', [`U = IR = ${i}·${r} = ${i * r} V`]]; }, () => { const i = R(1, 8), r = R(2, 15); return [`${i * r} V kuchlanishda ${i} A tok o‘tdi. Qarshilik?`, r, 'Ω', [`R = U/I = ${i * r}/${i} = ${r} Ω`]]; }],
    [/Ketma-ket va parallel/, () => { const a = R(2, 20), b = R(2, 20); return [`${a} Ω va ${b} Ω rezistorlar ketma-ket ulangan. Umumiy qarshilik?`, a + b, 'Ω', [`R = R₁+R₂ = ${a + b} Ω`]]; }, () => { const [a, b] = P([[6, 3], [4, 4], [12, 4], [6, 12], [10, 15]]); return [`${a} Ω va ${b} Ω rezistorlar parallel ulangan. Umumiy qarshilik?`, a * b / (a + b), 'Ω', [`R = R₁R₂/(R₁+R₂) = ${a * b}/${a + b} = ${fm(a * b / (a + b))} Ω`]]; }],
    [/Tokning ishi/, () => { const u = R(2, 24) * 10, i = R(1, 5); return [`${u} V kuchlanishda ${i} A tok. Quvvat?`, u * i, 'W', [`P = UI = ${u * i} W`]]; }, () => { const i = R(1, 5), r = R(2, 20), t = R(2, 10); return [`I=${i} A, R=${r} Ω, t=${t} s. Ajralgan issiqlik?`, i * i * r * t, 'J', [`Q = I²Rt = ${i * i}·${r}·${t} = ${i * i * r * t} J`]]; }],
    [/Issiqlik miqdori/, () => { const m = R(1, 5), d = R(5, 50); return [`${m} kg suvni ${d} °C ga isitish uchun issiqlik (c=4200 J/(kg·°C))?`, 4200 * m * d, 'J', [`Q = cmΔT = 4200·${m}·${d} = ${4200 * m * d} J`]]; }, () => { const m = R(1, 5), d = R(5, 40); return [`${m} kg suvga ${4200 * m * d} J issiqlik berildi (c=4200). Harorat o‘zgarishi?`, d, '°C', [`ΔT = Q/(cm) = ${4200 * m * d}/${4200 * m} = ${d} °C`]]; }],
    [/Kondensator/, () => { const c = R(1, 10), u = R(2, 10) * 10; return [`C=${c} μF kondensator ${u} V gacha zaryadlandi. Energiyasi?`, c * u * u / 2000, 'mJ', [`W = CU²/2 = ${c}·10⁻⁶·${u * u}/2 = ${fm(c * u * u / 2000)} mJ`]]; }],
    [/Elektr yurituvchi/, () => { const e = R(2, 12) * 2, r = R(1, 3), R_ = R(2, 6) * 2; return [`EYUK ${e} V, ichki qarshilik ${r} Ω, tashqi qarshilik ${R_} Ω. Tok kuchi?`, e / (R_ + r), 'A', [`I = E/(R+r) = ${e}/${R_ + r} = ${fm(e / (R_ + r))} A`]]; }],
    [/Transformator/, () => { const n1 = R(1, 5) * 100, k = R(2, 5), u1 = R(2, 11) * 10; return [`Birlamchi o‘ramlar ${n1}, ikkilamchi ${n1 * k}. U₁=${u1} V. U₂?`, u1 * k, 'V', [`U₂ = U₁·n₂/n₁ = ${u1}·${k} = ${u1 * k} V`]]; }],
    [/Linza/, () => { const [f, a, b] = P([[10, 15, 30], [12, 20, 30], [6, 9, 18], [20, 30, 60]]); return [`Linza fokus masofasi ${f} sm, jism ${a} sm da. Tasvir masofasi?`, b, 'sm', [`1/b = 1/f − 1/a = 1/${f} − 1/${a}`, `b = ${b} sm`]]; }],
    [/Mexanik to‘lqinlar|To‘lqin|tovush/i, () => { const l = R(1, 8), f = R(2, 50); return [`To‘lqin uzunligi ${l} m, chastotasi ${f} Hz. Tezligi?`, l * f, 'm/s', [`v = λf = ${l}·${f} = ${l * f} m/s`]]; }],
    [/tebranishlar|mayatnik/, () => { const n = R(2, 10) * 10, t = R(2, 10); return [`Jism ${t} s da ${n} marta tebrandi. Chastotasi?`, n / t, 'Hz', [`f = n/t = ${n}/${t} = ${fm(n / t)} Hz`]]; }],
    [/Izotermik|Ideal gaz/, () => { const v1 = R(2, 8), t1 = R(1, 3) * 100, k = R(2, 3); return [`Izobarik jarayon: V₁=${v1} l, T₁=${t1} K, T₂=${t1 * k} K. V₂?`, v1 * k, 'l', [`V₁/T₁ = V₂/T₂ ⇒ V₂ = ${v1}·${k} = ${v1 * k} l`]]; }],
    [/Yarim yemirilish/, () => { const n = R(1, 4), N0 = R(1, 8) * 16; return [`Yarim yemirilish davri 10 kun, boshlang‘ich yadrolar ${N0}. ${n * 10} kundan keyin qoladi?`, N0 / 2 ** n, 'ta', [`N = N₀/2^(t/T) = ${N0}/2^${n} = ${fm(N0 / 2 ** n)}`]]; }],
    [/Kulon|Butun olam tortishish/, () => { const f = R(2, 9) * 4, k = R(2, 3); return [`Zaryadlar (yoki jismlar) orasidagi masofa ${k} marta oshirilsa, ${f} N kuch necha N bo‘ladi?`, f / (k * k), 'N', [`F ∼ 1/r² ⇒ F₂ = ${f}/${k * k} = ${fm(f / (k * k))} N`]]; }],
    [/Kuch momenti/, () => { const f1 = R(2, 10), l1 = R(2, 6), l2 = R(1, 4); return [`Richagning ${l1} m yelkasiga ${f1 * l2} N kuch qo‘yilgan. Muvozanat uchun ${l2} m yelkaga qo‘yiladigan kuch?`, f1 * l1, 'N', [`F₁l₁ = F₂l₂ ⇒ F₂ = ${f1 * l2}·${l1}/${l2} = ${f1 * l1} N`]]; }]
  ];
  const genOf = t => G.find(g => g[0].test(t.t));
  const num = (g, t) => { const [q, a, u, x] = g, uu = u ? ' ' + u : '', ca = fm(a) + uu, set = [ca]; [a * 2, a / 2, a + R(1, 3), Math.abs(a - R(1, 3)), a * 10, a / 10, a + 5, a + 7, a + 11].forEach(v => { const f = fm(v) + uu; if (v > 0 && !set.includes(f) && set.length < 4) set.push(f); }); for (let k = 1; set.length < 4; k++) { const f = fm(a + k) + uu; if (!set.includes(f)) set.push(f); } const o = sh(set); return { tp: t.t, s: q, o, c: o.indexOf(ca), x }; };
  const bank = t => { const [q, op, c] = P(t.qs), ix = sh(op.map((_, i) => i)); return { tp: t.t, s: q, o: ix.map(i => op[i]), c: ix.indexOf(c), x: [t.r] }; };
  const first = s => String(s).split(/(?<=\.)\s/)[0].slice(0, 150);
  const ruleQ = t => { let pool = ALLT.filter(z => z.t !== t.t && z.b === t.b); if (pool.length < 3) pool = ALLT.filter(z => z.t !== t.t); const a = first(t.r), w = [...new Set(sh(pool.slice()).map(z => first(z.r)))].filter(z => z !== a).slice(0, 3), o = sh([a, ...w]); return { tp: t.t, s: `«${t.t}» mavzusiga tegishli qoidani tanlang:`, o, c: o.indexOf(a), x: [t.r] }; };
  const easy = t => { const g = genOf(t); return g ? num(g[1](), t) : bank(t); };
  const hard = t => { const g = genOf(t); return g ? num((g[2] || g[1])(), t) : ruleQ(t); };

  const S = { tab: 'learn', openB: {}, openT: null, ex: null, pr: null, ms: null, mx: {}, state: 'idle', qs: [], ans: [], cur: 0, end: 0, tm: null, res: null };
  const css = document.createElement('style');
  css.textContent = `#msPhys{position:fixed;inset:0;z-index:10005;display:none;flex-direction:column;color:#eafaff;font-family:system-ui,sans-serif;background:linear-gradient(rgba(1,5,14,.9),rgba(1,5,14,.97)),#030814;contain:layout paint}#msPhys.show{display:flex}
#msPhys .mt{display:flex;align-items:center;gap:10px;padding:10px 14px;padding-top:calc(10px + env(safe-area-inset-top,0px));background:rgba(4,12,28,.85);border-bottom:1px solid rgba(130,200,255,.3)}#msPhys .mt b{font-size:15px;letter-spacing:2px}#msPhys .mt .olang{margin-left:auto}
#msPhys button{font:inherit;color:#dff;border:1px solid #7cf;border-radius:10px;background:rgba(0,60,90,.6);padding:8px 12px;font-weight:700;cursor:pointer}#msPhys button.pri{background:#0ff;color:#012;border-color:#0ff}
#msPhys .tabs{display:none;gap:8px;padding:8px 12px}#msPhys .tabs button{flex:1}#msPhys .tabs button.on{background:#0ff;color:#012}
#msPhys .cols{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px}
#msPhys section{overflow:auto;min-height:0;padding:12px;border:1px solid rgba(130,200,255,.35);border-radius:14px;background:rgba(4,14,32,.66)}
#msPhys h3{font-size:13px;letter-spacing:2px;margin-bottom:10px;color:#7df9ff}
#msPhys .blk{margin-bottom:8px;border:1px solid rgba(130,200,255,.3);border-radius:10px;overflow:hidden}
#msPhys .bh{width:100%;text-align:left;border:0;border-radius:0;display:flex;justify-content:space-between;gap:8px;background:rgba(0,40,70,.55)}
#msPhys .tp{width:100%;text-align:left;border:0;border-radius:0;background:transparent;border-top:1px solid rgba(130,200,255,.15);display:flex;justify-content:space-between;gap:8px;font-weight:500}
#msPhys .ls{padding:10px;background:rgba(0,20,40,.6);border-top:1px solid rgba(130,200,255,.15);font-size:14px;line-height:1.5}
#msPhys .op{display:block;width:100%;text-align:left;margin:6px 0;font-weight:500}#msPhys .op.ok{background:#0a7a4a;border-color:#4fa}#msPhys .op.no{background:#7a1a2a;border-color:#f78}#msPhys .op.sel{background:#0ff;color:#012}
#msPhys .qn{display:grid;grid-template-columns:repeat(8,1fr);gap:4px;margin:8px 0}#msPhys .qn button{padding:5px 0;font-size:12px}#msPhys .qn button.dn{background:#06507a}#msPhys .qn button.cu{background:#0ff;color:#012}
#msPhys .qs{font-size:16px;line-height:1.5;margin:10px 0}#msPhys .row{display:flex;gap:8px;justify-content:space-between;align-items:center;margin-top:10px}#msPhys .big{font-size:34px;font-weight:800;color:#0ff}
#msPhys .ov{margin-bottom:10px;padding:10px;border:1px solid rgba(125,249,255,.3);border-radius:12px;background:rgba(0,40,60,.5)}#msPhys .pb{height:8px;border-radius:6px;background:rgba(255,255,255,.12);margin:6px 0 8px;overflow:hidden}#msPhys .pb i{display:block;height:100%;background:linear-gradient(90deg,#0ff,#4fa)}#msPhys .ov .pri{width:100%;text-align:left}
#msPhys .stp{margin:14px 0 6px;padding:5px 9px;border-left:3px solid #0ff;background:rgba(0,255,255,.08);font-weight:800;font-size:13px;color:#7df9ff}
#msPhys .idea{padding:8px 10px;border-radius:10px;background:rgba(255,220,120,.1);border:1px solid rgba(255,220,120,.3)}
#msPhys .sol{margin:8px 0;padding:8px 10px;border-radius:10px;background:rgba(0,0,0,.28);border:1px dashed rgba(125,249,255,.35);white-space:pre-wrap;font:600 14px/1.6 ui-monospace,Menlo,monospace;color:#bff}
#msPhys .vd{margin:8px 0;padding:6px 10px;border-radius:8px;font-weight:700}#msPhys .vd.g{background:rgba(10,122,74,.35)}#msPhys .vd.b{background:rgba(122,26,42,.45)}
#msPhys .mx{margin-top:6px;padding:10px;border:1px solid rgba(255,220,120,.4);border-radius:12px;background:rgba(60,45,0,.25)}#msPhys .mx .bk,#msPhys .mx .it{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}#msPhys .mx .it button.sel{background:#ffd166;color:#012}#msPhys .mx .bk button{background:rgba(0,90,120,.7)}#msPhys .mx .pl{font-size:13px;opacity:.9}
#msPhys .hov{outline:2px solid #fff!important;box-shadow:0 0 16px #0ff}#msPhys .sim canvas{width:100%;max-width:360px;background:rgba(0,10,25,.7);border:1px solid rgba(130,200,255,.4);border-radius:12px;display:block}#msPhys .sim label{display:block;margin:8px 0;font-size:13px}#msPhys .sim input[type=range]{width:100%}#msPhys .lab label{display:block;margin:8px 0;font-size:13px}#msPhys .lab input[type=range]{width:100%}
#msPhys details.rv{margin:6px 0;padding:6px 9px;border:1px solid rgba(255,120,140,.35);border-radius:10px}
@media(max-width:759px){#msPhys .tabs{display:flex}#msPhys .cols{grid-template-columns:1fr}#msPhys[data-tab=learn] #pmMock,#msPhys[data-tab=mock] #pmLearn{display:none}}`;
  document.head.appendChild(css);
  const root = document.createElement('div'); root.id = 'msPhys';
  root.innerHTML = `<div class="mt"><b ${K}>⚛️ Fizika</b><button id="pmX" ${K}>✕ YOPISH</button></div><div class="tabs"><button id="pmTL" ${K}>📚 O‘RGANISH</button><button id="pmTM" ${K}>📝 MOCK TEST</button></div><div class="cols"><section id="pmLearn"></section><section id="pmMock"></section></div>`;
  document.body.appendChild(root);
  const opts = (q, p, a) => q.o.map((o, i) => `<button class="op ${p == null ? '' : i === q.c ? 'ok' : i === p ? 'no' : ''}" data-${a}="${i}" ${K}>${'ABCD'[i]}) ${esc(o)}</button>`).join('');
  const sol = q => q.x && q.x.length ? `<div class="sol" ${K}><b>Yechim:</b>\n${esc(q.x.join('\n'))}</div>` : '';
  const verdict = (q, p) => `<div class="vd ${p === q.c ? 'g' : 'b'}" ${K}>${p === q.c ? '✓ To‘g‘ri!' : '✗ Noto‘g‘ri. Javob: ' + esc(q.o[q.c])}</div>`;
  const SYN = {};
  const matchOf = t => D.match.find(m => new RegExp(m[0]).test(t.t)) || syn(t);
  function syn(t) {
    if (SYN[t.t]) return SYN[t.t];
    const cut = x => x.length > 95 ? x.slice(0, 92) + '…' : x, own = String(t.r).split(/(?<=[.;])\s+/).map(x => cut(x.trim())).filter(x => x.length > 12);
    if (t.e) own.push(cut(t.e)); const mine = [...new Set(own)].slice(0, 3);
    let pool = ALLT.filter(z => z.t !== t.t && z.b === t.b); if (pool.length < 2) pool = ALLT.filter(z => z.t !== t.t);
    const other = [...new Set(sh(pool.slice()).map(z => cut(String(z.r).split(/(?<=[.;])\s+/)[0].trim())))].filter(x => !mine.includes(x)).slice(0, 2);
    return SYN[t.t] = ['', '🧩 Qaysi gap shu mavzuga tegishli? (' + t.t + ')', ['Shu mavzuga tegishli', 'Boshqa mavzuga tegishli'], mine.map(x => [x, 0]).concat(other.map(x => [x, 1]))];
  }
  /* ---- AMALIY TAJRIBALAR: virtual laboratoriya (slayderlar) ---- */
  const LABS = [
    [/Elektr toki\. Tok|qarshiligi/, 'Om qonuni: U = I·R', [['I', 'Tok kuchi I (A)', 0, 10, .5, 2], ['R', 'Qarshilik R (Ω)', 1, 50, 1, 10]], v => [['Kuchlanish U', v.I * v.R, 'V']]],
    [/Nyutonning ikkinchi/, 'F = m·a', [['m', 'Massa m (kg)', 1, 20, 1, 5], ['a', 'Tezlanish a (m/s²)', 0, 10, .5, 2]], v => [['Kuch F', v.m * v.a, 'N']]],
    [/To‘g‘ri chiziqli tekis/, 's = v·t', [['v', 'Tezlik v (m/s)', 0, 30, 1, 5], ['t', 'Vaqt t (s)', 0, 20, 1, 4]], v => [['Yo‘l s', v.v * v.t, 'm']]],
    [/Tezlanish|Tekis o‘zgaruvchan/, 'v = v₀ + a·t', [['v0', 'Boshlang‘ich tezlik v₀ (m/s)', 0, 20, 1, 2], ['a', 'Tezlanish a (m/s²)', 0, 10, .5, 2], ['t', 'Vaqt t (s)', 0, 20, 1, 5]], v => [['Tezlik v', v.v0 + v.a * v.t, 'm/s'], ['Yo‘l s', v.v0 * v.t + v.a * v.t * v.t / 2, 'm']]],
    [/Erkin tushish|Vertikal harakat va erkin/, 'h = g·t²/2 (g=10)', [['t', 'Vaqt t (s)', 0, 10, .5, 2]], v => [['Balandlik h', 5 * v.t * v.t, 'm'], ['Tezlik v', 10 * v.t, 'm/s']]],
    [/Kinetik va potensial/, 'Eₖ = m·v²/2', [['m', 'Massa m (kg)', 1, 20, 1, 4], ['v', 'Tezlik v (m/s)', 0, 30, 1, 5]], v => [['Kinetik energiya', v.m * v.v * v.v / 2, 'J']]],
    [/Mexanik ish/, 'A = F·s va P = A/t', [['F', 'Kuch F (N)', 0, 100, 1, 10], ['s', 'Yo‘l s (m)', 0, 50, 1, 5], ['t', 'Vaqt t (s)', 1, 20, 1, 5]], v => [['Ish A', v.F * v.s, 'J'], ['Quvvat P', v.F * v.s / v.t, 'W']]],
    [/Suyuqlik va gaz bosimi|Gidrostatik/, 'p = ρ·g·h (g=10)', [['r', 'Zichlik ρ (kg/m³)', 500, 13600, 100, 1000], ['h', 'Chuqurlik h (m)', 0, 20, .5, 2]], v => [['Bosim p', v.r * 10 * v.h, 'Pa']]],
    [/Arximed/, 'F = ρ·g·V (g=10)', [['r', 'Suyuqlik zichligi ρ (kg/m³)', 500, 13600, 100, 1000], ['V', 'Hajm V (litr)', 1, 100, 1, 10]], v => [['Arximed kuchi', v.r * 10 * v.V / 1000, 'N']]],
    [/Guk|Elastiklik kuchi/, 'F = k·x', [['k', 'Bikrlik k (N/m)', 10, 1000, 10, 200], ['x', 'Cho‘zilish x (sm)', 0, 20, 1, 5]], v => [['Kuch F', v.k * v.x / 100, 'N']]],
    [/Issiqlik miqdori/, 'Q = c·m·ΔT (suv, c=4200)', [['m', 'Massa m (kg)', 1, 10, 1, 2], ['d', 'Haroratning o‘zgarishi ΔT (°C)', 0, 80, 1, 20]], v => [['Issiqlik Q', 4200 * v.m * v.d, 'J']]],
    [/Ketma-ket va parallel/, 'Rezistorlarni ulash', [['a', 'R₁ (Ω)', 1, 50, 1, 6], ['b', 'R₂ (Ω)', 1, 50, 1, 3]], v => [['Ketma-ket R', v.a + v.b, 'Ω'], ['Parallel R', v.a * v.b / (v.a + v.b), 'Ω']]],
    [/Tokning ishi/, 'P = U·I', [['U', 'Kuchlanish U (V)', 0, 240, 5, 12], ['I', 'Tok kuchi I (A)', 0, 20, .5, 2]], v => [['Quvvat P', v.U * v.I, 'W']]],
    [/Mexanik to‘lqinlar|tovush/i, 'v = λ·f', [['l', 'To‘lqin uzunligi λ (m)', 1, 20, 1, 4], ['f', 'Chastota f (Hz)', 1, 100, 1, 10]], v => [['Tezlik v', v.l * v.f, 'm/s']]],
    [/Transformator/, 'U₂ = U₁·n₂/n₁', [['u', 'U₁ (V)', 10, 240, 10, 100], ['n1', 'n₁ (o‘ram)', 50, 1000, 50, 200], ['n2', 'n₂ (o‘ram)', 50, 1000, 50, 400]], v => [['U₂', v.u * v.n2 / v.n1, 'V']]]
  ];
  /* ---- INTERAKTIV TAJRIBALAR (animatsiya + slayderlar) ---- */
  const ln = (c, a, b, x, y, col, w) => { c.strokeStyle = col || '#7df9ff'; c.lineWidth = w || 2; c.beginPath(); c.moveTo(a, b); c.lineTo(x, y); c.stroke(); };
  const ci = (c, x, y, r, col) => { c.fillStyle = col; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill(); };
  const tx = (c, s, x, y, col) => { c.fillStyle = col || '#dff'; c.font = '12px system-ui'; c.fillText(s, x, y); };
  const D2R = Math.PI / 180, PI2 = 2 * Math.PI;
  const SIMS = [
    [/mayatnik/, '🕰 Matematik mayatnik: davr uzunlikka bog‘liq', [['l', 'Uzunlik l (m)', .3, 2, .1, 1], ['A', 'Og‘ish burchagi (°)', 5, 40, 5, 20]], (c, t, v) => { const T = PI2 * Math.sqrt(v.l / 9.8), th = v.A * D2R * Math.cos(PI2 * t / T), L = v.l * 75, x = 160 + L * Math.sin(th), y = 14 + L * Math.cos(th); ln(c, 130, 14, 190, 14, '#789'); ln(c, 160, 14, x, y); ci(c, x, y, 10, '#ffd166'); return `T = 2π√(l/g) = ${fm(T)} s · f = ${fm(1 / T)} Hz (massaga bog‘liq emas)`; }],
    [/Prujinali|Mexanik tebranishlar/, '🌀 Prujinali tebranish', [['m', 'Massa m (kg)', .1, 2, .1, .5], ['k', 'Bikrlik k (N/m)', 5, 100, 5, 20]], (c, t, v) => { const T = PI2 * Math.sqrt(v.m / v.k), y = 110 + 35 * Math.cos(PI2 * t / T); c.strokeStyle = '#7df9ff'; c.lineWidth = 2; c.beginPath(); c.moveTo(160, 8); for (let i = 1; i <= 12; i++) c.lineTo(160 + (i % 2 ? 14 : -14), 8 + (y - 26) * i / 12); c.lineTo(160, y - 18); c.stroke(); c.fillStyle = '#ffd166'; c.fillRect(135, y - 18, 50, 36); return `T = 2π√(m/k) = ${fm(T)} s · f = ${fm(1 / T)} Hz`; }],
    [/Linza/, '🔍 Linza: tasvir qayerda hosil bo‘ladi?', [['f', 'Fokus masofasi F (sm)', 5, 20, 1, 10], ['a', 'Jismgacha masofa a (sm)', 6, 40, 1, 25]], (c, t, v) => { const f = v.f, a = v.a, S = 3, ox = 160 - a * S, h = 34; ln(c, 0, 95, 320, 95, '#456', 1); ln(c, 160, 20, 160, 170, '#7df9ff'); tx(c, 'F', 160 - f * S - 3, 110); tx(c, 'F', 160 + f * S - 3, 110); ln(c, ox, 95, ox, 95 - h, '#ffd166', 3); if (Math.abs(a - f) < .4) return 'a = F: tasvir cheksizlikda (nurlar parallel chiqadi)'; const b = f * a / (a - f), X = Math.max(4, Math.min(316, 160 + b * S)), ih = -h * b / a; ln(c, X, 95, X, 95 - ih, '#5ce6b2', 3); ln(c, ox, 95 - h, 160, 95 - h, '#f88', 1); ln(c, 160, 95 - h, X, 95 - ih, '#f88', 1); ln(c, ox, 95 - h, X, 95 - ih, '#f88', 1); return `b = ${fm(Math.abs(b))} sm · ${b > 0 ? 'haqiqiy, teskari' : 'mavhum, to‘g‘ri'} · ${Math.abs(b / a) > 1 ? 'kattalashgan' : 'kichraygan'}`; }],
    [/Ketma-ket va parallel/, '💡 Zanjir yig‘ish: ikkita lampa (12 V)', [['m', 'Ulanish: 0 — ketma-ket, 1 — parallel', 0, 1, 1, 0], ['R', 'Lampa qarshiligi R (Ω)', 2, 20, 1, 6]], (c, t, v) => { const R = v.R, U = 12, par = v.m === 1, I = par ? 2 * U / R : U / (2 * R), P = par ? U * U / R : U * U / (4 * R), g = Math.min(1, P / (U * U / R)), bulb = (x, y) => { ci(c, x, y, 16, `rgba(255,230,90,${.12 + .88 * g})`); c.strokeStyle = '#ffe066'; c.lineWidth = 2; c.beginPath(); c.arc(x, y, 16, 0, 7); c.stroke(); }; c.fillStyle = '#ffb84d'; c.fillRect(24, 78, 22, 40); tx(c, '12 V', 18, 135);
      if (!par) { ln(c, 35, 78, 35, 35); ln(c, 35, 35, 285, 35); ln(c, 285, 35, 285, 160); ln(c, 285, 160, 35, 160); ln(c, 35, 160, 35, 118); bulb(120, 35); bulb(200, 35); } else { ln(c, 35, 78, 35, 40); ln(c, 35, 118, 35, 150); ln(c, 35, 40, 285, 40); ln(c, 35, 150, 285, 150); ln(c, 285, 40, 285, 150); ln(c, 35, 40, 35, 150); bulb(160, 40); bulb(160, 150); } return `${par ? 'Parallel' : 'Ketma-ket'}: I = ${fm(I)} A · har bir lampa ${fm(P)} W`; }],
    [/Burchak ostida/, '🏹 Otilgan jism trayektoriyasi', [['v', 'Boshlang‘ich tezlik (m/s)', 5, 30, 1, 20], ['g', 'Otish burchagi (°)', 10, 80, 5, 45]], (c, t, v) => { const a = v.g * D2R, Tf = 2 * v.v * Math.sin(a) / 10, pos = Math.min(t % (Tf + 1), Tf), X = s => 20 + v.v * Math.cos(a) * s * 3, Y = s => 170 - (v.v * Math.sin(a) * s - 5 * s * s) * 3; ln(c, 0, 170, 320, 170, '#456', 1); for (let i = 0; i <= 30; i++) ci(c, X(Tf * i / 30), Y(Tf * i / 30), 1.5, '#7df9ff'); ci(c, X(pos), Y(pos), 7, '#ffd166'); return `Uzoqlik = ${fm(v.v * v.v * Math.sin(2 * a) / 10)} m · eng baland = ${fm(v.v * v.v * Math.sin(a) ** 2 / 20)} m · t = ${fm(Tf)} s`; }],
    [/Qiya tekislik/, '⛰ Qiya tekislik: jism sirpanadimi?', [['a', 'Qiyalik burchagi α (°)', 5, 60, 5, 30], ['u', 'Ishqalanish koeffitsiyenti μ', 0, 1, .05, .3]], (c, t, v) => { const a = v.a * D2R, T0 = [30, 170 - 220 * Math.sin(a)], B = [30 + 220 * Math.cos(a), 170], acc = 10 * (Math.sin(a) - v.u * Math.cos(a)); c.fillStyle = 'rgba(120,180,255,.25)'; c.beginPath(); c.moveTo(30, 170); c.lineTo(T0[0], T0[1]); c.lineTo(B[0], B[1]); c.closePath(); c.fill(); ln(c, T0[0], T0[1], B[0], B[1], '#7df9ff', 3); const s = acc > 0 ? Math.min(200, 12 * acc * (t % 3) ** 2 / 2) : 0; ci(c, T0[0] + Math.cos(a) * (s + 15) + Math.sin(a) * 10, T0[1] + Math.sin(a) * (s + 15) - Math.cos(a) * 10, 10, '#ffd166'); return acc > 0 ? `Sirpanadi: a = g(sinα − μcosα) = ${fm(acc)} m/s²` : `Jism tinch turadi (μ ≥ tgα = ${fm(Math.tan(a))})`; }],
    [/Arximed/, '🛟 Arximed kuchi: suzadimi yoki cho‘kadimi?', [['r', 'Jism zichligi (kg/m³)', 200, 2000, 100, 600]], (c, t, v) => { c.fillStyle = 'rgba(60,140,255,.35)'; c.fillRect(60, 70, 200, 100); ln(c, 60, 40, 60, 170); ln(c, 260, 40, 260, 170); ln(c, 60, 170, 260, 170); const fl = v.r < 1000, top = fl ? 70 + 44 * v.r / 1000 - 44 + 2 * Math.sin(t * 3) : Math.min(126, 40 + (t % 4) * 60); c.fillStyle = '#c98a4b'; c.fillRect(130, top, 60, 44); return fl ? `Suzadi: hajmning ${fm(v.r / 10)}% i suvga botgan (ρ jism < ρ suv)` : v.r === 1000 ? 'Suyuqlik ichida muallaq turadi' : 'Cho‘kadi (Arximed kuchi og‘irlikdan kichik)'; }],
    [/qaytishi va sinishi|To‘liq ichki/, '🌈 Nurning sinishi va ichki qaytish', [['i', 'Tushish burchagi (°)', 0, 85, 5, 40], ['n', 'Sindirish ko‘rsatkichi n', 1, 2.4, .1, 1.5], ['d', 'Yo‘nalish: 0 — havodan shishaga, 1 — shishadan havoga', 0, 1, 1, 0]], (c, t, v) => { c.fillStyle = 'rgba(80,160,255,.22)'; c.fillRect(0, 95, 320, 95); ln(c, 0, 95, 320, 95, '#789', 1); ln(c, 160, 20, 160, 170, '#567', 1); const i = v.i * D2R, n1 = v.d ? v.n : 1, n2 = v.d ? 1 : v.n, s = n1 / n2 * Math.sin(i), sg = v.d ? 1 : -1; ln(c, 160 - 90 * Math.sin(i), 95 + sg * 90 * Math.cos(i), 160, 95, '#ffd166'); if (s > 1) { ln(c, 160, 95, 160 + 90 * Math.sin(i), 95 + sg * 90 * Math.cos(i), '#f88'); return `To‘liq ichki qaytish! Kritik burchak = ${fm(Math.asin(1 / v.n) / D2R)}°`; } const r = Math.asin(s); ln(c, 160, 95, 160 + 90 * Math.sin(r), 95 - sg * 90 * Math.cos(r), '#5ce6b2'); return `Sinish burchagi = ${fm(r / D2R)}° (n₁sin i = n₂sin r)`; }],
    [/Mexanik to‘lqinlar|tovush/i, '🌊 To‘lqin: v = λ·f', [['l', 'To‘lqin uzunligi λ (m)', 1, 10, 1, 4], ['f', 'Chastota f (Hz)', .5, 5, .5, 1.5]], (c, t, v) => { ln(c, 0, 95, 320, 95, '#456', 1); c.strokeStyle = '#7df9ff'; c.lineWidth = 3; c.beginPath(); for (let x = 0; x <= 320; x += 4) { const y = 95 - 38 * Math.sin(PI2 * (x / (v.l * 30) - v.f * t)); x ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); return `v = λ·f = ${fm(v.l * v.f)} m/s · T = ${fm(1 / v.f)} s`; }],
    [/Kulon/, '⚡ Kulon kuchi', [['a', 'Zaryad q₁ (μC)', -5, 5, 1, 3], ['b', 'Zaryad q₂ (μC)', -5, 5, 1, -2], ['r', 'Masofa r (m)', 1, 10, 1, 4]], (c, t, v) => { const x1 = 40, x2 = 40 + v.r * 26, F = 9 * Math.abs(v.a * v.b) / (v.r * v.r), att = v.a * v.b < 0, L = Math.min(70, 10 + F * 6); ln(c, 0, 100, 320, 100, '#345', 1); ci(c, x1, 100, 14, v.a >= 0 ? '#f55' : '#58f'); ci(c, x2, 100, 14, v.b >= 0 ? '#f55' : '#58f'); tx(c, v.a >= 0 ? '+' : '−', x1 - 3, 105, '#fff'); tx(c, v.b >= 0 ? '+' : '−', x2 - 3, 105, '#fff'); if (v.a * v.b) { const d = att ? 1 : -1; ln(c, x1, 140, x1 + d * L, 140, '#ffd166', 3); ln(c, x2, 140, x2 - d * L, 140, '#ffd166', 3); } return v.a * v.b ? `F = k|q₁q₂|/r² = ${fm(F)} mN · ${att ? 'tortishadi' : 'itarishadi'}` : 'Zaryadlardan biri 0 — kuch yo‘q'; }],
    [/Erkin tushish/, '🍎 Erkin tushish', [['h', 'Balandlik h (m)', 5, 80, 5, 20]], (c, t, v) => { const tt = Math.sqrt(v.h / 5), tm = Math.min(t % (tt + 1), tt); ln(c, 0, 170, 320, 170, '#456', 1); ln(c, 250, 15, 250, 170, '#567', 1); tx(c, v.h + ' m', 255, 25); ci(c, 160, 15 + 150 * (5 * tm * tm) / v.h, 10, '#f55'); return `t = √(2h/g) = ${fm(tt)} s · tushish tezligi v = ${fm(10 * tt)} m/s`; }],
    [/Yarim yemirilish/, '☢️ Radioaktiv yemirilish', [['k', 'Vaqt (yarim yemirilish davrlari)', 0, 5, .25, 0]], (c, t, v, st) => { if (!st.th) st.th = Array.from({ length: 100 }, () => Math.random()); const p = .5 ** v.k; let n = 0; st.th.forEach((x, i) => { const al = x < p; n += al; ci(c, 50 + (i % 10) * 24, 20 + Math.floor(i / 10) * 15, 5, al ? '#5ce6b2' : '#344'); }); return `Qolgan yadrolar: ${n}/100 · N = N₀/2^${fm(v.k)} ≈ ${fm(100 * p)}`; }],
    [/induksiya va Faradey/, "🧲 Elektromagnit induksiya", [['s', 'Magnit tezligi', .5, 5, .5, 2], ['N', 'O‘ramlar soni N', 1, 10, 1, 3]], (c, t, v) => { const x = 160 + 70 * Math.sin(v.s * t), emf = v.N * v.s * Math.cos(v.s * t) * .4; for (let i = 0; i < Math.min(v.N, 8); i++) { c.strokeStyle = '#ffb84d'; c.lineWidth = 3; c.beginPath(); c.ellipse(150 + i * 3, 70, 10, 26, 0, 0, 7); c.stroke(); } c.fillStyle = '#e44'; c.fillRect(x - 25, 60, 25, 20); c.fillStyle = '#48f'; c.fillRect(x, 60, 25, 20); tx(c, 'N', x - 16, 75, '#fff'); tx(c, 'S', x + 9, 75, '#fff'); ln(c, 160, 170, 160 + 50 * Math.sin(Math.max(-1, Math.min(1, emf / 3))), 170 - 50 * Math.cos(Math.max(-1, Math.min(1, emf / 3))), '#ffd166', 3); tx(c, 'galvanometr', 120, 185); return `Induksiya EYUK ≈ ${fm(Math.abs(emf))} (nisbiy) · magnit qancha tez va o‘ram qancha ko‘p bo‘lsa, shuncha katta`; }],
    [/Kepler/, '🪐 Kepler: orbita ellips', [['e', 'Ekssentrisitet e', 0, .8, .1, .5]], (c, t, v) => { const a = 110, b = a * Math.sqrt(1 - v.e * v.e), sx = 205; c.strokeStyle = '#456'; c.lineWidth = 1; c.beginPath(); c.ellipse(sx + a * v.e, 95, a, b, 0, 0, 7); c.stroke(); const M = t * .9; let E = M; for (let i = 0; i < 6; i++) E = M + v.e * Math.sin(E); ci(c, sx, 95, 11, '#ffd166'); ci(c, sx + a * (Math.cos(E) - v.e), 95 + b * Math.sin(E), 6, '#5ce6b2'); return `Perigeliyda sayyora tezroq: v_max/v_min = ${fm((1 + v.e) / (1 - v.e))}`; }],
    [/Ideal gaz|Izotermik|Molekulyar-kinetik/, '🎈 Gaz: harorat, hajm va bosim', [['T', 'Harorat T (K)', 100, 600, 50, 300], ['V', 'Hajm V', 1, 5, .5, 3]], (c, t, v, st) => { const w = 40 + v.V * 45; if (!st.p) st.p = Array.from({ length: 30 }, () => ({ x: Math.random(), y: Math.random(), a: Math.random() * 7 })); const sp = .006 * Math.sqrt(v.T / 100); st.p.forEach(q => { q.x += Math.cos(q.a) * sp * 260 / w; q.y += Math.sin(q.a) * sp * 2; if (q.x < 0 || q.x > 1) { q.a = Math.PI - q.a; q.x = Math.max(0, Math.min(1, q.x)); } if (q.y < 0 || q.y > 1) { q.a = -q.a; q.y = Math.max(0, Math.min(1, q.y)); } ci(c, 20 + q.x * w, 35 + q.y * 120, 3, '#7df9ff'); }); ln(c, 20, 35, 20, 155); ln(c, 20, 35, 20 + w, 35); ln(c, 20, 155, 20 + w, 155); ln(c, 20 + w, 30, 20 + w, 160, '#ffd166', 5); return `p ∼ T/V = ${fm(v.T / v.V)} (T↑ yoki V↓ bo‘lsa bosim ortadi)`; }],
    [/Impuls/, '🛒 Impulsning saqlanishi (yopishib qoladigan aravachalar)', [['m', 'Massa m₁ (kg)', 1, 10, 1, 4], ['v', 'Tezlik v₁ (m/s)', 1, 10, 1, 5], ['n', 'Massa m₂ (kg)', 1, 10, 1, 2]], (c, t, v) => { const ph = t % 5, u = v.m * v.v / (v.m + v.n); ln(c, 0, 150, 320, 150, '#456', 1); let x1 = ph < 2 ? 20 + 130 * ph / 2 : 150 + (ph - 2) * u * 6, x2 = ph < 2 ? 190 : 190 + (ph - 2) * u * 6; x1 = Math.min(x1, 270 - 40); x2 = Math.min(x2, 270); c.fillStyle = '#e8903a'; c.fillRect(x1, 118, 40, 30); c.fillStyle = '#58f'; c.fillRect(x2, 118, 40, 30); tx(c, 'm₁', x1 + 12, 137); tx(c, 'm₂', x2 + 12, 137); return `p = m₁v₁ = ${v.m * v.v} kg·m/s → u = m₁v₁/(m₁+m₂) = ${fm(u)} m/s`; }]
  ];
  function initSims() {
    document.querySelectorAll('#msPhys .sim').forEach(box => {
      const S_ = SIMS[+box.dataset.si], c = box.querySelector('canvas').getContext('2d'), st = {}, t0 = performance.now(), out = box.querySelector('.si-o');
      const loop = () => { if (!document.body.contains(box)) return; requestAnimationFrame(loop); if (!root.classList.contains('show')) return; const v = {}; box.querySelectorAll('input').forEach(i => { v[i.dataset.sv] = +i.value; i.previousElementSibling.textContent = i.value; }); c.clearRect(0, 0, 320, 190); let info = ''; try { info = S_[3](c, (performance.now() - t0) / 1000, v, st); } catch (e) { } out.textContent = info; };
      loop();
    });
  }
  const simHtml = t => SIMS.map((s, i) => s[0].test(t.t) ? `<div class="stp" ${K}>🎮 Interaktiv tajriba: ${s[1]}</div><div class="sim" data-si="${i}" ${K}><canvas width="320" height="190"></canvas>${s[2].map(a => `<label>${a[1]}: <b>${a[5]}</b><input type="range" data-sv="${a[0]}" min="${a[2]}" max="${a[3]}" step="${a[4]}" value="${a[5]}"></label>`).join('')}<div class="vd g si-o"></div></div>` : '').join('');
  const labOf = t => -1; /* slayderli lab olib tashlandi: faqat qo'l bilan amaliy lab */
  function labHtml(t) {
    let h = '';
    if (/magnit xossalari|Magnit maydon va tokli/.test(t.t)) h += `<div class="stp" ${K}>🧪 6. Amaliy tajriba: magnit va buyumlar</div><div ${K} style="font-size:13px;opacity:.85">🧲 ni barmoq bilan sudrab buyumlarga yaqinlashtiring. Qaysi buyumlar magnitga yopishadi?</div><div class="mag" id="pmMag"></div><div class="pl" id="pmMagMsg" ${K}></div><button id="pmMagR" ${K}>🔄 Qaytadan</button>`;
    const li = labOf(t);
    if (li >= 0) { const L = LABS[li]; h += `<div class="stp" ${K}>🧪 ${/magnit/.test(t.t) ? '7' : '6'}. Amaliy tajriba: ${L[1]}</div><div class="lab" data-li="${li}" ${K}><div style="font-size:13px;opacity:.85">Slayderlarni suring — natija darhol o‘zgaradi.</div>${L[2].map(v => `<label>${v[1]}: <b class="lv">${v[5]}</b><input type="range" data-lv="${v[0]}" min="${v[2]}" max="${v[3]}" step="${v[4]}" value="${v[5]}"></label>`).join('')}<div class="lo">${labOut(li, L[2].reduce((o, v) => (o[v[0]] = v[5], o), {}))}</div></div>`; }
    return h;
  }
  const labOut = (li, v) => LABS[li][3](v).map(o => `<div class="vd g">${o[0]} = <b>${fm(o[1])} ${o[2]}</b></div>`).join('');
  function initMagnet() {
    window.__physMag = null; const box = $('pmMag');
    try { if (window.OrvinHandLab) { if (box) window.OrvinHandLab.setMode('magnet'); else if (window.OrvinHandLab.getMode()==='magnet') window.OrvinHandLab.setMode('off'); } } catch(_){}
    if (!box) return;
    const IT = [['🔩', 'Temir mix', 1], ['📎', 'Po‘lat skrepka', 1], ['🪙', 'Nikel tanga', 1], ['✂️', 'Po‘lat qaychi', 1], ['🪵', 'Yog‘och', 0], ['🧴', 'Plastik shisha', 0], ['🥛', 'Shisha stakan', 0], ['🔌', 'Mis sim', 0]], POS = [[18, 25], [75, 22], [48, 40], [86, 62], [14, 68], [34, 80], [62, 78], [50, 14]];
    box.style.cssText = 'position:relative;height:230px;border:1px solid rgba(130,200,255,.4);border-radius:12px;background:rgba(0,10,25,.6);touch-action:none;overflow:hidden;margin:8px 0';
    const W = box.clientWidth || 300, H = 230, els = IT.map((it, i) => { const e = document.createElement('div'); e.textContent = it[0]; e.title = it[1]; e.style.cssText = 'position:absolute;font-size:28px;transform:translate(-50%,-50%);transition:transform .15s'; const o = { e, it, x: POS[i][0] * W / 100, y: POS[i][1] * H / 100, st: 0, ox: 0, oy: 0 }; e.style.left = o.x + 'px'; e.style.top = o.y + 'px'; box.appendChild(e); return o; });
    const mg = document.createElement('div'); mg.textContent = '🧲'; mg.style.cssText = 'position:absolute;font-size:40px;transform:translate(-50%,-50%);cursor:grab;z-index:5;left:' + W / 2 + 'px;top:' + H * .62 + 'px'; box.appendChild(mg);
    const msg = $('pmMagMsg'); let mx = W / 2, my = H * .62, drag = false, told = {};
    const upd = () => { mg.style.left = mx + 'px'; mg.style.top = my + 'px'; let n = 0; els.forEach(o => { const d = Math.hypot(o.x - mx, o.y - my); if (o.it[2] && !o.st && d < 62) { o.st = 1; o.ox = (o.x - mx) * .35; o.oy = (o.y - my) * .35 + 14; } if (o.st) { o.e.style.left = mx + o.ox + 'px'; o.e.style.top = my + o.oy + 'px'; n++; } else if (!o.it[2] && d < 50 && !told[o.it[1]]) { told[o.it[1]] = 1; msg.textContent = '✗ ' + o.it[1] + ' magnitga yopishmaydi.'; } }); if (n) msg.textContent = '✓ Yopishganlar: ' + n + '/4' + (n === 4 ? ' — hammasi! Temir, po‘lat va nikel ferromagnetik.' : ''); };
    window.__physMag = { r: () => mg.getBoundingClientRect(), to: (cx, cy) => { const r = box.getBoundingClientRect(); mx = Math.max(0, Math.min(W, cx - r.left)); my = Math.max(0, Math.min(H, cy - r.top)); upd(); } };
    mg.addEventListener('pointerdown', e => { drag = true; mg.setPointerCapture(e.pointerId); e.preventDefault(); });
    mg.addEventListener('pointermove', e => { if (!drag) return; const r = box.getBoundingClientRect(); mx = Math.max(0, Math.min(W, e.clientX - r.left)); my = Math.max(0, Math.min(H, e.clientY - r.top)); upd(); });
    const end = () => { drag = false; }; mg.addEventListener('pointerup', end); mg.addEventListener('pointercancel', end);
  }
  function mxHtml(t) {
    const m = matchOf(t); if (!m) return ''; const st = S.mx[t.t] || (S.mx[t.t] = { sel: null, ok: {}, msg: '' }), left = m[3].filter(it => !st.ok[it[0]]);
    let h = `<div class="stp" ${K}>🧩 5. Birlashtirish</div><div class="mx" ${K}><b>${m[1]}</b>`;
    if (!left.length) return h + `<div class="vd g">✅ Hammasi to‘g‘ri joylashtirildi!</div><button data-mxr="${t.t}">🔄 Qayta</button></div>`;
    h += `<div class="pl">Avval buyumni, keyin to‘g‘ri guruhni bosing.</div><div class="it">${left.map(it => `<button class="${st.sel === it[0] ? 'sel' : ''}" data-mxi="${esc(it[0])}">${esc(it[0])}</button>`).join('')}</div><div class="bk">${m[2].map((b, i) => `<button data-mxb="${i}">${esc(b)}</button>`).join('')}</div>`;
    const placed = m[2].map((b, i) => { const l = m[3].filter(it => it[1] === i && st.ok[it[0]]).map(it => it[0]); return l.length ? `<div class="pl"><b>${esc(b)}:</b> ${esc(l.join(', '))}</div>` : ''; }).join('');
    return h + placed + (st.msg ? `<div class="pl">${st.msg}</div>` : '') + '</div>';
  }
  function renderLearn() {
    const N = ALLT.length, dn = ALLT.filter(x => done(x.t)).length; let h = `<h3 ${K}>📚 O‘RGANISH</h3><div class="ov" ${K}><div>O‘zlashtirilgan mavzular: <b>${dn}/${N}</b></div><div class="pb"><i style="width:${Math.round(100 * dn / N)}%"></i></div>`;
    const nx = ALLT.find(x => !done(x.t)); if (nx) h += `<button class="pri" data-go="${esc(nx.t)}">▶ Davom etish: ${esc(nx.t)}</button>`; h += '</div>';
    /* Barcha paragraflar o‘zlashtirilganda Fizika sertifikati */
    if (dn >= N && N > 0) {
      const savedName = (PR._certName || localStorage.getItem('orvin_phys_cert_name') || '').trim();
      h += `<div class="phys-cert-box" style="margin:18px 0;padding:16px;border:1px solid rgba(0,200,255,.45);border-radius:12px;background:linear-gradient(145deg,rgba(8,20,40,.92),rgba(12,40,70,.88))">
        <div style="font-size:18px;font-weight:700;margin-bottom:6px" ${K}>🎓 Fizika sertifikati</div>
        <p style="opacity:.9;margin:0 0 12px" ${K}>Barcha paragraflar o‘zlashtirildi! Sertifikatni olishingiz mumkin.</p>
        <label style="display:block;font-size:13px;opacity:.85;margin-bottom:4px" ${K}>Ism va familiya</label>
        <input id="physCertName" type="text" maxlength="60" placeholder="Masalan: Ali Valiyev" value="${esc(savedName)}"
          style="width:100%;max-width:320px;padding:8px 12px;border-radius:8px;border:1px solid #3a6a8a;background:#0a1a2e;color:#eafcff;margin-bottom:12px">
        <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px">
          <button class="pri" id="physCertPng" ${K}>PNG yuklab olish</button>
          <button class="pri" id="physCertPdf" ${K}>PDF yuklab olish</button>
        </div>
        <img id="physCertPreview" alt="Sertifikat" style="display:none;max-width:100%;border-radius:8px;border:1px solid #31516c;margin-top:8px">
      </div>`;
    }
    BN.forEach((b, bi) => {
      const tps = BL[b], open = S.openB[b]; h += `<div class="blk"><button class="bh" data-b="${bi}"><span>${bi + 1}. ${b}</span><small ${K}>${tps.filter(x => done(x.t)).length}/${tps.length} ✓ ${open ? '▾' : '▸'}</small></button>`;
      if (open) tps.forEach((t, ti) => {
        const key = bi + '.' + ti; h += `<button class="tp" data-t="${key}"><span>${t.t}</span><small ${K}>${done(t.t) ? '✅' : ''}</small></button>`;
        if (S.openT !== key) return;
        const sk = streak(t.t); h += `<div class="ls"><div ${K}>Daraja: ${[0, 1, 2].map(i => i < sk ? '●' : '○').join(' ')} ${done(t.t) ? '✅ O‘zlashtirildi' : ''}<br><small>3 ta ketma-ket to‘g‘ri javob = o‘zlashtirildi</small></div>`;
        h += `<div class="stp" ${K}>📖 1. Qoida</div><div class="idea" ${K}>${esc(t.r)}</div>`;
        if (!S.ex || S.ex.key !== key) S.ex = { key, q: easy(t) };
        h += `<div class="stp" ${K}>🧩 2. Namuna yechim</div><div class="qs" ${K}>${t.e ? '<i>' + esc(t.e) + '</i>' : ''}</div><div class="qs" ${K}>${esc(S.ex.q.s)}</div>${sol(S.ex.q)}<div class="vd g" ${K}>Javob: <b>${esc(S.ex.q.o[S.ex.q.c])}</b></div><button data-ex="${key}" ${K}>🔄 Boshqa namuna</button>`;
        h += `<div class="stp" ${K}>✍️ 3. Mashq</div>`;
        if (!S.pr || S.pr.key !== key) h += `<button class="pri" data-pr="${key}" ${K}>Mashqni boshlash</button>`; else { const q = S.pr.q; h += `<div class="qs" ${K}>${esc(q.s)}</div>${opts(q, S.pr.p, 'po')}`; if (S.pr.p != null) h += `${verdict(q, S.pr.p)}${sol(q)}<button class="pri" data-pr="${key}" ${K}>Yana savol</button>`; }
        h += `<div class="stp" ${K}>🎯 4. MS darajasidagi savol</div>`;
        if (!S.ms || S.ms.key !== key) h += `<button class="pri" data-ms="${key}" ${K}>MS savolini ochish</button>`; else { const q = S.ms.q; h += `<div class="qs" ${K}>${esc(q.s)}</div>${opts(q, S.ms.p, 'mo')}`; if (S.ms.p != null) h += `${verdict(q, S.ms.p)}${sol(q)}<button class="pri" data-ms="${key}" ${K}>Yana savol</button>`; }
        h += mxHtml(t) + labHtml(t) + '</div>';
      });
      h += '</div>';
    });
    const el = $('pmLearn'), sc = el.scrollTop; el.innerHTML = h; el.scrollTop = sc; initMagnet(); initSims();
  }
  /* ---- MOCK TEST: matematikadagidek 45 topshiriq = 100 ball ----
     1–10 yopiq (1,3 ball) · 11–32 yopiq (2,2) · 33–35 moslashtirish (2,2) · 36–45 ochiq, javobni yozing (3,2) */
  const NQ = 45, MIN = (window.MSMock && window.MSMock.duration) || 150;
  const TYPE = i => i < 10 ? 'Y1' : i < 32 ? 'Y2' : i < 35 ? 'M' : 'O', PTSX = { Y1: 1.3, Y2: 2.2, M: 2.2, O: 3.2 }, TN = { Y1: 'yopiq', Y2: 'yopiq', M: 'moslashtirish', O: 'ochiq' };
  const DIST = [['Kinematika', 5], ['Dinamika', 5], ['Statika', 1], ['Suyuqlik va gaz mexanikasi', 2], ['Saqlanish qonunlari', 4], ['Molekulyar fizika', 5], ['Elektrostatika', 3], ['Elektr toki', 4], ['Magnit maydon', 3], ['Tebranishlar', 2], ['To‘lqinlar', 1], ['O‘zgaruvchan tok', 1], ['Optika', 3], ['Nisbiylik', 1], ['Kvant fizikasi', 1], ['Atom fizikasi', 1], ['Yadro fizikasi', 2], ['Astronomiya', 1]];
  const LEV = [[70, 'A+'], [65, 'A'], [60, 'B+'], [55, 'B'], [50, 'C+'], [46, 'C']], levelOf = x => (LEV.find(l => x >= l[0]) || [0, 'none'])[1];
  const mm = s => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  const isOk = (q, a) => q.open ? (a != null && a !== '' && Math.abs(parseFloat(String(a).replace(',', '.').replace('−', '-')) - q.r) <= Math.abs(q.r) * 0.01 + 1e-9) : a === q.c;
  const answered = i => S.ans[i] != null && S.ans[i] !== '';
  function matchQs(n) {
    const m = P(D.match.filter(z => z[2].length >= 2 && z[3].length >= 3)), items = sh(m[3].slice()).slice(0, n);
    return items.map(it => ({ tp: (ALLT.find(t => new RegExp(m[0]).test(t.t)) || {}).t || m[1], s: `${m[1]}: «${it[0]}» qaysi guruhga kiradi?`, o: m[2].slice(), c: it[1], x: ['To‘g‘ri guruh: ' + m[2][it[1]]] }));
  }
  function build45() {
    const topics = []; DIST.forEach(([b, n]) => sh(BL[b].slice()).slice(0, n).forEach(t => topics.push(t))); while (topics.length < NQ) topics.push(P(ALLT));
    const pick = sh(topics.slice(0, NQ)), qs = [], mq = matchQs(3);
    for (let i = 0; i < NQ; i++) {
      const ty = TYPE(i); let q;
      if (ty === 'M') q = mq[i - 32] || hard(pick[i]);
      else if (ty === 'O') { const g = pick.filter(t => genOf(t))[i - 35] || P(ALLT.filter(t => genOf(t))), r = (genOf(g)[2] || genOf(g)[1])(); q = { tp: g.t, s: r[0], open: 1, r: +r[1], u: r[2], o: [], c: -1, x: r[3].concat('Javob: ' + fm(r[1]) + ' ' + r[2]) }; }
      else q = ty === 'Y1' ? easy(pick[i]) : (Math.random() < .5 ? hard(pick[i]) : easy(pick[i]));
      q.ty = ty; q.pts = PTSX[ty]; qs.push(q);
    }
    return qs;
  }
  /* ---- 5 ta MUSTAQIL VARIANT: har biri qat'iy (seed bo'yicha) 45 topshiriq; variantlar orasida savollar takrorlanmaydi ---- */
  const VARS = {}, USED = new Set(), NVAR = 5;
  /* MOSLASHTIRISH: har savolda A–F, 6 ta javob kaliti */
  const MSETS = [
    [/SI birliklari/, 'Kattalikning SI birligini tanlang', ['N', 'J', 'W', 'V', 'Pa', 'Hz'], [['Kuch', 0], ['Mexanik ish', 1], ['Quvvat', 2], ['Elektr kuchlanish', 3], ['Bosim', 4], ['Tebranish chastotasi', 5]]],
    [/Nyutonning ikkinchi/, 'Formula qaysi kattalikni ifodalaydi?', ['Tezlik', 'Tezlanish', 'Kuch', 'Impuls', 'Ish', 'Quvvat'], [['v = s/t', 0], ['a = Δv/t', 1], ['F = ma', 2], ['p = mv', 3], ['A = F·s', 4], ['P = A/t', 5]]],
    [/Om qonuni|qarshiligi/, 'Formula qaysi qonunga tegishli?', ['Om qonuni', 'Joul–Lens qonuni', 'Kulon qonuni', 'Faradey induksiya qonuni', 'Arximed qonuni', 'Guk qonuni'], [['I = U/R', 0], ['Q = I²Rt', 1], ['F = k·q₁q₂/r²', 2], ['ε = −ΔΦ/Δt', 3], ['F = ρgV', 4], ['F = kx', 5]]],
    [/Linza/, 'Hodisa yoki asbob fizikaning qaysi bo‘limiga tegishli?', ['Mexanika', 'Termodinamika', 'Elektr', 'Magnetizm', 'Optika', 'Yadro fizikasi'], [['Erkin tushish', 0], ['Issiqlik dvigateli', 1], ['Kondensator', 2], ['Kompas strelkasi', 3], ['Yig‘uvchi linza', 4], ['Yarim yemirilish davri', 5]]],
    [/Erkin tushish/, 'Fizik doimiyning qiymatini tanlang', ['10 m/s²', '3·10⁸ m/s', '4200 J/(kg·°C)', '340 m/s', '1000 kg/m³', '9·10⁹ N·m²/C²'], [['Erkin tushish tezlanishi g', 0], ['Yorug‘likning vakuumdagi tezligi', 1], ['Suvning solishtirma issiqlik sig‘imi', 2], ['Havoda tovush tezligi', 3], ['Suvning zichligi', 4], ['Kulon doimiysi k', 5]]]
  ];
  function matchU(n) {
    const out = [], sets = sh(MSETS.slice());
    for (const m of sets) {
      if (out.length >= n) break;
      const its = sh(m[3].slice()), it = its.find(x => !USED.has(`«${x[0]}» — ${m[1]}`)) || its[0], idx = sh([0, 1, 2, 3, 4, 5]), o = idx.map(i => m[2][i]);
      out.push({ tp: (ALLT.find(t => m[0].test(t.t)) || ALLT[0]).t, s: `«${it[0]}» — ${m[1]}`, o, c: idx.indexOf(it[1]), x: ['To‘g‘ri javob: ' + m[2][it[1]]] });
    }
    return out;
  }
  const pad4 = q => {
    if (q.open || q.ty === 'M' || q.o.length >= 4) return q;
    const t = ALLT.find(z => z.t === q.tp), pool = [...new Set((t ? BL[t.b] : ALLT).concat(ALLT).flatMap(z => z.qs ? z.qs.flatMap(x => x[1]) : []))].filter(x => !q.o.includes(x)), ans = q.o[q.c];
    const add = sh(pool).slice(0, 4 - q.o.length), o = sh(q.o.concat(add)); q.o = o; q.c = o.indexOf(ans); return q;
  };
  function genVariant(k) {
    const old = rng; rng = mulberry(k * 7919 + 101);
    try {
      const blocks = []; DIST.forEach(([b, n]) => { for (let i = 0; i < n; i++) blocks.push(b); }); sh(blocks);
      const mq = matchU(3), gt = ALLT.filter(genOf), qs = [], seen = new Set();
      for (let i = 0; i < NQ; i++) {
        const ty = TYPE(i); let q = null;
        if (ty === 'M') q = mq[i - 32] || null;
        for (let tr = 0; tr < 60 && !q; tr++) {
          let c;
          if (ty === 'O') { const t = P(gt), g = genOf(t), r = (tr % 2 ? g[1] : (g[2] || g[1]))(); c = { tp: t.t, s: r[0], open: 1, r: +r[1], u: r[2], o: [], c: -1, x: r[3].concat('Javob: ' + fm(r[1]) + ' ' + r[2]) }; }
          else {
            const b = blocks[(i + tr) % blocks.length], pool = BL[b], gp = pool.filter(genOf), t = (gp.length && rng() < .65) ? P(gp) : P(pool);
            c = ty === 'Y1' ? easy(t) : (rng() < .5 ? hard(t) : easy(t));
          }
          if (tr === 59 || !(USED.has(c.s) || seen.has(c.s))) q = c;
        }
        if (!q) q = easy(P(ALLT));
        q.ty = ty; q.pts = PTSX[ty]; pad4(q); seen.add(q.s); qs.push(q);
      }
      qs.forEach(q => USED.add(q.s)); return qs;
    } finally { rng = old; }
  }
  const variant = k => { for (let i = 1; i <= k; i++) if (!VARS[i]) VARS[i] = genVariant(i); return VARS[k]; };
  window.__physMockKit = { variant, NVAR, NQ, MIN, TYPE, PTSX, levelOf, isOk, ALLT, fm };
  function openFull() {
    if (!window.PhysMock) return start();
    window.PhysMock.open({ onFinish: r => { PR._mockLast = { score: r.score, level: r.level, date: Date.now(), variant: r.variant }; save(); }, onGo: name => { const t = ALLT.find(x => x.t === name); if (t) { S.openB[t.b] = true; S.openT = BN.indexOf(t.b) + '.' + BL[t.b].indexOf(t); S.ex = S.pr = S.ms = null; S.tab = 'learn'; chrome(); renderLearn(); } }, onClose: () => { renderMock(); } });
  }
  function renderMock() {
    const el = $('pmMock'); let h = `<h3 ${K}>📝 MOCK TEST</h3>`;
    if (S.state === 'idle') { h += `<div ${K} style="opacity:.85;line-height:1.5">45 topshiriq • 100 ball • yopiq (A–D), moslashtirish va ochiq (javobni yozing) topshiriqlar • barcha bo‘limlardan • 5 ta variant<br>⏱ ${MIN} daq</div><div class="row">${window.PhysMock && window.PhysMock.hasSession() ? `<button class="pri" id="pmResume" ${K}>Davom ettirish</button>` : ''}<button class="${window.PhysMock && window.PhysMock.hasSession() ? '' : 'pri'}" id="pmStart" ${K}>TESTNI BOSHLASH</button></div>`; if (PR._mockLast) h += `<p ${K} style="margin-top:14px;opacity:.8">Oxirgi natija: <b>${PR._mockLast.score}</b> / 100 · ${PR._mockLast.level === 'none' ? 'Sertifikat berilmaydi' : PR._mockLast.level}</p>`; }
    else if (S.state === 'run') {
      const q = S.qs[S.cur], a = S.ans[S.cur];
      h += `<div class="row" ${K}><span>Qolgan vaqt: <b id="pmTimer">${mm(Math.max(0, Math.round((S.end - Date.now()) / 1000)))}</b></span><span>Javob berilgan: ${S.ans.filter((_, i) => answered(i)).length}/${NQ}</span></div><div class="qn">${S.qs.map((_, i) => `<button data-qn="${i}" class="${i === S.cur ? 'cu' : answered(i) ? 'dn' : ''}">${i + 1}</button>`).join('')}</div>`;
      h += `<div ${K} style="opacity:.7;font-size:12px">Savol ${S.cur + 1} · ${TN[q.ty]} · ${q.pts.toFixed(1)} ball</div><div class="qs" ${K}>${esc(q.s)}</div>`;
      if (q.open) h += `<input id="pmIn" inputmode="decimal" placeholder="Javobni yozing (${esc(q.u)})" value="${a == null ? '' : esc(a)}" style="width:100%;box-sizing:border-box;padding:10px;border-radius:10px;border:1px solid #7cf;background:rgba(0,30,50,.7);color:#fff;font:inherit">`;
      else q.o.forEach((o, i) => { h += `<button class="op ${a === i ? 'sel' : ''}" data-o="${i}" ${K}>${'ABCDE'[i]}) ${esc(o)}</button>`; });
      h += `<div class="row" ${K}><button data-nv="-1" ${S.cur ? '' : 'disabled'}>Oldingi</button><button class="pri" id="pmFin">YAKUNLASH</button><button data-nv="1" ${S.cur < NQ - 1 ? '' : 'disabled'}>Keyingi</button></div>`;
    } else {
      const r = S.res; h += `<div ${K}><div class="big">${r.score} / 100</div><div>Daraja: <b>${r.level === 'none' ? 'Sertifikat berilmaydi' : r.level}</b></div><div>To‘g‘ri javoblar: ${r.ok}/${NQ}</div></div>`;
      if (r.weak.length) { h += `<h3 style="margin-top:14px" ${K}>Takrorlash kerak</h3>`; r.weak.forEach(w => { h += `<div class="row"><span>${esc(w)}</span><button data-go="${esc(w)}" ${K}>O‘rganish →</button></div>`; }); }
      if (r.rev.length) { h += `<h3 style="margin-top:14px" ${K}>Xatolar tahlili</h3>`; r.rev.forEach(v => { h += `<details class="rv"><summary>№${v.n} ${esc(v.q.tp)}</summary><div class="qs" ${K}>${esc(v.q.s)}</div><div ${K}>Sizning javobingiz: <b>${!answered(v.n - 1) ? '—' : v.q.open ? esc(v.a) : esc(v.q.o[v.a])}</b> · Javob: <b>${v.q.open ? esc(fm(v.q.r) + ' ' + v.q.u) : esc(v.q.o[v.q.c])}</b></div>${sol(v.q)}</details>`; }); }
      h += `<div class="row"><button class="pri" id="pmStart" ${K}>Qayta topshirish</button></div>`;
    }
    el.innerHTML = h;
  }
  function start() {
    S.qs = build45(); S.ans = new Array(NQ).fill(null); S.cur = 0; S.end = Date.now() + MIN * 60000; S.state = 'run'; clearInterval(S.tm);
    S.tm = setInterval(() => { const s = Math.round((S.end - Date.now()) / 1000), e = $('pmTimer'); if (e) e.textContent = mm(Math.max(0, s)); if (s <= 0) finish(true); }, 1000); renderMock();
  }
  function finish(force) {
    if (!force && !confirm('Testni yakunlaymizmi?')) return; clearInterval(S.tm);
    let sc = 0, ok = 0; const tp = {};
    S.qs.forEach((q, i) => { const g = isOk(q, S.ans[i]), x = tp[q.tp] || (tp[q.tp] = { got: 0, max: 0 }); x.max += q.pts; if (g) { sc += q.pts; ok++; x.got += q.pts; } });
    sc = Math.round(sc * 10) / 10; const weak = Object.keys(tp).filter(k => tp[k].got < tp[k].max).sort((a, b) => tp[a].got / tp[a].max - tp[b].got / tp[b].max).slice(0, 5);
    const rev = S.qs.map((q, i) => ({ n: i + 1, q, a: S.ans[i] })).filter((v, i) => !isOk(v.q, S.ans[i]));
    const lv = sc >= 46 ? levelOf(sc) : 'none'; S.res = { score: sc, level: lv, ok, weak, rev }; PR._mockLast = { score: sc, level: lv, date: Date.now() }; save(); S.state = 'done'; renderMock();
  }
  function chrome() { root.dataset.tab = S.tab; $('pmTL').classList.toggle('on', S.tab === 'learn'); $('pmTM').classList.toggle('on', S.tab === 'mock'); if (window.OrvinLang && OrvinLang.mount && !root.querySelector('.olang')) OrvinLang.mount(root.querySelector('.mt'), $('pmX')); }
  const topicAt = k => { const [bi, ti] = k.split('.').map(Number); return BL[BN[bi]][ti]; };
  root.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return; const d = b.dataset;
    if (b.id === 'pmX') return window.closePhysics();
    if (b.id === 'pmTL') { S.tab = 'learn'; return chrome(); } if (b.id === 'pmTM') { S.tab = 'mock'; return chrome(); }
    if (d.b != null) { const k = BN[+d.b]; S.openB[k] = !S.openB[k]; return renderLearn(); }
    if (d.t != null) { S.openT = S.openT === d.t ? null : d.t; S.ex = S.pr = S.ms = null; return renderLearn(); }
    if (d.ex != null) { S.ex = { key: d.ex, q: easy(topicAt(d.ex)) }; return renderLearn(); }
    if (d.pr != null) { S.pr = { key: d.pr, q: easy(topicAt(d.pr)), p: null }; return renderLearn(); }
    if (d.ms != null) { S.ms = { key: d.ms, q: hard(topicAt(d.ms)), p: null }; return renderLearn(); }
    if (d.po != null && S.pr && S.pr.p == null) { S.pr.p = +d.po; rec(S.pr.q.tp, S.pr.p === S.pr.q.c); return renderLearn(); }
    if (d.mo != null && S.ms && S.ms.p == null) { S.ms.p = +d.mo; rec(S.ms.q.tp, S.ms.p === S.ms.q.c); return renderLearn(); }
    if (d.mxi != null || d.mxb != null || d.mxr != null) {
      const t = topicAt(S.openT), st = S.mx[t.t] || (S.mx[t.t] = { sel: null, ok: {}, msg: '' }), m = matchOf(t);
      if (d.mxr) S.mx[t.t] = { sel: null, ok: {}, msg: '' };
      else if (d.mxi != null) { st.sel = d.mxi; st.msg = ''; }
      else if (st.sel) { const it = m[3].find(x => x[0] === st.sel); if (it && it[1] === +d.mxb) { st.ok[it[0]] = 1; st.msg = '✓ To‘g‘ri!'; if (m[3].every(x => st.ok[x[0]])) { PR._x[t.t] = 1; save(); } } else st.msg = '✗ Bu yerga mos kelmaydi, qayta urinib ko‘ring.'; st.sel = null; }
      return renderLearn();
    }
    if (b.id === 'pmMagR') return renderLearn();
    if (b.id === 'pmResume' && window.PhysMock) return window.PhysMock.open({ resume: true, onFinish: r => { PR._mockLast = { score: r.score, level: r.level, date: Date.now(), variant: r.variant }; save(); }, onClose: () => renderMock() }); if (b.id === 'pmStart') return openFull(); if (b.id === 'pmFin') return finish(false);
    if (d.qn != null) { S.cur = +d.qn; return renderMock(); } if (d.nv != null) { S.cur = Math.min(NQ - 1, Math.max(0, S.cur + +d.nv)); return renderMock(); }
    if (d.o != null) { S.ans[S.cur] = +d.o; return renderMock(); }
    if (d.go) { const t = ALLT.find(x => x.t === d.go); if (t) { S.openB[t.b] = true; S.openT = BN.indexOf(t.b) + '.' + BL[t.b].indexOf(t); S.ex = S.pr = S.ms = null; S.tab = 'learn'; chrome(); renderLearn(); } }
    /* Fizika sertifikati PNG / PDF */
    if (b.id === 'physCertPng' || b.id === 'physCertPdf') {
      const nameEl = root.querySelector('#physCertName');
      const name = (nameEl && nameEl.value || '').trim().slice(0, 60);
      if (!name) { alert('Ism va familiyani yozing'); return; }
      PR._certName = name;
      try { localStorage.setItem('orvin_phys_cert_name', name); } catch (_) {}
      drawPhysCert(name, b.id === 'physCertPdf');
      return;
    }
  });
  /* ---------- Fizika sertifikati (canvas → PNG / PDF) ---------- */
  const physCertImg = new Image();
  try { physCertImg.src = 'physics_certificate.jpg'; } catch (_) {}
  function drawPhysCert(name, asPdf) {
    const paint = () => {
      const c = document.createElement('canvas');
      const w = physCertImg.naturalWidth || 1600;
      const h = physCertImg.naturalHeight || 1131;
      c.width = w; c.height = h;
      const x = c.getContext('2d');
      x.drawImage(physCertImg, 0, 0, w, h);
      x.fillStyle = '#eafcff';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      const fontSize = Math.max(28, Math.round(w * 0.032));
      let fs2 = fontSize; x.font = 'bold ' + fs2 + 'px "Segoe UI", Arial, sans-serif';
      while (x.measureText(name).width > w * 0.56 && fs2 > 18) { fs2 -= 2; x.font = 'bold ' + fs2 + 'px "Segoe UI", Arial, sans-serif'; }
      x.shadowColor = 'rgba(0,200,255,0.55)';
      x.shadowBlur = 8;
      x.fillText(name, w / 2, h * 0.455);
      x.shadowBlur = 0;
      const prev = root.querySelector('#physCertPreview');
      if (prev) { prev.src = c.toDataURL('image/png'); prev.style.display = 'block'; }
      if (asPdf) {
        const J = window.jspdf && window.jspdf.jsPDF;
        if (J) {
          const pdf = new J({ orientation: w > h ? 'landscape' : 'portrait', unit: 'px', format: [w, h] });
          pdf.addImage(c.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, w, h);
          pdf.save('ORVIN_Physics_Certificate.pdf');
        } else {
          const a = document.createElement('a');
          a.href = c.toDataURL('image/png');
          a.download = 'ORVIN_Physics_Certificate.png';
          a.click();
        }
      } else {
        const a = document.createElement('a');
        a.href = c.toDataURL('image/png');
        a.download = 'ORVIN_Physics_Certificate.png';
        a.click();
      }
    };
    if (physCertImg.complete && physCertImg.naturalWidth) paint();
    else physCertImg.onload = paint;
  }
  root.addEventListener('input', e => { if (e.target.dataset.lv) { const c = e.target.closest('.lab'), v = {}; c.querySelectorAll('input').forEach(i => { v[i.dataset.lv] = +i.value; i.previousElementSibling.textContent = i.value; }); c.querySelector('.lo').innerHTML = labOut(+c.dataset.li, v); return; } if (e.target.id === 'pmIn') { S.ans[S.cur] = e.target.value; const b = root.querySelector('.qn button.cu'); if (b) b.classList.toggle('dn', answered(S.cur)); } });
  /* ---- QO'L BILAN HAVODA BOSHQARISH: ko'rsatkich barmoq = kursor, chimchilash = bosish / ushlash / slayder ---- */
  let hov = null, latch = false, hOff = 0, hMode = null, hSl = null;
  const setHov = el => { if (hov === el) return; if (hov) hov.classList.remove('hov'); hov = el; if (el) el.classList.add('hov'); };
  function hand(h) {
    if (!h.has) { hMode = hSl = null; latch = false; setHov(null); return true; }
    if (hMode === 'mag' && window.__physMag) { if (h.pinch) { hOff = 0; window.__physMag.to(h.x, h.y); } else if (++hOff > 3) hMode = null; return true; }
    if (hSl) { if (h.pinch) { const r = hSl.getBoundingClientRect(), mn = +hSl.min, mx = +hSl.max, st = +hSl.step || 1; let v = mn + Math.max(0, Math.min(1, (h.x - r.left) / r.width)) * (mx - mn); v = Math.round(v / st) * st; hSl.value = Math.max(mn, Math.min(mx, +v.toFixed(3))); hSl.dispatchEvent(new Event('input', { bubbles: true })); hOff = 0; } else if (++hOff > 3) hSl = null; return true; }
    const el = document.elementFromPoint(h.x, h.y), bt = el && el.closest ? el.closest('#msPhys button, #msPhys input[type=range]') : null;
    const pm = $('pmMag'), mg = window.__physMag && pm && document.body.contains(pm) ? window.__physMag.r() : null, nearMag = mg && Math.hypot(h.x - (mg.left + mg.right) / 2, h.y - (mg.top + mg.bottom) / 2) < Math.max(48, mg.width);
    setHov(nearMag ? null : bt);
    if (h.pinch) { if (!latch) { latch = true; hOff = 0; if (nearMag) hMode = 'mag'; else if (bt && bt.type === 'range') hSl = bt; else if (bt) bt.click(); } } else latch = false;
    if (!h.pinch) { const sec = (el && el.closest && el.closest('#msPhys section')) || $('pmLearn'), r = sec.getBoundingClientRect(); if (h.y > innerHeight - 60) sec.scrollTop += 14; else if (h.y > r.top && h.y < r.top + 46) sec.scrollTop -= 14; }
    return true;
  }
  const prevHand = window.__orvinHand; window.__orvinHand = function (h) { return root.classList.contains('show') ? hand(h) : (prevHand ? prevHand(h) : false); };
  window.openPhysics = function () { document.body.classList.add('math-mode'); try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(true); } catch (_) { } chrome(); renderLearn(); renderMock(); root.classList.add('show'); };
  window.closePhysics = function () { root.classList.remove('show'); window.dispatchEvent(new Event('orvin-science-closed')); setTimeout(() => { const o = $('oquv'); if (!(o && o.classList.contains('show'))) { document.body.classList.remove('math-mode'); try { if (window.__orvinSetMathMode) window.__orvinSetMathMode(false); } catch (_) { } } }, 0); };
  window.PhysStat = () => ({ done: ALLT.filter(x => done(x.t)).length, total: ALLT.length, last: PR._mockLast ? PR._mockLast.score : null });
})();
