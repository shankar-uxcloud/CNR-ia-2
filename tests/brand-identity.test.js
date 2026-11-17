import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('CNR-IA-2 identity is used by the shared logo and visible app metadata', () => {
  const shell = read('src/components/Shell.jsx');
  const html = read('index.html');
  const manifest = read('public/manifest.webmanifest');
  const icon = read('public/pwa-icon.svg');

  assert.match(shell, /aria-label="CNR-IA-2 home"/);
  assert.match(shell, /CNR-IA-2/);
  assert.match(shell, />CNR<\/text>/);
  assert.doesNotMatch(shell, /VTU ExamPrep|EXAMPREP/);
  assert.match(html, /<title>CNR-IA-2/);
  assert.match(manifest, /"name": "CNR-IA-2/);
  assert.match(manifest, /"short_name": "CNR-IA-2"/);
  assert.match(icon, /CNR/);
  assert.match(icon, /IA-2/);
});

test('branding updates preserve existing study progress and legacy backup compatibility', () => {
  const study = read('src/lib/study.jsx');
  assert.match(study, /const KEY = 'vtu-examprep-v1'/);
  assert.match(study, /app: 'vtu-examprep'/);
  assert.match(study, /backup\?\.app !== 'vtu-examprep'/);
});

test('GitHub Actions workflows use the CNR-IA-2 project name', () => {
  assert.match(read('.github/workflows/ci.yml'), /name: Validate CNR-IA-2/);
  assert.match(read('.github/workflows/deploy.yml'), /name: Deploy CNR-IA-2/);
});
