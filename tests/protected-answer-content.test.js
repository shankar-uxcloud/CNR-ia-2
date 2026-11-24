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
