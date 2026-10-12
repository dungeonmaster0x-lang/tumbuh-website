"""
Tumbuh — price updater
======================

Downloads recent closing prices for the stocks on the site and writes them to
assets/js/market-data.js, replacing the sample numbers.

How to run (from the tumbuh-website folder, in the VS Code terminal):

    pip install -r tools/requirements.txt
    python tools/update_prices.py

The list of stocks is read from assets/js/companies.js (the LQ45 members).

What it fills in for each stock:
    price, prevClose        last close and the close before it
    high52, low52           highest / lowest close over the last 12 months
    history                 daily closes for up to 5 years (for the charts)
    volumeM                 shares traded on the last day (millions)
    marketCapT, pe, pbv,    from Yahoo Finance when available; left empty
    divYield, roe           (shown as "—" on the site) when not

Data comes from Yahoo Finance through the free `yfinance` library. It is
delayed, can have gaps, and is fine for a learning site — not for trading.
"""

from __future__ import annotations

import datetime as dt
import json
import re
import sys
from pathlib import Path

try:
    import yfinance as yf
except ImportError:
    sys.exit("yfinance is not installed. Run:  pip install -r tools/requirements.txt")

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "js" / "market-data.js"

COMPANIES = ROOT / "assets" / "js" / "companies.js"


def site_codes() -> list[str]:
    """Read the stock codes from assets/js/companies.js, so the list lives in one place."""
    text = COMPANIES.read_text(encoding="utf-8")
    block = text[text.index("TUMBUH.companies"):]
    return re.findall(r"^\s{2}([A-Z]{4}):\s*\{", block, re.M)


INDEX_SYMBOL = "^JKSE"  # IHSG / Jakarta Composite Index


def read_existing() -> dict:
    """Read the current market-data.js so we can keep values Yahoo doesn't give us."""
    if not OUT.exists():
        return {}
    text = OUT.read_text(encoding="utf-8")
    match = re.search(r"TUMBUH\.market\s*=\s*(\{.*\});", text, re.S)
    if not match:
        return {}
    js = match.group(1)
    # The sample file is written as a JS object, not strict JSON: quote keys.
    js = re.sub(r"([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', js)
    try:
        return json.loads(js)
    except json.JSONDecodeError:
        return {}


def closes(symbol: str, period: str = "5y"):
    data = yf.Ticker(symbol).history(period=period, interval="1d", auto_adjust=False)
    data = data.dropna(subset=["Close"])
    return data


def history_points(data) -> list[list]:
    return [[idx.strftime("%Y-%m-%d"), round(float(row.Close), 2)] for idx, row in data.iterrows()]


def year_slice(data):
    cutoff = data.index[-1] - dt.timedelta(days=365)
    return data[data.index >= cutoff]


def fundamentals(symbol: str) -> dict:
    """Best-effort fundamentals. Any missing field is simply skipped."""
    out = {}
    try:
        info = yf.Ticker(symbol).info or {}
    except Exception as err:  # network hiccup or Yahoo change — not fatal
        print(f"   (no fundamentals for {symbol}: {err})")
        return out
    if info.get("marketCap"):
        cap_t = info["marketCap"] / 1e12                       # in trillions of rupiah
        out["marketCapT"] = round(cap_t, 1 if cap_t < 10 else 0)
    pe = info.get("trailingPE")
    if isinstance(pe, (int, float)) and 0 < pe < 500:
        out["pe"] = round(pe, 1)
    # Dividend yield: Yahoo has two fields, and either can be empty or wrongly 0.
    trailing = info.get("trailingAnnualDividendYield")       # a fraction, e.g. 0.047
    forward = info.get("dividendYield")                      # newer yfinance: percent (4.7); older: fraction
    MAX_PLAUSIBLE = 25.0                                      # above this, Yahoo's number is almost surely wrong
    t_pct = trailing * 100 if isinstance(trailing, (int, float)) else None
    f_pct = None
    if isinstance(forward, (int, float)):
        f_pct = forward if forward >= 1 else forward * 100
    if t_pct is not None and 0 < t_pct <= MAX_PLAUSIBLE:
        out["divYield"] = round(t_pct, 1)                     # prefer what was actually paid last year
    elif f_pct is not None and 0 < f_pct <= MAX_PLAUSIBLE:
        out["divYield"] = round(f_pct, 1)                     # fall back to Yahoo's other field
    elif t_pct == 0 and not f_pct:
        out["divYield"] = 0.0                                 # both fields agree: no dividend
    # anything else stays empty and shows as "—" on the site
    pbv = info.get("priceToBook")
    if isinstance(pbv, (int, float)) and 0 < pbv < 100:
        out["pbv"] = round(pbv, 2)
    roe = info.get("returnOnEquity")
    if isinstance(roe, (int, float)):
        out["roe"] = round(roe * 100, 1)
    return out


def main() -> None:
    existing = read_existing()
    codes = site_codes()
    print(f"{len(codes)} stocks found in companies.js\n")
    stocks: dict[str, dict] = {}
    missing: list[str] = []
    last_date = None

    for code in codes:
        symbol = f"{code}.JK"
        print(f"→ {code} …", end=" ", flush=True)
        try:
            data = closes(symbol)
        except Exception as err:
            print(f"failed ({err}) — this stock will be hidden until the next run")
            missing.append(code)
            continue
        if len(data) < 2:
            print("no data — this stock will be hidden until the next run")
            missing.append(code)
            continue

        year = year_slice(data)
        # Start fresh: never mix sample numbers with real ones.
        entry = {"marketCapT": None, "pe": None, "pbv": None, "divYield": None, "roe": None}
        entry.update({
            "price": round(float(data.Close.iloc[-1]), 2),
            "prevClose": round(float(data.Close.iloc[-2]), 2),
            "high52": round(float(year.Close.max()), 2),
            "low52": round(float(year.Close.min()), 2),
            "volumeM": round(float(data.Volume.iloc[-1]) / 1e6, 1),
        })
        entry.update(fundamentals(symbol))
        entry["history"] = history_points(data)
        stocks[code] = entry
        last_date = max(last_date or data.index[-1], data.index[-1])
        print(f"{entry['price']:,.0f}")

    print(f"→ IHSG ({INDEX_SYMBOL}) …", end=" ", flush=True)
    index = existing.get("index", {"value": 0, "prevClose": 0})
    try:
        ix = closes(INDEX_SYMBOL, "1y")
        index = {
            "value": round(float(ix.Close.iloc[-1]), 2),
            "prevClose": round(float(ix.Close.iloc[-2]), 2),
            "history": history_points(ix),
        }
        print(f"{index['value']:,.2f}")
    except Exception as err:
        print(f"failed ({err}); keeping old values")

    if not last_date:
        sys.exit("No prices could be downloaded. Check your internet connection and try again.")

    market = {
        "isSample": False,
        "updated": last_date.strftime("%Y-%m-%d"),
        "index": index,
        "stocks": stocks,
    }
    header = (
        "/* Tumbuh — market numbers\n"
        f"   Generated by tools/update_prices.py on {dt.date.today().isoformat()}.\n"
        "   Source: Yahoo Finance via yfinance. Delayed data — for learning, not trading.\n"
        "   Do not edit by hand; run the script again to refresh. */\n\n"
        "window.TUMBUH = window.TUMBUH || {};\n\n"
    )
    OUT.write_text(header + "TUMBUH.market = " + json.dumps(market, ensure_ascii=False, separators=(",", ":")) + ";\n",
                   encoding="utf-8")
    if missing:
        print(f"\nCould not download: {', '.join(missing)}. Run the script again later.")
    print(f"\nDone. Wrote {OUT.relative_to(ROOT)} (prices as of {market['updated']}).")


if __name__ == "__main__":
    main()
