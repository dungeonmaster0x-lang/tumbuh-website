/* Tumbuh — link previews, share pages and sitemap
   ---------------------------------------------------------------------
   Run:  node tools/build_pages.js        (GitHub runs it after every
   price update, so you normally don't need to.)

   What it does
   1. Writes the <!-- seo --> block in the <head> of every page: the
      description Google shows, and the "card" (title, text, picture)
      WhatsApp, X, Facebook and Telegram show when someone shares a link.
   2. Makes one small page per stock (s/BBCA.html) and per lesson
      (p/apa-itu-saham.html). Link previewers don't run JavaScript, so
      these pages carry the stock's or lesson's own card and then forward
      the visitor to the real page. The Share buttons use these links.
   3. Writes sitemap.xml and robots.txt for search engines.

   Bought your own domain? Change SITE below and run the script again.  */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE = "https://dungeonmaster0x-lang.github.io/tumbuh-website/";
const ROOT = path.join(__dirname, "..");

/* ---- load the site's data files the same way the browser does ------- */
const ctx = {};
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ["companies.js", "data.js", "market-data.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "assets/js", f), "utf8"), ctx, { filename: f });
}
const D = ctx.TUMBUH;
const market = D.market;

/* ---- helpers --------------------------------------------------------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const num = (n, d = 0) => new Intl.NumberFormat("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);
const pct = (n) => (n > 0 ? "+" : n < 0 ? "−" : "") + num(Math.abs(n), 2) + "%";
const dateId = (iso) => new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso + "T00:00:00Z"));
const img = (name) => SITE + "assets/img/" + name + ".png";

function tags({ title, desc, url, image, type = "website", robots }) {
  return [
    `<meta name="description" content="${esc(desc)}">`,
    robots ? `<meta name="robots" content="${robots}">` : `<link rel="canonical" href="${esc(url)}">`,
    `<meta name="theme-color" content="#278264">`,
    `<meta property="og:site_name" content="Tumbuh">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:locale" content="id_ID">`,
    `<meta property="og:locale:alternate" content="en_US">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${esc(image)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Tumbuh — belajar saham untuk pemula">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(desc)}">`,
    `<meta name="twitter:image" content="${esc(image)}">`,
  ].map((l) => "  " + l).join("\n");
}

/* ---- 1. the main pages ----------------------------------------------- */
const ix = market.index;
const ixChg = ix.prevClose ? ((ix.value - ix.prevClose) / ix.prevClose) * 100 : 0;
let upN = 0, downN = 0;
Object.values(market.stocks).forEach((m) => { if (m.price > m.prevClose) upN++; else if (m.price < m.prevClose) downN++; });
const recapDesc = market.isSample
  ? "Ringkasan pasar saham Indonesia setiap hari bursa, dijelaskan dengan bahasa sederhana. Daily Indonesian market recap in plain language."
  : `IHSG ${ixChg >= 0 ? "naik" : "turun"} ${num(Math.abs(ixChg), 2)}% ke ${num(ix.value, 2)} pada ${dateId(market.updated)}. ${upN} saham LQ45 naik, ${downN} turun. Saham naik dan turun terbesar serta sektor, dijelaskan dengan bahasa sederhana.`;

const PAGES = {
  "index.html":      { title: "Tumbuh — Belajar saham untuk pemula", image: "og", url: SITE,
    desc: "Belajar pasar saham Indonesia dengan bahasa sederhana: kelas gratis, saham LQ45, kamus istilah dan portofolio latihan. Learn the Indonesian stock market in plain language." },
  "ringkasan.html":  { title: market.isSample ? "Ringkasan pasar harian — Tumbuh" : `Ringkasan pasar ${dateId(market.updated)} — Tumbuh`, image: "og-recap", desc: recapDesc },
  "belajar.html":    { title: "Kelas saham gratis untuk pemula — Tumbuh", image: "og-learn",
    desc: `${D.lessons.length} pelajaran singkat dengan kuis: dari apa itu saham sampai membeli saham pertama. Free beginner stock course in Bahasa Indonesia and English.` },
  "pelajaran.html":  { title: "Pelajaran — Tumbuh", image: "og-learn", desc: "Pelajaran saham singkat untuk pemula, lengkap dengan kuis. Short beginner stock lessons with quizzes." },
  "kamus.html":      { title: "Kamus istilah saham — Tumbuh", image: "og",
    desc: `${D.glossary.length} istilah pasar saham dijelaskan dengan bahasa sehari-hari dan contoh. Stock market terms explained in everyday language.` },
  "penyaring.html":  { title: "Penyaring saham LQ45 — Tumbuh", image: "og", desc: "Cari saham LQ45 dengan filter sederhana: perusahaan besar, dividen tinggi, harga terjangkau dan lainnya. A plain-language LQ45 stock screener." },
  "saham.html":      { title: "Saham — Tumbuh", image: "og", desc: "Harga, grafik, dividen dan angka penting saham LQ45, dijelaskan untuk pemula. LQ45 stock prices, charts and dividends explained." },
  "bandingkan.html": { title: "Bandingkan dua saham — Tumbuh", image: "og", desc: "Bandingkan dua saham LQ45 berdampingan: kinerja harga, dividen, P/E dan PBV. Compare two LQ45 stocks side by side." },
  "kalkulator.html": { title: "Kalkulator saham — Tumbuh", image: "og", desc: "Hitung modal per lot, untung-rugi setelah biaya, dan simulasi investasi rutin bulanan. Lot, profit/loss and monthly-investing calculators." },
  "latihan.html":    { title: "Portofolio latihan — Tumbuh", image: "og", desc: "Berlatih membeli dan menjual saham LQ45 dengan uang pura-pura dan harga sungguhan. Practise trading with pretend money and real prices." },
  "pantau.html":     { title: "Pantauan — Tumbuh", image: "og", desc: "Saham-saham yang Anda pantau di Tumbuh. Your watchlist on Tumbuh." },
  "prestasi.html":   { title: "Prestasi — Tumbuh", image: "og-learn", desc: "Kumpulkan lencana dan dapatkan sertifikat setelah menyelesaikan kelas saham Tumbuh. Collect badges and earn your certificate." },
};

const START = "<!-- seo:start (written by tools/build_pages.js) -->", END = "<!-- seo:end -->";
for (const [file, p] of Object.entries(PAGES)) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) continue;
  let html = fs.readFileSync(fp, "utf8");
  const block = `  ${START}\n${tags({ title: p.title, desc: p.desc, url: p.url || SITE + file, image: img(p.image) })}\n  ${END}`;
  html = html.replace(/^[ \t]*<meta name="description"[^>]*>\n/m, "");
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`);
  if (html.includes(START)) html = html.replace(new RegExp(`[ \\t]*${START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${END}`), block);
  else html = html.replace(/(<title>[^<]*<\/title>\n)/, `$1${block}\n`);
  fs.writeFileSync(fp, html);
}

/* ---- 2. share pages -------------------------------------------------- */
function sharePage({ title, desc, image, target }) {
  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <!-- Made by tools/build_pages.js — edits here are overwritten. -->
${tags({ title, desc, url: SITE + target, image, type: "article", robots: "noindex, follow" })}
  <meta http-equiv="refresh" content="0; url=../${esc(target)}">
  <script>location.replace("../${target}" + location.hash);</script>
</head>
<body style="font-family:system-ui,sans-serif;padding:24px">
  <p><a href="../${esc(target)}">${esc(title)}</a></p>
</body>
</html>
`;
}
function writeDir(dir, files) {
  const d = path.join(ROOT, dir);
  fs.rmSync(d, { recursive: true, force: true });
  fs.mkdirSync(d, { recursive: true });
  for (const [name, body] of Object.entries(files)) fs.writeFileSync(path.join(d, name), body);
}

const stockFiles = {};
for (const [code, c] of Object.entries(D.companies)) {
  const m = market.stocks[code];
  let desc = `${c.name}: harga, grafik lilin, riwayat dividen dan angka penting, dijelaskan dengan bahasa sederhana untuk pemula.`;
  if (m && !market.isSample && m.prevClose) {
    desc = `Harga penutupan Rp${num(m.price)} (${pct(((m.price - m.prevClose) / m.prevClose) * 100)}) pada ${dateId(market.updated)}. ` + desc;
  }
  stockFiles[code + ".html"] = sharePage({ title: `${code} — ${c.name} | Tumbuh`, desc, image: img("og"), target: `saham.html?kode=${code}` });
}
writeDir("s", stockFiles);

const lessonFiles = {};
D.lessons.forEach((l, i) => {
  lessonFiles[l.slug + ".html"] = sharePage({
    title: `${l.title.id} | Kelas saham Tumbuh`,
    desc: `Pelajaran ${i + 1} dari ${D.lessons.length} (${l.mins} menit): ${l.desc.id} ${l.desc.en}`,
    image: img("og-learn"), target: `pelajaran.html?id=${l.slug}`,
  });
});
writeDir("p", lessonFiles);

/* ---- 3. sitemap + robots --------------------------------------------- */
const today = market.updated || new Date().toISOString().slice(0, 10);
const urls = [
  ["", today, "daily", "1.0"], ["ringkasan.html", today, "daily", "0.9"], ["belajar.html", null, "monthly", "0.9"],
  ["kamus.html", null, "monthly", "0.7"], ["penyaring.html", today, "daily", "0.6"], ["bandingkan.html", null, "monthly", "0.5"],
  ["kalkulator.html", null, "monthly", "0.5"], ["latihan.html", null, "monthly", "0.5"], ["prestasi.html", null, "monthly", "0.3"],
  ...D.lessons.map((l) => [`pelajaran.html?id=${l.slug}`, null, "monthly", "0.8"]),
  ...Object.keys(D.companies).filter((c) => market.stocks[c]).map((c) => [`saham.html?kode=${c}`, today, "daily", "0.6"]),
];
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, mod, freq, pri]) => `  <url><loc>${esc(SITE + u)}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ""}<changefreq>${freq}</changefreq><priority>${pri}</priority></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);

console.log(`Previews written for ${Object.keys(PAGES).length} pages, ${Object.keys(stockFiles).length} stock and ${Object.keys(lessonFiles).length} lesson share pages, ${urls.length} sitemap entries.`);
