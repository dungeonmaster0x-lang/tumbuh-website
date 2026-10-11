/* Tumbuh — simple screener (penyaring.html?pilih=big,dividend&sektor=bank) */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;
  const params = new URLSearchParams(location.search);
  const chosen = new Set((params.get("pilih") || "").split(",").filter((k) => T.presetMatch[k]));
  let sector = T.sectors[params.get("sektor")] ? params.get("sektor") : "all";

  function updateUrl() {
    const p = new URLSearchParams();
    if (chosen.size) p.set("pilih", [...chosen].join(","));
    if (sector !== "all") p.set("sektor", sector);
    history.replaceState(null, "", "penyaring.html" + (p.toString() ? "?" + p : ""));
  }

  function renderResults() {
    const list = T.allStocks()
      .filter((s) => [...chosen].every((k) => T.presetMatch[k](s)))
      .filter((s) => sector === "all" || s.sector === sector)
      .sort((a, b) => (b.marketCapT || 0) - (a.marketCapT || 0));
    document.getElementById("count").textContent = t("results", { n: list.length });
    document.getElementById("results").innerHTML = list.length ? `
      <div class="stock-table__head"><span>${t("colStock")}</span><span class="col-r"><span>${t("colPrice")}</span><span>${t("colChange")}</span></span></div>
      ${list.map((s) => `
      <div class="stock-line">
        <a class="stock-row" href="saham.html?kode=${s.code}">
          ${T.badge(s.code)}
          <span class="stock-row__name"><strong>${s.code}</strong><span>${T.esc(s.name)} · ${L(T.sectors[s.sector])} · ${t("colYield")} ${s.divYield == null ? "—" : T.pct(s.divYield, 1, false)}</span></span>
          <span class="stock-row__price num">${T.idr(s.price)}</span>
          <span class="stock-row__chg">${T.pill(s.change)}</span>
        </a>
        ${T.starBtn(s.code)}
      </div>`).join("")}` : `<div class="empty-state">${t("noResults")}</div>`;
  }

  function render() {
    document.title = t("screenerTitle") + " — Tumbuh";
    document.getElementById("main").innerHTML = `
      <section class="stack" style="gap:14px;max-width:760px">
        <h1 style="font-size:clamp(32px,4.5vw,48px);font-weight:800;letter-spacing:-0.03em">${t("screenerTitle")}</h1>
        <p class="lead" style="font-size:18px">${t("screenerSub")}</p>
        <p style="font-size:14px;color:var(--muted-2)">${t("lq45Note", { period: L(T.lq45Period) })} <a href="pelajaran.html?id=indeks-ihsg-lq45">${t("whatIsThis").replace("IHSG", "LQ45")}</a></p>
        <a class="link-arrow" href="bandingkan.html" style="align-self:flex-start">${t("cmpTitle")}</a>
      </section>
      <div class="grid-auto" id="preset-buttons">
        ${T.presets.map((p) => `
        <button type="button" class="card card--link" data-key="${p.key}" aria-pressed="${chosen.has(p.key)}"
          style="text-align:left;cursor:pointer;${chosen.has(p.key) ? "border-color:var(--accent);box-shadow:0 0 0 2px var(--accent) inset" : ""}">
          <span style="display:flex;justify-content:space-between;align-items:center">
            <span class="icon-tile">${T.icon(p.icon, 22)}</span>
            <span class="step-num ${chosen.has(p.key) ? "is-done" : ""}" style="width:28px;height:28px">${chosen.has(p.key) ? T.icon("check", 15, 'stroke-width="3"') : ""}</span>
          </span>
          <strong style="font-size:17px;line-height:1.3">${L(p.title)}</strong>
          <span style="font-size:14px;color:var(--muted)">${L(p.desc)}</span>
        </button>`).join("")}
      </div>
      <section class="card stack" style="gap:14px;padding-bottom:12px">
        <div class="section-head" style="align-items:center">
          <h2 style="font-size:22px;font-weight:800" id="count" aria-live="polite"></h2>
          <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
            <label class="sr-only" for="sector-select">${t("sector")}</label>
            <select id="sector-select" style="height:44px;border-radius:12px;border:1px solid var(--line-strong);padding:0 12px;background:var(--surface);font-weight:600">
              <option value="all">${t("allSectors")}</option>
              ${Object.keys(T.sectors).map((k) => `<option value="${k}" ${k === sector ? "selected" : ""}>${L(T.sectors[k])}</option>`).join("")}
            </select>
            ${chosen.size || sector !== "all" ? `<button type="button" class="btn btn--ghost" id="clear" style="height:44px">${t("clear")}</button>` : ""}
          </div>
        </div>
        <div class="stock-table" id="results"></div>
      </section>`;

    document.querySelectorAll("#preset-buttons [data-key]").forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.key;
      chosen.has(k) ? chosen.delete(k) : chosen.add(k);
      updateUrl(); render();
    }));
    document.getElementById("sector-select").addEventListener("change", (e) => { sector = e.target.value; updateUrl(); render(); });
    const clear = document.getElementById("clear");
    if (clear) clear.addEventListener("click", () => { chosen.clear(); sector = "all"; updateUrl(); render(); });
    renderResults();
  }

  T.boot("screener", render);
})();
