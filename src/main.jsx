import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/tokens.css';
import './styles/themes.css';
import './styles/components.css';
import './styles/utilities.css';
import './styles/responsive.css';
import './styles/premium-sitewide.css';
import './styles/responsive-v2.css';
import './styles/module-photos.css';
import './styles/question-discovery.css';

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  // When a new deployment activates, immediately leave any document still running
  // an older cached JavaScript bundle. This prevents stale PWA shells from keeping
  // a previous runtime error alive after GitHub Pages has deployed a fix.
  let refreshingForWorkerUpdate = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshingForWorkerUpdate) return;
    refreshingForWorkerUpdate = true;
    window.location.reload();
  });

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        import.meta.env.BASE_URL + 'sw.js',
        { scope: import.meta.env.BASE_URL, updateViaCache: 'none' },
      );
      // Check GitHub Pages for a newer worker on every app load instead of
      // waiting for the browser's periodic service-worker update interval.
      await registration.update();
    } catch {
      // The app remains fully usable online if service-worker registration is unavailable.
    }
  });
}

// Recover gracefully if a deployment removes a lazy-loaded chunk while an older
// page is still open. The guard prevents repeated reload loops.
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  const key = 'cnr-vite-preload-recovery';
  if (sessionStorage.getItem(key) === '1') return;
  sessionStorage.setItem(key, '1');
  window.location.reload();
});
window.addEventListener('load', () => {
  sessionStorage.removeItem('cnr-vite-preload-recovery');
}, { once: true });

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
