"""Capture screenshots of the modernized dv-landing-new (localhost:4200) — v2."""

from __future__ import annotations

import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

OUT = Path(__file__).parent
BASE = "http://localhost:4200"

ROUTES = [
    ("home", "/"),
    ("optimemory", "/optimemory"),
    ("hyperrag", "/hyperrag"),
    ("deeptuner", "/deeptuner"),
    ("use-cases", "/use-cases"),
    ("pricing", "/pricing"),
    ("roadmap", "/roadmap"),
    ("blog", "/blog"),
    ("privacy-policy", "/privacy-policy"),
    ("terms", "/terms-of-service"),
    ("cookie-policy", "/cookie-policy"),
]


def capture(slug: str, path: str) -> None:
    folder = OUT / slug
    folder.mkdir(parents=True, exist_ok=True)
    url = BASE + path
    print(f"--- {slug} ({url})")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        try:
            context = browser.new_context(
                viewport={"width": 1440, "height": 900},
                device_scale_factor=2,
            )
            page = context.new_page()
            try:
                page.goto(url, wait_until="networkidle", timeout=45000)
            except Exception as e:
                print(f"   networkidle timed out: {e}; falling back to load")
                page.goto(url, wait_until="load", timeout=45000)
            time.sleep(2.5)
            page.screenshot(path=str(folder / "01-above-fold.png"))
            try:
                page.screenshot(path=str(folder / "02-full-page.png"), full_page=True)
            except Exception as e:
                print(f"   full_page failed: {e}")
            page.evaluate("window.scrollBy(0, window.innerHeight)")
            time.sleep(1.0)
            page.screenshot(path=str(folder / "03-second-fold.png"))
            page.evaluate("window.scrollBy(0, window.innerHeight)")
            time.sleep(1.0)
            page.screenshot(path=str(folder / "04-third-fold.png"))
        finally:
            browser.close()


def main() -> int:
    targets = ROUTES
    if len(sys.argv) > 1:
        wanted = set(sys.argv[1:])
        targets = [t for t in ROUTES if t[0] in wanted]
    for slug, path in targets:
        try:
            capture(slug, path)
        except Exception as e:
            print(f"!!! {slug} failed: {e}")
    print("done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
