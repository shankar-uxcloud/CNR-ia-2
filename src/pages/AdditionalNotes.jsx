import { useMemo, useState } from 'react';
import { Search, ChevronDown, BookOpen, Leaf, Sprout, Layers3 } from 'lucide-react';

const NOTES = [
  {
    id: 'm4-q4', no: 4, title: 'Ecosystem: Components and Functions',
    question: 'Define an ecosystem and explain its biotic and abiotic components. Describe the roles of producers, consumers and decomposers, and discuss the major functions of an ecosystem.',
    sections: [
      ['Definition', ['An ecosystem is a functional unit in which living organisms interact with one another and with the non-living environment.', 'Examples include forests, ponds, deserts and oceans.']],
      ['Components of an ecosystem', ['Abiotic components: sunlight, air, water, soil, minerals, temperature and rainfall. They determine the physical and chemical conditions in which organisms live.', 'Biotic components: living organisms, commonly grouped as producers, consumers and decomposers.', 'Producers: green plants and algae capture solar energy and manufacture food through photosynthesis.', 'Consumers: organisms that obtain energy by eating plants or other organisms. They include herbivores, carnivores and omnivores.', 'Decomposers: bacteria and fungi break down dead organisms and organic wastes, returning nutrients to the environment.']],
      ['Functions of an ecosystem', ['Energy flow: energy enters mainly as sunlight and passes from producers to consumers through food chains and food webs. Energy flow is unidirectional, and some energy is lost as heat at each transfer.', 'Nutrient cycling: carbon, nitrogen, phosphorus, oxygen and water circulate between organisms and the environment.', 'Climate regulation: forests and oceans absorb carbon dioxide; vegetation influences temperature, humidity and rainfall.', 'Soil formation and fertility: decomposition adds nutrients to soil, while plant roots help reduce erosion.', 'Biodiversity support: ecosystems provide habitats and resources for plants, animals and microorganisms.', 'Cultural and recreational value: natural ecosystems provide scenic, educational, recreational and cultural benefits.']]
    ],
    conclusion: 'Biotic and abiotic components are interdependent. Their interactions maintain ecosystem productivity, stability and ecological balance.'
  },
  {
    id: 'm4-q5', no: 5, title: 'Energy Flow, Food Chains and Food Webs',
    question: 'Explain energy flow in an ecosystem with suitable diagrams. Describe food chains and food webs, highlighting the roles of producers, consumers and decomposers with examples.',
    sections: [
      ['Energy flow', ['The main source of energy for most ecosystems is the Sun.', 'Producers such as green plants and algae capture sunlight through photosynthesis and convert it into chemical energy.', 'Primary consumers (herbivores) obtain energy by feeding on producers.', 'Secondary and higher-level consumers obtain energy by feeding on other consumers.', 'Decomposers, including bacteria and fungi, break down dead organisms and wastes, recycling nutrients.', 'Energy flow is unidirectional: Sun → producers → consumers. Some energy is lost as heat during each transfer, so less energy is available at higher trophic levels.']],
      ['Food chain', ['A food chain is a simple, linear pathway showing how food and energy pass from one organism to another.', 'Example: Grass → Deer → Tiger. Grass is the producer, deer is the primary consumer, and tiger is the secondary consumer.']],
      ['Food web', ['A food web is a network of interconnected food chains in an ecosystem.', 'An organism may feed on several species and may itself be eaten by more than one predator. Food webs represent feeding relationships more realistically than a single food chain.']],
      ['Importance', ['Shows feeding relationships and the transfer of energy between trophic levels.', 'Helps explain population relationships and ecosystem balance.', 'Demonstrates that changes in one species can affect other species connected to it.', 'Connects energy flow with nutrient cycling and the role of decomposers.']]
    ],
    diagram: 'Sun → Grass → Grasshopper → Frog → Snake. Label grass as producer, grasshopper as primary consumer, frog as secondary consumer and snake as a higher consumer. Draw arrows in the direction of energy transfer.',
    conclusion: 'Energy flows in one direction, while nutrients are recycled. Food chains and food webs help explain ecosystem structure and function.'
  },
  {
    id: 'm4-q6', no: 6, title: 'Ecological Restoration and Social Forestry',
    question: 'Explain the objectives and methods of ecological restoration and social forestry. Discuss their benefits for biodiversity conservation, soil protection, local communities and livelihoods.',
    sections: [
      ['A. Ecological restoration — meaning', ['Ecological restoration is the process of assisting the recovery of ecosystems that have been degraded, damaged or destroyed by human activities or natural disturbances.']],
      ['Objectives', ['Conserve and enhance biodiversity by restoring native species and ecological interactions.', 'Recover ecosystem services such as carbon storage, water purification, soil stabilisation and pollination.', 'Rehabilitate degraded forests, wetlands, grasslands and other habitats.', 'Improve ecosystem resilience and its ability to cope with environmental stress.']],
      ['Methods / techniques', ['Reforestation and planting native vegetation.', 'Wetland, grassland and habitat rehabilitation.', 'Reintroduction of suitable native species where appropriate.', 'Control of invasive species.', 'Soil conservation, erosion control, water management and pollution control.', 'Site assessment, involvement of local stakeholders, monitoring and long-term maintenance.']],
      ['Benefits of restoration', ['Can improve biodiversity, soil fertility, water quality, carbon sequestration and habitat connectivity.', 'Success depends on appropriate planning, resources, monitoring and community involvement.']],
      ['B. Social forestry', ['Social forestry involves planting and managing trees on community and non-forest lands, with the participation of local people.', 'It aims to meet local needs for fuelwood, fodder and timber while increasing green cover.', 'It supplies useful products, improves green cover, can reduce pressure on natural forests, helps protect soil and reduce erosion, supports employment and livelihoods, and encourages shared community responsibility.']]
    ],
    conclusion: 'Ecological restoration repairs damaged ecosystems, while social forestry links tree planting and resource management with local needs and livelihoods.'
  },
  {
    id: 'm4-q7', no: 7, title: 'Economic Values of Biodiversity',
    question: 'Discuss the economic values of biodiversity with examples from medicinal plants and drugs, fisheries, agriculture, forestry and tourism. Explain its contribution to ecosystem services and biogeochemical cycles.',
    sections: [
      ['Medicinal plants and drugs', ['Many traditional and modern medicines use compounds obtained from plants.', 'Examples in the notes: neem is used for antiseptic and antibacterial purposes; tulsi is traditionally used for respiratory complaints; turmeric is known for anti-inflammatory properties.', 'The notes also give aspirin and willow bark, and quinine and the Cinchona tree, as examples of plant-related medicinal resources.']],
      ['Agriculture and genetic resources', ['Biodiversity supplies genetic material for crop improvement, disease resistance and adaptation.', 'Different varieties of rice, wheat and millets, including useful traits from wild relatives, support agricultural resilience.']],
      ['Forestry', ['Forests provide timber, fuelwood, medicinal plants, food and fodder.', 'Examples include teak and sandalwood as timber resources. Sustainable management is necessary to prevent depletion and habitat damage.']],
      ['Fisheries and aquaculture', ['Marine and freshwater biodiversity supports fish and seafood production, food security, employment and income.', 'Coastal aquaculture may include shrimp, fish and crab farming; inland aquaculture includes freshwater fish farming.', 'Fish and seafood exports contribute to the economy.']],
      ['Tourism and recreation', ['Forests, wildlife sanctuaries, wetlands and scenic landscapes attract visitors and support nature-based tourism and local livelihoods.']],
      ['Ecosystem services and biogeochemical cycles', ['Plants absorb carbon dioxide and release oxygen through photosynthesis.', 'Microorganisms decompose organic matter and release nutrients into soil.', 'Biodiversity supports pollination, soil fertility, water quality, climate regulation and nutrient cycling.']]
    ],
    conclusion: 'Biodiversity has both market value and essential indirect value. Its conservation supports livelihoods, long-term economic activity and healthy ecosystems.'
  },
  {
    id: 'm4-q8', no: 8, title: 'Types of Ecosystems',
    question: 'Describe the major types of ecosystems—forest, grassland, desert, marine, wetland, estuarine, lotic and lentic ecosystems—with their main characteristics and examples.',
    sections: [
      ['Terrestrial ecosystems', ['Forest ecosystem: dense vegetation, high biodiversity and significant carbon storage. Example: tropical forests of the Western Ghats.', 'Grassland ecosystem: dominated by grasses, usually with fewer trees; supports grazing animals and their predators. Example: savannah grasslands.', 'Desert ecosystem: low rainfall, extreme temperatures and drought-resistant organisms. Example: Thar Desert.']],
      ['Aquatic ecosystems', ['Marine ecosystem: saltwater environments, including oceans and coral reefs. They support diverse marine life and fisheries.', 'Wetland ecosystem: land saturated or covered with water for all or part of the year. Wetlands are productive habitats for many plants, fish and birds. Examples include marshes and mangroves.', 'Estuarine ecosystem: areas where freshwater mixes with seawater. They are nutrient-rich and support diverse organisms. Example: Sundarbans estuarine region.', 'Lotic ecosystem: flowing-water systems such as rivers and streams.', 'Lentic ecosystem: still or standing-water systems such as lakes and ponds.']],
      ['Urban ecosystems', ['Urban ecosystems include parks, gardens, green spaces and urban forests modified by human activity.', 'They can provide air purification, carbon storage and recreation, but may face pollution and habitat fragmentation.']],
      ['Importance of ecosystems', ['Provide food, water, timber and other resources.', 'Regulate climate and help control floods and water flows.', 'Support biodiversity and provide habitats.', 'Maintain soil formation, fertility and nutrient cycling.', 'Provide cultural, educational and recreational benefits.']]
    ],
    conclusion: 'Each ecosystem has distinctive environmental conditions and species. Conserving different ecosystem types is important for biodiversity, ecological balance and human well-being.'
  },
  {
    id: 'm4-q9', no: 9, title: 'Biodiversity in India: Flora, Fauna and Hotspots',
    question: 'Discuss India’s biodiversity with reference to its flora, fauna and biodiversity hotspots. Explain the importance of conserving India’s biological wealth.',
    sections: [
      ['Biodiversity wealth of India', ['The uploaded notes give approximate figures of 47,000 plant species and 91,000 animal species. These are the estimates presented in the source notes.']],
      ['Factors supporting biodiversity', ['Tropical climate and monsoon rainfall patterns.', 'Varied topography, including mountains, plains, deserts and coastal areas.', 'Different habitats such as rainforests, deciduous forests, mangroves, grasslands, deserts, rivers and wetlands.']],
      ['Flora of India', ['Tropical rainforests: dense, multi-layered vegetation and high rainfall; examples include the Western Ghats and Andaman and Nicobar Islands.', 'Tropical deciduous forests: trees shed leaves during the dry season; sal forests are an example.', 'Mangroves: salt-tolerant coastal trees that protect shorelines and support aquatic life; example: Sundarbans.', 'Grasslands: grass-dominated habitats that support herbivores and predators.', 'Desert vegetation: drought-resistant plants adapted to low rainfall.']],
      ['Fauna of India', ['Indian fauna includes mammals such as tigers, elephants, lions, leopards and deer; birds such as peacocks and hornbills; reptiles such as king cobras and gharials; amphibians, fishes and many insects.', 'Animals play roles as pollinators, predators, prey and other participants in ecosystem processes.']],
      ['Biodiversity hotspots mentioned in the notes', ['Western Ghats: rich in amphibians, reptiles and medicinal plants.', 'Eastern Himalayas: includes many endemic plants and species such as the red panda and snow leopard.', 'Indo-Burma region: includes tropical forests and freshwater-fish diversity.', 'Sundaland / Nicobar Islands: includes coral reefs, mangroves and distinctive flora and fauna.']],
      ['Importance of conservation', ['Conservation protects habitats and threatened species, maintains food chains and nutrient cycling, safeguards soil and water, and preserves resources and natural heritage for future generations.']]
    ],
    conclusion: 'India’s varied climate, landforms and habitats support rich flora and fauna. Protecting forests, wetlands, grasslands and biodiversity hotspots is essential for ecological balance and sustainable livelihoods.'
  }
];

export default function AdditionalNotes() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState('m4-q4');
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return NOTES.filter((note) => !term || [note.title, note.question, ...note.sections.flatMap((s) => [s[0], ...s[1]])].join(' ').toLowerCase().includes(term));
  }, [search]);

  return <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-10">
    <p className="eyebrow">Supplementary study library · Module 4</p>
    <h1 className="mt-1 text-3xl font-bold tracking-tight">Additional Source Notes</h1>
    <p className="mt-2 max-w-3xl text-mute">Six supplementary 10-mark topics from the uploaded Module 4 consolidated question bank. These are kept separate from the main 10-question collection.</p>
    <div className="mt-5 flex items-center gap-3 rounded-2xl border border-line bg-panel px-4">
      <Search size={17} className="shrink-0 text-mute"/>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search additional notes…" aria-label="Search additional notes" className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-mute"/>
    </div>
    <div className="mt-4 flex flex-wrap gap-2 text-xs text-mute"><span className="rounded-full bg-sunk px-3 py-1.5">Module 4</span><span className="rounded-full bg-sunk px-3 py-1.5">Q4–Q9 in source question bank</span><span className="rounded-full bg-sunk px-3 py-1.5">10 marks each in source</span></div>
    <div className="mt-5 space-y-3">
      {filtered.map((note) => {
        const open = expanded === note.id;
        return <article key={note.id} className="card overflow-hidden">
          <button onClick={() => setExpanded(open ? '' : note.id)} aria-expanded={open} className="flex w-full items-start gap-3 p-4 text-left sm:p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-sm font-bold text-brand">Q{String(note.no).padStart(2,'0')}</span>
            <span className="min-w-0 flex-1"><span className="block font-semibold">{note.title}</span><span className="mt-1 block text-sm leading-6 text-mute">{note.question}</span></span>
            <ChevronDown size={18} className={`mt-1 shrink-0 text-mute transition-transform ${open ? 'rotate-180' : ''}`}/>
          </button>
          {open && <div className="border-t border-line px-4 pb-5 pt-4 sm:px-5">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand"><BookOpen size={14}/> Exam-ready study points</div>
            <div className="space-y-5">
              {note.sections.map(([heading, points]) => <section key={heading}><h3 className="text-sm font-semibold">{heading}</h3><ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-mute">{points.map((point, i) => <li key={i}>{point}</li>)}</ul></section>)}
            </div>
            {note.diagram && <div className="mt-5 rounded-xl border border-line bg-sunk p-4"><p className="text-xs font-semibold uppercase tracking-wide text-brand">Diagram to practise</p><p className="mt-2 text-sm leading-6">{note.diagram}</p></div>}
            <div className="mt-5 rounded-xl bg-brand/5 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-brand">Conclusion</p><p className="mt-2 text-sm leading-6">{note.conclusion}</p></div>
            <p className="mt-4 text-xs text-mute">Source: 02_BCV755B_Module_4_Consolidated.docx · Part B, corresponding question. Content is presented as a supplementary summary of that source.</p>
          </div>}
        </article>;
      })}
      {!filtered.length && <div className="card p-8 text-center"><Layers3 className="mx-auto text-mute" size={24}/><p className="mt-2 font-semibold">No matching notes</p><p className="mt-1 text-sm text-mute">Try a different keyword.</p></div>}
    </div>
    <div className="mt-6 rounded-2xl border border-line p-4 text-sm text-mute"><div className="flex items-center gap-2 font-semibold text-ink"><Leaf size={16} className="text-brand"/> Keep the main question bank separate</div><p className="mt-2">The original 10-question collection and its progress tracking remain unchanged. Supplementary notes are reference material and are not counted in main-bank completion, quizzes or exam simulations.</p></div>
  </div>;
}
