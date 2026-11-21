export function getDocumentKind(resource) {
  const declared = String(resource?.fileType || '').toLowerCase();
  if (declared) return declared;
  const path = String(resource?.repositoryPath || resource?.driveUrl || resource?.url || '');
  const extension = path.split(/[?#]/)[0].split('.').pop()?.toLowerCase();
  return ['pdf', 'ppt', 'pptx', 'doc', 'docx'].includes(extension) ? extension : 'file';
}

export function getDocumentOpenLabel(kind) {
  return ({ pdf: 'Open PDF', ppt: 'Open presentation', pptx: 'Open presentation', doc: 'Open document', docx: 'Open Word document' })[kind] || 'Open resource';
}

export function getDocumentViewerUrl(resource, { repositoryUrl, drivePreviewUrl } = {}) {
  const kind = getDocumentKind(resource);
  if (drivePreviewUrl) return drivePreviewUrl;
  if (!repositoryUrl) return null;
  if (kind === 'pdf') return `${repositoryUrl}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`;
  if (['ppt', 'pptx', 'doc', 'docx'].includes(kind)) {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(repositoryUrl)}`;
  }
  return null;
}
