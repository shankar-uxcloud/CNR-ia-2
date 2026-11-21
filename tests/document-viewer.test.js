import test from 'node:test';
import assert from 'node:assert/strict';
import { getDocumentKind, getDocumentViewerUrl } from '../src/lib/documentViewer.js';

test('detects supported document formats from catalogue metadata and paths', () => {
  assert.equal(getDocumentKind({ fileType: 'pptx' }), 'pptx');
  assert.equal(getDocumentKind({ repositoryPath: 'resources/notes/module-1/notes.pdf' }), 'pdf');
  assert.equal(getDocumentKind({ url: 'https://example.test/slides.pptx?download=1' }), 'pptx');
  assert.equal(getDocumentKind({ repositoryPath: 'file.bin' }), 'file');
});

test('routes supported repository documents to their in-browser preview providers', () => {
  const pdf = getDocumentViewerUrl({ repositoryPath: 'notes.pdf' }, { repositoryUrl: 'https://example.test/notes.pdf' });
  assert.match(pdf, /#toolbar=1/);
  const pptx = getDocumentViewerUrl({ fileType: 'pptx' }, { repositoryUrl: 'https://example.test/slides.pptx' });
  assert.match(pptx, /^https:\/\/view\.officeapps\.live\.com\/op\/embed\.aspx\?src=/);
  const docx = getDocumentViewerUrl({ fileType: 'docx' }, { repositoryUrl: 'https://example.test/overview.docx' });
  assert.match(docx, /overview\.docx/);
});

test('prefers a Google Drive preview URL when supplied', () => {
  assert.equal(getDocumentViewerUrl({ fileType: 'pptx' }, {
    repositoryUrl: 'https://example.test/slides.pptx',
    drivePreviewUrl: 'https://drive.google.com/file/d/id/preview',
  }), 'https://drive.google.com/file/d/id/preview');
});

test('does not invent a preview for unsupported formats or missing URLs', () => {
  assert.equal(getDocumentViewerUrl({ fileType: 'zip' }, { repositoryUrl: 'https://example.test/file.zip' }), null);
  assert.equal(getDocumentViewerUrl({ fileType: 'pdf' }), null);
});
