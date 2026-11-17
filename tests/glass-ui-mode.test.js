import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('glass and nebula are independently supported persisted appearance settings', () => {
  const study = read('src/lib/study.jsx');
  assert.match(study, /uiMode:\s*'standard'/);
  assert.match(study, /settings\.uiMode = \['standard', 'glass', 'nebula'\]/);
  assert.match(study, /restoredSettings\.uiMode = \['standard', 'glass', 'nebula'\]/);
  assert.match(study, /root\.setAttribute\('data-ui-mode', uiMode\)/);
  assert.match(study, /\[theme, cyberTheme, uiMode\]/);
});

test('desktop and mobile navigation expose the accessible appearance mode picker', () => {
  const shell = read('src/components/Shell.jsx');
  assert.match(shell, /const UI_MODES = \[/);
  for (const mode of ['standard', 'glass', 'nebula']) {
    assert.ok(shell.includes(`value: '${mode}'`), `missing ${mode} appearance mode`);
  }
  assert.match(shell, /setSetting\('uiMode', value\)/);
  assert.match(shell, /aria-pressed=\{settings\.uiMode === value\}/);
  assert.equal((shell.match(/<AppearanceModePicker\s*\/>/g) || []).length, 2,
    'appearance picker should be available in desktop sidebar and mobile drawer');
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
