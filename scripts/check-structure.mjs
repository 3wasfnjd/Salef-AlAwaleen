// Validates the project layout and scans tracked files for anything that looks
// like a committed secret. Runs in CI before install/build.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const required = [
  'package.json',
  'package-lock.json',
  'index.html',
  'public/manifest.webmanifest',
  'public/icons/icon-512.png',
  'public/icons/icon-512-maskable.png',
  'locales/ar.json',
  'locales/en.json',
  'src/main.ts',
  'src/core/behavior.ts',
  'src/core/voice.ts',
  'src/scene/character/CharacterRig.ts',
  'src/xr/XRExperience.ts',
  'android/twa-manifest.template.json',
];
const problems = required.filter((f) => !existsSync(f)).map((f) => `missing required file: ${f}`);

const forbidden = /\.(keystore|jks|apk|aab|p12|pem)$|(^|\/)\.env(\.|$)/;
const secretPatterns = [
  /AIza[0-9A-Za-z_-]{35}/, // Google API key
  /sk-[A-Za-z0-9_-]{20,}/, // OpenAI-style key
  /sk-ant-[A-Za-z0-9_-]{20,}/, // Anthropic key
  /xi-api-key\s*[:=]\s*['"][0-9a-f]{20,}/i, // ElevenLabs
  /-----BEGIN (RSA |EC |)PRIVATE KEY-----/,
  /ghp_[A-Za-z0-9]{36}/, // GitHub token
];
const files = execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter(Boolean);
for (const file of files) {
  if (forbidden.test(file)) problems.push(`forbidden file committed: ${file}`);
  if (/\.(png|jpg|jpeg|webp|ico)$/.test(file) || file === 'package-lock.json') continue;
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const pattern of secretPatterns) {
    if (pattern.test(text)) problems.push(`possible secret in ${file} (${pattern})`);
  }
}

const ar = JSON.parse(readFileSync('locales/ar.json', 'utf8'));
const en = JSON.parse(readFileSync('locales/en.json', 'utf8'));
for (const key of Object.keys(ar)) if (!(key in en)) problems.push(`locales/en.json missing key ${key}`);
for (const key of Object.keys(en)) if (!(key in ar)) problems.push(`locales/ar.json missing key ${key}`);

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`structure OK (${files.length} tracked files scanned)`);
