/* Tumbuh — home page */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;
  let tab = "up";

  function renderIndex() {
    const ix = T.market.index;
    const change = ((ix.value - ix.prevClose) / ix.prevClose) * 100;
    document.getElementById("ihsg-value").textContent = T.num(ix.value, 2);
    document.getElementById("ihsg-pill").innerHTML = T.pill(change, "lg");
    document.getElementById("ihsg-explain").textContent = t(change >= 0 ? "ihsgUp" : "ihsgDown");
    document.getElementById("ihsg-icon").innerHTML = T.icon("bulb", 22);
    const h = T.history("IHSG", 63);
    T.drawChart(document.getElementById("ihsg-chart"), h.points, {
      height: 130, dates: h.dates, format: (v) => T.num(v, 2),
      label: t("ihsgLabel") + " — " + t("last3m")
    });
  }

  function renderPath() {
    const done = T.doneLessons();
    const total = T.lessons.length;
    const n = T.lessons.filter((l) => done.includes(l.slug)).length;
    document.getElementById("path-bar").style.width = (n / total) * 100 + "%";
    document.getElementById("path-text").textContent = t("progress", { n, total });
    document.getElementById("start-sub").textContent = t("startSub", { n: total });
    document.getElementById("all-lessons").textContent = t("allLessonsN", { n: total });
    /* show 4 lessons, starting from the first one not yet done */
    const firstOpen = Math.max(0, T.lessons.findIndex((l) => !done.includes(l.slug)));
    const start = Math.min(firstOpen, Math.max(0, total - 4));
    document.getElementById("path").innerHTML = T.lessons.slice(start, start + 4).map((l, j) => {
      const i = start + j;
      const isDone = done.includes(l.slug);
      return `
      <a class="card card--link" href="pelajaran.html?id=${l.slug}">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span class="step-num ${isDone ? "is-done" : ""}">${isDone ? T.icon("check", 18, 'stroke-width="3"') : i + 1}</span>
          <span class="mins">${t("minutes", { n: l.mins })}</span>
        </div>
        <strong style="font-size:18px;line-height:1.3">${L(l.title)}</strong>
        <span style="font-size:15px;color:var(--muted);flex:1">${L(l.desc)}</span>
        <span class="link-arrow" style="color:var(--accent)">${t(isDone ? "ctaReview" : "ctaStart")}</span>
      </a>`;
    }).join("");
  }

  function renderMovers() {
    let list = T.allStocks();
    if (tab === "up") list = list.filter((s) => s.change > 0).sort((a, b) => b.change - a.change);
    if (tab === "down") list = list.filter((s) => s.change < 0).sort((a, b) => a.change - b.change);
    if (tab === "active") list.sort((a, b) => b.volumeM * b.price - a.volumeM * a.price);
    document.getElementById("movers").innerHTML = list.slice(0, 5).map((s) => `
      <div class="stock-line">
        <a class="stock-row" href="saham.html?kode=${s.code}">
          ${T.badge(s.code)}
          <span class="stock-row__name"><strong>${s.code}</strong><span>${T.esc(s.name)} · ${L(T.sectors[s.sector])}</span></span>
          <span class="stock-row__price num">${T.idr(s.price)}</span>
          <span class="stock-row__chg">${T.pill(s.change)}</span>
        </a>
        ${T.starBtn(s.code)}
      </div>`).join("");
    document.querySelectorAll("#mover-tabs .chip").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === tab)));
  }

  function renderSectors() {
    const groups = {};
    T.allStocks().forEach((s) => (groups[s.sector] = groups[s.sector] || []).push(s.change));
    const rows = Object.entries(groups)
      .map(([k, arr]) => [k, arr.reduce((a, b) => a + b, 0) / arr.length])
      .sort((a, b) => b[1] - a[1]);
    const maxAbs = Math.max(...rows.map((r) => Math.abs(r[1])), 1);
    document.getElementById("sectors").innerHTML = rows.map(([k, v]) => {
      const w = (Math.abs(v) / maxAbs) * 50;
      const up = v >= 0;
      return `<div class="sector-row">
        <span class="sector-row__name">${L(T.sectors[k])}</span>
        <span class="sector-bar"><span style="left:${up ? 50 : 50 - w}%;width:${w}%;background:${up ? "#16A06A" : "#D64535"}"></span></span>
        <span class="sector-row__val num" style="color:${up ? "var(--up)" : "var(--down)"}">${T.pct(v)}</span>
      </div>`;
    }).join("");
  }

  function renderTerm() {
    const ids = T.termOfDayIds;
    const dayNum = Math.floor(Date.now() / 86400000);
    const term = T.glossary.find((g) => g.id === ids[dayNum % ids.length]);
    document.getElementById("term-card").innerHTML = `
      <span class="eyebrow" style="color:#AEB8C8">${t("termEyebrow")}</span>
      <h3 style="font-size:28px;font-weight:800">${L(term.term)}</h3>
      <p style="color:#E2E6EC">${L(term.def)}</p>
      ${term.ex ? `<div style="background:#222E40;border-radius:14px;padding:14px 16px;font-size:14px;color:#E2E6EC">${t("example")}: ${L(term.ex)}</div>` : ""}
      <a class="link-arrow" style="color:#fff;align-self:flex-start;padding:6px 0" href="kamus.html#${term.id}">${t("openGlossary")}</a>`;
  }

  function renderPresets() {
    const all = T.allStocks();
    document.getElementById("presets").innerHTML = T.presets.map((p) => {
      const n = all.filter(T.presetMatch[p.key]).length;
      return `<a class="card card--link" href="penyaring.html?pilih=${p.key}">
        <span class="icon-tile">${T.icon(p.icon, 22)}</span>
        <strong style="font-size:18px;line-height:1.3">${L(p.title)}</strong>
        <span style="font-size:15px;color:var(--muted);flex:1">${L(p.desc)}</span>
        <span style="display:flex;justify-content:space-between;padding-top:10px;border-top:1px solid var(--tint);font-size:14px;font-weight:700">
          <span style="color:#3B4452">${t("nStocks", { n })}</span><span style="color:var(--accent)">→</span>
        </span>
      </a>`;
    }).join("");
  }

  document.getElementById("mover-tabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]");
    if (!b) return;
    tab = b.dataset.tab;
    renderMovers();
  });

  T.boot("home", () => {
    document.getElementById("hero-arrow").innerHTML = T.icon("arrow", 18);
    renderIndex(); renderPath(); renderMovers(); renderSectors(); renderTerm(); renderPresets();
  });
})();
