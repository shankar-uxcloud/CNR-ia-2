import test from 'node:test';
import assert from 'node:assert/strict';
import { getDriveFileId, getDrivePreviewUrl, getDriveOpenUrl } from '../src/lib/driveResources.js';

test('extracts a Google Drive file id from a standard share link', () => {
  assert.equal(getDriveFileId('https://drive.google.com/file/d/abc_123-XY/view?usp=sharing'), 'abc_123-XY');
});
test('extracts a Google Drive file id from an id query parameter', () => {
  assert.equal(getDriveFileId('https://drive.google.com/open?id=abc123'), 'abc123');
});
test('rejects non-Drive URLs and malformed values', () => {
  assert.equal(getDriveFileId('https://example.com/file/d/abc/view'), null);
  assert.equal(getDriveFileId('not a url'), null);
  assert.equal(getDriveFileId(null), null);
});
test('builds Drive preview and open URLs', () => {
  assert.equal(getDrivePreviewUrl('abc 123'), 'https://drive.google.com/file/d/abc%20123/preview');
  assert.equal(getDriveOpenUrl('abc123'), 'https://drive.google.com/file/d/abc123/view');
});
