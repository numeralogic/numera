import { useState, useEffect, useRef } from 'react'

const COLOR = '#2D9B6F'
const COLOR_LIGHT = 'rgba(45,155,111,0.10)'
const COLOR_BORDER = 'rgba(45,155,111,0.22)'

const LEVELS = [
  {
    code: 'A',
    kelas: 'Kelas 1–2',
    title: 'Aritmatika & Pola',
    method: 'Story Telling Numbers',
    desc: 'Angka dianggap memiliki karakter dan kepribadian. Penjumlahan adalah pertemuan dua sahabat.',
    topics: ['Bilangan 1–100', 'Penjumlahan & Pengurangan', 'Pola Angka', 'Estimasi Cepat'],
    soal: 100,
  },
  {
    code: 'B',
    kelas: 'Kelas 3–4',
    title: 'Pecahan & Perkalian Visual',
    method: 'Area Model',
    desc: 'Bukan hafalan tabel perkalian. Fokus pada area model dan pembagian sebagai "berbagi adil" secara visual.',
    topics: ['Perkalian Visual', 'Pecahan sebagai Bagian', 'Pembagian Adil', 'Desimal Dasar'],
    soal: 100,
  },
  {
    code: 'C',
    kelas: 'Kelas 5–6',
    title: 'Rasio & Logika Dasar',
    method: 'Timbangan Logika',
    desc: 'Pengenalan konsep perbandingan menggunakan logika timbangan sebagai fondasi aljabar.',
    topics: ['Rasio & Proporsi', 'Persentase Kontekstual', 'Logika Timbangan', 'Problem Solving'],
    soal: 100,
  },
]

const PAIN_POINTS = [
  { icon: '😤', pain: '"Anakku nangis tiap PR matematika"', solution: 'Kami ubah ketakutan jadi rasa ingin tahu dengan metode Story Telling.' },
  { icon: '📚', pain: '"Guru di sekolah terlalu cepat"', solution: '100 soal bertahap — tidak ada yang terlewati. Siswa tidak bisa lanjut sebelum paham.' },
  { icon: '⏰', pain: '"Tidak ada waktu dampingi anak belajar"', solution: 'Silent Tutor aktif 24/7. Sistem yang sabar, tidak pernah lelah, tidak pernah marah.' },
  { icon: '💸', pain: '"Les privat terlalu mahal"', solution: 'Rp 150.000/bulan. Kurang dari sekali makan di restoran — untuk sebulan penuh belajar.' },
]

const TESTIMONIALS = [
  { name: 'Ibu Rina', kota: 'Surabaya', text: 'Anak saya yang tadinya takut matematika, sekarang malah yang pertama selesai PR. Metodenya beda dari yang lain.', level: 'Level A' },
  { name: 'Ibu Dewi', kota: 'Bandung', text: 'Saya tidak punya waktu dampingi setiap malam. Numera jadi tutor yang selalu ada. Nilainya naik dari 60 ke 85 dalam 2 bulan.', level: 'Level B' },
  { name: 'Bapak Hendra', kota: 'Jakarta', text: 'Awalnya skeptis. Tapi setelah coba gratis, anak saya langsung minta lanjut. Cara penjelasannya memang masuk akal.', level: 'Level A' },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function CTAButton({ children, onClick, variant = 'primary', style = {} }) {
  const [hov, setHov] = useState(false)
  const isPrimary = variant === 'primary'
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: isPrimary ? '14px 32px' : '12px 28px',
        borderRadius: 100, border: isPrimary ? 'none' : `1px solid ${COLOR_BORDER}`,
        background: isPrimary ? COLOR : 'transparent',
        color: isPrimary ? '#fff' : COLOR,
        fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hov && isPrimary ? `0 12px 32px rgba(45,155,111,0.3)` : 'none',
        transition: 'all 0.2s',
        ...style,
      }}
    >{children}</button>
  )
}

export default function LandingSD({ onOpenAuth, onBack }) {
  const [scrolled, setScrolled] = useState(false)
  const [heroRef, heroInView] = useInView(0.01)
  const [painRef, painInView] = useInView(0.1)
  const [levelRef, levelInView] = useInView(0.05)
  const [testiRef, testiInView] = useInView(0.1)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px',
        background: scrolled ? 'rgba(249,250,251,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        transition: 'all 0.3s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#475569'}
            onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
          >
            ← Numera
          </button>
          <div style={{ width: 1, height: 16, background: 'rgba(0,0,0,0.12)' }} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#1e293b' }}>Numera</span>
            <span style={{
              fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: COLOR, background: COLOR_LIGHT,
              padding: '2px 8px', borderRadius: 100,
            }}>SD</span>
          </div>
        </div>
        <button
          onClick={onOpenAuth}
          style={{
            fontSize: '0.8125rem', padding: '7px 18px', borderRadius: 100,
            background: COLOR, color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#228B5A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = COLOR; e.currentTarget.style.transform = 'translateY(0)' }}
        >Coba Gratis →</button>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 24px 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* BG dots */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle, rgba(45,155,111,0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent, #F9FAFB)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 680 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
            padding: '5px 16px', borderRadius: 100,
            background: COLOR_LIGHT, border: `1px solid ${COLOR_BORDER}`,
            opacity: heroInView ? 1 : 0, transform: heroInView ? 'none' : 'translateY(12px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            <span style={{ fontSize: '0.68rem', color: COLOR, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Untuk Kelas 1–6 SD</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            lineHeight: 1.15, letterSpacing: '-0.02em', color: '#1e293b',
            marginBottom: 20,
            opacity: heroInView ? 1 : 0, transform: heroInView ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            Matematika Tanpa<br />
            <span style={{ color: COLOR }}>Drama & Air Mata</span>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.125rem)', color: '#64748b',
            lineHeight: 1.7, maxWidth: 500, margin: '0 auto 36px',
            opacity: heroInView ? 1 : 0, transform: heroInView ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.33s',
          }}>
            Sistem belajar yang membangun <em>intuisi angka</em> anak secara permanen — bukan hafalan yang hilang setelah ujian.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
            opacity: heroInView ? 1 : 0, transform: heroInView ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.45s',
          }}>
            <CTAButton onClick={onOpenAuth} variant="primary">
              Coba 5 Soal Gratis
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </CTAButton>
            <CTAButton onClick={() => document.getElementById('level-section').scrollIntoView({ behavior: 'smooth' })} variant="secondary">
              Lihat Kurikulum
            </CTAButton>
          </div>

          {/* Social proof */}
          <div style={{
            marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
            opacity: heroInView ? 0.6 : 0, transition: 'opacity 0.7s ease 0.8s',
          }}>
            {[{ n: '3', l: 'Level' }, { n: '300', l: 'Soal' }, { n: '24/7', l: 'Akses' }].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#1e293b' }}>{s.n}</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '0.08em' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section ref={painRef} style={{ background: '#F3F3F1', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            textAlign: 'center', marginBottom: 48,
            opacity: painInView ? 1 : 0, transform: painInView ? 'none' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: COLOR, display: 'block', marginBottom: 12 }}>Kami Mengerti</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#1e293b' }}>
              Keluhan yang Sering Kami Dengar
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {PAIN_POINTS.map((p, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 16, padding: '1.5rem',
                border: '1px solid rgba(0,0,0,0.07)',
                opacity: painInView ? 1 : 0,
                transform: painInView ? 'none' : 'translateY(20px)',
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontSize: '0.875rem', fontStyle: 'italic', color: '#64748b', marginBottom: 12, lineHeight: 1.5 }}>{p.pain}</div>
                <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', marginBottom: 12 }} />
                <div style={{ fontSize: '0.875rem', color: '#1e293b', lineHeight: 1.6 }}>{p.solution}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Level Cards ── */}
      <section id="level-section" ref={levelRef} style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          textAlign: 'center', marginBottom: 48,
          opacity: levelInView ? 1 : 0, transform: levelInView ? 'none' : 'translateY(20px)',
          transition: 'all 0.6s ease',
        }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: COLOR, display: 'block', marginBottom: 12 }}>Kurikulum SD</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#1e293b', marginBottom: 12 }}>
            Tiga Level, Satu Fondasi Kuat
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#94a3b8', maxWidth: 480, margin: '0 auto' }}>
            Setiap level dirancang bertahap. Tidak ada lubang logika yang terlewati.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {LEVELS.map((lv, i) => (
            <div key={lv.code} style={{
              background: '#fff', borderRadius: 20, padding: '2rem',
              border: '1px solid rgba(0,0,0,0.07)',
              opacity: levelInView ? 1 : 0,
              transform: levelInView ? 'none' : 'translateY(24px)',
              transition: `all 0.5s ease ${i * 0.1}s`,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Level badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                marginBottom: 16,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: COLOR_LIGHT, color: COLOR,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700,
                }}>{lv.code}</div>
                <div>
                  <div style={{ fontSize: '0.65rem', color: COLOR, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Level {lv.code}</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{lv.kelas}</div>
                </div>
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem', color: '#1e293b', marginBottom: 6 }}>{lv.title}</h3>
              <div style={{
                display: 'inline-block', fontSize: '0.68rem', color: COLOR,
                background: COLOR_LIGHT, padding: '2px 10px', borderRadius: 100, marginBottom: 12,
              }}>{lv.method}</div>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.65, marginBottom: 20 }}>{lv.desc}</p>

              <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', marginBottom: 16 }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {lv.topics.map(t => (
                  <span key={t} style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: 100, background: 'rgba(0,0,0,0.04)', color: '#64748b' }}>{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{lv.soal} soal bertahap</span>
                <button onClick={onOpenAuth} style={{
                  fontSize: '0.8rem', color: COLOR, background: 'none',
                  border: `1px solid ${COLOR_BORDER}`, borderRadius: 100,
                  padding: '5px 14px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = COLOR; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = COLOR }}
                >Mulai →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section ref={testiRef} style={{ background: '#F3F3F1', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            textAlign: 'center', marginBottom: 48,
            opacity: testiInView ? 1 : 0, transform: testiInView ? 'none' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: COLOR, display: 'block', marginBottom: 12 }}>Kata Mereka</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#1e293b' }}>
              Orang Tua yang Sudah Merasakannya
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: '#fff', borderRadius: 16, padding: '1.5rem',
                border: '1px solid rgba(0,0,0,0.07)',
                opacity: testiInView ? 1 : 0,
                transform: testiInView ? 'none' : 'translateY(20px)',
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {[...Array(5)].map((_, j) => (
                    <div key={j} style={{ width: 12, height: 12, background: '#FCD34D', borderRadius: 2 }} />
                  ))}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#1e293b' }}>{t.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{t.kota}</div>
                  </div>
                  <span style={{ fontSize: '0.68rem', color: COLOR, background: COLOR_LIGHT, padding: '2px 10px', borderRadius: 100 }}>{t.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing CTA ── */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: COLOR, display: 'block', marginBottom: 16 }}>Mulai Sekarang</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', color: '#1e293b', lineHeight: 1.2, marginBottom: 16 }}>
            Kurang dari<br />Sekali Makan Siang
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#94a3b8', marginBottom: 12, lineHeight: 1.65 }}>
            Rp 150.000 per bulan untuk akses penuh semua level SD.
          </p>
          <p style={{ fontSize: '0.8125rem', color: COLOR, marginBottom: 36, fontWeight: 500 }}>
            5 soal pertama gratis — tidak perlu kartu kredit.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <CTAButton onClick={onOpenAuth} variant="primary" style={{ fontSize: '1rem', padding: '16px 40px' }}>
              Mulai Gratis Sekarang →
            </CTAButton>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Sudah punya akun? <button onClick={onOpenAuth} style={{ background: 'none', border: 'none', color: COLOR, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem' }}>Login</button></span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9375rem', color: '#475569' }}>
          Numera <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#94a3b8' }}>· SD</span>
        </div>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: '#94a3b8', fontFamily: "'DM Sans', sans-serif" }}>
          ← Kembali ke semua jenjang
        </button>
      </footer>
    </div>
  )
}
