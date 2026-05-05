# Kitsune — Anime Music Composer

**Live demo:** [kitsune.mr5am.com](https://kitsune.mr5am.com) *(coming soon)*

A browser-based tool for composing structured [Suno](https://suno.com) prompts, designed around anime music production.

Kitsune generates the three inputs Suno needs — **Style**, **Exclude Style**, and **Lyrics** — from a visual song builder that lets you pick chord progressions, instrument layers, and emotional feel per section.

---

## Features

- **Section-based composition** — build a song from Intro, Main Theme, Verse, Pre-Chorus, Chorus, Bridge, and Outro sections
- **15+ chord progressions** — curated from anime/J-pop, each mapped to a descriptive Suno token string
- **Instrument chip grid** — 6 categories (Lead, Harmony, Rhythm, Bass, Texture, Energy) with instant toggling
- **Live output generation** — Style, Exclude Style, and Lyrics update in real time as you build
- **Named presets** — save and load song configurations via localStorage
- **Song structure templates** — load curated starting points (Kitsune Default, Cyberpunk Anime, Nier Automata)
- **Theme toggle** — dark and light modes
- **Copy buttons** — one click per field to paste directly into Suno

---

## Quick Start

Requires Node.js 18+.

```bash
git clone https://github.com/mr5am/kitsune.git
cd kitsune
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

```bash
npm run build    # production build → dist/
npm test         # run unit tests
```

---

## How It Works

1. Set **BPM**, **Lead Sound**, and **Overall Mood** in Global Settings
2. Add song sections with the **+ Section** button
3. For each section: pick a chord progression, toggle instrument chips, set the emotional feel
4. Copy the generated **Style**, **Exclude Style**, and **Lyrics** fields directly into Suno

The Exclude Style field is fixed — it always suppresses koto, glockenspiel, choir, and other sounds that muddy anime-style mixes.

---

## Tech Stack

- React 18 (no framework)
- Vite
- CSS Modules (custom dark editorial token system)
- Vitest

No backend. No API keys. All state lives in memory and localStorage.

---

## Project Structure

```
src/
  data.js               # All music content: progressions, instruments, feels
  App.jsx               # Root state and layout
  lib/buildOutputs.js   # Deterministic output generation
  components/           # UI components (each paired with a CSS module)
  styles/index.css      # Global tokens and reset
```

`data.js` is the single source of truth for all music content. Adding a new progression or instrument means one line there — nothing else changes.

---

## Contributing

Contributions welcome. A few things to know before you open a PR:

- `data.js` is the only place music content lives — don't hardcode strings in components
- No Tailwind. CSS modules only.
- Match existing style even if you'd do it differently

Open an issue first for anything substantial.

---

## License

MIT — see [LICENSE](LICENSE).

---

*Built for use with [Suno](https://suno.com). Not affiliated with Suno.*
