/* Tumbuh — practice portfolio (latihan.html)
   Pretend money, real closing prices. Everything is saved in this browser only. */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;
  const KEY = "tumbuh-practice";
  const START_CASH = 100000000;            /* Rp100 juta */
  const FEE_BUY = 0.0015, FEE_SELL = 0.0025;   /* example fees; sell includes the 0.1% tax */
  const params = new URLSearchParams(location.search);

  let ui = { code: (params.get("kode") || "").toUpperCase(), side: "buy", lots: 1, msg: null, confirmReset: false };

  /* ---- saved state ------------------------------------------------------ */
  function fresh() {
    return { v: 1, cash: START_CASH, holdings: {}, trades: [], startDate: T.market.updated, startIhsg: T.market.index.value, snapshots: [] };
  }
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) return s; } catch (e) { /* ignore */ }
    return null;
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* ignore */ } }
  let S = load();

  const price = (code) => { const s = T.stock(code); return s ? s.price : 0; };
  function value(s) {
    let stocks = 0;
    Object.entries(s.holdings).forEach(([c, h]) => { stocks += h.shares * price(c); });
    return { stocks, total: stocks + s.cash };
  }
  /* remember the portfolio's value once per trading day, for the progress chart */
  function snapshot() {
    if (!S) return;
    const d = T.market.updated;
    const v = value(S).total;
    const last = S.snapshots[S.snapshots.length - 1];
    if (last && last.d === d) last.v = v; else S.snapshots.push({ d, v, i: T.market.index.value });
    if (S.snapshots.length > 400) S.snapshots.shift();
    save(S);
  }

  /* ---- trading ---------------------------------------------------------- */
  function preview() {
    const p = price(ui.code), shares = ui.lots * 100, gross = p * shares;
    if (ui.side === "buy") {
      const fee = gross * FEE_BUY;
      return { p, shares, gross, fee, total: gross + fee, ok: ui.lots > 0 && gross + fee <= S.cash, reason: gross + fee > S.cash ? "tradeNoCash" : null };
    }
    const held = (S.holdings[ui.code] || { shares: 0 }).shares;
    const fee = gross * FEE_SELL;
    return { p, shares, gross, fee, total: gross - fee, ok: ui.lots > 0 && shares <= held, reason: shares > held ? "tradeNoShares" : null };
  }

  function trade() {
    const pv = preview();
    if (!ui.code || !pv.ok) return;
    const h = S.holdings[ui.code] || { shares: 0, cost: 0 };
    if (ui.side === "buy") {
      S.cash -= pv.total;
      h.shares += pv.shares; h.cost += pv.total;          /* cost includes fees */
      S.holdings[ui.code] = h;
    } else {
      const avg = h.cost / h.shares;
      const realised = pv.total - avg * pv.shares;
      S.cash += pv.total;
      h.cost -= avg * pv.shares; h.shares -= pv.shares;
      if (h.shares <= 0) delete S.holdings[ui.code]; else S.holdings[ui.code] = h;
      S.realised = (S.realised || 0) + realised;
    }
    S.trades.unshift({ side: ui.side, code: ui.code, lots: ui.lots, price: pv.p, total: pv.total, d: T.market.updated });
    if (S.trades.length > 200) S.trades.pop();
    ui.msg = { ok: true, text: t(ui.side === "buy" ? "tradeBought" : "tradeSold", { lots: ui.lots, code: ui.code, price: T.idr(pv.p) }) };
    snapshot();
    render();
  }

  /* ---- drawing ---------------------------------------------------------- */
  function stockOptions(selected) {
    return `<option value="" ${selected ? "" : "selected"} disabled>${t("tradePick")}</option>` + Object.keys(T.sectors).map((sk) => {
      const list = T.allStocks().filter((s) => s.sector === sk).sort((x, y) => x.code.localeCompare(y.code));
      if (!list.length) return "";
      return `<optgroup label="${T.esc(L(T.sectors[sk]))}">${list.map((s) =>
        `<option value="${s.code}" ${s.code === selected ? "selected" : ""}>${s.code} — ${T.esc(s.name)} · ${T.idr(s.price)}</option>`).join("")}</optgroup>`;
    }).join("");
  }

  function progressChart() {
    const snaps = S.snapshots;
    if (snaps.length < 2) return `<p class="calc-say" style="margin:0">${t("pfChartSoon")}</p>`;
    const W = 800, H = 160, pad = 10;
    const vs = snaps.map((s) => (s.v / START_CASH - 1) * 100);
    const is = snaps.map((s) => (s.i / S.startIhsg - 1) * 100);
    const lo = Math.min(0, ...vs, ...is), hi = Math.max(0, ...vs, ...is);
    const x = (i) => (i / (snaps.length - 1)) * W;
    const y = (v) => pad + (H - 2 * pad) * (1 - (v - lo) / (hi - lo || 1));
    const path = (arr) => arr.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${T.esc(t("pfChartLabel"))}" style="width:100%;height:150px">
      <line x1="0" x2="${W}" y1="${y(0)}" y2="${y(0)}" stroke="#C9C6BB" stroke-dasharray="4 5" vector-effect="non-scaling-stroke"/>
      <path d="${path(is)}" fill="none" stroke="#8A919C" stroke-width="2" vector-effect="non-scaling-stroke"/>
      <path d="${path(vs)}" fill="none" stroke="var(--accent)" stroke-width="2.6" vector-effect="non-scaling-stroke"/>
    </svg>
    <div class="calc-legend"><span><i style="background:var(--accent)"></i>${t("pfYou")}</span><span><i style="background:#8A919C"></i>IHSG</span><span>${T.date(snaps[0].d)} → ${T.date(snaps[snaps.length - 1].d)}</span></div>`;
  }

  /* the part of the trade ticket that changes while typing */
  function ticketBottom() {
    const pv = ui.code ? preview() : null;
    return `
            ${pv ? `
            <div class="calc-res" style="padding:14px 16px">
              ${[[t("tradePrice"), T.idr(pv.p)], [t("tradeValue"), T.idr(pv.gross)], [t(ui.side === "buy" ? "calcFeeBuy" : "calcFeeSell"), T.idr(pv.fee)], [t(ui.side === "buy" ? "tradePay" : "tradeGet"), T.idr(pv.total)]].map(([k, val], i) =>
                `<div class="calc-out ${i === 3 ? "calc-out--main" : ""}" style="${i === 3 ? "border:0" : ""}"><span>${k}</span><strong class="num" style="${i === 3 ? "font-size:20px" : ""}">${val}</strong></div>`).join("")}
            </div>
            ${pv.reason ? `<p class="pf-msg pf-msg--bad" role="alert">${t(pv.reason)}</p>` : ""}` : ""}
            <button type="button" class="btn ${ui.side === "buy" ? "btn--primary" : "btn--dark"} btn--lg" id="tr-go" ${pv && pv.ok ? "" : "disabled"}>${t(ui.side === "buy" ? "tradeBuyNow" : "tradeSellNow")}</button>
            ${ui.msg ? `<p class="pf-msg ${ui.msg.ok ? "pf-msg--ok" : "pf-msg--bad"}" role="status">${ui.msg.text}</p>` : ""}
`;
  }
  function bindGo() {
    document.getElementById("tr-go").addEventListener("click", () => { trade(); const b = document.getElementById("tr-go"); if (b) b.focus(); });
  }

  function intro() {
    document.getElementById("main").innerHTML = `
      <section class="pf-intro card">
        <div class="stack" style="gap:16px;max-width:640px">
          <span class="eyebrow eyebrow--chip">${t("pfEyebrow")}</span>
          <h1 style="font-size:clamp(32px,4.5vw,48px);font-weight:800;letter-spacing:-0.03em">${t("pfTitle")}</h1>
          <p class="lead" style="font-size:18px">${t("pfIntro")}</p>
          <ul class="pf-rules">
            <li>${T.icon("check", 18)}<span>${t("pfRule1")}</span></li>
            <li>${T.icon("check", 18)}<span>${t("pfRule2", { date: T.date(T.market.updated) })}</span></li>
            <li>${T.icon("check", 18)}<span>${t("pfRule3")}</span></li>
            <li>${T.icon("check", 18)}<span>${t("pfRule4")}</span></li>
          </ul>
          <button type="button" class="btn btn--primary btn--lg" id="pf-start" style="align-self:flex-start">${t("pfStart")} ${T.icon("arrow", 18)}</button>
        </div>
        <div class="pf-coin" aria-hidden="true"><span>Rp100</span><small>juta</small></div>
      </section>`;
    document.getElementById("pf-start").addEventListener("click", () => {
      S = fresh(); snapshot(); render();
      const sel = document.getElementById("tr-code"); if (sel) sel.focus();
    });
  }

  function render() {
    document.title = t("pfTitle") + " — Tumbuh";
    if (!S) return intro();
    snapshot();
    const v = value(S), pl = v.total - START_CASH, plPct = (pl / START_CASH) * 100;
    const ihsgPct = (T.market.index.value / S.startIhsg - 1) * 100;
    const rows = Object.entries(S.holdings).map(([c, h]) => {
      const s = T.stock(c), val = h.shares * s.price, avg = h.cost / h.shares, rpl = val - h.cost;
      return { c, s, h, val, avg, rpl, rplPct: (rpl / h.cost) * 100, weight: v.total ? (val / v.total) * 100 : 0 };
    }).sort((a, b) => b.val - a.val);
    const biggest = rows[0];
    const sectorsHeld = new Set(rows.map((r) => r.s.sector)).size;
    const held = ui.code && S.holdings[ui.code] ? S.holdings[ui.code].shares / 100 : 0;

    document.getElementById("main").innerHTML = `
      <section class="stack" style="gap:8px">
        <span class="eyebrow">${t("pfEyebrow")}</span>
        <h1 style="font-size:clamp(28px,4vw,40px);font-weight:800;letter-spacing:-0.03em">${t("pfTitle")}</h1>
        <p style="color:var(--muted)">${t("pfSince", { date: T.date(S.startDate), prices: T.date(T.market.updated) })}</p>
      </section>

      <div class="summary-strip">
        <div class="fact pf-fact"><span>${t("pfTotal")}</span><span class="num">${T.idr(v.total)}</span></div>
        <div class="fact pf-fact"><span>${t("pfResult")}</span><span class="num" style="color:${pl >= 0 ? "var(--up)" : "var(--down)"}">${pl >= 0 ? "+" : "−"}${T.idr(Math.abs(pl))}<small> ${T.pct(plPct, 2)}</small></span></div>
        <div class="fact pf-fact"><span>${t("pfVsIhsg")}</span><span class="num" style="color:${ihsgPct >= 0 ? "var(--up)" : "var(--down)"}">${T.pct(ihsgPct, 2)}</span></div>
        <div class="fact pf-fact"><span>${t("pfCash")}</span><span class="num">${T.idr(S.cash)}</span></div>
      </div>

      <div class="split">
        <div class="split__main">
          <section class="card stack" style="gap:12px;padding-bottom:12px">
            <h2 style="font-size:22px;font-weight:800">${t("pfHoldings")}</h2>
            ${rows.length ? `
            <div class="pf-table" role="table" aria-label="${t("pfHoldings")}">
              <div class="pf-row pf-row--head" role="row"><span role="columnheader">${t("colStock")}</span><span role="columnheader">${t("pfLotsAvg")}</span><span role="columnheader">${t("pfValue")}</span><span role="columnheader">${t("pfPL")}</span><span role="columnheader"><span class="sr-only">${t("pfActions")}</span></span></div>
              ${rows.map((r) => `
              <div class="pf-row" role="row">
                <a role="cell" href="saham.html?kode=${r.c}" class="pf-stock">${T.badge(r.c)}<span class="stack" style="gap:1px;min-width:0"><strong>${r.c}</strong><span>${T.num(r.weight, 0)}% ${t("pfOfTotal")}</span></span></a>
                <span role="cell" class="num">${T.num(r.h.shares / 100)} lot<small>${t("pfAvg")} ${T.idr(Math.round(r.avg / (1 + FEE_BUY)))}</small></span>
                <span role="cell" class="num">${T.idr(r.val)}<small>${t("pfNow")} ${T.idr(r.s.price)}</small></span>
                <span role="cell" class="num" style="color:${r.rpl >= 0 ? "var(--up)" : "var(--down)"}">${r.rpl >= 0 ? "+" : "−"}${T.idr(Math.abs(r.rpl))}<small>${T.pct(r.rplPct, 1)}</small></span>
                <span role="cell" class="pf-actions">
                  <button type="button" class="btn btn--ghost pf-mini" data-act="buy" data-code="${r.c}">${t("tradeBuy")}</button>
                  <button type="button" class="btn btn--ghost pf-mini" data-act="sell" data-code="${r.c}">${t("tradeSell")}</button>
                </span>
              </div>`).join("")}
            </div>` : `<div class="empty-state" style="padding:24px 8px">${t("pfEmpty")}</div>`}
          </section>

          <section class="card stack" style="gap:10px">
            <h2 style="font-size:20px;font-weight:800">${t("pfProgress")}</h2>
            ${progressChart()}
          </section>

          ${rows.length ? `
          <section class="card stack" style="gap:10px">
            <h2 style="font-size:20px;font-weight:800">${t("pfCheckTitle")}</h2>
            ${biggest && biggest.weight > 40 ? `<div class="risk-item">${T.icon("warn", 20)}<span>${t("pfTipConcentrated", { code: biggest.c, pct: T.num(biggest.weight, 0) })}</span></div>` : `<div class="risk-item">${T.icon("check", 20, 'class="ok"')}<span>${t("pfTipSpread")}</span></div>`}
            ${sectorsHeld < 3 ? `<div class="risk-item">${T.icon("warn", 20)}<span>${t("pfTipSectors", { n: sectorsHeld })}</span></div>` : `<div class="risk-item">${T.icon("check", 20, 'class="ok"')}<span>${t("pfTipSectorsOk", { n: sectorsHeld })}</span></div>`}
            ${S.cash / v.total > 0.9 ? `<div class="risk-item">${T.icon("info", 20)}<span>${t("pfTipCash")}</span></div>` : ""}
          </section>` : ""}

          ${S.trades.length ? `
          <section class="card stack" style="gap:6px">
            <h2 style="font-size:20px;font-weight:800;margin-bottom:4px">${t("pfHistory")}</h2>
            ${S.trades.slice(0, 15).map((x) => `
              <div class="pf-trade"><span class="tag ${x.side === "buy" ? "" : "tag--dark"}">${t(x.side === "buy" ? "tradeBuy" : "tradeSell")}</span>
              <span><strong>${x.code}</strong> · ${x.lots} lot @ ${T.idr(x.price)}</span>
              <span class="num">${x.side === "buy" ? "−" : "+"}${T.idr(x.total)}</span>
              <small>${T.date(x.d)}</small></div>`).join("")}
          </section>` : ""}

          <div>
            ${ui.confirmReset
              ? `<div class="note-dashed" style="align-items:center;flex-wrap:wrap"><span style="flex:1">${t("pfResetAsk")}</span><button type="button" class="btn btn--dark" id="pf-reset-yes">${t("pfResetYes")}</button><button type="button" class="btn btn--ghost" id="pf-reset-no">${t("pfResetNo")}</button></div>`
              : `<button type="button" class="btn btn--ghost" id="pf-reset">${t("pfReset")}</button>`}
          </div>
        </div>

        <aside class="split__side">
          <section class="card stack pf-ticket" style="gap:14px" aria-labelledby="tr-h">
            <h2 id="tr-h" style="font-size:20px;font-weight:800">${t("tradeTitle")}</h2>
            <div class="segmented" role="group" aria-label="${t("tradeTitle")}" id="tr-side">
              <button type="button" data-side="buy" aria-pressed="${ui.side === "buy"}" style="flex:1">${t("tradeBuy")}</button>
              <button type="button" data-side="sell" aria-pressed="${ui.side === "sell"}" style="flex:1">${t("tradeSell")}</button>
            </div>
            <label class="calc-field" for="tr-code"><span>${t("calcStock")}</span><select id="tr-code">${stockOptions(ui.code)}</select></label>
            <label class="calc-field" for="tr-lots"><span>${t("calcLotsIn")}${ui.side === "sell" && ui.code ? ` <small>(${t("tradeYouHave", { n: held })})</small>` : ""}</span>
              <span class="calc-input"><input id="tr-lots" type="number" inputmode="numeric" min="1" step="1" value="${ui.lots}"><span class="calc-affix">lot</span></span>
            </label>
            <div id="tr-bottom" class="stack" style="gap:14px">${ticketBottom()}</div>
            <small class="calc-note">${t("tradeNote", { date: T.date(T.market.updated) })}</small>
          </section>
          <a class="card card--soft card--link" href="pelajaran.html?id=risiko-diversifikasi" style="gap:6px">
            <span class="eyebrow">${t("relatedLesson")}</span>
            <strong style="font-size:17px">${L(T.lessons.find((l) => l.slug === "risiko-diversifikasi").title)}</strong>
          </a>
        </aside>
      </div>

      <div class="note-dashed">${T.icon("info", 20)}<span>${t("pfDisclaimer")}</span></div>`;

    /* events */
    document.querySelectorAll("#tr-side [data-side]").forEach((b) => b.addEventListener("click", () => { ui.side = b.dataset.side; ui.msg = null; render(); document.querySelector(`#tr-side [data-side="${ui.side}"]`).focus(); }));
    document.getElementById("tr-code").addEventListener("change", (e) => { ui.code = e.target.value; ui.msg = null; render(); document.getElementById("tr-code").focus(); });
    const lotsEl = document.getElementById("tr-lots");
    lotsEl.addEventListener("input", () => {
      ui.lots = Math.max(0, Math.floor(Number(lotsEl.value) || 0)); ui.msg = null;
      document.getElementById("tr-bottom").innerHTML = ticketBottom(); bindGo();
    });
    lotsEl.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); trade(); } });
    bindGo();
    document.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => {
      ui.side = b.dataset.act; ui.code = b.dataset.code; ui.lots = 1; ui.msg = null; render();
      document.getElementById("tr-lots").focus();
    }));
    const r = document.getElementById("pf-reset");
    if (r) r.addEventListener("click", () => { ui.confirmReset = true; render(); document.getElementById("pf-reset-no").focus(); });
    const yes = document.getElementById("pf-reset-yes");
    if (yes) {
      yes.addEventListener("click", () => { try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } S = null; ui = { code: "", side: "buy", lots: 1, msg: null, confirmReset: false }; render(); });
      document.getElementById("pf-reset-no").addEventListener("click", () => { ui.confirmReset = false; render(); });
    }
  }

  T.boot("practice", render);
})();
