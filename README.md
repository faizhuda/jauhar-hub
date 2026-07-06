# jauhar-hub

Website resmi **Jauhar Urban Farming** — profil digital, katalog produk, dan kanal
pemesanan via WhatsApp. Dibangun oleh tim KKNT Inovasi IPB University × IIUM 2026.

**Live:** https://jauhar-hub.vercel.app *(TODO: custom domain menyusul — S1-02)*

## Tech stack

- [Astro](https://astro.build) 7 (fully static, zero-JS by default)
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Design system editorial: palet Material 3 hijau + tipografi Libre Caslon Text (serif)
  dan Hanken Grotesk (sans), token terpusat di `src/styles/global.css`
- Content Collections + Zod untuk data produk & galeri
- `@astrojs/sitemap`, JSON-LD (`LocalBusiness` + `Product`)
- Icon: SVG inline (tanpa icon font), gambar via pipeline `astro:assets`
- Hosting: Vercel (auto-deploy dari branch `main`)

## Menjalankan

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # build produksi ke dist/ + validasi konten
npm run placeholders   # regenerate gambar dummy (hanya selama konten asli belum masuk)
```

## Struktur penting

```
src/config.ts              # SATU sumber kebenaran: nomor WhatsApp, NAP, jam, sosmed
src/styles/global.css      # design tokens: warna & tipografi, ubah tampilan dari sini
src/content/products/      # 1 file .md per produk (lihat docs/content-guide.md)
src/content/gallery/       # 1 file .md per foto galeri
src/assets/                # gambar sumber (maks. 1600px, dioptimasi saat build)
src/pages/                 # index, about, products, gallery, contact, 404
docs/                      # content guide & update guide (materi serah terima mitra)
```

## Dokumen proyek

- [PRD.md](PRD.md) — Product Requirements Document (scope, DoD, SEO, performa)
- [PLANNING.md](PLANNING.md) — sprint planning end-to-end (14 Juli – 11 Agustus 2026)
- [docs/content-guide.md](docs/content-guide.md) — cara mengisi/update konten
- [docs/update-guide.md](docs/update-guide.md) — cara deploy & serah terima

> **Catatan:** seluruh foto & sebagian teks saat ini masih **dummy placeholder**.
> Konten asli dari mitra masuk paling lambat 30 Juli 2026 (PLANNING.md §8).
