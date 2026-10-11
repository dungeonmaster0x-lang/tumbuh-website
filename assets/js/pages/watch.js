/* Tumbuh — watchlist (pantau.html). Starred stocks are saved in this browser only. */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;
  const SUGGEST = ["BBCA", "TLKM", "ASII", "ICBP", "AMRT", "ANTM", "GOTO", "UNVR"];
  let sort = "added";

  function sorted(list) {
    const out = list.slice();
    if (sort === "gain") out.sort((a, b) => b.change - a.change);
    if (sort === "loss") out.sort((a, b) => a.change - b.change);
    if (sort === "az") out.sort((a, b) => a.code.localeCompare(b.code));
    return out;
  }

  function render() {
    document.title = t("watchTitle") + " — Tumbuh";
    const list = T.watchlist().map(T.stock).filter(Boolean);
    const main = document.getElementById("main");

    const head = `
      <section class="stack" style="gap:12px;max-width:760px">
        <h1 style="font-size:clamp(32px,4.5vw,48px);font-weight:800;letter-spacing:-0.03em">${t("watchTitle")}</h1>
        <p class="lead" style="font-size:18px">${t("watchSub")}</p>
      </section>`;

    if (!list.length) {
      main.innerHTML = head + `
        <section class="card stack" style="gap:18px;align-items:flex-start">
          <span class="icon-tile" style="background:var(--turmeric-soft);color:#B07A10">${T.icon("star", 24)}</span>
          <h2 style="font-size:22px;font-weight:800">${t("watchEmpty")}</h2>
          <p style="color:var(--muted);max-width:560px">${t("watchEmptySub")}</p>
          <div class="grid-auto" style="width:100%;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px">
            ${SUGGEST.map(T.stock).filter(Boolean).map((s) => `
              <div class="stock-line" style="border:1px solid var(--line);border-radius:14px;padding-right:4px">
                <a class="stock-row" href="saham.html?kode=${s.code}" style="padding:10px">
                  ${T.badge(s.code)}
                  <span class="stock-row__name"><strong>${s.code}</strong><span>${T.esc(s.name)}</span></span>
                </a>
                ${T.starBtn(s.code)}
              </div>`).join("")}
          </div>
          <a class="btn btn--ghost" href="penyaring.html">${t("addMore")}</a>
        </section>`;
      return;
    }

    const up = list.filter((s) => s.change > 0).length;
    const down = list.filter((s) => s.change < 0).length;
    const avg = list.reduce((a, s) => a + s.change, 0) / list.length;

    main.innerHTML = head + `
      <div class="summary-strip">
        <div class="fact" style="background:var(--surface);border:1px solid var(--line)"><span>${t("watchCount")}</span><span class="num">${list.length}</span></div>
        <div class="fact" style="background:var(--surface);border:1px solid var(--line)"><span>${t("watchUp")}</span><span class="num" style="color:var(--up)">${up}</span></div>
        <div class="fact" style="background:var(--surface);border:1px solid var(--line)"><span>${t("watchDown")}</span><span class="num" style="color:var(--down)">${down}</span></div>
        <div class="fact" style="background:var(--surface);border:1px solid var(--line)"><span>${t("watchAvg")}</span><span class="num" style="color:${avg >= 0 ? "var(--up)" : "var(--down)"}">${T.pct(avg)}</span></div>
      </div>

      <section class="card stack" style="gap:12px;padding-bottom:12px">
        <div class="section-head" style="align-items:center">
          <h2 style="font-size:22px;font-weight:800">${t("watchTitle")}</h2>
          <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
            <label for="watch-sort" style="font-size:14px;font-weight:600;color:var(--muted)">${t("sortBy")}</label>
            <select id="watch-sort" style="height:44px;border-radius:12px;border:1px solid var(--line-strong);padding:0 12px;background:var(--surface);font-weight:600">
              ${[["added", "sortAdded"], ["gain", "sortGain"], ["loss", "sortLoss"], ["az", "sortAZ"]].map(([k, key]) => `<option value="${k}" ${k === sort ? "selected" : ""}>${t(key)}</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="stock-table">
          <div class="stock-table__head"><span>${t("colStock")}</span><span class="col-r"><span>${t("colPrice")}</span><span>${t("colChange")}</span></span></div>
          ${sorted(list).map((s) => {
            const h = T.history(s.code, 22);
            return `
            <div class="stock-line">
              <a class="stock-row" href="saham.html?kode=${s.code}">
                ${T.badge(s.code)}
                <span class="stock-row__name"><strong>${s.code}</strong><span>${T.esc(s.name)} · ${L(T.sectors[s.sector])}</span></span>
                ${T.sparkline(h.points, s.code + " — " + t("col1M"))}
                <span class="stock-row__price num">${T.idr(s.price)}</span>
                <span class="stock-row__chg">${T.pill(s.change)}</span>
              </a>
              ${T.starBtn(s.code)}
            </div>`;
          }).join("")}
        </div>
        <a class="link-arrow" href="penyaring.html" style="align-self:flex-start;padding:8px 12px">${t("addMore")}</a>
      </section>

      <div class="note-dashed">${T.icon("info", 20)}<span>${t("watchTip")}</span></div>`;

    document.getElementById("watch-sort").addEventListener("change", (e) => { sort = e.target.value; render(); });
  }

  /* Re-draw after a star is pressed (removing a stock or adding the first one) */
  T.onWatch(() => setTimeout(render, 0));
  T.boot("watch", render);
})();
