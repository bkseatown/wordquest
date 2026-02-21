/**
 * app.js — Word Quest v2
 * Entry point. Wires all modules together.
 * Features: theme, projector mode, reduced motion, voice picker,
 * dismissible duplicate-letter toast, confetti, "Hear Word/Sentence"
 * during gameplay.
 */

(async () => {

  // ─── 1. Load data ──────────────────────────────────
  const loadingEl = document.getElementById('loading-screen');
  loadingEl?.classList.remove('hidden');
  await WQData.load();
  loadingEl?.classList.add('hidden');

  // ─── 2. Init UI ────────────────────────────────────
  WQUI.init();

  // ─── 3. Preferences ────────────────────────────────
  const PREF_KEY = 'wq_v2_prefs';
  function loadPrefs() {
    try { return JSON.parse(localStorage.getItem(PREF_KEY) || '{}'); } catch { return {}; }
  }
  function savePrefs(p) {
    try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch {}
  }
  const prefs = loadPrefs();
  function setPref(k, v) { prefs[k] = v; savePrefs(prefs); }

  const _el = id => document.getElementById(id);

  // Apply saved values to selects
  const PREF_SELECTS = {
    's-theme': 'theme', 's-grade': 'grade', 's-length': 'length',
    's-guesses': 'guesses', 's-case': 'caseMode', 's-hint': 'hint',
    's-dupe': 'dupe', 's-confetti': 'confetti',
    's-projector': 'projector', 's-motion': 'motion'
  };
  Object.entries(PREF_SELECTS).forEach(([id, key]) => {
    const el = _el(id);
    if (el && prefs[key] !== undefined) el.value = prefs[key];
  });

  // Apply theme + modes immediately
  applyTheme(prefs.theme || 'default');
  applyProjector(prefs.projector || 'off');
  applyMotion(prefs.motion || 'on');
  WQUI.setCaseMode(prefs.caseMode || 'lower');

  // Voice picker populated after brief delay
  setTimeout(populateVoiceSelector, 700);
  window.speechSynthesis.onvoiceschanged = populateVoiceSelector;

  // ─── 4. Theme / projector / motion helpers ──────────
  function applyTheme(name) {
    document.documentElement.setAttribute('data-theme', name);
  }

  function applyProjector(mode) {
    document.documentElement.setAttribute('data-projector', mode);
  }

  function applyMotion(mode) {
    document.documentElement.setAttribute('data-motion', mode);
  }

  function populateVoiceSelector() {
    const sel = _el('s-voice');
    if (!sel) return;
    const voices  = WQAudio.getAvailableVoices();
    const current = prefs.voice || 'auto';
    sel.innerHTML = '<option value="auto">Auto (best available)</option>';
    voices.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.name;
      opt.textContent = v.name;
      if (v.name === current) opt.selected = true;
      sel.appendChild(opt);
    });
    if (current !== 'auto') WQAudio.setVoiceByName(current);
  }

  // ─── 5. Settings panel wiring ───────────────────────
  _el('settings-btn')?.addEventListener('click', () => {
    _el('settings-panel')?.classList.toggle('hidden');
  });
  _el('settings-close')?.addEventListener('click', () => {
    _el('settings-panel')?.classList.add('hidden');
  });

  // Close settings when clicking outside
  document.addEventListener('pointerdown', e => {
    const panel = _el('settings-panel');
    if (!panel?.classList.contains('hidden') &&
        !panel.contains(e.target) &&
        e.target !== _el('settings-btn') &&
        !_el('settings-btn')?.contains(e.target)) {
      panel.classList.add('hidden');
    }
  });

  _el('s-theme')?.addEventListener('change', e => {
    applyTheme(e.target.value);
    setPref('theme', e.target.value);
  });
  _el('s-projector')?.addEventListener('change', e => {
    applyProjector(e.target.value);
    setPref('projector', e.target.value);
  });
  _el('s-motion')?.addEventListener('change', e => {
    applyMotion(e.target.value);
    setPref('motion', e.target.value);
  });
  _el('s-case')?.addEventListener('change', e => {
    WQUI.setCaseMode(e.target.value);
    setPref('caseMode', e.target.value);
  });
  _el('s-grade')?.addEventListener('change',   e => setPref('grade',    e.target.value));
  _el('s-length')?.addEventListener('change',  e => setPref('length',   e.target.value));
  _el('s-guesses')?.addEventListener('change', e => setPref('guesses',  e.target.value));
  _el('s-hint')?.addEventListener('change',    e => { setPref('hint',   e.target.value); updateFocusHint(); });
  _el('s-dupe')?.addEventListener('change',    e => setPref('dupe',     e.target.value));
  _el('s-confetti')?.addEventListener('change',e => setPref('confetti', e.target.value));
  _el('s-voice')?.addEventListener('change',   e => {
    WQAudio.setVoiceByName(e.target.value);
    setPref('voice', e.target.value);
  });

  // ─── 6. Focus hint ──────────────────────────────────
  const FOCUS_HINTS = {
    cvc:'CVC · short vowel', digraph:'sh, ch, th, wh',
    ccvc:'st, bl, tr, fl…', cvcc:'mp, nd, st, nk…',
    trigraph:'tch, dge, igh', cvce:'Magic E',
    vowel_team:'ai, ee, oa…', r_controlled:'ar, or, er…',
    diphthong:'oi, oy, ou…', floss:'ff, ll, ss',
    welded:'-ang, -ing, -ong', schwa:'unstressed vowel',
    prefix:'un-, re-, pre-…', suffix:'-ing, -ed, -er…',
    compound:'two words joined', multisyllable:'2+ syllables',
  };

  function updateFocusHint() {
    const hintEl   = _el('focus-hint');
    const focusVal = _el('setting-focus')?.value;
    const showHint = _el('s-hint')?.value === 'on';
    if (!hintEl) return;
    if (showHint && FOCUS_HINTS[focusVal]) {
      hintEl.textContent = FOCUS_HINTS[focusVal];
      hintEl.classList.remove('hidden');
    } else {
      hintEl.classList.add('hidden');
    }
  }

  _el('setting-focus')?.addEventListener('change', updateFocusHint);

  // ─── 7. New game ────────────────────────────────────
  function newGame() {
    const s = WQUI.getSettings();
    const result = WQGame.startGame(s);
    if (!result) {
      WQUI.showToast('No words found — try "All Words" or change the focus');
      return;
    }
    WQUI.calcLayout(result.wordLength, result.maxGuesses);
    WQUI.buildBoard(result.wordLength, result.maxGuesses);
    WQUI.buildKeyboard();
    WQUI.hideModal();
    _el('new-game-btn')?.classList.remove('pulse');
    _el('settings-panel')?.classList.add('hidden');
    updateFocusHint();
    removeDupeToast();
  }

  window.addEventListener('resize', () => {
    const s = WQGame.getState();
    if (s?.word) WQUI.calcLayout(s.wordLength, s.maxGuesses);
  });

  // ─── 8. Input handling ──────────────────────────────
  function handleKey(key) {
    const s = WQGame.getState();
    if (s.gameOver) return;

    if (key === 'Enter') {
      const result = WQGame.submitGuess();
      if (!result) return;
      if (result.error === 'too_short') {
        WQUI.showToast('Fill in all the letters first');
        WQUI.shakeRow(s.guesses, s.wordLength);
        return;
      }

      const row = result.guesses.length - 1;
      WQUI.revealRow(result.guess, result.result, row, s.wordLength, () => {
        WQUI.updateKeyboard(result.result, result.guess);
        checkDuplicates(result);
        if (result.won || result.lost) {
          setTimeout(() => {
            WQUI.showModal(result);
            _el('new-game-btn')?.classList.add('pulse');
            const settings = WQUI.getSettings();
            if (result.won && settings.confetti) launchConfetti();
          }, 520);
        }
      });

    } else if (key === 'Backspace' || key === '⌫') {
      WQGame.deleteLetter();
      const s2 = WQGame.getState();
      WQUI.updateCurrentRow(s2.guess, s2.wordLength, s2.guesses.length);

    } else if (/^[a-zA-Z]$/.test(key)) {
      WQGame.addLetter(key);
      const s2 = WQGame.getState();
      WQUI.updateCurrentRow(s2.guess, s2.wordLength, s2.guesses.length);
    }
  }

  // Physical keyboard
  document.addEventListener('keydown', e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    handleKey(e.key === 'Backspace' ? 'Backspace' : e.key);
    if (/^[a-zA-Z]$/.test(e.key)) {
      const btn = document.querySelector(`.key[data-key="${e.key.toLowerCase()}"]`);
      if (btn) { btn.classList.add('bounce'); setTimeout(() => btn.classList.remove('bounce'), 160); }
    }
  });

  // On-screen keyboard
  _el('keyboard')?.addEventListener('click', e => {
    const btn = e.target.closest('.key');
    if (btn) handleKey(btn.dataset.key);
  });

  // Buttons
  _el('new-game-btn')?.addEventListener('click',  newGame);
  _el('play-again-btn')?.addEventListener('click', newGame);

  // ─── 9. Gameplay audio buttons ──────────────────────
  const entry = () => WQGame.getState()?.entry;
  _el('g-hear-word')?.addEventListener('click',     () => WQAudio.playWord(entry()));
  _el('g-hear-sentence')?.addEventListener('click', () => WQAudio.playSentence(entry()));

  // Modal audio buttons
  _el('hear-word-btn')?.addEventListener('click',     () => WQAudio.playWord(entry()));
  _el('hear-def-btn')?.addEventListener('click',      () => WQAudio.playDef(entry()));
  _el('hear-sentence-btn')?.addEventListener('click', () => WQAudio.playSentence(entry()));
  _el('hear-fun-btn')?.addEventListener('click',      () => WQAudio.playFun(entry()));

  // ─── 10. Duplicate-letter dismissible toast ──────────
  const DUPE_PREF_KEY = 'wq_v2_dupe_dismissed';
  let _dupeToastEl = null;

  function removeDupeToast() {
    if (_dupeToastEl) { _dupeToastEl.remove(); _dupeToastEl = null; }
  }

  function checkDuplicates(result) {
    // Check if user has disabled this
    if (_el('s-dupe')?.value === 'off') return;
    if (localStorage.getItem(DUPE_PREF_KEY) === 'true') return;

    const word = result.word;
    const freq = {};
    word.split('').forEach(c => { freq[c] = (freq[c] || 0) + 1; });

    for (const [letter, count] of Object.entries(freq)) {
      if (count < 2) continue;
      // Count correctly placed so far
      let placed = 0;
      result.guesses.forEach(g =>
        g.split('').forEach((ch, i) => { if (ch === letter && word[i] === letter) placed++; })
      );
      if (placed >= 1 && placed < count) {
        WQUI.pulseDupeKey(letter);
        showDupeToast(letter.toUpperCase());
        break;
      }
    }
  }

  function showDupeToast(letter) {
    removeDupeToast();
    const div = document.createElement('div');
    div.id = 'dupe-toast';
    div.innerHTML = `
      <span>💡 Heads up: there's another <strong>${letter}</strong> in this word.</span>
      <div class="dupe-dismiss-row">
        <button id="dupe-ok">Got it</button>
        <button id="dupe-never">Don't show again</button>
      </div>`;
    document.body.appendChild(div);
    _dupeToastEl = div;

    _el('dupe-ok')?.addEventListener('click', removeDupeToast);
    _el('dupe-never')?.addEventListener('click', () => {
      localStorage.setItem(DUPE_PREF_KEY, 'true');
      removeDupeToast();
    });

    // Auto-remove after 8 seconds if not dismissed
    setTimeout(removeDupeToast, 8000);
  }

  // ─── 11. Confetti ────────────────────────────────────
  function launchConfetti() {
    const canvas = _el('confetti-canvas');
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const COLORS = ['#22c55e','#f59e0b','#3b82f6','#ec4899','#f97316','#a855f7','#06b6d4','#fbbf24'];
    const pieces = Array.from({ length: 140 }, () => ({
      x:     Math.random() * canvas.width,
      y:     -20 - Math.random() * 140,
      w:     5 + Math.random() * 8,
      h:     3 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx:    (Math.random() - 0.5) * 4.5,
      vy:    2.5 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      spin:  (Math.random() - 0.5) * 0.2,
    }));
    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let any = false;
      pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy += 0.08; p.angle += p.spin;
        if (p.y < canvas.height + 30) any = true;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (any) frame = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(draw);
    setTimeout(() => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 5500);
  }

  // ─── 12. Start ───────────────────────────────────────
  newGame();

})();
