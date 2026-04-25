# Numera — Seni Menalar Matematika

Landing Page minimalis untuk platform belajar matematika **Numera**.  
Dibangun dengan **React + Vite + Tailwind CSS**, siap deploy ke Vercel.

---

## Struktur Proyek

```
numera/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Komponen utama SPA (semua sections)
│   ├── index.css        # Global styles + Tailwind directives
│   └── main.jsx         # Entry point
├── index.html           # Root HTML
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json          # SPA routing + cache headers
```

---

## Setup Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan dev server
npm run dev

# 3. Build untuk produksi
npm run build

# 4. Preview build
npm run preview
```

---

## Deploy ke Vercel

### Via GitHub (Rekomendasi)

1. Push folder ini ke repository GitHub baru
2. Masuk ke [vercel.com](https://vercel.com) → **New Project**
3. Import repository GitHub tersebut
4. Vercel otomatis mendeteksi Vite — klik **Deploy**
5. Selesai ✓

### Via Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

---

## Demo Login

| Field    | Value              |
|----------|--------------------|
| Email    | siswa@numera.id    |
| Password | numera2024         |

Sesi disimpan di `localStorage` dengan key `numera_session`.

---

## Konten Sections

| Section          | Deskripsi                                      |
|------------------|------------------------------------------------|
| Navbar           | Logo + nav links + tombol Login Siswa          |
| Hero             | Headline, subheadline, CTA button              |
| Filosofi 80:20   | Penjelasan prinsip nalar vs. hitung            |
| Kurikulum        | 5 kartu fase: Fondasi → Aljabar → ... Kalkulus |
| CTA Band         | Ajakan bergabung dengan tombol sekunder        |
| Footer           | Copyright minimal                              |

---

## Teknologi

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **DM Sans** (body) + **Playfair Display** (serif heading)
- Zero external UI library — murni Tailwind + inline styles
- `IntersectionObserver` untuk scroll animations
- `localStorage` untuk sesi login semu
