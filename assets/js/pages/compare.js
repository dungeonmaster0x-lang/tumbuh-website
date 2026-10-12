/* Tumbuh — compare two stocks (bandingkan.html?a=BBCA&b=BBRI) */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;
  const params = new URLSearchParams(location.search);
  const RANGES = { "1M": 22, "6M": 126, "1Y": 250, "5Y": 1250 };
  const COLORS = ["var(--cmp-a)", "var(--cmp-b)"];          /* blue + orange: easy to tell apart, not "up/down" colours */
  const codes = T.stockCodes();
  let a = (params.get("a") || "BBCA").toUpperCase();
  let b = (params.get("b") || "BBRI").toUpperCase();
  if (!codes.includes(a)) a = codes[0];
  if (!codes.includes(b) || b === a) b = codes.find((c) => c !== a);
  let range = "1Y";

  function updateUrl() {
    history.replaceState(null, "", `bandingkan.html?a=${a}&b=${b}`);
  }

  /* Both price histories over the same period, as "value of Rp1,000,000 invested" */
  function series() {
    const ha = T.history(a, RANGES[range]), hb = T.history(b, RANGES[range]);
    const n = Math.min(ha.points.length, hb.points.length);
    const cut = (h) => ({ pts: h.points.slice(-n), dates: h.dates ? h.dates.slice(-n) : null, sample: h.sample });
    const A = cut(ha), B = cut(hb);
    const grow = (pts) => pts.map((p) => (p / pts[0]) * 1000000);
    return { a: grow(A.pts), b: grow(B.pts), dates: A.dates || B.dates, sample: A.sample || B.sample };
  }

  function drawChart() {
    const s = series();
    const el = document.getElementById("cmp-chart");
    const W = 800, H = 280, pad = 14;
    const all = s.a.concat(s.b, [1000000]);
    const lo = Math.min(...all), hi = Math.max(...all);
    const x = (i) => (i / (s.a.length - 1)) * W;
    const y = (v) => pad + (H - 2 * pad) * (1 - (v - lo) / (hi - lo || 1));
    const path = (pts) => pts.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
    el.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${T.esc(t("cmpChartLabel", { a, b }))}">
        <line x1="0" x2="${W}" y1="${y(1000000)}" y2="${y(1000000)}" stroke="var(--rule)" stroke-dasharray="4 5" vector-effect="non-scaling-stroke"/>
        <path d="${path(s.a)}" fill="none" stroke="${COLORS[0]}" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
        <path d="${path(s.b)}" fill="none" stroke="${COLORS[1]}" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
        <line class="cursor" x1="0" x2="0" y1="0" y2="${H}" stroke="var(--ink)" stroke-opacity="0" vector-effect="non-scaling-stroke"/>
      </svg>
      <span class="chart__label num" style="top:0">${T.idr(hi)}</span>
      <span class="chart__label num" style="bottom:0">${T.idr(lo)}</span>
      <span class="chart__tip num" aria-hidden="true"></span>`;
    const svg = el.querySelector("svg"), tip = el.querySelector(".chart__tip"), cursor = el.querySelector(".cursor");
    svg.addEventListener("pointermove", (e) => {
      const r = svg.getBoundingClientRect();
      const ratio = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
      const i = Math.round(ratio * (s.a.length - 1));
      tip.textContent = `${a} ${T.idr(s.a[i])} · ${b} ${T.idr(s.b[i])}` + (s.dates ? " · " + T.date(s.dates[i]) : "");
      tip.style.left = Math.min(Math.max(ratio * r.width, 130), r.width - 130) + "px";
      tip.classList.add("is-on");
      cursor.setAttribute("x1", x(i)); cursor.setAttribute("x2", x(i)); cursor.setAttribute("stroke-opacity", "0.35");
    });
    svg.addEventListener("pointerleave", () => { tip.classList.remove("is-on"); cursor.setAttribute("stroke-opacity", "0"); });

    const endA = s.a[s.a.length - 1], endB = s.b[s.b.length - 1];
    document.getElementById("cmp-story").innerHTML = `
      <p>${t("cmpStory", { range: t("w" + range) })}</p>
      <div class="cmp-outcomes">
        ${[[a, endA, 0], [b, endB, 1]].map(([c, v, k]) => `
          <div class="fact" style="background:var(--surface);border:1px solid var(--line)">
            <span><span class="dot" style="background:${COLORS[k]}"></span>${c}</span>
            <span class="num">${T.idr(v)}</span>
            <span style="font-size:14px;font-weight:700;color:${v >= 1000000 ? "var(--up)" : "var(--down)"}">${T.pct((v / 1000000 - 1) * 100, 1)}</span>
          </div>`).join("")}
      </div>
      ${s.sample ? `<span class="tag">${t("sampleChart")}</span>` : ""}`;
    document.getElementById("cmp-start").textContent = t("ago" + range);
    document.querySelectorAll("#cmp-ranges button").forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.r === range)));
  }

  /* Side-by-side numbers, each with a plain-language note */
  function rows(A, B) {
    const cap = (s) => s.marketCapT == null ? "—" : (T.lang() === "id" ? "Rp" : "IDR ") + T.num(s.marketCapT, s.marketCapT < 10 ? 1 : 0) + " T";
    const pctOrDash = (v) => (v == null ? "—" : T.pct(v, 1, false));
    const roe = (v) => (v == null ? "—" : (v < 0 ? "−" : "") + T.pct(Math.abs(v), 1, false));
    const r1y = (s) => { const h = T.history(s.code, 250).points; return ((h[h.length - 1] - h[0]) / h[0]) * 100; };
    return [
      { k: "colPrice", va: T.idr(A.price), vb: T.idr(B.price), note: "cmpNotePrice" },
      { k: "cmpLot", va: T.idr(A.price * 100), vb: T.idr(B.price * 100), note: "cmpNoteLot" },
      { k: "cmpToday", va: T.pill(A.change, "sm"), vb: T.pill(B.change, "sm"), note: "cmpNoteToday" },
      { k: "cmp1Y", va: T.pill(r1y(A), "sm"), vb: T.pill(r1y(B), "sm"), note: "cmpNote1Y" },
      { k: "cmpRangePos", va: Math.round(T.rangePos(A) * 100) + "%", vb: Math.round(T.rangePos(B) * 100) + "%", note: "cmpNoteRange" },
      { k: "cmpCap", va: cap(A), vb: cap(B), note: "cmpNoteCap", g: "kapitalisasi-pasar" },
      { k: "cmpPE", va: A.pe == null ? "—" : T.num(A.pe, 1) + "x", vb: B.pe == null ? "—" : T.num(B.pe, 1) + "x", note: "cmpNotePE", g: "per" },
      { k: "cmpPBV", va: A.pbv == null ? "—" : T.num(A.pbv, 2) + "x", vb: B.pbv == null ? "—" : T.num(B.pbv, 2) + "x", note: "cmpNotePBV", g: "pbv" },
      { k: "colYield", va: pctOrDash(A.divYield), vb: pctOrDash(B.divYield), note: "cmpNoteYield", g: "imbal-hasil-dividen" },
      { k: "cmpROE", va: roe(A.roe), vb: roe(B.roe), note: "cmpNoteROE", g: "roe" },
      { k: "sector", va: L(T.sectors[A.sector]), vb: L(T.sectors[B.sector]), note: A.sector === B.sector ? "cmpNoteSameSector" : "cmpNoteDiffSector" }
    ];
  }

  function picker(id, value, other, k) {
    const groups = Object.keys(T.sectors).map((sk) => {
      const list = T.allStocks().filter((s) => s.sector === sk).sort((x, y) => x.code.localeCompare(y.code));
      if (!list.length) return "";
      return `<optgroup label="${T.esc(L(T.sectors[sk]))}">${list.map((s) =>
        `<option value="${s.code}" ${s.code === value ? "selected" : ""} ${s.code === other ? "disabled" : ""}>${s.code} — ${T.esc(s.name)}</option>`).join("")}</optgroup>`;
    }).join("");
    return `<label class="cmp-pick">
      <span><span class="dot" style="background:${COLORS[k]}"></span>${t(k === 0 ? "cmpFirst" : "cmpSecond")}</span>
      <select id="${id}">${groups}</select>
    </label>`;
  }

  function render() {
    const A = T.stock(a), B = T.stock(b);
    document.title = `${a} vs ${b} — ${t("cmpTitle")} — Tumbuh`;
    const head = (s, k) => `
      <a class="card card--link cmp-head" href="saham.html?kode=${s.code}">
        <span style="display:flex;align-items:center;gap:12px">${T.badge(s.code)}
          <span class="stack" style="gap:2px;min-width:0"><strong style="font-size:18px"><span class="dot" style="background:${COLORS[k]}"></span>${s.code}</strong>
          <span style="font-size:14px;color:var(--muted-2)">${T.esc(s.name)}</span></span></span>
        <span style="display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 12px"><span class="num" style="font-size:30px;font-weight:800;letter-spacing:-0.02em">${T.idr(s.price)}</span>${T.pill(s.change)}</span>
        <span style="font-size:14px;color:var(--muted)">${L(s.about)}</span>
      </a>`;

    document.getElementById("main").innerHTML = `
      <section class="stack" style="gap:12px;max-width:760px">
        <h1 style="font-size:clamp(32px,4.5vw,48px);font-weight:800;letter-spacing:-0.03em">${t("cmpTitle")}</h1>
        <p class="lead" style="font-size:18px">${t("cmpSub")}</p>
      </section>

      <section class="card cmp-pickers">
        ${picker("pick-a", a, b, 0)}
        <button type="button" class="btn btn--ghost" id="swap" aria-label="${t("cmpSwap")}" title="${t("cmpSwap")}">⇄</button>
        ${picker("pick-b", b, a, 1)}
      </section>

      <div class="cmp-grid">${head(A, 0)}${head(B, 1)}</div>

      <section class="card stack" style="gap:16px">
        <div class="section-head" style="align-items:center">
          <h2 style="font-size:22px;font-weight:800">${t("cmpChartTitle")}</h2>
          <div class="segmented" id="cmp-ranges" role="group" aria-label="${t("cmpChartTitle")}">
            ${Object.keys(RANGES).map((r) => `<button type="button" data-r="${r}" aria-pressed="false">${t("r" + r)}</button>`).join("")}
          </div>
        </div>
        <div id="cmp-story" class="stack" style="gap:12px;color:var(--ink-2)"></div>
        <div class="chart" id="cmp-chart"></div>
        <div class="chart__axis"><span id="cmp-start"></span><span>${t("now")}</span></div>
        <p style="font-size:14px;color:var(--muted);padding-top:12px;border-top:1px solid var(--tint)">${t("cmpPastNote")}</p>
      </section>

      <section class="card stack" style="gap:6px">
        <h2 style="font-size:22px;font-weight:800;margin-bottom:6px">${t("cmpNumbers")}</h2>
        <div class="cmp-table" role="table" aria-label="${t("cmpNumbers")}">
          <div class="cmp-row cmp-row--head" role="row">
            <span role="columnheader"></span>
            <span role="columnheader"><span class="dot" style="background:${COLORS[0]}"></span>${a}</span>
            <span role="columnheader"><span class="dot" style="background:${COLORS[1]}"></span>${b}</span>
          </div>
          ${rows(A, B).map((r) => `
          <div class="cmp-row" role="row">
            <span role="rowheader" class="cmp-label">${t(r.k)}${r.g ? ` <a href="kamus.html#${r.g}" class="cmp-q" aria-label="${t("explain")}: ${t(r.k)}">?</a>` : ""}</span>
            <span role="cell" class="num cmp-val">${r.va}</span>
            <span role="cell" class="num cmp-val">${r.vb}</span>
            <span class="cmp-note">${t(r.note)}</span>
          </div>`).join("")}
        </div>
      </section>

      <div class="note-dashed">${T.icon("info", 20)}<span>${t("cmpDisclaimer")}</span></div>`;

    drawChart();
    if (!render.tracked) { render.tracked = true; T.track("compare"); }
    document.getElementById("cmp-ranges").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-r]");
      if (btn) { range = btn.dataset.r; drawChart(); }
    });
    document.getElementById("pick-a").addEventListener("change", (e) => { a = e.target.value; updateUrl(); render(); document.getElementById("pick-a").focus(); });
    document.getElementById("pick-b").addEventListener("change", (e) => { b = e.target.value; updateUrl(); render(); document.getElementById("pick-b").focus(); });
    document.getElementById("swap").addEventListener("click", () => { [a, b] = [b, a]; updateUrl(); render(); document.getElementById("swap").focus(); });
  }

  T.boot("compare", render);
})();
