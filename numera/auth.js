import { supabase } from './supabase'

/**
 * Daftar akun baru dengan email & password
 * Supabase otomatis kirim email konfirmasi
 */
export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: window.location.origin + '/dashboard',
    },
  })
  if (error) throw error

  // Buat row di tabel public.users setelah register
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .upsert({
        id: data.user.id,
        email: data.user.email,
        full_name: fullName,
        role: 'student',
      })
    if (profileError) console.warn('Profile upsert error:', profileError.message)
  }

  return data
}

/**
 * Login dengan email & password
 */
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

/**
 * Login dengan Google OAuth
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/dashboard',
    },
  })
  if (error) throw error
  return data
}

/**
 * Kirim email reset password
 */
export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/reset-password',
  })
  if (error) throw error
}

/**
 * Logout
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Ambil profil user dari tabel public.users
 */
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) throw error
  return data
}
