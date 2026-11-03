import { Thermometer, CloudRain, Globe, ClipboardCheck, Dna, TriangleAlert, TreePine, Recycle, Factory, Sun, FileQuestion } from 'lucide-react';
const MAP = { Thermometer, CloudRain, Globe, ClipboardCheck, Dna, TriangleAlert, TreePine, Recycle, Factory, Sun };
export const iconFor = (name) => MAP[name] || FileQuestion;
