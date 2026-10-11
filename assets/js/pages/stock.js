/* Tumbuh — stock detail page (saham.html?kode=XXXX) */
(function () {
  const T = window.TUMBUH, t = T.t, L = T.L;
  const params = new URLSearchParams(location.search);
  const code = (params.get("kode") || "BBCA").toUpperCase();
  const RANGES = { "1M": 22, "6M": 126, "1Y": 250, "5Y": 1250 };
  let range = "1Y";
  let openHelp = null;

  /* Risks worth knowing, by sector */
  const RISKS = {
    bank:      { id: "Kinerja bank dipengaruhi suku bunga, kredit macet, dan kondisi ekonomi.", en: "Bank results depend on interest rates, bad loans and the economy." },
    coal:      { id: "Laba sangat bergantung pada harga batu bara dunia, yang bisa naik turun tajam. Kebijakan energi bersih juga bisa menekan permintaan jangka panjang.", en: "Profit depends heavily on world coal prices, which can swing sharply. Clean-energy policies may also reduce long-term demand." },
    metals:    { id: "Harga saham sangat dipengaruhi harga logam dunia (nikel, tembaga, emas), yang bisa berubah cepat.", en: "The share price is strongly driven by world metal prices (nickel, copper, gold), which can change fast." },
    energy:    { id: "Harga energi dan kebijakan pemerintah, misalnya harga gas atau listrik, memengaruhi pendapatan.", en: "Energy prices and government policy, such as gas or power tariffs, affect revenue." },
    materials: { id: "Harga bahan baku dan permintaan global memengaruhi laba, sehingga hasilnya naik turun mengikuti siklus.", en: "Raw material prices and global demand drive profit, so results rise and fall in cycles." },
    consumer:  { id: "Kenaikan harga bahan baku dan daya beli masyarakat memengaruhi laba.", en: "Raw material costs and household spending power affect profits." },
    retail:    { id: "Penjualan bergantung pada daya beli masyarakat dan persaingan, termasuk dari belanja online.", en: "Sales depend on household spending and competition, including online shopping." },
    telco:     { id: "Persaingan harga dan kebutuhan investasi jaringan yang besar bisa menekan laba.", en: "Price competition and heavy network spending can squeeze profits." },
    tech:      { id: "Perusahaan teknologi dan media bisa belum stabil labanya, sehingga harganya bergejolak.", en: "Tech and media companies may not have steady profits yet, so prices can swing a lot." },
    industrial:{ id: "Penjualan kendaraan dan alat berat naik turun mengikuti kondisi ekonomi dan harga komoditas.", en: "Vehicle and heavy-equipment sales rise and fall with the economy and commodity prices." },
    health:    { id: "Aturan pemerintah dan harga bahan baku impor bisa memengaruhi laba.", en: "Government rules and imported raw material prices can affect profits." }
  };


  /* The six key numbers, each with a plain meaning and a worked example */
  function metrics(s) {
    const lot = s.price * 100;
    const capTag = s.marketCapT >= 500 ? ["Sangat besar", "Very large"] : s.marketCapT >= 100 ? ["Besar", "Large"] : s.marketCapT >= 20 ? ["Menengah", "Mid-size"] : ["Kecil", "Small"];
    const yTag = s.divYield >= 6 ? ["Tinggi", "High"] : s.divYield >= 3 ? ["Sedang", "Moderate"] : s.divYield > 0 ? ["Rendah", "Low"] : ["Tidak ada", "None"];
    const roeTag = s.roe < 0 ? ["Merugi", "Loss-making"] : s.roe >= 15 ? ["Tinggi", "High"] : s.roe >= 8 ? ["Sedang", "Moderate"] : ["Rendah", "Low"];
    const tag = (a) => ({ id: a[0], en: a[1] });
    const loss = s.roe != null && s.roe < 0;   /* a missing P/E means "no profit" only when we know it's loss-making */
    const perMillion = Math.round(1000000 * s.divYield / 100);
    return [
      { label: { id: "Harga per lot", en: "Price per lot" }, value: T.idr(lot),
        meaning: { id: "Modal minimum untuk membeli 1 lot (100 lembar).", en: "The minimum to buy 1 lot (100 shares)." },
        help: { id: `Harga saham × 100 lembar: ${T.idr(s.price)} × 100 = ${T.idr(lot)}, belum termasuk biaya broker.`, en: `Share price × 100 shares: ${T.idr(s.price)} × 100 = ${T.idr(lot)}, before broker fees.` },
        tag: { id: "Modal minimum", en: "Minimum to start" }, glossary: "lot" },
      { label: { id: "Kapitalisasi pasar", en: "Market cap" }, value: (T.lang() === "id" ? "Rp" : "IDR ") + T.num(s.marketCapT, 0) + " T",
        meaning: { id: "Nilai seluruh saham perusahaan — seberapa besar perusahaannya.", en: "The value of all the company's shares — how big it is." },
        help: { id: "Harga saham × jumlah saham beredar. “T” = triliun. Perusahaan besar cenderung lebih stabil, tetapi bisa tumbuh lebih lambat.", en: "Share price × shares outstanding. “T” = trillion. Big companies tend to be steadier but may grow more slowly." },
        tag: tag(capTag), glossary: "kapitalisasi-pasar", field: "marketCapT" },
      { label: { id: "Rasio P/E", en: "P/E ratio" }, value: s.pe == null ? "—" : T.num(s.pe, 1) + "x",
        meaning: { id: "Berapa tahun laba yang Anda “bayar” dengan harga sekarang.", en: "How many years of profit you're “paying for” at today's price." },
        help: s.pe == null
          ? (loss ? { id: "Perusahaan ini belum mencatat laba, jadi P/E tidak bisa dihitung.", en: "This company isn't profitable yet, so a P/E can't be calculated." }
                  : { id: "Angka ini belum tersedia untuk saham ini.", en: "This figure isn't available for this stock yet." })
          : { id: `Harga saham ÷ laba per saham. P/E ${T.num(s.pe, 1)}x berarti dengan laba seperti sekarang, perlu sekitar ${T.num(s.pe, 0)} tahun laba untuk menyamai harga saham.`, en: `Share price ÷ earnings per share. A P/E of ${T.num(s.pe, 1)}x means that at today's profit level it would take about ${T.num(s.pe, 0)} years of earnings to equal the share price.` },
        tag: s.pe == null ? (loss ? { id: "Belum laba", en: "No profit yet" } : { id: "Data tidak tersedia", en: "No data" }) : { id: "Bandingkan dengan sektor", en: "Compare within sector" }, glossary: "per" },
      { label: { id: "Imbal hasil dividen", en: "Dividend yield" }, value: T.pct(s.divYield, 1, false),
        meaning: { id: "Perkiraan dividen setahun dibanding harga saham saat ini.", en: "Expected yearly dividends compared with today's share price." },
        help: s.divYield > 0
          ? { id: `Dari Rp1.000.000 yang diinvestasikan, perkiraan dividennya sekitar ${T.idr(perMillion)} per tahun — bisa berubah setiap tahun.`, en: `IDR 1,000,000 invested might pay about ${T.idr(perMillion)} a year in dividends — this can change every year.` }
          : { id: "Perusahaan ini tidak membagi dividen. Labanya (jika ada) dipakai untuk mengembangkan bisnis.", en: "This company doesn't pay a dividend. Any profit goes back into growing the business." },
        tag: tag(yTag), glossary: "imbal-hasil-dividen", field: "divYield" },
      { label: { id: "ROE", en: "ROE" }, value: T.pct(s.roe, 1, false).replace(/^/, s.roe < 0 ? "−" : ""),
        meaning: { id: "Seberapa efisien perusahaan menghasilkan laba dari modal pemiliknya.", en: "How efficiently the company turns its owners' money into profit." },
        help: s.roe >= 0
          ? { id: `Laba bersih ÷ modal pemegang saham. Setiap Rp100 modal menghasilkan sekitar Rp${T.num(s.roe, 1)} laba setahun.`, en: `Net profit ÷ shareholders' equity. Every IDR 100 of equity earned about IDR ${T.num(s.roe, 1)} in a year.` }
          : { id: "ROE negatif berarti perusahaan masih merugi.", en: "A negative ROE means the company is still losing money." },
        tag: tag(roeTag), glossary: "roe", field: "roe" },
      { label: { id: "Volume terakhir", en: "Latest volume" }, value: T.num(s.volumeM, 1) + (T.lang() === "id" ? " jt" : " M"),
        meaning: { id: "Jumlah lembar saham yang berpindah tangan pada hari perdagangan terakhir.", en: "How many shares changed hands on the last trading day." },
        help: { id: `Sekitar ${T.num(s.volumeM * 10, 0)} ribu lot. Volume tinggi berarti saham mudah dibeli atau dijual tanpa menggeser harga terlalu banyak.`, en: `About ${T.num(s.volumeM * 10, 0)} thousand lots. High volume means the stock is easy to buy or sell without moving the price much.` },
        tag: { id: "jt = juta lembar", en: "M = million shares" }, glossary: "volume", field: "volumeM" }
    ].map((m) => (m.field && s[m.field] == null)
      ? Object.assign({}, m, { value: "—", tag: { id: "Data tidak tersedia", en: "No data" },
          help: { id: "Angka ini belum tersedia untuk saham ini.", en: "This figure isn't available for this stock yet." } })
      : m);
  }

  function toggleWatch() {
    T.toggleWatch(code);
    render();
    const btn = document.getElementById("watch-btn");
    if (btn) btn.focus();
  }

  function renderChart(s) {
    const h = T.history(code, RANGES[range]);
    const first = h.points[0], last = h.points[h.points.length - 1];
    const ch = ((last - first) / first) * 100;
    const sentence = t("rangeOver", { range: t("w" + range), dir: t(ch >= 0 ? "rose" : "fell"), pct: T.pct(Math.abs(ch), 1, false), from: T.idr(first), to: T.idr(last) });
    document.getElementById("chart-sentence").innerHTML = `${T.pill(ch)} <span>${sentence}</span>${h.sample ? ` <span class="tag">${t("sampleChart")}</span>` : ""}`;
    document.getElementById("chart-start").textContent = t("ago" + range);
    T.drawChart(document.getElementById("price-chart"), h.points, { dates: h.dates, showLabels: true, label: sentence });
    document.querySelectorAll("#ranges button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.r === range)));
  }

  function render() {
    const main = document.getElementById("main");
    const s = T.stock(code);
    if (!s) {
      document.title = t("notFound") + " — Tumbuh";
      main.innerHTML = `<div class="empty-state card"><h1 style="font-size:28px">${t("notFound")}</h1><p style="margin:12px 0 20px">${T.esc(code)}</p><a class="btn btn--primary" href="index.html">${t("backHome")}</a></div>`;
      return;
    }
    document.title = `${s.code} — ${s.name} — Tumbuh`;
    const sectorName = L(T.sectors[s.sector]);
    const big = Math.abs(s.change) >= 3;
    const pos = T.rangePos(s);
    const rangeText = pos >= 0.7 ? t("rangeHigh") : pos <= 0.3 ? t("rangeLow") : t("rangeMid");
    const isWatched = T.isWatched(code);
    const similar = T.allStocks().filter((x) => x.sector === s.sector && x.code !== code)
      .sort((a, b) => (b.marketCapT || 0) - (a.marketCapT || 0)).slice(0, 4);
    /* related lesson: candlesticks for fast movers, financial reports otherwise */
    const lesson = T.lessons.find((l) => l.slug === (Math.abs(s.change) >= 3 ? "grafik-candlestick" : "laporan-keuangan")) || T.lessons[0];
    const ms = metrics(s);

    main.innerHTML = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html#pasar">${t("navMarkets")}</a><span aria-hidden="true">›</span>
      <a href="penyaring.html?sektor=${s.sector}">${sectorName}</a><span aria-hidden="true">›</span>
      <span style="color:var(--ink)" aria-current="page">${s.code}</span>
    </nav>

    <section class="stock-head">
      <div class="stack" style="gap:16px">
        <div class="stock-head__id">
          ${T.badge(s.code)}
          <div class="stack" style="gap:6px">
            <h1>${T.esc(s.name)}</h1>
            <div style="display:flex;flex-wrap:wrap;gap:8px"><span class="tag tag--dark">${s.code}</span><span class="tag">${sectorName}</span><span class="tag">LQ45</span></div>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:10px 16px">
          <span class="stock-price num">${T.idr(s.price)}</span>
          ${T.pill(s.change, "lg")}
          <span class="num" style="font-weight:700;color:${s.change >= 0 ? "var(--up)" : "var(--down)"}">${s.changeAbs >= 0 ? "+" : "−"}${T.num(Math.abs(s.changeAbs))} ${t("today")}</span>
        </div>
        <p style="max-width:640px;color:var(--ink-2)">${t(s.change >= 0 ? "priceUp" : "priceDown", { pct: T.pct(Math.abs(s.change), 2, false) })} ${t(big ? "moveBig" : "moveSmall")}</p>
      </div>
      <div style="display:flex;gap:10px">
        <button type="button" class="btn ${isWatched ? "btn--dark" : "btn--primary"}" id="watch-btn" aria-pressed="${isWatched}">
          ${T.icon("star", 18, isWatched ? 'fill="currentColor"' : "")}${t(isWatched ? "watching" : "watch")}
        </button>
        <button type="button" class="btn btn--ghost" id="share-btn" style="width:48px;padding:0" aria-label="${t("share")}" title="${t("share")}">${T.icon("link", 20)}</button>
      </div>
    </section>

    <div class="split">
      <div class="split__main">
        <section class="card stack" style="gap:16px">
          <div class="section-head" style="align-items:center">
            <h2 style="font-size:22px;font-weight:800">${t("chartTitle")}</h2>
            <div class="segmented" id="ranges" role="group" aria-label="${t("chartTitle")}">
              ${Object.keys(RANGES).map((r) => `<button type="button" data-r="${r}" aria-pressed="false">${t("r" + r)}</button>`).join("")}
            </div>
          </div>
          <div id="chart-sentence" style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;font-size:15px;color:var(--ink-2)"></div>
          <div class="chart" id="price-chart"></div>
          <div class="chart__axis"><span id="chart-start"></span><span>${t("now")}</span></div>
          <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;padding-top:14px;border-top:1px solid var(--tint);font-size:14px">
            <span style="color:var(--muted)">${t("chartTip")}</span>
          </div>
        </section>

        <section class="card stack" style="gap:12px">
          <h2 style="font-size:20px;font-weight:800">${t("rangeTitle")}</h2>
          <p style="font-size:15px;color:var(--muted)">${rangeText}</p>
          <div class="range-track">
            <span class="range-track__fill" style="width:${pos * 100}%"></span>
            <span class="range-track__mark" style="left:${pos * 100}%"></span>
            <span class="range-track__label num" style="left:${Math.min(Math.max(pos * 100, 12), 88)}%">${t("now")} · ${T.idr(s.price)}</span>
          </div>
          <div style="display:flex;justify-content:space-between" class="num">
            <span class="stack" style="gap:2px"><span style="font-size:13px;color:var(--muted-2)">${t("low")}</span><strong>${T.idr(s.low52)}</strong></span>
            <span class="stack" style="gap:2px;text-align:right"><span style="font-size:13px;color:var(--muted-2)">${t("high")}</span><strong>${T.idr(s.high52)}</strong></span>
          </div>
        </section>

        <section class="stack">
          <div class="stack" style="gap:6px">
            <h2 style="font-size:26px;font-weight:800">${t("metricsTitle")}</h2>
            <p class="lead" style="font-size:15px">${t("metricsSub")}</p>
          </div>
          <div class="grid-auto" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">
            ${ms.map((m, i) => `
            <div class="metric">
              <div class="metric__top">
                <span class="metric__label">${L(m.label)}</span>
                <button type="button" class="help-btn" data-help="${i}" aria-expanded="${openHelp === i}" aria-controls="help-${i}" aria-label="${t("explain")}: ${L(m.label)}">?</button>
              </div>
              <span class="metric__value num">${m.value}</span>
              <span class="metric__meaning">${L(m.meaning)}</span>
              <div class="metric__help" id="help-${i}" ${openHelp === i ? "" : "hidden"}>${L(m.help)} <a href="kamus.html#${m.glossary}">${t("openGlossary")}</a></div>
              <span class="tag" style="align-self:flex-start">${L(m.tag)}</span>
            </div>`).join("")}
          </div>
        </section>

        <section class="card stack" style="gap:14px">
          <h2 style="font-size:22px;font-weight:800">${t("aboutTitle")}</h2>
          <p style="font-size:16px;line-height:1.65;color:var(--ink-2)">${L(s.about)}</p>
          <div class="row-wrap" style="gap:12px">
            <div class="fact"><span>${t("sector")}</span><span>${sectorName}</span></div>
            <div class="fact"><span>${t("hq")}</span><span>${s.hq}</span></div>
            <a class="fact" href="pelajaran.html?id=indeks-ihsg-lq45" style="text-decoration:none;color:inherit"><span>${t("lq45Member")}</span><span>${L(T.lq45Period)}</span></a>
          </div>
        </section>
      </div>

      <aside class="split__side">
        <section class="card card--dark stack checklist" style="gap:12px">
          <h2 style="font-size:19px;font-weight:800">${t("checkTitle")}</h2>
          ${[1, 2, 3, 4].map((n) => `<label><input type="checkbox"><span>${t("check" + n)}</span></label>`).join("")}
          <p style="margin-top:4px;padding-top:14px;border-top:1px solid #2E3A4D;font-size:13px;color:#AEB8C8">${t("checkNote")}</p>
        </section>

        <section class="card stack" style="gap:12px">
          <h2 style="font-size:19px;font-weight:800">${t("riskTitle")}</h2>
          <div class="risk-item">${T.icon("warn", 20)}<span>${L(RISKS[s.sector])}</span></div>
          <div class="risk-item">${T.icon("warn", 20)}<span>${t("riskGeneral")}</span></div>
        </section>

        <a class="card card--soft card--link" href="pelajaran.html?id=${lesson.slug}" style="gap:8px">
          <span class="eyebrow">${t("relatedLesson")}</span>
          <strong style="font-size:18px;line-height:1.3">${L(lesson.title)}</strong>
          <span class="link-arrow" style="font-size:14px;color:#3B4452">${t("minutes", { n: lesson.mins })}</span>
        </a>

        ${similar.length ? `
        <section class="card stack" style="gap:4px;padding:20px 14px 12px">
          <h2 style="font-size:19px;font-weight:800;margin:0 10px 8px">${t("similarTitle")}</h2>
          ${similar.map((x) => `
            <a class="stock-row" href="saham.html?kode=${x.code}" style="border:0;padding:10px">
              ${T.badge(x.code)}
              <span class="stock-row__name"><strong>${x.code}</strong><span>${T.esc(x.name)}</span></span>
              <span class="stack" style="gap:4px;align-items:flex-end"><span class="num" style="font-weight:600">${T.idr(x.price)}</span>${T.pill(x.change, "sm")}</span>
            </a>`).join("")}
        </section>` : ""}

        <div class="note-dashed">${T.icon("info", 20)}<span>${t("buyNote")}</span></div>
      </aside>
    </div>`;

    renderChart(s);
    document.getElementById("ranges").addEventListener("click", (e) => {
      const b = e.target.closest("[data-r]");
      if (!b) return;
      range = b.dataset.r;
      renderChart(s);
    });
    main.querySelectorAll("[data-help]").forEach((b) => b.addEventListener("click", () => {
      const i = Number(b.dataset.help);
      const box = document.getElementById("help-" + i);
      const open = box.hidden;
      box.hidden = !open;
      b.setAttribute("aria-expanded", String(open));
      openHelp = open ? i : null;
    }));
    document.getElementById("watch-btn").addEventListener("click", toggleWatch);
    document.getElementById("share-btn").addEventListener("click", (e) => {
      const btn = e.currentTarget;
      const done = () => { btn.title = t("copied"); btn.setAttribute("aria-label", t("copied")); btn.style.borderColor = "var(--up)"; };
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, () => {}); else done();
    });
  }

  T.boot("stock", render);
})();
