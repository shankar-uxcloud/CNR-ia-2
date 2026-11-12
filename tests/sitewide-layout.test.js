import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('every registered learning route is rendered inside the shared page layout shell', () => {
  const app = read('src/App.jsx');
  const shell = read('src/components/Shell.jsx');
  const routes = [
    "path === '/dashboard'",
    "path === '/questions'",
    "path === '/bookmarks'",
    "path === '/revision'",
    "path === '/practice'",
    "path === '/quiz'",
    "path === '/exam'",
    "path === '/analytics'",
    "path === '/visual-studio'",
    "path === '/environment-lab'",
    "path === '/smart-revision'",
    "path === '/additional-notes'",
    "path === '/study-coach'",
    "path === '/data-backup'",
    "path === '/ecoweb'",
    "path === '/planner'",
  ];

  for (const route of routes) assert.ok(app.includes(route), `Missing route: ${route}`);
  assert.match(app, /<Shell path={path}>/);
  assert.match(shell, /className="page-enter"/);
  assert.ok(app.includes("path === '/'"));
  assert.match(app, /\/module\/\(\[345\]\)/);
  assert.match(app, /\/q\/\(\[a-z0-9\]\+\)/);
});

test('shared layout keeps the fixed desktop sidebar from widening the main content canvas', () => {
  const shell = read('src/components/Shell.jsx');
  const styles = read('src/styles/utilities.css');

  assert.match(shell, /lg:ml-64/);
  assert.match(styles, /\.min-h-screen > main\[class~="lg:ml-64"\]/);
  assert.match(styles, /width:\s*calc\(100% - 16rem\)/);
});

test('shared page containers use consistent gutters and responsive alignment rules', () => {
  const styles = read('src/styles/utilities.css');

  assert.match(styles, /--page-gutter:\s*clamp\(/);
  assert.match(styles, /\.page-enter > \.mx-auto\[class\*="max-w-"\]/);
  assert.match(styles, /\.page-enter :where\(\.grid > \*, \.flex > \*\)/);
  assert.match(styles, /@media \(max-width: 639px\)/);
  assert.match(styles, /@media \(min-width: 640px\) and \(max-width: 1023px\)/);
  assert.match(styles, /overflow-wrap: break-word/);
  assert.match(styles, /overscroll-behavior-x: contain/);
});
