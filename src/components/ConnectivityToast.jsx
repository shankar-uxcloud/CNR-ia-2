import { useEffect, useRef, useState } from 'react';
import './ConnectivityToast.css';
import { Check, Wifi, WifiOff, X } from 'lucide-react';
import { CONNECTIVITY_NOTICE_DURATION, getConnectivityNotice } from '../lib/connectivity';

function readInitialOnlineState() {
  return typeof navigator === 'undefined' ? true : navigator.onLine;
}

export default function ConnectivityToast() {
  const onlineRef = useRef(readInitialOnlineState());
  const [notice, setNotice] = useState(() => (
    onlineRef.current ? null : { type: 'offline', id: 0 }
  ));
  const noticeId = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const showNotice = (type) => {
      noticeId.current += 1;
      setNotice({ type, id: noticeId.current });
    };

    const handleOnline = () => {
      const transition = getConnectivityNotice(onlineRef.current, true);
      if (!transition) return;
      onlineRef.current = true;
      showNotice(transition);
    };

    const handleOffline = () => {
      const transition = getConnectivityNotice(onlineRef.current, false);
      if (!transition) return;
      onlineRef.current = false;
      showNotice(transition);
    };

    // Reconcile a connectivity change that occurred between render and effect setup.
    if (typeof navigator !== 'undefined' && navigator.onLine !== onlineRef.current) {
      navigator.onLine ? handleOnline() : handleOffline();
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!notice) return undefined;
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setNotice((current) => current?.id === notice.id ? null : current);
      timerRef.current = null;
    }, CONNECTIVITY_NOTICE_DURATION);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [notice]);

  if (!notice) return null;

  const offline = notice.type === 'offline';
  const Icon = offline ? WifiOff : Wifi;

  return (
    <div
      className={`connectivity-toast connectivity-toast--${notice.type}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      key={notice.id}
    >
      <span className="connectivity-toast__icon" aria-hidden="true">
        {offline ? <Icon size={19} /> : <><Icon size={19} /><Check className="connectivity-toast__check" size={11} /></>}
      </span>
      <span className="connectivity-toast__copy">
        <strong>{offline ? "You're offline" : "You're back online!"}</strong>
        <small>
          {offline
            ? 'Some features may be unavailable until your connection returns.'
            : 'Your internet connection has been restored.'}
        </small>
      </span>
      <button
        type="button"
        className="connectivity-toast__dismiss"
        aria-label="Dismiss connectivity notification"
        onClick={() => setNotice(null)}
      >
        <X size={16} />
      </button>
    </div>
  );
}
