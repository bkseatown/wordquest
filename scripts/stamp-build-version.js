const fs = require('fs');
const path = require('path');

function nowIso() {
  return new Date().toISOString();
}

function shortSha(raw) {
  return String(raw || '').trim().slice(0, 12);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const named = new Map();
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] && args[i].startsWith('--')) {
      named.set(args[i], args[i + 1] || '');
      i += 1;
    }
  }
  const positional = args.filter((a) => !a.startsWith('--'));
  return { named, positional };
}

function resolveBuildId(positional, named) {
  const explicit = named.get('--build') || positional[1] || '';
  if (explicit) return String(explicit).trim();
  const envSha = shortSha(process.env.GITHUB_SHA || process.env.COMMIT_SHA || '');
  const run = String(process.env.GITHUB_RUN_NUMBER || Date.now());
  return envSha ? `${envSha}-${run}` : `local-${run}`;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFileSafe(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content, 'utf8');
}

function buildStampJs(buildId, sha) {
  return [
    '(function buildStampGlobal() {',
    '  var stamp = ' + JSON.stringify(buildId) + ';',
    '  var sha = ' + JSON.stringify(sha) + ';',
    '  var payload = { stamp: stamp, sha: sha, builtAt: ' + JSON.stringify(nowIso()) + ' };',
    '  if (typeof window !== "undefined") window.__BUILD__ = payload;',
    '  if (typeof self !== "undefined") self.__CS_BUILD__ = payload;',
    '})();',
    ''
  ].join('\n');
}

function maybePatchServiceWorker(rootDir, buildId) {
  const swPath = path.join(rootDir, 'sw-runtime.js');
  if (!fs.existsSync(swPath)) return;
  const src = fs.readFileSync(swPath, 'utf8');
  const next = src.replace(/const SW_VERSION = '([^']*)';/, "const SW_VERSION = '" + buildId + "';");
  if (next !== src) fs.writeFileSync(swPath, next, 'utf8');
}

function main() {
  const { named, positional } = parseArgs(process.argv);
  const targetDir = path.resolve(process.cwd(), named.get('--dir') || positional[0] || '.');
  const sha = shortSha(named.get('--sha') || process.env.GITHUB_SHA || process.env.COMMIT_SHA || '');
  const buildId = resolveBuildId(positional, named);

  const versionJsonPath = path.join(targetDir, 'version.json');
  const versionPayload = {
    name: 'Cornerstone MTSS',
    sha: sha,
    v: buildId,
    cacheBuster: buildId,
    builtAt: nowIso()
  };
  writeFileSafe(versionJsonPath, JSON.stringify(versionPayload, null, 2) + '\n');
  writeFileSafe(path.join(targetDir, 'build-version.txt'), buildId + '\n');

  const stamp = buildStampJs(buildId, sha);
  writeFileSafe(path.join(targetDir, 'build-stamp.js'), stamp);
  writeFileSafe(path.join(targetDir, 'js', 'build-stamp.js'), stamp);

  maybePatchServiceWorker(targetDir, buildId);

  process.stdout.write(`[stamp-build-version] target=${targetDir} build=${buildId} sha=${sha || 'n/a'}\n`);
}

main();
