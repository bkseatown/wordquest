/* Focus info (SoR skill hints) */
(function(){
  'use strict';
  window.FOCUS_INFO = {
  "all": {
    "title": "All Words",
    "desc": "Mixed review across patterns.",
    "examples": "cat, ship, cake, rain",
    "quick": []
  },
  "cvc": {
    "title": "CVC (Short Vowels)",
    "desc": "Short vowel, 3-sound words (consonant–vowel–consonant).",
    "examples": "cat, dog, sun",
    "quick": [
      "a",
      "e",
      "i",
      "o",
      "u"
    ]
  },
  "digraph": {
    "title": "Digraphs",
    "desc": "Two letters, one sound (sh, ch, th, wh, ck).",
    "examples": "ship, chat, thin, whiz, duck",
    "quick": [
      "sh",
      "ch",
      "th",
      "wh",
      "ck"
    ]
  },
  "ccvc": {
    "title": "Initial Blends",
    "desc": "Two consonants at the start; you hear both sounds.",
    "examples": "stop, crab, flag",
    "quick": [
      "st",
      "bl",
      "tr",
      "fl",
      "cr",
      "gr",
      "sp"
    ]
  },
  "cvcc": {
    "title": "Final Blends",
    "desc": "Two consonants at the end; you hear both sounds.",
    "examples": "milk, hand, nest",
    "quick": [
      "mp",
      "nd",
      "st",
      "nk",
      "ft",
      "sk",
      "ld"
    ]
  },
  "trigraph": {
    "title": "Trigraphs",
    "desc": "Three letters, one sound (tch, dge, igh).",
    "examples": "catch, badge, light",
    "quick": [
      "tch",
      "dge",
      "igh"
    ]
  },
  "cvce": {
    "title": "Magic E (CVCe)",
    "desc": "Silent E makes the vowel say its name.",
    "examples": "cake, hope, time",
    "quick": [
      "a_e",
      "i_e",
      "o_e",
      "u_e",
      "e_e"
    ]
  },
  "vowel_team": {
    "title": "Vowel Teams",
    "desc": "Two vowels team up to make one vowel sound.",
    "examples": "rain, boat, see",
    "quick": [
      "ai",
      "ay",
      "ee",
      "ea",
      "oa",
      "ow"
    ]
  },
  "r_controlled": {
    "title": "R-Controlled",
    "desc": "Vowel + R changes the vowel sound.",
    "examples": "car, bird, fern",
    "quick": [
      "ar",
      "or",
      "er",
      "ir",
      "ur"
    ]
  },
  "diphthong": {
    "title": "Diphthongs",
    "desc": "Vowel sounds that glide (oi/oy, ou/ow).",
    "examples": "coin, boy, loud, cow",
    "quick": [
      "oi",
      "oy",
      "ou",
      "ow"
    ]
  },
  "floss": {
    "title": "FLOSS Rule",
    "desc": "Short vowel words often double f/l/s at the end.",
    "examples": "stuff, hill, pass",
    "quick": [
      "ff",
      "ll",
      "ss"
    ]
  },
  "welded": {
    "title": "Welded Sounds",
    "desc": "Sounds stuck together: -ang, -ing, -ong, -ank, -unk, -ing.",
    "examples": "king, bank, song",
    "quick": [
      "ang",
      "ing",
      "ong",
      "ank",
      "unk"
    ]
  },
  "schwa": {
    "title": "Schwa",
    "desc": "The lazy vowel sound in unstressed syllables.",
    "examples": "about, circus",
    "quick": [
      "a",
      "e",
      "i",
      "o",
      "u"
    ]
  },
  "prefix": {
    "title": "Prefixes",
    "desc": "Word parts added to the beginning (un-, re-, pre-).",
    "examples": "unhappy, reread, preview",
    "quick": [
      "un",
      "re",
      "pre",
      "dis",
      "mis"
    ]
  },
  "suffix": {
    "title": "Suffixes",
    "desc": "Word parts added to the end (-ing, -ed, -er, -est).",
    "examples": "jumping, played, faster",
    "quick": [
      "ing",
      "ed",
      "er",
      "est",
      "ly"
    ]
  },
  "compound": {
    "title": "Compound Words",
    "desc": "Two words that join to make one word.",
    "examples": "sunset, playground",
    "quick": [
      "sun",
      "day",
      "rain",
      "bow"
    ]
  },
  "multisyllable": {
    "title": "Multisyllabic Words",
    "desc": "Words with 2+ syllables. Tap and chunk.",
    "examples": "picnic, rabbit, computer",
    "quick": [
      "pre",
      "re",
      "un",
      "tion",
      "ing"
    ]
  },
  "vocab-math-k2": {
    "title": "Math Vocabulary (K-2)",
    "desc": "Early math words for counting, shapes, and simple operations.",
    "examples": "count, add, shape, equal",
    "quick": ["count", "add", "shape", "equal"]
  },
  "vocab-math-35": {
    "title": "Math Vocabulary (3-5)",
    "desc": "Intermediate math language for fraction and operation fluency.",
    "examples": "fraction, decimal, equation, perimeter",
    "quick": ["fraction", "decimal", "equation", "area"]
  },
  "vocab-math-68": {
    "title": "Math Vocabulary (6-8)",
    "desc": "Middle-grade math terms for algebra and geometry.",
    "examples": "integer, ratio, variable, theorem",
    "quick": ["integer", "ratio", "variable", "theorem"]
  },
  "vocab-math-912": {
    "title": "Math Vocabulary (9-12)",
    "desc": "High-school math language for advanced reasoning.",
    "examples": "quadratic, polynomial, derivative, matrix",
    "quick": ["quadratic", "polynomial", "derivative", "matrix"]
  },
  "vocab-science-k2": {
    "title": "Science Vocabulary (K-2)",
    "desc": "Foundational science words for classroom investigations.",
    "examples": "plant, water, weather, light",
    "quick": ["plant", "water", "weather", "light"]
  },
  "vocab-science-35": {
    "title": "Science Vocabulary (3-5)",
    "desc": "Science words for ecosystems, matter, and physical systems.",
    "examples": "habitat, gravity, magnet, matter",
    "quick": ["habitat", "gravity", "magnet", "matter"]
  },
  "vocab-science-68": {
    "title": "Science Vocabulary (6-8)",
    "desc": "Middle-grade science terms for life, earth, and physical science.",
    "examples": "photosynthesis, molecule, climate, density",
    "quick": ["photosynthesis", "molecule", "climate", "density"]
  },
  "vocab-science-912": {
    "title": "Science Vocabulary (9-12)",
    "desc": "Advanced science vocabulary for secondary courses.",
    "examples": "equilibrium, isotope, entropy, catalyst",
    "quick": ["equilibrium", "isotope", "entropy", "catalyst"]
  },
  "vocab-social-k2": {
    "title": "Social Studies Vocabulary (K-2)",
    "desc": "Early civic and community words for young learners.",
    "examples": "map, family, rules, community",
    "quick": ["map", "family", "rules", "community"]
  },
  "vocab-social-35": {
    "title": "Social Studies Vocabulary (3-5)",
    "desc": "Social studies words for people, places, and systems.",
    "examples": "culture, region, citizen, government",
    "quick": ["culture", "region", "citizen", "government"]
  },
  "vocab-social-68": {
    "title": "Social Studies Vocabulary (6-8)",
    "desc": "Middle-grade civics and history vocabulary.",
    "examples": "constitution, democracy, treaty, republic",
    "quick": ["constitution", "democracy", "treaty", "republic"]
  },
  "vocab-social-912": {
    "title": "Social Studies Vocabulary (9-12)",
    "desc": "High-school social studies and economics language.",
    "examples": "sovereignty, ideology, diplomacy, legislation",
    "quick": ["sovereignty", "ideology", "diplomacy", "legislation"]
  },
  "vocab-ela-k2": {
    "title": "ELA Vocabulary (K-2)",
    "desc": "Core literacy words for beginning readers and writers.",
    "examples": "letter, story, sentence, author",
    "quick": ["letter", "story", "sentence", "author"]
  },
  "vocab-ela-35": {
    "title": "ELA Vocabulary (3-5)",
    "desc": "Academic reading and writing terms for upper elementary.",
    "examples": "paragraph, context, compare, theme",
    "quick": ["paragraph", "context", "compare", "theme"]
  },
  "vocab-ela-68": {
    "title": "ELA Vocabulary (6-8)",
    "desc": "Middle-grade language arts vocabulary for analysis.",
    "examples": "analyze, argument, metaphor, syntax",
    "quick": ["analyze", "argument", "metaphor", "syntax"]
  },
  "vocab-ela-912": {
    "title": "ELA Vocabulary (9-12)",
    "desc": "Advanced ELA terms for rhetoric and close reading.",
    "examples": "rhetoric, thesis, allusion, symbolism",
    "quick": ["rhetoric", "thesis", "allusion", "symbolism"]
  }
};
  console.log('✓ Focus info loaded with ' + Object.keys(window.FOCUS_INFO).length + ' groups');
})();
