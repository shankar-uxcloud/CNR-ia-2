import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/tokens.css';
import './styles/themes.css';
import './styles/components.css';
import './styles/utilities.css';

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL }).catch(() => {
      // The app remains fully usable online if service-worker registration is unavailable.
    });
  });
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
