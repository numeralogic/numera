import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import LandingHub from './LandingHub'
import LandingSD from './LandingSD'

export default function App() {
  const [page, setPage]         = useState('hub')
  const [session, setSession]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState('register')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) setShowAuth(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  const openAuth = (mode = 'register') => {
    setAuthMode(mode)
    setShowAuth(true)
  }

  if (loading) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>...</div>

  return (
    <>
      {page === 'hub' && <LandingHub onNavigate={setPage} onOpenAuth={openAuth} />}
      {page === 'sd'  && <LandingSD  onOpenAuth={() => openAuth('register')} onBack={() => setPage('hub')} />}
    </>
  )
}
