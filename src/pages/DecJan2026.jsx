import { ArrowLeft, BookOpen, CalendarDays, CheckCircle2, FileText, GraduationCap } from 'lucide-react';

const sections = [
  {
    title: 'Ecological importance of land',
    marks: '5 marks',
    points: [
      ['Habitat for biodiversity', 'Land provides natural habitats for plants, animals and microorganisms. Forests, grasslands and other terrestrial ecosystems support different forms of life.'],
      ['Nutrient cycling', 'Land and its soil support the decomposition of dead plants and animals. This releases nutrients back into the soil, which are reused by plants for their growth.'],
      ['Water regulation', 'Land helps rainwater infiltrate into the ground and recharge groundwater. Healthy land and vegetation also reduce surface runoff and help control floods.'],
      ['Carbon sequestration', 'Forests and vegetation on land absorb carbon dioxide and store carbon. This helps reduce greenhouse gases and regulate climate.'],
      ['Erosion control', 'Plant roots hold soil particles together and reduce soil erosion caused by wind and water. This helps maintain land stability and soil fertility.'],
    ],
  },
  {
    title: 'Economic importance of land',
    marks: '5 marks',
    points: [
      ['Agricultural productivity', 'Fertile land is essential for growing crops and supporting livestock. It provides the basic resource for agricultural production.'],
      ['Food security', 'Productive agricultural land helps provide sufficient food for the population and supports a stable food supply.'],
      ['Livelihoods and rural economies', 'Agriculture, forestry, grazing and other land-based activities provide employment and income to rural communities.'],
      ['Ecosystem services and carbon markets', 'Land provides services such as pollination, clean water, soil fertility and carbon storage. Carbon stored in forests and vegetation can also support carbon-market activities.'],
      ['Land value and real estate', 'Land is an important economic asset. It is used for houses, commercial buildings, industries, roads and other infrastructure, and contributes to real-estate development.'],
    ],
  },
];

function AnswerSection({ section, number }) {
  return <section className="card p-5 sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 className="text-xl font-bold">{number}. {section.title}</h2>
      <span className="chip">{section.marks}</span>
    </div>
    <ol className="mt-4 space-y-4">
      {section.points.map(([title, detail], index) => <li key={title} className="flex gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand/10 text-sm font-bold text-brand">{index + 1}</span>
        <div className="min-w-0"><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-7 text-mute">{detail}</p></div>
      </li>)}
    </ol>
  </section>;
}

export default function DecJan2026() {
  return <main className="mx-auto max-w-5xl px-4 py-7 sm:px-8 sm:py-10">
    <a href="#/mqps" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-brand"><ArrowLeft size={16}/> Question papers</a>
    <div className="flex flex-wrap items-center gap-2">
      <span className="chip"><CalendarDays size={14}/> December 2025 / January 2026</span>
      <span className="chip">BCV755B</span>
      <span className="chip">Module 1 · Land</span>
    </div>
    <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">VTU Question Paper with Answers</h1>
    <p className="mt-3 max-w-3xl leading-7 text-mute">Conservation of Natural Resources — exam-oriented answers with module mapping and source references. Answers are being added question by question.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      <div className="card p-4"><GraduationCap className="text-brand" size={20}/><p className="mt-2 text-xs text-mute">Course</p><strong>BCV755B</strong></div>
      <div className="card p-4"><FileText className="text-brand" size={20}/><p className="mt-2 text-xs text-mute">Answer format</p><strong>10-mark answers</strong></div>
      <div className="card p-4"><CheckCircle2 className="text-brand" size={20}/><p className="mt-2 text-xs text-mute">Progress</p><strong>Question 1 added</strong></div>
    </div>
    <section className="mt-8">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 font-bold text-brand">Q1</span>
        <div><p className="eyebrow">10 MARKS · MODULE 1: LAND</p><h2 className="mt-1 text-xl font-bold leading-snug">Discuss the ecological and economic importance of land as a natural resource.</h2></div>
      </div>
      <div className="reading mt-5 space-y-5">
        <section className="card p-5 sm:p-6">
          <h2 className="text-xl font-bold">Introduction</h2>
          <p className="mt-2 text-sm leading-7 text-mute">Land is a basic and valuable natural resource. It provides space and support for natural ecosystems as well as human activities. It is essential for maintaining ecological balance, agriculture, industries and human development. Its importance can be explained under two headings.</p>
        </section>
        {sections.map((section, index) => <AnswerSection key={section.title} section={section} number={index === 0 ? 'A' : 'B'}/>)}
        <section className="card p-5 sm:p-6">
          <h2 className="text-xl font-bold">Conclusion</h2>
          <p className="mt-2 text-sm leading-7 text-mute">Land is important for both ecological stability and economic development. It supports biodiversity, nutrient cycling, water regulation and climate balance, while also providing food, employment, raw materials and space for infrastructure. Therefore, land must be used wisely and conserved for present and future generations.</p>
        </section>
      </div>
    </section>
    <section className="mt-8 card p-5 sm:p-6">
      <div className="flex items-center gap-2"><BookOpen size={19} className="text-brand"/><h2 className="text-lg font-bold">Source references and evaluation guidance</h2></div>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-mute">
        <li><strong className="text-[var(--text-primary)]">BCV755B Full Notes.pdf — PDF page 2:</strong> Land as a Resource; ecological value, habitats, climate and water-cycle regulation; economic value, agriculture, raw materials and infrastructure.</li>
        <li><strong className="text-[var(--text-primary)]">BCV755B Full Notes.pdf — PDF page 3:</strong> Conservation of landforms; vegetation, afforestation and soil-erosion control.</li>
        <li><strong className="text-[var(--text-primary)]">BCV755B Full Notes.pdf — PDF page 9:</strong> Ecosystem services including pollination, clean water, carbon sequestration and soil fertility.</li>
        <li><strong className="text-[var(--text-primary)]">Evaluation scheme supplied with Q1:</strong> 5 marks for ecological importance and 5 marks for economic importance, with short explanations under each point.</li>
      </ul>
      <div className="mt-4 rounded-xl border border-line bg-sunk/50 p-4 text-sm leading-6 text-mute"><strong className="text-[var(--text-primary)]">Diagram:</strong> No specific diagram or numbered figure is required for this question in the supplied notes or marking-scheme image. A simple two-branch flowchart (Ecological / Economic) may be drawn as an optional presentation aid. No source figure number is claimed.</div>
      <p className="mt-3 text-xs leading-5 text-mute">Page references above are PDF viewer page numbers. The uploaded full-notes PDF does not provide a numbered figure for this answer. Carbon markets are retained from the supplied evaluation points; this topic is not separately detailed in the uploaded notes.</p>
    </section>
    <div className="mt-8 rounded-2xl border border-line p-5 text-sm text-mute"><strong className="text-[var(--text-primary)]">Next:</strong> Additional December 2025 / January 2026 questions will be added to their corresponding modules as their answers are prepared and source-checked.</div>
  </main>;
}
