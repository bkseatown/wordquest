/* ==========================================================================
   DECODE THE WORD: PHONEME & MOUTH POSITION DATA
   20 Core Phonemes with Articulation Cues & Visual Descriptions
   ========================================================================== */

(function() {
    'use strict';

    // Phoneme database with mouth position data
    window.PHONEME_DATA = {
        
        // SHORT VOWELS (5)
        'a': {
            name: 'Short A',
            sound: '/a/',
            example: 'apple',
            grapheme: 'A',
            cue: 'Open mouth wide, jaw drops',
            mouthShape: 'wide-open',
            color: '#7c83f0',
            description: 'Short a as in apple',
            tongue: 'low, front',
            lips: 'unrounded, open',
            animation: 'mouth-short-a'
        },
        
        'e': {
            name: 'Short E',
            sound: '/e/',
            example: 'egg',
            grapheme: 'E',
            cue: 'Mouth relaxed, slight smile',
            mouthShape: 'slight-smile',
            color: '#7c83f0',
            description: 'Short e as in egg',
            tongue: 'mid-high, front',
            lips: 'slightly spread',
            animation: 'mouth-short-e'
        },
        
        'i': {
            name: 'Short I',
            sound: '/i/',
            example: 'igloo',
            grapheme: 'I',
            cue: 'Lips relaxed, tongue high',
            mouthShape: 'relaxed',
            color: '#7c83f0',
            description: 'Short i as in igloo',
            tongue: 'high, front',
            lips: 'neutral',
            animation: 'mouth-short-i'
        },
        
        'o': {
            name: 'Short O',
            sound: '/o/',
            example: 'octopus',
            grapheme: 'O',
            cue: 'Mouth open, lips slightly round',
            mouthShape: 'rounded-open',
            color: '#7c83f0',
            description: 'Short o as in octopus',
            tongue: 'low, back',
            lips: 'slightly rounded',
            animation: 'mouth-short-o'
        },
        
        'u': {
            name: 'Short U',
            sound: '/u/',
            example: 'umbrella',
            grapheme: 'U',
            cue: 'Relaxed mouth, jaw slightly open',
            mouthShape: 'neutral-open',
            color: '#7c83f0',
            description: 'Short u as in umbrella',
            tongue: 'mid, center',
            lips: 'neutral',
            animation: 'mouth-short-u'
        },

        // LONG VOWELS / VOWEL TEAMS
        'ay': {
            name: 'Long A',
            sound: '/ai/',
            example: 'rain',
            grapheme: 'AI',
            cue: 'Smile slightly, jaw relaxed',
            mouthShape: 'slight-smile',
            color: '#a78bfa',
            description: 'Long a as in rain (also make, day)',
            tongue: 'mid-high, front',
            lips: 'slightly spread',
            animation: 'mouth-short-e'
        },

        'ah': {
            name: 'Broad A',
            sound: '/ah/',
            example: 'father',
            grapheme: 'A',
            cue: 'Mouth open wide',
            mouthShape: 'wide-open',
            color: '#a78bfa',
            description: 'Broad a as in father',
            tongue: 'low, back',
            lips: 'open',
            animation: 'mouth-short-a'
        },

        'ee': {
            name: 'Long E',
            sound: '/ee/',
            example: 'tree',
            grapheme: 'EE',
            cue: 'Wide smile, tongue high',
            mouthShape: 'slight-smile',
            color: '#a78bfa',
            description: 'Long e as in tree (also me, sea)',
            tongue: 'high, front',
            lips: 'spread',
            animation: 'mouth-short-e'
        },

        'igh': {
            name: 'Long I',
            sound: '/ie/',
            example: 'night',
            grapheme: 'IE',
            cue: 'Mouth starts relaxed, then opens',
            mouthShape: 'relaxed',
            color: '#a78bfa',
            description: 'Long i as in night (also my, kite)',
            tongue: 'moves from low to high',
            lips: 'relaxed to slight smile',
            animation: 'mouth-short-i'
        },

        'oa': {
            name: 'Long O',
            sound: '/oa/',
            example: 'boat',
            grapheme: 'OA',
            cue: 'Round lips, glide to closed',
            mouthShape: 'rounded-open',
            color: '#a78bfa',
            description: 'Long o as in boat (also note, go)',
            tongue: 'mid-back',
            lips: 'rounded',
            animation: 'mouth-short-o'
        },

        'oo': {
            name: 'Long U',
            sound: '/oo/',
            example: 'boot',
            grapheme: 'OO',
            cue: 'Lips rounded, tongue high back',
            mouthShape: 'rounded-open',
            color: '#a78bfa',
            description: 'Long oo as in boot (also you, rule)',
            tongue: 'high, back',
            lips: 'rounded',
            animation: 'mouth-short-u'
        },

        // R-CONTROLLED VOWELS
        'ar': {
            name: 'R-Controlled AR',
            sound: '/ar/',
            example: 'farm',
            grapheme: 'AR',
            cue: 'Mouth open, tongue pulled back',
            mouthShape: 'tongue-back',
            color: '#fbbf24',
            description: 'AR as in farm (also car)',
            tongue: 'back, lowered',
            lips: 'slightly rounded',
            animation: 'mouth-r'
        },

        'er': {
            name: 'R-Controlled ER',
            sound: '/er/',
            example: 'letter',
            grapheme: 'ER',
            cue: 'Relaxed mouth, very short sound',
            mouthShape: 'tongue-back',
            color: '#fbbf24',
            description: 'Schwa /er/ as in letter (common)',
            tongue: 'relaxed, central',
            lips: 'neutral',
            animation: 'mouth-short-u'
        },

        'ir': {
            name: 'R-Controlled IR',
            sound: '/ur/',
            example: 'bird',
            grapheme: 'IR',
            cue: 'Tongue pulled back, lips relaxed',
            mouthShape: 'tongue-back',
            color: '#fbbf24',
            description: 'IR as in bird (same /ur/ sound)',
            tongue: 'bunched back',
            lips: 'relaxed',
            animation: 'mouth-r'
        },

        'or': {
            name: 'R-Controlled OR',
            sound: '/or/',
            example: 'fork',
            grapheme: 'OR',
            cue: 'Round lips, tongue back',
            mouthShape: 'rounded-open',
            color: '#fbbf24',
            description: 'OR as in fork (also door, war)',
            tongue: 'back',
            lips: 'rounded',
            animation: 'mouth-r'
        },

        'ur': {
            name: 'R-Controlled UR',
            sound: '/ur/',
            example: 'burn',
            grapheme: 'UR',
            cue: 'Tongue pulled back, lips relaxed',
            mouthShape: 'tongue-back',
            color: '#fbbf24',
            description: 'UR as in burn (also first, nurse)',
            tongue: 'bunched back',
            lips: 'relaxed',
            animation: 'mouth-r'
        },

        // DIPHTHONGS
        'ow': {
            name: 'Diphthong OW',
            sound: '/ow/',
            example: 'cow',
            grapheme: 'OW',
            cue: 'Mouth opens then rounds',
            mouthShape: 'rounded-open',
            color: '#fb923c',
            description: 'OW as in cow (also house)',
            tongue: 'moves low to high',
            lips: 'rounding',
            animation: 'mouth-short-o'
        },

        'ou': {
            name: 'Diphthong OU',
            sound: '/ow/',
            example: 'out',
            grapheme: 'OU',
            cue: 'Mouth opens then rounds',
            mouthShape: 'rounded-open',
            color: '#fb923c',
            description: 'OU as in out (same /ow/ sound)',
            tongue: 'moves low to high',
            lips: 'rounding',
            animation: 'mouth-short-o'
        },

        'oi': {
            name: 'Diphthong OI',
            sound: '/oi/',
            example: 'coin',
            grapheme: 'OI',
            cue: 'Round then relax into a smile',
            mouthShape: 'rounded-open',
            color: '#fb923c',
            description: 'OI as in coin (also boy)',
            tongue: 'moves back to front',
            lips: 'round then relax',
            animation: 'mouth-short-o'
        },

        'oy': {
            name: 'Diphthong OY',
            sound: '/oi/',
            example: 'boy',
            grapheme: 'OY',
            cue: 'Round then relax into a smile',
            mouthShape: 'rounded-open',
            color: '#fb923c',
            description: 'OY as in boy (same /oi/ sound)',
            tongue: 'moves back to front',
            lips: 'round then relax',
            animation: 'mouth-short-o'
        },

        'aw': {
            name: 'Diphthong AW',
            sound: '/aw/',
            example: 'saw',
            grapheme: 'AW',
            cue: 'Open mouth, lips rounded',
            mouthShape: 'rounded-open',
            color: '#fb923c',
            description: 'AW as in saw',
            tongue: 'low, back',
            lips: 'rounded',
            animation: 'mouth-short-o'
        },

        'oo-short': {
            name: 'Short OO',
            sound: '/oo/',
            example: 'book',
            grapheme: 'OO',
            cue: 'Lips rounded, quick sound',
            mouthShape: 'rounded-open',
            color: '#fb923c',
            description: 'Short oo as in book (also put)',
            tongue: 'high, back',
            lips: 'rounded',
            animation: 'mouth-short-u'
        },

        'air': {
            name: 'AIR Sound',
            sound: '/air/',
            example: 'chair',
            grapheme: 'AIR',
            cue: 'Start with /a/, then pull tongue back for r',
            mouthShape: 'tongue-back',
            color: '#fbbf24',
            description: 'AIR as in chair (also hair)',
            tongue: 'moves front to back',
            lips: 'slightly rounded',
            animation: 'mouth-r'
        },

        'ear': {
            name: 'EAR Sound',
            sound: '/ear/',
            example: 'near',
            grapheme: 'EAR',
            cue: 'Start with /e/, then pull tongue back for r',
            mouthShape: 'tongue-back',
            color: '#fbbf24',
            description: 'EAR as in near (also here)',
            tongue: 'moves front to back',
            lips: 'slightly rounded',
            animation: 'mouth-r'
        },

        'ure': {
            name: 'URE Sound',
            sound: '/ure/',
            example: 'pure',
            grapheme: 'URE',
            cue: 'Start with /oo/, then pull tongue back for r',
            mouthShape: 'rounded-open',
            color: '#fbbf24',
            description: 'URE as in pure (also cure)',
            tongue: 'moves back with r-coloring',
            lips: 'rounded',
            animation: 'mouth-r'
        },

        // GLUED / WELDED SOUNDS
        'ang': {
            name: 'Welded ANG',
            sound: '/ang/',
            example: 'fang',
            grapheme: 'ANG',
            cue: 'Hold the vowel and hum at the end',
            mouthShape: 'neutral-open',
            color: '#fbbf24',
            description: 'ANG as in fang',
            tongue: 'low to back',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },

        'ing': {
            name: 'Welded ING',
            sound: '/ing/',
            example: 'ring',
            grapheme: 'ING',
            cue: 'Hold the vowel and hum at the end',
            mouthShape: 'neutral-open',
            color: '#fbbf24',
            description: 'ING as in ring',
            tongue: 'high to back',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },

        'ong': {
            name: 'Welded ONG',
            sound: '/ong/',
            example: 'song',
            grapheme: 'ONG',
            cue: 'Hold the vowel and hum at the end',
            mouthShape: 'neutral-open',
            color: '#fbbf24',
            description: 'ONG as in song',
            tongue: 'low to back',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },

        'ung': {
            name: 'Welded UNG',
            sound: '/ung/',
            example: 'lung',
            grapheme: 'UNG',
            cue: 'Hold the vowel and hum at the end',
            mouthShape: 'neutral-open',
            color: '#fbbf24',
            description: 'UNG as in lung',
            tongue: 'mid to back',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },

        'ank': {
            name: 'Welded ANK',
            sound: '/ank/',
            example: 'bank',
            grapheme: 'ANK',
            cue: 'Hold the vowel and close on K',
            mouthShape: 'neutral-open',
            color: '#fbbf24',
            description: 'ANK as in bank',
            tongue: 'low to back',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },

        'ink': {
            name: 'Welded INK',
            sound: '/ink/',
            example: 'pink',
            grapheme: 'INK',
            cue: 'Hold the vowel and close on K',
            mouthShape: 'neutral-open',
            color: '#fbbf24',
            description: 'INK as in pink',
            tongue: 'high to back',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },

        'onk': {
            name: 'Welded ONK',
            sound: '/onk/',
            example: 'honk',
            grapheme: 'ONK',
            cue: 'Hold the vowel and close on K',
            mouthShape: 'neutral-open',
            color: '#fbbf24',
            description: 'ONK as in honk',
            tongue: 'low to back',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },

        'unk': {
            name: 'Welded UNK',
            sound: '/unk/',
            example: 'junk',
            grapheme: 'UNK',
            cue: 'Hold the vowel and close on K',
            mouthShape: 'neutral-open',
            color: '#fbbf24',
            description: 'UNK as in junk',
            tongue: 'mid to back',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },

        // SCHWA
        'schwa': {
            name: 'Schwa /ER/',
            sound: '/er/',
            example: 'letter',
            grapheme: 'ER',
            cue: 'Relaxed mouth, very short sound',
            mouthShape: 'neutral-open',
            color: '#94a3b8',
            description: 'Schwa /er/ as in letter',
            tongue: 'relaxed, central',
            lips: 'neutral',
            animation: 'mouth-short-u'
        },
        
        // STOP SOUNDS (6)
        'b': {
            name: 'B Sound',
            sound: '/b/',
            example: 'bat, bubble',
            cue: 'Press lips together, then pop open',
            mouthShape: 'lips-closed',
            color: '#4fc3f7',
            description: 'Lips explode open',
            tongue: 'low',
            lips: 'pressed together',
            animation: 'mouth-b'
        },
        
        'p': {
            name: 'P Sound',
            sound: '/p/',
            example: 'pen, happy',
            cue: 'Press lips together, strong puff of air',
            mouthShape: 'lips-closed',
            color: '#4fc3f7',
            description: 'Like blowing out a candle',
            tongue: 'low',
            lips: 'pressed together',
            animation: 'mouth-p'
        },
        
        'd': {
            name: 'D Sound',
            sound: '/d/',
            example: 'dog, address',
            cue: 'Tongue touches roof behind teeth',
            mouthShape: 'tongue-up',
            color: '#4fc3f7',
            description: 'Tongue taps the roof',
            tongue: 'touches alveolar ridge',
            lips: 'neutral',
            animation: 'mouth-d'
        },
        
        't': {
            name: 'T Sound',
            sound: '/t/',
            example: 'top, bottle',
            cue: 'Tongue touches roof, quick release',
            mouthShape: 'tongue-up',
            color: '#4fc3f7',
            description: 'Sharp tap with tongue',
            tongue: 'touches alveolar ridge',
            lips: 'neutral',
            animation: 'mouth-t'
        },
        
        'g': {
            name: 'G Sound',
            sound: '/g/',
            example: 'go, egg, ghost',
            cue: 'Back of tongue touches soft palate',
            mouthShape: 'throat',
            color: '#4fc3f7',
            description: 'Sound from back of throat',
            tongue: 'back raised',
            lips: 'neutral',
            animation: 'mouth-g'
        },
        
        'k': {
            name: 'K Sound',
            sound: '/k/',
            example: 'kit, cat, quick',
            cue: 'Back of tongue up, strong release',
            mouthShape: 'throat',
            color: '#4fc3f7',
            description: 'Hard sound from throat',
            tongue: 'back raised',
            lips: 'neutral',
            animation: 'mouth-k'
        },
        
        // CONTINUOUS SOUNDS (6)
        'm': {
            name: 'M Sound',
            sound: '/m/',
            example: 'man, hammer',
            cue: 'Hum with lips closed',
            mouthShape: 'lips-closed',
            color: '#81c784',
            description: 'Mmmmm like yummy',
            tongue: 'low',
            lips: 'pressed together',
            animation: 'mouth-m'
        },
        
        'n': {
            name: 'N Sound',
            sound: '/n/',
            example: 'net, knee, gnat',
            cue: 'Tongue on roof, hum through nose',
            mouthShape: 'tongue-up',
            color: '#81c784',
            description: 'Nnnnn through your nose',
            tongue: 'touches alveolar ridge',
            lips: 'slightly open',
            animation: 'mouth-n'
        },
        
        's': {
            name: 'S Sound',
            sound: '/s/',
            example: 'sun, city, miss',
            cue: 'Teeth together, blow air out',
            mouthShape: 'teeth-together',
            color: '#81c784',
            description: 'Sssss like a snake',
            tongue: 'near alveolar ridge',
            lips: 'slightly spread',
            animation: 'mouth-s'
        },
        
        'f': {
            name: 'F Sound',
            sound: '/f/',
            example: 'fish, phone, laugh',
            cue: 'Bottom lip touches top teeth',
            mouthShape: 'lip-teeth',
            color: '#81c784',
            description: 'Ffff like angry cat',
            tongue: 'low',
            lips: 'bottom lip under top teeth',
            animation: 'mouth-f'
        },
        
        'l': {
            name: 'L Sound',
            sound: '/l/',
            example: 'leg, bell',
            cue: 'Tongue tip touches roof',
            mouthShape: 'tongue-up',
            color: '#81c784',
            description: 'Llll tongue stays up',
            tongue: 'tip touches alveolar ridge',
            lips: 'neutral',
            animation: 'mouth-l'
        },
        
        'r': {
            name: 'R Sound',
            sound: '/r/',
            example: 'red, write',
            cue: 'Tongue bunches up, doesn\'t touch',
            mouthShape: 'tongue-back',
            color: '#81c784',
            description: 'Rrr like a growl',
            tongue: 'bunched, not touching',
            lips: 'slightly rounded',
            animation: 'mouth-r'
        },
        
        // DIGRAPHS (3)
        'sh': {
            name: 'SH Sound',
            sound: '/sh/',
            example: 'ship, tion, sure',
            cue: 'Round lips, blow air softly',
            mouthShape: 'rounded-forward',
            color: '#ffb74d',
            description: 'SH as in ship (also tion, sure)',
            tongue: 'raised toward roof',
            lips: 'rounded, protruded',
            animation: 'mouth-sh'
        },
        
        'ch': {
            name: 'CH Sound',
            sound: '/ch/',
            example: 'chin, match',
            cue: 'Like T + SH together',
            mouthShape: 'rounded-forward',
            color: '#ffb74d',
            description: 'CH as in chin (also match)',
            tongue: 'touches then pulls back',
            lips: 'rounded',
            animation: 'mouth-ch'
        },
        
        'th': {
            name: 'TH (Unvoiced)',
            sound: '/th/',
            example: 'thin',
            cue: 'Tongue between teeth',
            mouthShape: 'tongue-out',
            color: '#ffb74d',
            description: 'TH as in thin (unvoiced)',
            tongue: 'between teeth',
            lips: 'open',
            animation: 'mouth-th'
        },

        // ADDITIONAL CONSONANTS
        'v': {
            name: 'V Sound',
            sound: '/v/',
            example: 'van, have',
            cue: 'Bottom lip touches top teeth, voice on',
            mouthShape: 'lip-teeth',
            color: '#81c784',
            description: 'Vvv like a vibration',
            tongue: 'low',
            lips: 'bottom lip under top teeth',
            animation: 'mouth-f'
        },

        'z': {
            name: 'Z Sound',
            sound: '/z/',
            example: 'zoo, rose, buzz',
            cue: 'Teeth together, voice on',
            mouthShape: 'teeth-together',
            color: '#81c784',
            description: 'Zzz like a zipper',
            tongue: 'near alveolar ridge',
            lips: 'slightly spread',
            animation: 'mouth-s'
        },

        'j': {
            name: 'J Sound',
            sound: '/j/',
            example: 'jam, gem, edge',
            cue: 'Tongue starts like D then releases',
            mouthShape: 'rounded-forward',
            color: '#81c784',
            description: 'J as in jam (also gem, edge)',
            tongue: 'touches then pulls back',
            lips: 'rounded',
            animation: 'mouth-ch'
        },

        'h': {
            name: 'H Sound',
            sound: '/h/',
            example: 'hat, who',
            cue: 'Mouth open, breathe out',
            mouthShape: 'neutral-open',
            color: '#81c784',
            description: 'H as in hat',
            tongue: 'low',
            lips: 'open',
            animation: 'mouth-neutral'
        },

        'w': {
            name: 'W Sound',
            sound: '/w/',
            example: 'wet, white',
            cue: 'Lips round then relax',
            mouthShape: 'rounded-open',
            color: '#81c784',
            description: 'W as in wet',
            tongue: 'high, back',
            lips: 'rounded',
            animation: 'mouth-short-o'
        },

        'y': {
            name: 'Y Sound',
            sound: '/y/',
            example: 'yes',
            cue: 'Tongue high, slight smile',
            mouthShape: 'slight-smile',
            color: '#81c784',
            description: 'Y as in yes',
            tongue: 'high, front',
            lips: 'slightly spread',
            animation: 'mouth-short-e'
        },

        'ng': {
            name: 'NG Sound',
            sound: '/ng/',
            example: 'sing, ink',
            cue: 'Back of tongue up, hum through nose',
            mouthShape: 'throat',
            color: '#81c784',
            description: 'NG as in sing (also ink)',
            tongue: 'back raised',
            lips: 'slightly open',
            animation: 'mouth-g'
        },

        'zh': {
            name: 'ZH Sound',
            sound: '/zh/',
            example: 'pleasure, vision',
            cue: 'Round lips, voice on',
            mouthShape: 'rounded-forward',
            color: '#ffb74d',
            description: 'ZH as in pleasure (also vision)',
            tongue: 'raised toward roof',
            lips: 'rounded',
            animation: 'mouth-sh'
        },

        'th-voiced': {
            name: 'TH (Voiced)',
            sound: '/TH/',
            example: 'this',
            grapheme: 'TH',
            cue: 'Tongue between teeth, voice on',
            mouthShape: 'tongue-out',
            color: '#ffb74d',
            description: 'TH as in this (voiced)',
            tongue: 'between teeth',
            lips: 'open',
            animation: 'mouth-th'
        },

        'wh': {
            name: 'WH Sound',
            sound: '/w/',
            example: 'whale',
            cue: 'Round lips, blow air',
            mouthShape: 'rounded-open',
            color: '#ffb74d',
            description: 'WH as in whale',
            tongue: 'high, back',
            lips: 'rounded',
            animation: 'mouth-short-o'
        },

        'ph': {
            name: 'PH Sound',
            sound: '/f/',
            example: 'phone',
            cue: 'Bottom lip touches top teeth',
            mouthShape: 'lip-teeth',
            color: '#ffb74d',
            description: 'PH as in phone',
            tongue: 'low',
            lips: 'bottom lip under top teeth',
            animation: 'mouth-f'
        },

        // BLENDS
        'bl': {
            name: 'Blend BL',
            sound: '/bl/',
            example: 'blue',
            cue: 'Blend B + L smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'BL as in blue',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'cl': {
            name: 'Blend CL',
            sound: '/cl/',
            example: 'clap',
            cue: 'Blend C + L smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'CL as in clap',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'fl': {
            name: 'Blend FL',
            sound: '/fl/',
            example: 'flag',
            cue: 'Blend F + L smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'FL as in flag',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'gl': {
            name: 'Blend GL',
            sound: '/gl/',
            example: 'glad',
            cue: 'Blend G + L smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'GL as in glad',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'pl': {
            name: 'Blend PL',
            sound: '/pl/',
            example: 'play',
            cue: 'Blend P + L smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'PL as in play',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'sl': {
            name: 'Blend SL',
            sound: '/sl/',
            example: 'slip',
            cue: 'Blend S + L smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'SL as in slip',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'br': {
            name: 'Blend BR',
            sound: '/br/',
            example: 'brag',
            cue: 'Blend B + R smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'BR as in brag',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'cr': {
            name: 'Blend CR',
            sound: '/cr/',
            example: 'crab',
            cue: 'Blend C + R smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'CR as in crab',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'dr': {
            name: 'Blend DR',
            sound: '/dr/',
            example: 'drum',
            cue: 'Blend D + R smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'DR as in drum',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'fr': {
            name: 'Blend FR',
            sound: '/fr/',
            example: 'frog',
            cue: 'Blend F + R smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'FR as in frog',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'gr': {
            name: 'Blend GR',
            sound: '/gr/',
            example: 'grin',
            cue: 'Blend G + R smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'GR as in grin',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'pr': {
            name: 'Blend PR',
            sound: '/pr/',
            example: 'prize',
            cue: 'Blend P + R smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'PR as in prize',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'tr': {
            name: 'Blend TR',
            sound: '/tr/',
            example: 'tree',
            cue: 'Blend T + R smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'TR as in tree',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'sk': {
            name: 'Blend SK',
            sound: '/sk/',
            example: 'skate',
            cue: 'Blend S + K smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'SK as in skate',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'sm': {
            name: 'Blend SM',
            sound: '/sm/',
            example: 'smile',
            cue: 'Blend S + M smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'SM as in smile',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'sn': {
            name: 'Blend SN',
            sound: '/sn/',
            example: 'snack',
            cue: 'Blend S + N smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'SN as in snack',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'sp': {
            name: 'Blend SP',
            sound: '/sp/',
            example: 'spoon',
            cue: 'Blend S + P smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'SP as in spoon',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'st': {
            name: 'Blend ST',
            sound: '/st/',
            example: 'star',
            cue: 'Blend S + T smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'ST as in star',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        },
        'sw': {
            name: 'Blend SW',
            sound: '/sw/',
            example: 'swing',
            cue: 'Blend S + W smoothly',
            mouthShape: 'neutral-open',
            color: '#c084fc',
            description: 'SW as in swing',
            tongue: 'moves quickly',
            lips: 'neutral',
            animation: 'mouth-neutral'
        }
    };

    // Helper function to get phoneme data
    window.getPhonemeData = function(phoneme) {
        const key = phoneme.toLowerCase();
        return window.PHONEME_DATA[key] || null;
    };

    // Helper to detect phoneme from word
    window.detectPhonemeInWord = function(word) {
        if (!word) return null;
        
        word = word.toLowerCase();
        
        // Check digraphs first
        if (word.includes('sh')) return window.PHONEME_DATA['sh'];
        if (word.includes('ch')) return window.PHONEME_DATA['ch'];
        if (word.includes('th')) return window.PHONEME_DATA['th'];
        
        // Check first vowel
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        for (let char of word) {
            if (vowels.includes(char)) {
                return window.PHONEME_DATA[char];
            }
        }
        
        // Fallback to first consonant
        const firstChar = word[0];
        return window.PHONEME_DATA[firstChar] || null;
    };

    // Letters with multiple sounds - Advanced Articulation System
    window.LETTER_SOUNDS = {
        'a': [
            { sound: '/a/', name: 'Short A', example: 'apple', phoneme: 'a' },
            { sound: '/ai/', name: 'Long A', example: 'rain', phoneme: 'ay' },
            { sound: '/ah/', name: 'Broad A', example: 'father', phoneme: 'ah' }
        ],
        'c': [
            { sound: '/k/', name: 'Hard C', example: 'cat', phoneme: 'k' },
            { sound: '/s/', name: 'Soft C', example: 'city', phoneme: 's' }
        ],
        'g': [
            { sound: '/g/', name: 'Hard G', example: 'go', phoneme: 'g' },
            { sound: '/j/', name: 'Soft G', example: 'gem', phoneme: 'j' }
        ],
        'e': [
            { sound: '/e/', name: 'Short E', example: 'egg', phoneme: 'e' },
            { sound: '/ee/', name: 'Long E', example: 'tree', phoneme: 'ee' }
        ],
        'i': [
            { sound: '/i/', name: 'Short I', example: 'igloo', phoneme: 'i' },
            { sound: '/ie/', name: 'Long I', example: 'night', phoneme: 'igh' }
        ],
        'o': [
            { sound: '/o/', name: 'Short O', example: 'octopus', phoneme: 'o' },
            { sound: '/oa/', name: 'Long O', example: 'boat', phoneme: 'oa' }
        ],
        'u': [
            { sound: '/u/', name: 'Short U', example: 'umbrella', phoneme: 'u' },
            { sound: '/oo/', name: 'Long U', example: 'boot', phoneme: 'oo' }
        ],
        's': [
            { sound: '/s/', name: 'Voiceless S', example: 'sun', phoneme: 's' },
            { sound: '/z/', name: 'Voiced S', example: 'has', phoneme: 'z' }
        ],
        'y': [
            { sound: '/y/', name: 'Y Consonant', example: 'yes', phoneme: 'y' },
            { sound: '/i/', name: 'Y as I', example: 'gym', phoneme: 'i' },
            { sound: '/ie/', name: 'Y as Long I', example: 'fly', phoneme: 'igh' }
        ]
    };
    
    // Categorize phonemes for organization
    window.PHONEME_CATEGORIES = {
        vowels: [
            'a', 'e', 'i', 'o', 'u',
            'ay', 'ee', 'igh', 'oa', 'oo',
            'oo-short', 'ar', 'or', 'ur',
            'ow', 'oi',
            'air', 'ear', 'ure',
            'schwa'
        ],
        consonants: [
            'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n',
            'p', 'r', 's', 't', 'v', 'w', 'y', 'z',
            'ch', 'sh', 'th', 'th-voiced', 'ng', 'zh'
        ]
    };

    window.PHONEME_GROUPS = {
        vowels: {
            short: ['a', 'e', 'i', 'o', 'u'],
            long: ['ay', 'ee', 'igh', 'oa', 'oo'],
            rControlled: ['ar', 'or', 'ur', 'air', 'ear', 'ure'],
            diphthongs: ['ow', 'oi', 'oo-short'],
            welded: [],
            schwa: ['schwa']
        },
        consonants: {
            single: ['b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y', 'z'],
            digraphs: ['ch', 'sh', 'th', 'th-voiced', 'ng', 'zh'],
            blends: []
        }
    };

    // UFLI-style sound wall placement
    window.UFLI_VOWEL_VALLEY = [
        { sound: 'a', offset: 24 },
        { sound: 'e', offset: 12 },
        { sound: 'i', offset: 0 },
        { sound: 'o', offset: 12 },
        { sound: 'u', offset: 24 }
    ];

    window.UFLI_CONSONANT_GRID = {
        // Stop
        b: { manner: 'stop', place: 'lips' },
        p: { manner: 'stop', place: 'lips' },
        d: { manner: 'stop', place: 'behind' },
        t: { manner: 'stop', place: 'behind' },
        g: { manner: 'stop', place: 'pulled' },
        k: { manner: 'stop', place: 'pulled' },

        // Nasal
        m: { manner: 'nasal', place: 'lips' },
        n: { manner: 'nasal', place: 'behind' },
        ng: { manner: 'nasal', place: 'pulled' },

        // Fricative
        f: { manner: 'fricative', place: 'teeth' },
        v: { manner: 'fricative', place: 'teeth' },
        th: { manner: 'fricative', place: 'between' },
        'th-voiced': { manner: 'fricative', place: 'between' },
        s: { manner: 'fricative', place: 'behind' },
        z: { manner: 'fricative', place: 'behind' },
        sh: { manner: 'fricative', place: 'lifted' },
        zh: { manner: 'fricative', place: 'lifted' },
        h: { manner: 'fricative', place: 'throat' },
        ph: { manner: 'fricative', place: 'teeth' },

        // Affricate
        ch: { manner: 'affricate', place: 'lifted' },
        j: { manner: 'affricate', place: 'lifted' },

        // Glide
        w: { manner: 'glide', place: 'pulled' },
        y: { manner: 'glide', place: 'lifted' },
        wh: { manner: 'glide', place: 'lips' },

        // Liquid
        l: { manner: 'liquid', place: 'behind' },
        r: { manner: 'liquid', place: 'behind' }
    };
    
    // Mouth position visual mapping
    window.MOUTH_VISUALS = {
        'wide-open': '😮',
        'slight-smile': '😊',
        'relaxed': '😐',
        'round': '😮',
        'lips-together': '😗',
        'tongue-up': '😛',
        'throat': '😮',
        'teeth-together': '😬'
    };

    console.log('✓ Phoneme data loaded with', Object.keys(window.PHONEME_DATA).length, 'phonemes');
    console.log('✓ Letter sound mappings loaded for', Object.keys(window.LETTER_SOUNDS).length, 'letters');
})();
