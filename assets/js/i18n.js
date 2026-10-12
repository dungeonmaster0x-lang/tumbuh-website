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

  /* market map */
  hmTitle:     { id: "Peta pasar LQ45", en: "LQ45 market map" },
  hmSub:       { id: "Setiap kotak adalah satu saham. Makin besar kotaknya, makin besar nilai perusahaannya.", en: "Each box is one stock. The bigger the box, the bigger the company." },
  hm1D:        { id: "Terakhir", en: "Latest" },
  hm1M:        { id: "1 bulan", en: "1 month" },
  hm1Y:        { id: "1 tahun", en: "1 year" },
  hmNote:      { id: "Warna = perubahan harga. Tekan kotak untuk membuka sahamnya.", en: "Colour = price change. Tap a box to open the stock." },

  /* candlesticks + dividends (stock page) */
  chartType:   { id: "Jenis grafik", en: "Chart type" },
  chartLine:   { id: "Garis", en: "Line" },
  chartCandle: { id: "Lilin", en: "Candles" },
  candleTip:   { id: "Setiap lilin = satu hari bursa. Hijau: ditutup lebih tinggi dari pembukaan; merah: lebih rendah.", en: "Each candle = one trading day. Green: closed above its open; red: below." },
  candleLearn: { id: "Belajar membaca lilin →", en: "Learn to read candles →" },
  candleMax:   { id: "Grafik lilin tersedia sampai 1 tahun", en: "Candles are available up to 1 year" },
  divTitle:    { id: "Riwayat dividen", en: "Dividend history" },
  divNoDataYet:{ id: "Riwayat dividen akan muncul setelah data harga sungguhan dimuat.", en: "Dividend history appears once real price data has been loaded." },
  divNone:     { id: "Menurut data kami, {code} tidak membagikan dividen tunai dalam 10 tahun terakhir.", en: "According to our data, {code} hasn't paid a cash dividend in the last 10 years." },
  divTTM:      { id: "Dalam 12 bulan terakhir, {code} membagikan dividen total {amt} per lembar — sekitar {pct} dari harga sekarang.", en: "Over the last 12 months, {code} paid {amt} per share in dividends — about {pct} of today's price." },
  divNoTTM:    { id: "{code} tidak membagikan dividen dalam 12 bulan terakhir.", en: "{code} hasn't paid a dividend in the last 12 months." },
  divLast:     { id: "Pembayaran terakhir: {amt} per lembar (ex date {date}).", en: "Latest payment: {amt} per share (ex date {date})." },
  divChartLabel:{ id: "Total dividen per lembar {code} per tahun", en: "{code}'s total dividend per share by year" },
  divCaption:  { id: "Total dividen per lembar (Rupiah) menurut tahun ex date. Satu tahun bisa berisi lebih dari satu pembayaran. Sumber: Yahoo Finance.", en: "Total dividend per share (rupiah) by ex-date year. One year can include more than one payment. Source: Yahoo Finance." },
  divAll:      { id: "Lihat semua {n} pembayaran", en: "See all {n} payments" },
  divLearn:    { id: "Pelajari tanggal-tanggal dividen", en: "Learn about dividend dates" },

  themeDark:   { id: "Mode gelap", en: "Dark mode" },
  themeLight:  { id: "Mode terang", en: "Light mode" },

  /* glossary pop-ups */
  glHint:      { id: "Kata bergaris titik-titik bisa ditekan untuk melihat artinya.", en: "Words with a dotted underline can be tapped to see what they mean." },

  /* achievements */
  navAch:      { id: "Prestasi", en: "Achievements" },
  achEyebrow:  { id: "Prestasi", en: "Achievements" },
  achTitle:    { id: "Prestasi Anda", en: "Your achievements" },
  achSub:      { id: "Kumpulkan lencana dengan belajar dan berlatih. Selesaikan semua pelajaran untuk membuka sertifikat.", en: "Collect badges by learning and practising. Finish every lesson to unlock your certificate." },
  achCount:    { id: "{n} dari {total} terbuka", en: "{n} of {total} unlocked" },
  achDone:     { id: "Terbuka", en: "Unlocked" },
  achTodo:     { id: "Belum terbuka", en: "Locked" },
  achNew:      { id: "Prestasi baru!", en: "New achievement!" },
  achNewMany:  { id: "{n} prestasi baru!", en: "{n} new achievements!" },
  achSee:      { id: "Lihat", en: "View" },
  achStored:   { id: "Prestasi dan sertifikat tersimpan di browser perangkat ini.", en: "Achievements and your certificate are saved in this device's browser." },
  ach_first:   { id: "Langkah pertama", en: "First step" },
  achHint_first:{ id: "Selesaikan satu pelajaran.", en: "Finish one lesson." },
  ach_dasar:   { id: "Paham dasar", en: "Got the basics" },
  achHint_dasar:{ id: "Selesaikan Modul 1.", en: "Finish Module 1." },
  ach_analisis:{ id: "Pembaca saham", en: "Stock reader" },
  achHint_analisis:{ id: "Selesaikan Modul 2.", en: "Finish Module 2." },
  ach_praktik: { id: "Siap berinvestasi", en: "Ready to invest" },
  achHint_praktik:{ id: "Selesaikan Modul 3.", en: "Finish Module 3." },
  ach_quiz:    { id: "Tepat sasaran", en: "Sharp shooter" },
  achHint_quiz:{ id: "Jawab 5 kuis dengan benar pada percobaan pertama.", en: "Answer 5 quizzes right on the first try." },
  ach_glossary:{ id: "Kamus berjalan", en: "Walking dictionary" },
  achHint_glossary:{ id: "Buka 10 penjelasan istilah di dalam pelajaran.", en: "Open 10 term explanations inside lessons." },
  ach_watch:   { id: "Pengamat", en: "Watcher" },
  achHint_watch:{ id: "Pantau 3 saham.", en: "Watch 3 stocks." },
  ach_compare: { id: "Pembanding", en: "Comparer" },
  achHint_compare:{ id: "Bandingkan dua saham.", en: "Compare two stocks." },
  ach_dca:     { id: "Perencana", en: "Planner" },
  achHint_dca: { id: "Coba simulasi investasi rutin di Kalkulator.", en: "Try the monthly-investing simulator in the Calculator." },
  ach_trade:   { id: "Transaksi pertama", en: "First trade" },
  achHint_trade:{ id: "Lakukan transaksi di portofolio latihan.", en: "Make a trade in the practice portfolio." },
  ach_diverse: { id: "Tidak satu keranjang", en: "Not one basket" },
  achHint_diverse:{ id: "Miliki saham dari 3 sektor berbeda di portofolio latihan.", en: "Hold stocks from 3 different sectors in the practice portfolio." },
  ach_graduate:{ id: "Lulus Tumbuh", en: "Tumbuh graduate" },
  achHint_graduate:{ id: "Selesaikan semua pelajaran.", en: "Finish every lesson." },
  certTitle:   { id: "Sertifikat Anda", en: "Your certificate" },
  certLockedTitle:{ id: "Sertifikat masih terkunci", en: "Your certificate is still locked" },
  certLockedSub:{ id: "Selesaikan {n} pelajaran lagi untuk membuka sertifikat penyelesaian.", en: "Finish {n} more lessons to unlock your completion certificate." },
  certContinue:{ id: "Lanjutkan belajar", en: "Keep learning" },
  certNameLabel:{ id: "Nama di sertifikat", en: "Name on the certificate" },
  certNamePh:  { id: "Tulis nama Anda", en: "Type your name" },
  certEyebrow: { id: "Sertifikat penyelesaian", en: "Certificate of completion" },
  certGiven:   { id: "Diberikan kepada", en: "Presented to" },
  certText:    { id: "atas keberhasilan menyelesaikan seluruh {n} pelajaran kelas saham untuk pemula di Tumbuh.", en: "for completing all {n} lessons of the beginner stock course at Tumbuh." },
  certDate:    { id: "Tanggal", en: "Date" },
  certBadges:  { id: "Prestasi", en: "Achievements" },
  certNote:    { id: "Sertifikat ini adalah tanda belajar mandiri, bukan sertifikasi profesi.", en: "This certificate marks self-study, not a professional qualification." },
  certPrint:   { id: "Cetak / simpan PDF", en: "Print / save as PDF" },
  certPrintHint:{ id: "Di jendela cetak, pilih \"Simpan sebagai PDF\" untuk menyimpan, atau ambil tangkapan layar untuk dibagikan.", en: "In the print window, choose \"Save as PDF\" to keep it, or take a screenshot to share." },

  /* practice portfolio */
  navPractice: { id: "Latihan", en: "Practice" },
  pfEyebrow:   { id: "Uang latihan, harga sungguhan", en: "Pretend money, real prices" },
  pfTitle:     { id: "Portofolio latihan", en: "Practice portfolio" },
  pfIntro:     { id: "Dapatkan Rp100 juta uang latihan dan coba membeli serta menjual saham LQ45. Tidak ada uang sungguhan yang dipakai — ini tempat aman untuk belajar dari keputusan sendiri.", en: "Get IDR 100 million in practice money and try buying and selling LQ45 stocks. No real money is involved — it's a safe place to learn from your own decisions." },
  pfRule1:     { id: "Modal awal Rp100.000.000 uang latihan.", en: "IDR 100,000,000 of practice money to start." },
  pfRule2:     { id: "Transaksi memakai harga penutupan terakhir (saat ini {date}) dan diperbarui setiap hari bursa.", en: "Trades use the latest closing price (currently {date}), updated every trading day." },
  pfRule3:     { id: "Beli per lot, dengan biaya beli 0,15% dan biaya jual 0,25% — seperti di dunia nyata.", en: "Buy in lots, with a 0.15% buy fee and 0.25% sell fee — like the real thing." },
  pfRule4:     { id: "Tersimpan di browser ini saja. Tidak perlu daftar akun.", en: "Saved in this browser only. No sign-up needed." },
  pfStart:     { id: "Mulai dengan Rp100 juta", en: "Start with IDR 100 million" },
  pfSince:     { id: "Dimulai {date} · harga per {prices}", en: "Started {date} · prices as of {prices}" },
  pfTotal:     { id: "Nilai total", en: "Total value" },
  pfResult:    { id: "Hasil sejauh ini", en: "Result so far" },
  pfVsIhsg:    { id: "IHSG sejak Anda mulai", en: "IHSG since you started" },
  pfCash:      { id: "Uang tunai", en: "Cash" },
  pfHoldings:  { id: "Saham yang Anda miliki", en: "Your holdings" },
  pfLotsAvg:   { id: "Jumlah", en: "Quantity" },
  pfValue:     { id: "Nilai", en: "Value" },
  pfPL:        { id: "Untung/rugi", en: "Gain/loss" },
  pfActions:   { id: "Tindakan", en: "Actions" },
  pfOfTotal:   { id: "dari total", en: "of total" },
  pfAvg:       { id: "rata-rata", en: "avg" },
  pfNow:       { id: "harga", en: "price" },
  pfEmpty:     { id: "Belum ada saham. Pilih saham di kotak transaksi untuk membeli yang pertama.", en: "No stocks yet. Pick one in the trade box to make your first purchase." },
  pfProgress:  { id: "Perkembangan dibanding IHSG", en: "Progress versus IHSG" },
  pfChartSoon: { id: "Grafik muncul setelah ada harga dari minimal dua hari bursa. Kembali lagi besok!", en: "The chart appears once there are prices from at least two trading days. Come back tomorrow!" },
  pfChartLabel:{ id: "Perubahan portofolio latihan dibanding IHSG", en: "Practice portfolio change versus IHSG" },
  pfYou:       { id: "Portofolio Anda", en: "Your portfolio" },
  pfCheckTitle:{ id: "Cek portofolio", en: "Portfolio check" },
  pfTipConcentrated:{ id: "{code} sudah {pct}% dari portofolio Anda. Jika saham ini turun tajam, seluruh portofolio ikut terpukul.", en: "{code} is {pct}% of your portfolio. If it falls sharply, your whole portfolio takes the hit." },
  pfTipSpread: { id: "Tidak ada satu saham yang mendominasi portofolio Anda. Bagus.", en: "No single stock dominates your portfolio. Nice." },
  pfTipSectors:{ id: "Saham Anda hanya dari {n} sektor. Coba sebar ke beberapa sektor berbeda.", en: "Your stocks come from only {n} sector(s). Try spreading across a few different sectors." },
  pfTipSectorsOk:{ id: "Saham Anda tersebar di {n} sektor.", en: "Your stocks are spread across {n} sectors." },
  pfTipCash:   { id: "Sebagian besar dana masih berupa uang tunai. Itu tidak apa-apa — tidak harus membeli semuanya sekaligus.", en: "Most of your money is still cash. That's fine — you don't have to invest it all at once." },
  pfHistory:   { id: "Riwayat transaksi", en: "Trade history" },
  pfReset:     { id: "Mulai ulang dari Rp100 juta", en: "Start over from IDR 100 million" },
  pfResetAsk:  { id: "Hapus semua saham dan riwayat, lalu mulai lagi dari Rp100 juta?", en: "Delete all holdings and history and start again from IDR 100 million?" },
  pfResetYes:  { id: "Ya, mulai ulang", en: "Yes, start over" },
  pfResetNo:   { id: "Batal", en: "Cancel" },
  pfDisclaimer:{ id: "Portofolio latihan memakai uang pura-pura untuk belajar. Hasilnya tidak mencerminkan hasil investasi sungguhan, dan harga transaksi nyata bisa berbeda dari harga penutupan.", en: "The practice portfolio uses pretend money for learning. Its results don't reflect real investing, and real trade prices can differ from closing prices." },
  tradeTitle:  { id: "Transaksi", en: "Trade" },
  tradeBuy:    { id: "Beli", en: "Buy" },
  tradeSell:   { id: "Jual", en: "Sell" },
  tradePick:   { id: "Pilih saham…", en: "Choose a stock…" },
  tradeYouHave:{ id: "Anda punya {n} lot", en: "you have {n} lots" },
  tradePrice:  { id: "Harga per lembar", en: "Price per share" },
  tradeValue:  { id: "Nilai saham", en: "Share value" },
  tradePay:    { id: "Total dibayar", en: "Total to pay" },
  tradeGet:    { id: "Total diterima", en: "Total received" },
  tradeBuyNow: { id: "Beli sekarang", en: "Buy now" },
  tradeSellNow:{ id: "Jual sekarang", en: "Sell now" },
  tradeNoCash: { id: "Uang tunai tidak cukup. Kurangi jumlah lot.", en: "Not enough cash. Reduce the number of lots." },
  tradeNoShares:{ id: "Anda tidak punya lot sebanyak itu untuk dijual.", en: "You don't own that many lots to sell." },
  tradeBought: { id: "Berhasil membeli {lots} lot {code} di {price}.", en: "Bought {lots} lots of {code} at {price}." },
  tradeSold:   { id: "Berhasil menjual {lots} lot {code} di {price}.", en: "Sold {lots} lots of {code} at {price}." },
  tradeNote:   { id: "Harga transaksi = harga penutupan {date}.", en: "Trade price = the closing price on {date}." },
  practiceCta: { id: "Coba di portofolio latihan", en: "Try it in the practice portfolio" },

  /* calculator page */
  navCalc:     { id: "Kalkulator", en: "Calculator" },
  calcTitle:   { id: "Kalkulator saham", en: "Stock calculators" },
  calcSub:     { id: "Hitung sendiri sebelum bertransaksi: berapa lot yang terjangkau, untung-rugi setelah biaya, dan hasil investasi rutin.", en: "Do the maths before you trade: how many lots you can afford, profit after fees, and how regular investing would have turned out." },
  calcStock:   { id: "Saham", en: "Stock" },
  calcPrice:   { id: "Harga per lembar", en: "Price per share" },
  calcPriceHint:{ id: "Terisi otomatis dari harga penutupan terakhir. Bisa diubah.", en: "Filled in from the latest close. You can change it." },
  calcBudget:  { id: "Dana yang tersedia", en: "Money available" },
  calcFeeBuy:  { id: "Biaya beli", en: "Buy fee" },
  calcFeeSell: { id: "Biaya jual", en: "Sell fee" },
  calcFeeHint: { id: "Contoh saja — cek biaya di aplikasi sekuritas Anda.", en: "An example only — check your broker's actual fees." },
  calcFeeSellHint:{ id: "Biaya jual biasanya lebih tinggi karena sudah termasuk pajak penjualan 0,1%. Angka di sini hanya contoh — cek biaya sekuritas Anda.", en: "The sell fee is usually higher because it includes the 0.1% sales tax. These figures are examples — check your broker's fees." },
  calcLotTitle:{ id: "Berapa lot yang bisa saya beli?", en: "How many lots can I buy?" },
  calcLotSub:  { id: "Masukkan dana Anda, dan kami hitung jumlah lot termasuk biaya beli.", en: "Enter your money and we'll work out the lots, including the buy fee." },
  calcLots:    { id: "Bisa membeli", en: "You can buy" },
  calcShares:  { id: "Jumlah lembar", en: "Number of shares" },
  calcSharesUnit:{ id: "lembar", en: "shares" },
  calcStockCost:{ id: "Harga saham", en: "Cost of shares" },
  calcFee:     { id: "Biaya beli", en: "Buy fee" },
  calcTotal:   { id: "Total dibayar", en: "Total paid" },
  calcLeft:    { id: "Sisa dana", en: "Money left" },
  calcLotSay:  { id: "Dengan {budget}, Anda bisa membeli {lots} lot di harga {price} per lembar.", en: "With {budget} you can buy {lots} lots at {price} per share." },
  calcLotNone: { id: "Dana belum cukup untuk 1 lot. Dibutuhkan sekitar {perLot} termasuk biaya.", en: "Not enough for 1 lot yet. You need about {perLot} including fees." },
  calcPLTitle: { id: "Untung atau rugi setelah biaya?", en: "Profit or loss after fees?" },
  calcPLSub:   { id: "Lihat hasil bersih sebuah transaksi dan harga jual minimum agar tidak rugi.", en: "See the net result of a trade and the minimum sell price to avoid a loss." },
  calcBuyPrice:{ id: "Harga beli", en: "Buy price" },
  calcSellPrice:{ id: "Harga jual", en: "Sell price" },
  calcLotsIn:  { id: "Jumlah", en: "Quantity" },
  calcProfit:  { id: "Untung bersih", en: "Net profit" },
  calcLoss:    { id: "Rugi bersih", en: "Net loss" },
  calcPaid:    { id: "Total dibayar saat beli", en: "Total paid when buying" },
  calcReceived:{ id: "Total diterima saat jual", en: "Total received when selling" },
  calcBreakEven:{ id: "Harga impas", en: "Break-even price" },
  calcBESay:   { id: "Karena ada biaya, harga harus naik ke sekitar {be} — bukan sekadar di atas {buy} — sebelum Anda benar-benar untung.", en: "Because of fees, the price needs to reach about {be} — not just above {buy} — before you actually make money." },
  calcDcaTitle:{ id: "Bagaimana jika saya berinvestasi tiap bulan?", en: "What if I had invested every month?" },
  calcDcaSub:  { id: "Simulasi membeli saham dengan jumlah tetap di awal setiap bulan, memakai harga penutupan masa lalu.", en: "A simulation of buying a fixed amount at the start of every month, using past closing prices." },
  calcMonthly: { id: "Jumlah per bulan", en: "Amount per month" },
  calcPeriod:  { id: "Selama", en: "Over" },
  calcYears:   { id: "{n} tahun", en: "{n} yr" },
  calcDcaInvested:{ id: "Total disetor", en: "Total put in" },
  calcDcaValue:{ id: "Nilai sekarang", en: "Value today" },
  calcDcaShares:{ id: "Saham terkumpul", en: "Shares collected" },
  calcDcaAvg:  { id: "Harga rata-rata", en: "Average price" },
  calcDcaNow:  { id: "sekarang {p}", en: "now {p}" },
  calcDcaChart:{ id: "Grafik nilai investasi rutin dibanding total uang yang disetor", en: "Chart of the regular investment's value versus total money put in" },
  calcDcaSay:  { id: "Dengan membeli {code} sebanyak {amt} di awal setiap bulan selama {m} bulan, uang {invested} Anda kini bernilai {value}.", en: "Buying {amt} of {code} at the start of each month for {m} months, your {invested} would now be worth {value}." },
  calcDcaLump: { id: "Sebagai pembanding, jika seluruh uang itu dibelikan di bulan pertama, nilainya kini {value} ({pct}).", en: "For comparison, putting all of it in during the first month would now be worth {value} ({pct})." },
  calcDisclaimer:{ id: "Hasil kalkulator adalah perkiraan untuk belajar. Simulasi memakai harga masa lalu, tidak menghitung dividen, dan tidak menjamin hasil di masa depan.", en: "Calculator results are estimates for learning. Simulations use past prices, ignore dividends, and don't guarantee future results." },

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
  cmpPBV:      { id: "PBV", en: "PBV" },
  cmpNotePBV:  { id: "Harga dibanding nilai buku. Paling berguna untuk membandingkan bank dengan bank.", en: "Price versus book value. Most useful for comparing one bank with another." },
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
  moduleProgress:{ id: "{n}/{total} selesai · {mins} menit", en: "{n}/{total} done · {mins} min" },
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
