/* Tumbuh — calculators (kalkulator.html): lots, profit after fees, regular investing */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;
  const codes = T.stockCodes();
  const first = codes.includes("BBCA") ? "BBCA" : codes[0];

  /* All inputs live here, so switching language keeps what the visitor typed */
  const st = {
    lot: { code: first, price: T.stock(first).price, budget: 5000000, fee: 0.15 },
    pl: { buy: T.stock(first).price, sell: Math.round(T.stock(first).price * 1.1), lots: 10, feeBuy: 0.15, feeSell: 0.25 },
    dca: { code: first, monthly: 1000000, years: 3, fee: 0.15 }
  };

  const num = (v) => { const n = parseFloat(String(v).replace(",", ".")); return isFinite(n) ? n : 0; };

  function stockOptions(selected) {
    return Object.keys(T.sectors).map((sk) => {
      const list = T.allStocks().filter((s) => s.sector === sk).sort((x, y) => x.code.localeCompare(y.code));
      if (!list.length) return "";
      return `<optgroup label="${T.esc(L(T.sectors[sk]))}">${list.map((s) =>
        `<option value="${s.code}" ${s.code === selected ? "selected" : ""}>${s.code} — ${T.esc(s.name)}</option>`).join("")}</optgroup>`;
    }).join("");
  }
  const field = (id, label, value, opts = {}) => `
    <label class="calc-field" for="${id}">
      <span>${label}</span>
      <span class="calc-input">${opts.prefix ? `<span class="calc-affix">${opts.prefix}</span>` : ""}<input id="${id}" type="number" inputmode="decimal" min="0" step="${opts.step || "any"}" value="${value}">${opts.suffix ? `<span class="calc-affix">${opts.suffix}</span>` : ""}</span>
      ${opts.hint ? `<small>${opts.hint}</small>` : ""}
    </label>`;
  const rp = () => (T.lang() === "id" ? "Rp" : "IDR");
  const out = (label, value, strong) => `<div class="calc-out ${strong ? "calc-out--main" : ""}"><span>${label}</span><strong class="num">${value}</strong></div>`;

  /* ---- 1. how many lots ------------------------------------------------ */
  function calcLot() {
    const s = st.lot, perLot = s.price * 100, fee = s.fee / 100;
    const lots = perLot > 0 ? Math.floor(s.budget / (perLot * (1 + fee))) : 0;
    const cost = lots * perLot, feeRp = cost * fee, total = cost + feeRp;
    document.getElementById("lot-out").innerHTML = `
      ${out(t("calcLots"), T.num(lots) + " lot", true)}
      ${out(t("calcShares"), T.num(lots * 100) + " " + t("calcSharesUnit"))}
      ${out(t("calcStockCost"), T.idr(cost))}
      ${out(t("calcFee"), T.idr(feeRp))}
      ${out(t("calcTotal"), T.idr(total))}
      ${out(t("calcLeft"), T.idr(Math.max(0, s.budget - total)))}
      <p class="calc-say">${lots > 0 ? t("calcLotSay", { budget: T.idr(s.budget), lots: T.num(lots), price: T.idr(s.price) }) : t("calcLotNone", { perLot: T.idr(perLot * (1 + fee)) })}</p>`;
  }

  /* ---- 2. profit or loss after fees ----------------------------------- */
  function calcPL() {
    const s = st.pl, shares = s.lots * 100;
    const buyTotal = s.buy * shares * (1 + s.feeBuy / 100);
    const sellTotal = s.sell * shares * (1 - s.feeSell / 100);
    const pl = sellTotal - buyTotal, plPct = buyTotal ? (pl / buyTotal) * 100 : 0;
    const be = s.buy * (1 + s.feeBuy / 100) / (1 - s.feeSell / 100);
    document.getElementById("pl-out").innerHTML = `
      ${out(pl >= 0 ? t("calcProfit") : t("calcLoss"), `<span style="color:${pl >= 0 ? "var(--up)" : "var(--down)"}">${pl >= 0 ? "+" : "−"}${T.idr(Math.abs(pl))} (${T.pct(plPct, 2)})</span>`, true)}
      ${out(t("calcPaid"), T.idr(buyTotal))}
      ${out(t("calcReceived"), T.idr(sellTotal))}
      ${out(t("calcBreakEven"), T.idr(Math.ceil(be)))}
      <p class="calc-say">${t("calcBESay", { be: T.idr(Math.ceil(be)), buy: T.idr(s.buy) })}</p>`;
  }

  /* ---- 3. regular investing on real past prices ----------------------- */
  function simulate() {
    const s = st.dca, h = T.history(s.code, s.years * 250 + 5);
    const pts = h.points, dates = h.dates, fee = s.fee / 100;
    const buyDays = [];                                   /* index of the first trading day of each month */
    for (let i = 0; i < pts.length; i++) {
      if (dates) { if (i === 0 || dates[i].slice(0, 7) !== dates[i - 1].slice(0, 7)) buyDays.push(i); }
      else if (i % 21 === 0) buyDays.push(i);
    }
    let cash = 0, shares = 0, invested = 0;
    const valueLine = [], investedLine = [];
    let bi = 0;
    for (let i = 0; i < pts.length; i++) {
      if (buyDays[bi] === i) {
        cash += s.monthly; invested += s.monthly; bi++;
        const lotCost = pts[i] * 100 * (1 + fee);
        const lots = Math.floor(cash / lotCost);
        shares += lots * 100; cash -= lots * lotCost;
      }
      valueLine.push(shares * pts[i] + cash);
      investedLine.push(invested);
    }
    const last = pts[pts.length - 1];
    /* the same total, all invested on day one */
    const lumpLots = Math.floor(invested / (pts[0] * 100 * (1 + fee)));
    const lumpValue = lumpLots * 100 * last + (invested - lumpLots * pts[0] * 100 * (1 + fee));
    return { valueLine, investedLine, invested, value: valueLine[valueLine.length - 1], shares, months: buyDays.length,
      avg: shares ? (invested - cash) / shares : 0, lumpValue, last, sample: h.sample, start: dates ? dates[0] : null };
  }

  function drawDCA(r) {
    const W = 800, H = 240, pad = 12;
    const all = r.valueLine.concat(r.investedLine);
    const lo = 0, hi = Math.max(...all) * 1.05;
    const x = (i) => (i / (r.valueLine.length - 1)) * W;
    const y = (v) => pad + (H - 2 * pad) * (1 - (v - lo) / (hi - lo || 1));
    const path = (arr) => arr.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
    const up = r.value >= r.invested;
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${T.esc(t("calcDcaChart"))}" style="width:100%;height:220px">
      <path d="${path(r.valueLine)} L${W},${H} L0,${H} Z" fill="${up ? "var(--up-line)" : "var(--down-line)"}" fill-opacity="0.08"/>
      <path d="${path(r.investedLine)}" fill="none" stroke="#8A919C" stroke-width="2" stroke-dasharray="5 5" vector-effect="non-scaling-stroke"/>
      <path d="${path(r.valueLine)}" fill="none" stroke="${up ? "var(--up-line)" : "var(--down-line)"}" stroke-width="2.4" vector-effect="non-scaling-stroke"/>
    </svg>
    <div class="chart__axis"><span>${r.start ? T.date(r.start) : t("ago" + (st.dca.years === 1 ? "1Y" : "5Y"))}</span><span>${t("now")}</span></div>
    <div class="calc-legend"><span><i style="background:${up ? "var(--up-line)" : "var(--down-line)"}"></i>${t("calcDcaValue")}</span><span><i class="dash"></i>${t("calcDcaInvested")}</span></div>`;
  }

  function calcDCA() {
    const r = simulate(), gain = r.value - r.invested, gainPct = r.invested ? (gain / r.invested) * 100 : 0;
    const lumpGain = r.lumpValue - r.invested;
    document.getElementById("dca-out").innerHTML = `
      <div class="calc-outs">
        ${out(t("calcDcaInvested"), T.idr(r.invested))}
        ${out(t("calcDcaValue"), T.idr(r.value), true)}
        ${out(gain >= 0 ? t("calcProfit") : t("calcLoss"), `<span style="color:${gain >= 0 ? "var(--up)" : "var(--down)"}">${T.pct(gainPct, 1)}</span>`)}
        ${out(t("calcDcaShares"), T.num(r.shares / 100) + " lot")}
        ${out(t("calcDcaAvg"), T.idr(Math.round(r.avg)) + " · " + t("calcDcaNow", { p: T.idr(r.last) }))}
      </div>
      <p class="calc-say">${t("calcDcaSay", { m: T.num(r.months), amt: T.idr(st.dca.monthly), code: st.dca.code, value: T.idr(r.value), invested: T.idr(r.invested) })}
      ${t("calcDcaLump", { value: T.idr(r.lumpValue), pct: T.pct((lumpGain / r.invested) * 100, 1) })}</p>
      ${drawDCA(r)}
      ${r.sample ? `<span class="tag">${t("sampleChart")}</span>` : ""}`;
  }

  function render() {
    document.title = t("calcTitle") + " — Tumbuh";
    document.getElementById("main").innerHTML = `
      <section class="stack" style="gap:12px;max-width:760px">
        <h1 style="font-size:clamp(32px,4.5vw,48px);font-weight:800;letter-spacing:-0.03em">${t("calcTitle")}</h1>
        <p class="lead" style="font-size:18px">${t("calcSub")}</p>
        <nav class="chips" aria-label="${t("calcTitle")}">
          <a class="chip" href="#lot" style="display:inline-flex;align-items:center;text-decoration:none">${t("calcLotTitle")}</a>
          <a class="chip" href="#untung" style="display:inline-flex;align-items:center;text-decoration:none">${t("calcPLTitle")}</a>
          <a class="chip" href="#dca" style="display:inline-flex;align-items:center;text-decoration:none">${t("calcDcaTitle")}</a>
        </nav>
      </section>

      <section class="card calc" id="lot" aria-labelledby="lot-h">
        <div class="calc-in">
          <h2 id="lot-h">${t("calcLotTitle")}</h2>
          <p class="lead" style="font-size:15px">${t("calcLotSub")}</p>
          <label class="calc-field" for="lot-code"><span>${t("calcStock")}</span><select id="lot-code">${stockOptions(st.lot.code)}</select></label>
          ${field("lot-price", t("calcPrice"), st.lot.price, { prefix: rp(), hint: t("calcPriceHint") })}
          ${field("lot-budget", t("calcBudget"), st.lot.budget, { prefix: rp(), step: 100000 })}
          ${field("lot-fee", t("calcFeeBuy"), st.lot.fee, { suffix: "%", step: 0.01, hint: t("calcFeeHint") })}
        </div>
        <div class="calc-res" id="lot-out" aria-live="polite"></div>
      </section>

      <section class="card calc" id="untung" aria-labelledby="pl-h">
        <div class="calc-in">
          <h2 id="pl-h">${t("calcPLTitle")}</h2>
          <p class="lead" style="font-size:15px">${t("calcPLSub")}</p>
          ${field("pl-buy", t("calcBuyPrice"), st.pl.buy, { prefix: rp() })}
          ${field("pl-sell", t("calcSellPrice"), st.pl.sell, { prefix: rp() })}
          ${field("pl-lots", t("calcLotsIn"), st.pl.lots, { suffix: "lot", step: 1 })}
          <div class="calc-two">
            ${field("pl-fb", t("calcFeeBuy"), st.pl.feeBuy, { suffix: "%", step: 0.01 })}
            ${field("pl-fs", t("calcFeeSell"), st.pl.feeSell, { suffix: "%", step: 0.01 })}
          </div>
          <small class="calc-note">${t("calcFeeSellHint")}</small>
        </div>
        <div class="calc-res" id="pl-out" aria-live="polite"></div>
      </section>

      <section class="card calc calc--wide" id="dca" aria-labelledby="dca-h">
        <div class="calc-in">
          <h2 id="dca-h">${t("calcDcaTitle")}</h2>
          <p class="lead" style="font-size:15px">${t("calcDcaSub")}</p>
          <label class="calc-field" for="dca-code"><span>${t("calcStock")}</span><select id="dca-code">${stockOptions(st.dca.code)}</select></label>
          ${field("dca-monthly", t("calcMonthly"), st.dca.monthly, { prefix: rp(), step: 100000 })}
          <div class="calc-field"><span id="dca-years-l">${t("calcPeriod")}</span>
            <div class="segmented" role="group" aria-labelledby="dca-years-l" id="dca-years">
              ${[1, 3, 5].map((y) => `<button type="button" data-y="${y}" aria-pressed="${st.dca.years === y}">${t("calcYears", { n: y })}</button>`).join("")}
            </div>
          </div>
          ${field("dca-fee", t("calcFeeBuy"), st.dca.fee, { suffix: "%", step: 0.01 })}
        </div>
        <div class="calc-res" id="dca-out" aria-live="polite"></div>
      </section>

      <div class="note-dashed">${T.icon("info", 20)}<span>${t("calcDisclaimer")}</span></div>`;

    const bind = (id, fn) => document.getElementById(id).addEventListener("input", (e) => { fn(e.target.value); });
    document.getElementById("lot-code").addEventListener("change", (e) => {
      st.lot.code = e.target.value; st.lot.price = T.stock(st.lot.code).price;
      document.getElementById("lot-price").value = st.lot.price; calcLot();
    });
    bind("lot-price", (v) => { st.lot.price = num(v); calcLot(); });
    bind("lot-budget", (v) => { st.lot.budget = num(v); calcLot(); });
    bind("lot-fee", (v) => { st.lot.fee = num(v); calcLot(); });
    bind("pl-buy", (v) => { st.pl.buy = num(v); calcPL(); });
    bind("pl-sell", (v) => { st.pl.sell = num(v); calcPL(); });
    bind("pl-lots", (v) => { st.pl.lots = Math.max(0, Math.floor(num(v))); calcPL(); });
    bind("pl-fb", (v) => { st.pl.feeBuy = num(v); calcPL(); });
    bind("pl-fs", (v) => { st.pl.feeSell = num(v); calcPL(); });
    document.getElementById("dca-code").addEventListener("change", (e) => { st.dca.code = e.target.value; calcDCA(); });
    bind("dca-monthly", (v) => { st.dca.monthly = num(v); calcDCA(); });
    bind("dca-fee", (v) => { st.dca.fee = num(v); calcDCA(); });
    document.getElementById("dca-years").addEventListener("click", (e) => {
      const b = e.target.closest("[data-y]"); if (!b) return;
      st.dca.years = Number(b.dataset.y);
      document.querySelectorAll("#dca-years button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      calcDCA();
    });
    calcLot(); calcPL(); calcDCA();
    if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView(); }
  }

  T.boot("calc", render);
})();
