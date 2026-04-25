import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import LandingHub from './pages/LandingHub'
import LandingSD from './pages/LandingSD'
import Dashboard from './pages/Dashboard'
import AuthModal from './components/AuthModal'
import ResetPassword from './pages/ResetPassword'
import Spinner from './components/Spinner'

export default function App() {
  const [page, setPage]         = useState('hub') // 'hub' | 'sd' | 'smp' | 'sma' | 'dashboard' | 'reset-password'
  const [session, setSession]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  useEffect(() => {
    const path = window.location.pathname
    if (path === '/reset-password') setPage('reset-password')
    else if (path === '/sd')        setPage('sd')
    else if (path === '/smp')       setPage('smp')
    else if (path === '/sma')       setPage('sma')
    else if (path === '/dashboard') setPage('dashboard')

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        setShowAuth(false)
        setPage('dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const navigate = (to) => {
    setPage(to)
    window.history.pushState({}, '', to === 'hub' ? '/' : `/${to}`)
  }

  const openAuth = (mode = 'register') => {
    setAuthMode(mode)
    setShowAuth(true)
  }

  if (loading) return <Spinner />

  if (page === 'reset-password') return <ResetPassword />
  if (session) return <Dashboard session={session} onNavigate={navigate} />

  return (
    <>
      {page === 'hub' && (
        <LandingHub
          onNavigate={navigate}
          onOpenAuth={openAuth}
        />
      )}
      {page === 'sd' && (
        <LandingSD
          onOpenAuth={() => openAuth('register')}
          onBack={() => navigate('hub')}
        />
      )}
      {(page === 'smp' || page === 'sma') && (
        // Coming soon — redirect ke hub
        <LandingHub onNavigate={navigate} onOpenAuth={openAuth} />
      )}

      {showAuth && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setShowAuth(false)}
          onLogin={() => setShowAuth(false)}
        />
      )}
    </>
  )
}
