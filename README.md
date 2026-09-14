# NewChapterBox — QR ritual pages (v0, local)

Three landing pages — one per box — for the QR code printed on the back of each
box's Ritual Card. Each page is just one thing: box tone/colors + one play
button that plays the personal audio message for that box. No navigation, no
menu, nothing to distract from the ritual.

## Structure

```
newchapterbox-site/
├── index.html              ← local dev index only (links to the 3 pages). Do NOT deploy/link this publicly.
├── qr/
│   ├── reset/index.html         → will live at newchapterbox.com/qr/reset
│   ├── boss-mode/index.html     → will live at newchapterbox.com/qr/boss-mode
│   └── grow-and-glow/index.html → will live at newchapterbox.com/qr/grow-and-glow
├── assets/
│   ├── css/style.css       ← one shared stylesheet; each theme is a block of CSS variables
│   └── js/player.js        ← shared play/pause logic, vanilla JS, no dependencies
└── audio/
    ├── reset.wav
    ├── boss-mode.wav
    └── grow-and-glow.wav
```

## How to preview locally

Open `index.html` in a browser (or run `python3 -m http.server` from this
folder and visit `localhost:8000`). Click into any of the three box pages and
press play.

## How to swap in the real audio

Each page points at one file in `/audio/` by a fixed name:

- Reset Box → `audio/reset.wav`
- Boss Mode Box → `audio/boss-mode.wav`
- Grow & Glow Box → `audio/grow-and-glow.wav`

**Easiest path:** record/export your real message, name it exactly the same
(`reset.wav`, etc.) and overwrite the placeholder file. Nothing else needs to
change.

**If you want to use `.mp3` instead:** either export as `.wav`, or open the
matching `index.html` and change the one `src="../../audio/xxx.wav"` line on
the `<audio>` tag to your `.mp3` filename.

The three files currently in `/audio/` are placeholder tones I generated (not
real recordings) — just there so the play button is testable end-to-end
before you drop in the real voice messages.

## Why these URLs

The boxes already use English names (Reset Box, Boss Mode Box, Grow and Glow
Box), so I kept the QR paths in the same language rather than Bulgarian
("personalno-obrushtenie") — it matches the brand and is easy to type/debug:

```
newchapterbox.com/qr/reset
newchapterbox.com/qr/boss-mode
newchapterbox.com/qr/grow-and-glow
```

## What's intentionally NOT built yet

You said "for now" — so this is only the page + player, matching each box's
tone. Not built yet, on purpose:

1. **Deployment.** This is a static site — it can go on any static host
   (Netlify, Vercel, Cloudflare Pages, or a folder on your existing hosting)
   once you're ready to put it on newchapterbox.com. No framework/build step
   was added since 3 static pages don't need one.
2. **QR-only access gating.** Right now these pages are just unlisted URLs —
   anyone with the link can open them, the QR code is the only thing pointing
   at them. If you actually want scan-only access (not just an unlisted URL),
   that needs a real mechanism — e.g. a one-time/signed token embedded in the
   QR code and checked server-side — which means this can't stay purely
   static. Flag it when you're ready and we'll design that layer.
3. **The QR codes themselves.** Once the real domain path is live, generating
   the 3 QR images is a 2-minute job.

## Theme palettes (for reference / easy retuning)

| Box | Background | Accent | Feel |
|---|---|---|---|
| Reset | warm off-white `#F4F1EA` | sage `#7C9A82` | calm, quiet exhale |
| Boss Mode | near-black `#15151A` | gold `#D8AE55` | bold, confident |
| Grow & Glow | warm cream `#FBF2E7` | terracotta `#D9814F` | warm, blooming |

All defined as CSS variables in `assets/css/style.css` — change the values
there, not per-page.
