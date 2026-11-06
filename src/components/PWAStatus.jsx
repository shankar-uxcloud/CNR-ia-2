import { useEffect, useState } from 'react';
import { Download, WifiOff, X } from 'lucide-react';

export default function PWAStatus() {
  const [online, setOnline] = useState(() => typeof navigator === 'undefined' ? true : navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    const onInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    window.addEventListener('beforeinstallprompt', onInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('beforeinstallprompt', onInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  if (online && (!installPrompt || installed || dismissed)) return null;

  return (
    <div className="pwa-status no-print" role="status" aria-live="polite">
      {!online ? (
        <div className="pwa-status-message"><WifiOff size={16}/><span><strong>Offline mode</strong><small>Your saved study progress remains on this device.</small></span></div>
      ) : installPrompt && !installed ? (
        <div className="pwa-status-message"><Download size={16}/><span><strong>Install CNR ExamPrep</strong><small>Open your study workspace like an app.</small></span><button type="button" onClick={install} className="pwa-install">Install</button><button type="button" className="pwa-dismiss" aria-label="Dismiss install prompt" onClick={() => setDismissed(true)}><X size={15}/></button></div>
      ) : null}
    </div>
  );
}
