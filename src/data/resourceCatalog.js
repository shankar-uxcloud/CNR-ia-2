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
  // Add verified resources using this shape:
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
