# PRD: jauhar-hub
### Website Resmi Jauhar Urban Farming

| | |
|---|---|
| **Program** | KKNT Malaysia 2026 — Jauhar Urban Farming × IIUM |
| **Tema KKN** | Urban Farming with IoT, Promotion, and Economic Empowerment |
| **Divisi** | Teknis (dahulu Divisi IoT) |
| **Repo** | `jauhar-hub` |
| **Versi Dokumen** | 1.8 |
| **Tanggal** | 7 Juli 2026 |
| **Durasi Pelaksanaan** | 14 Juli – 11 Agustus 2026 (4 minggu) |
| **Tim Teknis** | 1 dari 8 anggota (latar belakang Ilmu Komputer) |

---

## Catatan Perubahan

**v1.8** — Fix domain mati merusak social share preview (7 Juli 2026): proyek Vercel berganti nama dari `jauhar-hub` ke `jauharurbanfarming`, tapi `site` di `astro.config.mjs`, `SITE.url` di `src/config.ts`, dan `Sitemap:` di `public/robots.txt` masih hardcode domain lama `jauhar-hub.vercel.app` — yang sekarang 404. Akibatnya **semua URL absolut** (canonical, `og:url`, `og:image`, `twitter:image`, `image`/`url` di JSON-LD LocalBusiness & 6 Product) menunjuk ke gambar/halaman yang sudah mati, sehingga preview link WhatsApp/sosmed gagal menampilkan gambar. Ketiga sumber domain disamakan ke `https://jauharurbanfarming.vercel.app`; ditambahkan juga `og:image:width`/`og:image:height`/`og:image:alt` (1200×630) di `BaseLayout.astro` agar crawler share tidak perlu fetch tambahan untuk menentukan dimensi. **Catatan penting:** WhatsApp meng-cache preview per URL — link yang sudah pernah dibagikan sebelum fix ini tetap perlu di-refresh cache-nya (mis. tempel ulang URL dengan query string dummy, atau tunggu cache WhatsApp kedaluwarsa) agar preview gambar yang benar muncul.

**v1.7** — Arah desain Professional Luxury + foto asli (7 Juli 2026): (1) Design system berevolusi dari editorial minimal ke **Professional Luxury**: palet hijau dipertahankan, ditambah aksen emas antik/champagne (`--color-accent*`), kicker ber-hairline emas, tombol varian `btn-gold`/`btn-ghost-light`; (2) **Hero full-bleed "grande"** di semua halaman (52–88svh, scrim gradasi, tipografi display hingga 76px); (3) Micro-interactions: scroll-reveal fade-up (IntersectionObserver), parallax ringan ±4.5% (rAF), hover lift kartu, zoom foto lambat — semuanya hanya `opacity`/`transform` (CLS aman) dan nonaktif saat `prefers-reduced-motion: reduce`; (4) **Splash screen** branding ±1,6 detik, sekali per sesi tab (sessionStorage), murni CSS sehingga fail-safe tanpa JS; (5) Panel menu mobile mengikuti glassmorphism header (latar transparan di atas `bg-surface/80 + backdrop-blur`); (6) **Seluruh placeholder hijau diganti foto stok berlisensi bebas dari Wikimedia Commons** (CC0/PD/CC BY/CC BY-SA) — daftar sumber & kewajiban atribusi di `docs/image-credits.md`; `npm run placeholders` kini butuh flag `--force` agar foto tidak tertimpa; (7) Gambar hero diberi `quality={60}` untuk menekan bobot varian WebP terbesar (456→352 kB); alt text disinkronkan dengan isi foto baru. Terverifikasi: build bersih, tanpa horizontal scroll di 375px, tanpa error console, hamburger & lightbox berfungsi.

**v1.6** — Skala responsif terhadap viewport (6 Juli 2026): elemen masih terasa terlalu besar di layar dengan display scaling Windows (viewport efektif ±1280×630 CSS px pada monitor 1080p @150%), membuat section/kartu terpotong dan memaksa scroll di tengah konten. Perbaikan: (1) tipografi display & headline kini **fluid via `clamp()`**, menskala mengikuti lebar viewport (display 44–72px, bukan 72px tetap); (2) padding vertikal seluruh section dipangkas (dari `py-20/36` ke `py-12..14/16..20`); (3) rasio gambar kartu produk 1:1 → **4:3** dan padding kartu dipadatkan, kartu kini ±526px sehingga muat utuh dalam satu layar; (4) kartu Vision/Mission tidak lagi memakai `min-height` paksa, tinggi mengikuti konten; (5) offset dekoratif `translate-y`/stagger pada gambar (visi Beranda, tim About) dihapus agar grid rata; (6) hero semua halaman dipadatkan (`min-height` & padding turun). Terverifikasi di 360×740, 1280×630, dan 1920×1080: hero + CTA tampil utuh satu layar, kartu tidak terpotong, tanpa horizontal scroll.

**v1.5** — Perbaikan responsivitas & performa (6 Juli 2026), berdasar feedback pengujian di browser nyata: (1) **Gallery**: hapus efek offset `translate-y-8` pada grid, menyebabkan kartu terlihat tidak sejajar — semua kartu kini rata; (2) **Kartu produk**: rasio gambar diubah dari potret 4:5 ke **1:1** karena di layar 1920×1080 satu kartu tingginya 784px, membuat harga & tombol pesan baru terlihat setelah scroll; (3) **Hero Beranda**: padding & jarak antar-elemen dipangkas, `min-height` diubah dari `75vh`/`85vh` (skala tak terkendali di viewport pendek) ke nilai tetap yang moderat, sehingga CTA "Browse our products" tampil tanpa scroll bahkan di viewport efektif ~650px (browser dengan toolbar/bookmark bar tebal); token `display-lg` diperkecil dari 80px ke 72px; (4) **Font self-hosted** via paket `@fontsource` (bukan lagi CDN Google Fonts) — menghapus 2 request pihak ketiga (`fonts.googleapis.com`, `fonts.gstatic.com`) yang sebelumnya me-render-block First Contentful Paint; font di-bundle bersama build, hanya subset latin, weight 400 & 700.

**v1.4** — Revitalisasi UI (6 Juli 2026): seluruh halaman diadopsikan ke design system editorial: palet Material 3 hijau (primary `#001803`, aksen lime `#ccee94`, skala surface/outline lengkap), tipografi **Libre Caslon Text** (serif, display/headline) + **Hanken Grotesk** (sans, body/label caps), sudut tajam, label uppercase. Token design terpusat di `src/styles/global.css` (`@theme`). Demi Core Web Vitals, mockup referensi diadaptasi, bukan disalin mentah: tanpa CDN Tailwind runtime, tanpa icon font (SVG inline), tanpa `bg-fixed`, gambar tetap lewat pipeline `astro:assets`. Rasio foto produk di Section 11.3 disesuaikan ke potret 4:5. File mockup referensi tidak disimpan di repo.

**v1.3** — Update progress & konten (6 Juli 2026): (1) Build teknis pre-KKN **selesai**: 5 halaman + WhatsApp order + SEO on-site + structured data terbangun penuh dengan data dummy, lolos verifikasi lokal. Status detail di Section 3a dan [PLANNING.md](PLANNING.md) Section 0; (2) Sosial media mitra dikoreksi: **hanya Instagram**, mitra tidak memiliki Facebook (Section 9.3 disesuaikan); (3) Aturan copywriting: teks situs tidak menggunakan em dash; (4) Struktur repo Section 18 disinkronkan dengan implementasi aktual.

**v1.2** — Penyesuaian saat implementasi awal (5 Juli 2026): (1) Bahasa konten & route halaman menggunakan **English** — `/about`, `/products`, `/gallery`, `/contact` — menggantikan route Indonesia di Section 18, menyesuaikan audiens utama warga IIUM Malaysia; (2) Tailwind dipasang sebagai **Tailwind CSS v4 via plugin Vite `@tailwindcss/vite`** karena integrasi `@astrojs/tailwind` sudah deprecated; (3) lokasi schema Content Collections mengikuti konvensi Astro terbaru: `src/content.config.ts` (bukan `src/content/config.ts`); (4) versi framework terpasang: Astro 7.

**v1.1** — Tech stack difinalisasi ke **Astro** (sebelumnya vanilla HTML/CSS/JS). Ditambahkan section baru: SEO Implementation (Section 9), Performance & Optimization (Section 10), dan Mobile Responsiveness (Section 11). Definition of Done diperketat dengan target Core Web Vitals. Timeline disesuaikan dengan ramp-up Astro.

**v1.0** — Dokumen ini **menggantikan** PRD sebelumnya (`kebun-pulse`, sistem monitoring IoT). Proker teknis dialihkan sepenuhnya menjadi pengembangan website — IoT tidak lagi dikerjakan dalam bentuk apapun.

---

## 1. Ringkasan Eksekutif

`jauhar-hub` adalah website resmi Jauhar Urban Farming yang berfungsi sebagai profil digital, katalog produk, dan kanal pemesanan sederhana. Dibangun dengan **Astro** sebagai static site (tanpa backend/database) agar hosting gratis selamanya, performa maksimal, dan mudah dirawat mandiri oleh mitra pasca-KKN. Pemesanan produk diarahkan melalui **WhatsApp click-to-order** — pendekatan yang realistis untuk skala UMKM tanpa kompleksitas payment gateway.

Dengan tidak adanya proker IoT, seluruh bandwidth teknis tim (1 developer + 7 anggota non-teknis) terpusat pada website ini — memberi ruang untuk scope yang lebih lengkap: SEO menyeluruh, optimasi performa, dan kesiapan ditemukan baik di pencarian Google klasik maupun AI search.

---

## 2. Latar Belakang & Masalah

Jauhar Urban Farming belum memiliki kehadiran digital resmi. Dampaknya:

- Calon pembeli/mitra tidak punya cara mudah mengenal profil, produk, dan kegiatan Jauhar secara daring
- Tidak ada kanal digital yang mengarahkan minat menjadi transaksi (pemesanan produk)
- Promosi bergantung sepenuhnya pada komunikasi langsung/mulut ke mulut, sulit menjangkau audiens lebih luas
- Tidak ada data (analytics) untuk mengukur seberapa jauh jangkauan promosi

**Kendala konteks yang membentuk desain solusi:**
- Hanya 1 dari 8 anggota tim berkompetensi teknis → arsitektur harus sesederhana mungkin, tanpa backend yang butuh maintenance berkelanjutan
- Durasi 4 minggu → prioritas pada kelengkapan konten dan kestabilan, bukan fitur canggih yang berisiko tidak selesai
- Mitra akan mengelola website ini secara mandiri setelah KKN selesai → keputusan teknis harus mempertimbangkan kemudahan maintenance jangka panjang, bukan cuma kemudahan development

---

## 3. Tujuan & Metrik Keberhasilan

### Tujuan Utama
Meluncurkan website resmi Jauhar Urban Farming yang **live, lengkap kontennya, cepat, dan dapat ditemukan di Google**, dengan dokumentasi yang memungkinkan mitra melanjutkan pengelolaannya secara mandiri.

### Definition of Done (harus terpenuhi semua)
- [ ] Website live di custom domain dan dapat diakses publik
- [ ] Seluruh halaman inti (Beranda, Tentang Kami, Produk, Galeri, Kontak) terisi konten asli — bukan lorem ipsum/placeholder
- [ ] Tampilan responsif penuh di mobile, tablet, dan desktop (diuji di ≥3 ukuran layar riil)
- [ ] **Core Web Vitals hijau**: LCP < 2.5s, CLS < 0.1, INP < 200ms (diukur via PageSpeed Insights, mode mobile)
- [ ] Lighthouse Performance Score > 90 (mobile)
- [ ] Tombol **"Pesan via WhatsApp"** berfungsi di tiap item produk, otomatis membuka chat dengan pesan template berisi nama produk
- [ ] SEO on-site lengkap: meta title/description unik per halaman, `sitemap.xml`, `robots.txt`, canonical tags
- [ ] Structured data (JSON-LD) terpasang: `LocalBusiness` di Beranda, `Product` di tiap item katalog — tervalidasi via Google Rich Results Test tanpa error
- [ ] Terdaftar & terverifikasi di Google Search Console, sitemap ter-submit
- [ ] Google Business Profile dibuat & proses verifikasi dimulai (selambatnya Minggu 1)
- [ ] Analytics terpasang (Vercel Analytics/Google Analytics)
- [ ] Minimal 1 sesi pelatihan resmi ke mitra: cara request update konten, cara membaca data analytics dasar
- [ ] Dokumentasi lengkap diserahkan: source code, content guide, update guide, tersimpan di repo `jauhar-hub`

### 3a. Status Implementasi (per 7 Juli 2026)

Website sudah live di preview Vercel (`jauharurbanfarming.vercel.app` — proyek Vercel berganti nama dari `jauhar-hub`, lihat catatan v1.8), fondasi teknisnya selesai lebih cepat dari jadwal. Belum ada butir DoD yang bisa dicentang penuh karena masih menunggu custom domain, konten asli, dan validasi eksternal:

**Sudah terbangun & terverifikasi (dengan data dummy), termasuk di preview live:**
- 5 halaman inti + 404, English routes, build produksi bersih di Astro 7
- UI design system **Professional Luxury** (v1.7, evolusi dari editorial v1.4): palet Material 3 hijau + aksen emas/champagne, tipografi serif + sans, hero full-bleed, splash screen, scroll-reveal & parallax ringan, token terpusat di `src/styles/global.css`
- Foto placeholder hijau sudah diganti stok berlisensi bebas dari Wikimedia Commons (v1.7) — kredit & kewajiban atribusi di `docs/image-credits.md`, menunggu foto asli mitra (30 Juli)
- Font self-hosted via `@fontsource`, tanpa request pihak ketiga (v1.5)
- Tombol "Order via WhatsApp" per produk dengan template pesan berisi nama produk, nomor terpusat di `src/config.ts`
- SEO on-site: meta title/description unik per halaman, canonical, Open Graph/Twitter Card, `sitemap.xml`, `robots.txt`
- JSON-LD `LocalBusiness` (Beranda) + `Product` ×6 (katalog), valid saat di-parse dari HTML build
- Responsif mobile-first: tanpa horizontal scroll di 360px, target sentuh ≥44px, hamburger menu + lightbox teruji
- PageSpeed Insights mobile awal: Performance 94, LCP 2.4s, CLS 0.002, TBT 0ms — diukur di preview Vercel sebelum optimasi font v1.5 (lihat catatan perubahan v1.5)
- Content Collections ber-schema Zod (6 produk, 8 foto galeri) + draft content guide & update guide

**Sisa pekerjaan (rincian urutan di [PLANNING.md](PLANNING.md) Section 0):** custom domain, Google Business Profile, seluruh konten asli dari mitra (deadline 30 Juli), validasi eksternal (Rich Results Test, re-audit PageSpeed/CWV setelah v1.5), Analytics, Search Console, uji multi-perangkat, pelatihan mitra, dan serah terima.

---

## 4. Ruang Lingkup

### In Scope
- Website profil lengkap (5 halaman inti) dibangun dengan Astro
- Katalog produk dengan harga + tombol pesan via WhatsApp
- Galeri dokumentasi kegiatan kebun
- SEO menyeluruh: on-site + structured data + Google Business Profile
- Optimasi performa (Core Web Vitals) & mobile responsiveness
- Pelatihan & serah terima ke mitra
- Dokumentasi teknis lengkap

### Out of Scope (Cycle Ini)
- **E-commerce penuh** (keranjang belanja, payment gateway) — butuh backend & jauh lebih kompleks dari yang realistis untuk 1 developer dalam 4 minggu; WhatsApp ordering adalah pengganti yang proporsional untuk skala ini
- **CMS custom / dashboard admin** — lihat Section 17 untuk opsi stretch (Decap CMS)
- Multi-bahasa (ID/EN/Melayu)
- Sistem IoT dalam bentuk apapun — **dihentikan sepenuhnya**, tidak menjadi bagian dari proker ini maupun proker cadangan

---

## 5. Arsitektur & Sitemap

Static site murni — tidak ada server, database, atau proses backend. Astro meng-compile seluruh halaman menjadi HTML statis saat build, di-serve langsung oleh Vercel CDN.

```
┌─────────────────────────────────────────────┐
│  Beranda (/)                                 │
│  Hero + tagline, highlight produk, sekilas   │
│  tentang Jauhar, CTA ke halaman Produk        │
│  → JSON-LD: LocalBusiness                     │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Tentang Kami (/about)                      │
│  Sejarah, visi-misi, tim pengelola            │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Produk (/products)                          │
│  Katalog: foto, nama, harga, deskripsi        │
│  Tombol "Pesan via WhatsApp" per item          │
│  → JSON-LD: Product per item                  │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Galeri (/gallery)                           │
│  Dokumentasi kegiatan & proses kebun          │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│  Kontak (/contact)                           │
│  Lokasi (Maps embed), jam operasional,        │
│  WhatsApp, sosial media                       │
└─────────────────────────────────────────────┘
```

**Prinsip desain:** konten (data produk, teks) dikelola lewat **Astro Content Collections** — terpisah dari markup, tervalidasi schema, agar update konten di masa depan tidak mengharuskan mitra menyentuh struktur halaman.

---

## 6. Spesifikasi Fungsional

| ID | Requirement |
|---|---|
| F1 | Website menampilkan profil lengkap Jauhar Urban Farming (sejarah, visi-misi, kegiatan) |
| F2 | Website menampilkan katalog produk: foto, nama, deskripsi singkat, harga |
| F3 | Setiap produk memiliki tombol "Pesan via WhatsApp" dengan pesan template otomatis berisi nama produk |
| F4 | Website menampilkan galeri dokumentasi kegiatan kebun |
| F5 | Halaman Kontak menyediakan lokasi (Google Maps embed), jam operasional, dan kontak resmi |
| F6 | Website dapat diakses via custom domain, tampil optimal di perangkat mobile |
| F7 | *(Opsional/stretch)* Halaman blog/artikel edukasi singkat seputar urban farming untuk mendukung SEO & branding |

## 7. Spesifikasi Non-Fungsional

| ID | Requirement |
|---|---|
| NF1 | **Fully static** — tanpa backend/database, hosting tetap gratis & maintenance minim |
| NF2 | **Zero-JS by default** — JavaScript hanya dimuat untuk komponen yang benar-benar interaktif (Astro Islands) |
| NF3 | **Core Web Vitals hijau** — LCP < 2.5s, CLS < 0.1, INP < 200ms di perangkat mobile kelas menengah |
| NF4 | **Content-first structure** — data produk/galeri dikelola via Content Collections, terpisah dari markup |
| NF5 | **SEO-ready** — semantic HTML, meta tags lengkap, structured data, sitemap |
| NF6 | **Dapat dirawat mandiri** — panduan update ditulis untuk orang tanpa background coding mendalam |
| NF7 | **Mobile-first** — asumsi mayoritas pengunjung mengakses via HP |

---

## 8. Tech Stack

| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | **Astro** (static output) | Zero-JS by default → performa maksimal; Content Collections untuk data produk tervalidasi; jalur termudah ke Decap CMS via `astro-decap-cms-oauth` |
| Styling | **Tailwind CSS** (via integrasi resmi `@astrojs/tailwind`) | Kecepatan styling + konsistensi desain tanpa CSS file membengkak |
| Interaktivitas | Vanilla JS / Astro Islands seperlunya | Mobile menu, lightbox galeri, filter produk — hanya bagian ini yang membawa JS |
| Data produk | **Astro Content Collections** (+ schema Zod) | Validasi otomatis: harga harus angka, foto wajib ada — mengurangi human error saat tim non-teknis input data |
| Optimasi gambar | **`astro:assets`** (komponen `<Image />` bawaan) | Auto-resize, auto-convert WebP/AVIF, width/height eksplisit → mencegah CLS tanpa kompresi manual |
| Sitemap | `@astrojs/sitemap` | Auto-generate saat build |
| Hosting | **Vercel** (auto-deploy dari GitHub, gratis, SSL otomatis) | |
| Version control | GitHub — repo `jauhar-hub` | |
| Font | **Libre Caslon Text** (serif, display/headline) + **Hanken Grotesk** (sans, body/label), self-hosted via `@fontsource` (bukan CDN), subset latin, weight 400 & 700, `font-display: swap` | Bagian dari design system editorial (v1.4); self-hosted sejak v1.5 agar tidak ada request pihak ketiga yang memblokir FCP |
| Icon | Lucide Icons (SVG inline, bukan icon font) | Icon font memuat seluruh set; SVG inline hanya yang terpakai |
| Form kontak *(opsional)* | Formspree / Web3Forms (gratis, tanpa backend sendiri) | |
| Analytics | Vercel Analytics atau Google Analytics | |

**Catatan ramp-up:** developer perlu ±1 hari familiarisasi Astro di awal Minggu 1 (struktur `.astro`, Content Collections, build flow). Sudah diperhitungkan di timeline Section 12.

---

## 9. SEO Implementation

Target: website **terindeks Google dan eligible untuk rich results** sebelum KKN berakhir, serta siap ditemukan oleh AI search (ChatGPT, Perplexity, Gemini) yang kini banyak dipakai untuk pencarian bisnis lokal.

### 9.1 SEO On-Site (per halaman)

| Item | Implementasi |
|---|---|
| Meta title unik | Format: `[Nama Halaman] — Jauhar Urban Farming`, ≤ 60 karakter |
| Meta description unik | Ringkasan menarik per halaman, ≤ 155 karakter, mengandung kata kunci lokal ("urban farming Gombak", "sayur segar Selangor") |
| Canonical tag | Per halaman, mencegah duplikat konten |
| Semantic HTML | `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>` — satu `<h1>` per halaman |
| Alt text gambar | Deskriptif untuk seluruh gambar produk & galeri |
| Open Graph + Twitter Card | Meta tags agar tampilan share di WhatsApp/sosmed menampilkan preview gambar + judul yang benar — penting karena kanal promosi utama mitra adalah WhatsApp |
| Internal linking | Beranda → Produk → Kontak saling terhubung dengan anchor text deskriptif |

### 9.2 Structured Data (JSON-LD)

Format yang dipakai: **JSON-LD** dalam `<script type="application/ld+json">` — satu-satunya format yang direkomendasikan Google.

**Halaman Beranda — `LocalBusiness`:**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Jauhar Urban Farming",
  "image": "https://[domain]/assets/logo.jpg",
  "url": "https://[domain]",
  "telephone": "+60xxxxxxxxx",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gombak",
    "addressRegion": "Selangor",
    "addressCountry": "MY"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00",
    "closes": "17:00"
  }
}
```

**Halaman Produk — `Product` per item** (di-generate otomatis dari Content Collections):

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[nama produk]",
  "image": "https://[domain]/assets/produk/[foto].jpg",
  "description": "[deskripsi]",
  "offers": {
    "@type": "Offer",
    "price": "[harga]",
    "priceCurrency": "MYR",
    "availability": "https://schema.org/InStock"
  }
}
```

**Aturan penting (pelanggaran = risiko manual action dari Google):**
- ❌ JANGAN pasang `AggregateRating`/bintang review sebelum ada minimal 3 review asli yang tampil di halaman
- ❌ JANGAN markup konten yang tidak terlihat di halaman
- ✅ Data di JSON-LD harus persis sama dengan yang tampil ke pengunjung
- ✅ Validasi seluruh markup via **Google Rich Results Test** sebelum launch

### 9.3 Sinyal Eksternal

| Item | Timing | Catatan |
|---|---|---|
| **Google Business Profile** | Mulai **Minggu 1** | Verifikasi bisa makan waktu berhari-hari s.d. berminggu — kalau baru diurus Minggu 4, tidak akan aktif sebelum KKN selesai. Diurus tim non-teknis dengan pendampingan |
| **Konsistensi NAP** | Sepanjang proyek | Name, Address, Phone di website harus **persis sama** dengan Google Business Profile & sosmed — beda format sedikit bisa membingungkan Google |
| **Google Search Console** | Minggu 3–4 | Daftarkan domain, submit sitemap, minta indexing halaman utama |
| Link dari sosmed mitra | Minggu 4 | Pasang link website di bio Instagram Jauhar (mitra tidak memiliki Facebook) — sinyal awal + sumber traffic langsung |

### 9.4 Ekspektasi Realistis

Domain baru butuh waktu membangun kepercayaan di mata Google. Yang realistis dicapai dalam 4 minggu KKN: **fondasi teknis lengkap + terindeks + Google Business Profile aktif**. Pertumbuhan traffic organik biasanya baru terlihat 2–6 bulan kemudian — dicantumkan di laporan akhir sebagai keberlanjutan pasca-KKN, bukan diklaim sebagai hasil instan.

---

## 10. Performance & Optimization

Target terukur: **Core Web Vitals hijau di mobile** — LCP < 2.5s, CLS < 0.1, INP < 200ms — plus Lighthouse Performance > 90. Diukur via PageSpeed Insights (bukan hanya Lighthouse lokal, karena PageSpeed memakai data koneksi riil).

### 10.1 Optimasi Gambar (dampak terbesar untuk situs katalog)

| Teknik | Implementasi |
|---|---|
| Format modern | `astro:assets` auto-convert ke WebP/AVIF saat build |
| Ukuran responsif | `srcset` otomatis dari komponen `<Image />` — HP tidak mengunduh gambar ukuran desktop |
| Dimensi eksplisit | `width`/`height` wajib di setiap gambar → browser reservasi ruang → **CLS ≈ 0** |
| Lazy loading | `loading="lazy"` untuk semua gambar di bawah lipatan (galeri, produk baris ke-2 dst.) |
| Eager + priority untuk hero | Gambar hero Beranda pakai `loading="eager"` + `fetchpriority="high"` → LCP cepat |
| Batas ukuran sumber | Foto produk dari tim dokumentasi di-resize maks. 1600px sisi terpanjang sebelum masuk repo — mencegah repo bengkak |

### 10.2 Optimasi JavaScript & CSS

| Teknik | Implementasi |
|---|---|
| Zero-JS default | Astro tidak mengirim JS kecuali komponen ditandai interaktif (`client:*`) — mayoritas halaman murni HTML+CSS |
| Islands seperlunya | Hanya mobile menu, lightbox galeri, dan filter produk yang boleh membawa JS — masing-masing dimuat `client:visible` (baru dimuat saat terlihat di viewport) |
| Tailwind purge | Konfigurasi default Tailwind+Astro otomatis membuang class yang tidak terpakai — CSS final biasanya < 20KB |
| Tanpa library berat | Tidak ada jQuery, tidak ada slider library besar — lightbox & carousel pakai solusi ringan (CSS scroll-snap atau vanilla JS < 5KB) |

### 10.3 Font & Aset Lain

| Teknik | Implementasi |
|---|---|
| Font subset | Muat hanya weight yang dipakai (400 dan 700 untuk kedua keluarga font), subset latin saja — bukan seluruh keluarga font |
| `font-display: swap` | Teks langsung tampil dengan font fallback selagi webfont dimuat — tidak ada layar kosong |
| **Self-hosted, bukan CDN** (v1.5) | Font di-bundle via `@fontsource` bersama build — tidak ada request ke domain pihak ketiga (`fonts.googleapis.com`/`fonts.gstatic.com`) yang sebelumnya me-render-block First Contentful Paint |
| SVG inline untuk icon | Hanya icon terpakai yang dimuat, bisa di-style via CSS, tanpa request font tambahan |
| Maps embed lazy | Google Maps di halaman Kontak dimuat `loading="lazy"` — iframe Maps termasuk resource terberat |

### 10.4 Verifikasi

- Audit PageSpeed Insights (mobile) di tiap akhir minggu development, bukan hanya sebelum launch — regresi performa lebih murah diperbaiki dini
- Uji di perangkat HP kelas menengah riil dengan koneksi 4G (bukan hanya emulator laptop + WiFi kampus)

---

## 11. Mobile Responsiveness

Asumsi dasar: **mayoritas pengunjung datang dari HP** (link dibagikan via WhatsApp/Instagram mitra). Desktop adalah kasus sekunder.

### 11.1 Pendekatan

| Prinsip | Implementasi |
|---|---|
| Mobile-first CSS | Style dasar untuk layar kecil, `min-width` breakpoints untuk naik ke tablet/desktop (default Tailwind) |
| Breakpoints | `sm:640px`, `md:768px`, `lg:1024px` — 3 layout utama: 1 kolom (HP), 2 kolom (tablet), 3–4 kolom grid produk (desktop) |
| Viewport meta | `<meta name="viewport" content="width=device-width, initial-scale=1">` di seluruh halaman |
| Tanpa horizontal scroll | Uji semua halaman di lebar 360px (HP kecil yang masih umum) — tidak boleh ada elemen yang memaksa scroll samping |

### 11.2 Touch & Interaksi

| Item | Standar |
|---|---|
| Ukuran target sentuh | Tombol & link minimal **44×44px** — terutama tombol "Pesan via WhatsApp" |
| Jarak antar target | Minimal 8px antar elemen yang bisa disentuh — mencegah salah tekan |
| Tombol WhatsApp | Full-width di mobile, ukuran menonjol — ini CTA utama seluruh situs |
| Navigasi mobile | Hamburger menu sederhana, bisa ditutup dengan tap di luar area menu |
| Form (jika ada) | `type="tel"`, `type="email"` yang sesuai → keyboard HP otomatis menyesuaikan |

### 11.3 Konten di Layar Kecil

- Ukuran font body minimal **16px** — di bawah itu iOS Safari melakukan auto-zoom saat form di-tap dan teks sulit dibaca
- Line-height 1.5–1.7 untuk paragraf
- Gambar produk rasio konsisten — kartu katalog menampilkan **4:3** seragam (foto sumber 1:1 atau 4:3 sama-sama aman, otomatis di-crop oleh `object-cover`); galeri **4:3** — grid tidak "loncat-loncat"
- Tabel (jika ada) dibungkus container `overflow-x: auto` — bukan memaksa layout pecah

### 11.4 Pengujian

Wajib diuji sebelum launch di minimal:
1. HP Android kelas menengah (perangkat anggota tim sendiri)
2. iPhone (minimal via BrowserStack/simulator jika tidak ada perangkat fisik)
3. Tablet ATAU mode landscape HP
4. Desktop 1366px & 1920px

Checklist per perangkat: navigasi berfungsi, tombol WhatsApp mudah dijangkau ibu jari, tidak ada teks terpotong, tidak ada horizontal scroll, gambar tidak gepeng/terpotong aneh.

---

## 12. Timeline & Milestone

| Minggu | Fokus | Output |
|---|---|---|
| **1** | **Hari 1:** setup repo + Vercel + mulai proses Google Business Profile. **Hari 1–2:** ramp-up Astro (struktur project, Content Collections). **Hari 3–7:** discovery — wawancara profil mitra, dokumentasi foto/video awal, wireframe sitemap, setup Tailwind + layout dasar | Skeleton situs jalan di Vercel preview; konten mentah mulai terkumpul; verifikasi GBP berjalan |
| **2** | Development inti: Beranda, Tentang Kami, Produk (+ Content Collections + integrasi WhatsApp order + JSON-LD Product), styling responsif mobile-first | Kerangka situs lengkap dengan data awal, sudah responsif |
| **3** | Development Galeri + Kontak, populate seluruh konten asli, **audit performa pertama (PageSpeed)**, perbaikan Core Web Vitals, setup SEO on-site lengkap + JSON-LD LocalBusiness + validasi Rich Results Test | Situs lengkap & teruji performa, siap review internal |
| **4** | Launch ke domain final, submit Search Console + sitemap, uji multi-perangkat final, pelatihan resmi ke mitra, serah terima dokumentasi | Website live, terindeks, mitra terlatih, laporan akhir selesai |

**Catatan:** bottleneck utama bukan coding, tapi **kecepatan tim non-teknis mengumpulkan konten asli** (foto produk berkualitas, teks profil). Ini dimulai paralel sejak Minggu 1. Fallback jika konten telat: development jalan terus dengan data dummy ber-schema benar, konten asli tinggal swap masuk.

---

## 13. Pembagian Peran Tim (8 Orang)

| Peran | Jumlah | Tanggung Jawab |
|---|---|---|
| **Web Lead** (Faiz) | 1 | Development seluruh halaman (Astro), integrasi WhatsApp order, SEO teknis + structured data, optimasi performa, deploy & konfigurasi domain, dokumentasi teknis |
| **Content & Copywriting** | 2 | Menulis seluruh teks (profil, deskripsi produk), riset kata kunci lokal sederhana ("sayur segar Gombak" dsb.) untuk dipakai di meta description & konten |
| **Photography & Videography** | 2 | Foto produk (pencahayaan natural, rasio seragam), dokumentasi kebun untuk galeri; resize ke maks. 1600px sebelum serah ke Web Lead |
| **Community & Mitra Liaison** | 2 | Koordinasi wawancara dengan pengelola, **pengurusan Google Business Profile bersama mitra (mulai Minggu 1)**, jadwal pelatihan, feedback selama development |
| **Business & Impact Analysis** | 1 | Riset harga kompetitor produk sejenis, susun narasi economic empowerment (dampak digitalisasi terhadap penjualan) untuk laporan akhir |

---

## 14. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten dari mitra terlambat dikumpulkan | Development tertahan menunggu konten asli | Development jalan dengan data dummy tervalidasi schema sejak Minggu 1; konten asli wajib masuk sebelum akhir Minggu 3 |
| Ramp-up Astro lebih lama dari 1 hari | Timeline Minggu 1 terdesak | Fallback: struktur Astro paling dasar (layout + pages) sudah cukup untuk mulai — Content Collections & optimasi lanjutan bisa menyusul di Minggu 2 |
| Verifikasi Google Business Profile tidak selesai sebelum KKN berakhir | GBP belum live saat serah terima | Mulai hari 1; jika tetap belum selesai, dokumentasikan status + langkah lanjutan di dokumen serah terima agar mitra bisa meneruskan |
| Mitra kesulitan update konten pasca-KKN | Website stagnan setelah KKN selesai | Update guide sesederhana mungkin; Decap CMS sebagai stretch goal (Section 17) |
| Foto produk kualitas rendah | Website terkesan kurang profesional | Sesi foto khusus dengan pencahayaan natural, bukan asal di sela kegiatan lain |
| Nomor WhatsApp bisnis berubah pasca-handover | Tombol order tidak berfungsi | Nomor disimpan sebagai satu variabel terpusat di config, bukan hardcode berulang |
| Custom domain lupa diperpanjang tahun depan | Website down setelah 1 tahun | Dokumentasikan tanggal expired + reminder eksplisit di dokumen serah terima |
| Skor performa turun setelah konten asli masuk (foto besar) | Core Web Vitals merah menjelang launch | Audit PageSpeed tiap akhir minggu, bukan hanya sebelum launch; disiplin resize foto di sisi tim dokumentasi |

---

## 15. Luaran / Deliverables

1. Website live di custom domain, fully responsive, Core Web Vitals hijau
2. Source code lengkap di repo GitHub `jauhar-hub`
3. SEO package: structured data tervalidasi, terdaftar di Search Console, sitemap ter-submit, Google Business Profile dibuat
4. Content guide (cara menulis/update deskripsi produk, standar foto, dsb.)
5. Update guide teknis (cara edit konten via GitHub, redeploy otomatis via Vercel)
6. Minimal 1 sesi pelatihan resmi dengan pengelola kebun
7. Laporan analytics awal (data pengunjung selama masa uji, jika waktu mencukupi)
8. *(Stretch)* Integrasi Decap CMS untuk update konten tanpa perlu paham GitHub
9. *(Stretch)* Halaman blog/artikel edukasi

---

## 16. Estimasi Anggaran

| Kategori | Item | Estimasi |
|---|---|---|
| **Perlengkapan yang Diperlukan** | Domain .com 1 tahun | Rp 200.000 |
| | Hosting (Vercel — gratis) | Rp 0 |
| | **Subtotal** | **Rp 200.000** |
| **Bahan Habis Pakai** | Properti foto produk (background, dekorasi kecil) | Rp 40.000 |
| | Alat tulis dokumentasi wawancara | Rp 15.000 |
| | Cetak referensi/moodboard desain | Rp 15.000 |
| | **Subtotal** | **Rp 70.000** |
| **Perjalanan** | Survei & wawancara profil mitra (1x) | Rp 25.000 |
| | Sesi pemotretan produk & dokumentasi (2x) | Rp 50.000 |
| | Sesi pelatihan pengelolaan website (1x) | Rp 25.000 |
| | **Subtotal** | **Rp 100.000** |
| **Lain-lain** | Cetak stiker QR code *(opsional, linking produk fisik → halaman web)* | Rp 70.000 |
| | Cadangan/kontingensi | Rp 60.000 |
| | **Subtotal** | **Rp 130.000** |
| | **TOTAL** | **Rp 500.000** |

---

## 17. Rencana Pengembangan Lanjutan (Stretch Goals)

Dikerjakan **hanya jika** Definition of Done di Section 3 sudah tercapai lebih cepat dari jadwal:

- **Decap CMS via `astro-decap-cms-oauth`** — panel admin di `/admin` agar mitra bisa edit produk/konten lewat form tanpa menyentuh GitHub. Estimasi 3–4 hari termasuk setup GitHub OAuth App + testing di domain production (auth tidak jalan di preview URL — lihat catatan teknis di update guide)
- **Halaman blog/artikel edukasi** — memperkuat SEO dan positioning Jauhar sebagai edukator urban farming
- **Multi-bahasa** (Indonesia/Melayu/English) — Astro punya dukungan i18n bawaan
- **Integrasi WhatsApp Business API** — auto-reply dasar, lebih advanced dari click-to-chat

**Eksplisit di luar rencana jangka pendek:** e-commerce penuh dengan keranjang belanja dan payment gateway — butuh backend, database, dan pertimbangan keamanan transaksi yang jauh melampaui kapasitas 1 developer dalam 4 minggu. Jika dibutuhkan, jadikan proyek terpisah pasca-KKN.

---

## 18. Repository & Version Control

**Nama repo:** `jauhar-hub`

**Struktur project (Astro) — sesuai implementasi aktual (v1.3):**

```
jauhar-hub/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Beranda (JSON-LD LocalBusiness)
│   │   ├── about.astro
│   │   ├── products.astro       # katalog (JSON-LD Product per item)
│   │   ├── gallery.astro        # grid + lightbox <dialog>
│   │   ├── contact.astro        # Maps embed lazy, NAP, jam operasional
│   │   └── 404.astro
│   ├── layouts/
│   │   └── BaseLayout.astro     # <head> bersama: meta, canonical, OG/Twitter
│   ├── components/
│   │   ├── Header.astro         # nav + hamburger menu mobile
│   │   ├── Footer.astro
│   │   ├── ProductCard.astro    # foto, harga MYR, tombol WhatsApp, JSON-LD
│   │   ├── WhatsAppCta.astro    # tombol order (link wa.me + template pesan)
│   │   └── JsonLd.astro         # helper structured data
│   ├── config.ts                # SATU sumber kebenaran: nomor WA, NAP, jam, sosmed
│   ├── content.config.ts        # schema Zod koleksi products & gallery
│   ├── content/
│   │   ├── products/            # 1 file .md per produk (6 dummy)
│   │   └── gallery/             # 1 file .md per foto (8 dummy)
│   ├── styles/global.css        # design tokens: palet M3 hijau + aksen emas, tipografi, animasi & splash
│   └── assets/                  # gambar sumber (stok Commons sementara — dioptimasi otomatis saat build)
├── public/
│   ├── robots.txt
│   └── favicon.svg
├── scripts/
│   └── generate-placeholders.mjs # generator gambar dummy (butuh --force; assets kini foto asli)
├── docs/
│   ├── content-guide.md         # panduan isi konten (draft)
│   ├── update-guide.md          # panduan update & serah terima (draft)
│   ├── image-credits.md         # sumber & lisensi foto stok Wikimedia Commons (v1.7)
│   └── training-notes.md        # (dibuat di Sprint 4)
├── astro.config.mjs             # site URL, integrasi sitemap, plugin Tailwind
├── PLANNING.md                  # sprint planning end-to-end + status progress
└── README.md                    # overview proyek + link ke PRD ini
```

**Rekomendasi:** commit sejak Minggu 1 begitu struktur dasar terbentuk — memudahkan tracking progres dan jadi bukti kerja yang rapi untuk laporan akhir KKN.
