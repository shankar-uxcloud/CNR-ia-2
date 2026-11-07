import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const main = read('src/main.jsx');
const tokens = read('src/styles/tokens.css');
const themes = read('src/styles/themes.css');
const components = read('src/styles/components.css');
const utilities = read('src/styles/utilities.css');

test('the app loads a single ordered modular design system', () => {
  const imports = ["./styles/global.css","./styles/tokens.css","./styles/themes.css","./styles/components.css","./styles/utilities.css"];
  let previous = -1;
  for (const path of imports) {
    const index = main.indexOf(`import '${path}'`);
    assert.ok(index > previous, 'missing or out-of-order stylesheet: ' + path);
    previous = index;
  }
  assert.doesNotMatch(main, /index\.css|neon-completion\.css/);
  assert.match(read('src/styles/global.css'), /@tailwind base;/);
  assert.doesNotMatch(read('src/styles/global.css'), /@tailwind utilities;/);
  assert.match(read('src/styles/components.css'), /@tailwind components;/);
  assert.match(utilities, /^@tailwind utilities;/);
});

test('semantic tokens cover backgrounds, surfaces, text, borders, controls and status', () => {
  for (const token of ['--bg-primary','--bg-secondary','--surface-primary','--surface-elevated','--text-primary','--text-muted','--border-color','--input-bg','--button-primary-bg','--status-success','--status-warning','--status-danger']) {
    assert.ok(tokens.includes(token), 'missing semantic token ' + token);
  }
  for (const palette of ['ultra-cyber','arctic','purple','eco']) assert.ok(themes.includes(`data-neon-theme='${palette}'`));
});

test('component states use semantic variables without blanket important overrides', () => {
  for (const selector of ['.card','aside nav a[aria-current','header.topbar','input','select','textarea','main table','.reading','.visual-studio','.lab-control','[role=\'dialog\']','[role=\'status\']']) {
    assert.ok(components.includes(selector), 'missing component treatment ' + selector);
  }
  const all = [tokens,themes,components,utilities].join('\n');
  assert.doesNotMatch(all, /!important/);
  assert.match(components, /color-mix\(in srgb, var\(--cyber-accent\) 28%, transparent\)/);
});

test('responsive, reduced-motion and print behavior are centralized', () => {
  assert.match(utilities, /max-width: 767px/);
  assert.match(utilities, /prefers-reduced-motion: reduce/);
  assert.match(utilities, /@media print/);
});

test('premium neon outlines cover cards, controls, navigation, tabs and keyboard focus', () => {
  for (const selector of ["[data-theme='dark'] .card", ".btn-ghost", ".chip", "aside nav a", "input", ".visual-studio", ".cyber-hud-cell"]) {
    assert.ok(components.includes(selector), 'missing neon treatment for ' + selector);
  }
  assert.ok(components.includes('@keyframes neon-border-flow'));
  assert.ok(components.includes('.card[data-energy=\'active\']'));
  assert.ok(components.includes('prefers-reduced-motion: reduce'));
  assert.ok(components.includes('var(--cyber-secondary)'));
  assert.ok(components.includes('var(--cyber-tertiary)'));
});

