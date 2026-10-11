/* ==========================================================================
   Tumbuh — site data
   --------------------------------------------------------------------------
   PRICES ARE SAMPLE DATA. Run `python tools/update_prices.py` to replace the
   numbers in assets/js/market-data.js with recent real closing prices.
   This file holds lessons, glossary terms and screener presets. The list
   of companies is in companies.js. Every text has an `id`
   (Bahasa Indonesia) and an `en` (English) version.
   ========================================================================== */

window.TUMBUH = window.TUMBUH || {};

/* Screener presets -------------------------------------------------------- */
TUMBUH.presets = [
  { key: "big", icon: "building",
    title: { id: "Perusahaan besar & stabil", en: "Big, stable companies" },
    desc:  { id: "Nilai perusahaan di atas Rp100 triliun. Biasanya pergerakan harganya lebih tenang.", en: "Companies worth over IDR 100 trillion. Their prices usually move more calmly." } },
  { key: "dividend", icon: "coins",
    title: { id: "Rutin membagi dividen", en: "Pays dividends" },
    desc:  { id: "Perusahaan dengan imbal hasil dividen di atas 3% per tahun.", en: "Companies with a dividend yield above 3% a year." } },
  { key: "cheap", icon: "tag",
    title: { id: "Dekat harga terendah 1 tahun", en: "Near its 1-year low" },
    desc:  { id: "Harga sedang di bagian bawah rentang setahun. Cari tahu alasannya dulu sebelum membeli.", en: "Trading in the lower part of its 1-year range. Find out why before buying." } },
  { key: "brand", icon: "bag",
    title: { id: "Merek yang Anda kenal", en: "Brands you know" },
    desc:  { id: "Perusahaan di balik produk dan layanan yang dipakai sehari-hari.", en: "The companies behind products and services people use every day." } }
];

/* Lessons ----------------------------------------------------------------- */
TUMBUH.lessons = [
  {
    slug: "apa-itu-saham", mins: 5,
    title: { id: "Apa itu saham?", en: "What is a stock?" },
    desc:  { id: "Memiliki sebagian kecil dari sebuah perusahaan — dan apa artinya bagi Anda.", en: "Owning a small piece of a company — and what that means for you." },
    body: {
      id: `
<p>Bayangkan sebuah warung kopi yang ingin membuka cabang baru. Pemiliknya butuh modal, jadi ia mengajak sepuluh teman ikut patungan. Setiap teman kini memiliki <strong>sebagian kecil</strong> dari warung itu. Saham bekerja dengan cara yang sama, hanya dalam skala jauh lebih besar.</p>
<h2>Saham = bukti kepemilikan</h2>
<p>Saat Anda membeli saham sebuah perusahaan, Anda menjadi salah satu pemiliknya. Kepemilikan Anda kecil, tetapi nyata: Anda berhak atas sebagian keuntungan perusahaan dan boleh ikut memberi suara dalam rapat pemegang saham.</p>
<div class="callout"><strong>Dalam satu kalimat</strong><p>Saham adalah potongan kecil kepemilikan sebuah perusahaan yang bisa dibeli dan dijual di bursa.</p></div>
<h2>Dari mana keuntungannya?</h2>
<ul>
<li><strong>Kenaikan harga (capital gain).</strong> Jika Anda membeli di Rp1.000 lalu harganya naik menjadi Rp1.200, Anda untung Rp200 per lembar saat menjual.</li>
<li><strong>Dividen.</strong> Sebagian perusahaan membagikan sebagian labanya kepada pemegang saham, biasanya setahun sekali.</li>
</ul>
<h2>Kenapa harganya naik turun?</h2>
<p>Harga saham ditentukan oleh pembeli dan penjual. Jika banyak orang ingin membeli, harga naik. Jika banyak yang ingin menjual, harga turun. Kabar tentang laba perusahaan, kondisi ekonomi, atau suku bunga bisa mengubah keinginan orang untuk membeli atau menjual.</p>
<h2>Di mana saham diperdagangkan?</h2>
<p>Di Indonesia, saham perusahaan terbuka diperdagangkan di <strong>Bursa Efek Indonesia (BEI)</strong>. Anda tidak membeli langsung dari bursa, melainkan lewat perusahaan sekuritas (broker) yang terdaftar dan diawasi OJK.</p>`,
      en: `
<p>Imagine a coffee shop that wants to open a new branch. The owner needs money, so she invites ten friends to chip in. Each friend now owns <strong>a small piece</strong> of the shop. Stocks work the same way, just on a much bigger scale.</p>
<h2>A stock = proof of ownership</h2>
<p>When you buy a company's stock, you become one of its owners. Your share is small but real: you're entitled to part of the company's profits and can vote at shareholder meetings.</p>
<div class="callout"><strong>In one sentence</strong><p>A stock is a small slice of ownership in a company that can be bought and sold on an exchange.</p></div>
<h2>How do you make money?</h2>
<ul>
<li><strong>Price increase (capital gain).</strong> If you buy at IDR 1,000 and the price rises to IDR 1,200, you make IDR 200 per share when you sell.</li>
<li><strong>Dividends.</strong> Some companies pay part of their profit to shareholders, usually once a year.</li>
</ul>
<h2>Why do prices move?</h2>
<p>Prices are set by buyers and sellers. If many people want to buy, the price rises. If many want to sell, it falls. News about company profits, the economy or interest rates can change how much people want to buy or sell.</p>
<h2>Where are stocks traded?</h2>
<p>In Indonesia, shares of listed companies trade on the <strong>Indonesia Stock Exchange (IDX, or BEI)</strong>. You don't buy directly from the exchange but through a brokerage registered with and supervised by OJK, the financial regulator.</p>`
    },
    quiz: {
      q: { id: "Anda memiliki saham sebuah perusahaan. Artinya…", en: "You own shares in a company. That means…" },
      options: [
        { id: "Anda meminjamkan uang ke perusahaan", en: "You lent money to the company" },
        { id: "Anda memiliki sebagian kecil perusahaan", en: "You own a small part of the company" },
        { id: "Anda pasti mendapat untung setiap tahun", en: "You are guaranteed a profit every year" }
      ],
      answer: 1,
      explain: { id: "Benar — saham adalah kepemilikan. Untung tidak pernah dijamin: harga bisa turun dan dividen bisa tidak dibagikan.", en: "Right — a stock is ownership. Profit is never guaranteed: prices can fall and dividends can be skipped." }
    }
  },
  {
    slug: "membaca-harga-saham", mins: 7,
    title: { id: "Cara membaca harga saham", en: "How to read a stock price" },
    desc:  { id: "Arti angka hijau, merah, persentase, dan lot.", en: "What green, red, percentages and lots mean." },
    body: {
      id: `
<p>Saat membuka halaman saham, Anda akan melihat beberapa angka. Kelihatannya rumit, tetapi hanya ada beberapa hal yang perlu dipahami terlebih dulu.</p>
<h2>Harga terakhir</h2>
<p>Angka terbesar adalah <strong>harga terakhir</strong>: harga transaksi terbaru untuk satu lembar saham. Misalnya BBCA Rp9.875 berarti satu lembar saham terakhir berpindah tangan di harga itu.</p>
<h2>Hijau, merah, dan persentase</h2>
<p>Perubahan selalu dibandingkan dengan <strong>harga penutupan kemarin</strong>. Hijau berarti lebih tinggi, merah berarti lebih rendah. Persentase menunjukkan seberapa besar perubahannya.</p>
<div class="callout"><strong>Contoh</strong><p>Penutupan kemarin Rp1.000, sekarang Rp1.030. Perubahannya +Rp30 atau +3%. Merah atau hijau dalam sehari bukan tanda bagus atau buruk — itu hanya pergerakan harian.</p></div>
<h2>Lot: satuan pembelian</h2>
<p>Di BEI, saham dibeli dalam satuan <strong>lot</strong>. Satu lot = 100 lembar. Jadi jika harga saham Rp1.030, modal minimum untuk 1 lot adalah Rp103.000, ditambah biaya broker.</p>
<h2>Volume</h2>
<p>Volume adalah jumlah lembar yang diperdagangkan hari itu. Volume tinggi berarti banyak pembeli dan penjual, sehingga saham lebih mudah dibeli atau dijual.</p>`,
      en: `
<p>When you open a stock page you'll see several numbers. It looks complicated, but there are only a few things to understand first.</p>
<h2>Last price</h2>
<p>The biggest number is the <strong>last price</strong>: the most recent trade price for one share. For example, BBCA at IDR 9,875 means one share last changed hands at that price.</p>
<h2>Green, red and percentages</h2>
<p>Changes are always compared with <strong>yesterday's closing price</strong>. Green means higher, red means lower. The percentage shows how big the change is.</p>
<div class="callout"><strong>Example</strong><p>Yesterday's close was IDR 1,000; now it's IDR 1,030. The change is +IDR 30, or +3%. Red or green on one day isn't good or bad — it's just daily movement.</p></div>
<h2>Lots: the buying unit</h2>
<p>On the IDX, shares are bought in <strong>lots</strong>. One lot = 100 shares. So if a share costs IDR 1,030, the minimum to buy 1 lot is IDR 103,000, plus broker fees.</p>
<h2>Volume</h2>
<p>Volume is the number of shares traded that day. High volume means many buyers and sellers, so the stock is easier to buy or sell.</p>`
    },
    quiz: {
      q: { id: "Harga saham Rp2.500. Berapa modal minimum untuk membeli 1 lot (sebelum biaya)?", en: "A share costs IDR 2,500. What's the minimum to buy 1 lot (before fees)?" },
      options: [
        { id: "Rp2.500", en: "IDR 2,500" },
        { id: "Rp25.000", en: "IDR 25,000" },
        { id: "Rp250.000", en: "IDR 250,000" }
      ],
      answer: 2,
      explain: { id: "1 lot = 100 lembar, jadi Rp2.500 × 100 = Rp250.000.", en: "1 lot = 100 shares, so IDR 2,500 × 100 = IDR 250,000." }
    }
  },
  {
    slug: "indeks-ihsg-lq45", mins: 6,
    title: { id: "Indeks saham: IHSG dan LQ45", en: "Stock indices: IHSG and LQ45" },
    desc:  { id: "Satu angka untuk membaca kondisi pasar, dan kenapa 45 saham ini penting.", en: "One number to read the whole market, and why these 45 stocks matter." },
    body: {
      id: `
<p>Ada lebih dari 900 saham di Bursa Efek Indonesia. Melihat semuanya satu per satu tentu melelahkan. Karena itu ada <strong>indeks</strong>: satu angka yang merangkum pergerakan sekelompok saham.</p>
<h2>IHSG: termometer pasar</h2>
<p><strong>Indeks Harga Saham Gabungan (IHSG)</strong> mencakup seluruh saham yang tercatat di BEI. Saat berita mengatakan "pasar naik hari ini", biasanya yang dimaksud adalah IHSG naik.</p>
<p>IHSG dihitung berdasarkan <strong>nilai pasar</strong>. Artinya, perusahaan besar seperti bank-bank raksasa punya pengaruh jauh lebih besar terhadap IHSG dibanding perusahaan kecil.</p>
<div class="callout"><strong>Perumpamaan</strong><p>Bayangkan rata-rata berat badan satu kelas. Jika satu murid yang sangat besar naik 5 kg, rata-rata kelas ikut naik lebih banyak daripada jika murid kecil yang naik 5 kg. Begitu juga saham besar terhadap IHSG.</p></div>
<h2>LQ45: 45 saham pilihan</h2>
<p><strong>LQ45</strong> berisi 45 saham yang paling <em>likuid</em> (paling ramai diperdagangkan) dan bernilai pasar besar. BEI mengevaluasi daftarnya secara berkala, sehingga ada saham yang masuk dan keluar.</p>
<ul>
<li><strong>Likuid</strong> berarti mudah dibeli dan dijual tanpa harga bergeser terlalu jauh.</li>
<li>Masuk LQ45 <strong>bukan jaminan</strong> sahamnya bagus atau akan naik — hanya tanda bahwa sahamnya besar dan ramai.</li>
</ul>
<p>Semua saham di situs Tumbuh adalah anggota LQ45, supaya Anda belajar dari saham yang paling sering dibicarakan.</p>
<h2>Indeks lain</h2>
<p>BEI juga punya indeks seperti <strong>IDX30</strong> (30 saham) dan <strong>IDX80</strong> (80 saham), serta indeks per sektor. Ada pula reksa dana dan ETF yang meniru isi indeks, sehingga investor bisa memiliki banyak saham sekaligus dalam satu produk.</p>`,
      en: `
<p>There are more than 900 stocks on the Indonesia Stock Exchange. Following them one by one would be exhausting. That's why we have <strong>indices</strong>: a single number that sums up how a group of stocks is moving.</p>
<h2>IHSG: the market's thermometer</h2>
<p>The <strong>Jakarta Composite Index (IHSG)</strong> covers every stock listed on the IDX. When the news says "the market is up today", it usually means the IHSG went up.</p>
<p>The IHSG is weighted by <strong>market value</strong>. That means big companies, like the giant banks, move the index far more than small companies do.</p>
<div class="callout"><strong>An analogy</strong><p>Think of the average weight of a class. If one very large pupil gains 5 kg, the class average rises more than if a small pupil gains 5 kg. Big stocks affect the IHSG the same way.</p></div>
<h2>LQ45: 45 selected stocks</h2>
<p><strong>LQ45</strong> holds the 45 most <em>liquid</em> (most actively traded) stocks with large market values. The exchange reviews the list regularly, so stocks join and leave.</p>
<ul>
<li><strong>Liquid</strong> means easy to buy and sell without the price moving too much.</li>
<li>Being in LQ45 is <strong>not a guarantee</strong> a stock is good or will rise — only a sign it is large and actively traded.</li>
</ul>
<p>Every stock on Tumbuh is an LQ45 member, so you learn from the stocks people talk about most.</p>
<h2>Other indices</h2>
<p>The IDX also has indices such as <strong>IDX30</strong> (30 stocks) and <strong>IDX80</strong> (80 stocks), plus sector indices. There are also mutual funds and ETFs that copy an index, so investors can own many stocks at once in a single product.</p>`
    },
    quiz: {
      q: { id: "Sebuah saham masuk LQ45. Apa artinya?", en: "A stock joins LQ45. What does that mean?" },
      options: [
        { id: "Harganya pasti akan naik", en: "Its price will definitely rise" },
        { id: "Sahamnya besar dan ramai diperdagangkan", en: "It's large and actively traded" },
        { id: "Perusahaannya milik negara", en: "The company is state-owned" }
      ],
      answer: 1,
      explain: { id: "LQ45 memilih saham yang likuid dan bernilai pasar besar. Itu tidak menjamin harganya naik.", en: "LQ45 picks liquid stocks with large market values. That says nothing certain about future prices." }
    }
  },
  {
    slug: "grafik-candlestick", mins: 8,
    title: { id: "Membaca grafik candlestick", en: "Reading a candlestick chart" },
    desc:  { id: "Empat harga dalam satu batang: pembukaan, penutupan, tertinggi, terendah.", en: "Four prices in one bar: open, close, high and low." },
    body: {
      id: `
<p>Grafik garis hanya menunjukkan satu harga per hari, yaitu harga penutupan. <strong>Candlestick</strong> (grafik lilin) menunjukkan empat harga sekaligus, sehingga Anda bisa melihat apa yang terjadi <em>selama</em> hari itu.</p>
<h2>Anatomi satu lilin</h2>
<figure class="lesson-fig">
<svg viewBox="0 0 640 330" role="img" aria-label="Diagram dua lilin: lilin hijau saat harga naik dan lilin merah saat harga turun, dengan label harga tertinggi, penutupan, pembukaan, dan terendah.">
  <text x="110" y="22" text-anchor="middle" class="fig-title">Harga naik</text>
  <line x1="110" y1="45" x2="110" y2="295" stroke="var(--up-line)" stroke-width="3"/>
  <rect x="80" y="95" width="60" height="140" rx="4" fill="var(--up-line)"/>
  <g class="fig-label"><line x1="114" y1="45" x2="160" y2="45"/><text x="166" y="50">Tertinggi (high)</text></g>
  <g class="fig-label"><line x1="140" y1="95" x2="160" y2="95"/><text x="166" y="100">Penutupan (close)</text></g>
  <g class="fig-label"><line x1="140" y1="235" x2="160" y2="235"/><text x="166" y="240">Pembukaan (open)</text></g>
  <g class="fig-label"><line x1="114" y1="295" x2="160" y2="295"/><text x="166" y="300">Terendah (low)</text></g>
  <text x="420" y="22" text-anchor="middle" class="fig-title">Harga turun</text>
  <line x1="420" y1="45" x2="420" y2="295" stroke="var(--down-line)" stroke-width="3"/>
  <rect x="390" y="95" width="60" height="140" rx="4" fill="var(--down-line)"/>
  <g class="fig-label"><line x1="424" y1="45" x2="470" y2="45"/><text x="476" y="50">Tertinggi</text></g>
  <g class="fig-label"><line x1="450" y1="95" x2="470" y2="95"/><text x="476" y="100">Pembukaan</text></g>
  <g class="fig-label"><line x1="450" y1="235" x2="470" y2="235"/><text x="476" y="240">Penutupan</text></g>
  <g class="fig-label"><line x1="424" y1="295" x2="470" y2="295"/><text x="476" y="300">Terendah</text></g>
</svg>
<figcaption>Badan lilin = jarak antara harga pembukaan dan penutupan. Garis tipis (sumbu atau <em>shadow</em>) = harga tertinggi dan terendah hari itu.</figcaption>
</figure>
<ul>
<li><strong>Lilin hijau:</strong> harga penutupan lebih tinggi dari pembukaan. Pembeli lebih kuat hari itu.</li>
<li><strong>Lilin merah:</strong> harga penutupan lebih rendah dari pembukaan. Penjual lebih kuat.</li>
<li><strong>Badan panjang</strong> berarti pergerakan besar; <strong>badan pendek</strong> berarti harga hampir tidak berubah.</li>
</ul>
<h2>Tiga bentuk yang sering dibicarakan</h2>
<figure class="lesson-fig">
<svg viewBox="0 0 640 230" role="img" aria-label="Tiga bentuk lilin: badan hijau panjang, doji berbentuk tanda tambah, dan lilin dengan sumbu bawah panjang.">
  <line x1="107" y1="20" x2="107" y2="170" stroke="var(--up-line)" stroke-width="3"/><rect x="82" y="30" width="50" height="130" rx="4" fill="var(--up-line)"/>
  <line x1="320" y1="40" x2="320" y2="160" stroke="var(--ink)" stroke-width="3"/><rect x="295" y="97" width="50" height="5" rx="2" fill="var(--ink)"/>
  <line x1="533" y1="30" x2="533" y2="170" stroke="var(--up-line)" stroke-width="3"/><rect x="508" y="36" width="50" height="34" rx="4" fill="var(--up-line)"/>
  <text x="107" y="200" text-anchor="middle" class="fig-title">Badan panjang</text>
  <text x="320" y="200" text-anchor="middle" class="fig-title">Doji</text>
  <text x="533" y="200" text-anchor="middle" class="fig-title">Sumbu bawah panjang</text>
</svg>
</figure>
<ul>
<li><strong>Badan hijau panjang:</strong> pembeli mendominasi sepanjang hari.</li>
<li><strong>Doji:</strong> harga penutupan hampir sama dengan pembukaan. Pembeli dan penjual seimbang — pasar sedang ragu.</li>
<li><strong>Sumbu bawah panjang:</strong> harga sempat turun jauh, lalu pembeli menariknya naik kembali.</li>
</ul>
<div class="callout"><strong>Jangan berlebihan</strong><p>Satu lilin hanya menceritakan satu hari. Pola candlestick bukan ramalan dan sering keliru. Gunakan untuk memahami apa yang terjadi, bukan sebagai satu-satunya alasan membeli atau menjual.</p></div>`,
      en: `
<p>A line chart shows only one price per day, the close. A <strong>candlestick</strong> chart shows four prices at once, so you can see what happened <em>during</em> the day.</p>
<h2>Anatomy of one candle</h2>
<figure class="lesson-fig">
<svg viewBox="0 0 640 330" role="img" aria-label="Diagram of two candles: a green candle when the price rises and a red candle when it falls, labelled with high, close, open and low.">
  <text x="110" y="22" text-anchor="middle" class="fig-title">Price rose</text>
  <line x1="110" y1="45" x2="110" y2="295" stroke="var(--up-line)" stroke-width="3"/>
  <rect x="80" y="95" width="60" height="140" rx="4" fill="var(--up-line)"/>
  <g class="fig-label"><line x1="114" y1="45" x2="160" y2="45"/><text x="166" y="50">High</text></g>
  <g class="fig-label"><line x1="140" y1="95" x2="160" y2="95"/><text x="166" y="100">Close</text></g>
  <g class="fig-label"><line x1="140" y1="235" x2="160" y2="235"/><text x="166" y="240">Open</text></g>
  <g class="fig-label"><line x1="114" y1="295" x2="160" y2="295"/><text x="166" y="300">Low</text></g>
  <text x="420" y="22" text-anchor="middle" class="fig-title">Price fell</text>
  <line x1="420" y1="45" x2="420" y2="295" stroke="var(--down-line)" stroke-width="3"/>
  <rect x="390" y="95" width="60" height="140" rx="4" fill="var(--down-line)"/>
  <g class="fig-label"><line x1="424" y1="45" x2="470" y2="45"/><text x="476" y="50">High</text></g>
  <g class="fig-label"><line x1="450" y1="95" x2="470" y2="95"/><text x="476" y="100">Open</text></g>
  <g class="fig-label"><line x1="450" y1="235" x2="470" y2="235"/><text x="476" y="240">Close</text></g>
  <g class="fig-label"><line x1="424" y1="295" x2="470" y2="295"/><text x="476" y="300">Low</text></g>
</svg>
<figcaption>The body = the distance between the open and the close. The thin line (the wick or <em>shadow</em>) = the day's high and low.</figcaption>
</figure>
<ul>
<li><strong>Green candle:</strong> the close was higher than the open. Buyers were stronger that day.</li>
<li><strong>Red candle:</strong> the close was lower than the open. Sellers were stronger.</li>
<li>A <strong>long body</strong> means a big move; a <strong>short body</strong> means the price barely changed.</li>
</ul>
<h2>Three shapes people talk about</h2>
<figure class="lesson-fig">
<svg viewBox="0 0 640 230" role="img" aria-label="Three candle shapes: a long green body, a doji shaped like a plus sign, and a candle with a long lower wick.">
  <line x1="107" y1="20" x2="107" y2="170" stroke="var(--up-line)" stroke-width="3"/><rect x="82" y="30" width="50" height="130" rx="4" fill="var(--up-line)"/>
  <line x1="320" y1="40" x2="320" y2="160" stroke="var(--ink)" stroke-width="3"/><rect x="295" y="97" width="50" height="5" rx="2" fill="var(--ink)"/>
  <line x1="533" y1="30" x2="533" y2="170" stroke="var(--up-line)" stroke-width="3"/><rect x="508" y="36" width="50" height="34" rx="4" fill="var(--up-line)"/>
  <text x="107" y="200" text-anchor="middle" class="fig-title">Long body</text>
  <text x="320" y="200" text-anchor="middle" class="fig-title">Doji</text>
  <text x="533" y="200" text-anchor="middle" class="fig-title">Long lower wick</text>
</svg>
</figure>
<ul>
<li><strong>Long green body:</strong> buyers were in control all day.</li>
<li><strong>Doji:</strong> the close is almost the same as the open. Buyers and sellers were balanced — the market is undecided.</li>
<li><strong>Long lower wick:</strong> the price fell a long way, then buyers pushed it back up.</li>
</ul>
<div class="callout"><strong>Don't overdo it</strong><p>One candle tells the story of one day. Candlestick patterns are not predictions and are often wrong. Use them to understand what happened, not as your only reason to buy or sell.</p></div>`
    },
    quiz: {
      q: { id: "Sebuah lilin berwarna merah. Apa artinya?", en: "A candle is red. What does it mean?" },
      options: [
        { id: "Harga penutupan lebih rendah dari harga pembukaan", en: "The close was lower than the open" },
        { id: "Perusahaannya merugi", en: "The company made a loss" },
        { id: "Sahamnya tidak diperdagangkan hari itu", en: "The stock didn't trade that day" }
      ],
      answer: 0,
      explain: { id: "Merah hanya berarti harga ditutup lebih rendah dari pembukaannya pada periode itu — tidak ada hubungannya langsung dengan laba perusahaan.", en: "Red only means the price closed below where it opened in that period — it says nothing direct about company profits." }
    }
  },
  {
    slug: "laporan-keuangan", mins: 10,
    title: { id: "Memahami laporan keuangan", en: "Understanding a financial report" },
    desc:  { id: "Laba rugi, neraca, dan arus kas — dengan contoh perusahaan sederhana.", en: "Income statement, balance sheet and cash flow — with a simple example company." },
    body: {
      id: `
<p>Harga saham bergerak setiap hari, tetapi nilai jangka panjangnya bergantung pada bisnis perusahaan. Untuk memahami bisnis itu, kita membaca <strong>laporan keuangan</strong>. Perusahaan di BEI menerbitkannya setiap kuartal, dan laporan tahunan diaudit oleh akuntan publik.</p>
<p>Kita pakai perusahaan khayalan: <strong>PT Kopi Nusantara Tbk</strong>, dengan 1 miliar lembar saham.</p>
<h2>1. Laporan laba rugi: untung atau rugi?</h2>
<p>Menunjukkan uang yang masuk dari penjualan, biaya yang keluar, dan sisa labanya dalam satu periode.</p>
<div class="table-wrap"><table>
<tbody>
<tr><td>Pendapatan (penjualan kopi)</td><td class="num">Rp1.000 miliar</td></tr>
<tr><td>Beban pokok (biji kopi, susu, gelas)</td><td class="num">−Rp600 miliar</td></tr>
<tr class="sub"><td>Laba kotor</td><td class="num">Rp400 miliar</td></tr>
<tr><td>Beban usaha (gaji, sewa, iklan)</td><td class="num">−Rp250 miliar</td></tr>
<tr><td>Pajak</td><td class="num">−Rp33 miliar</td></tr>
<tr class="total"><td>Laba bersih</td><td class="num">Rp117 miliar</td></tr>
</tbody></table></div>
<h2>2. Neraca: apa yang dimiliki dan apa yang diutang?</h2>
<p>Gambaran kekayaan perusahaan pada satu tanggal. Rumusnya selalu: <strong>Aset = Liabilitas + Ekuitas</strong>.</p>
<div class="table-wrap"><table>
<tbody>
<tr><td>Aset (kedai, mesin kopi, kas, stok)</td><td class="num">Rp2.000 miliar</td></tr>
<tr><td>Liabilitas (utang bank, utang ke pemasok)</td><td class="num">Rp800 miliar</td></tr>
<tr class="total"><td>Ekuitas (milik pemegang saham)</td><td class="num">Rp1.200 miliar</td></tr>
</tbody></table></div>
<h2>3. Laporan arus kas: ke mana uangnya pergi?</h2>
<p>Laba di atas kertas tidak selalu berarti uang tunai. Laporan arus kas menunjukkan uang yang benar-benar masuk dan keluar dari <strong>operasi</strong> (jualan sehari-hari), <strong>investasi</strong> (membuka kedai baru), dan <strong>pendanaan</strong> (pinjaman, dividen). Perusahaan sehat biasanya punya arus kas operasi yang positif.</p>
<h2>Dari laporan ke angka di halaman saham</h2>
<ul>
<li><strong>Laba per saham (EPS)</strong> = Rp117 miliar ÷ 1 miliar lembar = <strong>Rp117</strong>.</li>
<li>Jika harga sahamnya Rp1.755, maka <strong>P/E</strong> = 1.755 ÷ 117 = <strong>15x</strong>.</li>
<li><strong>ROE</strong> = laba bersih ÷ ekuitas = 117 ÷ 1.200 ≈ <strong>9,8%</strong>.</li>
<li><strong>DER</strong> (rasio utang terhadap modal) = 800 ÷ 1.200 ≈ <strong>0,67x</strong>. Makin tinggi, makin besar porsi utangnya.</li>
</ul>
<div class="callout"><strong>Di mana mencarinya?</strong><p>Laporan keuangan resmi tersedia gratis di situs BEI (idx.co.id) pada bagian laporan keuangan perusahaan tercatat, dan biasanya juga di situs hubungan investor milik perusahaan. Bandingkan beberapa periode — tren lebih penting daripada satu angka.</p></div>`,
      en: `
<p>Share prices move every day, but their long-term value depends on the company's business. To understand that business, we read the <strong>financial report</strong>. Companies on the IDX publish one every quarter, and the annual report is audited by a public accountant.</p>
<p>Let's use a made-up company: <strong>PT Kopi Nusantara Tbk</strong>, with 1 billion shares.</p>
<h2>1. Income statement: profit or loss?</h2>
<p>Shows the money coming in from sales, the costs going out, and the profit left over in one period.</p>
<div class="table-wrap"><table>
<tbody>
<tr><td>Revenue (coffee sales)</td><td class="num">IDR 1,000 bn</td></tr>
<tr><td>Cost of goods (beans, milk, cups)</td><td class="num">−IDR 600 bn</td></tr>
<tr class="sub"><td>Gross profit</td><td class="num">IDR 400 bn</td></tr>
<tr><td>Operating costs (salaries, rent, ads)</td><td class="num">−IDR 250 bn</td></tr>
<tr><td>Tax</td><td class="num">−IDR 33 bn</td></tr>
<tr class="total"><td>Net profit</td><td class="num">IDR 117 bn</td></tr>
</tbody></table></div>
<h2>2. Balance sheet: what it owns and what it owes</h2>
<p>A snapshot of the company's wealth on one date. The rule is always: <strong>Assets = Liabilities + Equity</strong>.</p>
<div class="table-wrap"><table>
<tbody>
<tr><td>Assets (cafés, coffee machines, cash, stock)</td><td class="num">IDR 2,000 bn</td></tr>
<tr><td>Liabilities (bank loans, money owed to suppliers)</td><td class="num">IDR 800 bn</td></tr>
<tr class="total"><td>Equity (belongs to shareholders)</td><td class="num">IDR 1,200 bn</td></tr>
</tbody></table></div>
<h2>3. Cash flow statement: where did the money go?</h2>
<p>Profit on paper isn't always cash. The cash flow statement shows the money that actually came in and went out from <strong>operations</strong> (day-to-day sales), <strong>investing</strong> (opening new cafés) and <strong>financing</strong> (loans, dividends). Healthy companies usually have positive operating cash flow.</p>
<h2>From the report to the numbers on a stock page</h2>
<ul>
<li><strong>Earnings per share (EPS)</strong> = IDR 117 bn ÷ 1 bn shares = <strong>IDR 117</strong>.</li>
<li>If the share price is IDR 1,755, the <strong>P/E</strong> = 1,755 ÷ 117 = <strong>15x</strong>.</li>
<li><strong>ROE</strong> = net profit ÷ equity = 117 ÷ 1,200 ≈ <strong>9.8%</strong>.</li>
<li><strong>DER</strong> (debt-to-equity) = 800 ÷ 1,200 ≈ <strong>0.67x</strong>. The higher it is, the more the company relies on debt.</li>
</ul>
<div class="callout"><strong>Where to find it</strong><p>Official financial reports are free on the IDX website (idx.co.id) under listed companies' financial reports, and usually on the company's own investor relations site. Compare several periods — the trend matters more than any single number.</p></div>`
    },
    quiz: {
      q: { id: "Laba bersih Rp200 miliar dan ekuitas Rp1.000 miliar. Berapa ROE-nya?", en: "Net profit is IDR 200 bn and equity is IDR 1,000 bn. What is the ROE?" },
      options: [
        { id: "2%", en: "2%" },
        { id: "20%", en: "20%" },
        { id: "200%", en: "200%" }
      ],
      answer: 1,
      explain: { id: "ROE = laba bersih ÷ ekuitas = 200 ÷ 1.000 = 0,2 = 20%.", en: "ROE = net profit ÷ equity = 200 ÷ 1,000 = 0.2 = 20%." }
    }
  },
  {
    slug: "risiko-diversifikasi", mins: 8,
    title: { id: "Risiko & diversifikasi", en: "Risk & diversification" },
    desc:  { id: "Kenapa sebaiknya tidak menaruh semua uang di satu saham.", en: "Why it pays not to put all your money in one stock." },
    body: {
      id: `
<p>Setiap investasi punya risiko. Tujuannya bukan menghindari risiko sepenuhnya, tetapi memahami dan mengaturnya.</p>
<h2>Risiko utama saham</h2>
<ul>
<li><strong>Harga turun.</strong> Harga saham bisa turun jauh di bawah harga beli Anda, bahkan untuk perusahaan yang sehat.</li>
<li><strong>Masalah perusahaan.</strong> Laba bisa merosot, utang bisa membengkak, atau bisnisnya kalah bersaing.</li>
<li><strong>Kondisi ekonomi.</strong> Suku bunga, nilai tukar, dan harga komoditas bisa menggerakkan banyak saham sekaligus.</li>
</ul>
<h2>Diversifikasi: jangan taruh semua telur di satu keranjang</h2>
<p>Diversifikasi berarti menyebar uang ke beberapa saham dari sektor berbeda. Jika satu saham turun tajam, kerugiannya tidak menghabiskan seluruh uang Anda.</p>
<div class="callout"><strong>Ilustrasi</strong><p>Rp10 juta di satu saham yang turun 40% menjadi Rp6 juta. Rp10 juta yang dibagi ke lima saham, dengan satu saham turun 40% dan sisanya tetap, menjadi Rp9,2 juta.</p></div>
<h2>Gunakan uang dingin</h2>
<p>Investasikan hanya uang yang tidak Anda butuhkan dalam beberapa tahun ke depan. Siapkan dana darurat terlebih dahulu, sehingga Anda tidak terpaksa menjual saat harga sedang turun.</p>`,
      en: `
<p>Every investment carries risk. The goal isn't to avoid risk completely, but to understand and manage it.</p>
<h2>The main risks of stocks</h2>
<ul>
<li><strong>Prices fall.</strong> A stock can drop far below what you paid, even for a healthy company.</li>
<li><strong>Company problems.</strong> Profits can shrink, debt can pile up, or the business can lose to competitors.</li>
<li><strong>The economy.</strong> Interest rates, exchange rates and commodity prices can move many stocks at once.</li>
</ul>
<h2>Diversification: don't put all your eggs in one basket</h2>
<p>Diversification means spreading your money across several stocks from different sectors. If one stock drops sharply, the loss doesn't wipe out all your money.</p>
<div class="callout"><strong>Illustration</strong><p>IDR 10 million in one stock that falls 40% becomes IDR 6 million. IDR 10 million split across five stocks, where one falls 40% and the rest stay flat, becomes IDR 9.2 million.</p></div>
<h2>Use money you won't need</h2>
<p>Only invest money you won't need for the next few years. Build an emergency fund first, so you're never forced to sell while prices are down.</p>`
    },
    quiz: {
      q: { id: "Apa tujuan diversifikasi?", en: "What is diversification for?" },
      options: [
        { id: "Menjamin keuntungan", en: "To guarantee a profit" },
        { id: "Mengurangi dampak jika satu saham turun", en: "To reduce the damage if one stock falls" },
        { id: "Membeli saham sebanyak mungkin", en: "To buy as many stocks as possible" }
      ],
      answer: 1,
      explain: { id: "Diversifikasi tidak menjamin untung, tetapi membatasi kerugian dari satu saham.", en: "Diversification doesn't guarantee profit, but it limits the damage from any single stock." }
    }
  },
  {
    slug: "saham-pertama", mins: 10,
    title: { id: "Membeli saham pertama", en: "Buying your first stock" },
    desc:  { id: "Membuka rekening efek, memilih sekuritas, dan memahami biaya.", en: "Opening an account, choosing a broker and understanding fees." },
    body: {
      id: `
<p>Siap membeli saham pertama? Berikut langkah umumnya di Indonesia.</p>
<h2>1. Pilih perusahaan sekuritas</h2>
<p>Pilih sekuritas yang terdaftar dan diawasi OJK serta menjadi anggota bursa. Bandingkan biaya transaksi, kemudahan aplikasi, dan layanan pelanggannya.</p>
<h2>2. Buka rekening efek</h2>
<p>Pendaftaran biasanya bisa dilakukan secara online dengan KTP dan NPWP (jika ada). Anda akan mendapat <strong>rekening dana nasabah (RDN)</strong> untuk menyimpan uang investasi, dan <strong>SID</strong>, nomor identitas tunggal investor.</p>
<h2>3. Isi saldo RDN</h2>
<p>Transfer uang ke RDN Anda. Uang ini terpisah dari uang milik sekuritas.</p>
<h2>4. Pasang order beli</h2>
<p>Pilih kode saham, tentukan harga dan jumlah lot, lalu kirim order. Order terjadi jika ada penjual di harga tersebut.</p>
<div class="callout"><strong>Perhatikan biaya</strong><p>Setiap transaksi beli dan jual dikenai biaya broker, dan penjualan juga dikenai pajak. Biaya ini memengaruhi hasil akhir Anda, terutama jika sering bertransaksi.</p></div>
<h2>5. Mulai kecil</h2>
<p>Anda bisa mulai dengan 1 lot. Gunakan pembelian pertama untuk belajar, bukan untuk mengejar keuntungan besar.</p>`,
      en: `
<p>Ready to buy your first stock? Here are the general steps in Indonesia.</p>
<h2>1. Choose a brokerage</h2>
<p>Pick a broker that is registered with and supervised by OJK and is a member of the exchange. Compare trading fees, how easy the app is, and customer service.</p>
<h2>2. Open a securities account</h2>
<p>You can usually sign up online with your KTP (ID card) and NPWP (tax number), if you have one. You'll receive an <strong>RDN</strong> (investor fund account) to hold your investing money, and an <strong>SID</strong>, your single investor ID number.</p>
<h2>3. Fund your RDN</h2>
<p>Transfer money into your RDN. This money is kept separate from the broker's own funds.</p>
<h2>4. Place a buy order</h2>
<p>Choose a stock code, set the price and number of lots, then send the order. It executes when a seller is available at that price.</p>
<div class="callout"><strong>Watch the fees</strong><p>Every buy and sell carries a broker fee, and selling is also taxed. These costs affect your final result, especially if you trade often.</p></div>
<h2>5. Start small</h2>
<p>You can start with 1 lot. Use your first purchase to learn, not to chase big gains.</p>`
    },
    quiz: {
      q: { id: "Apa itu RDN?", en: "What is an RDN?" },
      options: [
        { id: "Rekening untuk menyimpan uang investasi Anda", en: "An account that holds your investing money" },
        { id: "Kode saham sebuah bank", en: "A bank's stock code" },
        { id: "Jenis dividen", en: "A type of dividend" }
      ],
      answer: 0,
      explain: { id: "RDN (rekening dana nasabah) adalah rekening khusus untuk uang yang akan Anda pakai membeli saham.", en: "An RDN (investor fund account) is a dedicated account for the money you use to buy stocks." }
    }
  }
];

/* Glossary ---------------------------------------------------------------- */
TUMBUH.glossary = [
  { id: "ara-arb", term: { id: "ARA / ARB", en: "ARA / ARB (auto-rejection)" },
    def: { id: "Auto Rejection Atas dan Auto Rejection Bawah: batas kenaikan dan penurunan harga dalam satu hari yang ditetapkan bursa. Order di luar batas ini otomatis ditolak.", en: "Upper and lower auto-rejection: the daily limits on how far a price may rise or fall, set by the exchange. Orders beyond these limits are automatically rejected." } },
  { id: "bursa", term: { id: "Bursa efek", en: "Stock exchange" },
    def: { id: "Tempat resmi jual beli saham. Di Indonesia: Bursa Efek Indonesia (BEI).", en: "The official marketplace for buying and selling shares. In Indonesia: the Indonesia Stock Exchange (IDX)." } },
  { id: "capital-gain", term: { id: "Capital gain", en: "Capital gain" },
    def: { id: "Keuntungan dari selisih harga jual yang lebih tinggi daripada harga beli.", en: "Profit from selling at a higher price than you paid." },
    ex: { id: "Beli Rp1.000, jual Rp1.300: capital gain Rp300 per lembar.", en: "Buy at IDR 1,000, sell at IDR 1,300: a capital gain of IDR 300 per share." } },
  { id: "dividen", term: { id: "Dividen", en: "Dividend" },
    def: { id: "Bagian laba perusahaan yang dibagikan kepada pemegang saham, biasanya berupa uang tunai.", en: "Part of a company's profit paid out to shareholders, usually in cash." },
    ex: { id: "1 lot (100 lembar) × dividen Rp200 = Rp20.000, sebelum pajak.", en: "1 lot (100 shares) × IDR 200 dividend = IDR 20,000, before tax." } },
  { id: "diversifikasi", term: { id: "Diversifikasi", en: "Diversification" },
    def: { id: "Menyebar investasi ke beberapa saham atau sektor agar kerugian satu saham tidak terlalu berdampak.", en: "Spreading investments across several stocks or sectors so one loss doesn't hurt too much." } },
  { id: "ihsg", term: { id: "IHSG", en: "IHSG (IDX Composite)" },
    def: { id: "Indeks Harga Saham Gabungan: angka yang menggambarkan pergerakan harga seluruh saham di BEI.", en: "The Jakarta Composite Index: a number that tracks the price movement of all stocks on the IDX." } },
  { id: "imbal-hasil-dividen", term: { id: "Imbal hasil dividen", en: "Dividend yield" },
    def: { id: "Dividen per tahun dibagi harga saham, dalam persen.", en: "Yearly dividends divided by the share price, as a percentage." },
    ex: { id: "Dividen Rp300, harga Rp10.000 → imbal hasil 3%.", en: "IDR 300 dividend, IDR 10,000 price → 3% yield." } },
  { id: "kapitalisasi-pasar", term: { id: "Kapitalisasi pasar", en: "Market capitalisation" },
    def: { id: "Harga saham dikali jumlah saham beredar. Menunjukkan seberapa besar nilai perusahaan di pasar.", en: "Share price multiplied by shares outstanding. It shows how much the market values the company." } },
  { id: "laba-per-saham", term: { id: "Laba per saham (EPS)", en: "Earnings per share (EPS)" },
    def: { id: "Laba bersih perusahaan dibagi jumlah sahamnya.", en: "A company's net profit divided by its number of shares." } },
  { id: "lot", term: { id: "Lot", en: "Lot" },
    def: { id: "Satuan pembelian saham di BEI. 1 lot = 100 lembar saham.", en: "The buying unit on the IDX. 1 lot = 100 shares." } },
  { id: "ojk", term: { id: "OJK", en: "OJK" },
    def: { id: "Otoritas Jasa Keuangan, lembaga yang mengatur dan mengawasi sektor keuangan di Indonesia, termasuk pasar modal.", en: "Indonesia's Financial Services Authority, which regulates and supervises the financial sector, including the capital market." } },
  { id: "per", term: { id: "Rasio P/E (PER)", en: "P/E ratio" },
    def: { id: "Harga saham dibagi laba per saham. Kira-kira menunjukkan berapa tahun laba yang Anda bayar dengan harga sekarang.", en: "Share price divided by earnings per share. Roughly how many years of profit you're paying for at today's price." },
    ex: { id: "Harga Rp10.000, laba per saham Rp500 → P/E 20x.", en: "IDR 10,000 price, IDR 500 EPS → P/E of 20x." } },
  { id: "rdn", term: { id: "RDN", en: "RDN" },
    def: { id: "Rekening Dana Nasabah: rekening bank khusus untuk menyimpan uang yang akan dipakai bertransaksi saham.", en: "Investor fund account: a dedicated bank account holding the money you use to trade stocks." } },
  { id: "roe", term: { id: "ROE", en: "ROE (return on equity)" },
    def: { id: "Laba bersih dibagi modal pemegang saham. Menunjukkan seberapa efisien perusahaan menghasilkan laba.", en: "Net profit divided by shareholders' equity. It shows how efficiently a company generates profit." } },
  { id: "sekuritas", term: { id: "Sekuritas (broker)", en: "Brokerage" },
    def: { id: "Perusahaan perantara yang meneruskan order jual beli Anda ke bursa.", en: "The intermediary company that sends your buy and sell orders to the exchange." } },
  { id: "sektor", term: { id: "Sektor", en: "Sector" },
    def: { id: "Kelompok perusahaan dengan bisnis serupa, misalnya perbankan atau tambang.", en: "A group of companies in a similar business, such as banking or mining." } },
  { id: "sid", term: { id: "SID", en: "SID" },
    def: { id: "Single Investor Identification: nomor identitas unik setiap investor di pasar modal Indonesia.", en: "Single Investor Identification: a unique ID number for every investor in Indonesia's capital market." } },
  { id: "volume", term: { id: "Volume", en: "Volume" },
    def: { id: "Jumlah lembar saham yang diperdagangkan dalam periode tertentu, biasanya satu hari.", en: "The number of shares traded in a period, usually one day." } },
  { id: "candlestick", term: { id: "Candlestick (grafik lilin)", en: "Candlestick" },
    def: { id: "Cara menggambar harga yang menunjukkan harga pembukaan, penutupan, tertinggi, dan terendah dalam satu batang.", en: "A way of drawing prices that shows the open, close, high and low in one bar." } },
  { id: "doji", term: { id: "Doji", en: "Doji" },
    def: { id: "Lilin dengan harga penutupan hampir sama dengan pembukaan. Menandakan pembeli dan penjual seimbang.", en: "A candle whose close is almost equal to its open, showing buyers and sellers in balance." } },
  { id: "lq45", term: { id: "LQ45", en: "LQ45" },
    def: { id: "Indeks berisi 45 saham paling likuid dengan nilai pasar besar di BEI. Daftarnya dievaluasi berkala.", en: "An index of the 45 most liquid, large stocks on the IDX. Its list is reviewed regularly." } },
  { id: "indeks", term: { id: "Indeks saham", en: "Stock index" },
    def: { id: "Satu angka yang merangkum pergerakan harga sekelompok saham, misalnya IHSG atau LQ45.", en: "A single number summarising the price movement of a group of stocks, such as IHSG or LQ45." } },
  { id: "likuid", term: { id: "Likuid", en: "Liquid" },
    def: { id: "Mudah dibeli atau dijual karena banyak pembeli dan penjual.", en: "Easy to buy or sell because there are many buyers and sellers." } },
  { id: "laporan-keuangan", term: { id: "Laporan keuangan", en: "Financial statements" },
    def: { id: "Laporan resmi kinerja perusahaan: laba rugi, neraca, dan arus kas. Terbit setiap kuartal.", en: "A company's official performance report: income statement, balance sheet and cash flow. Published every quarter." } },
  { id: "pendapatan", term: { id: "Pendapatan", en: "Revenue" },
    def: { id: "Total uang dari penjualan barang atau jasa sebelum dikurangi biaya.", en: "Total money from selling goods or services, before costs are taken off." } },
  { id: "laba-bersih", term: { id: "Laba bersih", en: "Net profit" },
    def: { id: "Sisa uang setelah semua biaya, bunga, dan pajak dibayar.", en: "What's left after all costs, interest and taxes are paid." } },
  { id: "neraca", term: { id: "Neraca", en: "Balance sheet" },
    def: { id: "Daftar aset, liabilitas, dan ekuitas perusahaan pada satu tanggal. Aset = liabilitas + ekuitas.", en: "A list of a company's assets, liabilities and equity on one date. Assets = liabilities + equity." } },
  { id: "ekuitas", term: { id: "Ekuitas", en: "Equity" },
    def: { id: "Bagian kekayaan perusahaan yang menjadi milik pemegang saham, yaitu aset dikurangi liabilitas.", en: "The part of a company's wealth that belongs to shareholders: assets minus liabilities." } },
  { id: "arus-kas", term: { id: "Arus kas", en: "Cash flow" },
    def: { id: "Uang tunai yang benar-benar masuk dan keluar dari perusahaan.", en: "The cash that actually comes into and goes out of a company." } },
  { id: "der", term: { id: "DER", en: "DER (debt-to-equity)" },
    def: { id: "Debt to Equity Ratio: liabilitas dibagi ekuitas. Menunjukkan seberapa besar perusahaan bergantung pada utang.", en: "Debt to equity ratio: liabilities divided by equity. Shows how much a company relies on debt." },
    ex: { id: "Liabilitas Rp800 miliar, ekuitas Rp1.200 miliar → DER 0,67x.", en: "IDR 800 bn liabilities, IDR 1,200 bn equity → DER 0.67x." } }
];

/* Term of the day rotates by date */
TUMBUH.termOfDayIds = ["dividen", "lot", "per", "ihsg", "diversifikasi", "kapitalisasi-pasar", "capital-gain", "lq45", "doji", "der", "ekuitas", "likuid"];
