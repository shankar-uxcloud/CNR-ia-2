import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { DRIVE_RESOURCES, RESOURCE_CATEGORIES } from '../src/data/resourceCatalog.js';

test('catalogue registers every supported repository resource', () => {
  assert.equal(DRIVE_RESOURCES.length, 22);
  assert.equal(DRIVE_RESOURCES.filter((item) => item.fileType === 'pptx').length, 5);
  assert.equal(DRIVE_RESOURCES.filter((item) => item.fileType === 'docx').length, 1);
  assert.equal(DRIVE_RESOURCES.filter((item) => !item.fileType || item.fileType === 'pdf').length, 16);
  assert.ok(RESOURCE_CATEGORIES.some((category) => category.id === 'presentations'));
});

test('every repository catalogue path points to an existing public resource', () => {
  for (const resource of DRIVE_RESOURCES.filter((item) => item.repositoryPath)) {
    assert.ok(
      existsSync(resolve(process.cwd(), 'public', resource.repositoryPath)),
      `Missing repository resource: ${resource.repositoryPath}`,
    );
  }
});
