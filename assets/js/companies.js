/* ==========================================================================
   Tumbuh — companies: the LQ45 index
   --------------------------------------------------------------------------
   LQ45 = the 45 most liquid, large stocks on the Indonesia Stock Exchange.
   Members for 3 August – 30 October 2026, as announced by IDX on 27 July 2026
   (INDY and NCKL joined; SMGR and TOWR left).

   The exchange reviews the list regularly. When it changes:
     1. add or remove companies below,
     2. update TUMBUH.lq45Period,
     3. run  python tools/update_prices.py  (it reads the codes from here).

   tags: "brand" = a name most Indonesians know from daily life
         (used by the "Brands you know" screener preset)
   ========================================================================== */

window.TUMBUH = window.TUMBUH || {};

TUMBUH.lq45Period = { id: "3 Agustus – 30 Oktober 2026", en: "3 August – 30 October 2026" };

TUMBUH.sectors = {
  bank:      { id: "Perbankan",                en: "Banking" },
  coal:      { id: "Batu bara",                en: "Coal" },
  metals:    { id: "Logam & mineral",          en: "Metals & minerals" },
  energy:    { id: "Energi",                   en: "Energy" },
  materials: { id: "Bahan baku & kimia",       en: "Materials & chemicals" },
  consumer:  { id: "Makanan & barang konsumen", en: "Food & consumer goods" },
  retail:    { id: "Ritel",                    en: "Retail" },
  telco:     { id: "Telekomunikasi",           en: "Telecom" },
  tech:      { id: "Teknologi & media",        en: "Tech & media" },
  industrial:{ id: "Otomotif & industri",      en: "Automotive & industrial" },
  health:    { id: "Kesehatan",                en: "Healthcare" }
};

TUMBUH.companies = {
  /* ---- Banking ---- */
  BBCA: { name: "Bank Central Asia", sector: "bank", tags: ["brand"], hq: "Jakarta",
    about: { id: "Salah satu bank swasta terbesar di Indonesia. Menghasilkan uang terutama dari bunga pinjaman kepada nasabah, serta biaya layanan seperti transfer, kartu, dan perbankan digital.",
             en: "One of Indonesia's largest private banks. It earns money mainly from interest on loans to customers, plus fees for services such as transfers, cards and digital banking." } },
  BBRI: { name: "Bank Rakyat Indonesia", sector: "bank", tags: ["brand"], hq: "Jakarta",
    about: { id: "Bank milik negara yang fokus pada usaha mikro, kecil, dan menengah (UMKM), dengan jaringan yang menjangkau banyak daerah di Indonesia.",
             en: "A state-owned bank focused on micro, small and medium businesses (MSMEs), with a network reaching many regions of Indonesia." } },
  BMRI: { name: "Bank Mandiri", sector: "bank", tags: ["brand"], hq: "Jakarta",
    about: { id: "Bank milik negara yang melayani perusahaan besar maupun nasabah perorangan, dari pinjaman korporasi hingga tabungan dan mobile banking.",
             en: "A state-owned bank serving both large companies and individuals, from corporate loans to savings accounts and mobile banking." } },
  BBNI: { name: "Bank Negara Indonesia", sector: "bank", tags: ["brand"], hq: "Jakarta",
    about: { id: "Bank milik negara dengan layanan perbankan perorangan, bisnis, dan internasional.",
             en: "A state-owned bank offering personal, business and international banking." } },
  BBTN: { name: "Bank Tabungan Negara", sector: "bank", tags: ["brand"], hq: "Jakarta",
    about: { id: "Bank milik negara yang dikenal sebagai bank penyalur kredit pemilikan rumah (KPR), termasuk untuk rumah bersubsidi.",
             en: "A state-owned bank best known for home loans (mortgages), including for subsidised housing." } },

  /* ---- Coal ---- */
  AADI: { name: "Adaro Andalan Indonesia", sector: "coal", tags: [], hq: "Jakarta",
    about: { id: "Perusahaan tambang batu bara energi (thermal) yang dipisahkan dari grup Adaro. Labanya sangat dipengaruhi harga batu bara dunia.",
             en: "A thermal coal miner separated from the Adaro group. Its profit depends heavily on world coal prices." } },
  ADRO: { name: "Alamtri Resources Indonesia", sector: "coal", tags: [], hq: "Jakarta",
    about: { id: "Dulu bernama Adaro Energy. Kini berfokus pada batu bara metalurgi (untuk baja), mineral, dan energi terbarukan.",
             en: "Formerly Adaro Energy. It now focuses on metallurgical coal (used for steel), minerals and renewable energy." } },
  ADMR: { name: "Alamtri Minerals Indonesia", sector: "coal", tags: [], hq: "Jakarta",
    about: { id: "Anak usaha grup Alamtri yang menambang batu bara metalurgi, bahan untuk membuat baja, dan mengembangkan pengolahan aluminium.",
             en: "A unit of the Alamtri group that mines metallurgical coal, used to make steel, and is developing aluminium processing." } },
  BUMI: { name: "Bumi Resources", sector: "coal", tags: [], hq: "Jakarta",
    about: { id: "Salah satu produsen batu bara terbesar di Indonesia lewat tambang-tambangnya di Kalimantan. Harganya per lembar rendah dan sering diperdagangkan sangat ramai.",
             en: "One of Indonesia's biggest coal producers through its mines in Kalimantan. Its price per share is low and it is often traded very heavily." } },
  CUAN: { name: "Petrindo Jaya Kreasi", sector: "coal", tags: [], hq: "Jakarta",
    about: { id: "Perusahaan induk yang memiliki usaha tambang batu bara dan mineral. Harganya pernah naik sangat cepat, sehingga bisa bergejolak tajam.",
             en: "A holding company with coal and mineral mining businesses. Its price has risen very quickly in the past, so it can swing sharply." } },
  DEWA: { name: "Darma Henwa", sector: "coal", tags: [], hq: "Jakarta",
    about: { id: "Kontraktor jasa pertambangan: mengerjakan penggalian dan pengangkutan batu bara untuk pemilik tambang.",
             en: "A mining contractor that digs and hauls coal for mine owners." } },
  ITMG: { name: "Indo Tambangraya Megah", sector: "coal", tags: [], hq: "Jakarta",
    about: { id: "Produsen batu bara di Kalimantan yang dikenal rutin membagikan dividen besar ketika harga batu bara tinggi.",
             en: "A Kalimantan coal producer known for paying large dividends when coal prices are high." } },
  PTBA: { name: "Bukit Asam", sector: "coal", tags: [], hq: "Tanjung Enim",
    about: { id: "Perusahaan tambang batu bara milik negara di Sumatera Selatan, juga memiliki pembangkit listrik.",
             en: "A state-owned coal miner in South Sumatra that also owns power plants." } },
  INDY: { name: "Indika Energy", sector: "coal", tags: [], hq: "Jakarta",
    about: { id: "Grup energi yang awalnya berbasis batu bara dan kini merambah emas, kendaraan listrik, dan energi terbarukan.",
             en: "An energy group that started in coal and is expanding into gold, electric vehicles and renewable energy." } },

  /* ---- Metals & minerals ---- */
  ANTM: { name: "Aneka Tambang", sector: "metals", tags: ["brand"], hq: "Jakarta",
    about: { id: "Perusahaan tambang milik negara yang menambang nikel, emas, dan bauksit. Dikenal lewat emas batangan Antam.",
             en: "A state-owned miner of nickel, gold and bauxite, known for its Antam gold bars." } },
  AMMN: { name: "Amman Mineral Internasional", sector: "metals", tags: [], hq: "Jakarta",
    about: { id: "Menambang tembaga dan emas di Batu Hijau, Nusa Tenggara Barat. Salah satu perusahaan dengan nilai pasar terbesar di BEI.",
             en: "Mines copper and gold at Batu Hijau, West Nusa Tenggara. One of the largest companies on the IDX by market value." } },
  INCO: { name: "Vale Indonesia", sector: "metals", tags: [], hq: "Jakarta",
    about: { id: "Penambang dan pengolah nikel di Sulawesi. Nikel dipakai untuk baja tahan karat dan baterai kendaraan listrik.",
             en: "A nickel miner and processor in Sulawesi. Nickel is used in stainless steel and electric-vehicle batteries." } },
  MDKA: { name: "Merdeka Copper Gold", sector: "metals", tags: [], hq: "Jakarta",
    about: { id: "Grup tambang emas, tembaga, dan nikel. Induk dari Merdeka Battery Materials (MBMA).",
             en: "A gold, copper and nickel mining group, and the parent of Merdeka Battery Materials (MBMA)." } },
  MBMA: { name: "Merdeka Battery Materials", sector: "metals", tags: [], hq: "Jakarta",
    about: { id: "Menambang dan mengolah nikel untuk rantai pasok baterai kendaraan listrik.",
             en: "Mines and processes nickel for the electric-vehicle battery supply chain." } },
  NCKL: { name: "Trimegah Bangun Persada", sector: "metals", tags: [], hq: "Jakarta",
    about: { id: "Perusahaan nikel grup Harita di Pulau Obi, Maluku Utara, dari tambang hingga pabrik pengolahan.",
             en: "The Harita group's nickel company on Obi Island, North Maluku, from mine to processing plant." } },
  HRTA: { name: "Hartadinata Abadi", sector: "metals", tags: [], hq: "Bandung",
    about: { id: "Produsen dan penjual perhiasan emas serta emas batangan. Kinerjanya erat dengan harga emas.",
             en: "Makes and sells gold jewellery and gold bars. Its results move closely with the gold price." } },

  /* ---- Energy ---- */
  PGAS: { name: "Perusahaan Gas Negara", sector: "energy", tags: [], hq: "Jakarta",
    about: { id: "Menyalurkan dan menjual gas bumi lewat jaringan pipa ke industri, bisnis, dan rumah tangga.",
             en: "Transports and sells natural gas through pipelines to industry, businesses and households." } },
  MEDC: { name: "Medco Energi Internasional", sector: "energy", tags: [], hq: "Jakarta",
    about: { id: "Perusahaan minyak dan gas swasta, juga memiliki pembangkit listrik dan saham tambang tembaga-emas.",
             en: "A private oil and gas company that also owns power plants and a stake in a copper-gold mine." } },
  PGEO: { name: "Pertamina Geothermal Energy", sector: "energy", tags: [], hq: "Jakarta",
    about: { id: "Anak usaha Pertamina yang menghasilkan listrik dari panas bumi (geotermal), sumber energi terbarukan.",
             en: "A Pertamina unit that generates electricity from geothermal heat, a renewable energy source." } },
  AKRA: { name: "AKR Corporindo", sector: "energy", tags: [], hq: "Jakarta",
    about: { id: "Distributor bahan bakar dan bahan kimia, serta pengembang kawasan industri dan pelabuhan di Jawa Timur.",
             en: "A fuel and chemicals distributor that also develops an industrial estate and port in East Java." } },

  /* ---- Materials & chemicals ---- */
  BRPT: { name: "Barito Pacific", sector: "materials", tags: [], hq: "Jakarta",
    about: { id: "Kelompok usaha petrokimia (bahan baku plastik) dan energi panas bumi.",
             en: "A group in petrochemicals (raw materials for plastics) and geothermal energy." } },
  INKP: { name: "Indah Kiat Pulp & Paper", sector: "materials", tags: [], hq: "Jakarta",
    about: { id: "Produsen bubur kertas (pulp), kertas, dan kemasan dari grup Sinar Mas.",
             en: "A maker of pulp, paper and packaging, part of the Sinar Mas group." } },
  ESSA: { name: "ESSA Industries Indonesia", sector: "materials", tags: [], hq: "Jakarta",
    about: { id: "Memproduksi amonia (bahan pupuk) dan elpiji dari gas alam.",
             en: "Produces ammonia (used in fertiliser) and LPG from natural gas." } },

  /* ---- Food & consumer goods ---- */
  ICBP: { name: "Indofood CBP Sukses Makmur", sector: "consumer", tags: ["brand"], hq: "Jakarta",
    about: { id: "Produsen makanan kemasan, termasuk mi instan, susu, camilan, dan minuman.",
             en: "A packaged food maker, including instant noodles, dairy, snacks and drinks." } },
  INDF: { name: "Indofood Sukses Makmur", sector: "consumer", tags: ["brand"], hq: "Jakarta",
    about: { id: "Kelompok usaha pangan: dari tepung terigu dan minyak goreng hingga makanan kemasan. Induk dari ICBP.",
             en: "A food group spanning flour and cooking oil through to packaged foods. It is the parent of ICBP." } },
  UNVR: { name: "Unilever Indonesia", sector: "consumer", tags: ["brand"], hq: "Tangerang",
    about: { id: "Membuat dan menjual produk kebutuhan sehari-hari seperti sabun, sampo, pasta gigi, dan bumbu dapur.",
             en: "Makes and sells everyday products such as soap, shampoo, toothpaste and cooking condiments." } },
  CPIN: { name: "Charoen Pokphand Indonesia", sector: "consumer", tags: [], hq: "Jakarta",
    about: { id: "Produsen pakan ternak, anak ayam (DOC), dan daging ayam olahan. Labanya dipengaruhi harga jagung dan harga ayam.",
             en: "Produces animal feed, day-old chicks and processed chicken. Profit depends on corn and chicken prices." } },
  JPFA: { name: "Japfa Comfeed Indonesia", sector: "consumer", tags: [], hq: "Jakarta",
    about: { id: "Produsen pakan ternak, peternakan ayam, dan makanan olahan, mirip dengan CPIN.",
             en: "Produces animal feed, poultry and processed food — a similar business to CPIN." } },

  /* ---- Retail ---- */
  AMRT: { name: "Sumber Alfaria Trijaya", sector: "retail", tags: ["brand"], hq: "Tangerang",
    about: { id: "Pengelola jaringan minimarket Alfamart yang tersebar di seluruh Indonesia.",
             en: "Operates the Alfamart minimarket chain across Indonesia." } },
  MAPI: { name: "Mitra Adiperkasa", sector: "retail", tags: ["brand"], hq: "Jakarta",
    about: { id: "Perusahaan ritel yang mengelola banyak toko merek internasional untuk pakaian, olahraga, dan makanan-minuman.",
             en: "A retailer that runs stores for many international brands in fashion, sports and food and drink." } },

  /* ---- Telecom ---- */
  TLKM: { name: "Telkom Indonesia", sector: "telco", tags: ["brand"], hq: "Jakarta",
    about: { id: "Perusahaan telekomunikasi milik negara: jaringan seluler, internet rumah, dan pusat data.",
             en: "A state-owned telecom company: mobile networks, home internet and data centres." } },
  EXCL: { name: "XLSmart Telecom Sejahtera", sector: "telco", tags: ["brand"], hq: "Jakarta",
    about: { id: "Operator seluler hasil penggabungan XL Axiata dan Smartfren.",
             en: "A mobile operator formed from the merger of XL Axiata and Smartfren." } },
  ISAT: { name: "Indosat", sector: "telco", tags: ["brand"], hq: "Jakarta",
    about: { id: "Operator seluler di balik merek IM3 dan Tri, juga bisnis internet dan pusat data.",
             en: "The mobile operator behind the IM3 and Tri brands, with internet and data-centre businesses." } },
  WIFI: { name: "Solusi Sinergi Digital", sector: "telco", tags: [], hq: "Jakarta",
    about: { id: "Membangun jaringan internet serat optik dan menyediakan layanan internet rumah. Perusahaan yang sedang tumbuh cepat, sehingga harganya bisa bergejolak.",
             en: "Builds fibre-optic internet networks and provides home internet. A fast-growing company, so its price can swing a lot." } },

  /* ---- Tech & media ---- */
  GOTO: { name: "GoTo Gojek Tokopedia", sector: "tech", tags: ["brand"], hq: "Jakarta",
    about: { id: "Perusahaan teknologi di balik aplikasi transportasi, pesan-antar, dan pembayaran digital. Harga per sahamnya rendah, tetapi jumlah sahamnya sangat banyak.",
             en: "The tech company behind ride-hailing, delivery and digital payment apps. Its price per share is low, but it has a very large number of shares." } },
  EMTK: { name: "Elang Mahkota Teknologi", sector: "tech", tags: [], hq: "Jakarta",
    about: { id: "Kelompok usaha media dan teknologi, termasuk stasiun televisi, layanan streaming, dan investasi digital.",
             en: "A media and tech group, including TV stations, streaming services and digital investments." } },
  SCMA: { name: "Surya Citra Media", sector: "tech", tags: ["brand"], hq: "Jakarta",
    about: { id: "Pemilik stasiun televisi nasional dan platform streaming, bagian dari grup EMTK.",
             en: "Owns national TV stations and a streaming platform, part of the EMTK group." } },

  /* ---- Automotive & industrial ---- */
  ASII: { name: "Astra International", sector: "industrial", tags: ["brand"], hq: "Jakarta",
    about: { id: "Kelompok usaha besar yang menjual dan merakit mobil serta motor, dengan bisnis alat berat, perkebunan, dan jasa keuangan.",
             en: "A large business group that sells and assembles cars and motorbikes, with heavy equipment, plantations and financial services." } },
  UNTR: { name: "United Tractors", sector: "industrial", tags: [], hq: "Jakarta",
    about: { id: "Anak usaha Astra yang menjual alat berat, menjadi kontraktor tambang, dan memiliki tambang batu bara serta emas.",
             en: "An Astra unit that sells heavy equipment, works as a mining contractor, and owns coal and gold mines." } },

  /* ---- Healthcare ---- */
  KLBF: { name: "Kalbe Farma", sector: "health", tags: ["brand"], hq: "Jakarta",
    about: { id: "Perusahaan farmasi yang membuat obat resep, obat bebas, minuman kesehatan, dan nutrisi.",
             en: "A pharmaceutical company making prescription and over-the-counter medicines, health drinks and nutrition products." } }
};
