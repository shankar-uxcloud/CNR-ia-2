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
      <div className="card p-4"><CheckCircle2 className="text-brand" size={20}/><p className="mt-2 text-xs text-mute">Progress</p><strong>Questions 1 and 1(b) added</strong></div>
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

    <section className="mt-10 border-t border-line pt-8">
      <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 font-bold text-brand">Q1(b)</span><div><p className="eyebrow">10 MARKS · MODULE 1: LAND</p><h2 className="mt-1 text-xl font-bold leading-snug">What are the objectives of conservation of landforms? Explain the strategies to conserve landforms.</h2></div></div>
      <div className="reading mt-5 space-y-5">
        <section className="card p-5 sm:p-6"><h2 className="text-xl font-bold">Introduction</h2><p className="mt-2 text-sm leading-7 text-mute">Landforms are the natural physical features of the Earth's surface, such as mountains, valleys, plains and coastal dunes. Conservation of landforms means protecting and managing these features to maintain geological stability, prevent erosion and reduce the risk of natural disasters.</p></section>
        <section className="card p-5 sm:p-6"><h2 className="text-xl font-bold">A. Objectives of conservation of landforms</h2><p className="mt-2 text-xs text-mute">The source notes state the overall purpose rather than listing separate objectives. The following objectives are organised from that stated purpose and the conservation measures described in the notes.</p><ol className="mt-4 space-y-4">{[
          ['Maintain geological stability','Protect mountains, hills, valleys, plains and other natural features from excessive disturbance and degradation.'],
          ['Prevent soil erosion','Reduce the removal of fertile topsoil by wind and water and protect the natural structure of the land.'],
          ['Prevent natural disasters','Reduce erosion-related problems, unstable slopes, riverbank erosion and coastal degradation.'],
          ['Protect river and coastal features','Conserve riverbanks and coastal dunes from damage caused by floodwater and wind.'],
          ['Prevent land degradation and maintain ecosystem health','Protect the relationship between land and water systems, reduce sediment movement into rivers and maintain watershed health.'],
        ].map(([title,detail],i)=><li key={title} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand/10 text-sm font-bold text-brand">{i+1}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-7 text-mute">{detail}</p></div></li>)}</ol></section>
        <section className="card p-5 sm:p-6"><h2 className="text-xl font-bold">B. Strategies to conserve landforms</h2><div className="mt-4 space-y-5">
          <div><h3 className="font-semibold">1. Soil erosion control</h3><p className="mt-1 text-sm leading-7 text-mute">This is the most common form of landform conservation.</p><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-mute"><li><strong className="text-[var(--text-primary)]">Terracing:</strong> Steep slopes are converted into a series of flat steps. This reduces the speed of water runoff and helps prevent soil erosion.</li><li><strong className="text-[var(--text-primary)]">Contour ploughing:</strong> Ploughing is carried out along the contour lines of a slope. The ridges slow down water flow and reduce soil loss.</li><li><strong className="text-[var(--text-primary)]">Afforestation and reforestation:</strong> Trees and vegetation are planted so their roots anchor the soil and prevent erosion by wind and water.</li></ul></div>
          <div><h3 className="font-semibold">2. River and coastal protection</h3><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-mute"><li><strong className="text-[var(--text-primary)]">Riprap:</strong> Large stones are placed along vulnerable riverbanks to protect the soil from the force of floodwater and flowing water.</li><li><strong className="text-[var(--text-primary)]">Bioengineering:</strong> Vegetation and biological methods are used to stabilize riverbank soil and reduce erosion.</li><li><strong className="text-[var(--text-primary)]">Coastal dune protection:</strong> Hardy grasses are planted on coastal dunes. They trap and hold sand, preventing wind erosion and inland sand movement.</li></ul></div>
          <div><h3 className="font-semibold">3. Watershed management</h3><p className="mt-1 text-sm leading-7 text-mute">Watershed management involves integrated planning for a particular river basin to manage water resources and prevent land degradation. It includes reducing sediment flow into rivers and maintaining the health of the entire land-water system.</p></div>
        </div></section>
        <section className="card p-5 sm:p-6"><h2 className="text-xl font-bold">Quick revision diagram – landform conservation strategies</h2><div className="mt-4 rounded-xl border border-line p-3 text-center"><div className="mx-auto max-w-xs rounded-lg bg-brand/10 p-3 font-bold text-brand">CONSERVATION OF LANDFORMS</div><div className="mx-auto h-5 w-px bg-[var(--border-color)]"/><div className="grid gap-2 sm:grid-cols-3">{[['Soil erosion control','Terracing · Contour ploughing · Afforestation'],['River & coastal protection','Riprap · Bioengineering · Dune grasses'],['Watershed management','River-basin planning · Reduce sediment flow']].map(([head,detail])=><div key={head} className="rounded-lg border border-line bg-sunk/50 p-3"><div className="font-semibold text-sm">{head}</div><p className="mt-2 text-xs leading-5 text-mute">{detail}</p></div>)}</div></div><p className="mt-3 text-xs text-mute">Original revision flowchart based on the three strategy headings in the notes; not a numbered figure reproduced from the PDF.</p></section>
        <section className="card p-5 sm:p-6"><h2 className="text-xl font-bold">Conclusion</h2><p className="mt-2 text-sm leading-7 text-mute">Conservation of landforms is essential for maintaining geological stability, preventing natural disasters and protecting the environment. Terracing, contour ploughing, afforestation, river and coastal protection, and watershed management help conserve landforms for present and future generations.</p></section>
      </div>
      <section className="mt-5 card p-5 sm:p-6"><h2 className="text-lg font-bold">Q1(b) – Source references</h2><ul className="mt-3 space-y-2 text-sm leading-6 text-mute"><li><strong className="text-[var(--text-primary)]">BCV755B Full Notes.pdf — PDF viewer page 3 of 57:</strong> Exact heading “Conservation of Landforms”; examples of landforms, stated purpose (geological stability and prevention of natural disasters), and all three strategies.</li><li><strong className="text-[var(--text-primary)]">Page 3 — soil erosion control:</strong> Terracing, contour ploughing, afforestation and reforestation.</li><li><strong className="text-[var(--text-primary)]">Page 3 — river/coastal protection and watershed management:</strong> Riprap, bioengineering, hardy grasses on coastal dunes, integrated river-basin planning and reducing sediment flow.</li></ul><div className="mt-4 rounded-xl border border-line bg-sunk/50 p-4 text-sm leading-6 text-mute"><strong className="text-[var(--text-primary)]">Figure/diagram guidance:</strong> The source PDF page does not contain a numbered figure for this topic. No source figure number or figure name is available. The revision flowchart is an optional student-drawn summary, not a source figure.</div><p className="mt-3 text-xs leading-5 text-mute">The PDF explains the conservation purpose and strategies but does not provide a separately numbered list of objectives or an official question-specific evaluation split. Objectives above are a structured explanation derived from the source's stated purpose and methods. Confirm any official mark split against the Q1(b) scheme.</p></section>
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
