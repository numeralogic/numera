import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ResetPassword from './pages/ResetPassword'
import Spinner from './components/Spinner'

export default function App() {
  const [session, setSession]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [page, setPage]         = useState('landing') // 'landing' | 'dashboard' | 'reset-password'

  useEffect(() => {
    // Cek halaman dari URL path
    const path = window.location.pathname
    if (path === '/reset-password') setPage('reset-password')
    else if (path === '/dashboard')  setPage('dashboard')

    // Ambil sesi yang sudah ada
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Dengarkan perubahan auth (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        if (session) setPage('dashboard')
        else setPage('landing')
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <Spinner />

  // Router sederhana berbasis state
  if (page === 'reset-password') return <ResetPassword />
  if (session) return <Dashboard session={session} onNavigate={setPage} />
  return <Landing onNavigate={setPage} />
}
