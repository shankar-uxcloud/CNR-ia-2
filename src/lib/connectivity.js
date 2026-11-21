export function getConnectivityNotice(wasOnline, isOnline) {
  if (wasOnline === isOnline) return null;
  return isOnline ? 'online' : 'offline';
}

export const CONNECTIVITY_NOTICE_DURATION = 3600;
