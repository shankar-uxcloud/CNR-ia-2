import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('glass UI is an independent persisted appearance setting', () => {
  const study = read('src/lib/study.jsx');
  assert.match(study, /uiMode:\s*'standard'/);
  assert.match(study, /settings\.uiMode = \['standard', 'glass'\]/);
  assert.match(study, /restoredSettings\.uiMode = \['standard', 'glass'\]/);
  assert.match(study, /root\.setAttribute\('data-ui-mode', uiMode\)/);
  assert.match(study, /\[theme, cyberTheme, uiMode\]/);
});

test('glass UI can be enabled and disabled from desktop and mobile appearance controls', () => {
  const shell = read('src/components/Shell.jsx');
  assert.match(shell, /setSetting\('uiMode', active \? 'standard' : 'glass'\)/);
  assert.match(shell, /aria-pressed=\{active\}/);
  assert.match(shell, /aria-label=\{active \? 'Switch to standard surfaces' : 'Enable glass interface'\}/);
  assert.equal((shell.match(/<GlassModeBtn(?:\s[^>]*)?\s*\/>/g) || []).length, 3);
  assert.match(shell, /<GlassModeBtn className="h-9 px-2\\.5"\\s*\\/>/);
});

test('glass mode layers translucent materials over semantic palette tokens', () => {
  const css = read('src/styles/components.css');
  assert.match(css, /:root\[data-ui-mode='glass'\]/);
  assert.match(css, /--glass-surface: color-mix\(in srgb, var\(--surface-primary\) 76%, transparent\)/);
  assert.match(css, /backdrop-filter: blur\(var\(--glass-blur\)\) saturate\(145%\)/);
  assert.match(css, /:root\[data-ui-mode='glass'\] \.card/);
  assert.match(css, /:root\[data-ui-mode='glass'\] aside/);
  assert.match(css, /:root\[data-ui-mode='glass'\] header\.topbar/);
  assert.match(css, /prefers-reduced-transparency/);
  assert.match(css, /forced-colors: active/);
});
