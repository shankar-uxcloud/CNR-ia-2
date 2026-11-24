import { buildFiveMarkStructure } from '../lib/fiveMarkStructure';
export default function FiveMarkStructure({ item }) {
  const structure = buildFiveMarkStructure(item);
  if (!structure.branches.length) return null;
  return (
    <figure className="five-mark-structure my-5" aria-label="Visual structure of this five-mark answer">
      <figcaption className="five-mark-structure-label">Answer structure at a glance</figcaption>
      <div className="five-mark-structure-root">{structure.title}</div>
      <div className="five-mark-structure-trunk" aria-hidden="true" />
      <div className="five-mark-structure-branches">
        {structure.branches.map((branch) => (
          <section className="five-mark-structure-branch" key={branch.id}>
            <div className="five-mark-structure-branch-title">
              <span className="five-mark-structure-number">{branch.number}</span>
              <span>{branch.title}</span>
            </div>
            <ul className="five-mark-structure-nodes">
              {branch.nodes.map((node, index) => <li key={index}>{node}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </figure>
  );
}
