import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const protectedGitBlobShas = {
  'src/data/questions.js': '1efbfd58383264fd8aaec23883312464da766db7',
  'src/data/answers/module3.js': 'c6da51afb5fb960d10d9ac6ebf15039f1950403b',
  'src/data/answers/module4.js': '1500d51857109829205d41ff7fc4e3d685c22a06',
  'src/data/answers/module5.js': '0e293c738a3f66baeab80e77341a8002d8880570',
  'src/data/twoMarkAnswers.js': '0d5b3434f3646a1801730bcf42fc1b3076558ffa',
  'src/data/fiveMarkAnswers.js': '7e5ce48139fecb9377eeca90d5f70a4e2391e3f7',
  'src/data/juneJuly2026.js': '9ad66e79b7464cac729301459ecd04926cebeddb',
  'src/data/decJan2026Additional.js': '703351f99569379f69a2ee7a2a1fddba8d45372',
  'src/data/decJan2026Evaluation.js': '561c618210a000c74489aa7a2f5e51bf893462d8',
  'src/data/modelQuestionPaper21cv654.js': 'f07b77fe1c11d3a79ed3202c59be91b89d60e88f',
  'src/pages/DecJan2026.jsx': '0fdcb874020acb1d818b10ff8b2fca0da43ec6e4',
  'src/pages/JuneJuly2026.jsx': 'f95417145735b7833a9ac87bc7fde7a3d24abbec',
  'src/lib/content.js': 'bac8cb8d0db1c6a86db19aa2d5570c7150872b64',
  'src/components/Blocks.jsx': '811865311af7a2b1594dfa5e1919a9909e7c68be',
  'src/diagrams/Climate.jsx': '86cf29f34a00e6bc7cc61f09d8dcb97646a1fd0c',
  'src/diagrams/Cycles.jsx': '94fe068d71ec4776c855b8268b8a232c44776958',
  'src/diagrams/Equipment.jsx': 'fd2550879d2a8d599a18ad161984c6a0290e9da2',
  'src/diagrams/Ozone.jsx': '56b6febb85de6b33bca793d7d62daa3aa3527549',
  'src/diagrams/kit.jsx': 'de84d8b1f130fd51772c0f3530cd888f93f8af72',
};

const gitBlobSha = (bytes) => createHash('sha1')
  .update('blob ' + bytes.length + '\0')
  .update(bytes)
  .digest('hex');

for (const [path, expectedSha] of Object.entries(protectedGitBlobShas)) {
  test('protected existing content remains byte-for-byte unchanged: ' + path, () => {
    const bytes = readFileSync(new URL('../' + path, import.meta.url));
    assert.equal(gitBlobSha(bytes), expectedSha, 'Protected existing answer content changed: ' + path);
  });
}

test('all existing diagram registry entries remain present while new diagrams may be added', () => {
  const source = readFileSync(new URL('../src/diagrams/index.js', import.meta.url), 'utf8');
  const existingIds = [
    'greenhouse', 'eia', 'conservation', 'carbon', 'nitrogen', 'oxygen',
    'phosphorus', 'water', 'esp', 'baghouse', 'cyclone', 'scrubber', 'ozone',
  ];
  for (const id of existingIds) {
    assert.match(source, new RegExp('^\\s*' + id + ':\\s*\\{', 'm'), 'Existing diagram registry entry was removed: ' + id);
  }
});
