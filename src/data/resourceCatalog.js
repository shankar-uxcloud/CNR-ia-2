// Dual-source resource catalogue.
// repositoryPath: path relative to public/ (for GitHub Pages hosting).
// driveUrl: optional public Google Drive share URL (Anyone with the link → Viewer).
// Keep a resource unpublished until at least one source is actually available.
export const RESOURCE_CATEGORIES = [
  { id: 'notes', label: 'Notes' },
  { id: 'pyqs', label: 'Previous Year Papers' },
  { id: 'mqps', label: 'Model Question Papers' },
  { id: 'assignments', label: 'Assignments' },
  { id: 'reference', label: 'Reference Materials' },
  { id: 'presentations', label: 'Presentations' },
];

export const DRIVE_RESOURCES = [
  {
    id: 'cnr-m1-notes-module-1-copy',
    title: 'BCV755B Module 1 Notes (Copy 1)',
    description: 'Module 1 study notes uploaded to the CNR-IA-2 GitHub Pages resources.',
    module: 1,
    category: 'notes',
    repositoryPath: 'resources/notes/module-1/BCV755B Module 1 (1).pdf',
    year: '',
    tags: ['module 1', 'notes', 'BCV755B'],
    sourceLabel: 'Uploaded to CNR-IA-2 repository',
  },
  {
    id: 'cnr-m1-notes-module-1',
    title: 'BCV755B Module 1 Notes',
    description: 'Module 1 study notes uploaded to the CNR-IA-2 GitHub Pages resources.',
    module: 1,
    category: 'notes',
    repositoryPath: 'resources/notes/module-1/BCV755B Module 1.pdf',
    year: '',
    tags: ['module 1', 'notes', 'BCV755B'],
    sourceLabel: 'Uploaded to CNR-IA-2 repository',
  },
  {
    id: 'cnr-m1-notes-module-1-pdf',
    title: 'BCV755B Module 1 Notes (PDF)',
    description: 'Additional Module 1 study PDF uploaded to the CNR-IA-2 GitHub Pages resources.',
    module: 1,
    category: 'notes',
    repositoryPath: 'resources/notes/module-1/BCV755B-module-1-pdf.pdf',
    year: '',
    tags: ['module 1', 'notes', 'BCV755B'],
    sourceLabel: 'Uploaded to CNR-IA-2 repository',
  },
  // {
  //   id: 'm1-primary-notes',
  //   title: 'BCV755B Module 1 Notes',
  //   description: 'Primary module notes from the supplied resource collection.',
  //   module: 1,
  //   category: 'notes',
  //   repositoryPath: 'resources/notes/module-1/BCV755B-Module-1.pdf',
  //   driveUrl: 'https://drive.google.com/file/d/FILE_ID/view',
  //   year: '',
  //   tags: ['module 1', 'notes'],
  //   sourceLabel: 'Provided study material',
  // },
];
