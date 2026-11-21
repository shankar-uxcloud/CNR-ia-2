# Academic Resource Vault 2.0

The vault is a static, public resource catalogue for CNR-IA-2. The React application is hosted on GitHub Pages; repository-hosted PDF, PPTX and DOCX files can be registered alongside public Google Drive resources. No Supabase, database, server, or authentication service is required.

## Organize files in Drive

Use both dimensions:
- Module folders: Module 1, Module 2, Module 3, Module 4, Module 5
- Category folders inside each module: Notes, PYQs, MQPs, Assignments, Reference Materials

A shared master folder is also acceptable if every catalogue record has accurate module and category metadata.

## Publish a PDF, presentation or document

1. Upload the PDF, PowerPoint presentation or Word document to the correct Drive folder, or place it under the matching `public/resources/` folder in the repository.
2. Open Share → General access.
3. Set access to **Anyone with the link** and role to **Viewer**.
4. Copy the share URL.
5. Add a record to `src/data/resourceCatalog.js`. For repository files, use `repositoryPath` relative to `public/`; set `fileType` to `pdf`, `pptx` or `docx`:

```js
{
  id: 'm3-notes-air-pollution',
  title: 'Module 3 – Air Pollution Notes',
  description: 'Verified lecture notes for revision',
  module: 3,
  category: 'notes',
  url: 'https://drive.google.com/file/d/GOOGLE_FILE_ID/view',
  year: '',
  fileSize: '',
  tags: ['air pollution', 'module 3']
}
```

Allowed categories: `notes`, `presentations`, `pyqs`, `mqps`, `assignments`, `reference`. PDF files can be previewed in the vault. PPTX and DOCX files open as their original files and may download depending on the browser.

Commit the catalogue change to the repository. GitHub Pages will publish the updated catalogue through the existing deployment workflow. The vault reads metadata from the static catalogue, previews PDFs, and opens repository-hosted PPTX/DOCX files or corresponding Drive file pages.

## Student data

Saved resources and recently opened resources are stored in browser localStorage on that device. They are not synced across devices and clearing browser data removes them.

## Public-access limitations

Anyone who has a public share link can forward it. Google Drive Viewer settings do not guarantee that content cannot be copied, screenshotted, or downloaded. Public PDFs are not private or access-controlled. Do not publish copyrighted or confidential material without permission.

The application does not enumerate Drive folders automatically. Adding a file to Drive alone will not add it to the vault; the static catalogue must also be updated.
