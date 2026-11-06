import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function pwaPrecacheManifest() {
  return {
    name: 'cnr-pwa-precache-manifest',
    apply: 'build',
    generateBundle(_options, bundle) {
      const files = Object.keys(bundle).filter((file) => file !== 'precache-manifest.json');
      this.emitFile({
        type: 'asset',
        fileName: 'precache-manifest.json',
        source: JSON.stringify([...new Set([...files, 'index.html'])]),
      });
    },
  };
}

export default defineConfig({ plugins: [react(), pwaPrecacheManifest()], base: './' });
