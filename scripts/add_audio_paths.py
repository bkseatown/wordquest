#!/usr/bin/env python3
"""
add_audio_paths.py
==================
Injects audio file paths into app_ready_database_FINAL.json.

Audio folder convention (flat, by type):
  assets/audio/words/{word}.mp3       — word pronunciation (Azure TTS)
  assets/audio/defs/{word}.mp3        — definition read aloud (Azure TTS)
  assets/audio/sentences/{word}.mp3   — sentence in context (Azure TTS)
  assets/audio/fun/{word}.mp3         — fun fact / joke / quote (Azure TTS)
  assets/audio/syllables/{word}.mp3   — syllable-quality phoneme pronunciation (Gemini)

Usage:
  python3 add_audio_paths.py

  Run from inside 3_App_Build/ OR pass paths as arguments:
  python3 add_audio_paths.py --json path/to/db.json --audio path/to/assets/audio --out path/to/output.json

Output:
  app_ready_database_FINAL_with_audio.json
  (original file is NOT modified)
"""

import json
import os
import sys
import argparse
from pathlib import Path

# ── Folder names to check (order matters for reporting) ──
AUDIO_TYPES = {
    "word":      "words",
    "def":       "defs",
    "sentence":  "sentences",
    "fun":       "fun",
    "syllables": "syllables",
}

def make_path(audio_root: Path, folder: str, word: str) -> str | None:
    """Return relative path string if file exists, else None."""
    # Try lowercase filename first, then as-is
    for name in [word.lower(), word]:
        p = audio_root / folder / f"{name}.mp3"
        if p.exists():
            # Return relative path from 3_App_Build root
            return str(p.relative_to(p.parent.parent.parent))
    return None

def process(json_path: Path, audio_root: Path, out_path: Path):
    print(f"Reading:  {json_path}")
    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)

    # Handle both list and dict top-level
    entries = data if isinstance(data, list) else list(data.values())

    stats = {t: 0 for t in AUDIO_TYPES}
    missing = {t: [] for t in AUDIO_TYPES}
    total = len(entries)

    for entry in entries:
        word = entry.get("word", "").strip()
        if not word:
            continue

        audio_obj = entry.get("audio", {}) or {}

        for key, folder in AUDIO_TYPES.items():
            if audio_obj.get(key):
                stats[key] += 1  # already set, count it
                continue
            path = make_path(audio_root, folder, word)
            if path:
                audio_obj[key] = path
                stats[key] += 1
            else:
                missing[key].append(word)

        entry["audio"] = audio_obj

    # Write output
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Written: {out_path}")
    print(f"\n📊 Coverage ({total} words total):")
    for key in AUDIO_TYPES:
        pct = stats[key] / total * 100 if total else 0
        bar = "█" * int(pct / 5) + "░" * (20 - int(pct / 5))
        print(f"   {key:<12} {bar}  {stats[key]:>4}/{total}  ({pct:.1f}%)")

    # Report missing > 10 per type
    for key, words in missing.items():
        if words:
            print(f"\n⚠️  Missing {key} audio ({len(words)} words):")
            if len(words) <= 20:
                for w in words:
                    print(f"     {w}")
            else:
                for w in words[:10]:
                    print(f"     {w}")
                print(f"     ... and {len(words) - 10} more")
                # Write full missing list to file
                missing_file = out_path.parent / f"missing_{key}_audio.txt"
                missing_file.write_text("\n".join(words))
                print(f"     Full list → {missing_file}")

def main():
    parser = argparse.ArgumentParser(description="Inject audio paths into Word Quest database")
    parser.add_argument("--json",  default="app_ready_database_FINAL.json",
                        help="Path to input JSON database")
    parser.add_argument("--audio", default="assets/audio",
                        help="Path to audio root folder (contains words/, defs/, etc.)")
    parser.add_argument("--out",   default=None,
                        help="Output JSON path (default: input_with_audio.json)")
    args = parser.parse_args()

    json_path  = Path(args.json)
    audio_root = Path(args.audio)
    out_path   = Path(args.out) if args.out else json_path.with_name(
        json_path.stem + "_with_audio.json"
    )

    if not json_path.exists():
        print(f"❌ JSON not found: {json_path}")
        sys.exit(1)
    if not audio_root.exists():
        print(f"❌ Audio folder not found: {audio_root}")
        print(f"   Expected subfolders: {list(AUDIO_TYPES.values())}")
        sys.exit(1)

    process(json_path, audio_root, out_path)

if __name__ == "__main__":
    main()
