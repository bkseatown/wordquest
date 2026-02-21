/* theme-nav.js — adds ◀ ▶ arrows to cycle themes without opening settings
   Also adds Teacher Word Input panel to settings.
   Also fixes default word length to 5.
   ============================================================= */
(function() {
  'use strict';

  /* ── Theme order: light → dark ─────────────────────────── */
  const THEME_ORDER = [
    'default', 'sunset', 'ocean', 'superman', 'barbie', 'marvel',
    'seahawks', 'huskies', 'coffee', 'pokemon', 'harleyquinn',
    'kuromi', 'minecraft', 'ironman', 'demonhunter', 'matrix', 'dark'
  ];

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'default';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Sync the settings dropdown if it exists
    const sel = document.querySelector('select[data-setting="theme"], #theme-select, select.theme-select');
    if (sel) sel.value = theme;
    // Try common patterns for how settings might store theme
    try {
      if (typeof WQSettings !== 'undefined' && WQSettings.set) WQSettings.set('theme', theme);
      if (typeof saveSettings !== 'undefined') saveSettings();
    } catch(e) {}
    // Store for page reloads
    try { sessionStorage.setItem('wq_theme', theme); } catch(e) {}
  }

  function cycleTheme(dir) {
    const current = getCurrentTheme();
    let idx = THEME_ORDER.indexOf(current);
    if (idx === -1) idx = 0;
    idx = (idx + dir + THEME_ORDER.length) % THEME_ORDER.length;
    applyTheme(THEME_ORDER[idx]);
    updateNavLabels(THEME_ORDER[idx]);
  }

  function getThemeLabel(id) {
    const labels = {
      default: '🍀 Default', dark: '🌙 Dark', seahawks: '🦅 Seahawks',
      huskies: '🐺 Huskies', coffee: '☕ Coffee', matrix: '💻 Matrix',
      sunset: '🌅 Sunset', superman: '🦸 Superman', ironman: '🦾 Iron Man',
      marvel: '💥 Marvel', demonhunter: '⚔️ Demon Hunter',
      harleyquinn: '🃏 Harley Quinn', kuromi: '🖤 Kuromi',
      ocean: '🌊 Ocean', minecraft: '⛏️ Minecraft', pokemon: '🎮 Pokédex',
      barbie: '🩷 Barbie'
    };
    return labels[id] || id;
  }

  function updateNavLabels(current) {
    const idx = THEME_ORDER.indexOf(current);
    if (idx === -1) return;
    const prev = THEME_ORDER[(idx - 1 + THEME_ORDER.length) % THEME_ORDER.length];
    const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    const lbl = document.getElementById('wq-theme-label');
    const prevBtn = document.getElementById('wq-theme-prev');
    const nextBtn = document.getElementById('wq-theme-next');
    if (lbl) lbl.textContent = getThemeLabel(current);
    if (prevBtn) prevBtn.title = getThemeLabel(prev);
    if (nextBtn) nextBtn.title = getThemeLabel(next);
  }

  function injectThemeNav() {
    if (document.getElementById('wq-theme-nav')) return;

    // Find the settings panel theme row
    const settingsPanel = document.querySelector('.settings-panel, .settings, #settings, [class*="settings"]');
    if (!settingsPanel) {
      // Fallback: inject into header
      injectHeaderNav();
      return;
    }

    // Find theme select dropdown
    const themeSelect = settingsPanel.querySelector('select');
    if (!themeSelect) { injectHeaderNav(); return; }

    const row = themeSelect.closest('tr, .row, .setting-row, div') || themeSelect.parentElement;

    const nav = document.createElement('div');
    nav.id = 'wq-theme-nav';
    nav.style.cssText = `
      display:inline-flex; align-items:center; gap:6px;
      margin-left:8px; vertical-align:middle;
    `;
    nav.innerHTML = `
      <button id="wq-theme-prev" title="Previous theme" style="
        background:var(--brand,#16a34a); color:var(--brand-text,#fff);
        border:none; border-radius:6px; width:28px; height:28px;
        font-size:14px; cursor:pointer; display:flex; align-items:center;
        justify-content:center; font-weight:bold;
      ">◀</button>
      <span id="wq-theme-label" style="
        font-size:12px; color:var(--text-muted,#666);
        min-width:100px; text-align:center; font-weight:600;
      "></span>
      <button id="wq-theme-next" title="Next theme" style="
        background:var(--brand,#16a34a); color:var(--brand-text,#fff);
        border:none; border-radius:6px; width:28px; height:28px;
        font-size:14px; cursor:pointer; display:flex; align-items:center;
        justify-content:center; font-weight:bold;
      ">▶</button>
    `;

    row.appendChild(nav);

    document.getElementById('wq-theme-prev').addEventListener('click', () => cycleTheme(-1));
    document.getElementById('wq-theme-next').addEventListener('click', () => cycleTheme(1));

    // Sync when dropdown changes
    themeSelect.addEventListener('change', (e) => {
      updateNavLabels(e.target.value);
    });

    updateNavLabels(getCurrentTheme());
  }

  function injectHeaderNav() {
    if (document.getElementById('wq-theme-nav')) return;
    const header = document.querySelector('header, .header, nav, #header');
    if (!header) return;

    const nav = document.createElement('div');
    nav.id = 'wq-theme-nav';
    nav.style.cssText = `
      display:inline-flex; align-items:center; gap:6px;
      position:fixed; bottom:12px; left:50%;
      transform:translateX(-50%); z-index:999;
      background:var(--panel-bg,#fff); border:1px solid var(--panel-border,rgba(0,0,0,0.1));
      border-radius:24px; padding:6px 12px;
      box-shadow:0 4px 16px rgba(0,0,0,0.15);
    `;
    nav.innerHTML = `
      <button id="wq-theme-prev" style="
        background:var(--brand,#16a34a); color:var(--brand-text,#fff);
        border:none; border-radius:6px; width:28px; height:28px;
        font-size:14px; cursor:pointer; font-weight:bold;
      ">◀</button>
      <span id="wq-theme-label" style="
        font-size:12px; color:var(--text,#333);
        min-width:110px; text-align:center; font-weight:600;
      "></span>
      <button id="wq-theme-next" style="
        background:var(--brand,#16a34a); color:var(--brand-text,#fff);
        border:none; border-radius:6px; width:28px; height:28px;
        font-size:14px; cursor:pointer; font-weight:bold;
      ">▶</button>
    `;
    document.body.appendChild(nav);

    document.getElementById('wq-theme-prev').addEventListener('click', () => cycleTheme(-1));
    document.getElementById('wq-theme-next').addEventListener('click', () => cycleTheme(1));
    updateNavLabels(getCurrentTheme());
  }

  /* ── Teacher Word Input ─────────────────────────────────── */
  /* Adds a collapsible teacher section at bottom of settings  */
  let teacherWordPool = null; // null = use normal pool

  function injectTeacherTools() {
    if (document.getElementById('wq-teacher-tools')) return;

    // Find settings close button or bottom of settings panel
    const settingsPanel = document.querySelector('.settings-panel, .settings, #settings, [class*="settings"]');
    if (!settingsPanel) return;

    const section = document.createElement('div');
    section.id = 'wq-teacher-tools';
    section.style.cssText = `
      border-top:1px solid var(--panel-border,rgba(0,0,0,0.1));
      margin-top:12px; padding-top:12px;
    `;

    section.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none;"
           id="wq-teacher-toggle">
        <span style="font-size:13px;font-weight:700;
                     text-transform:uppercase;letter-spacing:0.08em;
                     color:var(--text-muted,#666);">🍎 Teacher Word Input</span>
        <span id="wq-teacher-arrow" style="color:var(--text-muted,#666);font-size:11px;">▼</span>
        <span id="wq-teacher-status" style="
          font-size:11px; background:var(--brand,#16a34a);
          color:var(--brand-text,#fff); border-radius:10px;
          padding:1px 8px; display:none;
        ">ACTIVE</span>
      </div>
      <div id="wq-teacher-body" style="display:none;margin-top:10px;">
        <p style="font-size:12px;color:var(--text-muted,#666);margin:0 0 8px;">
          Enter one word per line, or comma-separated. The game will use only these words this session.
        </p>
        <textarea id="wq-teacher-words" placeholder="cat&#10;dog&#10;bat&#10;(or: cat, dog, bat)"
          style="
            width:100%; min-height:80px; padding:8px;
            border:1px solid var(--panel-border,rgba(0,0,0,0.15));
            border-radius:8px; font-size:14px;
            background:var(--modal-bg,#fff); color:var(--text,#333);
            font-family:var(--font,system-ui); resize:vertical; box-sizing:border-box;
          "></textarea>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button id="wq-teacher-activate" style="
            background:var(--brand,#16a34a); color:var(--brand-text,#fff);
            border:none; border-radius:8px; padding:8px 16px;
            font-size:13px; font-weight:700; cursor:pointer; flex:1;
          ">✅ Activate Word List</button>
          <button id="wq-teacher-clear" style="
            background:var(--absent,#94a3b8); color:#fff;
            border:none; border-radius:8px; padding:8px 16px;
            font-size:13px; font-weight:700; cursor:pointer;
          ">✖ Clear</button>
        </div>
        <div id="wq-teacher-msg" style="
          font-size:12px;color:var(--brand,#16a34a);margin-top:6px;
          font-weight:600;min-height:16px;
        "></div>
      </div>
    `;

    settingsPanel.appendChild(section);

    // Toggle visibility
    document.getElementById('wq-teacher-toggle').addEventListener('click', () => {
      const body = document.getElementById('wq-teacher-body');
      const arrow = document.getElementById('wq-teacher-arrow');
      const isOpen = body.style.display !== 'none';
      body.style.display = isOpen ? 'none' : 'block';
      arrow.textContent = isOpen ? '▼' : '▲';
    });

    // Activate
    document.getElementById('wq-teacher-activate').addEventListener('click', () => {
      const raw = document.getElementById('wq-teacher-words').value;
      const words = raw.split(/[\n,]+/)
        .map(w => w.trim().toUpperCase())
        .filter(w => /^[A-Z]{2,12}$/.test(w));

      if (words.length === 0) {
        document.getElementById('wq-teacher-msg').textContent = '⚠️ No valid words found. Use letters only, 2-12 chars.';
        return;
      }

      teacherWordPool = words;
      window.__WQ_TEACHER_POOL__ = words; // expose for game.js to pick up
      document.getElementById('wq-teacher-status').style.display = 'inline';
      document.getElementById('wq-teacher-msg').textContent =
        `✅ ${words.length} word${words.length>1?'s':''} loaded: ${words.slice(0,5).join(', ')}${words.length>5?'…':''}`;

      console.log('[WordQuest Teacher] Active word pool:', words);
    });

    // Clear
    document.getElementById('wq-teacher-clear').addEventListener('click', () => {
      teacherWordPool = null;
      window.__WQ_TEACHER_POOL__ = null;
      document.getElementById('wq-teacher-words').value = '';
      document.getElementById('wq-teacher-status').style.display = 'none';
      document.getElementById('wq-teacher-msg').textContent = 'Word list cleared. Using full word bank.';
    });
  }

  /* ── Restore theme from session ─────────────────────────── */
  function restoreTheme() {
    try {
      const saved = sessionStorage.getItem('wq_theme');
      if (saved && THEME_ORDER.includes(saved)) {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch(e) {}
  }

  /* ── Initialize ─────────────────────────────────────────── */
  function init() {
    restoreTheme();

    // Watch for settings panel to appear (it's likely hidden until gear click)
    const observer = new MutationObserver(() => {
      const panel = document.querySelector(
        '.settings-panel:not([hidden]), .settings:not([hidden]), #settings:not([hidden]),' +
        '[class*="settings"][style*="display: block"], [class*="settings"][style*="display:block"],' +
        '[class*="settings"].open, [class*="settings"].active, [class*="settings"].visible'
      );
      if (panel && !document.getElementById('wq-teacher-tools')) {
        setTimeout(() => {
          injectThemeNav();
          injectTeacherTools();
        }, 80);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    // Also try immediately in case panel is already open
    setTimeout(() => {
      injectThemeNav();
      injectTeacherTools();
    }, 500);

    // Update nav labels whenever theme changes
    const rootObserver = new MutationObserver(() => {
      updateNavLabels(getCurrentTheme());
    });
    rootObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
