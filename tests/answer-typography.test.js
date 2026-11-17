import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('answer typography is scoped to rendered answer text only', () => {
  const css = read('src/styles/global.css');
  const answer = read('src/pages/Answer.jsx');

  assert.match(css, /\.reading \.sect-body :is\(p, li, td, \.eq \.whitespace-pre-wrap\)/);
  assert.match(css, /font-family: 'Segoe UI', 'Aptos', system-ui, sans-serif/);
  assert.match(css, /font-weight: 600/);
  assert.match(css, /\.reading \.sect-body strong[\s\S]*font-weight: 800/);

  // The question prompt is rendered before and outside the .reading answer wrapper.
  assert.match(answer, /<blockquote[\s\S]*?\{q\.question\}[\s\S]*?<\/blockquote>/);
  assert.match(answer, /<div className="reading mt-8">/);
  assert.doesNotMatch(css, /(^|\n)\s*(?:body|\.card|h1|h2|h3)\s*\{[^}]*font-weight:\s*600/s);
});

test('answer typography does not override headings, diagrams, notes or app controls', () => {
  const css = read('src/styles/global.css');
  assert.doesNotMatch(css, /\.reading \.sect-body :is\([^)]*h[1-6]/);
  assert.doesNotMatch(css, /\.reading \.sect-body :is\([^)]*button/);
  assert.doesNotMatch(css, /\.reading \.sect-body :is\([^)]*svg/);
});
