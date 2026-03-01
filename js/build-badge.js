(function csBuildBadgeModule() {
  "use strict";

  var BASE = window.location.pathname.indexOf("/WordQuest/") !== -1 ? "/WordQuest" : "";
  var BUILD_JSON_URL = BASE + "/build.json";
  var BADGE_ID = "cs-build-badge";
  var POPOVER_ID = "cs-build-popover";
  var TOAST_ID = "cs-build-update-toast";

  function inDevMode() {
    try {
      var host = String(window.location.hostname || "").toLowerCase();
      if (!host || host === "localhost" || host === "127.0.0.1" || host === "::1") return true;
      if (new URLSearchParams(window.location.search || "").get("cs_allow_dev") === "1") return true;
      if (window.CSAppMode && typeof window.CSAppMode.isDevMode === "function") return !!window.CSAppMode.isDevMode();
      return !!(window.CS_CONFIG && String(window.CS_CONFIG.environment || "").toLowerCase() === "dev");
    } catch (_e) {
      return false;
    }
  }

  function getCurrentBuildId() {
    var payload = window.CS_BUILD || window.__BUILD__ || window.__CS_BUILD__ || {};
    var buildId = String(
      payload.buildId || payload.version || payload.stamp || payload.cacheBuster || ""
    ).trim();
    if (!buildId) {
      try {
        buildId = String(new URLSearchParams(window.location.search || "").get("v") || "").trim();
      } catch (_e) {
        buildId = "";
      }
    }
    return buildId || "unknown";
  }

  function ensureStyles() {
    if (document.getElementById("cs-build-badge-style")) return;
    var style = document.createElement("style");
    style.id = "cs-build-badge-style";
    style.textContent = [
      "#" + BADGE_ID + "{position:fixed;right:12px;bottom:12px;z-index:2147483640;border:1px solid rgba(255,255,255,.16);background:rgba(15,24,34,.72);color:#dce8f5;border-radius:999px;padding:6px 10px;font:600 11px/1.2 var(--font-ui,system-ui,-apple-system,sans-serif);letter-spacing:.01em;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.24)}",
      "#" + BADGE_ID + ":hover{background:rgba(22,34,48,.88)}",
      "#" + BADGE_ID + "[data-stale='1']::after{content:'';display:inline-block;width:6px;height:6px;border-radius:50%;background:#ffd166;margin-left:6px;vertical-align:middle}",
      "#" + POPOVER_ID + "{position:fixed;right:12px;bottom:46px;z-index:2147483641;width:min(320px,calc(100vw - 24px));padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(14,22,31,.96);color:#e8f1fa;font:500 12px/1.45 var(--font-ui,system-ui,-apple-system,sans-serif);box-shadow:0 14px 28px rgba(0,0,0,.32)}",
      "#" + POPOVER_ID + "[hidden]{display:none!important}",
      ".cs-build-row{display:flex;justify-content:space-between;gap:8px;margin:4px 0}",
      ".cs-build-row b{font-weight:700}",
      ".cs-build-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}",
      ".cs-build-action{border:1px solid rgba(255,255,255,.22);border-radius:9px;background:rgba(255,255,255,.08);color:#ecf6ff;padding:6px 9px;font:600 11px/1.2 var(--font-ui,system-ui,-apple-system,sans-serif);cursor:pointer}",
      ".cs-build-action:hover{background:rgba(255,255,255,.14)}",
      "#" + TOAST_ID + "{position:fixed;right:12px;bottom:78px;z-index:2147483639;display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.2);background:rgba(17,27,38,.95);color:#f0f7ff;font:600 12px/1.3 var(--font-ui,system-ui,-apple-system,sans-serif);box-shadow:0 12px 28px rgba(0,0,0,.28)}",
      "#" + TOAST_ID + "[hidden]{display:none!important}"
    ].join("");
    (document.head || document.documentElement).appendChild(style);
  }

  async function fetchDeployedBuildId() {
    try {
      var response = await fetch(BUILD_JSON_URL + "?cb=" + Date.now(), { cache: "no-store" });
      if (!response.ok) return "";
      var data = await response.json();
      return String(data && data.buildId || "").trim();
    } catch (_e) {
      return "";
    }
  }

  async function forceUpdate() {
    var buildForReload = getCurrentBuildId();
    try {
      if ("serviceWorker" in navigator && navigator.serviceWorker.getRegistrations) {
        var regs = await navigator.serviceWorker.getRegistrations();
        for (var i = 0; i < regs.length; i += 1) {
          try { await regs[i].update(); } catch (_e1) {}
        }
        for (var j = 0; j < regs.length; j += 1) {
          try { await regs[j].unregister(); } catch (_e2) {}
        }
      }

      if ("caches" in window && window.caches && typeof window.caches.keys === "function") {
        var keys = await window.caches.keys();
        for (var k = 0; k < keys.length; k += 1) {
          try { await window.caches.delete(keys[k]); } catch (_e3) {}
        }
      }

      var nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("v", buildForReload || Date.now().toString());
      window.location.replace(nextUrl.toString());
      return;
    } catch (_fatal) {
      try {
        window.location.reload(true);
      } catch (_fallback) {
        window.location.reload();
      }
    }
  }

  async function clearAllCachesAndWorkers() {
    if ("serviceWorker" in navigator && navigator.serviceWorker.getRegistrations) {
      var regs = await navigator.serviceWorker.getRegistrations();
      for (var i = 0; i < regs.length; i += 1) {
        try { await regs[i].unregister(); } catch (_e1) {}
      }
    }
    if ("caches" in window && window.caches && typeof window.caches.keys === "function") {
      var keys = await window.caches.keys();
      for (var j = 0; j < keys.length; j += 1) {
        try { await window.caches.delete(keys[j]); } catch (_e2) {}
      }
    }
  }

  function ensureBadge() {
    var badge = document.getElementById(BADGE_ID);
    if (badge) return badge;
    badge = document.createElement("button");
    badge.id = BADGE_ID;
    badge.type = "button";
    badge.textContent = "v" + getCurrentBuildId();
    badge.setAttribute("aria-label", "Build and update controls");
    document.body.appendChild(badge);
    return badge;
  }

  function ensurePopover() {
    var pop = document.getElementById(POPOVER_ID);
    if (pop) return pop;
    pop = document.createElement("section");
    pop.id = POPOVER_ID;
    pop.hidden = true;
    pop.innerHTML = [
      '<div class="cs-build-row"><span>Current</span><b id="cs-build-current">--</b></div>',
      '<div class="cs-build-row"><span>Deployed</span><b id="cs-build-deployed">--</b></div>',
      '<div class="cs-build-actions">',
      '<button type="button" class="cs-build-action" id="cs-force-update-btn">Force update now</button>',
      '<button type="button" class="cs-build-action" id="cs-reset-runtime-btn" hidden>Unregister SW + clear caches</button>',
      "</div>"
    ].join("");
    document.body.appendChild(pop);
    return pop;
  }

  function ensureToast() {
    var toast = document.getElementById(TOAST_ID);
    if (toast) return toast;
    toast = document.createElement("aside");
    toast.id = TOAST_ID;
    toast.hidden = true;
    toast.innerHTML = '<span>Update available</span><button type="button" class="cs-build-action" id="cs-toast-update-btn">Update now</button>';
    document.body.appendChild(toast);
    return toast;
  }

  function setBuildLabels(currentBuild, deployedBuild) {
    var badge = ensureBadge();
    var popover = ensurePopover();
    var current = popover.querySelector("#cs-build-current");
    var deployed = popover.querySelector("#cs-build-deployed");
    badge.textContent = "v" + currentBuild;
    badge.dataset.stale = deployedBuild && currentBuild !== deployedBuild ? "1" : "0";
    if (current) current.textContent = currentBuild;
    if (deployed) deployed.textContent = deployedBuild || "unknown";
  }

  function bindUI() {
    var badge = ensureBadge();
    var popover = ensurePopover();
    var toast = ensureToast();
    var btnForce = popover.querySelector("#cs-force-update-btn");
    var btnReset = popover.querySelector("#cs-reset-runtime-btn");
    var btnToast = toast.querySelector("#cs-toast-update-btn");

    if (inDevMode() && btnReset) btnReset.hidden = false;

    badge.addEventListener("click", function () {
      popover.hidden = !popover.hidden;
    });

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target) return;
      if (target === badge || popover.contains(target)) return;
      popover.hidden = true;
    });

    if (btnForce) {
      btnForce.addEventListener("click", function () {
        forceUpdate();
      });
    }
    if (btnToast) {
      btnToast.addEventListener("click", function () {
        forceUpdate();
      });
    }
    if (btnReset) {
      btnReset.addEventListener("click", function () {
        clearAllCachesAndWorkers().then(function () {
          popover.hidden = true;
        });
      });
    }
  }

  var initialized = false;

  function openPopover() {
    var popover = ensurePopover();
    popover.hidden = false;
  }

  function togglePopover() {
    var popover = ensurePopover();
    popover.hidden = !popover.hidden;
  }

  async function init() {
    if (initialized) return;
    initialized = true;
    ensureStyles();
    bindUI();
    var currentBuild = getCurrentBuildId();
    var deployedBuild = await fetchDeployedBuildId();
    setBuildLabels(currentBuild, deployedBuild);

    if (deployedBuild && currentBuild && deployedBuild !== currentBuild) {
      ensureToast().hidden = false;
    }
  }

  window.CSForceUpdateNow = forceUpdate;
  window.CSBuildBadge = Object.assign({}, window.CSBuildBadge || {}, {
    init: init,
    forceUpdate: forceUpdate,
    open: openPopover,
    togglePopover: togglePopover
  });
})();
