import { useState } from 'react'
import { signIn, signUp, signInWithGoogle, resetPassword } from '../lib/auth'

const GOLD = '#C8A96E'
const GOLD_DEEP = '#8B6B2E'

function InputField({ label, type = 'text', value, onChange, placeholder, autoComplete }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: 'block', fontSize: '0.68rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: '#94a3b8', marginBottom: 6,
      }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        style={{
          width: '100%', padding: '11px 14px',
          borderRadius: 10, fontSize: '0.875rem',
          color: '#1e293b', outline: 'none',
          background: '#F0EFED',
          border: focused
            ? '1px solid rgba(200,169,110,0.55)'
            : '1px solid transparent',
          transition: 'border-color 0.2s',
          fontFamily: "'DM Sans', sans-serif",
        }}
      />
    </div>
  )
}

function GoldButton({ children, onClick, disabled, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%', padding: '13px',
        borderRadius: 10, border: 'none',
        background: disabled ? 'rgba(200,169,110,0.45)' : GOLD,
        color: '#1a1208', cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '0.875rem', fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: '0.02em',
        transition: 'background 0.2s, transform 0.15s',
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = '#B8955A' }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = GOLD }}
    >
      {children}
    </button>
  )
}

function GoogleButton({ onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%', padding: '11px',
        borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer',
        background: 'transparent',
        border: '1px solid rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        fontSize: '0.875rem', color: '#475569',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#F8F8F6' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      {/* Google SVG icon */}
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
        <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
      </svg>
      Lanjutkan dengan Google
    </button>
  )
}

export default function AuthModal({ onClose, initialMode = 'login' }) {
  const [mode, setMode]       = useState(initialMode) // 'login' | 'register' | 'forgot'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  const clearMessages = () => { setError(''); setSuccess('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    clearMessages()

    try {
      if (mode === 'login') {
        await signIn({ email, password })
        // App.jsx akan otomatis redirect via onAuthStateChange
        onClose()

      } else if (mode === 'register') {
        await signUp({ email, password, fullName })
        setSuccess('Akun berhasil dibuat! Cek email kamu untuk konfirmasi.')

      } else if (mode === 'forgot') {
        await resetPassword(email)
        setSuccess('Link reset password sudah dikirim ke email kamu.')
      }
    } catch (err) {
      // Terjemahkan pesan error Supabase ke Bahasa Indonesia
      const msg = err.message || ''
      if (msg.includes('Invalid login credentials'))
        setError('Email atau kata sandi tidak sesuai.')
      else if (msg.includes('Email not confirmed'))
        setError('Email belum dikonfirmasi. Cek inbox kamu.')
      else if (msg.includes('User already registered'))
        setError('Email ini sudah terdaftar. Silakan login.')
      else if (msg.includes('Password should be at least'))
        setError('Kata sandi minimal 6 karakter.')
      else if (msg.includes('Unable to validate email'))
        setError('Format email tidak valid.')
      else
        setError(msg || 'Terjadi kesalahan. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    clearMessages()
    try {
      await signInWithGoogle()
    } catch (err) {
      setError('Login Google gagal. Pastikan Google provider aktif di Supabase.')
      setLoading(false)
    }
  }

  const titles = {
    login:    { heading: 'Selamat Datang', sub: 'Masuk untuk melanjutkan perjalanan belajarmu.' },
    register: { heading: 'Buat Akun', sub: 'Bergabung dan mulai menalar matematika hari ini.' },
    forgot:   { heading: 'Reset Kata Sandi', sub: 'Masukkan email dan kami kirimkan link reset.' },
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(10,10,10,0.5)',
        backdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FAFAF8', borderRadius: 20,
          border: '1px solid rgba(200,169,110,0.2)',
          padding: 40, maxWidth: 420, width: '100%',
          boxShadow: '0 32px 80px rgba(0,0,0,0.15)',
          position: 'relative',
          animation: 'fadeUp 0.3s ease',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 18, right: 20,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1.375rem', lineHeight: 1,
            color: '#94a3b8', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#475569'}
          onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
        >×</button>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <span style={{
            fontSize: '0.68rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: GOLD,
            display: 'block', marginBottom: 6,
          }}>Portal Siswa</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem', color: '#1e293b', marginBottom: 4,
          }}>{titles[mode].heading}</h2>
          <p style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>
            {titles[mode].sub}
          </p>
        </div>

        {/* Google OAuth — hanya di login & register */}
        {mode !== 'forgot' && (
          <>
            <GoogleButton onClick={handleGoogle} disabled={loading} />
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              margin: '20px 0', color: '#cbd5e1', fontSize: '0.75rem',
            }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
              atau dengan email
              <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
            </div>
          </>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <InputField
              label="Nama Lengkap"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Arief Kurniawan"
              autoComplete="name"
            />
          )}
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@numera.id"
            autoComplete="email"
          />
          {mode !== 'forgot' && (
            <InputField
              label="Kata Sandi"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          )}

          {/* Error & Success */}
          {error && (
            <div style={{
              fontSize: '0.75rem', color: '#dc2626',
              background: 'rgba(220,38,38,0.06)',
              border: '1px solid rgba(220,38,38,0.15)',
              borderRadius: 8, padding: '10px 12px', marginBottom: 16,
            }}>{error}</div>
          )}
          {success && (
            <div style={{
              fontSize: '0.75rem', color: '#16a34a',
              background: 'rgba(22,163,74,0.06)',
              border: '1px solid rgba(22,163,74,0.15)',
              borderRadius: 8, padding: '10px 12px', marginBottom: 16,
            }}>{success}</div>
          )}

          <GoldButton type="submit" disabled={loading}>
            {loading ? 'Memproses...' : (
              mode === 'login' ? 'Masuk →' :
              mode === 'register' ? 'Buat Akun →' :
              'Kirim Link Reset →'
            )}
          </GoldButton>
        </form>

        {/* Footer links */}
        <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.8125rem', color: '#94a3b8' }}>
          {mode === 'login' && (
            <>
              <button
                onClick={() => { setMode('forgot'); clearMessages() }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: GOLD_DEEP, fontSize: '0.8125rem' }}
              >Lupa kata sandi?</button>
              <span style={{ margin: '0 12px', opacity: 0.4 }}>|</span>
              Belum punya akun?{' '}
              <button
                onClick={() => { setMode('register'); clearMessages() }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: GOLD_DEEP, fontWeight: 500, fontSize: '0.8125rem' }}
              >Daftar</button>
            </>
          )}
          {mode === 'register' && (
            <>
              Sudah punya akun?{' '}
              <button
                onClick={() => { setMode('login'); clearMessages() }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: GOLD_DEEP, fontWeight: 500, fontSize: '0.8125rem' }}
              >Masuk</button>
            </>
          )}
          {mode === 'forgot' && (
            <button
              onClick={() => { setMode('login'); clearMessages() }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: GOLD_DEEP, fontSize: '0.8125rem' }}
            >← Kembali ke Login</button>
          )}
        </div>
      </div>
    </div>
  )
}
