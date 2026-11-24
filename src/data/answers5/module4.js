const section = (id, title, blocks) => ({ id, title, blocks });
const p = (text) => ({ type: 'p', text });
const list = (items, ordered = true) => ({ type: 'list', ordered, items });
const table = (head, rows) => ({ type: 'table', head, rows });
const diagram = (id, caption) => ({ type: 'diagram', id, caption });
const note = (text, kind = 'gap') => ({ type: 'note', kind, text });

const answer = (id, reviewStatus, sections, topicTags, reviewReason = null) => ({
  id,
  answer: sections,
  topicTags,
  reviewStatus,
  reviewReason,
});

export const FIVE_MARK_MODULE_4_ANSWERS = [
  answer('june-july-2026-q7a', 'draft-needs-pdf-review', [
    section('definition', 'Meaning and levels of biodiversity', [
      p('Biodiversity is the variety and variability of living organisms and the ecological systems of which they are part. It includes diversity within species, between species and among ecosystems.'),
      table(['Level', 'Meaning'], [
        ['Genetic diversity', 'Variation in genes within a species or population.'],
        ['Species diversity', 'Variety and relative abundance of species in a habitat or region.'],
        ['Ecosystem diversity', 'Variety of habitats, ecological communities and ecological processes.'],
      ]),
    ]),
    section('importance', 'Importance of biodiversity', [
      list([
        'Maintains ecological balance through food chains, food webs and ecosystem interactions.',
        'Supports nutrient cycling, soil formation, decomposition and water regulation.',
        'Provides pollination and natural pest control for wild plants and crops.',
        'Supplies food, timber, fibres, medicines and genetic resources for agriculture.',
        'Supports livelihoods in farming, forestry, fisheries and nature-based tourism.',
        'Provides cultural, educational, recreational and scientific value.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Biodiversity sustains ecosystem functions and human well-being. Its conservation is essential for ecological security and future generations.'),
    ]),
  ], ['Biodiversity', 'Genetic diversity', 'Species diversity', 'Ecosystem diversity']),
  answer('june-july-2026-q7b', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of ecological restoration', [
      p('Ecological restoration is the process of assisting the recovery of an ecosystem that has been degraded, damaged or destroyed. It aims to restore native species, ecological structure, functions and ecosystem services.'),
    ]),
    section('need', 'Need for restoration', [
      list([
        'Habitat destruction and fragmentation reduce living space and isolate populations.',
        'Pollution damages soil, water and habitats.',
        'Overexploitation and invasive species disturb ecological balance.',
        'Degraded ecosystems provide fewer services such as water regulation and soil protection.',
      ]),
    ]),
    section('methods', 'Restoration methods', [
      list([
        'Assess the site and identify the causes of degradation.',
        'Control pollution, invasive species, encroachment and destructive extraction.',
        'Stabilise soil, control erosion and restore natural drainage and water quality.',
        'Re-establish locally suitable native vegetation and encourage natural regeneration.',
        'Reconnect fragmented habitats and protect breeding and nesting sites.',
        'Involve local communities and monitor recovery over time.',
      ]),
      diagram('conservation', 'Existing biodiversity-conservation diagram: in-situ habitat protection and ex-situ support complement restoration.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Restoration helps recover habitats and ecosystem functions. Long-term success requires native biodiversity, community participation and continuous monitoring.'),
    ]),
  ], ['Ecological restoration', 'Biodiversity conservation', 'Habitat restoration']),
  answer('june-july-2026-q8a', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of ecosystem', [
      p('An ecosystem is a community of living organisms interacting with one another and with the non-living environment. It includes biotic and abiotic components linked through energy flow and nutrient cycling.'),
    ]),
    section('types', 'Different types of ecosystems', [
      table(['Ecosystem', 'Main characteristics'], [
        ['Forest', 'Tree-dominated ecosystem with high habitat complexity and diverse plant and animal life.'],
        ['Grassland', 'Dominated by grasses and other non-woody plants; supports grazing animals.'],
        ['Desert', 'Low rainfall and water scarcity; organisms show adaptations to dry conditions.'],
        ['Marine', 'Saltwater ecosystems such as oceans, seas and coral reefs.'],
        ['Wetland', 'Land saturated or flooded seasonally or permanently; includes marshes, swamps and mangroves.'],
        ['Estuarine', 'Transition zone where river freshwater mixes with seawater; often nutrient-rich.'],
        ['Lotic', 'Flowing-water systems such as rivers and streams.'],
        ['Lentic', 'Standing-water systems such as lakes and ponds.'],
      ]),
    ]),
    section('functions', 'Basic ecosystem functions', [
      list([
        'Producers capture energy, mainly through photosynthesis.',
        'Consumers obtain energy by feeding on plants or other organisms.',
        'Decomposers break down dead organic matter and recycle nutrients.',
        'Abiotic factors such as sunlight, water, air, soil and temperature influence ecosystem structure.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Ecosystems differ in climate, water conditions and dominant organisms, but all depend on interactions between biotic and abiotic components.'),
    ]),
  ], ['Ecosystem', 'Forest', 'Grassland', 'Marine', 'Wetland', 'Lotic', 'Lentic']),
  answer('june-july-2026-q8b', 'draft-needs-pdf-review', [
    section('forest', 'Forest ecosystem', [
      p('A forest ecosystem is a terrestrial ecosystem dominated by trees and associated plants, animals and microorganisms. It supports biodiversity, stores carbon, protects soil and influences water cycles.'),
      list([
        'Biotic components include trees, shrubs, herbs, animals, birds, insects, fungi and bacteria.',
        'Abiotic components include sunlight, rainfall, air, soil, minerals, temperature and moisture.',
        'Producers such as trees and shrubs capture solar energy; consumers feed on plants or animals; decomposers recycle nutrients.',
      ]),
    ]),
    section('lotic', 'Lotic ecosystem', [
      p('A lotic ecosystem is a flowing-water ecosystem such as a river, stream or creek. Water movement, current speed, dissolved oxygen, temperature and substrate influence the organisms present.'),
      list([
        'Producers include algae and aquatic plants.',
        'Consumers include aquatic insects, fish, amphibians and other animals.',
        'Decomposers break down organic matter and recycle nutrients.',
        'Flowing water transports nutrients and organisms and connects upstream and downstream habitats.',
      ]),
    ]),
    section('components', 'Biotic and abiotic components', [
      table(['Biotic components', 'Abiotic components'], [
        ['Living organisms: producers, consumers and decomposers.', 'Non-living factors: sunlight, water, air, soil, minerals and temperature.'],
        ['Carry out photosynthesis, feeding, reproduction and decomposition.', 'Provide the physical and chemical conditions for life and ecosystem processes.'],
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Forest and lotic ecosystems differ in habitat conditions, but both depend on interactions between living organisms and non-living environmental factors.'),
    ]),
  ], ['Forest ecosystem', 'Lotic ecosystem', 'Biotic components', 'Abiotic components']),
  answer('dec-jan-2026-7a', 'draft-needs-pdf-review', [
    section('definition', 'Definition and levels', [
      p('Biodiversity is the variability among living organisms from terrestrial, marine and other aquatic ecosystems. It includes genetic diversity within species, diversity between species and ecosystem diversity.'),
    ]),
    section('importance', 'Importance of biodiversity', [
      list([
        'Supports ecological stability, food webs and resilience to environmental change.',
        'Maintains nutrient cycling, soil formation and decomposition.',
        'Supports pollination, seed dispersal and natural pest control.',
        'Provides food, medicines, raw materials and genetic resources.',
        'Supports agriculture, fisheries, forestry, tourism and community livelihoods.',
        'Has cultural, spiritual, educational, scientific and ethical value.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Biodiversity supports both ecological processes and human welfare. Conserving it protects ecosystem services and options for future generations.'),
    ]),
  ], ['Biodiversity', 'Ecological importance', 'Economic importance']),
  answer('dec-jan-2026-7b', 'draft-needs-pdf-review', [
    section('definition', 'Meaning of habitat loss', [
      p('Habitat loss is the destruction, degradation or conversion of a natural habitat so that it can no longer support its native species and ecological processes adequately.'),
    ]),
    section('causes', 'Causes and consequences', [
      list([
        'Forests, wetlands and grasslands are converted for agriculture, settlements, roads, dams, industries and mining.',
        'Pollution, overgrazing, invasive species and unsustainable extraction reduce habitat quality.',
        'Fragmentation isolates populations and interrupts feeding, breeding and migration.',
        'Loss of habitat causes population decline, local extinction and disruption of food webs.',
      ]),
    ]),
    section('conservation', 'Methods of biodiversity conservation', [
      list([
        'In-situ conservation: national parks, wildlife sanctuaries, biosphere reserves, sacred groves and habitat corridors.',
        'Ex-situ conservation: zoological gardens, botanical gardens, seed and gene banks, tissue culture and cryopreservation.',
        'Restore degraded forests, wetlands, grasslands and river corridors using native species.',
        'Enforce wildlife laws, control poaching and illegal trade, and involve local communities.',
        'Monitor species and habitats and support education and research.',
      ]),
      diagram('conservation', 'Existing diagram comparing in-situ and ex-situ biodiversity conservation methods.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Preventing habitat destruction and combining in-situ, ex-situ and restoration methods are essential for conserving biodiversity.'),
    ]),
  ], ['Habitat loss', 'In-situ conservation', 'Ex-situ conservation', 'Biodiversity']),
  answer('dec-jan-2026-8a', 'draft-needs-pdf-review', [
    section('definition', 'Climate disturbance', [
      p('Climate disturbance occurs when natural processes or human activities alter long-term patterns of temperature, rainfall, wind and other climate conditions.'),
    ]),
    section('natural', 'Natural agents', [
      list([
        'Solar variability changes the energy reaching Earth.',
        'Volcanic eruptions release ash and aerosols that can reflect sunlight and cause temporary cooling.',
        'Ocean-atmosphere cycles such as El Niño and La Niña influence regional rainfall and temperature.',
        'Long-term orbital variations change the distribution of solar radiation over geological time.',
      ]),
    ]),
    section('human', 'Anthropogenic agents', [
      list([
        'Burning fossil fuels releases carbon dioxide and other greenhouse gases.',
        'Deforestation reduces carbon storage and changes land-surface conditions.',
        'Agriculture and livestock release methane and nitrous oxide.',
        'Industrial processes and waste disposal release greenhouse gases and pollutants.',
        'Urbanisation and land-use change alter local heat and water cycles.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Natural agents cause climate variability, while human activities have become the dominant driver of recent long-term global warming.'),
    ]),
  ], ['Climate disturbance', 'Natural agents', 'Anthropogenic agents']),
  answer('dec-jan-2026-8b', 'draft-needs-pdf-review', [
    section('gene-banks', '(i) Gene banks', [
      p('A gene bank conserves genetic material such as seeds, pollen, tissues, cells, DNA or reproductive material for future use. It preserves genetic diversity and supports crop improvement, research and restoration.'),
    ]),
    section('pollen-culture', '(ii) Pollen culture', [
      p('Pollen culture is an in-vitro technique in which isolated pollen grains or microspores are grown on a nutrient medium to produce haploid plants or embryos. It is useful in plant breeding and can help produce doubled-haploid lines.'),
    ]),
    section('social-forestry', '(iii) Social forestry', [
      p('Social forestry involves growing and managing trees on community, public and private lands with people’s participation. It supplies fuelwood, fodder and small timber, creates rural employment and reduces pressure on natural forests.'),
    ]),
    section('zoological-gardens', '(iv) Zoological gardens', [
      p('A zoological garden is a managed facility where wild animals are kept for conservation, education, research and, where appropriate, captive breeding. Good practice requires suitable enclosures, veterinary care, animal welfare and links with in-situ conservation.'),
      diagram('conservation', 'Existing diagram places zoological gardens and gene banks within ex-situ conservation.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Gene banks and pollen culture preserve and use plant genetic resources, social forestry supports community-based tree management, and zoological gardens contribute to ex-situ wildlife conservation.'),
    ]),
  ], ['Gene banks', 'Pollen culture', 'Social forestry', 'Zoological gardens']),
  answer('21cv654-7-a-', 'draft-needs-academic-review', [
    section('definition', 'Meaning and levels of biodiversity', [
      p('Biodiversity is the variety of life at genetic, species and ecosystem levels. It includes plants, animals, microorganisms and the ecosystems they form.'),
    ]),
    section('importance', 'Importance', [
      list([
        'Ecological balance: species interactions maintain food chains, food webs and ecosystem functions.',
        'Nutrient cycling: decomposers return nutrients to soil and water.',
        'Pollination and pest control: animals support plant reproduction and regulate pests.',
        'Food, medicines and materials: biodiversity provides crops, fish, forest products and medicinal resources.',
        'Livelihoods and genetic resources: biodiversity supports agriculture, fisheries, tourism and crop improvement.',
        'Cultural and scientific value: species and landscapes support education, research and cultural practices.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Biodiversity is essential for ecological processes, economic activity and human well-being.'),
    ]),
  ], ['Biodiversity', 'Genetic diversity', 'Species diversity', 'Ecosystem diversity']),
  answer('21cv654-7-b-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of ecological restoration', [
      p('Ecological restoration assists the recovery of degraded, damaged or destroyed ecosystems and aims to restore native species, structure, functions and ecosystem services.'),
    ]),
    section('steps', 'Main steps', [
      list([
        'Assess the site, identify the causes of degradation and select a suitable reference ecosystem.',
        'Reduce pressures such as pollution, overgrazing, encroachment and invasive species.',
        'Restore soil, drainage, water quality and other physical conditions.',
        'Re-establish native vegetation and reconnect fragmented habitats.',
        'Protect threatened species and breeding sites.',
        'Involve local communities and monitor ecological recovery.',
      ]),
      diagram('conservation', 'Existing in-situ and ex-situ conservation diagram; restoration should prioritise recovery of natural habitats.'),
    ]),
    section('benefits', 'Benefits', [
      list([
        'Improves habitat quality and supports native biodiversity.',
        'Restores nutrient cycling, water regulation and soil protection.',
        'Improves ecosystem resilience and supports long-term conservation.',
      ], false),
    ]),
    section('conclusion', 'Conclusion', [
      p('Restoration complements protection of existing ecosystems and requires long-term monitoring and community participation.'),
    ]),
  ], ['Ecological restoration', 'Habitat recovery', 'Biodiversity']),
  answer('21cv654-7-c-', 'needs-source-review', [
    section('natural', 'Natural agents of climate disturbance', [
      list([
        'Solar variations can alter the energy reaching Earth.',
        'Volcanic eruptions release ash and aerosols that may temporarily reduce incoming sunlight.',
        'Ocean-atmosphere patterns such as El Niño and La Niña change regional rainfall and temperature.',
        'Natural ocean and atmospheric circulation redistribute heat and moisture.',
      ]),
    ]),
    section('human', 'Anthropogenic agents', [
      list([
        'Fossil-fuel combustion releases carbon dioxide and other greenhouse gases.',
        'Deforestation reduces carbon storage and changes surface energy and water balance.',
        'Agriculture, livestock and fertiliser use release methane and nitrous oxide.',
        'Industrial processes, waste and urbanisation alter greenhouse-gas levels and local climate.',
      ]),
      diagram('greenhouse', 'Existing greenhouse-effect diagram illustrating one important human-driven climate mechanism.'),
    ]),
    section('source-note', 'Source limitation', [
      note('The supplied notes cover natural and human climate agents, but this question’s full list and attribution details need a page-by-page check before the answer is marked complete.', 'gap'),
    ]),
  ], ['Climate disturbance', 'Natural climate factors', 'Anthropogenic climate factors'], 'The source map classifies this question as partially supported. Verify the complete agent list and attribution statements against the Module 5 notes before marking it complete.'),
  answer('21cv654-8-a-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of wildlife sanctuary', [
      p('A wildlife sanctuary is a protected area established to conserve wild animals, their habitats and associated biodiversity. Hunting and other harmful activities are prohibited or regulated under applicable wildlife-protection laws.'),
    ]),
    section('examples', 'Important wildlife sanctuaries in India', [
      table(['Sanctuary', 'State / region', 'Important wildlife or habitat'], [
        ['Vedanthangal Bird Sanctuary', 'Tamil Nadu', 'Wetland and nesting habitat for resident and migratory water birds.'],
        ['Ranganathittu Bird Sanctuary', 'Karnataka', 'Kaveri river-island habitat supporting water birds, crocodiles and other wildlife.'],
        ['Wayanad Wildlife Sanctuary', 'Kerala', 'Forest landscape supporting elephants, deer, birds and Western Ghats biodiversity.'],
        ['Bhadra Wildlife Sanctuary', 'Karnataka', 'Forest and river habitats supporting tiger, elephant, gaur and diverse birds.'],
        ['Gahirmatha Marine Wildlife Sanctuary', 'Odisha', 'Coastal and marine habitat known for olive ridley sea-turtle nesting.'],
        ['National Chambal Sanctuary', 'Madhya Pradesh, Rajasthan and Uttar Pradesh', 'River ecosystem protecting gharial, river dolphins and freshwater turtles.'],
      ]),
    ]),
    section('importance', 'Importance of sanctuaries', [
      list([
        'Protect endangered species and their natural breeding habitats.',
        'Maintain food webs, genetic diversity and ecological balance.',
        'Support research, education and regulated nature tourism.',
        'Reduce habitat destruction, poaching and disturbance through protection and monitoring.',
        'Promote community participation and management of human–wildlife conflict.',
      ]),
    ]),
    section('conclusion', 'Conclusion', [
      p('Wildlife sanctuaries conserve species in their natural habitats and protect the ecosystems on which wildlife depends.'),
    ]),
  ], ['Wildlife sanctuaries', 'Protected areas', 'In-situ conservation', 'Biodiversity'], 'Named sanctuary examples are supplementary to the supplied notes and are drawn from the repository model-paper source record. Verify names and state details against an approved reference before academic sign-off.'),
  answer('21cv654-8-b-', 'needs-source-review', [
    section('introduction', 'Medicinal value of plant biodiversity', [
      p('Plants contain biologically active compounds that are used in traditional medicine and can provide starting materials for modern drug development.'),
    ]),
    section('supported-example', 'Example supported by the supplied notes', [
      list([
        'Taxol (paclitaxel): an anticancer drug originally discovered from the bark of the Pacific yew tree (Taxus brevifolia).',
      ]),
    ]),
    section('importance', 'Importance and conservation', [
      list([
        'Plant-derived compounds contribute to medicines and pharmaceutical research.',
        'Medicinal plant diversity has cultural and economic value.',
        'Protect habitats and use medicinal plants sustainably to conserve genetic resources.',
      ]),
      note('The supplied notes give general medicinal value and the Taxol example but do not provide a complete list of plant-derived drugs. Additional examples require an approved reference.', 'gap'),
    ]),
  ], ['Medicinal plants', 'Taxol', 'Plant biodiversity'], 'The source audit classifies the notes as partial for a list of drugs derived from plants. This draft includes only the notes-supported Taxol example and needs an approved additional source for broader coverage.'),
  answer('21cv654-8-c-', 'draft-needs-academic-review', [
    section('definition', 'Meaning of zoological garden', [
      p('A zoological garden or zoo is a managed facility where wild animals are kept in protected, species-appropriate enclosures for conservation, education, research and, where suitable, captive breeding. It is an example of ex-situ conservation.'),
    ]),
    section('role', 'Role in biodiversity conservation', [
      list([
        'Ex-situ conservation: maintains threatened species outside their natural habitats as a safeguard against extinction.',
        'Captive breeding: supports carefully managed breeding programmes for endangered species.',
        'Genetic management: coordinated breeding and ancestry records help reduce inbreeding and maintain genetic diversity.',
        'Rescue and rehabilitation: provides care for injured, orphaned or confiscated wild animals.',
        'Education and awareness: teaches visitors about species, habitats, threats and conservation.',
        'Research: supports veterinary science, animal behaviour, nutrition and reproduction studies.',
        'Reintroduction support: suitable captive-bred animals may be considered for release after habitat and threat assessments.',
      ]),
    ]),
    section('requirements', 'Requirements of a good zoological garden', [
      list([
        'Spacious and enriched enclosures suited to each species.',
        'Proper food, clean water, veterinary care and hygiene.',
        'Trained staff, accurate records and ethical animal management.',
        'Links with in-situ conservation and protection of natural habitats.',
      ]),
    ]),
    section('limitations', 'Limitations', [
      p('Zoos cannot replace natural habitats. Small captive populations may face genetic problems, and unsuitable enclosures can affect animal welfare.'),
    ]),
    section('conclusion', 'Conclusion', [
      p('Zoological gardens contribute to ex-situ conservation, education and research, but their work must complement protection of wildlife in natural ecosystems.'),
    ]),
  ], ['Zoological gardens', 'Ex-situ conservation', 'Biodiversity', 'Captive breeding'], 'Supplementary zoo-specific content is drawn from the repository model-paper source record because the notes provide only general biodiversity-conservation coverage. Academic review is pending.'),
];
