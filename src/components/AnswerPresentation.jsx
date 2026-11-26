import { Check, ListTree } from 'lucide-react';

export function AnswerPresentationSwitch({ value, onChange, className = '' }) {
  return (
    <div className={`no-print flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-sunk p-3 ${className}`} role="group" aria-label="Choose answer presentation">
      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
        <ListTree size={16} className="text-brand" aria-hidden="true" />
        <span>Answer presentation</span>
      </div>
      <div className="inline-flex rounded-lg border border-line bg-panel p-1">
        <button type="button" onClick={() => onChange('original')} aria-pressed={value === 'original'}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition ${value === 'original' ? 'bg-brand/12 text-brand' : 'text-mute hover:text-ink'}`}>
          Original
        </button>
        <button type="button" onClick={() => onChange('structured')} aria-pressed={value === 'structured'}
          className={`rounded-md px-3 py-2 text-sm font-semibold transition ${value === 'structured' ? 'bg-brand/12 text-brand' : 'text-mute hover:text-ink'}`}>
          Structured
        </button>
      </div>
    </div>
  );
}

export function StructuredSectionCard({ number, title, children, className = '' }) {
  return (
    <section className={`answer-structured-section overflow-hidden rounded-2xl border border-line bg-panel p-4 shadow-soft sm:p-5 ${className}`}>
      <div className="mb-3 flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/12 text-xs font-extrabold tabular-nums text-brand">{String(number).padStart(2, '0')}</span>
        <h3 className="min-w-0 pt-1 text-base font-bold leading-snug text-ink">{title}</h3>
      </div>
      <div className="min-w-0 border-l-2 border-brand/20 pl-4 sm:pl-5">{children}</div>
    </section>
  );
}
