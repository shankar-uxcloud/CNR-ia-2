import { useEffect, useState } from 'react';
import { Download, X, Share, Smartphone } from 'lucide-react';

export default function PWAStatus() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
    setInstalled(Boolean(standalone));
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent) && !standalone);

    const onInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      setShowInstructions(false);
    };

    window.addEventListener('beforeinstallprompt', onInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice?.outcome === 'accepted') setInstalled(true);
    } finally {
      setInstallPrompt(null);
    }
  };

  const canShowInstall = !installed && !dismissed && (installPrompt || ios);
  if (!canShowInstall) return null;

  return (
    <div className="pwa-status no-print" role="region" aria-label="Install CNR-IA-2">
      <div className="pwa-status-message">
        {ios ? <Smartphone size={16} /> : <Download size={16} />}
        <span>
          <strong>{ios ? 'Add CNR ExamPrep to your Home Screen' : 'Install CNR ExamPrep'}</strong>
          <small>{ios ? 'Use the Share menu in Safari for an app-like experience.' : 'Open your study workspace like an app.'}</small>
        </span>
        {installPrompt && <button type="button" onClick={install} className="pwa-install">Install</button>}
        {ios && <button type="button" onClick={() => setShowInstructions((value) => !value)} className="pwa-install"><Share size={14} /> Steps</button>}
        <button type="button" className="pwa-dismiss" aria-label="Dismiss install prompt" onClick={() => setDismissed(true)}><X size={15} /></button>
        {ios && showInstructions && <p className="pwa-install-help">In Safari, tap Share, choose <strong>Add to Home Screen</strong>, then tap Add.</p>}
      </div>
    </div>
  );
}
