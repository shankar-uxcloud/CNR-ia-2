import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('premium sitewide layer is loaded after the existing responsive and theme foundations', () => {
  const entry = read('src/main.jsx');
  const responsiveIndex = entry.indexOf("import './styles/responsive.css';");
  const premiumIndex = entry.indexOf("import './styles/premium-sitewide.css';");

  assert.ok(responsiveIndex >= 0, 'Existing responsive foundation must remain loaded');
  assert.ok(premiumIndex > responsiveIndex, 'Premium refinement must load after existing foundations');
});

test('premium sitewide layer uses semantic tokens and supports all existing UI modes', () => {
  const styles = read('src/styles/premium-sitewide.css');

  for (const token of ['--bg-primary', '--surface-primary', '--text-primary', '--border-color', '--cyber-accent']) {
    assert.ok(styles.includes(token), `Missing semantic token: ${token}`);
  }
  for (const mode of ['glass', 'nebula', 'holographic']) {
    assert.ok(styles.includes(`data-ui-mode='${mode}'`), `Missing existing UI mode: ${mode}`);
  }
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /prefers-reduced-transparency:\s*reduce/);
  assert.match(styles, /@media print/);
});

test('December/January exam reader receives dedicated responsive and print refinements', () => {
  const styles = read('src/styles/premium-sitewide.css');
  const page = read('src/pages/DecJan2026.jsx');

  assert.match(page, /className="study-page/);
  for (const selector of ['.study-page .study-reading-tools', '.study-page .study-points > li', '.study-page .study-marks']) {
    assert.ok(styles.includes(selector), `Missing exam-reader refinement: ${selector}`);
  }
  assert.match(styles, /@media \(max-width: 639px\)/);
  assert.match(styles, /@media print/);
});
