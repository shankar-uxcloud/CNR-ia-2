import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const themes = read('src/styles/themes.css');
const study = read('src/lib/study.jsx');
const html = read('index.html');
const startup = read('src/components/StartupExperience.css');

test('all four accents have independent light and dark surface palettes', () => {
  for (const appearance of ['light', 'dark']) {
    for (const palette of ['ultra-cyber', 'arctic', 'purple', 'eco']) {
      assert.ok(themes.includes(`:root[data-theme='${appearance}'][data-neon-theme='${palette}']`), `Missing ${appearance}/${palette}`);
    }
  }
});

test('legacy neon canvas alias can no longer force dark surfaces in light appearance', () => {
  assert.match(themes, /:root\[data-visual-theme='neon'\] body\s*\{\s*background-color:\s*var\(--bg-primary\)/);
  assert.match(themes, /:root\[data-theme='light'\][\s\S]*?--neon-bg:\s*var\(--bg-primary\)/);
  assert.match(themes, /:root\[data-theme='dark'\][\s\S]*?--neon-bg:\s*var\(--bg-primary\)/);
});

test('semantic accent, border and status aliases are centralized', () => {
  for (const token of ['--accent-primary', '--accent-secondary', '--accent-tertiary', '--accent-soft', '--accent-glow', '--border-primary', '--success', '--warning', '--danger']) {
    assert.ok(themes.includes(token), `Missing semantic alias ${token}`);
  }
});

test('glass material derives tint, borders and ambient lighting from active palette tokens', () => {
  assert.match(themes, /:root\[data-ui-mode='glass'\][\s\S]*?--glass-line:[^;]*var\(--cyber-accent\)/);
  assert.match(themes, /:root\[data-theme='light'\]\[data-ui-mode='glass'\][\s\S]*?--glass-depth-shadow:/);
  assert.match(themes, /:root\[data-theme='dark'\]\[data-ui-mode='glass'\][\s\S]*?--glass-depth-shadow:/);
});

test('theme persistence remains in the existing study settings without resetting user data', () => {
  assert.match(study, /settings: \{ theme: 'dark', cyberTheme: 'ultra-cyber', uiMode: 'standard'/);
  assert.match(study, /root\.setAttribute\('data-theme', theme\)/);
  assert.match(study, /root\.setAttribute\('data-neon-theme', cyberTheme\)/);
  assert.match(study, /root\.setAttribute\('data-ui-mode', uiMode\)/);
  assert.match(study, /localStorage\.setItem\(KEY, JSON\.stringify\(state\)\)/);
  assert.match(html, /localStorage\.getItem\('vtu-examprep-v1'\)/);
});

test('startup environment and progress surfaces consume active theme tokens', () => {
  assert.match(startup, /\.startup-screen\s*\{[\s\S]*?var\(--bg-primary\)/);
  assert.match(startup, /\.startup-scene\s*\{[\s\S]*?var\(--cyber-accent\)/);
  assert.match(startup, /\.startup-progress-panel\s*\{[\s\S]*?var\(--surface-elevated\)/);
  assert.match(startup, /prefers-reduced-motion:\s*reduce/);
});

test('theme transitions are limited to colour properties and respect reduced motion', () => {
  assert.match(themes, /transition-property:\s*background-color, background, color, border-color, box-shadow, fill, stroke/);
  assert.match(themes, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?transition-duration:\s*0ms/);
});
