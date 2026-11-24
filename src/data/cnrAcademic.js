import { DRIVE_RESOURCES } from './resourceCatalog';
import { QUESTIONS } from './questions';

export const SYLLABUS_SOURCE = {
  label: 'Visvesvaraya Technological University — 2022 Scheme syllabus, BCV755B',
  url: 'https://vtu.ac.in/pdf/2022_3to8/4civsyll.pdf',
  repositoryCopy: 'resources/syllabus/CNR civsyll-26-27.pdf',
};

export const COURSE_OBJECTIVES = [
  'Learn types of land forms, soil conservation and sustainable land use planning.',
  'Apprehend water resources, types, distribution, planning and conservation. Water pollution and types of uses.',
  'Know the types of minerals and rocks.',
  'Know the atmospheric composition of air, pollution and effects on human beings, animals and plants. Air pollution control.',
  'Apprehend basics of biodiversity and ecosystems.',
];

export const COURSE_OUTCOMES = [
  'Apprehend various components of land as a natural resource and land use planning.',
  'Know availability and demand for water resources as applied to India.',
  'Analyse the components of air as resource and its pollution.',
  'Discuss biodiversity & its role in ecosystem functioning.',
  'Critically appreciate the environmental concerns of today.',
];

export const CNR_MODULES = [
  { number: 1, title: 'Land', eyebrow: 'LAND & SOIL CONSERVATION', icon: 'mountain',
    description: 'Study land as a natural resource, the pressures created by land-use change, and the role of soil health and sustainable land-use planning.',
    syllabus: 'Land: Land as a resource, types of lands, conservation of land forms, deforestation, effect of land use changes. Soil health, ecological and economic importance of soil, impact of soil degradation on agriculture and food security, need for soil conservation, sustainable land use planning.',
    topics: ['Land as a resource','Types of lands','Conservation of land forms','Deforestation','Effect of land use changes','Soil health','Ecological and economic importance of soil','Impact of soil degradation on agriculture and food security','Need for soil conservation','Sustainable land use planning'] },
  { number: 2, title: 'Water', eyebrow: 'WATER RESOURCES & MANAGEMENT', icon: 'droplets',
    description: 'Explore global and Indian water resources, sector-wise use, basin distribution, river interlinking, groundwater recharge and contamination.',
    syllabus: 'Water: Global water resources, Indian water resources, Resources system planning. Water use sectors- domestic, industrial, agriculture. Water deficit and water surplus basins in India, equitable distribution, Inter-basin water transfers, Interlinking of rivers – Himalayan component, peninsular component, issues involved. Ground water, its potential in India, conjunctive use, recharge of ground water. Contamination of ground water, sea water ingress, problems and solutions.',
    topics: ['Global water resources','Indian water resources','Resources system planning','Water use sectors: domestic, industrial and agriculture','Water deficit and water surplus basins in India','Equitable distribution','Inter-basin water transfers','Interlinking of rivers: Himalayan component','Interlinking of rivers: Peninsular component','Issues involved in interlinking of rivers','Ground water and its potential in India','Conjunctive use','Recharge of ground water','Contamination of ground water','Sea water ingress, problems and solutions'] },
  { number: 3, title: 'Air', eyebrow: 'ATMOSPHERE & AIR QUALITY', icon: 'wind',
    description: 'Understand atmospheric composition, pollutant sources and classification, air-quality indicators, health and economic effects, control equipment and ozone depletion.',
    syllabus: 'Air: Introduction, composition, sources and classification of air pollutants, National Ambient Air quality standards (NAAQS), Air quality index, effects of air pollution on human health. Economic effects of air pollution. Control of air pollution by equipment, smoke and its control. Ozone depletion –impacts, photochemical changes.',
    topics: ['Introduction to air','Composition of air','Sources and classification of air pollutants','National Ambient Air Quality Standards (NAAQS)','Air Quality Index','Effects of air pollution on human health','Economic effects of air pollution','Control of air pollution by equipment','Smoke and its control','Ozone depletion: impacts and photochemical changes'] },
  { number: 4, title: 'Biodiversity', secondaryHeading: 'Ecosystem', eyebrow: 'BIODIVERSITY & ECOSYSTEMS', icon: 'trees',
    description: 'Study flora, fauna, biodiversity values and threats, conservation approaches, ecological restoration and the structure and types of ecosystems.',
    syllabus: 'Biodiversity: Introduction, Flora and Fauna, Importance of biodiversity, Economic values- medicinal plants, drugs, fisheries biogeochemical cycling. Threat to biodiversity, natural & anthropogenic disturbance, habitat loss. Conservation of biodiversity, National parks, wild life sanctuaries, zoological gardens, gene banks, pollen culture, ecological restoration, social forestry. Ecosystem: Definition, Types: forest, grass land, marine, desert, wetlands, estuarine, lotic, lentic. Abiotic & biotic components of ecosystem.',
    topics: ['Introduction to biodiversity','Flora and fauna','Importance of biodiversity','Economic values: medicinal plants, drugs and fisheries','Biogeochemical cycling','Threats to biodiversity','Natural and anthropogenic disturbance','Habitat loss','Conservation of biodiversity','National parks and wildlife sanctuaries','Zoological gardens','Gene banks and pollen culture','Ecological restoration','Social forestry','Ecosystem: definition','Types of ecosystems: forest, grassland, marine, desert and wetlands','Estuarine, lotic and lentic ecosystems','Abiotic and biotic components of an ecosystem'] },
  { number: 5, title: 'Global warming', eyebrow: 'CLIMATE CHANGE & ENVIRONMENTAL IMPACT', icon: 'globe',
    description: 'Examine global warming and climate-change indicators, health and biodiversity impacts, global conservation efforts, and India’s Environmental Impact Assessment framework.',
    syllabus: 'Global warming: concept, indicators, factor and effects. Global climate change-indicators, health impacts, effect on biodiversity. Introduction to global efforts in conservation of biodiversity. .EIA regulations in India, status of EIA in India, list of projects needing environmental clearance under EIA notifications. Case study of hydro power/ thermal power projects.',
    topics: ['Concept of global warming','Indicators, factors and effects of global warming','Global climate-change indicators','Health impacts','Effects on biodiversity','Global efforts in conservation of biodiversity','EIA regulations in India','Status of EIA in India','Projects needing environmental clearance under EIA notifications','Case study of hydro power or thermal power projects'] },
];

export const QUESTION_PAPER_RESOURCES = DRIVE_RESOURCES.filter((item) => ['pyqs', 'mqps'].includes(item.category));
export const SYLLABUS_RESOURCES = DRIVE_RESOURCES.filter((item) => item.category === 'reference');
export const getModuleResources = (number) => DRIVE_RESOURCES.filter((item) => Number(item.module) === Number(number));
export const getModuleQuestions = (number) => QUESTIONS.filter((item) => item.module === Number(number));

function collectDiagrams(blocks = [], output = []) {
  for (const block of blocks) {
    if (block?.type === 'diagram' && block.id) output.push(block);
    for (const subsection of block?.subsections || []) collectDiagrams(subsection.blocks || [], output);
  }
  return output;
}

export const getModuleDiagrams = (number) => getModuleQuestions(number).flatMap((question) =>
  collectDiagrams(question.answer?.sections || []).map((diagram) => ({
    ...diagram, questionId: question.id, questionCode: question.code, questionTitle: question.title,
  })),
);

export const getModuleCatalogStats = (number) => {
  const resources = getModuleResources(number);
  const questions = getModuleQuestions(number);
  const diagrams = getModuleDiagrams(number);
  return {
    topicCount: CNR_MODULES.find((module) => module.number === Number(number))?.topics.length || 0,
    resourceCount: resources.length + questions.length + diagrams.length,
    fileCount: resources.length,
    questionCount: questions.length,
    diagramCount: diagrams.length,
  };
};
