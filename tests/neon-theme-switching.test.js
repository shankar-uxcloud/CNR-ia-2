import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('all neon palettes have complete dark-mode selectors and semantic accents', () => {
  const themes = read('src/styles/themes.css');
  const palettes = {
    'ultra-cyber': '#00f5ff',
    arctic: '#7de8ff',
    purple: '#c084fc',
    eco: '#4ade80',
  };

  for (const [name, accent] of Object.entries(palettes)) {
    assert.ok(themes.includes(`:root[data-theme='dark'][data-neon-theme='${name}']`), `Missing dark selector for ${name}`);
    assert.ok(themes.includes(`--cyber-accent: ${accent}`), `Missing accent token for ${name}`);
  }
});

test('choosing a neon palette updates the root selector immediately and persists through provider state', () => {
  const study = read('src/lib/study.jsx');
  assert.match(study, /k === 'cyberTheme'[\s\S]*document\.documentElement\.setAttribute\('data-neon-theme', v\)/);
  assert.match(study, /useLayoutEffect\(\(\) => \{[\s\S]*root\.setAttribute\('data-neon-theme', cyberTheme\)/);
  assert.match(study, /\['ultra-cyber', 'arctic', 'purple', 'eco'\]\.includes\(v\)/);
});
