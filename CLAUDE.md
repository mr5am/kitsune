# CLAUDE.md — Kitsune Anime Music Composer

Behavioral guidelines to reduce common LLM coding mistakes, merged with project-specific context.
**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

---

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

---

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

---

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## 5. Project Overview

**Kitsune** is a browser-based song composition tool for generating structured Suno 5.5 prompts, designed around anime music production — specifically for use with Kling-generated anime video.

The tool produces three outputs that map directly to Suno's input fields:
- **Style** — a comma-separated descriptor string
- **Exclude Style** — a fixed list of sounds to suppress
- **Lyrics** — `[Section]` / `[descriptor]` structural tags (Instrumental toggle ON, no actual lyrics)

---

## 6. Architecture

```
src/
  data.js          # All constants: TYPES, PROGS, INST_POOL, FEELS, EXCLUDE
  App.jsx           # Root: holds all state, passes down via props
  components/
    GlobalSettings.jsx   # BPM / Lead / Mood chip pickers
    SectionCard.jsx      # Expandable song section (prog + instruments + feel)
    ProgPicker.jsx       # Chord progression selector (left column)
    InstLayers.jsx       # Instrument chip grid by category (right column)
    AddSectionModal.jsx  # Section type picker modal
    OutputBar.jsx        # Sticky bottom: Style / Exclude / Lyrics tabs + copy
  styles/
    index.css       # Global tokens, reset, body
    [Component].module.css  # Per-component scoped styles
```

**State lives entirely in `App.jsx`.** No context, no external state library unless complexity genuinely demands it — ask before adding.

---

## 7. Data Layer (`data.js`)

This is the most important file to keep clean. All music content lives here — nothing hardcoded in components.

Key exports:
```js
TYPES      // Section type definitions (id, label, icon, bar color, default prog/feel/instruments)
PROGS      // Chord progressions (id, name, suno token string, short desc)
INST_POOL  // { lead, harmony, rhythm, bass, texture, energy } → string[]
CATS       // Category metadata (label, CSS class)
FEELS      // ['gentle','warm','intense','dark','euphoric']
FEEL_WORDS // { gentle:'soft', warm:'warm', ... }
EXCLUDE    // Fixed exclude string, never changes at runtime
```

**Adding a new progression or instrument = one line in `data.js`, nothing else should change.**

---

## 8. Output Generation Rules

The three Suno outputs are derived deterministically from state. Logic lives in a `buildOutput(state)` utility — not inside components.

**Style field:**
```
hybrid lofi-electronic anime opening theme, {bpm} BPM, {mood}, {lead},
{unique prog suno tokens}, {unique instruments across all sections},
wide cinematic mix, instrumental only
```

**Lyrics field:**
```
[Instrumental]

[Section Label]
[{feelWord} {progHint harmony}, {instruments joined by comma}]

[Section Label]
...
```

**Exclude field:** Always the fixed `EXCLUDE` constant. Never modified at runtime.

---

## 9. Music Domain Context

Understanding these concepts helps interpret feature requests correctly:

| Term | Meaning in this tool |
|---|---|
| **Royal Road** | IV–V–vi harmonic loop; warm, yearning; anime staple |
| **Secondary Dominant** | V/vi chromatic pull; emotional J-pop punch |
| **Anime Progression** | I°7→III→vi→v→I→IV; dark open → wonder unfold |
| **Line Cliché** | Semitone inner voice movement; shimmer & stillness |
| **Minor 3rd Shift** | ±3 semitone key modulation; mood pivot |
| **Black Adder** | Root+♭7+9+#11 tritone stab; dramatic city-reveal chord |
| **♭6→5→1** | Harmonic minor cadence; darker Vocaloid emotional colour |
| **Suno Style field** | Comma-separated descriptors; more specific = better steering |
| **Suno Lyrics field** | Structural tags only when Instrumental toggle is ON |
| **Suno Exclude field** | Suppresses unwanted sounds; koto/glock/choir always excluded |

---

## 10. Locked Design Decisions

These are not up for debate unless the user explicitly reopens them:

- **No Tailwind.** CSS modules only. The design uses a custom dark editorial token system — don't introduce utility class frameworks.
- **No global state library** (no Redux, no Zustand) until there's a concrete reason. Props + lifting state is fine at this scale.
- **No backend.** localStorage for persistence. Supabase only if user accounts are explicitly requested.
- **Instrumental only.** The Lyrics field is always structural tags — never actual lyric text. Don't add a "with vocals" mode unless asked.
- **Exclude list is fixed.** It's a creative constraint, not user-configurable. Don't add UI to edit it unless asked.
- **`data.js` is the only place music content lives.** If a feature requires hardcoding instrument names or progression tokens in a component, stop and restructure.

---

## 11. Current Feature State

**Implemented:**
- Global settings: BPM, Lead Sound, Overall Mood
- Song sections: add, remove, reorder (↑↓)
- Per section: chord progression picker, instrument layer chips (6 categories), section feel
- Default instrument selections per section type
- Add Section modal with 8 section types
- Sticky output bar: Style / Exclude / Lyrics tabs, copy buttons
- All output generated live from state

**Planned (not started — ask before assuming priority):**
- Named preset save/load via localStorage
- One-click "Copy All Three Fields" export block
- Song structure templates ("Kitsune Isekai Arc", "Dark City Chase")
- Per-section production notes text field
- Duplicate section button

---

## 12. gstack

Use the `/browse` skill from gstack for all web browsing. Never use `mcp__claude-in-chrome__*` tools.

Install: `git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`

Available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review, /design-consultation, /design-shotgun, /design-html, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse, /connect-chrome, /qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /setup-gbrain, /retro, /investigate, /document-release, /codex, /cso, /autoplan, /plan-devex-review, /devex-review, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade, /learn

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
