import { Greenhouse, EiaFlow, ConservationTree } from './Climate';
import { CarbonCycle, NitrogenCycle, OxygenCycle, PhosphorusCycle, WaterCycle } from './Cycles';
import { Esp, Baghouse, Cyclone, Scrubber } from './Equipment';
import { OzoneDepletion } from './Ozone';
import {
  SoilFoodSecurity,
  LandUsePlanning,
  BasinImbalance,
  WaterDistribution,
  RiverLinking,
  SeawaterIngress,
} from './FiveMark';

// id → { title, Component, hint }  (ids are referenced from the answer content files)
export const DIAGRAMS = {
  greenhouse: { title: 'Greenhouse effect', Component: Greenhouse },
  eia: { title: 'EIA process flowchart', Component: EiaFlow },
  conservation: { title: 'In-situ and ex-situ conservation', Component: ConservationTree },
  carbon: { title: 'Carbon cycle', Component: CarbonCycle },
  nitrogen: { title: 'Nitrogen cycle', Component: NitrogenCycle },
  oxygen: { title: 'Oxygen cycle', Component: OxygenCycle },
  phosphorus: { title: 'Phosphorus cycle', Component: PhosphorusCycle },
  water: { title: 'Water cycle', Component: WaterCycle },
  esp: { title: 'Electrostatic precipitator (ESP)', Component: Esp },
  baghouse: { title: 'Baghouse filter', Component: Baghouse },
  cyclone: { title: 'Cyclone separator', Component: Cyclone },
  scrubber: { title: 'Wet scrubber', Component: Scrubber },
  ozone: { title: 'Ozone-depletion mechanism', Component: OzoneDepletion },
  soilFoodSecurity: { title: 'Soil degradation and food security', Component: SoilFoodSecurity },
  landUsePlanning: { title: 'Sustainable land-use planning', Component: LandUsePlanning },
  basinImbalance: { title: 'Water-surplus and water-deficit basins', Component: BasinImbalance },
  waterDistribution: { title: 'Global water-resource distribution', Component: WaterDistribution },
  riverLinking: { title: 'Himalayan and Peninsular river-linking components', Component: RiverLinking },
  seawaterIngress: { title: 'Seawater ingress in a coastal aquifer', Component: SeawaterIngress },
};
