/**
 * Single source of truth untuk identitas situs.
 *
 * PENTING (PRD §9.3 & §14):
 * - Nomor WhatsApp HANYA boleh diganti di sini — semua tombol order membacanya.
 * - NAP (Name, Address, Phone) harus PERSIS sama dengan Google Business Profile
 *   dan sosial media mitra.
 */
export const SITE = {
  name: 'Jauhar Urban Farming',
  tagline: 'Fresh, campus-grown produce from IIUM Gombak',
  // TODO(S1-02): ganti ke custom domain final (samakan dengan astro.config.mjs).
  // HARUS identik dengan `site` di astro.config.mjs dan Sitemap di public/robots.txt.
  url: 'https://jauharurbanfarming.vercel.app',

  // TODO(S1-06): nomor WhatsApp order resmi dari mitra.
  // Format: kode negara + nomor, angka saja, tanpa "+" (dipakai untuk link wa.me).
  whatsapp: '60123456789',

  // TODO(S1-06): NAP final hasil koordinasi Liaison dengan mitra.
  address: {
    street: 'International Islamic University Malaysia (IIUM)',
    locality: 'Gombak',
    region: 'Selangor',
    postalCode: '53100',
    country: 'MY',
  },

  // TODO(S1-06): jam operasional resmi dari mitra.
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
    label: 'Monday – Friday, 8:00 AM – 5:00 PM',
  },

  // TODO(S1-06): link sosial media resmi mitra. Mitra hanya punya Instagram (tidak ada Facebook).
  socials: {
    instagram: 'https://instagram.com/jauharurbanfarming',
  },

  // TODO(S3-02): ganti dengan embed URL pin lokasi kebun yang presisi.
  mapsEmbedUrl:
    'https://www.google.com/maps?q=International+Islamic+University+Malaysia+Gombak&output=embed',
} as const;

/** Link click-to-order WhatsApp berisi nama produk (PRD F3). */
export function waOrderLink(productName?: string): string {
  // TODO(S0-08): finalkan template pesan bersama tim Content.
  const message = productName
    ? `Hello Jauhar Urban Farming! I would like to order: *${productName}*. Is it available?`
    : 'Hello Jauhar Urban Farming! I would like to ask about your products.';
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
