import { useEffect, useState } from 'react';

export const parsePath = () => {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const path = raw.split('?')[0];
  return path.startsWith('/') ? path : `/${path}`;
};
export function useRoute() {
  const [path, setPath] = useState(parsePath);
  useEffect(() => {
    const on = () => setPath(parsePath());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return path;
}
export const go = (p) => { window.location.hash = p; };
