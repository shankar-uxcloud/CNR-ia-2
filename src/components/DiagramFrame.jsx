import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Shapes } from 'lucide-react';
import { DIAGRAMS } from '../diagrams';
import { DgCtx } from '../diagrams/kit';

function Modal({ d, uid, onClose }) {
  const [z, setZ] = useState(1);
  const closeRef = useRef(null);
  useEffect(() => {
    closeRef.current?.focus();
    const key = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', key);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = prev; };
  }, [onClose]);
  const btn = 'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-panel hover:bg-sunk';
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-2 sm:p-6 no-print" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={`${d.title} – enlarged`} className="flex max-h-full w-full max-w-[1280px] flex-col overflow-hidden rounded-2xl border border-line bg-[var(--dg-bg)] shadow-lift animate-rise">
        <div className="flex items-center justify-between gap-2 border-b border-line bg-panel px-4 py-2.5">
          <h3 className="truncate text-sm font-semibold">{d.title}</h3>
          <div className="flex items-center gap-1.5">
            <button className={btn} onClick={() => setZ((v) => Math.max(1, +(v - 0.25).toFixed(2)))} aria-label="Zoom out"><ZoomOut size={16} /></button>
            <span className="w-12 text-center text-xs tabular-nums text-mute" aria-live="polite">{Math.round(z * 100)}%</span>
            <button className={btn} onClick={() => setZ((v) => Math.min(2.5, +(v + 0.25).toFixed(2)))} aria-label="Zoom in"><ZoomIn size={16} /></button>
            <button className={btn} onClick={() => setZ(1)} aria-label="Reset zoom"><RotateCcw size={16} /></button>
            <button ref={closeRef} className={btn} onClick={onClose} aria-label="Close enlarged diagram"><X size={18} /></button>
          </div>
        </div>
        <div className="overflow-auto p-3 sm:p-6">
          <div style={{ width: `max(${z * 100}%, ${z * 820}px)` }}>
            <DgCtx.Provider value={uid + 'z'}><d.Component /></DgCtx.Provider>
          </div>
        </div>
      </div>
    </div>, document.body);
}

export default function DiagramFrame({ id, caption }) {
  const d = DIAGRAMS[id];
  const uid = useId().replace(/:/g, '');
  const [zoom, setZoom] = useState(false);
  const trigger = useRef(null);
  if (!d) return null;
  const close = () => { setZoom(false); trigger.current?.focus(); };
  return (
    <figure className="diagram-frame avoid-break my-6 overflow-hidden rounded-2xl border border-line bg-[var(--dg-bg)] shadow-soft font-sans">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5 no-print-border">
        <div className="flex min-w-0 items-center gap-2 text-xs font-semibold uppercase tracking-wide text-mute"><Shapes size={14} aria-hidden="true" /><span className="truncate">Diagram · {d.title}</span></div>
        <button ref={trigger} onClick={() => setZoom(true)} className="no-print inline-flex items-center gap-1.5 rounded-lg border border-line bg-panel px-2.5 py-1.5 text-xs font-medium hover:bg-sunk"><Maximize2 size={14} aria-hidden="true" />Enlarge</button>
      </div>
      <div className="overflow-x-auto"><div className="min-w-[600px] p-3 sm:p-5"><DgCtx.Provider value={uid}><d.Component /></DgCtx.Provider></div></div>
      <figcaption className="border-t border-line px-4 py-3 text-[13px] leading-relaxed text-mute">{caption}<span className="no-print mt-1 block text-[11px] sm:hidden">Swipe sideways to pan, or tap Enlarge.</span></figcaption>
      {zoom && <Modal d={d} uid={uid} onClose={close} />}
    </figure>
  );
}
