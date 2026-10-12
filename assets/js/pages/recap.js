/* Tumbuh — daily market recap (ringkasan.html)
   Everything here is worked out from market-data.js, so the recap is
   "written" again automatically every time the price update runs.     */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;
  const params = new URLSearchParams(location.search);
  let day = params.get("tgl") || null;          /* chosen date, null = latest */

  /* ---- numbers for one trading day ------------------------------------ */
  function dayList() {
    const h = T.market.index.history || [];
    return h.slice(-10).map((p) => p[0]).reverse();      /* newest first */
  }

  function compute(date) {
    const ih = T.market.index.history;
    const i = ih.findIndex((p) => p[0] === date);
    const latest = date === T.market.updated;
    const close = latest ? T.market.index.value : ih[i][1];
    const prev = latest ? T.market.index.prevClose : ih[i - 1][1];
    const back = (n) => (i - n >= 0 ? ((close - ih[i - n][1]) / ih[i - n][1]) * 100 : null);
    const stocks = [];
    T.stockCodes().forEach((code) => {
      const m = T.market.stocks[code], c = T.companies[code], h = m.history || [];
      let close, prev, j;
      if (latest) { close = m.price; prev = m.prevClose; j = h.length - 1; }
      else {
        j = h.findIndex((p) => p[0] === date);
        if (j < 1) return;
        close = h[j][1]; prev = h[j - 1][1];
      }
      if (!prev) return;
      const past = h.slice(Math.max(0, j - 250), j).map((p) => p[1]);
      stocks.push({
        code, name: c.name, sector: c.sector, close, change: ((close - prev) / prev) * 100,
        high: past.length > 120 && close > Math.max(...past),
        low: past.length > 120 && close < Math.min(...past),
        value: latest && m.volumeM ? m.volumeM * 1e6 * close : null,
      });
    });
    const up = stocks.filter((s) => s.change > 0.001), down = stocks.filter((s) => s.change < -0.001);
    const groups = {};
    stocks.forEach((s) => (groups[s.sector] = groups[s.sector] || []).push(s.change));
    const sectors = Object.entries(groups).map(([k, a]) => [k, a.reduce((x, y) => x + y, 0) / a.length]).sort((a, b) => b[1] - a[1]);
    return {
      date, latest, close, change: ((close - prev) / prev) * 100, week: back(5), month: back(21),
      stocks, up: up.sort((a, b) => b.change - a.change), down: down.sort((a, b) => a.change - b.change),
      flat: stocks.length - up.length - down.length, sectors,
      highs: stocks.filter((s) => s.high), lows: stocks.filter((s) => s.low),
      active: latest ? stocks.filter((s) => s.value).sort((a, b) => b.value - a.value).slice(0, 5) : [],
    };
  }

  const mood = (c) => (c <= -2 ? "bigDown" : c < -0.3 ? "down" : c <= 0.3 ? "flat" : c < 2 ? "up" : "bigUp");
  const abs = (v) => T.pct(Math.abs(v), 2, false);

  /* ---- the written summary --------------------------------------------- */
  function story(d) {
    const out = [];
    out.push(t("rcIx_" + mood(d.change), { pct: abs(d.change), v: T.num(d.close, 2) }));
    out.push(t("rcBreadth", { n: d.stocks.length, up: d.up.length, down: d.down.length, flat: d.flat }));
    if (d.up.length && d.down.length) out.push(t("rcLeaders", { a: d.up[0].code, pa: abs(d.up[0].change), b: d.down[0].code, pb: abs(d.down[0].change) }));
    else if (d.up.length) out.push(t("rcLeaderUp", { a: d.up[0].code, pa: abs(d.up[0].change) }));
    else if (d.down.length) out.push(t("rcLeaderDown", { b: d.down[0].code, pb: abs(d.down[0].change) }));
    if (d.sectors.length > 1) {
      const best = d.sectors[0], worst = d.sectors[d.sectors.length - 1];
      out.push(t("rcSectors", { a: L(T.sectors[best[0]]), pa: T.pct(best[1]), b: L(T.sectors[worst[0]]), pb: T.pct(worst[1]) }));
    }
    if (d.week != null) out.push(t(d.week >= 0 ? "rcWeekUp" : "rcWeekDown", { pct: abs(d.week) }));
    return out;
  }

  const TIPS = {
    bigDown: "kesalahan-pemula", down: "investasi-rutin", flat: "laporan-keuangan", up: "risiko-diversifikasi", bigUp: "kesalahan-pemula",
  };

  function row(s) {
    return `<div class="stock-line">
      <a class="stock-row" href="saham.html?kode=${s.code}">
        ${T.badge(s.code)}
        <span class="stock-row__name"><strong>${s.code}</strong><span>${T.esc(s.name)} · ${L(T.sectors[s.sector])}</span></span>
        <span class="stock-row__price num">${T.idr(s.close)}</span>
        <span class="stock-row__chg">${T.pill(s.change)}</span>
      </a>
      ${T.starBtn(s.code)}
    </div>`;
  }

  function render() {
    const days = dayList();
    if (!days.length) { document.getElementById("main").innerHTML = `<p>${t("rcNoData")}</p>`; return; }
    if (!days.includes(day)) day = days[0];
    const d = compute(day);
    const m = mood(d.change);
    const dateTxt = T.date(d.date);
    document.title = t("rcTitle") + " " + dateTxt + " — Tumbuh";
    const tip = T.lessons.find((l) => l.slug === TIPS[m]) || T.lessons[0];
    const ids = T.termOfDayIds;
    const dayNum = Math.floor(Date.parse(d.date) / 86400000);
    const term = T.glossary.find((g) => g.id === ids[dayNum % ids.length]) || T.glossary[0];
    const breadthUp = d.stocks.length ? (d.up.length / d.stocks.length) * 100 : 0;
    const breadthDown = d.stocks.length ? (d.down.length / d.stocks.length) * 100 : 0;
    const maxAbs = Math.max(...d.sectors.map((r) => Math.abs(r[1])), 0.5);

    document.getElementById("main").innerHTML = `
      <section class="stack" style="gap:14px;max-width:820px">
        <span class="eyebrow eyebrow--chip">${T.icon("news", 14, 'style="display:inline;vertical-align:-2px;margin-right:6px"')}${t("rcEyebrow")}</span>
        <h1 style="font-size:clamp(30px,4.5vw,46px);font-weight:800;letter-spacing:-0.03em">${t("rcHeading", { date: dateTxt })}</h1>
        <div class="rc-story">${story(d).map((p) => `<p>${p}</p>`).join("")}</div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
          ${T.shareBtn(t("rcTitle") + " " + dateTxt, story(d)[0], "ringkasan.html" + (d.latest ? "" : "?tgl=" + d.date))}
          ${!d.latest ? `<a class="btn btn--ghost" href="ringkasan.html">${t("rcLatest")}</a>` : ""}
        </div>
      </section>

      <section class="stack" style="gap:10px">
        <h2 class="rc-h">${t("rcPickDay")}</h2>
        <div class="rc-days" role="group" aria-label="${t("rcPickDay")}">
          ${days.map((x) => `<a class="chip" href="?tgl=${x}" data-day="${x}" aria-pressed="${x === d.date}">${T.dateShort(x)}</a>`).join("")}
        </div>
      </section>

      <section class="grid-auto rc-tiles">
        <div class="metric">
          <span class="metric__label">IHSG</span>
          <strong class="rc-big num">${T.num(d.close, 2)}</strong>
          <span>${T.pill(d.change)}</span>
          <small class="rc-small">${d.week != null ? t("rc5d") + " " + T.pct(d.week) : ""}${d.month != null ? " · " + t("rc1m") + " " + T.pct(d.month) : ""}</small>
        </div>
        <div class="metric">
          <span class="metric__label">${t("rcBreadthTitle")}</span>
          <strong class="rc-big num"><span style="color:var(--up)">${d.up.length}</span> <span class="rc-slash">/</span> <span style="color:var(--down)">${d.down.length}</span></strong>
          <span class="rc-breadth" aria-hidden="true"><span style="width:${breadthUp}%;background:var(--up-line)"></span><span style="width:${100 - breadthUp - breadthDown}%;background:var(--rule)"></span><span style="width:${breadthDown}%;background:var(--down-line)"></span></span>
          <small class="rc-small">${t("rcBreadthSub", { up: d.up.length, down: d.down.length, flat: d.flat })}</small>
        </div>
        ${d.up.length ? `<a class="metric card--link" href="saham.html?kode=${d.up[0].code}" style="text-decoration:none;color:inherit">
          <span class="metric__label">${t("rcTopUp")}</span>
          <strong class="rc-big">${d.up[0].code}</strong>
          <span>${T.pill(d.up[0].change)}</span>
          <small class="rc-small">${T.esc(d.up[0].name)}</small>
        </a>` : ""}
        ${d.down.length ? `<a class="metric card--link" href="saham.html?kode=${d.down[0].code}" style="text-decoration:none;color:inherit">
          <span class="metric__label">${t("rcTopDown")}</span>
          <strong class="rc-big">${d.down[0].code}</strong>
          <span>${T.pill(d.down[0].change)}</span>
          <small class="rc-small">${T.esc(d.down[0].name)}</small>
        </a>` : ""}
      </section>

      <section class="rc-cols">
        <div class="card stack" style="gap:8px">
          <h2 class="rc-h">${t("rcGainers")}</h2>
          ${d.up.length ? d.up.slice(0, 5).map(row).join("") : `<p class="rc-empty">${t("rcNoneUp")}</p>`}
        </div>
        <div class="card stack" style="gap:8px">
          <h2 class="rc-h">${t("rcLosers")}</h2>
          ${d.down.length ? d.down.slice(0, 5).map(row).join("") : `<p class="rc-empty">${t("rcNoneDown")}</p>`}
        </div>
      </section>

      <section class="rc-cols">
        <div class="card stack" style="gap:14px">
          <h2 class="rc-h">${t("rcSectorTitle")}</h2>
          <div class="stack" style="gap:10px">
          ${d.sectors.map(([k, v]) => {
            const w = (Math.abs(v) / maxAbs) * 50, up = v >= 0;
            return `<div class="sector-row">
              <span class="sector-row__name">${L(T.sectors[k])}</span>
              <span class="sector-bar"><span style="left:${up ? 50 : 50 - w}%;width:${w}%;background:${up ? "var(--up-line)" : "var(--down-line)"}"></span></span>
              <span class="sector-row__val num" style="color:${up ? "var(--up)" : "var(--down)"}">${T.pct(v)}</span>
            </div>`;
          }).join("")}
          </div>
          <small class="rc-small">${t("rcSectorNote")}</small>
        </div>
        <div class="stack" style="gap:16px">
          ${d.active.length ? `<div class="card stack" style="gap:10px">
            <h2 class="rc-h">${t("rcActive")}</h2>
            <ol class="rc-active">${d.active.map((s) => `<li><a href="saham.html?kode=${s.code}"><strong>${s.code}</strong><span class="num">${T.idr(s.value / 1e9)} ${t("rcBillion")}</span></a></li>`).join("")}</ol>
            <small class="rc-small">${t("rcActiveNote")}</small>
          </div>` : ""}
          <div class="card stack" style="gap:10px">
            <h2 class="rc-h">${t("rcExtremes")}</h2>
            <p class="rc-small" style="margin:0">${t("rcExtremesSub")}</p>
            <div><strong style="font-size:14px">${t("rcHighs")}</strong>
              <div class="rc-chips">${d.highs.length ? d.highs.map((s) => `<a class="tag" href="saham.html?kode=${s.code}" style="background:var(--up-bg);color:var(--up)">${s.code}</a>`).join("") : `<span class="rc-empty">${t("rcNone")}</span>`}</div></div>
            <div><strong style="font-size:14px">${t("rcLows")}</strong>
              <div class="rc-chips">${d.lows.length ? d.lows.map((s) => `<a class="tag" href="saham.html?kode=${s.code}" style="background:var(--down-bg);color:var(--down)">${s.code}</a>`).join("") : `<span class="rc-empty">${t("rcNone")}</span>`}</div></div>
          </div>
        </div>
      </section>

      <section class="rc-cols">
        <a class="card card--soft card--link" href="pelajaran.html?id=${tip.slug}" style="gap:10px">
          <span class="eyebrow">${t("rcMeans")}</span>
          <p style="font-size:17px;color:var(--ink-2)">${t("rcTip_" + m)}</p>
          <span class="link-arrow">${L(tip.title)}</span>
        </a>
        <div class="card card--dark stack" style="gap:10px">
          <span class="eyebrow" style="color:#AEB8C8">${t("termEyebrow")}</span>
          <h3 style="font-size:24px;font-weight:800">${L(term.term)}</h3>
          <p style="color:#E2E6EC">${L(term.def)}</p>
          <a class="link-arrow" style="color:#fff;align-self:flex-start" href="kamus.html#${term.id}">${t("openGlossary")}</a>
        </div>
      </section>

      <p class="calc-note">${t("rcFoot")}</p>`;
  }

  /* change day without reloading */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-day]");
    if (!a) return;
    e.preventDefault();
    day = a.dataset.day;
    const latest = dayList()[0];
    history.replaceState(null, "", day === latest ? location.pathname : "?tgl=" + day);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  T.boot("recap", render);
})();
