# Tumbuh — belajar saham untuk pemula 🌱

A bilingual (Bahasa Indonesia / English) learning website for first-time stock investors in Indonesia.
It uses plain HTML, CSS and JavaScript with no frameworks and no build step, so every file can be read and edited directly.

---

## 1. Open it

**Quickest:** double-click `index.html`. It opens in your browser and works offline, except for the font.

**Better, with VS Code:**
1. In VS Code: **File → Open Folder…** → choose this `tumbuh-website` folder.
2. Open the **Extensions** panel (Ctrl+Shift+X), search for **Live Server** (by Ritwick Dey) and install it.
3. Right-click `index.html` → **Open with Live Server**. The page reloads automatically every time you save a file.

## 2. What's inside

```
tumbuh-website/
├── index.html          Home: index, learning path, movers, sectors, term of the day
├── saham.html          Stock page — saham.html?kode=BBCA (any code from data.js)
├── belajar.html        Learn hub with progress
├── pelajaran.html      One lesson + quiz — pelajaran.html?id=apa-itu-saham
├── kamus.html          Glossary with search (link to a term: kamus.html#dividen)
├── penyaring.html      Simple screener — penyaring.html?pilih=dividend,big
├── pantau.html         Watchlist: the stocks you starred (saved in your browser)
├── bandingkan.html     Compare two stocks — bandingkan.html?a=BBCA&b=BBRI
├── kalkulator.html     Calculators: lots, profit after fees, monthly investing (DCA)
├── assets/
│   ├── css/style.css   All styling. Colours and sizes are at the top (":root")
│   ├── img/favicon.svg Logo / browser tab icon
│   └── js/
│       ├── companies.js    The 45 LQ45 companies + sectors (ID + EN)
│       ├── data.js         Lessons, modules, glossary, screener presets (ID + EN)
│       ├── market-data.js  Prices — sample data, or real data from the Python script
│       ├── i18n.js         All interface text in both languages + number formatting
│       ├── core.js         Header, footer, search, charts, shared helpers
│       └── pages/*.js      One script per page
└── tools/
    ├── update_prices.py    Downloads real prices into market-data.js
    └── requirements.txt
```

## 3. Get real prices (Python)

The site ships with **sample numbers**, and a yellow banner says so. To load recent real closing prices:

```bash
# in the VS Code terminal (Terminal → New Terminal), inside this folder
pip install -r tools/requirements.txt
python tools/update_prices.py
```

The script downloads about five years of daily closes for all 45 stocks, plus IHSG, from Yahoo Finance using `yfinance`. It then rewrites `assets/js/market-data.js`. Reload the page: the charts become real, and the banner changes to "Closing prices as of …".
Run it again whenever you want fresh numbers. The data is delayed and meant for learning, not trading.

## 4. Common edits

| I want to… | Edit |
|---|---|
| Change a colour | `assets/css/style.css`, the `:root` block at the top (e.g. `--accent`) |
| Change any button or label text | `assets/js/i18n.js` (both `id` and `en`) |
| Add or remove a stock | edit `TUMBUH.companies` in `companies.js`, then run the price script (it reads the codes from there) |
| Update LQ45 after a review | IDX re-evaluates the index regularly; update `companies.js` and `TUMBUH.lq45Period` |
| Add a lesson | copy one entry in `TUMBUH.lessons` (`data.js`), change the `slug`, text and quiz, then add the slug to a module in `TUMBUH.modules` |
| Add a glossary term | add an entry to `TUMBUH.glossary` (`data.js`) |

Every text has an `id` (Indonesian) and an `en` (English) version. If you forget one, the Indonesian text is shown.

## 5. Put it online for free (GitHub Pages)

1. Create a free account at github.com and a new **public** repository, e.g. `tumbuh-website`.
2. In VS Code: **Source Control** panel → **Publish to GitHub** (or upload the files on github.com → *Add file → Upload files*).
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / root → Save**.
4. After a minute the site is live at `https://<your-username>.github.io/tumbuh-website/`.

## 6. Before going public

- [ ] Run `update_prices.py` so no sample numbers are shown.
- [ ] Double-check company descriptions in `companies.js`, and that the LQ45 list is still current.
- [ ] Have someone review the lessons and the disclaimer. Content about investing in Indonesia is regulated by OJK, so the site should stay educational and never recommend specific buys or sells.
- [ ] Choose the final name and domain ("Tumbuh" is a working name). Check that no existing Indonesian brand already uses it.

---

Design: original, built for this project. The font is Plus Jakarta Sans (Google Fonts, open licence). Icons and the logo are hand-drawn SVG in `core.js`.
