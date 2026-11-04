// MODULE 5 – Global Warming and Environmental Management
// Source: "Conservation_of_Natural_Resources_Module_5_10_Questions_Answers_Revised.docx"
// Block types: p | list | table | eq | diagram | note | key
// Inline highlight: wrap keywords in **double asterisks**.
// note kinds: 'added' = additional explanation not in notes, 'gap' = information missing from notes, 'tip'.

const M5 = 'Module 5 notes (Conservation_of_Natural_Resources_Module_5_10_Questions_Answers_Revised.docx)';

export const q01 = {
  source: { doc: M5, refs: ['Module 5 – Q1'] },
  keywords: ['Global warming', 'Greenhouse effect', 'Enhanced greenhouse effect', 'CO₂', 'CH₄', 'N₂O', 'CFCs', 'Sea-level rise', 'Melting glaciers', 'Coral bleaching'],
  sections: [
    {
      id: 'definition', title: 'Definition / Introduction',
      blocks: [
        { type: 'p', text: '**Global warming** is the long-term increase in the Earth’s **average surface temperature**, mainly due to the increased concentration of **heat-trapping greenhouse gases** in the atmosphere.' },
        { type: 'p', text: 'The answer is organised as: (1) the greenhouse effect, (2) the major greenhouse gases, (3) the indicators of global warming, followed by a conclusion.' },
      ],
    },
    {
      id: 'greenhouse-effect', title: '1. The Greenhouse Effect',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Solar radiation** reaches the Earth and warms its surface.',
          'The Earth releases energy back towards space as **heat**.',
          '**Greenhouse gases absorb and re-emit** some of this outgoing heat, keeping the lower atmosphere warm.',
          'The **natural greenhouse effect** makes the Earth habitable.',
          'Human activities increase greenhouse-gas concentrations, producing an **enhanced greenhouse effect** and additional warming.',
        ] },
        { type: 'p', text: 'The process has two important parts. First, the atmosphere allows much of the incoming short-wave solar energy to reach the surface. Second, the warmed surface emits energy as long-wave infrared radiation. Greenhouse gases absorb and re-emit some of this outgoing radiation. This natural process keeps the lower atmosphere warmer than it would otherwise be; the enhanced effect occurs when human activities add more heat-trapping gases.' },
        { type: 'table', head: ['Natural greenhouse effect', 'Enhanced greenhouse effect'], rows: [
          ['Occurs naturally because greenhouse gases are present in the atmosphere.', 'Becomes stronger when human activities increase greenhouse-gas concentrations.'],
          ['Keeps the Earth warm enough to support life.', 'Retains additional heat and contributes to long-term global warming.'],
        ] },
        { type: 'diagram', id: 'greenhouse', caption: 'Greenhouse effect: sunlight warms the surface; greenhouse gases absorb and re-emit part of the outgoing heat.' },
        { type: 'p', text: '**Diagram explanation:** Incoming solar radiation passes through the atmosphere and warms the surface. The surface sends heat back upwards. Part of this heat escapes to space, while part is absorbed by greenhouse gases and re-emitted, so some returns towards the surface and warms the lower atmosphere. More greenhouse gas means more heat retained – the enhanced greenhouse effect.' },
        { type: 'key', title: 'Revision sequence', text: 'Sun’s radiation → Earth’s surface warms → outgoing heat partly absorbed and re-emitted by greenhouse gases → enhanced warming.' },
      ],
    },
    {
      id: 'ghg', title: '2. Major Greenhouse Gases',
      blocks: [
        { type: 'table', head: ['Greenhouse gas', 'Formula', 'Main sources (as given in the notes)'], rows: [
          ['**Carbon dioxide**', 'CO₂', 'Burning of coal, oil and natural gas; vehicles, power plants and industries; deforestation.'],
          ['**Methane**', 'CH₄', 'Livestock, rice fields, landfills; fossil-fuel production and transport.'],
          ['**Nitrous oxide**', 'N₂O', 'Nitrogen-based fertilizers, agricultural activities, industries and combustion.'],
          ['**Chlorofluorocarbons (CFCs)**', '—', 'Used historically in some refrigeration and cooling applications. They are powerful greenhouse gases and **also damage stratospheric ozone**.'],
        ] },
      ],
    },
    {
      id: 'indicators', title: '3. Indicators of Global Warming',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Rising temperatures:** rising average global and ocean temperatures.',
          '**Melting ice:** melting glaciers and polar ice sheets, and declining snow cover.',
          '**Sea-level rise:** caused by melting land ice and **thermal expansion** of seawater.',
          '**Weather and rainfall changes:** more frequent or intense **heatwaves**, and changes in rainfall, drought and flood patterns.',
          '**Ocean and ecosystem changes:** ocean warming and **acidification**, **coral bleaching**, and changes in plant flowering, animal migration and species distribution.',
        ] },
      ],
    },
    {
      id: 'conclusion', title: 'Conclusion',
      blocks: [
        { type: 'p', text: 'Rising temperatures, shrinking glaciers, sea-level rise and ecosystem changes are **measurable indicators of global warming**. Reducing greenhouse-gas emissions is essential to limit further warming.' },
      ],
    },
  ],
};

export const q02 = {
  source: { doc: M5, refs: ['Module 5 – Q3', 'Module 5 – Q6 (coral bleaching and acidification detail)'] },
  keywords: ['Sea-level rise', 'Extreme weather', 'Glacier retreat', 'Heat stress', 'Vector-borne disease', 'Biodiversity loss', 'Crop yield', 'Acidification', 'Sundarbans', 'Himalayan glaciers'],
  sections: [
    {
      id: 'intro', title: 'Introduction',
      blocks: [
        { type: 'p', text: 'Global warming is the long-term rise in the Earth’s average surface temperature. Its effects are felt on **water, food, health, biodiversity, coastal settlements and the economy**. The major effects, with examples from India given in the notes, are explained below.' },
      ],
    },
    {
      id: 'sea-level', title: '1. Sea-Level Rise',
      blocks: [
        { type: 'p', text: 'Melting land ice and **expansion of warmer seawater** raise sea levels. This increases **coastal flooding, erosion, saltwater intrusion** and the risk to low-lying settlements.' },
        { type: 'p', text: '**Indian examples:** the notes identify the **Sundarbans**, **Lakshadweep** and the **Andaman and Nicobar** coastal areas as vulnerable.' },
      ],
    },
    {
      id: 'extreme', title: '2. Extreme Weather Events',
      blocks: [
        { type: 'p', text: 'Warming is associated with more intense **heatwaves** and with changes in the likelihood or severity of heavy rainfall, droughts and some storms. These events damage homes, infrastructure, ecosystems and livelihoods.' },
      ],
    },
    {
      id: 'glacier', title: '3. Glacier Retreat and Water Stress',
      blocks: [
        { type: 'p', text: '**Himalayan glaciers are shrinking.** Changes in meltwater can affect the seasonal flow of rivers such as the **Ganga, Yamuna and Brahmaputra** and may create future freshwater-management challenges.' },
      ],
    },
    {
      id: 'health', title: '4. Human Health Impacts',
      blocks: [
        { type: 'list', items: [
          'High temperatures increase **heat stress and dehydration**.',
          'Warmer conditions and changing rainfall can favour **disease vectors such as mosquitoes**, increasing risks from **malaria, dengue and chikungunya**.',
        ] },
      ],
    },
    {
      id: 'biodiversity', title: '5. Loss of Biodiversity',
      blocks: [
        { type: 'p', text: 'Species may lose suitable habitats or be forced to move. **Coral bleaching**, altered migration patterns, forest fires and increased extinction risk may disrupt food webs.' },
        { type: 'p', text: 'Detail from the Module 5 climate-biodiversity notes: higher sea temperatures cause corals to **expel the algae they depend on**, turning pale or white; severe or prolonged bleaching can lead to coral death and loss of reef biodiversity.' },
      ],
    },
    {
      id: 'agri', title: '6. Agricultural Impacts',
      blocks: [
        { type: 'p', text: '**Irregular monsoons, droughts, floods and heat stress** can reduce crop yields, increase pests and plant diseases, and raise the risk of food shortages and higher prices.' },
      ],
    },
    {
      id: 'ocean', title: '7. Ocean Warming and Acidification',
      blocks: [
        { type: 'p', text: 'Oceans absorb excess heat and atmospheric CO₂. Warming contributes to **coral bleaching**; dissolved CO₂ **lowers seawater pH** and can harm corals and shell-forming organisms.' },
      ],
    },
    {
      id: 'economy', title: '8. Economic and Infrastructure Impacts',
      blocks: [
        { type: 'p', text: 'Damage to **roads, buildings, agriculture, fisheries and tourism** increases repair costs, disaster-response costs and livelihood losses.' },
      ],
    },
    {
      id: 'impact-chain', title: 'How the Effects Are Connected',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Higher temperature** contributes to glacier retreat and ocean warming.',
          '**Glacier retreat and changing rainfall** can affect seasonal water availability and increase water-management challenges.',
          '**Warmer oceans and sea-level rise** increase risks to coastal ecosystems and settlements; ocean warming can contribute to coral bleaching.',
          '**Heat stress and changing rainfall** affect human health, agriculture and the distribution of disease vectors.',
          '**Damage to ecosystems and infrastructure** can reduce livelihoods and increase economic losses.',
        ] },
        { type: 'note', kind: 'added', text: 'This is a revision-oriented connection of effects already described in the answer. It is not a separate case study or a quantified causal model from the source notes.' },
      ],
    },
    {
      id: 'summary', title: 'Summary Table',
      blocks: [
        { type: 'table', head: ['Effect', 'Main consequences', 'Example given in the notes'], rows: [
          ['Sea-level rise', 'Coastal flooding, erosion, saltwater intrusion', 'Sundarbans, Lakshadweep, Andaman & Nicobar'],
          ['Extreme weather', 'Heatwaves, altered rainfall, droughts, storms', '—'],
          ['Glacier retreat', 'Changed seasonal river flow, water stress', 'Himalayan glaciers; Ganga, Yamuna, Brahmaputra'],
          ['Health impacts', 'Heat stress, dehydration, vector-borne disease', 'Malaria, dengue, chikungunya'],
          ['Biodiversity loss', 'Habitat loss, disrupted food webs', 'Coral bleaching'],
          ['Agriculture', 'Lower yields, pests, food shortages', 'Irregular monsoons'],
          ['Ocean changes', 'Warming, lower pH', 'Corals, shell-forming organisms'],
          ['Economy', 'Repair and disaster costs, livelihood loss', 'Roads, fisheries, tourism'],
        ] },
        { type: 'note', kind: 'gap', text: 'The notes give Indian examples only for sea-level rise and glacier retreat (plus the named diseases). No statistics, dates or additional Indian case studies are given, so none have been added.' },
      ],
    },
    {
      id: 'conclusion', title: 'Conclusion',
      blocks: [
        { type: 'p', text: 'Global warming affects **water, food, health, biodiversity, coastal settlements and the economy**. **Adaptation planning and greenhouse-gas reduction are both required.**' },
      ],
    },
  ],
};

export const q03 = {
  source: { doc: M5, refs: ['Module 5 – Q7'] },
  keywords: ['Earth Summit 1992', 'CBD', 'Paris Agreement 2015', 'UNEP', 'CITES', 'Ramsar Convention', 'Bonn Convention', 'Kyoto Protocol', 'IUCN Red List', 'WWF', 'Global Environment Facility'],
  sections: [
    {
      id: 'intro', title: 'Introduction',
      blocks: [
        { type: 'p', text: 'Biodiversity and climate systems **cross national boundaries**, so **international cooperation** is important for protecting species, habitats and shared natural resources. Several global conventions, organisations and strategies work towards this.' },
      ],
    },
    {
      id: 'agreements', title: '1. Major International Agreements and Organisations',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Earth Summit, Rio de Janeiro (1992):** the international conference that led to the adoption of the **Convention on Biological Diversity (CBD)**.',
          '**Convention on Biological Diversity (CBD):** objectives are (a) conservation of biodiversity, (b) sustainable use of biological resources and (c) fair and equitable sharing of benefits arising from genetic resources.',
          '**Paris Agreement (2015):** an agreement under the **UNFCCC**. It aims to hold the rise in global average temperature to **well below 2 °C** above pre-industrial levels and to pursue efforts to limit it to **1.5 °C**.',
          '**United Nations Environment Programme (UNEP):** supports international environmental cooperation, research, awareness campaigns and environmental action. The notes mention **World Environment Day, observed on 5 June**.',
          '**CITES:** the Convention on International Trade in Endangered Species of Wild Fauna and Flora regulates international trade in listed species so that trade does not threaten their survival.',
          '**Ramsar Convention:** supports the conservation and **wise use of wetlands**.',
          '**Convention on Migratory Species (Bonn Convention):** promotes international cooperation for the conservation of **migratory species**.',
          '**Kyoto Protocol:** an earlier climate agreement that established **greenhouse-gas reduction commitments** for participating countries under its framework.',
          '**International organisations and funding:** **IUCN** assesses species extinction risk through the **Red List**; **WWF** supports conservation projects; the **Global Environment Facility** and other funding mechanisms support conservation and environmental work.',
        ] },
      ],
    },
    {
      id: 'table', title: '2. Quick Comparison Table',
      blocks: [
        { type: 'table', head: ['Agreement / body', 'Area of action', 'Key point from the notes'], rows: [
          ['CBD (from Earth Summit 1992)', 'Biodiversity', 'Conservation, sustainable use, fair and equitable benefit sharing'],
          ['Paris Agreement (2015)', 'Climate action', 'Well below 2 °C; pursue 1.5 °C; under UNFCCC'],
          ['Kyoto Protocol', 'Climate action', 'Greenhouse-gas reduction commitments'],
          ['UNEP', 'Environment (general)', 'Cooperation, research, awareness; World Environment Day (5 June)'],
          ['CITES', 'Wildlife trade', 'Regulates international trade in listed species'],
          ['Ramsar Convention', 'Wetlands', 'Conservation and wise use of wetlands'],
          ['Bonn Convention (CMS)', 'Migratory species', 'International cooperation for migratory species'],
          ['IUCN / WWF / GEF', 'Assessment, projects, funding', 'Red List; conservation projects; funding mechanisms'],
        ] },
        { type: 'note', kind: 'gap', text: 'The notes do not give adoption years for CITES, the Ramsar Convention, the Bonn Convention or the Kyoto Protocol, and give no details of Kyoto targets. Verify any such details from class material before writing them. The Montreal Protocol (ozone) is covered in Q10.' },
      ],
    },
    {
      id: 'remember', title: '3. Organising the International Efforts',
      blocks: [
        { type: 'table', head: ['Main area', 'Agreement / organisation', 'Central purpose'], rows: [
          ['Biodiversity', 'CBD', 'Conservation, sustainable use and fair benefit sharing'],
          ['Climate action', 'UNFCCC / Paris Agreement / Kyoto Protocol', 'International cooperation to address greenhouse-gas emissions and climate change'],
          ['Wildlife trade', 'CITES', 'Regulates international trade in listed species'],
          ['Wetlands', 'Ramsar Convention', 'Conservation and wise use of wetlands'],
          ['Migratory species', 'Convention on Migratory Species (Bonn Convention)', 'Cooperation for conservation across national boundaries'],
          ['Environmental coordination', 'UNEP', 'Supports environmental cooperation, research and awareness'],
        ] },
        { type: 'note', kind: 'added', text: 'This table groups the agreements and organisations already described above by their main area of work. It does not add new treaty dates or legal targets.' },
      ],
    },
    {
      id: 'strategies', title: '4. Global Conservation Strategies',
      blocks: [
        { type: 'list', ordered: true, items: [
          'Create and manage **protected areas** such as national parks, sanctuaries and biosphere reserves.',
          'Use **ex-situ conservation** such as zoos, botanical gardens, seed banks, gene banks and cryopreservation where appropriate.',
          '**Restore habitats**, prevent poaching and promote **sustainable use** of resources.',
          'Encourage **community participation**, afforestation, ecotourism and sustainable harvesting.',
        ] },
      ],
    },
    {
      id: 'conclusion', title: 'Conclusion',
      blocks: [
        { type: 'p', text: 'International agreements provide **shared goals and cooperation**, while effective implementation depends on **national policies, funding, enforcement and community participation**.' },
      ],
    },
  ],
};

export const q04 = {
  source: { doc: M5, refs: ['Module 5 – Q8', 'Module 5 – Q9 (Category A / B)'] },
  keywords: ['EIA', 'Screening', 'Scoping', 'Baseline studies', 'Impact prediction', 'Mitigation', 'Public consultation', 'Environmental clearance', 'MoEFCC', 'Environment (Protection) Act, 1986', 'Category A', 'Category B'],
  sections: [
    {
      id: 'definition', title: 'Definition / Introduction',
      blocks: [
        { type: 'p', text: '**Environmental Impact Assessment (EIA)** is a systematic process used to **identify, predict and evaluate** the likely environmental impacts of a **proposed project before it is approved and implemented**. It also identifies measures to **avoid, minimise or manage** harmful impacts.' },
      ],
    },
    {
      id: 'objectives', title: '1. Objectives of EIA',
      blocks: [
        { type: 'list', ordered: true, items: [
          'Prevent or reduce **environmental degradation**.',
          'Promote **sustainable development** and responsible use of natural resources.',
          'Protect **human health, biodiversity and environmental quality**.',
          '**Compare alternatives** and improve project planning.',
          'Encourage **transparency and public participation** in decisions.',
        ] },
      ],
    },
    {
      id: 'need', title: '2. Need for EIA',
      blocks: [
        { type: 'p', text: 'Development projects such as **mines, industries, dams, highways and large infrastructure** may cause deforestation, air and water pollution, noise, habitat loss, biodiversity decline or displacement of communities. EIA helps identify these risks **before major decisions are made**.' },
      ],
    },
    {
      id: 'steps', title: '3. Major Steps in the EIA Process',
      blocks: [
        { type: 'list', ordered: true, items: [
          '**Screening:** determine whether a project requires an EIA and identify the applicable assessment category.',
          '**Scoping:** identify the key environmental issues and the studies required.',
          '**Baseline studies:** collect information about existing environmental conditions such as air, water, soil, biodiversity and local communities.',
          '**Impact prediction and evaluation:** assess likely positive and negative impacts during construction and operation.',
          '**Alternatives and mitigation:** consider alternative sites or designs and propose measures to avoid, minimise or compensate for impacts.',
          '**EIA report:** document the project, baseline conditions, predicted impacts, alternatives and mitigation measures.',
          '**Public consultation:** obtain feedback from affected communities and other stakeholders where required.',
          '**Appraisal and environmental clearance:** the competent authority reviews the report and consultation record and decides whether clearance should be granted, with conditions where applicable.',
          '**Monitoring and compliance:** monitor environmental performance and implement the conditions and environmental management measures.',
        ] },
        { type: 'diagram', id: 'eia', caption: 'EIA process flowchart: Screening → Scoping → Baseline → Impact assessment → Mitigation → Report → Consultation → Clearance → Monitoring.' },
        { type: 'key', title: 'Sequence to remember', text: 'Screening → Scoping → Baseline study → Impact assessment → Mitigation / report → Public consultation / appraisal → Clearance → Monitoring.' },
      ],
    },
    {
      id: 'india', title: '4. EIA in India',
      blocks: [
        { type: 'p', text: 'The notes state that India’s EIA framework is administered through the **Ministry of Environment, Forest and Climate Change (MoEFCC)** under the **Environment (Protection) Act, 1986**, with relevant projects assessed according to the applicable EIA notification and procedures. Exact requirements depend on the project type and current regulations.' },
      ],
    },
    {
      id: 'categories', title: '5. Related Topic: Category A and Category B Projects',
      blocks: [
        { type: 'table', head: ['Aspect', 'Category A', 'Category B'], rows: [
          ['Potential impact', 'Generally **potentially significant** environmental impacts', 'Assessment requirements depend on project details and current rules'],
          ['Appraised by', '**Central level – MoEFCC**, according to applicable rules', '**State level – SEIAA** (State Environment Impact Assessment Authority), where applicable'],
          ['Examples in the notes', 'Major mining and mineral extraction; certain thermal power plants; nuclear power; oil and natural-gas exploration or production; major ports and airports; certain highways; major irrigation or hydropower; refineries; petrochemical complexes; certain hazardous-waste facilities', 'No complete, reliable list is given in the notes'],
        ] },
        { type: 'p', text: '**Importance of categorisation:** it identifies the competent authority, helps determine the level of assessment and documentation, allows projects to be evaluated in proportion to their likely impacts, and supports public consultation, mitigation planning and post-clearance monitoring.' },
        { type: 'note', kind: 'gap', text: 'The notes do not give a reliable list of Category B examples or the year of the EIA notification. Check these against the current syllabus or the applicable EIA notification before writing them in an examination.' },
      ],
    },
    {
      id: 'conclusion', title: 'Conclusion',
      blocks: [
        { type: 'p', text: 'EIA supports **informed decision-making** by identifying environmental risks before project implementation and by requiring suitable **mitigation and monitoring**.' },
      ],
    },
  ],
};
