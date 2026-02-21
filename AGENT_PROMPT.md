# AGENT PROMPT — Word Quest
Paste this at the start of every new AI agent session.

## Project
Word Quest: Wordle-style literacy app for K-5, Science of Reading aligned.
~4,929 words, 8+ languages, Azure TTS audio, phonics metadata.

## HARD RULES (non-negotiable)
1. Edit ONLY `style/themes.css` unless break-glass is active.
2. Do NOT touch `style/components.css`, `style/modes.css`, `js/*`, or `index.html`.
3. No refactors. No new architecture. No duplicate theme systems.
4. One change → one file → minimal diff.

## Break-glass
Only edit protected files when explicitly told:
> "ALLOW_UI_STRUCTURE_CHANGES: [reason]"
Document the reason in your response.

## CSS architecture
- `style/components.css` — LOCKED. Layout, selectors, animations.
- `style/themes.css`     — SAFE. CSS variable tokens per theme only.
- `style/modes.css`      — LOCKED. Projector + Reduced Motion overrides.

## Theme recipe (tokens only, in themes.css)
Each [data-theme] block must set ONLY these tokens:
--page-bg, --page-bg2, --plate-bg, --plate-border,
--tile-face, --tile-border, --tile-text, --tile-shadow, --tile-filled-border,
--key-bg, --key-text, --key-shadow, --key-hover, --vowel-accent,
--brand, --brand-dk, --brand-text, --accent,
--header-bg, --header-border, --focusbar-bg,
--panel-bg, --panel-border, --panel-shadow,
--text, --text-muted, --modal-bg,
--fun-bg, --fun-text, --fun-border

## 60-30-10 color rule (enforce on every theme)
- 60%: neutral page background (--page-bg / --page-bg2) — light or mid tone, NEVER near-black
- 30%: brand-tinted elements (plate, keys, focus bar)
- 10%: saturated brand color (header strip, CTA button, shadows only)

## Audio paths (flat folder convention)
assets/audio/words/{word}.mp3
assets/audio/defs/{word}.mp3
assets/audio/sentences/{word}.mp3
assets/audio/fun/{word}.mp3
assets/audio/syllables/{word}.mp3

## Feedback colors (GLOBAL — never change per theme)
--correct: #16a34a  --correct-lt: #4ade80  --correct-dk: #14532d
--present: #d97706  --present-lt: #fcd34d  --present-dk: #78350f
--absent:  #94a3b8  --absent-dk:  #475569

## Acceptance checklist (verify before delivering)
- [ ] Only themes.css changed (unless break-glass)
- [ ] Page background is perceptibly colored (not near-black)
- [ ] Header strip = saturated brand color
- [ ] Keys = light with dark text
- [ ] Keyboard not compressed; board/keyboard aligned
- [ ] Projector Mode still readable
- [ ] Reduced Motion still respected
- [ ] No new global variables or duplicate styling
