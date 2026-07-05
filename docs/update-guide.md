# Update Guide — jauhar-hub

> **Status: DRAF (Sprint 0).** Dilengkapi penuh di Sprint 3–4 dan dipakai sebagai materi
> sesi pelatihan mitra (S4-07, lihat [PLANNING.md](../PLANNING.md)).

Panduan teknis mengelola website Jauhar Urban Farming pasca-KKN.

## Cara kerja publikasi

1. Konten diedit di repo GitHub `faizhuda/jauhar-hub` (bisa langsung dari browser github.com)
2. Setiap perubahan di branch `main` otomatis memicu **build & deploy di Vercel** (±2 menit)
3. Tidak ada server/database yang perlu dirawat — hosting gratis selamanya

## Perubahan yang paling sering dibutuhkan

| Kebutuhan | Yang diedit |
|---|---|
| Tambah/edit produk, harga, stok | 1 file di `src/content/products/` — lihat [content-guide.md](content-guide.md) |
| Tambah foto galeri | 1 file di `src/content/gallery/` + foto di `src/assets/gallery/` |
| **Ganti nomor WhatsApp** | `src/config.ts` → `whatsapp` (satu-satunya tempat) |
| Ganti jam operasional / alamat / sosmed | `src/config.ts` |

## Menjalankan secara lokal (opsional, untuk developer)

```bash
npm install        # sekali saja
npm run dev        # dev server di http://localhost:4321
npm run build      # build produksi + validasi seluruh konten
```

## Checklist serah terima (dilengkapi Sprint 4)

- [ ] Akses GitHub repo diserahkan ke pengelola
- [ ] Akses dashboard Vercel diserahkan
- [ ] Akses registrar domain diserahkan
- [ ] **Tanggal expired domain: __________ (TODO S1-02)** — pasang reminder perpanjangan!
- [ ] Analytics: aktifkan **Vercel Web Analytics** di dashboard Vercel (Project → Analytics → Enable), lalu catat cara membacanya di sini
- [ ] Status Google Business Profile + langkah lanjutan (jika verifikasi belum selesai)
- [ ] Update `site` di `astro.config.mjs`, `SITE.url` di `src/config.ts`, dan URL Sitemap di `public/robots.txt` ke domain final
