/* ==========================================================================
   Tumbuh — language system (Bahasa Indonesia / English)
   --------------------------------------------------------------------------
   How it works:
   - Every fixed piece of text lives in STRINGS below, with an id and en version.
   - In HTML, write  <span data-i18n="navLearn"></span>  and the right text is
     filled in. For attributes:  data-i18n-attr="placeholder:search".
   - The chosen language is remembered in the browser (localStorage) and can be
     forced with ?lang=en or ?lang=id in the address.
   ========================================================================== */

window.TUMBUH = window.TUMBUH || {};

TUMBUH.STRINGS = {
  /* header + footer */
  skip:        { id: "Langsung ke konten", en: "Skip to content" },
  navMarkets:  { id: "Pasar", en: "Markets" },
  navLearn:    { id: "Belajar", en: "Learn" },
  navGlossary: { id: "Kamus", en: "Glossary" },
  navScreener: { id: "Penyaring", en: "Screener" },
  navWatch:    { id: "Pantauan", en: "Watchlist" },
  unwatch:     { id: "Hapus dari pantauan:", en: "Remove from watchlist:" },

  /* watchlist page */
  watchTitle:  { id: "Daftar pantau", en: "Your watchlist" },
  watchSub:    { id: "Saham yang Anda tandai bintang. Daftar ini tersimpan di browser perangkat ini saja.", en: "The stocks you've starred. This list is saved in this device's browser only." },
  watchEmpty:  { id: "Belum ada saham yang dipantau", en: "You're not watching any stocks yet" },
  watchEmptySub:{ id: "Tekan ikon bintang di samping saham mana pun untuk menambahkannya ke sini. Mulai dari saham yang Anda kenal:", en: "Press the star next to any stock to add it here. Start with names you know:" },
  watchCount:  { id: "Dipantau", en: "Watching" },
  watchUp:     { id: "Naik", en: "Up" },
  watchDown:   { id: "Turun", en: "Down" },
  watchAvg:    { id: "Rata-rata perubahan", en: "Average change" },
  sortBy:      { id: "Urutkan", en: "Sort by" },
  sortAdded:   { id: "Urutan ditambahkan", en: "Order added" },
  sortGain:    { id: "Naik terbanyak", en: "Biggest gain" },
  sortLoss:    { id: "Turun terbanyak", en: "Biggest drop" },
  sortAZ:      { id: "Kode A–Z", en: "Code A–Z" },
  col1M:       { id: "1 bulan", en: "1 month" },
  addMore:     { id: "Tambah saham lain", en: "Add more stocks" },
  watchTip:    { id: "Memantau bukan berarti membeli. Gunakan daftar ini untuk belajar mengamati bagaimana harga bergerak dari waktu ke waktu.", en: "Watching isn't buying. Use this list to practise observing how prices move over time." },
  lq45Member:  { id: "Anggota LQ45", en: "LQ45 member" },
  lq45Note:    { id: "Semua saham di Tumbuh adalah anggota indeks LQ45 periode {period}.", en: "Every stock on Tumbuh is a member of the LQ45 index for {period}." },
  noData:      { id: "Data tidak tersedia", en: "No data" },

  /* compare page */
  navCompare:  { id: "Bandingkan", en: "Compare" },
  compareWith: { id: "Bandingkan", en: "Compare" },
  cmpTitle:    { id: "Bandingkan dua saham", en: "Compare two stocks" },
  cmpSub:      { id: "Lihat dua saham berdampingan: pergerakan harga, angka penting, dan apa artinya.", en: "See two stocks side by side: price history, key numbers, and what they mean." },
  cmpFirst:    { id: "Saham pertama", en: "First stock" },
  cmpSecond:   { id: "Saham kedua", en: "Second stock" },
  cmpSwap:     { id: "Tukar posisi", en: "Swap" },
  cmpChartTitle:{ id: "Jika Anda berinvestasi Rp1 juta", en: "If you had invested IDR 1 million" },
  cmpChartLabel:{ id: "Perbandingan nilai Rp1 juta di {a} dan {b}", en: "Value of IDR 1 million in {a} versus {b}" },
  cmpStory:    { id: "Nilai Rp1.000.000 yang dibelikan saham {range} lalu, hari ini (belum termasuk dividen dan biaya):", en: "What IDR 1,000,000 invested {range} ago would be worth today (excluding dividends and fees):" },
  cmpPastNote: { id: "Kinerja masa lalu tidak menjamin hasil di masa depan. Garis putus-putus = modal awal Rp1 juta.", en: "Past performance doesn't guarantee future results. Dashed line = the original IDR 1 million." },
  cmpNumbers:  { id: "Angka penting berdampingan", en: "Key numbers side by side" },
  cmpLot:      { id: "Harga per lot", en: "Price per lot" },
  cmpToday:    { id: "Perubahan terakhir", en: "Latest change" },
  cmp1Y:       { id: "Perubahan 1 tahun", en: "1-year change" },
  cmpRangePos: { id: "Posisi di rentang 1 tahun", en: "Position in 1-year range" },
  cmpCap:      { id: "Kapitalisasi pasar", en: "Market cap" },
  cmpPE:       { id: "Rasio P/E", en: "P/E ratio" },
  cmpROE:      { id: "ROE", en: "ROE" },
  cmpNotePrice:{ id: "Harga per lembar saja tidak menunjukkan murah atau mahal. Saham Rp100 bisa lebih \"mahal\" dari saham Rp10.000.", en: "Price per share alone doesn't tell you cheap or expensive. A IDR 100 stock can be \"pricier\" than a IDR 10,000 one." },
  cmpNoteLot:  { id: "Modal minimum untuk membeli 1 lot (100 lembar), sebelum biaya.", en: "The minimum to buy 1 lot (100 shares), before fees." },
  cmpNoteToday:{ id: "Gerakan satu hari jarang berarti banyak untuk investor jangka panjang.", en: "One day's move rarely means much to a long-term investor." },
  cmpNote1Y:   { id: "Harga hari ini dibanding setahun lalu, tanpa dividen.", en: "Today's price versus a year ago, without dividends." },
  cmpNoteRange:{ id: "0% = di titik terendah setahun, 100% = di titik tertinggi.", en: "0% = at the 1-year low, 100% = at the 1-year high." },
  cmpNoteCap:  { id: "Perusahaan lebih besar biasanya lebih stabil, tetapi bisa tumbuh lebih lambat.", en: "Bigger companies are usually steadier, but may grow more slowly." },
  cmpNotePE:   { id: "Bandingkan P/E terutama antar saham di sektor yang sama. P/E rendah belum tentu murah.", en: "Compare P/E mainly within the same sector. A low P/E isn't automatically cheap." },
  cmpNoteYield:{ id: "Imbal hasil tinggi menarik, tetapi cek apakah dividennya stabil dari tahun ke tahun.", en: "A high yield is attractive, but check whether the dividend is steady year to year." },
  cmpNoteROE:  { id: "Makin tinggi, makin efisien perusahaan menghasilkan laba dari modalnya.", en: "The higher it is, the more efficiently the company turns equity into profit." },
  cmpNoteSameSector:{ id: "Sektor sama — perbandingan angka lebih adil.", en: "Same sector — the numbers compare more fairly." },
  cmpNoteDiffSector:{ id: "Sektor berbeda — bisnisnya berbeda, jadi bandingkan angka dengan hati-hati.", en: "Different sectors — different businesses, so compare the numbers carefully." },
  cmpDisclaimer:{ id: "Perbandingan ini untuk belajar membaca angka, bukan untuk menentukan saham mana yang harus dibeli. Angka yang lebih tinggi tidak selalu lebih baik.", en: "This comparison is for learning to read the numbers, not for deciding which stock to buy. A higher number isn't always better." },
  search:      { id: "Cari saham, mis. BBCA atau Telkom", en: "Search stocks, e.g. BBCA or Telkom" },
  searchNone:  { id: "Tidak ada saham yang cocok.", en: "No matching stocks." },
  menu:        { id: "Menu", en: "Menu" },
  startFree:   { id: "Mulai belajar", en: "Start learning" },
  sampleBanner:{ id: "Versi awal — angka di situs ini adalah data contoh, bukan harga sebenarnya.", en: "Early version — figures on this site are sample data, not real prices." },
  realBanner:  { id: "Harga penutupan per {date}. Bukan data waktu nyata.", en: "Closing prices as of {date}. Not real-time data." },
  disclaimer:  { id: "Konten di Tumbuh untuk edukasi, bukan saran investasi. Nilai investasi bisa naik dan turun, dan kinerja masa lalu tidak menjamin hasil di masa depan.", en: "Content on Tumbuh is for education, not investment advice. Investments can go down as well as up, and past performance does not guarantee future results." },
  fAbout:      { id: "Tentang Tumbuh", en: "About Tumbuh" },

  /* home */
  heroEyebrow: { id: "Untuk investor pemula", en: "For first-time investors" },
  heroTitle:   { id: "Pahami pasar saham, <mark>satu langkah</mark> setiap kali.", en: "Understand the stock market, <mark>one step</mark> at a time." },
  heroSub:     { id: "Harga, grafik, dan istilah dijelaskan dengan bahasa sehari-hari. Tanpa jargon, tanpa tekanan.", en: "Prices, charts and terms explained in everyday language. No jargon, no pressure." },
  heroCta2:    { id: "Lihat pasar hari ini", en: "See today's market" },
  ihsgLabel:   { id: "IHSG", en: "IDX Composite" },
  ihsgName:    { id: "Indeks Harga Saham Gabungan", en: "IHSG — Indonesia's main stock index" },
  whatIsThis:  { id: "Apa itu IHSG?", en: "What is IHSG?" },
  ihsgUp:      { id: "IHSG naik. Artinya, rata-rata harga saham di Bursa Efek Indonesia sedikit lebih tinggi dibanding penutupan sebelumnya.", en: "The index is up. Prices on the Indonesia Stock Exchange are, on average, a little higher than at the previous close." },
  ihsgDown:    { id: "IHSG turun. Artinya, rata-rata harga saham di Bursa Efek Indonesia sedikit lebih rendah dibanding penutupan sebelumnya.", en: "The index is down. Prices on the Indonesia Stock Exchange are, on average, a little lower than at the previous close." },
  last3m:      { id: "3 bulan terakhir", en: "Last 3 months" },
  startTitle:  { id: "Mulai dari sini", en: "Start here" },
  startSub:    { id: "{n} pelajaran singkat sebelum membeli saham pertama Anda.", en: "{n} short lessons before you buy your first stock." },
  allLessonsN: { id: "Lihat semua {n} pelajaran", en: "See all {n} lessons" },
  progress:    { id: "{n} dari {total} selesai", en: "{n} of {total} done" },
  minutes:     { id: "{n} menit", en: "{n} min" },
  ctaStart:    { id: "Mulai", en: "Start" },
  ctaReview:   { id: "Ulangi", en: "Review" },
  moversTitle: { id: "Pergerakan terbaru", en: "Latest movers" },
  moversSub:   { id: "Persentase = perubahan harga dibanding penutupan sebelumnya.", en: "Percentage = price change since the previous close." },
  tabUp:       { id: "Naik terbanyak", en: "Top gainers" },
  tabDown:     { id: "Turun terbanyak", en: "Top losers" },
  tabActive:   { id: "Paling ramai", en: "Most active" },
  colStock:    { id: "Saham", en: "Stock" },
  colPrice:    { id: "Harga", en: "Price" },
  colChange:   { id: "Perubahan", en: "Change" },
  seeAll:      { id: "Lihat semua saham", en: "See all stocks" },
  sectorsTitle:{ id: "Sektor", en: "Sectors" },
  sectorsSub:  { id: "Rata-rata perubahan saham di setiap kelompok bisnis.", en: "Average change of the stocks in each business group." },
  termEyebrow: { id: "Istilah hari ini", en: "Term of the day" },
  openGlossary:{ id: "Buka kamus", en: "Open glossary" },
  screenTitle: { id: "Cari saham dengan cara sederhana", en: "Find stocks the simple way" },
  screenSub:   { id: "Pilih tujuan Anda — kami tampilkan saham yang cocok, tanpa rumus rumit.", en: "Pick a goal — we show the stocks that fit, no formulas needed." },
  nStocks:     { id: "{n} saham", en: "{n} stocks" },

  /* stock page */
  today:       { id: "dari penutupan sebelumnya", en: "since previous close" },
  watch:       { id: "Pantau", en: "Watch" },
  watching:    { id: "Dipantau", en: "Watching" },
  share:       { id: "Salin tautan", en: "Copy link" },
  copied:      { id: "Tautan disalin", en: "Link copied" },
  priceUp:     { id: "Harga naik {pct} dibanding penutupan sebelumnya.", en: "The price is up {pct} since the previous close." },
  priceDown:   { id: "Harga turun {pct} dibanding penutupan sebelumnya.", en: "The price is down {pct} since the previous close." },
  moveSmall:   { id: "Gerakan sebesar ini tergolong biasa dalam sehari.", en: "A move this size is normal for a single day." },
  moveBig:     { id: "Ini gerakan yang cukup besar untuk satu hari — biasanya ada kabar atau sentimen di baliknya.", en: "That's a fairly big move for one day — there's usually news or sentiment behind it." },
  chartTitle:  { id: "Pergerakan harga", en: "Price history" },
  now:         { id: "Sekarang", en: "Now" },
  rangeOver:   { id: "Dalam {range}, harga {dir} {pct} ({from} → {to}).", en: "Over {range}, the price {dir} {pct} ({from} → {to})." },
  rose:        { id: "naik", en: "rose" },
  fell:        { id: "turun", en: "fell" },
  r1M: { id: "1B", en: "1M" }, r6M: { id: "6B", en: "6M" }, r1Y: { id: "1T", en: "1Y" }, r5Y: { id: "5T", en: "5Y" },
  w1M: { id: "1 bulan", en: "1 month" }, w6M: { id: "6 bulan", en: "6 months" }, w1Y: { id: "1 tahun", en: "1 year" }, w5Y: { id: "5 tahun", en: "5 years" },
  ago1M: { id: "1 bulan lalu", en: "1 month ago" }, ago6M: { id: "6 bulan lalu", en: "6 months ago" }, ago1Y: { id: "1 tahun lalu", en: "1 year ago" }, ago5Y: { id: "5 tahun lalu", en: "5 years ago" },
  chartTip:    { id: "Grafik garis ini menunjukkan harga penutupan setiap hari. Arahkan kursor atau sentuh grafik untuk melihat harga.", en: "This line chart shows each day's closing price. Hover or touch the chart to see prices." },
  sampleChart: { id: "Grafik contoh", en: "Sample chart" },
  rangeTitle:  { id: "Rentang harga 1 tahun", en: "1-year price range" },
  rangeHigh:   { id: "Harga sekarang dekat titik tertinggi setahun terakhir. Ini bukan tanda baik atau buruk — hanya posisi harga saat ini.", en: "Today's price is near the top of its range over the last year. That isn't good or bad on its own — it just shows where the price sits." },
  rangeMid:    { id: "Harga sekarang ada di tengah rentang setahun terakhir.", en: "Today's price is in the middle of its range over the last year." },
  rangeLow:    { id: "Harga sekarang dekat titik terendah setahun terakhir. Harga murah bisa punya alasan — cari tahu dulu kenapa.", en: "Today's price is near the bottom of its range over the last year. A low price can have a reason — find out why first." },
  low:         { id: "Terendah", en: "Low" },
  high:        { id: "Tertinggi", en: "High" },
  metricsTitle:{ id: "Angka penting, dijelaskan", en: "Key numbers, explained" },
  metricsSub:  { id: "Tekan tombol ? untuk penjelasan singkat dengan contoh dari saham ini.", en: "Press ? for a short explanation with an example from this stock." },
  explain:     { id: "Jelaskan", en: "Explain" },
  aboutTitle:  { id: "Apa yang dilakukan perusahaan ini?", en: "What does this company do?" },
  listed:      { id: "Tercatat di bursa", en: "Listed on the exchange" },
  hq:          { id: "Kantor pusat", en: "Headquarters" },
  sector:      { id: "Sektor", en: "Sector" },
  checkTitle:  { id: "Sebelum membeli, tanyakan pada diri sendiri", en: "Before you buy, ask yourself" },
  check1:      { id: "Apakah saya memahami cara perusahaan ini menghasilkan uang?", en: "Do I understand how this company makes money?" },
  check2:      { id: "Apakah uang ini tidak saya butuhkan dalam 3–5 tahun ke depan?", en: "Can I leave this money invested for 3–5 years?" },
  check3:      { id: "Apakah saya siap jika harganya turun 20%?", en: "Am I prepared if the price falls 20%?" },
  check4:      { id: "Apakah uang saya sudah tersebar di beberapa saham?", en: "Is my money spread across several stocks?" },
  checkNote:   { id: "Daftar ini hanya untuk Anda — tidak disimpan dan tidak dikirim ke mana pun.", en: "This checklist is just for you — nothing is saved or sent anywhere." },
  riskTitle:   { id: "Hal yang perlu diperhatikan", en: "Things to keep in mind" },
  riskGeneral: { id: "Harga saham bisa turun meskipun perusahaannya sehat.", en: "A share price can fall even when the company is healthy." },
  similarTitle:{ id: "Saham sektor yang sama", en: "Same-sector stocks" },
  buyNote:     { id: "Tumbuh tidak menjual saham. Untuk membeli, gunakan aplikasi perusahaan sekuritas yang terdaftar dan diawasi OJK.", en: "Tumbuh does not sell stocks. To buy, use the app of a brokerage registered with and supervised by OJK." },
  relatedLesson:{ id: "Pelajaran terkait", en: "Related lesson" },
  notFound:    { id: "Saham tidak ditemukan.", en: "Stock not found." },
  backHome:    { id: "Kembali ke beranda", en: "Back to home" },

  /* learn + lesson */
  learnTitle:  { id: "Belajar saham dari nol", en: "Learn stocks from zero" },
  learnSub:    { id: "Pelajaran pendek, bahasa sederhana, dan contoh dari saham Indonesia. Kemajuan Anda tersimpan di perangkat ini.", en: "Short lessons, plain language and examples from Indonesian stocks. Your progress is saved on this device." },
  lessonOf:    { id: "Pelajaran {n} dari {total}", en: "Lesson {n} of {total}" },
  quizTitle:   { id: "Cek pemahaman", en: "Check your understanding" },
  quizRight:   { id: "Tepat!", en: "Correct!" },
  quizWrong:   { id: "Belum tepat.", en: "Not quite." },
  markDone:    { id: "Tandai selesai", en: "Mark as done" },
  done:        { id: "Selesai", en: "Done" },
  prev:        { id: "Sebelumnya", en: "Previous" },
  next:        { id: "Berikutnya", en: "Next" },
  allLessons:  { id: "Semua pelajaran", en: "All lessons" },
  resetProgress:{ id: "Ulang kemajuan", en: "Reset progress" },

  /* glossary */
  glossaryTitle:{ id: "Kamus saham", en: "Stock glossary" },
  glossarySub: { id: "Istilah pasar modal dalam bahasa sehari-hari.", en: "Stock market terms in everyday language." },
  glossarySearch:{ id: "Cari istilah…", en: "Search terms…" },
  glossaryNone:{ id: "Istilah tidak ditemukan.", en: "No terms found." },
  example:     { id: "Contoh", en: "Example" },
  alsoKnown:   { id: "Dalam bahasa Inggris", en: "In Indonesian" },

  /* screener */
  screenerTitle:{ id: "Penyaring saham sederhana", en: "Simple stock screener" },
  screenerSub: { id: "Pilih satu atau beberapa tujuan. Hasil hanya sebagai titik awal belajar, bukan rekomendasi.", en: "Pick one or more goals. Results are a starting point for learning, not a recommendation." },
  results:     { id: "{n} saham cocok", en: "{n} matching stocks" },
  noResults:   { id: "Tidak ada saham yang cocok dengan semua pilihan. Coba kurangi pilihan.", en: "No stocks match every choice. Try fewer filters." },
  clear:       { id: "Hapus pilihan", en: "Clear" },
  allSectors:  { id: "Semua sektor", en: "All sectors" },
  colYield:    { id: "Dividen", en: "Yield" }
};

/* ---- helpers ---------------------------------------------------------- */
(function () {
  const KEY = "tumbuh-lang";

  function readSaved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* private mode: ignore */ }
  }

  const fromUrl = new URLSearchParams(location.search).get("lang");
  let lang = (fromUrl === "en" || fromUrl === "id") ? fromUrl : (readSaved() || "id");
  const listeners = [];

  TUMBUH.lang = () => lang;

  /* t("key", {n: 3}) → translated string with {placeholders} filled in */
  TUMBUH.t = function (key, vars) {
    const entry = TUMBUH.STRINGS[key];
    let s = entry ? (entry[lang] || entry.id) : key;
    if (vars) Object.keys(vars).forEach((k) => { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  };

  /* L({id: "...", en: "..."}) → the current language's version */
  TUMBUH.L = (obj) => (obj ? (obj[lang] || obj.id) : "");

  TUMBUH.setLang = function (next) {
    if (next === lang) return;
    lang = next;
    save(lang);
    TUMBUH.applyStatic();
    listeners.forEach((fn) => fn(lang));
  };
  TUMBUH.onLang = (fn) => listeners.push(fn);

  /* Fill every [data-i18n] and [data-i18n-attr] element on the page */
  TUMBUH.applyStatic = function (root) {
    root = root || document;
    document.documentElement.lang = lang;
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = TUMBUH.t(el.dataset.i18n);
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = val; else el.textContent = val;
    });
    root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(",").forEach((pair) => {
        const [attr, key] = pair.split(":");
        el.setAttribute(attr.trim(), TUMBUH.t(key.trim()));
      });
    });
    document.querySelectorAll(".lang-toggle button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
  };

  /* ---- number formatting -------------------------------------------- */
  const locale = () => (lang === "id" ? "id-ID" : "en-US");
  TUMBUH.num = (n, d = 0) =>
    new Intl.NumberFormat(locale(), { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
  TUMBUH.idr = (n) => (lang === "id" ? "Rp" : "IDR ") + TUMBUH.num(n, 0);
  TUMBUH.pct = (n, d = 2, signed = true) => {
    const sign = !signed ? "" : n > 0 ? "+" : n < 0 ? "−" : "";
    return sign + TUMBUH.num(Math.abs(n), d) + "%";
  };
  TUMBUH.date = (iso) =>
    new Intl.DateTimeFormat(locale(), { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso + "T00:00:00"));
  TUMBUH.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
})();
