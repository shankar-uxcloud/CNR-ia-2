import { MODULES } from './questions.js';

// Availability reflects content currently present in the repository, not planned work.
export const LEARNING_MODULES = [
  { number: 1, title: 'Module 1', subtitle: 'Study content to be added', status: 'planned', href: null, questionCount: 0 },
  { number: 2, title: 'Module 2', subtitle: 'Study content to be added', status: 'planned', href: null, questionCount: 0 },
  { number: 3, title: MODULES[3].name, subtitle: 'Air and Air Pollution', status: 'available', href: '/module/3', questionCount: 2 },
  { number: 4, title: MODULES[4].name, subtitle: 'Biodiversity and Ecosystem', status: 'available', href: '/module/4', questionCount: 4 },
  { number: 5, title: MODULES[5].name, subtitle: 'Global Warming and EIA', status: 'available', href: '/module/5', questionCount: 4 },
];

export const LEARNING_TOOLS = [
  { id: 'materials', title: 'Study Materials', description: 'Public Google Drive PDFs organized by module and resource category.', status: 'available', href: '/resources' },
  { id: 'pyqs', title: 'Solved PYQs', description: 'Year-wise original papers with verified, question-wise solutions.', status: 'planned', href: null },
  { id: 'mqps', title: 'Model Question Papers', description: 'Student-created full-syllabus and module-wise practice sets linked to published model answers.', status: 'available', href: '/mqps' },
  { id: 'practice', title: 'Practice & Mock Exams', description: 'Use the existing practice and exam simulator tools.', status: 'available', href: '/exam' },
];
