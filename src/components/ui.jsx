import { Check } from 'lucide-react';
import { MODULES } from '../data/questions';

export function Tip({ label, children }) {
  return (
    <span className="group/tip relative inline-flex">
      {children}
      <span role="tooltip" className="pointer-events-none absolute left-1/2 top-full z-50 max-sm:hidden mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-navy px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lift transition group-hover/tip:opacity-100 group-focus-within/tip:opacity-100">
        {label}
      </span>
    </span>
  );
}

export function IconBtn({ icon: Icon, label, onClick, active, className = '', text }) {
  return (
    <Tip label={label}>
      <button type="button" onClick={onClick} aria-label={label} aria-pressed={active === undefined ? undefined : !!active}
        className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium transition active:scale-95 ${active ? 'border-brand/50 bg-brand/10 text-brand' : 'border-line bg-panel text-ink hover:bg-sunk'} ${className}`}>
        <Icon size={18} aria-hidden="true" />{text && <span className="hidden sm:inline">{text}</span>}
      </button>
    </Tip>
  );
}

export const modColor = (m) => `rgb(var(--m${m}))`;

export function ModuleBadge({ m, long }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold" style={{ color: modColor(m), borderColor: `rgb(var(--m${m}) / .35)`, background: `rgb(var(--m${m}) / .09)` }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: modColor(m) }} />
      Module {m}{long && <span className="hidden font-medium sm:inline">· {MODULES[m].name}</span>}
    </span>
  );
}

export const MarksBadge = () => <span className="chip !text-ink">10 Marks</span>;

export function StatusChip({ done }) {
  return done ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand/12 px-2.5 py-1 text-xs font-semibold text-brand"><Check size={13} aria-hidden="true" />Completed</span>
  ) : (<span className="chip">Not completed</span>);
}

export function ProgressRing({ value, size = 150, stroke = 12, children }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }} role="img" aria-label={`${Math.round(value * 100)} percent complete`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--c-line))" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--c-brand))" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - value)} style={{ transition: 'stroke-dashoffset .9s cubic-bezier(.2,.7,.2,1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

export function Bar({ value, color = 'rgb(var(--c-brand))' }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-sunk" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full" style={{ width: `${value * 100}%`, background: color, transition: 'width .8s cubic-bezier(.2,.7,.2,1)' }} />
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6" aria-busy="true" aria-label="Loading">
      <div className="skeleton h-4 w-32" /><div className="skeleton h-10 w-3/4" /><div className="skeleton h-24 w-full" />
      {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-4" style={{ width: `${95 - i * 7}%` }} />)}
    </div>
  );
}

export function Empty({ icon: Icon, title, text, action }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-sunk text-mute"><Icon size={28} aria-hidden="true" /></div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-mute">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
