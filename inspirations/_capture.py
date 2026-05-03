"""Capture full-page + above-the-fold screenshots of inspiration sites."""

from __future__ import annotations

import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

OUT = Path(__file__).parent

SITES = [
    ("lemurianlabs", "https://lemurianlabs.com/"),
    ("mantisgrid", "https://mantisgrid.ai/"),
    ("saaspo", "https://saaspo.com/"),
    ("neon", "https://neon.com/?ref=saaspo.com"),
    ("trymirai", "https://trymirai.com/?ref=saaspo.com"),
    ("callsine", "https://callsine.com/?ref=saaspo.com"),
    ("obsidianos", "https://obsidianos.com/?ref=saaspo.com"),
    ("mastra", "https://mastra.ai/?ref=saaspo.com"),
]


def capture(slug: str, url: str) -> None:
    folder = OUT / slug
    folder.mkdir(parents=True, exist_ok=True)
    print(f"--- {slug} ({url})")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        try:
            context = browser.new_context(
                viewport={"width": 1440, "height": 900},
                device_scale_factor=2,
                user_agent=(
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/127.0 Safari/537.36"
                ),
            )
            page = context.new_page()
            try:
                page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception as e:
                print(f"   networkidle timed out: {e}; falling back to load")
                page.goto(url, wait_until="load", timeout=45000)
            time.sleep(2.5)
            # Above-the-fold
            page.screenshot(path=str(folder / "01-above-fold.png"))
            # Full-page
            try:
                page.screenshot(path=str(folder / "02-full-page.png"), full_page=True)
            except Exception as e:
                print(f"   full_page failed: {e}")
            # Scroll one viewport for second-section grab
            page.evaluate("window.scrollBy(0, window.innerHeight)")
            time.sleep(1.0)
            page.screenshot(path=str(folder / "03-second-fold.png"))
            page.evaluate("window.scrollBy(0, window.innerHeight)")
            time.sleep(1.0)
            page.screenshot(path=str(folder / "04-third-fold.png"))
        finally:
            browser.close()


def main() -> int:
    targets = SITES
    if len(sys.argv) > 1:
        wanted = set(sys.argv[1:])
        targets = [t for t in SITES if t[0] in wanted]
    for slug, url in targets:
        try:
            capture(slug, url)
        except Exception as e:
            print(f"!!! {slug} failed: {e}")
    print("done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
