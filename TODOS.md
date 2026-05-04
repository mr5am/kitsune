# TODOS — Kitsune

Deferred work from sprint reviews. Pick up when friction warrants it.

---

## P2: Audio Preview (conviction before Suno)

**What:** In-browser feature that lets the user hear whether the emotional arc is right
before committing to a Suno generation.

**Why:** Reduces trial-and-error in Suno prompt generation. The current workflow is
build → paste → generate → wrong → tweak → regenerate. Audio preview short-circuits
that loop.

**Pros:** Single highest-leverage feature for daily workflow improvement. No competitor
has this because none have the section structure to drive it.

**Cons:** Mechanism is unclear. Synthesized chord playback (Tone.js) risks wrong-sounding
voicings that erode trust. Reference audio clips require curation. Expert music theory
input needed before implementation.

**Context:** Discussed in CEO review (2026-05-03). Tone.js was identified as one
mechanism, not the only one. Other candidates: royalty-free reference clips per
progression, curated Suno output examples, expert-authored sound descriptions. Needs
domain expert consultation before scoping.

**Effort:** L (human 3+ days) / M (CC) — depends on chosen mechanism.

**Depends on:** Expert input on mechanism. If Tone.js: CHORD_MAP data (15 progs × 4
voicings, spread voicings, ear-tested before merge).

---

## P3: Section Duplicate

**What:** A "Duplicate" button on each SectionCard that creates an identical copy of
the section (same typeId, prog, feel, endingType, inst) immediately below.

**Why:** Reduces friction when building tracks with repeated sections (e.g., two
Chorus instances with slight variations). Currently requires full manual rebuild.

**Pros:** S effort, zero dependencies, pure UX improvement.

**Cons:** Minor — arrow reordering already works. Not daily pain yet.

**Context:** Deferred in CEO review (2026-05-03). Revisit when section count regularly
hits 6+ and reuse becomes a pattern.

**Effort:** S (human 30 min) / S (CC 5 min). No new dependencies.

---

## P3: Better Song Name Generation

**What:** Replace the current feel-pool lookup with a more generative mechanism that
produces names that feel like genuine anime/J-pop track titles — not pattern-matched
strings from a static list.

**Why:** Current system (`NAME_POOLS[feel][tier][seed % pool.length]`) recycles a fixed
word list, so users will eventually see repeats and recognise the template. Real song
names feel discovered, not selected.

**Candidates:** Template grammar with combinatorial slots (adj + noun + optional particle);
weighted markov over a curated corpus of ~200 anime track titles; small local LLM call
(Transformers.js, runs in-browser); Claude API call on demand with the session state as
context. Claude API is highest quality but requires a backend or user-supplied key.

**Effort:** S–M depending on chosen mechanism.

**Depends on:** Mechanism decision. If Claude API: backend endpoint or user key flow.

---

## P3: Drag-to-Reorder Sections

**What:** Replace ↑↓ arrow buttons on SectionCard with drag-and-drop reordering using
`@dnd-kit/core`.

**Why:** Moving a section more than 2 steps requires many arrow clicks. Drag is instant.

**Pros:** Better UX for complex track structures. @dnd-kit is well-maintained.

**Cons:** Adds one npm dependency. Arrow pain only emerges at 6+ sections.

**Context:** Deferred in CEO review (2026-05-03). Revisit when tracks regularly exceed
6 sections and arrow navigation becomes friction.

**Effort:** M (human 2 hrs) / S (CC 20 min). Requires @dnd-kit/core.
