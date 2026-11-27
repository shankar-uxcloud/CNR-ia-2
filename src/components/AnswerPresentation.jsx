import { ListTree } from 'lucide-react';

export function AnswerPresentationSwitch({ value, onChange, className = '' }) {
  return (
    <div className={\`no-print flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-sunk px-4 py-3 sm:px-5 \${className}\`} role="group" aria-label="Choose answer presentation">
      <div className="flex min-w-0 items-center gap-2.5 text-sm font-bold text-ink">
        <ListTree size={18} className="shrink-0 text-brand" aria-hidden="true" />
        <span>Answer presentation</span>
      </div>
      <div className="inline-flex shrink-0 rounded-xl border border-line bg-panel p-1" role="group" aria-label="Presentation mode">
        <button type="button" onClick={() => onChange('original')} aria-pressed={value === 'original'}
          className={\`rounded-lg px-3.5 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-4 \${value === 'original' ? 'bg-brand/12 text-brand' : 'text-mute hover:text-ink'}\`}>
          Original
        </button>
        <button type="button" onClick={() => onChange('structured')} aria-pressed={value === 'structured'}
          className={\`rounded-lg px-3.5 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-4 \${value === 'structured' ? 'bg-brand/12 text-brand' : 'text-mute hover:text-ink'}\`}>
          Structured
        </button>
      </div>
    </div>
  );
}

export function StructuredSectionCard({ number, title, children, className = '' }) {
  return (
    <section className={\`answer-structured-section overflow-hidden rounded-2xl border border-line bg-panel p-4 shadow-soft sm:p-5 \${className}\`}>
      <div className="mb-3 flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/12 text-xs font-extrabold tabular-nums text-brand">{String(number).padStart(2, '0')}</span>
        <h3 className="min-w-0 pt-1 text-base font-bold leading-snug text-ink">{title}</h3>
      </div>
      <div className="min-w-0 border-l-2 border-brand/20 pl-4 sm:pl-5">{children}</div>
    </section>
  );
}
