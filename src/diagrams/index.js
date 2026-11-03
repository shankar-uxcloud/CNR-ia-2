import { Greenhouse, EiaFlow, ConservationTree } from './Climate';
import { CarbonCycle, NitrogenCycle, OxygenCycle, PhosphorusCycle, WaterCycle } from './Cycles';
import { Esp, Baghouse, Cyclone, Scrubber } from './Equipment';
import { OzoneDepletion } from './Ozone';

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
};
