(function buildStampGlobal() {
  var stamp = "local-1772292474214";
  var sha = "";
  var payload = { stamp: stamp, sha: sha, builtAt: "2026-02-28T15:27:54.216Z" };
  if (typeof window !== "undefined") window.__BUILD__ = payload;
  if (typeof self !== "undefined") self.__CS_BUILD__ = payload;
})();
