export function formatFiveMarkQuestionNumber(item) {
  if (item.sourceType === 'core') {
    const coreMatch = String(item.id || '').match(/q(\d+)/i);
    return coreMatch ? `Core Q${coreMatch[1].padStart(2, '0')}` : 'Core question';
  }

  const raw = String(item.sourceQuestionId || '');
  const match = raw.match(/^(?:Q)?\s*(\d+)\s*\(?\s*([a-z])\s*\)?$/i);
  if (match) return `Q${Number(match[1])}(${match[2].toLowerCase()})`;

  const idMatch = String(item.id || '').match(/(?:^|-)q(\d+)([a-z])$/i);
  if (idMatch) return `Q${Number(idMatch[1])}(${idMatch[2].toLowerCase()})`;

  return raw || 'Question';
}
