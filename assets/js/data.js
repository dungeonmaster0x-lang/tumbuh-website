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
    slug: "dividen-aksi-korporasi", mins: 9,
    title: { id: "Dividen dan aksi korporasi", en: "Dividends and corporate actions" },
    desc:  { id: "Tanggal penting dividen, stock split, rights issue, dan buyback — apa artinya bagi Anda.", en: "Key dividend dates, stock splits, rights issues and buybacks — what they mean for you." },
    body: {
      id: `
<p><strong>Aksi korporasi</strong> adalah keputusan perusahaan yang memengaruhi saham dan pemegang sahamnya. Empat yang paling sering Anda temui: dividen, stock split, rights issue, dan buyback.</p>
<h2>1. Dividen dan tanggal-tanggalnya</h2>
<p>Untuk mendapat dividen, Anda harus memiliki saham pada waktu yang tepat. Ada empat tanggal yang perlu dipahami:</p>
<ul>
<li><strong>Cum date:</strong> hari terakhir membeli saham agar masih berhak atas dividen.</li>
<li><strong>Ex date:</strong> hari bursa setelah cum date. Membeli pada hari ini atau sesudahnya <em>tidak</em> mendapat dividen.</li>
<li><strong>Recording date:</strong> tanggal pencatatan daftar pemegang saham yang berhak.</li>
<li><strong>Payment date:</strong> tanggal dividen masuk ke rekening dana (RDN) Anda.</li>
</ul>
<div class="callout"><strong>Jebakan yang sering terjadi</strong><p>Pada ex date, harga saham biasanya turun kira-kira sebesar dividennya, karena uang itu akan keluar dari perusahaan. Membeli tepat sebelum cum date hanya demi dividen sering tidak menguntungkan — apalagi setelah dipotong pajak dan biaya transaksi.</p></div>
<h2>2. Stock split: memecah saham</h2>
<p>Perusahaan memecah satu saham menjadi beberapa saham dengan harga lebih rendah. <strong>Nilai investasi Anda tidak berubah.</strong></p>
<div class="table-wrap"><table><tbody>
<tr><td>Sebelum split 1:5</td><td class="num">100 lembar × Rp10.000 = Rp1.000.000</td></tr>
<tr class="total"><td>Sesudah split 1:5</td><td class="num">500 lembar × Rp2.000 = Rp1.000.000</td></tr>
</tbody></table></div>
<p>Tujuannya biasanya agar harga per lot lebih terjangkau dan saham lebih ramai diperdagangkan. Kebalikannya, <strong>reverse stock split</strong>, menggabungkan beberapa saham menjadi satu dengan harga lebih tinggi.</p>
<h2>3. Rights issue (HMETD)</h2>
<p>Perusahaan menerbitkan saham baru untuk mencari modal, dan pemegang saham lama mendapat <strong>hak memesan efek terlebih dahulu (HMETD)</strong> — hak membeli saham baru itu dengan harga tertentu.</p>
<ul>
<li><strong>Jika Anda menebus haknya,</strong> Anda membayar uang tambahan dan porsi kepemilikan Anda tetap.</li>
<li><strong>Jika tidak,</strong> porsi kepemilikan Anda mengecil (terdilusi) karena jumlah saham perusahaan bertambah. Hak tersebut biasanya bisa dijual di bursa selama periode perdagangan HMETD.</li>
</ul>
<p>Rights issue bisa positif (modal untuk ekspansi) atau negatif (perusahaan butuh uang untuk menutup masalah). Baca alasannya di prospektus.</p>
<h2>4. Buyback: membeli kembali saham</h2>
<p>Perusahaan membeli sahamnya sendiri dari pasar. Jumlah saham beredar berkurang, sehingga laba per saham bisa naik. Buyback sering dibaca sebagai tanda manajemen menganggap harga sahamnya terlalu murah — tetapi tetap bukan jaminan harga naik.</p>
<div class="callout"><strong>Di mana melihat jadwalnya?</strong><p>Pengumuman aksi korporasi dipublikasikan di keterbukaan informasi situs BEI (idx.co.id) dan biasanya juga muncul di aplikasi sekuritas Anda.</p></div>`,
      en: `
<p>A <strong>corporate action</strong> is a company decision that affects its shares and shareholders. The four you'll meet most often are dividends, stock splits, rights issues and buybacks.</p>
<h2>1. Dividends and their dates</h2>
<p>To receive a dividend, you need to own the shares at the right time. There are four dates to understand:</p>
<ul>
<li><strong>Cum date:</strong> the last day you can buy and still be entitled to the dividend.</li>
<li><strong>Ex date:</strong> the trading day after the cum date. Buying on or after this day does <em>not</em> get the dividend.</li>
<li><strong>Recording date:</strong> when the list of entitled shareholders is recorded.</li>
<li><strong>Payment date:</strong> when the dividend arrives in your investor fund account (RDN).</li>
</ul>
<div class="callout"><strong>A common trap</strong><p>On the ex date the share price usually drops by roughly the dividend, because that cash is leaving the company. Buying just before the cum date only for the dividend often doesn't pay off — especially after tax and trading fees.</p></div>
<h2>2. Stock split: dividing shares</h2>
<p>The company splits each share into several cheaper ones. <strong>The value of your investment doesn't change.</strong></p>
<div class="table-wrap"><table><tbody>
<tr><td>Before a 1:5 split</td><td class="num">100 shares × IDR 10,000 = IDR 1,000,000</td></tr>
<tr class="total"><td>After a 1:5 split</td><td class="num">500 shares × IDR 2,000 = IDR 1,000,000</td></tr>
</tbody></table></div>
<p>The aim is usually to make a lot more affordable and the stock more actively traded. The opposite, a <strong>reverse stock split</strong>, merges several shares into one at a higher price.</p>
<h2>3. Rights issue (HMETD)</h2>
<p>The company issues new shares to raise money, and existing shareholders get a <strong>pre-emptive right (HMETD)</strong> to buy those new shares at a set price.</p>
<ul>
<li><strong>If you exercise the right,</strong> you pay extra money and keep your share of ownership.</li>
<li><strong>If you don't,</strong> your share of ownership shrinks (dilution) because the company now has more shares. The rights can usually be sold on the exchange during their trading period.</li>
</ul>
<p>A rights issue can be positive (money to expand) or negative (the company needs cash to fix a problem). Read the reason in the prospectus.</p>
<h2>4. Buyback: buying shares back</h2>
<p>The company buys its own shares from the market. Fewer shares are outstanding, so earnings per share can rise. A buyback is often read as management thinking the shares are cheap — but it still doesn't guarantee the price will go up.</p>
<div class="callout"><strong>Where to find the schedule</strong><p>Corporate action announcements are published in the disclosure section of the IDX website (idx.co.id) and usually show up in your broker's app too.</p></div>`
    },
    quiz: {
      q: { id: "Anda punya 100 lembar saham seharga Rp6.000. Terjadi stock split 1:2. Apa yang Anda miliki sekarang?", en: "You own 100 shares priced at IDR 6,000. There's a 1:2 stock split. What do you own now?" },
      options: [
        { id: "100 lembar × Rp3.000", en: "100 shares × IDR 3,000" },
        { id: "200 lembar × Rp3.000", en: "200 shares × IDR 3,000" },
        { id: "200 lembar × Rp6.000", en: "200 shares × IDR 6,000" }
      ],
      answer: 1,
      explain: { id: "Jumlah saham menjadi 2 kali lipat dan harganya menjadi setengah. Nilai total tetap Rp600.000.", en: "You get twice as many shares at half the price. The total value stays IDR 600,000." }
    }
  },
  {
    slug: "saham-reksa-dana-deposito", mins: 7,
    title: { id: "Saham, reksa dana, atau deposito?", en: "Stocks, mutual funds or deposits?" },
    desc:  { id: "Membandingkan tiga pilihan simpanan dan investasi yang paling umum di Indonesia.", en: "Comparing the three most common ways to save and invest in Indonesia." },
    body: {
      id: `
<p>Saham bukan satu-satunya cara menumbuhkan uang. Sebelum membeli saham pertama, ada baiknya memahami dua pilihan lain yang sering dibandingkan: deposito dan reksa dana.</p>
<h2>Deposito: aman, tetapi tumbuh pelan</h2>
<p>Anda menyimpan uang di bank untuk jangka waktu tertentu dan mendapat bunga tetap. Deposito di bank peserta dijamin <strong>LPS</strong> (Lembaga Penjamin Simpanan) hingga batas tertentu, selama bunganya tidak melebihi batas yang ditetapkan LPS. Risikonya kecil, tetapi bunganya sering hanya sedikit di atas inflasi.</p>
<h2>Reksa dana: dikelola profesional</h2>
<p>Uang banyak investor dikumpulkan lalu dikelola oleh <strong>manajer investasi</strong>. Aset reksa dana disimpan oleh bank kustodian, bukan oleh manajer investasinya. Nilainya dihitung setiap hari bursa sebagai <strong>NAB per unit</strong>.</p>
<ul>
<li><strong>Pasar uang:</strong> risiko paling rendah, cocok untuk dana jangka pendek.</li>
<li><strong>Pendapatan tetap:</strong> sebagian besar berisi obligasi.</li>
<li><strong>Campuran:</strong> gabungan saham dan obligasi.</li>
<li><strong>Saham:</strong> sebagian besar berisi saham, risiko dan potensi tertinggi.</li>
</ul>
<p>Ada juga <strong>ETF</strong>: reksa dana yang diperdagangkan di bursa seperti saham, sering meniru sebuah indeks seperti LQ45.</p>
<h2>Saham: kendali penuh, risiko penuh</h2>
<p>Anda memilih sendiri perusahaannya. Potensi keuntungan jangka panjang lebih tinggi, tetapi harga bisa turun tajam dan Anda yang menanggung semua keputusannya.</p>
<div class="table-wrap"><table><tbody>
<tr class="sub"><td></td><td class="num">Deposito</td><td class="num">Reksa dana</td><td class="num">Saham</td></tr>
<tr><td>Risiko</td><td class="num">Rendah</td><td class="num">Rendah–tinggi</td><td class="num">Tinggi</td></tr>
<tr><td>Potensi hasil</td><td class="num">Rendah</td><td class="num">Sedang</td><td class="num">Tinggi</td></tr>
<tr><td>Yang memilih aset</td><td class="num">Bank</td><td class="num">Manajer investasi</td><td class="num">Anda</td></tr>
<tr><td>Waktu yang dibutuhkan</td><td class="num">Sedikit</td><td class="num">Sedikit</td><td class="num">Banyak</td></tr>
</tbody></table></div>
<div class="callout"><strong>Tidak harus memilih satu</strong><p>Banyak orang memakai ketiganya: deposito atau reksa dana pasar uang untuk dana darurat, reksa dana untuk tujuan menengah, dan saham untuk tujuan jangka panjang yang mereka pahami.</p></div>`,
      en: `
<p>Stocks aren't the only way to grow money. Before buying your first stock, it helps to understand the two options they're most often compared with: deposits and mutual funds.</p>
<h2>Deposits: safe, but slow</h2>
<p>You leave money in a bank for a fixed term and earn fixed interest. Deposits at member banks are guaranteed by <strong>LPS</strong> (the deposit insurance agency) up to a limit, as long as the interest rate stays within the cap set by LPS. The risk is low, but the interest is often only a little above inflation.</p>
<h2>Mutual funds: professionally managed</h2>
<p>Money from many investors is pooled and managed by an <strong>investment manager</strong>. The fund's assets are held by a custodian bank, not by the manager. Its value is calculated every trading day as <strong>NAV per unit</strong>.</p>
<ul>
<li><strong>Money market:</strong> lowest risk, suited to short-term money.</li>
<li><strong>Fixed income:</strong> mostly bonds.</li>
<li><strong>Balanced:</strong> a mix of stocks and bonds.</li>
<li><strong>Equity:</strong> mostly stocks, highest risk and potential.</li>
</ul>
<p>There are also <strong>ETFs</strong>: funds traded on the exchange like a stock, often copying an index such as LQ45.</p>
<h2>Stocks: full control, full risk</h2>
<p>You choose the companies yourself. The long-term potential is higher, but prices can fall sharply and every decision is yours.</p>
<div class="table-wrap"><table><tbody>
<tr class="sub"><td></td><td class="num">Deposit</td><td class="num">Mutual fund</td><td class="num">Stocks</td></tr>
<tr><td>Risk</td><td class="num">Low</td><td class="num">Low–high</td><td class="num">High</td></tr>
<tr><td>Potential return</td><td class="num">Low</td><td class="num">Medium</td><td class="num">High</td></tr>
<tr><td>Who picks the assets</td><td class="num">The bank</td><td class="num">Fund manager</td><td class="num">You</td></tr>
<tr><td>Time needed</td><td class="num">Little</td><td class="num">Little</td><td class="num">A lot</td></tr>
</tbody></table></div>
<div class="callout"><strong>You don't have to pick just one</strong><p>Many people use all three: deposits or a money market fund for emergencies, mutual funds for medium-term goals, and stocks they understand for long-term goals.</p></div>`
    },
    quiz: {
      q: { id: "Anda butuh uang untuk biaya sekolah anak 6 bulan lagi. Pilihan mana yang paling masuk akal?", en: "You need money for school fees in 6 months. Which option makes the most sense?" },
      options: [
        { id: "Saham pertambangan yang sedang naik", en: "A mining stock that's been rising" },
        { id: "Deposito atau reksa dana pasar uang", en: "A deposit or a money market fund" },
        { id: "Reksa dana saham", en: "An equity mutual fund" }
      ],
      answer: 1,
      explain: { id: "Untuk uang yang dibutuhkan dalam waktu dekat, prioritasnya adalah keamanan, bukan potensi hasil tinggi.", en: "For money you'll need soon, safety matters more than high potential returns." }
    }
  },
  {
    slug: "valuasi-pbv", mins: 8,
    title: { id: "Mahal atau murah? Dasar valuasi", en: "Expensive or cheap? Valuation basics" },
    desc:  { id: "Kenapa harga per lembar tidak menunjukkan murah atau mahal, dan cara memakai P/E serta PBV.", en: "Why price per share doesn't tell you cheap or expensive, and how to use P/E and PBV." },
    body: {
      id: `
<p>Saham seharga Rp100 belum tentu murah, dan saham Rp10.000 belum tentu mahal. Yang penting adalah <strong>harga dibandingkan dengan apa yang Anda dapatkan</strong>: laba dan kekayaan perusahaan.</p>
<h2>Rasio P/E: harga dibanding laba</h2>
<p>P/E = harga saham ÷ laba per saham. Jika P/E 10x, Anda membayar kira-kira 10 tahun laba perusahaan pada tingkat laba sekarang.</p>
<h2>PBV: harga dibanding nilai buku</h2>
<p><strong>Nilai buku</strong> adalah ekuitas perusahaan (aset dikurangi utang). PBV = harga saham ÷ nilai buku per saham.</p>
<div class="table-wrap"><table><tbody>
<tr><td>Ekuitas PT Kopi Nusantara</td><td class="num">Rp1.200 miliar</td></tr>
<tr><td>Jumlah saham</td><td class="num">1 miliar lembar</td></tr>
<tr class="sub"><td>Nilai buku per saham</td><td class="num">Rp1.200</td></tr>
<tr><td>Harga saham</td><td class="num">Rp1.800</td></tr>
<tr class="total"><td>PBV</td><td class="num">1.800 ÷ 1.200 = 1,5x</td></tr>
</tbody></table></div>
<ul>
<li><strong>PBV di bawah 1x:</strong> harga lebih rendah dari nilai buku. Bisa murah, atau pasar khawatir ada masalah.</li>
<li><strong>PBV tinggi:</strong> investor mau membayar mahal, biasanya karena perusahaan sangat menguntungkan (ROE tinggi).</li>
<li>PBV paling berguna untuk perusahaan yang kekayaannya banyak berupa aset, seperti <strong>bank</strong>.</li>
</ul>
<h2>Bandingkan dengan yang sebanding</h2>
<ul>
<li><strong>Dengan saham di sektor yang sama.</strong> P/E bank tidak bisa dibandingkan langsung dengan P/E perusahaan teknologi.</li>
<li><strong>Dengan sejarahnya sendiri.</strong> Apakah P/E sekarang lebih tinggi atau lebih rendah dari biasanya?</li>
<li><strong>Dengan kualitasnya.</strong> Perusahaan dengan laba yang tumbuh stabil wajar dihargai lebih mahal.</li>
</ul>
<div class="callout"><strong>Murah bisa jadi jebakan</strong><p>Saham dengan P/E atau PBV sangat rendah kadang murah karena labanya akan turun atau bisnisnya bermasalah. Selalu cari tahu <em>kenapa</em> sebuah saham murah.</p></div>
<p>Anda bisa membandingkan P/E dan PBV dua saham sekaligus di halaman <a href="bandingkan.html">Bandingkan</a>.</p>`,
      en: `
<p>A IDR 100 stock isn't necessarily cheap, and a IDR 10,000 stock isn't necessarily expensive. What matters is <strong>the price compared with what you get</strong>: the company's profit and net worth.</p>
<h2>P/E ratio: price versus profit</h2>
<p>P/E = share price ÷ earnings per share. At a P/E of 10x you're paying roughly 10 years of the company's profit at today's level.</p>
<h2>PBV: price versus book value</h2>
<p><strong>Book value</strong> is the company's equity (assets minus debts). PBV = share price ÷ book value per share.</p>
<div class="table-wrap"><table><tbody>
<tr><td>PT Kopi Nusantara's equity</td><td class="num">IDR 1,200 bn</td></tr>
<tr><td>Number of shares</td><td class="num">1 bn</td></tr>
<tr class="sub"><td>Book value per share</td><td class="num">IDR 1,200</td></tr>
<tr><td>Share price</td><td class="num">IDR 1,800</td></tr>
<tr class="total"><td>PBV</td><td class="num">1,800 ÷ 1,200 = 1.5x</td></tr>
</tbody></table></div>
<ul>
<li><strong>PBV below 1x:</strong> the price is below book value. It may be cheap, or the market may fear a problem.</li>
<li><strong>High PBV:</strong> investors pay up, usually because the company is very profitable (high ROE).</li>
<li>PBV is most useful for companies whose wealth is mostly assets, such as <strong>banks</strong>.</li>
</ul>
<h2>Compare like with like</h2>
<ul>
<li><strong>With stocks in the same sector.</strong> A bank's P/E can't be compared directly with a tech company's.</li>
<li><strong>With its own history.</strong> Is today's P/E higher or lower than usual?</li>
<li><strong>With its quality.</strong> A company with steadily growing profit reasonably deserves a higher price.</li>
</ul>
<div class="callout"><strong>Cheap can be a trap</strong><p>Stocks with a very low P/E or PBV are sometimes cheap because profits are about to fall or the business is in trouble. Always find out <em>why</em> a stock is cheap.</p></div>
<p>You can compare two stocks' P/E and PBV at once on the <a href="bandingkan.html">Compare</a> page.</p>`
    },
    quiz: {
      q: { id: "Harga saham Rp3.000 dan nilai buku per sahamnya Rp2.000. Berapa PBV-nya?", en: "The share price is IDR 3,000 and book value per share is IDR 2,000. What's the PBV?" },
      options: [
        { id: "0,67x", en: "0.67x" },
        { id: "1,5x", en: "1.5x" },
        { id: "6x", en: "6x" }
      ],
      answer: 1,
      explain: { id: "PBV = harga ÷ nilai buku per saham = 3.000 ÷ 2.000 = 1,5x.", en: "PBV = price ÷ book value per share = 3,000 ÷ 2,000 = 1.5x." }
    }
  },
  {
    slug: "membaca-berita", mins: 7,
    title: { id: "Membaca berita dan pengumuman", en: "Reading news and announcements" },
    desc:  { id: "Membedakan fakta, opini, dan rumor — serta sumber resmi yang perlu Anda kenal.", en: "Telling fact from opinion and rumour — and the official sources worth knowing." },
    body: {
      id: `
<p>Harga saham sering bergerak karena berita. Tetapi tidak semua berita sama nilainya, dan sebagian sengaja dibuat untuk menggerakkan harga.</p>
<h2>Sumber resmi yang perlu Anda kenal</h2>
<ul>
<li><strong>Keterbukaan informasi di situs BEI:</strong> perusahaan tercatat wajib mengumumkan informasi penting di sini, seperti laporan keuangan, aksi korporasi, dan kejadian material.</li>
<li><strong>Laporan keuangan dan laporan tahunan:</strong> sumber utama untuk memahami kinerja perusahaan.</li>
<li><strong>Public expose:</strong> paparan publik di mana manajemen menjelaskan kinerja dan rencana perusahaan.</li>
</ul>
<h2>Tanda dari bursa</h2>
<ul>
<li><strong>UMA (Unusual Market Activity):</strong> pengumuman bursa bahwa pergerakan harga atau volume sebuah saham tidak biasa. Ini peringatan untuk berhati-hati, bukan sinyal beli.</li>
<li><strong>Suspensi:</strong> perdagangan saham dihentikan sementara oleh bursa, misalnya setelah kenaikan atau penurunan harga yang sangat tajam.</li>
<li><strong>Notasi khusus:</strong> huruf tambahan di belakang kode saham yang menandakan kondisi tertentu perusahaan. Cek artinya di situs BEI sebelum membeli.</li>
</ul>
<h2>Fakta, opini, atau rumor?</h2>
<ul>
<li><strong>Fakta:</strong> "Laba kuartal ini naik 12%." Bisa dicek di laporan resmi.</li>
<li><strong>Opini:</strong> "Saham ini akan naik dua kali lipat." Pendapat seseorang, belum tentu benar.</li>
<li><strong>Rumor:</strong> "Katanya akan diakuisisi." Tanpa sumber jelas — sering dipakai untuk menggoreng harga.</li>
</ul>
<div class="callout"><strong>Empat pertanyaan sebelum bereaksi</strong><p>Siapa sumbernya? Kapan berita ini terbit? Apakah sudah ada di keterbukaan informasi BEI? Apa pengaruhnya pada laba perusahaan dalam jangka panjang?</p></div>
<p>Ingat juga: saat sebuah berita bagus sampai ke Anda, harga sering sudah bergerak. Bereaksi terburu-buru jarang menguntungkan.</p>`,
      en: `
<p>Share prices often move on news. But not all news is equally valuable, and some is created on purpose to move prices.</p>
<h2>Official sources worth knowing</h2>
<ul>
<li><strong>Disclosures on the IDX website:</strong> listed companies must announce important information here, such as financial reports, corporate actions and material events.</li>
<li><strong>Financial and annual reports:</strong> the main source for understanding how a company is doing.</li>
<li><strong>Public expose:</strong> a public presentation where management explains results and plans.</li>
</ul>
<h2>Signals from the exchange</h2>
<ul>
<li><strong>UMA (Unusual Market Activity):</strong> an exchange notice that a stock's price or volume movement is unusual. It's a warning to be careful, not a buy signal.</li>
<li><strong>Suspension:</strong> the exchange temporarily halts trading in a stock, for example after a very sharp rise or fall.</li>
<li><strong>Special notations:</strong> extra letters after a stock code that flag certain conditions at the company. Check what they mean on the IDX website before buying.</li>
</ul>
<h2>Fact, opinion or rumour?</h2>
<ul>
<li><strong>Fact:</strong> "Profit rose 12% this quarter." Can be checked in official reports.</li>
<li><strong>Opinion:</strong> "This stock will double." Someone's view, not necessarily true.</li>
<li><strong>Rumour:</strong> "I heard it's being acquired." No clear source — often used to pump prices.</li>
</ul>
<div class="callout"><strong>Four questions before you react</strong><p>Who is the source? When was it published? Is it in the IDX disclosures? How does it affect the company's long-term profit?</p></div>
<p>Remember too: by the time good news reaches you, the price has often already moved. Reacting in a hurry rarely pays.</p>`
    },
    quiz: {
      q: { id: "Bursa mengumumkan UMA pada saham yang harganya naik 60% dalam seminggu. Apa artinya?", en: "The exchange announces UMA on a stock that rose 60% in a week. What does it mean?" },
      options: [
        { id: "Bursa merekomendasikan untuk membeli", en: "The exchange recommends buying" },
        { id: "Pergerakannya tidak biasa — investor diminta berhati-hati", en: "The movement is unusual — investors should be careful" },
        { id: "Perusahaan pasti sedang bermasalah", en: "The company is definitely in trouble" }
      ],
      answer: 1,
      explain: { id: "UMA adalah peringatan bahwa pergerakan harga atau volume tidak biasa. Itu bukan rekomendasi dan bukan bukti masalah.", en: "UMA warns that price or volume movement is unusual. It's neither a recommendation nor proof of a problem." }
    }
  },
  {
    slug: "investasi-rutin", mins: 6,
    title: { id: "Investasi rutin: sedikit demi sedikit", en: "Investing regularly, little by little" },
    desc:  { id: "Cara kerja menabung saham setiap bulan (DCA), kelebihan, dan batasannya.", en: "How investing a fixed amount every month (DCA) works, its strengths and its limits." },
    body: {
      id: `
<p>Menebak waktu terbaik untuk membeli itu sulit, bahkan untuk investor profesional. Salah satu cara yang sederhana adalah <strong>investasi rutin</strong> atau <strong>DCA</strong> (dollar cost averaging): membeli dengan jumlah uang yang sama secara berkala, misalnya setiap bulan.</p>
<h2>Cara kerjanya</h2>
<p>Dengan uang yang sama, Anda otomatis mendapat lebih banyak saham saat harga turun dan lebih sedikit saat harga naik.</p>
<div class="table-wrap"><table><tbody>
<tr class="sub"><td>Bulan</td><td class="num">Harga</td><td class="num">Dibeli dengan Rp500.000</td></tr>
<tr><td>1</td><td class="num">Rp1.000</td><td class="num">5 lot</td></tr>
<tr><td>2</td><td class="num">Rp800</td><td class="num">6 lot (sisa Rp20.000)</td></tr>
<tr><td>3</td><td class="num">Rp1.250</td><td class="num">4 lot</td></tr>
<tr class="total"><td>Total</td><td class="num"></td><td class="num">15 lot, harga rata-rata ±Rp987</td></tr>
</tbody></table></div>
<p>Karena saham dibeli per lot, sisa uang yang tidak cukup untuk 1 lot ikut ke bulan berikutnya.</p>
<h2>Kelebihan</h2>
<ul>
<li>Tidak perlu menebak waktu yang tepat.</li>
<li>Membangun kebiasaan, seperti menabung.</li>
<li>Mengurangi godaan bereaksi berlebihan terhadap berita harian.</li>
</ul>
<h2>Batasannya</h2>
<ul>
<li><strong>DCA tidak menyelamatkan saham yang buruk.</strong> Jika bisnisnya terus memburuk, membeli rutin hanya menambah kerugian.</li>
<li>Biaya transaksi terasa lebih besar untuk pembelian kecil.</li>
<li>Untuk saham yang terus naik, membeli sekaligus di awal bisa memberi hasil lebih tinggi — tetapi tidak ada yang tahu sebelumnya.</li>
</ul>
<div class="callout"><strong>Coba sendiri</strong><p>Di halaman <a href="kalkulator.html#dca">Kalkulator</a>, Anda bisa melihat hasil investasi rutin pada saham LQ45 menggunakan harga masa lalu.</p></div>`,
      en: `
<p>Timing the best moment to buy is hard, even for professionals. One simple approach is <strong>regular investing</strong>, or <strong>DCA</strong> (dollar cost averaging): buying with the same amount of money at regular intervals, for example every month.</p>
<h2>How it works</h2>
<p>With the same amount of money, you automatically get more shares when prices are low and fewer when they're high.</p>
<div class="table-wrap"><table><tbody>
<tr class="sub"><td>Month</td><td class="num">Price</td><td class="num">Bought with IDR 500,000</td></tr>
<tr><td>1</td><td class="num">IDR 1,000</td><td class="num">5 lots</td></tr>
<tr><td>2</td><td class="num">IDR 800</td><td class="num">6 lots (IDR 20,000 left)</td></tr>
<tr><td>3</td><td class="num">IDR 1,250</td><td class="num">4 lots</td></tr>
<tr class="total"><td>Total</td><td class="num"></td><td class="num">15 lots, average price ≈ IDR 987</td></tr>
</tbody></table></div>
<p>Because shares are bought in lots, money that isn't enough for 1 lot carries over to the next month.</p>
<h2>Strengths</h2>
<ul>
<li>No need to guess the right moment.</li>
<li>Builds a habit, like saving.</li>
<li>Reduces the urge to overreact to daily news.</li>
</ul>
<h2>Limits</h2>
<ul>
<li><strong>DCA doesn't rescue a bad stock.</strong> If the business keeps getting worse, buying regularly just adds to the loss.</li>
<li>Trading fees weigh more on small purchases.</li>
<li>For a stock that keeps rising, buying everything at the start can earn more — but nobody knows that in advance.</li>
</ul>
<div class="callout"><strong>Try it yourself</strong><p>On the <a href="kalkulator.html#dca">Calculator</a> page you can see how regular investing in an LQ45 stock would have turned out using past prices.</p></div>`
    },
    quiz: {
      q: { id: "Dengan investasi rutin Rp1 juta per bulan, apa yang terjadi saat harga saham turun?", en: "Investing IDR 1 million a month, what happens when the share price falls?" },
      options: [
        { id: "Anda mendapat lebih banyak saham untuk jumlah uang yang sama", en: "You get more shares for the same money" },
        { id: "Anda harus berhenti membeli", en: "You have to stop buying" },
        { id: "Anda pasti untung", en: "You're guaranteed a profit" }
      ],
      answer: 0,
      explain: { id: "Harga lebih rendah berarti uang yang sama membeli lebih banyak lembar. Keuntungan tetap tidak dijamin.", en: "A lower price means the same money buys more shares. A profit is still not guaranteed." }
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
    slug: "kesalahan-pemula", mins: 7,
    title: { id: "Kesalahan umum investor pemula", en: "Common beginner mistakes" },
    desc:  { id: "Tujuh kebiasaan yang paling sering membuat pemula rugi — dan cara menghindarinya.", en: "Seven habits that most often cost beginners money — and how to avoid them." },
    body: {
      id: `
<p>Hampir semua investor pernah melakukan kesalahan berikut. Mengenalinya sejak awal bisa menghemat banyak uang dan stres.</p>
<h2>1. Membeli karena "kata orang"</h2>
<p>Rekomendasi di grup chat atau media sosial sering tanpa alasan yang jelas, dan kadang sengaja dibuat untuk menaikkan harga sebelum dijual oleh pembuatnya. Saham yang harganya "digoreng" seperti ini bisa jatuh sangat cepat.</p>
<p><strong>Gantinya:</strong> pahami dulu bisnis perusahaannya. Jika Anda tidak bisa menjelaskan cara perusahaan menghasilkan uang, jangan beli.</p>
<h2>2. Menaruh semua uang di satu saham</h2>
<p>Satu kabar buruk bisa menghapus sebagian besar modal Anda. <strong>Gantinya:</strong> sebar ke beberapa saham dari sektor berbeda.</p>
<h2>3. Memakai uang yang akan segera dibutuhkan — atau uang pinjaman</h2>
<p>Jika uang sekolah, cicilan, atau dana darurat ada di saham, Anda bisa terpaksa menjual saat harga sedang turun. Berinvestasi dengan uang pinjaman membuat kerugian berlipat. <strong>Gantinya:</strong> hanya gunakan uang yang tidak Anda butuhkan dalam beberapa tahun.</p>
<h2>4. Panik saat harga turun, serakah saat harga naik</h2>
<p>Menjual karena takut saat semua orang menjual, lalu membeli karena takut ketinggalan (FOMO) saat harga sudah tinggi, adalah cara cepat untuk "beli mahal, jual murah". <strong>Gantinya:</strong> tulis alasan Anda membeli. Jual hanya jika alasan itu berubah, bukan karena harga bergerak.</p>
<h2>5. Terlalu sering jual beli</h2>
<p>Setiap transaksi kena biaya broker dan pajak. Jual beli setiap hari menggerus hasil, dan sebagian besar pemula yang mencobanya justru rugi. <strong>Gantinya:</strong> mulai dengan pola pikir jangka panjang.</p>
<h2>6. Terus menambah saham yang jatuh tanpa berpikir</h2>
<p>Membeli lagi saat harga turun ("average down") hanya masuk akal jika bisnisnya masih bagus. Jika harga turun karena masalah serius, Anda hanya menambah kerugian. <strong>Gantinya:</strong> cari tahu dulu kenapa harganya turun.</p>
<h2>7. Mengecek harga setiap menit</h2>
<p>Gerakan harian kebanyakan hanya "kebisingan". Terlalu sering melihat harga memicu keputusan emosional. <strong>Gantinya:</strong> cek secara berkala, misalnya seminggu sekali, dan fokus pada laporan keuangan setiap kuartal.</p>
<div class="callout"><strong>Satu kebiasaan baik</strong><p>Buat catatan investasi: saham apa, harga berapa, kenapa membeli, dan kapan akan dievaluasi. Catatan ini membantu Anda belajar dari keputusan sendiri.</p></div>`,
      en: `
<p>Almost every investor has made these mistakes. Recognising them early can save a lot of money and stress.</p>
<h2>1. Buying because "someone said so"</h2>
<p>Tips in chat groups or on social media often come without a clear reason, and are sometimes posted on purpose to push a price up before the poster sells. Stocks "pumped" like this can collapse very quickly.</p>
<p><strong>Instead:</strong> understand the business first. If you can't explain how the company makes money, don't buy it.</p>
<h2>2. Putting all your money in one stock</h2>
<p>One piece of bad news can wipe out most of your capital. <strong>Instead:</strong> spread it across several stocks in different sectors.</p>
<h2>3. Using money you'll soon need — or borrowed money</h2>
<p>If school fees, loan payments or your emergency fund are in stocks, you may be forced to sell while prices are down. Investing with borrowed money multiplies losses. <strong>Instead:</strong> only use money you won't need for several years.</p>
<h2>4. Panicking when prices fall, getting greedy when they rise</h2>
<p>Selling out of fear when everyone sells, then buying out of fear of missing out (FOMO) after prices are already high, is a fast way to "buy high, sell low". <strong>Instead:</strong> write down why you bought. Sell only if that reason changes, not because the price moved.</p>
<h2>5. Trading too often</h2>
<p>Every trade costs broker fees and tax. Buying and selling every day eats into returns, and most beginners who try it lose money. <strong>Instead:</strong> start with a long-term mindset.</p>
<h2>6. Blindly buying more of a falling stock</h2>
<p>Buying more as the price falls ("averaging down") only makes sense if the business is still sound. If the price fell because of a serious problem, you're just adding to your loss. <strong>Instead:</strong> find out why the price dropped first.</p>
<h2>7. Checking the price every minute</h2>
<p>Daily moves are mostly noise. Watching prices too closely triggers emotional decisions. <strong>Instead:</strong> check in regularly, say once a week, and focus on the quarterly financial reports.</p>
<div class="callout"><strong>One good habit</strong><p>Keep an investing journal: which stock, at what price, why you bought it, and when you'll review it. It helps you learn from your own decisions.</p></div>`
    },
    quiz: {
      q: { id: "Harga saham yang Anda miliki turun 15% dalam seminggu. Apa langkah pertama yang paling masuk akal?", en: "A stock you own fell 15% in a week. What's the most sensible first step?" },
      options: [
        { id: "Langsung jual semuanya sebelum turun lagi", en: "Sell everything right away before it falls further" },
        { id: "Langsung beli lebih banyak karena sudah murah", en: "Buy more immediately because it's cheaper" },
        { id: "Cari tahu penyebabnya dan cek apakah alasan Anda membeli masih berlaku", en: "Find out why, and check whether your reason for buying still holds" }
      ],
      answer: 2,
      explain: { id: "Keputusan sebaiknya didasarkan pada alasan, bukan emosi. Cari tahu dulu kenapa harganya turun.", en: "Decisions should be based on reasons, not emotion. Find out why the price fell first." }
    }
  },
  {
    slug: "memilih-sekuritas", mins: 7,
    title: { id: "Cara memilih perusahaan sekuritas", en: "How to choose a broker" },
    desc:  { id: "Cek izin, biaya, keamanan, dan cara memastikan saham Anda benar-benar tercatat.", en: "Check licences, fees, security, and how to confirm your shares are really recorded." },
    body: {
      id: `
<p>Perusahaan sekuritas (broker) adalah pintu Anda ke bursa. Memilih yang tepat sama pentingnya dengan memilih saham.</p>
<h2>1. Pastikan resmi dan diawasi</h2>
<ul>
<li>Sekuritas harus <strong>berizin dan diawasi OJK</strong> serta menjadi <strong>Anggota Bursa</strong> BEI. Daftar anggota bursa bisa dicek di situs idx.co.id.</li>
<li>Waspadai tawaran yang menjanjikan keuntungan pasti atau sangat tinggi. Itu ciri khas investasi bodong.</li>
<li>Unduh aplikasi hanya dari toko aplikasi resmi, dan pastikan nama penerbitnya sesuai nama perusahaan sekuritas.</li>
</ul>
<h2>2. Uang Anda di RDN atas nama Anda</h2>
<p>Dana investasi disimpan di <strong>Rekening Dana Nasabah (RDN)</strong> di bank, atas nama Anda sendiri — bukan di rekening perusahaan sekuritas. Jangan pernah mentransfer uang untuk membeli saham ke rekening pribadi siapa pun.</p>
<h2>3. Bandingkan biaya</h2>
<ul>
<li>Setiap transaksi beli dan jual dikenai <strong>biaya broker</strong> (komisi), dalam persen dari nilai transaksi. Besarnya berbeda antar sekuritas.</li>
<li>Penjualan saham juga dikenai <strong>pajak final 0,1%</strong> dari nilai penjualan.</li>
<li>Cek apakah ada biaya lain: setoran minimum, biaya bulanan, atau biaya tarik dana.</li>
</ul>
<h2>4. Aplikasi, keamanan, dan layanan</h2>
<ul>
<li>Aplikasi mudah dipakai, stabil saat pasar ramai, dan menyediakan informasi dasar seperti laporan keuangan.</li>
<li>Ada <strong>verifikasi dua langkah</strong> (PIN, OTP, atau sidik jari).</li>
<li>Layanan pelanggan mudah dihubungi dan responsif.</li>
</ul>
<h2>5. Cek sendiri kepemilikan saham Anda</h2>
<p>Saham Anda dicatat oleh <strong>KSEI</strong> (Kustodian Sentral Efek Indonesia), bukan hanya oleh broker. Setelah membuka rekening, Anda bisa mendaftar <strong>AKSes KSEI</strong> untuk melihat sendiri saham dan dana Anda secara langsung dari sumber resmi.</p>
<div class="callout"><strong>Daftar cek singkat</strong><p>Berizin OJK ✓ · Anggota Bursa BEI ✓ · RDN atas nama sendiri ✓ · Biaya jelas ✓ · Verifikasi dua langkah ✓ · Bisa dicek di AKSes KSEI ✓</p></div>`,
      en: `
<p>A brokerage is your doorway to the exchange. Choosing the right one matters as much as choosing stocks.</p>
<h2>1. Make sure it's official and supervised</h2>
<ul>
<li>The broker must be <strong>licensed and supervised by OJK</strong> and be an <strong>Exchange Member</strong> of the IDX. You can check the member list on idx.co.id.</li>
<li>Be wary of offers promising guaranteed or very high returns — a classic sign of an investment scam.</li>
<li>Only download apps from official app stores, and check the publisher's name matches the brokerage.</li>
</ul>
<h2>2. Your money sits in an RDN in your own name</h2>
<p>Investing money is held in an <strong>investor fund account (RDN)</strong> at a bank, in your own name — not in the broker's account. Never transfer money for buying shares into anyone's personal account.</p>
<h2>3. Compare fees</h2>
<ul>
<li>Every buy and sell carries a <strong>broker fee</strong> (commission), as a percentage of the trade value. It varies between brokers.</li>
<li>Selling shares also incurs a <strong>0.1% final tax</strong> on the sale value.</li>
<li>Check for other costs: minimum deposits, monthly fees or withdrawal fees.</li>
</ul>
<h2>4. App, security and service</h2>
<ul>
<li>An app that's easy to use, stays stable when the market is busy, and offers basic information like financial reports.</li>
<li><strong>Two-step verification</strong> (PIN, OTP or fingerprint).</li>
<li>Customer service that's easy to reach and responsive.</li>
</ul>
<h2>5. Check your holdings yourself</h2>
<p>Your shares are recorded by <strong>KSEI</strong> (the Indonesian Central Securities Depository), not just by your broker. After opening an account you can register for <strong>AKSes KSEI</strong> to see your shares and funds directly from the official source.</p>
<div class="callout"><strong>Quick checklist</strong><p>OJK-licensed ✓ · IDX Exchange Member ✓ · RDN in your own name ✓ · Clear fees ✓ · Two-step verification ✓ · Visible in AKSes KSEI ✓</p></div>`
    },
    quiz: {
      q: { id: "Seseorang meminta Anda mentransfer uang ke rekening pribadinya untuk \"dibelikan saham\". Apa yang sebaiknya Anda lakukan?", en: "Someone asks you to transfer money to their personal account so they can \"buy shares for you\". What should you do?" },
      options: [
        { id: "Transfer jika ia terlihat berpengalaman", en: "Transfer if they seem experienced" },
        { id: "Tolak — dana investasi selalu masuk ke RDN atas nama Anda sendiri", en: "Refuse — investing money always goes into an RDN in your own name" },
        { id: "Transfer sebagian dulu untuk mencoba", en: "Transfer part of it first as a test" }
      ],
      answer: 1,
      explain: { id: "Sekuritas resmi tidak pernah meminta transfer ke rekening pribadi. Dana Anda selalu masuk ke RDN atas nama Anda.", en: "Licensed brokers never ask for transfers to personal accounts. Your money always goes into an RDN in your own name." }
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

/* Learning modules: the order lessons appear in, grouped into 3 steps --- */
TUMBUH.modules = [
  { key: "dasar", title: { id: "Modul 1 · Dasar-dasar", en: "Module 1 · The basics" },
    desc: { id: "Apa itu saham, cara membaca harga, dan pilihan investasi lain.", en: "What a stock is, how to read prices, and other ways to invest." },
    lessons: ["apa-itu-saham", "membaca-harga-saham", "indeks-ihsg-lq45", "saham-reksa-dana-deposito"] },
  { key: "analisis", title: { id: "Modul 2 · Membaca sebuah saham", en: "Module 2 · Reading a stock" },
    desc: { id: "Grafik, laporan keuangan, valuasi, dividen, dan berita.", en: "Charts, financial reports, valuation, dividends and news." },
    lessons: ["grafik-candlestick", "laporan-keuangan", "valuasi-pbv", "dividen-aksi-korporasi", "membaca-berita"] },
  { key: "praktik", title: { id: "Modul 3 · Mulai berinvestasi", en: "Module 3 · Start investing" },
    desc: { id: "Mengelola risiko, menghindari kesalahan, dan membeli saham pertama.", en: "Managing risk, avoiding mistakes, and buying your first stock." },
    lessons: ["risiko-diversifikasi", "kesalahan-pemula", "investasi-rutin", "memilih-sekuritas", "saham-pertama"] }
];
/* put lessons in module order (lessons not listed in a module go last) */
(function () {
  const order = TUMBUH.modules.flatMap((m) => m.lessons);
  const rank = (l) => { const i = order.indexOf(l.slug); return i < 0 ? 999 : i; };
  TUMBUH.lessons.sort((a, b) => rank(a) - rank(b));
})();

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
    ex: { id: "Liabilitas Rp800 miliar, ekuitas Rp1.200 miliar → DER 0,67x.", en: "IDR 800 bn liabilities, IDR 1,200 bn equity → DER 0.67x." } },
  { id: "cum-date", term: { id: "Cum date", en: "Cum date" },
    def: { id: "Hari terakhir membeli saham agar masih berhak mendapat dividen atau hak aksi korporasi lainnya.", en: "The last day to buy a stock and still be entitled to a dividend or other corporate action." } },
  { id: "ex-date", term: { id: "Ex date", en: "Ex date" },
    def: { id: "Hari bursa setelah cum date. Pembeli pada hari ini tidak lagi berhak atas dividen. Harga biasanya turun kira-kira sebesar dividennya.", en: "The trading day after the cum date. Buyers from this day are no longer entitled to the dividend. The price usually drops by about the dividend." } },
  { id: "stock-split", term: { id: "Stock split", en: "Stock split" },
    def: { id: "Pemecahan saham menjadi lebih banyak lembar dengan harga lebih rendah. Nilai total kepemilikan tidak berubah.", en: "Splitting shares into more units at a lower price. The total value of your holding doesn't change." },
    ex: { id: "Split 1:5: 100 lembar × Rp10.000 menjadi 500 lembar × Rp2.000.", en: "1:5 split: 100 shares × IDR 10,000 become 500 shares × IDR 2,000." } },
  { id: "rights-issue", term: { id: "Rights issue (HMETD)", en: "Rights issue" },
    def: { id: "Penerbitan saham baru di mana pemegang saham lama mendapat hak membeli lebih dulu dengan harga tertentu.", en: "An issue of new shares where existing shareholders get the first right to buy at a set price." } },
  { id: "dilusi", term: { id: "Dilusi", en: "Dilution" },
    def: { id: "Mengecilnya porsi kepemilikan Anda karena perusahaan menerbitkan saham baru.", en: "Your ownership share getting smaller because the company issues new shares." } },
  { id: "buyback", term: { id: "Buyback", en: "Buyback" },
    def: { id: "Perusahaan membeli kembali sahamnya sendiri dari pasar, sehingga jumlah saham beredar berkurang.", en: "A company buying its own shares back from the market, reducing the number of shares outstanding." } },
  { id: "saham-gorengan", term: { id: "Saham gorengan", en: "Pumped stock (\"saham gorengan\")" },
    def: { id: "Istilah untuk saham yang harganya dinaikkan secara tidak wajar oleh pihak tertentu, lalu biasanya jatuh tajam.", en: "Slang for a stock whose price is pushed up artificially by certain parties, and then usually crashes." } },
  { id: "fomo", term: { id: "FOMO", en: "FOMO" },
    def: { id: "Fear of missing out: takut ketinggalan, sehingga membeli saat harga sudah naik tinggi tanpa alasan yang jelas.", en: "Fear of missing out: buying after a big price rise without a clear reason." } },
  { id: "average-down", term: { id: "Average down", en: "Averaging down" },
    def: { id: "Membeli lagi saham yang harganya turun agar harga rata-rata beli lebih rendah. Berisiko jika bisnisnya sedang bermasalah.", en: "Buying more of a falling stock to lower your average cost. Risky if the business is in trouble." } },
  { id: "anggota-bursa", term: { id: "Anggota Bursa (AB)", en: "Exchange Member" },
    def: { id: "Perusahaan sekuritas yang terdaftar sebagai anggota BEI dan boleh meneruskan order ke bursa.", en: "A brokerage registered as an IDX member and allowed to send orders to the exchange." } },
  { id: "ksei", term: { id: "KSEI dan AKSes", en: "KSEI and AKSes" },
    def: { id: "KSEI mencatat kepemilikan efek investor di Indonesia. Lewat AKSes KSEI, investor bisa mengecek sendiri saham dan dananya.", en: "KSEI records investors' securities holdings in Indonesia. Through AKSes KSEI, investors can check their own shares and funds." } },
  { id: "pbv", term: { id: "PBV (Price to Book Value)", en: "PBV (price-to-book)" },
    def: { id: "Harga saham dibagi nilai buku per saham. Menunjukkan berapa kali lipat nilai buku yang dibayar investor.", en: "Share price divided by book value per share. Shows how many times book value investors are paying." },
    ex: { id: "Harga Rp1.800, nilai buku per saham Rp1.200 → PBV 1,5x.", en: "IDR 1,800 price, IDR 1,200 book value per share → PBV 1.5x." } },
  { id: "nilai-buku", term: { id: "Nilai buku", en: "Book value" },
    def: { id: "Ekuitas perusahaan menurut laporan keuangan, yaitu aset dikurangi liabilitas.", en: "A company's equity in its financial statements: assets minus liabilities." } },
  { id: "reksa-dana", term: { id: "Reksa dana", en: "Mutual fund" },
    def: { id: "Wadah yang mengumpulkan dana banyak investor untuk dikelola manajer investasi dalam saham, obligasi, atau pasar uang.", en: "A vehicle pooling many investors' money, managed by an investment manager in stocks, bonds or money markets." } },
  { id: "nab", term: { id: "NAB (Nilai Aktiva Bersih)", en: "NAV (net asset value)" },
    def: { id: "Nilai total aset reksa dana dikurangi kewajibannya. NAB per unit adalah \"harga\" satu unit reksa dana.", en: "A fund's total assets minus liabilities. NAV per unit is the \"price\" of one fund unit." } },
  { id: "etf", term: { id: "ETF", en: "ETF" },
    def: { id: "Exchange Traded Fund: reksa dana yang diperdagangkan di bursa seperti saham, sering meniru sebuah indeks.", en: "Exchange Traded Fund: a fund traded on the exchange like a stock, often copying an index." } },
  { id: "manajer-investasi", term: { id: "Manajer investasi", en: "Investment manager" },
    def: { id: "Perusahaan berizin OJK yang mengelola dana reksa dana atas nama investor.", en: "An OJK-licensed company that manages mutual fund money on behalf of investors." } },
  { id: "lps", term: { id: "LPS", en: "LPS" },
    def: { id: "Lembaga Penjamin Simpanan: menjamin simpanan nasabah di bank peserta hingga batas tertentu.", en: "Indonesia's deposit insurance agency: guarantees customers' deposits at member banks up to a limit." } },
  { id: "dca", term: { id: "DCA (investasi rutin)", en: "DCA (regular investing)" },
    def: { id: "Dollar cost averaging: membeli dengan jumlah uang yang sama secara berkala, tanpa menebak waktu terbaik.", en: "Dollar cost averaging: buying with the same amount of money at regular intervals, without timing the market." } },
  { id: "uma", term: { id: "UMA", en: "UMA" },
    def: { id: "Unusual Market Activity: pengumuman bursa bahwa pergerakan harga atau volume sebuah saham tidak biasa.", en: "Unusual Market Activity: an exchange notice that a stock's price or volume movement is unusual." } },
  { id: "suspensi", term: { id: "Suspensi", en: "Suspension" },
    def: { id: "Penghentian sementara perdagangan sebuah saham oleh bursa.", en: "A temporary halt in trading of a stock by the exchange." } },
  { id: "keterbukaan-informasi", term: { id: "Keterbukaan informasi", en: "Disclosure" },
    def: { id: "Pengumuman resmi perusahaan tercatat yang wajib dipublikasikan melalui bursa, misalnya laporan keuangan dan aksi korporasi.", en: "Official announcements listed companies must publish through the exchange, such as financial reports and corporate actions." } }
];

/* Term of the day rotates by date */
TUMBUH.termOfDayIds = ["dividen", "lot", "per", "ihsg", "diversifikasi", "kapitalisasi-pasar", "capital-gain", "lq45", "doji", "der", "ekuitas", "likuid", "cum-date", "stock-split", "rights-issue", "fomo", "pbv", "dca", "etf", "uma"];
