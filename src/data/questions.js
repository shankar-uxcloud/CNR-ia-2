import { q01, q02, q03, q04 } from './answers/module5';
import { q05, q06, q07, q08 } from './answers/module4';
import { q09, q10 } from './answers/module3';

export const SUBJECT = {
  code: 'BCV755B',
  name: 'Conservation of Natural Resources',
  product: 'VTU ExamPrep',
  tagline: 'Master Every Concept. Prepare with Confidence.',
};

// Module classification is fixed by the brief: Q09 and Q10 belong to Module 3.
export const MODULES = {
  3: { n: 3, name: 'Air and Air Pollution', long: 'Air composition, air pollutants, air quality, pollution effects, control equipment and ozone depletion' },
  4: { n: 4, name: 'Biodiversity and Ecosystem', long: 'Biodiversity, flora and fauna, ecosystem components, conservation and biogeochemical cycles' },
  5: { n: 5, name: 'Global Warming and EIA', long: 'Global warming, climate change, global conservation efforts and Environmental Impact Assessment' },
};
export const MODULE_ORDER = [5, 4, 3];

export const QUESTIONS = [
  { id: 'q01', no: 1, module: 5, icon: 'Thermometer', title: 'Global Warming', answer: q01,
    question: 'Define global warming. Explain the greenhouse effect, major greenhouse gases and indicators of global warming.' },
  { id: 'q02', no: 2, module: 5, icon: 'CloudRain', title: 'Effects of Global Warming', answer: q02,
    question: 'Explain the major effects of global warming, with suitable examples from India.' },
  { id: 'q03', no: 3, module: 5, icon: 'Globe', title: 'Global Environmental Agreements', answer: q03,
    question: 'Explain global efforts and international agreements for biodiversity conservation and climate action.' },
  { id: 'q04', no: 4, module: 5, icon: 'ClipboardCheck', title: 'Environmental Impact Assessment', answer: q04,
    question: 'Define Environmental Impact Assessment (EIA). Explain its objectives, need and major steps in India.' },
  { id: 'q05', no: 5, module: 4, icon: 'Dna', title: 'Biodiversity: Levels and Values', answer: q05,
    question: 'Define biodiversity and explain its three levels—genetic diversity, species diversity and ecosystem diversity. Discuss the ecological, economic, genetic, ethical and aesthetic values of biodiversity.' },
  { id: 'q06', no: 6, module: 4, icon: 'TriangleAlert', title: 'Threats to Biodiversity', answer: q06,
    question: 'Explain the major threats to biodiversity, including habitat destruction and fragmentation, pollution, overexploitation, invasive species and climate change. Suggest suitable measures for biodiversity conservation.' },
  { id: 'q07', no: 7, module: 4, icon: 'TreePine', title: 'In-situ and Ex-situ Conservation', answer: q07,
    question: 'Differentiate between in-situ and ex-situ conservation of biodiversity. Explain relevant methods and examples, including national parks, wildlife sanctuaries, biosphere reserves, zoos, botanical gardens, gene banks and cryopreservation.' },
  { id: 'q08', no: 8, module: 4, icon: 'Recycle', title: 'Biogeochemical Cycles', answer: q08,
    question: 'Explain the carbon, nitrogen, oxygen, phosphorus and water cycles with suitable diagrams. Discuss how biogeochemical cycles help maintain soil fertility, ecosystem productivity and ecological balance.' },
  { id: 'q09', no: 9, module: 3, icon: 'Factory', title: 'Air-Pollution-Control Equipment', answer: q09,
    question: 'Explain the principle, working mechanism and applications of air-pollution-control equipment. Discuss ESP, baghouse filter, cyclone separator and wet scrubber.' },
  { id: 'q10', no: 10, module: 3, icon: 'Sun', title: 'Ozone Depletion', answer: q10,
    question: 'What is ozone depletion? Explain its causes, effects and international measures for controlling ozone depletion.' },
].map((q) => ({ ...q, code: `Q${String(q.no).padStart(2, '0')}`, marks: 10 }));

export const byId = (id) => QUESTIONS.find((q) => q.id === id);
export const byModule = (m) => QUESTIONS.filter((q) => q.module === Number(m));
