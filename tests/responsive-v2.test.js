import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/responsive-v2.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const shell = readFileSync(new URL('../src/components/Shell.jsx', import.meta.url), 'utf8');

test('responsive v2 is loaded after the existing responsive and premium layers', () => {
  assert.ok(main.indexOf("import './styles/responsive.css';") < main.indexOf("import './styles/responsive-v2.css';"));
  assert.ok(main.indexOf("import './styles/premium-sitewide.css';") < main.indexOf("import './styles/responsive-v2.css';"));
});

test('route inventory retains all application destinations', () => {
  for (const route of ['/welcome','/learning-hub','/resources','/mqps','/dec-jan-2026','/dashboard','/questions','/bookmarks','/revision','/practice','/quiz','/exam','/analytics','/visual-studio','/environment-lab','/smart-revision','/additional-notes','/study-coach','/data-backup','/ecoweb','/planner']) assert.ok(app.includes("=== '" + route + "'"), 'route missing: ' + route);
  assert.ok(app.includes('([345])'), 'module route pattern missing');
  assert.ok(app.includes('([a-z0-9]+)'), 'question route pattern missing');
});

test('shared shell navigation retains accessible drawer and focus management', () => {
  for (const marker of ['mobile-navigation-dialog','mobile-navigation-drawer','aria-expanded={open}','aria-controls="mobile-navigation-dialog"','event.key !== \'Tab\'','document.body.style.overflow = \'hidden\'']) assert.ok(shell.includes(marker), 'missing shell behavior: ' + marker);
});

test('viewport system covers all requested device classes and accessibility preferences', () => {
  for (const marker of ['max-width: 374px','max-width: 430px','max-width: 767px','min-width: 768px','min-width: 1024px','min-width: 1440px','min-width: 320px','env(safe-area-inset-bottom','--control-min-size: 44px','prefers-reduced-motion: reduce','prefers-reduced-transparency: reduce','forced-colors: active']) assert.ok(css.includes(marker), 'missing responsive rule: ' + marker);
});

test('academic media and controls remain contained on narrow viewports', () => {
  for (const marker of ['.reading table','overflow-x: auto','overscroll-behavior-inline: contain','diagram-frame svg','font-size: max(16px, 1em)','overflow-wrap: anywhere']) assert.ok(css.includes(marker), 'missing mobile safeguard: ' + marker);
});
