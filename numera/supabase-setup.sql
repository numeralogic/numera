-- ============================================================
-- NUMERA — Supabase Setup SQL (Fase 1)
-- Jalankan di: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. Tabel profil users (extend dari auth.users bawaan Supabase)
create table if not exists public.users (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text unique not null,
  full_name   text,
  avatar_url  text,
  role        text default 'student'
                check (role in ('student', 'instructor', 'admin')),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 2. Aktifkan Row Level Security (RLS)
--    Ini memastikan setiap user hanya bisa baca/edit data miliknya sendiri
alter table public.users enable row level security;

-- 3. Policy: user hanya bisa lihat profil dirinya sendiri
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

-- 4. Policy: user bisa update profil dirinya sendiri
create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- 5. Policy: user bisa insert profil saat pertama kali daftar
create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = id);

-- 6. Fungsi otomatis: buat row di public.users saat user baru daftar
--    Ini berjalan otomatis via database trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- 7. Pasang trigger ke auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 8. Fungsi auto-update kolom updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_users_updated
  before update on public.users
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- Verifikasi: jalankan query ini untuk cek tabel sudah ada
-- ============================================================
-- select * from public.users limit 5;
