// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO(S1-02): ganti ke custom domain final setelah domain dibeli (lihat PLANNING.md).
// Nilai ini juga dipakai @astrojs/sitemap dan seluruh canonical/OG URL.
export default defineConfig({
  site: 'https://jauhar-hub.vercel.app',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
