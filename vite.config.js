import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

function pwaPrecacheManifest() {
  return {
    name: 'cnr-pwa-precache-manifest',
    apply: 'build',
    generateBundle(_options, bundle) {
      const files = Object.keys(bundle).filter((file) => file !== 'precache-manifest.json' && file !== 'sw.js');
      const buildId = files.slice().sort().join('|').split('').reduce(
        (hash, char) => Math.imul(hash ^ char.charCodeAt(0), 16777619),
        2166136261,
      ).toString(36);
      this.emitFile({
        type: 'asset',
        fileName: 'precache-manifest.json',
        source: JSON.stringify([...new Set([...files, 'index.html'])]),
      });
      const worker = readFileSync(new URL('./src/pwa/sw.js', import.meta.url), 'utf8');
      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: worker.replace('__BUILD_ID__', buildId),
      });
    },
  };
}

export default defineConfig({ plugins: [react(), pwaPrecacheManifest()], base: './' });
