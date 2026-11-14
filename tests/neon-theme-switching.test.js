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

test('all neon palettes define distinct readable light-mode accents', () => {
  const themes = read('src/styles/themes.css');
  const lightAccents = {
    'ultra-cyber': '#087f9f',
    arctic: '#087da0',
    purple: '#7541b8',
    eco: '#16834a',
  };

  for (const [name, accent] of Object.entries(lightAccents)) {
    const selector = `:root[data-theme='light'][data-neon-theme='${name}']`;
    const start = themes.indexOf(selector);
    assert.notEqual(start, -1, `Missing light-mode selector for ${name}`);
    const next = themes.indexOf('\n:root[', start + selector.length);
    const paletteBlock = themes.slice(start, next === -1 ? themes.length : next);
    assert.ok(paletteBlock.includes(`--cyber-accent: ${accent}`), `Missing light accent for ${name}`);
    assert.ok(paletteBlock.includes('--button-primary-bg: var(--cyber-accent)'), `Primary controls do not follow ${name}`);
    assert.ok(paletteBlock.includes('--diagram-node-active: var(--cyber-accent)'), `Diagrams do not follow ${name}`);
  }
});


test('light neon palettes switch the complete surface and typography system', () => {
  const themes = read('src/styles/themes.css');
  const tokens = ['--bg-primary', '--bg-secondary', '--surface-primary', '--surface-secondary', '--text-primary', '--border-color', '--cyber-accent', '--c-brand'];
  const palettes = ['ultra-cyber', 'arctic', 'purple', 'eco'];
  const blocks = palettes.map((name) => {
    const selector = `:root[data-theme='light'][data-neon-theme='${name}']`;
    const start = themes.indexOf(selector);
    assert.notEqual(start, -1, `Missing complete light palette: ${name}`);
    const next = themes.indexOf('\n:root[', start + selector.length);
    return themes.slice(start, next === -1 ? themes.length : next);
  });
  for (const token of tokens) {
    const values = blocks.map((block, index) => {
      const body = block.slice(block.indexOf('{') + 1).replace(/\/\*[\s\S]*?\*\//g, '');
      const declaration = body.split(';').map((part) => part.trim()).find((part) => part.startsWith(token + ':'));
      assert.ok(declaration, `Missing ${token} in ${palettes[index]}`);
      return declaration.slice(token.length + 1).trim();
    });
    assert.equal(new Set(values).size, palettes.length, `${token} should visibly differ across light palettes`);
  }
  for (const block of blocks) {
    assert.ok(block.includes('--button-primary-text: #ffffff'));
    assert.ok(block.includes('--diagram-node-active: var(--cyber-accent)'));
  }
});


test('dark neon palettes each own distinct background and surface tokens', () => {
  const themes = read('src/styles/themes.css');
  const tokens = ['--bg-primary', '--bg-secondary', '--surface-primary', '--surface-secondary', '--cyber-accent', '--c-brand'];
  const palettes = ['ultra-cyber', 'arctic', 'purple', 'eco'];
  const blocks = palettes.map((name) => {
    const selector = `:root[data-theme='dark'][data-neon-theme='${name}']`;
    const start = themes.indexOf(selector);
    assert.notEqual(start, -1, `Missing dark palette: ${name}`);
    const next = themes.indexOf('\n:root[', start + selector.length);
    return themes.slice(start, next === -1 ? themes.length : next);
  });
  for (const token of tokens) {
    const values = blocks.map((block, index) => {
      const body = block.slice(block.indexOf('{') + 1).replace(/\/\*[\s\S]*?\*\//g, '');
      const declaration = body.split(';').map((part) => part.trim()).find((part) => part.startsWith(token + ':'));
      assert.ok(declaration, `Missing ${token} in ${palettes[index]}`);
      return declaration.slice(token.length + 1).trim();
    });
    assert.equal(new Set(values).size, palettes.length, `${token} should differ across dark palettes`);
  }
});


test('all eight palette modes define the legacy tokens used by landing and shared surfaces', () => {
  const themes = read('src/styles/themes.css');
  const palettes = ['ultra-cyber', 'arctic', 'purple', 'eco'];
  const modes = ['light', 'dark'];
  const tokens = [
    '--cyber-edge', '--cyber-panel-shadow', '--ux-glow',
    '--neon-bg', '--neon-bg-raised', '--neon-surface', '--neon-surface-raised',
    '--neon-text', '--neon-muted', '--neon-violet', '--neon-green', '--neon-magenta',
    '--landing-bg', '--landing-deep', '--landing-surface-a', '--landing-surface-b',
    '--landing-surface-c', '--landing-text', '--glow-purple',
  ];

  for (const mode of modes) {
    const blocks = palettes.map((name) => {
      const selector = `:root[data-theme='${mode}'][data-neon-theme='${name}']`;
      const start = themes.indexOf(selector);
      assert.notEqual(start, -1, `Missing ${mode} palette selector for ${name}`);
      const next = themes.indexOf('\n:root[', start + selector.length);
      return themes.slice(start, next === -1 ? themes.length : next);
    });

    for (const token of tokens) {
      const values = blocks.map((block, index) => {
        const body = block.slice(block.indexOf('{') + 1).replace(/\/\*[\s\S]*?\*\//g, '');
        const declarations = body.split(';').map((part) => part.trim()).filter((part) => part.startsWith(token + ':'));
        assert.ok(declarations.length, `Missing ${token} in ${mode}/${palettes[index]}`);
        return declarations.at(-1).slice(token.length + 1).trim();
      });
      assert.equal(new Set(values).size, palettes.length, `${mode} ${token} must follow the selected palette`);
    }
    for (const block of blocks) assert.ok(block.includes('--landing-cta-text:'), `Missing landing CTA text in ${mode}`);
  }
});

test('landing and shared surface styles consume palette tokens rather than fixed palette colours', () => {
  const themes = read('src/styles/themes.css');
  const components = read('src/styles/components.css');
  assert.match(themes, /body\s*\{[\s\S]*background-color:\s*var\(--bg-primary\)/);
  assert.match(components, /\.landing-hero\s*\{[^}]*background:\s*var\(--landing-bg\)/);
  assert.match(components, /\.cyber-hud-cell\s*\{[^}]*box-shadow:\s*var\(--ux-glow\)/);
});


test('every palette owns the complete neon accent alias family in both modes', () => {
  const themes = read('src/styles/themes.css');
  const palettes = ['ultra-cyber', 'arctic', 'purple', 'eco'];
  const modes = ['light', 'dark'];
  const aliases = ['--neon-cyan', '--neon-blue', '--neon-purple', '--neon-violet', '--neon-green', '--neon-magenta', '--ux-cyan', '--ux-blue', '--ux-violet', '--ux-green', '--ux-magenta'];

  for (const mode of modes) {
    const blocks = palettes.map((name) => {
      const selector = `:root[data-theme='${mode}'][data-neon-theme='${name}']`;
      const start = themes.indexOf(selector);
      assert.notEqual(start, -1, `Missing ${mode}/${name} selector`);
      const next = themes.indexOf('\n:root[', start + selector.length);
      return themes.slice(start, next === -1 ? themes.length : next);
    });

    for (const token of aliases) {
      const values = blocks.map((block, index) => {
        const declarations = block.replace(/\/\*[\s\S]*?\*\//g, '').split(';').map((part) => part.trim()).filter((part) => part.startsWith(token + ':'));
        assert.ok(declarations.length, `Missing ${token} in ${mode}/${palettes[index]}`);
        return declarations.at(-1).slice(token.length + 1).replace(/;$/, '').trim();
      });
      assert.equal(new Set(values).size, palettes.length, `${mode} ${token} must be unique per palette`);
    }
  }
});
