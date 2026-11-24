import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const registry = readFileSync(new URL('../diagrams/index.js', import.meta.url), 'utf8');
const components = readFileSync(new URL('../diagrams/FiveMark.jsx', import.meta.url), 'utf8');

const diagrams = {
  soilFoodSecurity: 'SoilFoodSecurity',
  landUsePlanning: 'LandUsePlanning',
  basinImbalance: 'BasinImbalance',
  waterDistribution: 'WaterDistribution',
  riverLinking: 'RiverLinking',
  seawaterIngress: 'SeawaterIngress',
};

for (const [id, component] of Object.entries(diagrams)) {
  test('five-mark diagram is implemented and registered: ' + id, () => {
    assert.match(components, new RegExp('export function ' + component + '\\s*\\('));
    assert.match(registry, new RegExp('^\\s*' + id + ':\\s*\\{[^\\n]*Component: ' + component, 'm'));
  });
}
