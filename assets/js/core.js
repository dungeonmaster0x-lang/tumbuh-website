/* ==========================================================================
   Tumbuh — shared building blocks used by every page
   - header & footer (written once here, inserted on every page)
   - stock search
   - stock helpers (price change, price history, sorting)
   - line chart drawing
   - lesson progress (saved in the browser)
   ========================================================================== */

(function () {
  const T = window.TUMBUH;
  const t = (k, v) => T.t(k, v);

  /* ---- icons (simple stroke icons drawn by hand) ----------------------- */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
    warn: '<path d="M12 9v4M12 17h.01M10.3 3.9L2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    building: '<path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6M3 21h18"/>',
    coins: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    tag: '<path d="M3 12V4h8l10 10-8 8-10-10z"/><path d="M7.5 8h.01"/>',
    bag: '<path d="M5 8h14l-1 13H6L5 8zM9 8V6a3 3 0 0 1 6 0v2"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>'
  };
  T.icon = (name, size = 20, extra = "") =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${ICONS[name] || ""}</svg>`;

  /* Logo: a seedling rising out of a rising line — Tumbuh means "grow" */
  T.logo = (size = 32, bg = "#16202E") => `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="10" fill="${bg}"/>
      <path d="M7 23.5 L13 18 L17 20.5 L25 12" stroke="#F2B33D" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17 20.5 V13.5 M17 15.5 C 17 12 19.5 10 22 9.8 C 22 12.6 20 15 17 15.5 Z" stroke="#FFFFFF" stroke-width="1.8" fill="#FFFFFF" stroke-linejoin="round"/>
    </svg>`;

  /* ---- stock helpers --------------------------------------------------- */
  T.stockCodes = () => Object.keys(T.companies).filter((c) => T.market.stocks[c]);
  T.stock = function (code) {
    const c = T.companies[code], m = T.market.stocks[code];
    if (!c || !m) return null;
    const change = ((m.price - m.prevClose) / m.prevClose) * 100;
    return Object.assign({ code, change, changeAbs: m.price - m.prevClose }, c, m);
  };
  T.allStocks = () => T.stockCodes().map(T.stock);
  T.pill = (change, size = "") =>
    `<span class="pill ${change >= 0 ? "pill--up" : "pill--down"} ${size ? "pill--" + size : ""}">${T.pct(change)}</span>`;

  const TINTS = ["#DCE6FB", "#DDF0E5", "#FBE7D3", "#E9E1F6", "#F6DEE2", "#DCEEF1", "#FFF0C2"];
  T.badge = (code, cls = "") => {
    const tint = TINTS[(code.charCodeAt(0) + code.charCodeAt(1) + code.charCodeAt(2)) % TINTS.length];
    return `<span class="ticker-badge ${cls}" style="background:${tint}" aria-hidden="true">${code.slice(0, 2)}</span>`;
  };

  /* Where today's price sits in the 1-year range: 0 = at the low, 1 = at the high */
  T.rangePos = (s) => (s.high52 > s.low52 ? (s.price - s.low52) / (s.high52 - s.low52) : 0.5);

  /* Screener rules (plain-language presets) */
  T.presetMatch = {
    big: (s) => (s.marketCapT || 0) >= 100,
    dividend: (s) => (s.divYield || 0) >= 3,
    cheap: (s) => T.rangePos(s) <= 0.35,
    brand: (s) => s.tags.includes("brand")
  };

  /* Price history: real if the Python updater filled it in, otherwise a
     made-up but realistic-looking path that ends at today's price.         */
  function seeded(seed) {
    let s = seed;
    return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  }
  function codeSeed(code) { return [...code].reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7) % 233280; }

  T.history = function (code, days) {
    const m = code === "IHSG" ? T.market.index : T.market.stocks[code];
    if (m.history && m.history.length > 5) {
      return { points: m.history.slice(-days).map((p) => p[1]), dates: m.history.slice(-days).map((p) => p[0]), sample: false };
    }
    const rnd = seeded(codeSeed(code) + days);
    const end = m.value || m.price;
    /* a gentle random walk with some momentum, so it looks like a real price */
    const vol = code === "IHSG" ? 0.006 : 0.011;
    let v = 100, drift = 0; const raw = [];
    for (let i = 0; i < days; i++) {
      drift = drift * 0.92 + (rnd() - 0.5) * vol * 0.5;
      v *= 1 + drift + (rnd() - 0.5) * vol;
      raw.push(v);
    }
    const scale = end / raw[raw.length - 1];
    const points = raw.map((x) => x * scale);
    if (m.low52 && days >= 200 && days <= 260) {
      /* 1-year sample: stretch it to match the 1-year low/high shown on the page */
      const lo = Math.min(...points), hi = Math.max(...points);
      if (hi > lo) for (let i = 0; i < points.length; i++) points[i] = m.low52 + ((points[i] - lo) / (hi - lo)) * (m.high52 - m.low52);
      /* then ease the last few weeks so the line ends exactly at today's price */
      const n = points.length, gap = end - points[n - 1], tail = Math.min(20, n - 1);
      for (let k = 0; k <= tail; k++) points[n - 1 - tail + k] += gap * (k / tail);
    }
    return { points, dates: null, sample: true };
  };

  /* ---- line chart ------------------------------------------------------ */
  /* T.drawChart(containerEl, values, {height, baseline, dates}) */
  T.drawChart = function (el, values, opts = {}) {
    const W = 800, H = opts.height || 280, pad = 14;
    const lo = Math.min(...values, opts.baseline ?? Infinity);
    const hi = Math.max(...values, opts.baseline ?? -Infinity);
    const x = (i) => (i / (values.length - 1)) * W;
    const y = (v) => pad + (H - 2 * pad) * (1 - (v - lo) / (hi - lo || 1));
    const up = values[values.length - 1] >= (opts.baseline ?? values[0]);
    const color = up ? "var(--up-line)" : "var(--down-line)";
    const line = values.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
    const base = opts.baseline != null
      ? `<line x1="0" x2="${W}" y1="${y(opts.baseline)}" y2="${y(opts.baseline)}" stroke="#C9C6BB" stroke-dasharray="4 5" vector-effect="non-scaling-stroke"/>` : "";
    el.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${T.esc(opts.label || "")}">
        <line x1="0" x2="${W}" y1="${pad}" y2="${pad}" stroke="#ECEAE3" vector-effect="non-scaling-stroke"/>
        <line x1="0" x2="${W}" y1="${H / 2}" y2="${H / 2}" stroke="#ECEAE3" vector-effect="non-scaling-stroke"/>
        <line x1="0" x2="${W}" y1="${H - pad}" y2="${H - pad}" stroke="#ECEAE3" vector-effect="non-scaling-stroke"/>
        ${base}
        <path d="${line} L${W},${H} L0,${H} Z" fill="${color}" fill-opacity="0.09"/>
        <path d="${line}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
        <line class="cursor" x1="0" x2="0" y1="0" y2="${H}" stroke="#16202E" stroke-opacity="0" vector-effect="non-scaling-stroke"/>
      </svg>
      ${opts.showLabels ? `<span class="chart__label num" style="top:0">${T.idr(hi)}</span><span class="chart__label num" style="bottom:0">${T.idr(lo)}</span>` : ""}
      <span class="chart__tip num" aria-hidden="true"></span>`;
    if (opts.interactive === false) return;
    const svg = el.querySelector("svg"), tip = el.querySelector(".chart__tip"), cursor = el.querySelector(".cursor");
    const move = (clientX) => {
      const r = svg.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
      const i = Math.round(ratio * (values.length - 1));
      const fmt = opts.format || T.idr;
      const when = opts.dates ? " · " + T.date(opts.dates[i]) : "";
      tip.textContent = fmt(values[i]) + when;
      tip.style.left = Math.min(Math.max(ratio * r.width, 60), r.width - 60) + "px";
      tip.classList.add("is-on");
      cursor.setAttribute("x1", x(i)); cursor.setAttribute("x2", x(i)); cursor.setAttribute("stroke-opacity", "0.35");
    };
    const hide = () => { tip.classList.remove("is-on"); cursor.setAttribute("stroke-opacity", "0"); };
    svg.addEventListener("pointermove", (e) => move(e.clientX));
    svg.addEventListener("pointerleave", hide);
  };

  /* Tiny line chart for lists (returns SVG markup) */
  T.sparkline = function (values, label = "") {
    const W = 96, H = 34, lo = Math.min(...values), hi = Math.max(...values);
    const pts = values.map((v, i) => `${((i / (values.length - 1)) * W).toFixed(1)},${(3 + (H - 6) * (1 - (v - lo) / (hi - lo || 1))).toFixed(1)}`).join(" ");
    const up = values[values.length - 1] >= values[0];
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="${T.esc(label)}"><polyline points="${pts}" fill="none" stroke="${up ? "var(--up-line)" : "var(--down-line)"}" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
  };

  /* ---- watchlist (this device only) ------------------------------------ */
  const WKEY = "tumbuh-watch";
  T.watchlist = function () {
    try { return JSON.parse(localStorage.getItem(WKEY) || "[]").filter((c) => T.companies[c]); } catch (e) { return []; }
  };
  T.isWatched = (code) => T.watchlist().includes(code);
  T.toggleWatch = function (code) {
    const list = T.watchlist();
    const i = list.indexOf(code);
    i >= 0 ? list.splice(i, 1) : list.push(code);
    try { localStorage.setItem(WKEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
    updateNavCount();
    watchListeners.forEach((fn) => fn(code));
  };
  const watchListeners = [];
  T.onWatch = (fn) => watchListeners.push(fn);
  /* A star button for any list: <button data-star="BBCA"> — clicks handled once, below */
  T.starBtn = (code) => {
    const on = T.isWatched(code);
    const label = (on ? t("unwatch") : t("watch")) + " " + code;
    return `<button type="button" class="star-btn" data-star="${code}" aria-pressed="${on}" aria-label="${label}" title="${label}">${T.icon("star", 20, on ? 'fill="currentColor"' : "")}</button>`;
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-star]");
    if (!b) return;
    e.preventDefault();
    const code = b.dataset.star;
    const idx = [...document.querySelectorAll(`[data-star="${code}"]`)].indexOf(b);
    T.toggleWatch(code);   /* pages listening with T.onWatch may re-render here */
    document.querySelectorAll(`[data-star="${code}"]`).forEach((el) => { el.outerHTML = T.starBtn(code); });
    const again = document.querySelectorAll(`[data-star="${code}"]`)[idx];
    if (again) again.focus();
  });
  function updateNavCount() {
    const el = document.getElementById("watch-count");
    if (!el) return;
    const n = T.watchlist().length;
    el.textContent = n;
    el.hidden = n === 0;
  }

  /* ---- lesson progress (this device only) ------------------------------ */
  const PKEY = "tumbuh-done-lessons";
  T.doneLessons = function () {
    try { return JSON.parse(localStorage.getItem(PKEY) || "[]"); } catch (e) { return []; }
  };
  T.setLessonDone = function (slug, done) {
    const set = new Set(T.doneLessons());
    done ? set.add(slug) : set.delete(slug);
    try { localStorage.setItem(PKEY, JSON.stringify([...set])); } catch (e) { /* ignore */ }
  };

  /* ---- header & footer ------------------------------------------------- */
  function header(active) {
    const link = (href, key, name) =>
      `<a href="${href}" data-i18n="${key}" ${active === name ? 'aria-current="page"' : ""}></a>`;
    return `
    <a class="skip-link" href="#main" data-i18n="skip"></a>
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="brand" href="index.html">${T.logo()}<span>Tumbuh</span></a>
        <button class="menu-btn" type="button" aria-expanded="false" aria-controls="main-nav" data-i18n-attr="aria-label:menu">${T.icon("menu", 22)}</button>
        <nav class="nav" id="main-nav" aria-label="Main">
          ${link("index.html#pasar", "navMarkets", "home")}
          ${link("belajar.html", "navLearn", "learn")}
          ${link("kamus.html", "navGlossary", "glossary")}
          ${link("penyaring.html", "navScreener", "screener")}
          ${link("latihan.html", "navPractice", "practice")}
          ${link("kalkulator.html", "navCalc", "calc")}
          <a href="pantau.html" ${active === "watch" ? 'aria-current="page"' : ""}><span data-i18n="navWatch"></span><span class="nav-count" id="watch-count" hidden></span></a>
        </nav>
        <div class="search" role="search">
          ${T.icon("search", 18, 'style="color:#5B6472;flex:none"')}
          <input id="stock-search" type="search" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="search-results" aria-autocomplete="list" data-i18n-attr="placeholder:search,aria-label:search">
          <ul class="search-results" id="search-results" role="listbox"></ul>
        </div>
        <div class="lang-toggle" role="group" aria-label="Bahasa / Language">
          <button type="button" data-lang="id" aria-pressed="false">ID</button>
          <button type="button" data-lang="en" aria-pressed="false">EN</button>
        </div>
      </div>
    </header>
    <div class="sample-banner" id="data-banner"></div>`;
  }

  function footer() {
    return `
    <footer class="site-footer">
      <div class="container site-footer__inner">
        <div class="stack" style="gap:14px">
          <a class="brand" href="index.html" style="color:#fff">${T.logo(28)}<span>Tumbuh</span></a>
          <p data-i18n="disclaimer"></p>
          <span style="font-size:13px">© ${new Date().getFullYear()} Tumbuh</span>
        </div>
        <nav aria-label="Footer">
          <a href="belajar.html" data-i18n="navLearn"></a>
          <a href="kamus.html" data-i18n="navGlossary"></a>
          <a href="penyaring.html" data-i18n="navScreener"></a>
          <a href="pantau.html" data-i18n="navWatch"></a>
          <a href="bandingkan.html" data-i18n="navCompare"></a>
          <a href="kalkulator.html" data-i18n="navCalc"></a>
          <a href="latihan.html" data-i18n="navPractice"></a>
        </nav>
      </div>
    </footer>`;
  }

  function banner() {
    const el = document.getElementById("data-banner");
    if (!el) return;
    el.textContent = T.market.isSample ? t("sampleBanner") : t("realBanner", { date: T.date(T.market.updated) });
  }

  /* ---- stock search (type a code or a name) ---------------------------- */
  function setupSearch() {
    const input = document.getElementById("stock-search");
    const list = document.getElementById("search-results");
    let active = -1;
    const close = () => { list.classList.remove("is-open"); input.setAttribute("aria-expanded", "false"); active = -1; };
    const render = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) return close();
      const hits = T.allStocks().filter((s) => s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)).slice(0, 6);
      list.innerHTML = hits.length
        ? hits.map((s, i) => `<li role="option" id="opt-${i}"><a href="saham.html?kode=${s.code}">${T.badge(s.code)}<span style="flex:1;min-width:0"><strong>${s.code}</strong><br><span style="font-size:13px;color:#5B6472">${T.esc(s.name)}</span></span>${T.pill(s.change, "sm")}</a></li>`).join("")
        : `<li class="empty">${t("searchNone")}</li>`;
      list.classList.add("is-open"); input.setAttribute("aria-expanded", "true"); active = -1;
    };
    input.addEventListener("input", render);
    input.addEventListener("keydown", (e) => {
      const links = [...list.querySelectorAll("a")];
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        if (!links.length) return;
        e.preventDefault();
        active = (active + (e.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
        links.forEach((a, i) => a.classList.toggle("is-active", i === active));
        input.setAttribute("aria-activedescendant", "opt-" + active);
      } else if (e.key === "Enter") {
        const target = links[active] || links[0];
        if (target) location.href = target.href;
      } else if (e.key === "Escape") close();
    });
    document.addEventListener("click", (e) => { if (!e.target.closest(".search")) close(); });
  }

  /* ---- start every page ------------------------------------------------ */
  /* T.boot("home", renderFunction) — renderFunction runs now and again
     every time the language changes.                                     */
  T.boot = function (active, render) {
    document.getElementById("site-header").outerHTML = header(active);
    document.getElementById("site-footer").outerHTML = footer();
    document.querySelectorAll(".lang-toggle button").forEach((b) =>
      b.addEventListener("click", () => T.setLang(b.dataset.lang)));
    const menuBtn = document.querySelector(".menu-btn"), nav = document.getElementById("main-nav");
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    setupSearch();
    updateNavCount();
    const run =() => { T.applyStatic(); banner(); if (render) render(); T.applyStatic(); };
    T.onLang(run);
    run();
  };
})();

/* ==========================================================================
   Market map (heatmap): one tile per stock, sized by company value and
   coloured by price change. T.drawHeatmap(container, period)
   period: "1D" (latest day), "1M" or "1Y"
   ========================================================================== */
(function () {
  const T = window.TUMBUH;
  const RANGE = { "1D": 3, "1M": 10, "1Y": 30 };        /* % that gets the strongest colour */
  const DAYS = { "1M": 22, "1Y": 250 };

  /* squarified treemap: lays out rectangles that stay close to squares */
  function squarify(items, x, y, w, h) {
    const out = [];
    const total = items.reduce((a, i) => a + i.v, 0) || 1;
    let rest = items.map((i) => Object.assign({}, i, { a: (i.v / total) * w * h }));
    const worst = (row, side) => {
      const s = row.reduce((a, r) => a + r.a, 0), mx = Math.max(...row.map((r) => r.a)), mn = Math.min(...row.map((r) => r.a));
      return Math.max((side * side * mx) / (s * s), (s * s) / (side * side * mn));
    };
    while (rest.length) {
      const side = Math.min(w, h);
      let row = [rest[0]], i = 1;
      while (i < rest.length && worst(row.concat(rest[i]), side) <= worst(row, side)) { row.push(rest[i]); i++; }
      const s = row.reduce((a, r) => a + r.a, 0);
      if (w >= h) {                                       /* lay the row down the left side */
        const rw = s / h; let cy = y;
        row.forEach((r) => { const rh = r.a / rw; out.push(Object.assign(r, { x, y: cy, w: rw, h: rh })); cy += rh; });
        x += rw; w -= rw;
      } else {                                            /* lay the row along the top */
        const rh = s / w; let cx = x;
        row.forEach((r) => { const rw = r.a / rh; out.push(Object.assign(r, { x: cx, y, w: rw, h: rh })); cx += rw; });
        y += rh; h -= rh;
      }
      rest = rest.slice(i);
    }
    return out;
  }

  function mix(a, b, t) {
    const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const A = p(a), B = p(b);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  }
  /* Glass palette: vivid colours that glow through the frosted tiles */
  const NEUTRAL = "#5B667A", UP = "#19C37D", DOWN = "#F04B55";
  function colourFor(change, period) {
    const t = Math.pow(Math.min(Math.abs(change) / RANGE[period], 1), 0.8);
    return change >= 0 ? mix(NEUTRAL, UP, t) : mix(NEUTRAL, DOWN, t);
  }
  const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(",");

  T.heatmapChange = function (s, period) {
    if (period === "1D") return s.change;
    const h = T.history(s.code, DAYS[period]).points;
    return ((h[h.length - 1] - h[0]) / h[0]) * 100;
  };

  T.drawHeatmap = function (el, period) {
    const PAD = 8;                                         /* room for the glow around the edge */
    const W = el.clientWidth - PAD * 2, H = el.clientHeight - PAD * 2;
    if (W <= 0 || H <= 0) return;
    const stocks = T.allStocks().map((s) => Object.assign({}, s, { v: Math.max(s.marketCapT || 1, 1), chg: T.heatmapChange(s, period) }));
    const bySector = {};
    stocks.forEach((s) => (bySector[s.sector] = bySector[s.sector] || []).push(s));
    const sectors = Object.entries(bySector).map(([k, list]) => ({ k, list: list.sort((a, b) => b.v - a.v), v: list.reduce((a, s) => a + s.v, 0) }))
      .sort((a, b) => b.v - a.v);
    const gap = 5;
    let glow = "", tiles = "", labels = "";
    squarify(sectors, PAD, PAD, W, H).forEach((sec) => {
      const label = sec.w > 70 && sec.h > 64;
      const top = label ? 24 : 0;
      if (label) labels += `<span class="hm-sector__name" style="left:${sec.x + 4}px;top:${sec.y + 2}px;max-width:${sec.w - 12}px">${T.esc(T.L(T.sectors[sec.k]))}</span>`;
      squarify(sec.list, sec.x, sec.y + top, sec.w, sec.h - top).forEach((r) => {
        const c = colourFor(r.chg, period);
        const x = r.x + gap / 2, y = r.y + gap / 2, w = Math.max(r.w - gap, 0), h = Math.max(r.h - gap, 0);
        const radius = Math.max(6, Math.min(18, Math.min(w, h) / 5));
        const fs = Math.max(10, Math.min(24, Math.min(w / 4, h / 2.6)));
        const showCode = w > 32 && h > 20, showPct = w > 46 && h > 40;
        const pct = T.pct(r.chg, period === "1D" ? 2 : 1);
        glow += `<i style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;background:${c};border-radius:${radius}px"></i>`;
        tiles += `<a class="hm-tile" href="saham.html?kode=${r.code}"
          style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;--tint:${rgb(c)};border-radius:${radius}px"
          aria-label="${r.code}, ${T.esc(r.name)}, ${pct}" title="${r.code} · ${T.esc(r.name)} · ${pct}">
          ${showCode ? `<strong style="font-size:${fs}px">${r.code}</strong>` : ""}${showPct ? `<span style="font-size:${Math.max(10, fs * 0.6)}px">${pct}</span>` : ""}
        </a>`;
      });
    });
    el.innerHTML = `<div class="hm-glow" aria-hidden="true">${glow}</div>${labels}${tiles}`;
  };
})();
