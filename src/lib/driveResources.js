export function getDriveFileId(url) {
  if (typeof url !== 'string') return null;
  try {
    const parsed = new URL(url);
    if (!/(^|\.)drive\.google\.com$/i.test(parsed.hostname)) return null;
    const pathMatch = parsed.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    return pathMatch?.[1] || parsed.searchParams.get('id') || null;
  } catch { return null; }
}
export const getDrivePreviewUrl = (id) => `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
export const getDriveOpenUrl = (id) => `https://drive.google.com/file/d/${encodeURIComponent(id)}/view`;
