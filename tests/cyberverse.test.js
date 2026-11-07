import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = (p) => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const themes = read('src/styles/themes.css');
const components = read('src/styles/components.css');
const shell = read('src/components/Shell.jsx');
const store = read('src/lib/study.jsx');

test('Cyberverse offers four selectable, persisted visual palettes', () => {
  for (const name of ['ultra-cyber', 'arctic', 'purple', 'eco']) {
    assert.ok(shell.includes(`value: '${name}'`));
    assert.ok(themes.includes(`data-neon-theme='${name}'`));
  }
  assert.ok(store.includes("cyberTheme: 'ultra-cyber'"));
  assert.ok(store.includes("setAttribute('data-neon-theme', cyberTheme)"));
  assert.ok(shell.includes("setSetting('cyberTheme', item.value)"));
});

test('each palette defines a distinct complete semantic surface and text system', () => {
  const required = ['--bg-primary:', '--bg-secondary:', '--surface-primary:', '--surface-secondary:', '--surface-elevated:', '--text-primary:', '--text-secondary:', '--text-muted:', '--border-color:', '--input-bg:', '--button-primary-bg:', '--table-head-bg:', '--landing-bg:'];
  const backgrounds = [];
  for (const name of ['ultra-cyber', 'arctic', 'purple', 'eco']) {
    const start = themes.indexOf(`data-neon-theme='${name}'`);
    const end = themes.indexOf('\n}', start);
    const block = themes.slice(start, end);
    assert.ok(start >= 0, 'missing palette ' + name);
    for (const token of required) assert.ok(block.includes(token), name + ' missing ' + token);
    const bg = block.split('--bg-primary: ')[1]?.split(';')[0];
    assert.ok(bg, name + ' must define a background');
    backgrounds.push(bg.toLowerCase());
  }
  assert.equal(new Set(backgrounds).size, 4, 'all palette backgrounds must differ');
});

test('theme selector exposes accessible visual previews for all existing modes', () => {
  assert.ok(shell.includes('theme-picker-swatch'));
  assert.ok(shell.includes('aria-pressed={cyberTheme === item.value}'));
  assert.ok(shell.includes("setSetting('cyberTheme', item.value)"));
  assert.ok(components.includes(".theme-picker-btn[aria-pressed='true']"));
  for (const name of ['Ultra Cyber', 'Arctic Neon', 'Purple Cyber', 'Eco Neon']) assert.ok(shell.includes(name));
});

test('ambient effects and card energy lighting are CSS-first and respect reduced motion', () => {
  assert.ok(themes.includes('@keyframes cyber-drift'));
  assert.ok(themes.includes('body::before'));
  assert.ok(components.includes(".card[data-energy='active']"));
  assert.ok(read('src/styles/utilities.css').includes('prefers-reduced-motion: reduce'));
  assert.ok(shell.includes('requestAnimationFrame'));
  assert.ok(shell.includes('cancelAnimationFrame'));
});

test('pointer-reactive effects are limited to fine-pointer devices and cleaned up', () => {
  assert.ok(shell.includes('(hover: hover) and (pointer: fine)'));
  assert.ok(shell.includes('pointermove'));
  assert.ok(shell.includes('pointerout'));
  assert.ok(shell.includes("removeEventListener('pointermove'"));
  assert.ok(shell.includes("removeEventListener('pointerout'"));
});

test('mobile drawer and desktop navigation both expose the palette picker', () => {
  assert.ok(shell.includes('ThemePicker className="w-full"'));
  assert.ok(shell.includes('ThemePicker className="hidden sm:grid sm:grid-cols-4"'));
  assert.ok(shell.includes('aria-label="Neon colour themes"'));
});

test('palette choices preserve light mode and accessible motion fallbacks', () => {
  assert.ok(themes.includes(":root[data-theme='light']"));
  assert.ok(read('src/styles/utilities.css').includes('@media print'));
  assert.ok(read('src/styles/utilities.css').includes('max-width: 767px'));
});


test('all neon modes synchronize legacy accents, diagram focus and feedback tokens', () => {
  const contract = ['--neon-cyan:', '--neon-blue:', '--neon-purple:', '--ux-green:', '--diagram-node-active:', '--diagram-node-active-ink:', '--status-info:', '--glow-cyan:'];
  for (const name of ['ultra-cyber', 'arctic', 'purple', 'eco']) {
    const start = themes.lastIndexOf(`:root[data-theme='dark'][data-neon-theme='${name}']`);
    const end = themes.indexOf('\n}', start);
    const block = themes.slice(start, end);
    assert.ok(start >= 0, 'missing complete token bridge for ' + name);
    for (const token of contract) assert.ok(block.includes(token), name + ' missing ' + token);
  }
});

test('startup experience uses the simple leaf palette and adapts to light and dark themes', () => {
  const startup = read('src/components/StartupExperience.css');
  assert.ok(startup.includes('--s-green: #72e2a0'));
  assert.ok(startup.includes('data-theme=\'light\''));
  assert.ok(startup.includes('prefers-reduced-motion: reduce'));
});

test('theme picker clearly marks the selected palette without relying on colour alone', () => {
  assert.ok(shell.includes('theme-picker-check'));
  assert.ok(shell.includes('aria-pressed={cyberTheme === item.value}'));
});


test('startup experience renders a minimal leaf-branded responsive welcome screen', () => {
  const startup = read('src/components/StartupExperience.jsx');
  const styles = read('src/components/StartupExperience.css');
  assert.ok(startup.includes('<Leaf'));
  assert.ok(startup.includes('Your Learning Environment Is Ready!'));
  assert.ok(startup.includes('aria-valuenow={progress}'));
  assert.ok(styles.includes('.startup-brand-mark'));
  assert.ok(styles.includes('safe-area-inset-top'));
  assert.ok(styles.includes('prefers-reduced-motion: reduce'));
  assert.ok(!startup.includes('startup-hud--left'));
});


test('dashboard daily focus surfaces due tasks and a data-backed revision recommendation', () => {
  const dashboard = read('src/pages/Dashboard.jsx');
  assert.ok(dashboard.includes('Today’s focus'));
  assert.ok(dashboard.includes('task.due <= todayKey'));
  assert.ok(dashboard.includes('togglePlannerTask(task.id)'));
  assert.ok(dashboard.includes('Suggested from topics missed in your saved quizzes.'));
  assert.ok(dashboard.includes('Your next incomplete answer in the study sequence.'));
  assert.ok(dashboard.includes('href="#/planner"'));
});
