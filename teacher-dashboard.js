(function teacherDashboardVNext() {
  "use strict";

  var Evidence = window.CSEvidence;
  var CaseloadStore = window.CSCaseloadStore;
  if (!Evidence) return;

  var state = {
    selectedId: "",
    caseload: [],
    filtered: []
  };

  var el = {
    search: document.getElementById("td-search-input"),
    noCaseload: document.getElementById("td-no-caseload"),
    list: document.getElementById("td-caseload-list"),
    recentStudents: document.getElementById("td-recent-students"),
    recentSessions: document.getElementById("td-recent-sessions"),
    centerEmpty: document.getElementById("td-center-empty"),
    centerSelected: document.getElementById("td-center-selected"),
    nextStepTitle: document.getElementById("td-next-step-title"),
    nextStepSub: document.getElementById("td-next-step-sub"),
    studentLabel: document.getElementById("td-student-label"),
    focusTitle: document.getElementById("td-focus-title"),
    recoLine: document.getElementById("td-reco-line"),
    sparkline: document.getElementById("td-sparkline"),
    last7Summary: document.getElementById("td-last7-summary"),
    quickCheck: document.getElementById("td-quick-check"),
    startIntervention: document.getElementById("td-start-intervention"),
    rightEmpty: document.getElementById("td-right-empty"),
    rightContent: document.getElementById("td-right-content"),
    evidenceChips: document.getElementById("td-evidence-chips"),
    exportJson: document.getElementById("td-export-json"),
    copyCsv: document.getElementById("td-copy-csv"),
    copySummary: document.getElementById("td-copy-summary"),
    importExport: document.getElementById("td-import-export"),
    adminDemo: document.getElementById("td-admin-demo"),
    newSession: document.getElementById("td-new-session"),
    settings: document.getElementById("td-settings"),
    sessionList: document.getElementById("td-session-list"),
    notesInput: document.getElementById("td-notes-input"),
    quickButtons: Array.prototype.slice.call(document.querySelectorAll("[data-quick]")),
    emptyActions: Array.prototype.slice.call(document.querySelectorAll("[data-empty-action]")),
    coachRibbon: document.getElementById("td-coach-ribbon"),
    coachLine: document.getElementById("td-coach-line"),
    coachPlay: document.getElementById("td-coach-play"),
    coachMute: document.getElementById("td-coach-mute"),
    coachCollapse: document.getElementById("td-coach-collapse"),
    coachChip: document.getElementById("td-coach-chip")
  };
  var NOTES_KEY = "cs_teacher_notes_v1";

  function seedFromCaseloadStore() {
    if (!CaseloadStore || typeof CaseloadStore.loadCaseload !== "function") return;
    var loaded = CaseloadStore.loadCaseload();
    var students = loaded && Array.isArray(loaded.students) ? loaded.students : [];
    students.forEach(function (student) {
      Evidence.upsertStudent({
        id: String(student.id || student.code || ""),
        name: String(student.name || student.id || "Student"),
        gradeBand: String(student.gradeBand || ""),
        tags: Array.isArray(student.tags) ? student.tags : []
      });
    });
  }

  function ensureDemoCaseload() {
    var rows = Evidence.listCaseload();
    if (rows.length) return;
    [
      { id: "SAS7A-03", name: "Ava", gradeBand: "68", tags: ["decoding"] },
      { id: "SAS7A-11", name: "Liam", gradeBand: "68", tags: ["fluency"] },
      { id: "SAS7A-14", name: "Maya", gradeBand: "68", tags: ["sentence"] },
      { id: "SAS7A-17", name: "Noah", gradeBand: "68", tags: ["writing"] },
      { id: "SAS7A-19", name: "Zoe", gradeBand: "68", tags: ["decoding"] }
    ].forEach(function (student) { Evidence.upsertStudent(student); });
  }

  function refreshCaseload() {
    state.caseload = Evidence.listCaseload();
    filterCaseload(el.search.value || "");
    renderRecentPanels();
    el.noCaseload.classList.toggle("hidden", state.caseload.length > 0);
  }

  function renderRecentPanels() {
    var recent = state.caseload.slice(0, 5);
    el.recentStudents.innerHTML = recent.map(function (row) {
      return '<button type="button" class="td-recent-pill" data-recent-id="' + row.id + '">' + row.name + '</button>';
    }).join("");
    Array.prototype.forEach.call(el.recentStudents.querySelectorAll("[data-recent-id]"), function (node) {
      node.addEventListener("click", function () { selectStudent(node.getAttribute("data-recent-id") || ""); });
    });

    var sessions = (Evidence.load().sessions || []).slice(-4).reverse();
    el.recentSessions.innerHTML = sessions.length
      ? sessions.map(function (session) {
          return '<div class="td-recent-item">' + session.studentId + " - " + String(session.module || "").replace("_", " ") + "</div>";
        }).join("")
      : '<div class="td-recent-item">No recent sessions yet.</div>';
  }

  function filterCaseload(query) {
    var q = String(query || "").trim().toLowerCase();
    state.filtered = state.caseload.filter(function (row) {
      if (!q) return true;
      return row.name.toLowerCase().includes(q) || row.id.toLowerCase().includes(q) || row.focus.toLowerCase().includes(q);
    });
    renderCaseload();
  }

  function renderCaseload() {
    if (!state.filtered.length) {
      el.list.innerHTML = '<div class="td-empty">No matches. Try name, student ID, or focus.</div>';
      return;
    }
    el.list.innerHTML = state.filtered.map(function (row) {
      var selected = row.id === state.selectedId ? "is-active" : "";
      return [
        '<button class="td-student-chip ' + selected + '" data-student-id="' + row.id + '" type="button">',
        '<div class="td-chip-top"><strong>' + row.name + '</strong><span class="td-risk ' + row.risk + '">' + row.risk + '</span></div>',
        '<div class="td-chip-top"><span>' + row.id + '</span><span>' + row.focus + '</span></div>',
        '</button>'
      ].join("");
    }).join("");

    Array.prototype.forEach.call(el.list.querySelectorAll("[data-student-id]"), function (node) {
      node.addEventListener("click", function () {
        selectStudent(node.getAttribute("data-student-id") || "");
      });
    });
  }

  function buildSparkPath(points) {
    var arr = Array.isArray(points) && points.length ? points : [46, 49, 54, 58, 62, 60, 64];
    var max = Math.max.apply(Math, arr);
    var min = Math.min.apply(Math, arr);
    var span = Math.max(1, max - min);
    return arr.map(function (value, index) {
      var x = Math.round((index / Math.max(1, arr.length - 1)) * 180);
      var y = Math.round(46 - ((value - min) / span) * 40);
      return (index ? "L" : "M") + x + " " + y;
    }).join(" ");
  }

  function selectStudent(studentId) {
    state.selectedId = String(studentId || "");
    renderCaseload();
    if (!state.selectedId) {
      el.centerEmpty.classList.remove("hidden");
      el.centerSelected.classList.add("hidden");
      el.rightEmpty.classList.remove("hidden");
      el.rightContent.classList.add("hidden");
      setCoachLine("Search or pick a student and I will suggest the next best move.");
      return;
    }

    var summary = Evidence.getStudentSummary(state.selectedId);
    el.centerEmpty.classList.add("hidden");
    el.centerSelected.classList.remove("hidden");
    el.rightEmpty.classList.add("hidden");
    el.rightContent.classList.remove("hidden");

    el.studentLabel.textContent = summary.student.name + " · " + summary.student.id;
    el.focusTitle.textContent = summary.nextMove.focus + " Focus";
    el.recoLine.textContent = summary.nextMove.line;
    el.nextStepTitle.textContent = summary.nextMove.focus + " - Start now";
    el.nextStepSub.textContent = summary.nextMove.line;
    el.last7Summary.textContent = "Last 7 sessions · " + summary.last7Sparkline.join(" / ");
    el.sparkline.innerHTML = '<path d="' + buildSparkPath(summary.last7Sparkline) + '" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>';

    el.quickCheck.onclick = function () { window.location.href = summary.nextMove.quickHref; };
    el.startIntervention.onclick = function () {
      el.startIntervention.classList.add("td-btn-once");
      setTimeout(function () { el.startIntervention.classList.remove("td-btn-once"); }, 260);
      window.location.href = summary.nextMove.interventionHref;
    };
    el.quickButtons.forEach(function (button) {
      button.onclick = function () {
        var key = button.getAttribute("data-quick");
        var sid = encodeURIComponent(summary.student.id);
        if (key === "word-quest") window.location.href = "word-quest.html?student=" + sid + "&mode=quickcheck";
        else if (key === "reading-lab") window.location.href = "reading-lab.html?student=" + sid + "&seed=demo";
        else if (key === "sentence-surgery") window.location.href = "sentence-surgery.html?student=" + sid + "&seed=demo";
        else window.location.href = "writing-studio.html?student=" + sid;
      };
    });

    renderEvidenceChips(summary);
    renderRecentSessionRows(summary.student.id);
    hydrateNotes(summary.student.id);
    setCoachLine(summary.nextMove.line);
  }

  function renderRecentSessionRows(studentId) {
    if (!el.sessionList) return;
    var sessions = (Evidence.load().sessions || [])
      .filter(function (row) { return String(row.studentId || "") === String(studentId || ""); })
      .slice(-4)
      .reverse();
    el.sessionList.innerHTML = sessions.length
      ? sessions.map(function (session) {
          var when = new Date(Number(session.ts || Date.now())).toLocaleDateString();
          return '<div class="td-recent-item">' + when + " - " + String(session.module || "").replace("_", " ") + "</div>";
        }).join("")
      : '<div class="td-recent-item">No sessions for this student yet.</div>';
  }

  function loadNotesMap() {
    try {
      var parsed = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_e) {
      return {};
    }
  }

  function hydrateNotes(studentId) {
    if (!el.notesInput) return;
    var notes = loadNotesMap();
    el.notesInput.value = String(notes[String(studentId || "")] || "");
  }

  function persistNotes(studentId, value) {
    var key = String(studentId || "").trim();
    if (!key) return;
    var notes = loadNotesMap();
    notes[key] = String(value || "").slice(0, 400);
    try { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)); } catch (_e) {}
  }

  function tinySpark(values) {
    var pts = Array.isArray(values) && values.length ? values : [50, 52, 54, 53, 55, 56, 57];
    var max = Math.max.apply(Math, pts);
    var min = Math.min.apply(Math, pts);
    var span = Math.max(1, max - min);
    var d = pts.map(function (v, idx) {
      var x = Math.round((idx / Math.max(1, pts.length - 1)) * 54);
      var y = Math.round(16 - ((v - min) / span) * 12);
      return (idx ? "L" : "M") + x + " " + y;
    }).join(" ");
    return '<svg viewBox="0 0 54 16" class="td-chip-spark"><path d="' + d + '"></path></svg>';
  }

  function renderEvidenceChips(summary) {
    if (!summary || !summary.summaryRows || !summary.summaryRows.length) {
      el.evidenceChips.innerHTML = '<span class="td-chip">No recent evidence yet</span>';
      return;
    }
    var labelByModule = {
      wordquest: "Decoding",
      reading_lab: "Fluency",
      sentence_surgery: "Sentence",
      writing_studio: "Writing"
    };
    el.evidenceChips.innerHTML = summary.summaryRows.map(function (row) {
      var label = labelByModule[row.module] || row.module;
      return '<span class="td-chip"><strong>' + label + ":</strong> " + row.avg + tinySpark(row.spark) + '</span>';
    }).join("");
  }

  function download(name, contents, mime) {
    var a = document.createElement("a");
    var blob = new Blob([contents], { type: mime });
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 220);
  }

  function handleImportExport() {
    var choice = window.prompt("Type EXPORT to download JSON and copy CSV, or paste roster CSV now.", "EXPORT");
    if (choice == null) return;
    if (choice.trim().toUpperCase() === "EXPORT") {
      download("cs-evidence.json", Evidence.exportJSON(), "application/json");
      navigator.clipboard && navigator.clipboard.writeText(Evidence.rosterCSV()).catch(function () {});
      setCoachLine("Exported JSON and copied roster CSV.");
      return;
    }
    var count = Evidence.importRosterCSV(choice);
    refreshCaseload();
    setCoachLine("Imported " + count + " student rows.");
  }

  function addStudentQuick() {
    var name = window.prompt("Student name");
    if (!name) return;
    var id = window.prompt("Student ID", "SAS" + Date.now().toString().slice(-5));
    if (!id) return;
    Evidence.upsertStudent({ id: id, name: name });
    refreshCaseload();
    selectStudent(id);
  }

  function startSessionFromSelection() {
    var sid = state.selectedId || "";
    if (!sid) {
      setCoachLine("Pick a student first, then launch a session.");
      return;
    }
    var summary = Evidence.getStudentSummary(sid);
    window.location.href = summary.nextMove.interventionHref;
  }

  function setupCoachRibbon() {
    var muteKey = "cs_coach_mute_v1";
    var collapsedKey = "cs_coach_collapsed_v1";

    function isMuted() {
      try { return localStorage.getItem(muteKey) === "1"; } catch (_e) { return false; }
    }
    function setMuted(v) {
      try { localStorage.setItem(muteKey, v ? "1" : "0"); } catch (_e) {}
      el.coachMute.textContent = v ? "🔇" : "🔈";
    }
    function setCollapsed(v) {
      try { localStorage.setItem(collapsedKey, v ? "1" : "0"); } catch (_e) {}
      el.coachRibbon.classList.toggle("is-collapsed", !!v);
      el.coachCollapse.textContent = v ? "▸" : "▾";
    }

    setMuted(isMuted());
    try { setCollapsed(localStorage.getItem(collapsedKey) === "1"); } catch (_e) {}

    el.coachMute.addEventListener("click", function () { setMuted(!isMuted()); });
    el.coachCollapse.addEventListener("click", function () {
      var v = el.coachRibbon.classList.contains("is-collapsed");
      setCollapsed(!v);
    });
    el.coachPlay.addEventListener("click", function () {
      if (isMuted()) return;
      playCoachLine(el.coachLine.textContent || "Next best move is ready.");
    });
    if (el.coachChip) {
      el.coachChip.addEventListener("click", function () {
        el.coachRibbon.classList.remove("is-collapsed");
        playCoachLine(el.coachLine.textContent || "Next best move is ready.");
      });
    }
  }

  function playCoachLine(text) {
    var pool = ["coach", "td", "teacher_dashboard"];
    var chosen = pool[Math.floor(Math.random() * pool.length)];
    var audioPath = "audio/tts/packs/ava-multi/coach/" + chosen + ".default.mp3";
    var audio = new Audio(audioPath);
    audio.play().catch(function () {
      if (window.speechSynthesis) {
        var utter = new SpeechSynthesisUtterance(String(text || ""));
        utter.rate = 1;
        utter.pitch = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      }
    });
  }

  function setCoachLine(text) {
    var line = String(text || "").slice(0, 140);
    if (el.coachLine.textContent === line) return;
    el.coachLine.textContent = line;
    if (el.coachChip) {
      el.coachChip.classList.remove("is-fresh");
      setTimeout(function () { el.coachChip.classList.add("is-fresh"); }, 0);
      setTimeout(function () { el.coachChip.classList.remove("is-fresh"); }, 260);
    }
  }

  function bindEvents() {
    el.search.addEventListener("input", function () { filterCaseload(el.search.value || ""); });
    el.importExport.addEventListener("click", handleImportExport);
    el.newSession.addEventListener("click", startSessionFromSelection);
    if (el.adminDemo) {
      el.adminDemo.addEventListener("click", runAdminDemo);
    }
    el.settings.addEventListener("click", function () { setCoachLine("Settings are local-only on this device."); });

    el.exportJson.addEventListener("click", function () {
      var id = state.selectedId || (state.caseload[0] && state.caseload[0].id) || "demo-student";
      var payload = Evidence.exportStudentSnapshot(id);
      download("student-summary-" + id + ".json", JSON.stringify(payload.json, null, 2), "application/json");
      setCoachLine("Exported student summary JSON.");
    });

    el.copyCsv.addEventListener("click", function () {
      var csv = Evidence.rosterCSV();
      if (navigator.clipboard) navigator.clipboard.writeText(csv).catch(function () {});
      setCoachLine("Copied roster CSV.");
    });
    el.copySummary.addEventListener("click", function () {
      var sid = state.selectedId || "";
      if (!sid) return;
      var summary = Evidence.getStudentSummary(sid);
      var line = summary.student.name + " (" + sid + ") · " + summary.nextMove.focus + " · " + summary.nextMove.line;
      if (navigator.clipboard) navigator.clipboard.writeText(line).catch(function () {});
      setCoachLine("Copied student summary to clipboard.");
    });
    if (el.notesInput) {
      el.notesInput.addEventListener("input", function () {
        persistNotes(state.selectedId, el.notesInput.value);
      });
    }

    el.emptyActions.forEach(function (button) {
      button.addEventListener("click", function () {
        var action = button.getAttribute("data-empty-action");
        if (action === "add") return addStudentQuick();
        if (action === "import") return handleImportExport();
        if (action === "demo") {
          ensureDemoCaseload();
          refreshCaseload();
          return;
        }
      });
    });
  }

  function runAdminDemo() {
    var targetId = "stu_ava";
    var hasAva = state.caseload.some(function (row) { return String(row.id || "").toLowerCase() === targetId; });
    if (!hasAva) {
      targetId = "SAS7A-03";
    }
    el.search.value = "Ava";
    filterCaseload("Ava");
    selectStudent(targetId);
    setCoachLine("Admin demo: search, next step, then launch aligned activity.");
    var card = document.querySelector(".td-next-step-card");
    if (card) {
      card.classList.remove("pulse-outline");
      setTimeout(function () { card.classList.add("pulse-outline"); }, 20);
      setTimeout(function () { card.classList.remove("pulse-outline"); }, 1900);
    }
    if (el.rightContent) {
      el.rightContent.classList.remove("hidden");
    }
  }

  Evidence.init();
  seedFromCaseloadStore();
  ensureDemoCaseload();
  refreshCaseload();
  bindEvents();
  setupCoachRibbon();
  selectStudent("");
})();
