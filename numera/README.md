# Numera — Fase 1: Auth & Fondasi

## Yang sudah dibangun di Fase ini

- Landing page lengkap (Hero, Filosofi, Kurikulum, CTA)
- Modal login / register / lupa password yang elegan
- Login dengan Google OAuth
- Supabase Auth terintegrasi (email & password sungguhan)
- Dashboard siswa post-login
- Halaman reset password
- Row Level Security (RLS) — data tiap user terisolasi
- Auto-create profil saat user baru daftar (via database trigger)

---

## Setup Step-by-Step (Tanpa Terminal)

### LANGKAH 1 — Buat Akun & Project Supabase

1. Buka **supabase.com** → klik **Start your project** → daftar gratis
2. Klik **New Project**
3. Isi nama project: `numera`
4. Isi database password (simpan, jangan hilang)
5. Pilih region: **Southeast Asia (Singapore)**
6. Klik **Create new project** → tunggu ~2 menit

### LANGKAH 2 — Jalankan SQL Setup

1. Di sidebar Supabase, klik **SQL Editor**
2. Klik **New query**
3. Buka file `supabase-setup.sql` dari folder ini
4. Copy semua isinya → paste ke SQL Editor
5. Klik **Run** (tombol hijau)
6. Pastikan muncul tulisan "Success"

### LANGKAH 3 — Aktifkan Email Auth

1. Di sidebar Supabase, klik **Authentication**
2. Klik tab **Providers**
3. Pastikan **Email** sudah toggle ON (default sudah aktif)
4. Scroll ke bawah, cek **"Confirm email"** — boleh ON atau OFF untuk testing

### LANGKAH 4 — (Opsional) Aktifkan Google Login

1. Di **Authentication > Providers**, klik **Google**
2. Toggle ON
3. Ikuti panduan di sana untuk dapat Client ID & Secret dari Google Cloud Console
4. Paste dan Save

### LANGKAH 5 — Ambil API Keys

1. Di sidebar Supabase, klik **Project Settings** (ikon gear)
2. Klik **API**
3. Copy dua nilai ini:
   - **Project URL** → bentuknya `https://xxxx.supabase.co`
   - **anon public** key → string panjang dimulai `eyJ...`

### LANGKAH 6 — Konfigurasi Environment Variables di Vercel

Kalau deploy via **GitHub + Vercel**:
1. Di Vercel dashboard → project Numera → **Settings** → **Environment Variables**
2. Tambahkan dua variable:
   - `VITE_SUPABASE_URL` = Project URL dari langkah 5
   - `VITE_SUPABASE_ANON_KEY` = anon key dari langkah 5
3. Klik **Save**
4. Pergi ke **Deployments** → **Redeploy**

Kalau testing **lokal**:
1. Duplikat file `.env.example` → rename menjadi `.env`
2. Isi nilai dari langkah 5
3. Jalankan `npm install && npm run dev`

### LANGKAH 7 — Tambahkan URL ke Supabase Allowlist

Setelah deploy dan dapat URL Vercel (misal `https://numera.vercel.app`):
1. Di Supabase → **Authentication** → **URL Configuration**
2. **Site URL**: masukkan URL Vercel kamu
3. **Redirect URLs**: tambahkan `https://numera.vercel.app/**`
4. Klik **Save**

---

## Struktur File

```
numera-fase1/
├── src/
│   ├── lib/
│   │   ├── supabase.js      ← Supabase client
│   │   └── auth.js          ← Semua fungsi auth
│   ├── components/
│   │   ├── AuthModal.jsx    ← Modal login/register/forgot
│   │   └── Spinner.jsx      ← Loading spinner
│   ├── pages/
│   │   ├── Landing.jsx      ← Landing page
│   │   ├── Dashboard.jsx    ← Dashboard siswa
│   │   └── ResetPassword.jsx← Halaman reset password
│   ├── App.jsx              ← Root router + auth state
│   ├── main.jsx             ← Entry point
│   └── index.css            ← Global styles
├── supabase-setup.sql       ← SQL untuk dijalankan di Supabase
├── .env.example             ← Template environment variables
├── vercel.json              ← Config deploy Vercel
└── package.json
```

---

## Demo Cepat (Setelah Setup)

1. Buka URL Vercel → klik **Mulai Perjalanan**
2. Daftar dengan email sungguhan
3. Cek inbox → klik link konfirmasi (jika email confirm aktif)
4. Login → masuk ke Dashboard
5. Cek **Supabase > Table Editor > users** → data kamu sudah tersimpan

---

## Checklist Fase 1

- [ ] Akun Supabase dibuat
- [ ] SQL dijalankan (tabel users + trigger + RLS)
- [ ] Email Auth aktif
- [ ] API keys disalin
- [ ] Environment variables diisi di Vercel
- [ ] Deploy berhasil
- [ ] Test register & login berhasil
