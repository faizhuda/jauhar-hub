// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO(S1-02): ganti ke custom domain final setelah domain dibeli (lihat PLANNING.md).
// Nilai ini juga dipakai @astrojs/sitemap dan seluruh canonical/OG URL.
// PENTING: harus PERSIS sama dengan domain Vercel yang benar-benar live —
// beda satu karakter pun membuat og:image/canonical menunjuk ke URL mati,
// dan preview link (WhatsApp dll.) gagal menampilkan gambar (lihat insiden
// 7 Juli 2026: proyek berganti nama dari jauhar-hub ke jauharurbanfarming).
export default defineConfig({
  site: 'https://jauharurbanfarming.vercel.app',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
