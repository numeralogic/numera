import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    '⚠️  Supabase belum dikonfigurasi.\n' +
    'Salin .env.example menjadi .env dan isi VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY.\n' +
    'Nilai tersedia di: Supabase Dashboard > Project Settings > API'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
