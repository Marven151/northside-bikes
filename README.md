# Northside Bikes

A one-page website for a fictional bicycle repair shop in Bristol, made as a sample of local-business web design. The business is invented.

**Live:** https://marven151.github.io/northside-bikes/

## What's on the page

- **Hero** — one sentence, "Fixed same day", with a photograph of a workshop set inside it.
- **Prices** — the full price list. Click a job and the job ticket beside it fills in with the price and the ready-by time.
- **How a repair works** — drop, quote, collect, one full-screen panel each.
- **Hours and location** — opening hours and an embedded OpenStreetMap map.
- **FAQ** — native `<details>` accordions, no script.
- **Booking form** — client-side validation with inline messages and a success state. It is a demo, nothing is sent anywhere.
- **Footer** — the phone number as the headline.

## Stack

Plain HTML, CSS and vanilla JavaScript. No build step, no dependencies beyond two Google Fonts (Anton and Work Sans). Respects `prefers-reduced-motion`.

## Run locally

```bash
git clone https://github.com/Marven151/northside-bikes.git
cd northside-bikes
python3 -m http.server 8000
```

Open http://localhost:8000.

## Picture credits

Photographs from Wikimedia Commons: Alextredz (CC BY-SA 4.0) and Petar Milošević (CC BY-SA 4.0). Linked in the page footer.
