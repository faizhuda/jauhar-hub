# Sprint Planning End-to-End: jauhar-hub

| | |
|---|---|
| **Referensi** | [PRD.md](PRD.md) v1.6 — sumber kebenaran scope & Definition of Done |
| **Konteks** | KKNT Inovasi IPB Internasional × Jauhar Urban Farming, IIUM Gombak, Selangor |
| **Pelaksanaan** | Selasa 14 Juli – Selasa 11 Agustus 2026 (29 hari di lokasi) |
| **Pra-KKN** | 5 – 13 Juli 2026 (Sprint 0, dikerjakan dari Indonesia) |
| **Tim** | 8 orang — 1 Web Lead (Faiz, Ilkom) + 7 anggota non-teknis |
| **Status** | 🟢 Build teknis pre-KKN selesai (lihat Section 0) |
| **Catatan penting** | Proker IoT & Telegram Bot pada Proposal **tidak dilaksanakan**. Website (dahulu "backup proker" di Proposal §3.3) kini menjadi **proker teknis utama** dengan scope penuh sesuai PRD |

---

## 0. Status Progress (update 6 Juli 2026)

Website 5 halaman sudah terbangun penuh dengan data dummy dan lolos verifikasi lokal: build produksi bersih (Astro 7), SEO on-site lengkap, JSON-LD valid, responsif teruji di 360px. Pekerjaan teknis Sprint 0 sampai sebagian besar Sprint 2–3 selesai lebih cepat dari jadwal, sehingga fokus KKN nanti bergeser ke jalur konten & mitra, deployment, dan validasi eksternal.

### ✅ Sudah selesai (pre-KKN)

| Task | Cakupan | Catatan |
|---|---|---|
| S0-01, S0-02, S0-04, S0-08 | Scaffold & fondasi | Astro 7 + Tailwind 4 + sitemap; repo terhubung ke Vercel, auto-deploy `main` jalan di `jauhar-hub.vercel.app`; schema Zod `products`/`gallery` + 6 produk & 8 foto dummy; template pesan WA di `src/config.ts` |
| S1-08, S1-09, S1-10 | Layout & navigasi | BaseLayout (meta/OG/canonical) + Header/Footer; Content Collections di `src/content.config.ts`; hamburger menu teruji (tap di luar + Escape) |
| S1-12 (awal) | Audit PageSpeed baseline | Mobile: Performance 94, LCP 2.4s, CLS 0.002, TBT 0ms — diukur sebelum optimasi font v1.5, akan diulang setelah v1.5 |
| S2-01 s.d. S2-06 | Halaman inti + WA order | Home/About/Products lengkap (data dummy); tombol WA per produk ≥44px, full-width mobile; JSON-LD Product ×6; tanpa horizontal scroll di 360px |
| S3-01, S3-02, S3-04, S3-05, S3-07 | Galeri, Kontak, SEO | Gallery + lightbox `<dialog>` vanilla; Contact + Maps lazy; meta unik ≤60/≤155 per halaman; JSON-LD LocalBusiness; robots.txt + sitemap 5 halaman |
| S3-11 (draft) | Dokumentasi | `docs/content-guide.md` & `docs/update-guide.md` versi stub |

Keputusan yang sudah diambil: konten & route English (PRD v1.2); sosmed resmi mitra **hanya Instagram**, tidak ada Facebook; copywriting situs tanpa em dash (PRD v1.3); UI memakai design system editorial (PRD v1.4): palet Material 3 hijau (#001803 primary, #ccee94 lime), tipografi Libre Caslon Text (serif display) + Hanken Grotesk (sans body), sudut tajam, label caps, token terpusat di `src/styles/global.css`. Demi Core Web Vitals, mockup referensi diadaptasi: icon font & CDN Tailwind diganti SVG inline + Tailwind ter-compile, tanpa `bg-fixed`.

**Perbaikan v1.6 (skala responsif):** tipografi display/headline jadi fluid via `clamp()` mengikuti lebar viewport; padding section dipangkas menyeluruh; kartu produk 4:3 dan lebih padat; `min-height` paksa di kartu bento dihapus; offset dekoratif gambar dihapus. Hasil: hero + CTA dan setiap kartu tampil utuh satu layar, teruji di viewport efektif 1280×630 (display scaling 150%), 360×740, dan 1920×1080.

**Perbaikan v1.5 (hasil feedback pengujian di preview Vercel):** grid Gallery diluruskan (hapus offset stagger); rasio gambar kartu produk diubah 4:5 → 1:1 (kartu 784px di 1080p sebelumnya menyembunyikan harga & CTA di bawah lipatan); hero Beranda dipadatkan (padding & margin dipangkas, `min-height` vh diganti nilai tetap moderat) sehingga tombol CTA tampil tanpa scroll bahkan di viewport efektif ~650px; token `display-lg` 80px → 72px; font pindah dari CDN Google Fonts ke self-hosted `@fontsource` untuk menghapus 2 request pihak ketiga yang me-render-block FCP.

### ⏭️ Berikutnya (urutan eksekusi)

1. **Re-audit PageSpeed** di preview Vercel setelah optimasi font v1.5, verifikasi FCP membaik (S1-12 lanjutan)
2. **Beli domain** + update URL di `astro.config.mjs`, `src/config.ts`, `public/robots.txt` (S1-02)
3. **Google Business Profile** mulai Hari 1 KKN, 14 Juli (S1-03)
4. **Seluruh jalur konten & mitra**: wawancara profil (S1-05), NAP + nomor WA resmi (S1-06), foto asli (S1-07, S2-08), harga final (S1-11, S2-10), copywriting final (S2-07), konten 100% masuk 30 Juli (S3-03)
5. **Validasi eksternal setelah live**: Rich Results Test (S3-06), CWV/PageSpeed production (S3-08, S4-04)
6. **Menjelang & saat launch**: Analytics (S3-09), Search Console (S4-02), uji multi-perangkat (S4-03), pelatihan + dokumentasi final + serah terima (S4-06 s.d. S4-11)

---

## 1. Pendekatan Sprint

- **Kadens:** 1 sprint = 1 minggu, mengikuti timeline PRD Section 12. Total **Sprint 0 (pra-KKN) + 4 sprint di lokasi**.
- **Prinsip utama:** bottleneck bukan coding, tapi **kecepatan pengumpulan konten asli** dari mitra. Development tidak pernah menunggu konten — jalan terus dengan data dummy tervalidasi schema, konten asli tinggal swap.
- **Dua jalur paralel setiap sprint:**
  - **Jalur Teknis** (Web Lead) — development, SEO teknis, performa, deploy
  - **Jalur Konten & Mitra** (7 anggota) — konten, foto, GBP, koordinasi mitra, bisnis

### Ceremonies

| Kegiatan | Kapan | Durasi | Peserta |
|---|---|---|---|
| Daily sync | Tiap pagi | 15 menit | Semua |
| Content check-in | Selasa & Jumat | 15 menit | Web Lead + Konten + Foto |
| **Audit PageSpeed** | **Tiap Jumat** | 30 menit | Web Lead |
| Sprint review + demo | Tiap Senin (akhir sprint) | 45 menit | Semua (+ mitra jika bisa) |
| Retro singkat | Setelah review | 15 menit | Semua |

### Peran (dari PRD Section 13)

| Kode | Peran | Jumlah |
|---|---|---|
| **WL** | Web Lead (Faiz) | 1 |
| **KC** | Content & Copywriting | 2 |
| **FV** | Photography & Videography | 2 |
| **LI** | Community & Mitra Liaison | 2 |
| **BA** | Business & Impact Analysis | 1 |

---

## 2. Epics

| Epic | Nama | Referensi PRD |
|---|---|---|
| E1 | Setup & Infrastruktur (repo, Astro, Tailwind, Vercel, domain) | §8, §18 |
| E2 | Design System & Layout (BaseLayout, Header, Footer, wireframe) | §5, §11 |
| E3 | Konten & Content Collections (schema Zod, produk, galeri, teks) | §5, NF4 |
| E4 | Halaman Inti ×5 (Beranda, Tentang, Produk, Galeri, Kontak) | F1–F5 |
| E5 | WhatsApp Click-to-Order | F3 |
| E6 | SEO On-site & Structured Data (meta, JSON-LD, sitemap) | §9.1–9.2 |
| E7 | Sinyal Eksternal (Google Business Profile, Search Console, sosmed) | §9.3 |
| E8 | Performa & Core Web Vitals | §10 |
| E9 | QA Multi-Perangkat & Responsiveness | §11 |
| E10 | Dokumentasi, Pelatihan & Serah Terima | §15 |
| E11 | *(Stretch)* Decap CMS / Blog | §17 |

---

## 3. Sprint 0 — Pra-Keberangkatan (5–13 Juli, dari Indonesia)

> **Goal:** de-risk Minggu 1. Semua yang bisa dikerjakan tanpa kehadiran fisik di IIUM, dikerjakan sekarang. Jika ada yang tidak selesai, otomatis jatuh ke Sprint 1 sesuai timeline PRD — tidak ada yang blocking.

| ID | Task | Owner | Epic | Output / Acceptance |
|---|---|---|---|---|
| S0-01 | Ramp-up Astro: struktur `.astro`, Content Collections, Islands, build flow | WL | E1 | Bisa menjelaskan & mempraktikkan konsep inti; PRD alokasikan ±1 hari |
| S0-02 | Scaffold project: `create astro` + Tailwind + `@astrojs/sitemap`, push ke repo `jauhar-hub`, auto-deploy Vercel jalan | WL | E1 | Hello-world live di URL preview Vercel |
| S0-03 | Wireframe low-fi 5 halaman (mobile-first) | WL + KC | E2 | Sketsa disepakati tim; jadi acuan Sprint 1–2 |
| S0-04 | Draft schema Content Collections (`produk`, `galeri`) + ≥6 data dummy produk | WL | E3 | Schema Zod: harga = number, foto wajib; build lolos validasi |
| S0-05 | **Checklist kebutuhan konten** untuk mitra: daftar teks (sejarah, visi-misi, tim), daftar foto (per produk, kebun, kegiatan), data NAP & jam operasional | KC + LI | E3 | 1 dokumen checklist siap dibawa ke wawancara Minggu 1 |
| S0-06 | Riset kata kunci lokal awal ("urban farming Gombak", "sayur segar Selangor", "pickled cucumber IIUM", dst.) | KC | E6 | Daftar 10–15 keyword untuk meta description & copy |
| S0-07 | Shortlist 3 kandidat nama domain .com + cek ketersediaan & harga | WL + BA | E1 | Rekomendasi domain siap dieksekusi Hari 1 |
| S0-08 | Draft template pesan WhatsApp order (per produk) | KC | E5 | Template disetujui tim, nomor WA menyusul dari mitra |
| S0-09 | Standar foto produk: pencahayaan natural, rasio seragam (1:1 atau 4:3), resize maks. 1600px | FV + WL | E3 | 1 halaman panduan; disiplin resize dimulai dari foto pertama |

**Definition of Done Sprint 0:** skeleton Astro live di Vercel preview; checklist konten & standar foto final; tim non-teknis paham perannya di Minggu 1.

---

## 4. Sprint 1 — Fondasi & Discovery (Selasa 14 – Senin 20 Juli)

> **Goal (dari PRD):** skeleton situs jalan di Vercel preview, konten mentah mulai terkumpul, verifikasi Google Business Profile berjalan.

| ID | Task | Owner | Epic | Hari | Output / Acceptance |
|---|---|---|---|---|---|
| S1-01 | Setup repo + Vercel *(skip jika S0-02 selesai)* | WL | E1 | 1 | Auto-deploy dari `main` berfungsi |
| S1-02 | Beli & konfigurasi domain .com (Rp 200.000, sesuai anggaran PRD §16) | WL | E1 | 1 | Domain aktif; **catat tanggal expired** untuk dokumen serah terima |
| S1-03 | **Mulai pengurusan Google Business Profile bersama mitra** — kritis Hari 1, verifikasi bisa makan waktu berminggu-minggu | LI (didampingi WL) | E7 | 1 | Profil ter-submit; proses verifikasi berjalan |
| S1-04 | Ramp-up Astro lanjutan *(skip/persingkat jika S0-01 selesai)* | WL | E1 | 1–2 | — |
| S1-05 | Wawancara profil mitra: sejarah (sejak 2021, Mahallah Halimah/Siddiq/Maryam), visi-misi, tim pengelola, kegiatan | LI + KC | E3 | 3–5 | Transkrip/raw notes lengkap sesuai checklist S0-05 |
| S1-06 | **Finalisasi NAP resmi** (Name, Address, Phone) + jam operasional + nomor WA order — satu sumber kebenaran, dipakai konsisten di website, GBP, dan sosmed | LI | E7 | 3–5 | NAP terdokumentasi; nomor WA masuk sebagai **satu variabel config terpusat** |
| S1-07 | Sesi foto #1: produk (mentimun segar, acar, keripik) + dokumentasi kebun | FV | E3 | 3–7 | Foto rasio seragam, ter-resize ≤1600px, terorganisir per folder |
| S1-08 | BaseLayout (`<head>` bersama: meta, OG, viewport) + Header + Footer + routing 5 halaman skeleton | WL | E2 | 3–7 | 5 URL hidup di preview, navigasi jalan, semantic HTML |
| S1-09 | Content Collections final di repo + data dummy ber-schema | WL | E3 | 3–7 | `src/content.config.ts` + koleksi `products/` & `gallery/` build lolos |
| S1-10 | Mobile menu (hamburger, Astro Island `client:visible`, bisa ditutup tap di luar) | WL | E2 | 6–7 | Berfungsi di layar 360px |
| S1-11 | Riset harga kompetitor produk sejenis | BA | E3 | 3–7 | Rekomendasi harga untuk katalog |
| S1-12 | Audit PageSpeed #1 (Jumat) — baseline skeleton | WL | E8 | Jumat | Skor baseline tercatat |

**Definition of Done Sprint 1:** 5 halaman skeleton live di preview; GBP ter-submit; NAP final; wawancara selesai; batch foto pertama masuk; data dummy tervalidasi.

---

## 5. Sprint 2 — Development Inti (Selasa 21 – Senin 27 Juli)

> **Goal (dari PRD):** kerangka situs lengkap dengan data awal, sudah responsif — Beranda, Tentang Kami, Produk fungsional penuh.

| ID | Task | Owner | Epic | Output / Acceptance |
|---|---|---|---|---|
| S2-01 | **Beranda**: hero (gambar `loading="eager"` + `fetchpriority="high"`) + tagline, highlight produk, sekilas Jauhar, CTA ke Produk | WL | E4 | LCP element teroptimasi sejak awal |
| S2-02 | **Tentang Kami**: sejarah, visi-misi, tim pengelola — dari hasil wawancara S1-05 | WL (teks: KC) | E4 | Konten asli, bukan placeholder |
| S2-03 | **Produk**: grid katalog dari Content Collections (foto via `<Image />`, nama, harga MYR, deskripsi) | WL | E4 | Grid 1 kolom (HP) / 2 (tablet) / 3–4 (desktop) |
| S2-04 | **Tombol "Pesan via WhatsApp"** per produk: `wa.me` + pesan template otomatis berisi nama produk; nomor dari config terpusat | WL | E5 | Klik → chat terbuka dengan template benar; tombol full-width di mobile, ≥44×44px |
| S2-05 | JSON-LD `Product` per item, di-generate otomatis dari Content Collections | WL | E6 | Data JSON-LD = persis data yang tampil; **tanpa** AggregateRating |
| S2-06 | Styling responsif mobile-first seluruh halaman yang ada (breakpoint sm/md/lg; uji 360px tanpa horizontal scroll) | WL | E9 | Lolos cek di ≥2 perangkat tim |
| S2-07 | **Copywriting final**: deskripsi semua produk + teks Beranda & Tentang (pakai keyword S0-06) | KC | E3 | Masuk repo paling lambat **Senin 27 Juli** |
| S2-08 | Sesi foto #2: menambal kekurangan dari review batch #1 | FV | E3 | Semua produk punya foto layak; resize ≤1600px |
| S2-09 | Follow-up verifikasi GBP + mulai isi konten profil (foto, deskripsi, jam) | LI | E7 | Status verifikasi terpantau |
| S2-10 | Harga final & paket produk (hasil S1-11, disepakati mitra) | BA + LI | E3 | Harga masuk Content Collections |
| S2-11 | Audit PageSpeed #2 (Jumat) — dengan halaman & gambar nyata | WL | E8 | Regresi ditangani minggu ini juga, bukan ditunda |

**Definition of Done Sprint 2:** Beranda + Tentang + Produk fungsional & responsif dengan konten awal asli; WA order jalan end-to-end; JSON-LD Product terpasang; copywriting final terkumpul.

---

## 6. Sprint 3 — Kelengkapan, Konten Asli 100%, SEO & Performa (Selasa 28 Juli – Senin 3 Agustus)

> **Goal (dari PRD):** situs lengkap & teruji performa, siap review internal. Ini sprint gerbang kualitas — semua konten asli wajib masuk.

| ID | Task | Owner | Epic | Output / Acceptance |
|---|---|---|---|---|
| S3-01 | **Galeri**: dokumentasi kegiatan dari Content Collections + lightbox ringan (vanilla JS <5KB, `client:visible`), semua gambar `loading="lazy"` | WL | E4 | Grid rasio konsisten, tidak ada CLS |
| S3-02 | **Kontak**: Google Maps embed (`loading="lazy"`), jam operasional, WhatsApp, sosmed — NAP persis sama dengan GBP | WL | E4 | NAP konsisten 100% |
| S3-03 | 🚩 **HARD DEADLINE KONTEN ASLI: Kamis 30 Juli** — seluruh teks & foto asli menggantikan dummy | KC + FV → WL | E3 | Zero placeholder/lorem ipsum di seluruh situs |
| S3-04 | SEO on-site lengkap: meta title (≤60 kar) & description (≤155 kar) unik per halaman, canonical, Open Graph + Twitter Card, alt text semua gambar, internal linking | WL | E6 | Share ke WhatsApp menampilkan preview benar |
| S3-05 | JSON-LD `LocalBusiness` di Beranda (data dari NAP S1-06) | WL | E6 | Data = yang tampil di halaman |
| S3-06 | **Validasi Google Rich Results Test** — seluruh halaman ber-JSON-LD | WL | E6 | Nol error |
| S3-07 | `robots.txt` + verifikasi `sitemap.xml` ter-generate benar | WL | E6 | Sitemap memuat 5 halaman |
| S3-08 | **Audit performa menyeluruh + perbaikan CWV**: target LCP <2.5s, CLS <0.1, INP <200ms, Lighthouse >90 (mobile) — via PageSpeed Insights | WL | E8 | CWV hijau **sebelum** review internal |
| S3-09 | Pasang Analytics (Vercel Analytics / GA) | WL | E1 | Data pengunjung mulai terekam |
| S3-10 | Review internal: seluruh tim + feedback mitra atas preview | Semua + mitra | E9 | Daftar perbaikan terprioritisasi, dieksekusi sebelum Sprint 4 |
| S3-11 | Mulai draft `docs/content-guide.md` & `docs/update-guide.md` | WL + KC | E10 | Draft ≥70%; bahasa untuk orang non-coding |
| S3-12 | Follow-up GBP; jika sudah terverifikasi → lengkapi 100% | LI | E7 | Status tercatat |

### 🚦 Gate Keputusan Stretch Goals (Senin 3 Agustus, saat sprint review)

Stretch (Decap CMS / blog — PRD §17) **hanya** dikerjakan jika saat gate ini: seluruh DoD PRD Section 3 sudah tercapai/on-track, CWV hijau, dan konten asli 100% masuk. Jika ragu → **tidak** ambil stretch; prioritas Sprint 4 adalah launch stabil + serah terima.

**Definition of Done Sprint 3:** 5 halaman lengkap dengan konten asli 100%; SEO on-site + structured data tervalidasi tanpa error; CWV hijau di preview; analytics jalan; feedback review internal sudah dieksekusi.

---

## 7. Sprint 4 — Launch, Serah Terima & Pelatihan (Selasa 4 – Selasa 11 Agustus)

> **Goal (dari PRD):** website live di domain final, terindeks, mitra terlatih, laporan akhir selesai.

| ID | Task | Owner | Epic | Hari | Output / Acceptance |
|---|---|---|---|---|---|
| S4-01 | **Launch**: arahkan DNS domain final ke Vercel, SSL aktif, redirect preview → domain | WL | E1 | 1 | Website publik di custom domain |
| S4-02 | **Google Search Console**: verifikasi domain, submit sitemap, request indexing 5 halaman | WL | E7 | 1–2 | Sitemap ter-submit; status indexing terpantau |
| S4-03 | **Uji final multi-perangkat** (matrix di Section 9): Android kelas menengah + koneksi 4G, iPhone/simulator, tablet/landscape, desktop 1366 & 1920 | Semua (perangkat masing-masing) | E9 | 2–3 | Checklist per perangkat lolos semua |
| S4-04 | Audit PageSpeed **final di production** | WL | E8 | 2–3 | CWV hijau + Lighthouse >90 di domain final, ter-screenshot untuk laporan |
| S4-05 | Pasang link website di bio Instagram mitra (mitra tidak memiliki Facebook) | LI | E7 | 2–4 | Link aktif |
| S4-06 | Finalisasi dokumentasi: `docs/content-guide.md`, `docs/update-guide.md`, `docs/training-notes.md`, README | WL + KC | E10 | 3–5 | Lengkap di repo; termasuk **tanggal expired domain + reminder perpanjangan** |
| S4-07 | **Sesi pelatihan resmi mitra** (≥1 sesi): cara request update konten, alur edit via GitHub → auto-deploy Vercel, cara baca analytics dasar | WL + LI | E10 | 5–6 | Terdokumentasi (foto + notulen) untuk laporan KKN |
| S4-08 | Laporan analytics awal (data masa uji) | WL + BA | E10 | 6–7 | Ringkasan pengunjung untuk laporan akhir |
| S4-09 | **Serah terima**: akses repo GitHub, Vercel, registrar domain, GBP ke mitra; walkthrough dokumen | WL + LI | E10 | 7–8 | Berita acara serah terima |
| S4-10 | Jika GBP belum terverifikasi: dokumentasikan status + langkah lanjutan di dokumen serah terima | LI | E7 | 7–8 | Mitra bisa meneruskan mandiri |
| S4-11 | Narasi economic empowerment (dampak digitalisasi) untuk laporan akhir KKN | BA | E10 | 5–8 | Bab laporan selesai |
| S4-12 | *(Stretch, hanya jika gate lolos)* Decap CMS via `astro-decap-cms-oauth` — butuh 3–4 hari, auth hanya jalan di domain production | WL | E11 | 1–5 | `/admin` fungsional; panduan di update-guide |

### ✅ Launch Checklist (gate sebelum S4-01, semua wajib ✓)

- [ ] Konten asli 100% — nol placeholder
- [ ] Tombol WA order berfungsi di **setiap** produk dengan template benar
- [ ] CWV hijau + Lighthouse >90 (mobile) di preview
- [ ] Rich Results Test: nol error di semua halaman ber-JSON-LD
- [ ] Meta title/description unik per halaman; OG preview benar saat share WA
- [ ] NAP di website = GBP = sosmed, persis sama
- [ ] Tidak ada horizontal scroll di 360px; target sentuh ≥44×44px
- [ ] `sitemap.xml` & `robots.txt` benar
- [ ] Analytics merekam data
- [ ] Semua gambar punya alt text + width/height eksplisit

---

## 8. Pipeline Konten (Manajemen Bottleneck Utama)

| Item Konten | Owner | Deadline | Dipakai di |
|---|---|---|---|
| Checklist kebutuhan konten | KC + LI | Sprint 0 (13 Jul) | Panduan wawancara |
| NAP resmi + jam operasional + nomor WA | LI | Sprint 1 (17 Jul) | Config, Kontak, GBP, JSON-LD |
| Hasil wawancara (sejarah, visi-misi, tim) | LI + KC | Sprint 1 (19 Jul) | Tentang Kami, Beranda |
| Foto batch #1 (produk + kebun) | FV | Sprint 1 (20 Jul) | Produk, Galeri, hero |
| Harga final + daftar produk lengkap | BA + LI | Sprint 2 (24 Jul) | Content Collections |
| Copywriting final semua halaman | KC | Sprint 2 (27 Jul) | Semua halaman |
| Foto batch #2 (penambal kekurangan) | FV | Sprint 2 (27 Jul) | Produk, Galeri |
| 🚩 **Konten asli 100% masuk repo** | Semua → WL | **Kamis 30 Juli** | Gerbang Sprint 3 |

**Aturan:** konten telat ≠ development berhenti. Dummy ber-schema jalan terus; setiap keterlambatan dieskalasi di daily sync, bukan didiamkan.

---

## 9. Testing Matrix (Sprint 4, wajib sebelum launch — PRD §11.4)

| # | Perangkat | Jaringan | Checklist |
|---|---|---|---|
| 1 | Android kelas menengah (HP anggota tim) | **4G riil** | Navigasi, tombol WA terjangkau ibu jari, tanpa teks terpotong, tanpa horizontal scroll, gambar tidak distorsi |
| 2 | iPhone (fisik / BrowserStack / simulator) | WiFi | idem + tidak ada auto-zoom saat tap form (font ≥16px) |
| 3 | Tablet ATAU HP landscape | WiFi | Layout 2 kolom benar |
| 4 | Desktop 1366px & 1920px | WiFi | Grid 3–4 kolom, tanpa elemen melar |

---

## 10. Risiko per Sprint (dari PRD §14)

| Risiko | Sprint kritis | Mitigasi di rencana ini |
|---|---|---|
| Konten mitra terlambat | 1–3 | Dummy ber-schema sejak Sprint 0; hard deadline 30 Juli; eskalasi via daily sync |
| Ramp-up Astro >1 hari | 0–1 | Ramp-up dimajukan ke Sprint 0; fallback: layout+pages dulu, Content Collections menyusul Sprint 2 |
| Verifikasi GBP tidak selesai | 1–4 | Mulai Hari 1 (S1-03); fallback dokumentasi status (S4-10) |
| Mitra kesulitan update pasca-KKN | 3–4 | Update guide non-teknis (S3-11, S4-06) + pelatihan (S4-07); Decap CMS hanya sebagai stretch |
| Foto kualitas rendah | 1–2 | Standar foto (S0-09) + 2 sesi foto terjadwal + review antar-batch |
| Nomor WA berubah pasca-handover | 2 | Nomor = satu variabel config terpusat (S1-06, S2-04) |
| Domain lupa diperpanjang | 4 | Tanggal expired dicatat sejak S1-02, masuk dokumen serah terima (S4-06) |
| Performa turun setelah konten asli masuk | 2–4 | Audit PageSpeed tiap Jumat (bukan hanya pre-launch) + disiplin resize ≤1600px di sisi FV |

---

## 11. Traceability: Definition of Done PRD §3 → Sprint

| DoD PRD | Task |
|---|---|
| Live di custom domain, publik | S1-02, S4-01 |
| 5 halaman inti konten asli | S2-01..03, S3-01..03 |
| Responsif penuh, diuji ≥3 layar riil | S2-06, S4-03 |
| Core Web Vitals hijau (mobile) | S1-12, S2-11, S3-08, S4-04 |
| Lighthouse >90 (mobile) | S3-08, S4-04 |
| Tombol WA per produk + template | S2-04 |
| SEO on-site lengkap (meta, sitemap, robots, canonical) | S3-04, S3-07 |
| JSON-LD LocalBusiness + Product, lolos Rich Results | S2-05, S3-05, S3-06 |
| Search Console terverifikasi + sitemap ter-submit | S4-02 |
| GBP dibuat, verifikasi dimulai Minggu 1 | S1-03 |
| Analytics terpasang | S3-09 |
| ≥1 sesi pelatihan resmi | S4-07 |
| Dokumentasi lengkap di repo | S3-11, S4-06 |

---

## 12. Ringkasan Alur

```
Sprint 0 (5–13 Jul)   Ramp-up + scaffold + checklist konten     [de-risk]
Sprint 1 (14–20 Jul)  Fondasi + discovery + GBP dimulai         [skeleton live]
Sprint 2 (21–27 Jul)  Beranda/Tentang/Produk + WA order         [kerangka lengkap]
Sprint 3 (28 Jul–3 Agu) Galeri/Kontak + konten 100% + SEO + CWV [siap launch]
Sprint 4 (4–11 Agu)   Launch + GSC + pelatihan + serah terima   [selesai]
```
