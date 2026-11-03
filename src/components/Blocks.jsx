import { Fragment } from 'react';
import { Info, AlertCircle, Lightbulb, Key } from 'lucide-react';
import DiagramFrame from './DiagramFrame';

export function Inline({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith('**') ? <strong key={i} className="kw">{p.slice(2, -2)}</strong> : <Fragment key={i}>{p}</Fragment>);
}

const NOTE = {
  added: { Icon: Info, label: 'Additional explanation – not stated in your notes', cls: 'border-cyan2/40 bg-cyan2/8' },
  gap: { Icon: AlertCircle, label: 'Gap in the source notes', cls: 'border-[rgb(var(--m3)/.5)] bg-[rgb(var(--m3)/.08)]' },
  tip: { Icon: Lightbulb, label: 'Tip', cls: 'border-brand/40 bg-brand/8' },
};

export function Block({ b }) {
  switch (b.type) {
    case 'p': return <p><Inline text={b.text} /></p>;
    case 'list': {
      const Tag = b.ordered ? 'ol' : 'ul';
      return <Tag className={b.ordered ? 'num' : 'dot'}>{b.items.map((it, i) => <li key={i}><Inline text={it} /></li>)}</Tag>;
    }
    case 'table':
      return (
        <div className="my-5 overflow-x-auto rounded-xl border border-line bg-panel">
          <table><thead><tr>{b.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}><Inline text={c} /></td>)}</tr>)}</tbody></table>
        </div>
      );
    case 'eq':
      return (
        <div className="eq avoid-break my-4 overflow-x-auto rounded-xl border border-line bg-sunk px-5 py-4">
          {b.title && <div className="mb-2 font-sans text-xs font-semibold uppercase tracking-wide text-mute">{b.title}</div>}
          {b.lines.map((l, i) => <div key={i} className="whitespace-pre-wrap leading-8">{l}</div>)}
        </div>
      );
    case 'diagram': return <DiagramFrame id={b.id} caption={b.caption} />;
    case 'note': {
      const n = NOTE[b.kind] || NOTE.tip;
      return (
        <aside className={`avoid-break my-4 flex gap-3 rounded-xl border px-4 py-3 font-sans text-[.82em] leading-relaxed ${n.cls}`}>
          <n.Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <div><div className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-mute">{n.label}</div><Inline text={b.text} /></div>
        </aside>
      );
    }
    case 'key':
      return (
        <aside className="avoid-break my-5 rounded-xl border-l-4 border-brand bg-brand/8 px-5 py-3.5 font-sans text-[.9em] leading-relaxed">
          <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-brand"><Key size={14} aria-hidden="true" />{b.title}</div>
          <Inline text={b.text} />
        </aside>
      );
    default: return null;
  }
}

export const Blocks = ({ blocks }) => blocks.map((b, i) => <Block key={i} b={b} />);
