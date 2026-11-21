import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Download, Share, Smartphone, Wifi, WifiOff, X } from 'lucide-react';

const NOTICE_DURATION = 3600;

export default function PWAStatus() {
  const [online, setOnline] = useState(() => typeof navigator === 'undefined' ? true : navigator.onLine);
  const [notice, setNotice] = useState(() => typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : null);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [ios, setIos] = useState(false);
  const previousOnline = useRef(typeof navigator === 'undefined' ? true : navigator.onLine);

  useEffect(() => {
    const standalone = window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
    setInstalled(Boolean(standalone));
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent) && !standalone);
    const onOnline = () => {
      if (previousOnline.current) return;
      previousOnline.current = true;
      setOnline(true);
      setNotice('online');
    };
    const onOffline = () => {
      if (!previousOnline.current) return;
      previousOnline.current = false;
      setOnline(false);
      setNotice('offline');
    };
    const onInstallPrompt = (event) => { event.preventDefault(); setInstallPrompt(event); };
    const onInstalled = () => { setInstalled(true); setInstallPrompt(null); setShowInstructions(false); };
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

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(null), NOTICE_DURATION);
    return () => window.clearTimeout(timer);
  }, [notice]);

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
  return (
    <>
      {notice && (
        <div className="connection-toast no-print" data-state={notice} role="status" aria-live="polite">
          {notice === 'offline' ? <WifiOff size={18} aria-hidden="true" /> : <Wifi size={18} aria-hidden="true" />}
          <span>
            <strong>{notice === 'offline' ? "You're offline" : "You're back online!"}</strong>
            <small>{notice === 'offline' ? 'Some features may be unavailable until your connection returns.' : 'Your internet connection has been restored.'}</small>
          </span>
          <button type="button" className="connection-toast-dismiss" aria-label="Dismiss connectivity notification" onClick={() => setNotice(null)}><X size={15} /></button>
        </div>
      )}
      {canShowInstall && (
        <div className="pwa-status no-print" role="region" aria-label="Install CNR-IA-2">
          <div className="pwa-status-message">
            {installed ? <CheckCircle2 size={16}/> : ios ? <Smartphone size={16}/> : <Download size={16}/>}
            <span><strong>{ios ? 'Add CNR ExamPrep to your Home Screen' : 'Install CNR ExamPrep'}</strong><small>{ios ? 'Use the Share menu in Safari for an app-like experience.' : 'Open your study workspace like an app.'}</small></span>
            {installPrompt && <button type="button" onClick={install} className="pwa-install">Install</button>}
            {ios && <button type="button" onClick={() => setShowInstructions((value) => !value)} className="pwa-install"><Share size={14}/> Steps</button>}
            <button type="button" className="pwa-dismiss" aria-label="Dismiss install prompt" onClick={() => setDismissed(true)}><X size={15}/></button>
            {ios && showInstructions && <p className="pwa-install-help">In Safari, tap Share, choose <strong>Add to Home Screen</strong>, then tap Add.</p>}
          </div>
        </div>
      )}
    </>
  );
}
