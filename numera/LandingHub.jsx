import { useState, useEffect, useRef } from 'react'

const JENJANG = [
  {
    id: 'sd',
    label: 'SD',
    level: 'Kelas 1 – 6',
    tagline: 'Matematika Tanpa Drama & Air Mata',
    desc: 'Untuk orang tua yang lelah melihat anaknya menangis setiap kali PR matematika. Kami ubah ketakutan menjadi rasa ingin tahu.',
    levels: ['Level A — Kelas 1-2', 'Level B — Kelas 3-4', 'Level C — Kelas 5-6'],
    color: '#2D9B6F',
    bg: '#F0FAF5',
    accent: 'rgba(45,155,111,0.12)',
    border: 'rgba(45,155,111,0.25)',
    path: '/sd',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M4 13h24" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 8V6M21 8V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 18h4M9 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'smp',
    label: 'SMP',
    level: 'Kelas 7 – 9',
    tagline: 'Tambal Lubang Logika Aljabar',
    desc: 'Kenapa ada huruf di matematika? Kami jawab pertanyaan itu sampai tuntas. Aljabar bukan musuh — ia bahasa penyederhanaan masalah.',
    levels: ['Level D — Kelas 7', 'Level E — Kelas 8', 'Level F — Kelas 9'],
    color: '#5B4BB7',
    bg: '#F3F1FE',
    accent: 'rgba(91,75,183,0.10)',
    border: 'rgba(91,75,183,0.22)',
    path: '/smp',
    soon: true,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 26V10l8-4 8 4v16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <rect x="13" y="18" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M12 14h2M18 14h2M12 10h2M18 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'sma',
    label: 'SMA',
    level: 'Kelas 10 – 12',
    tagline: 'Efisiensi Mutlak & Deep Focus',
    desc: 'Persiapan UTBK dan olimpiade dengan pendekatan analitis. Bukan hafalan — melainkan pemahaman yang membekas seumur hidup.',
    levels: ['Level G — Kelas 10', 'Level H — Kelas 11', 'Level I — Kelas 12'],
    color: '#C8621A',
    bg: '#FDF3EC',
    accent: 'rgba(200,98,26,0.10)',
    border: 'rgba(200,98,26,0.22)',
    path: '/sma',
    soon: true,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L4 10l12 6 12-6-12-6z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M4 16l12 6 12-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M4 22l12 6 12-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const STATS = [
  { value: '9', unit: 'Level', desc: 'SD hingga SMA' },
  { value: '100', unit: 'Soal', desc: 'per fase belajar' },
  { value: '80%', unit: 'Fokus', desc: 'pada nalar, bukan hafalan' },
  { value: '24/7', unit: 'Akses', desc: 'dari perangkat apapun' },
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

function JenjangCard({ j, index, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const [ref, inView] = useInView(0.1)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !j.soon && onSelect(j)}
      style={{
        background: hovered && !j.soon ? j.bg : '#FEFEFE',
        border: `1px solid ${hovered && !j.soon ? j.border : 'rgba(0,0,0,0.08)'}`,
        borderRadius: 20,
        padding: '2rem',
        cursor: j.soon ? 'default' : 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered && !j.soon ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered && !j.soon
          ? `0 20px 60px ${j.accent}, 0 4px 20px rgba(0,0,0,0.06)`
          : '0 2px 12px rgba(0,0,0,0.04)',
        opacity: inView ? 1 : 0,
        translate: inView ? '0 0' : '0 24px',
        transitionProperty: 'all',
        transitionDuration: `0.5s`,
        transitionDelay: `${index * 0.1}s`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {j.soon && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(0,0,0,0.06)',
          color: '#888', fontSize: '0.65rem',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '3px 10px', borderRadius: 100,
        }}>Segera Hadir</div>
      )}

      {/* Icon */}
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: hovered && !j.soon ? j.accent : 'rgba(0,0,0,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hovered && !j.soon ? j.color : '#94a3b8',
        marginBottom: '1.25rem',
        transition: 'all 0.3s',
      }}>{j.icon}</div>

      {/* Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: j.color,
        }}>{j.label}</span>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }} />
        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{j.level}</span>
      </div>

      {/* Tagline */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.25rem', color: '#1e293b',
        lineHeight: 1.3, marginBottom: 12,
      }}>{j.tagline}</h3>

      {/* Desc */}
      <p style={{
        fontSize: '0.875rem', color: '#64748b',
        lineHeight: 1.65, marginBottom: '1.5rem',
      }}>{j.desc}</p>

      {/* Levels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1.5rem' }}>
        {j.levels.map(lv => (
          <div key={lv} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: hovered && !j.soon ? j.color : '#cbd5e1', transition: 'all 0.3s', flexShrink: 0 }} />
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{lv}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      {!j.soon ? (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '0.8125rem', fontWeight: 500,
          color: hovered ? j.color : '#94a3b8',
          transition: 'color 0.2s',
        }}>
          Mulai belajar
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ) : (
        <div style={{ fontSize: '0.8125rem', color: '#cbd5e1' }}>Daftar waitlist →</div>
      )}
    </div>
  )
}

export default function LandingHub({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [heroRef, heroInView] = useInView(0.01)
  const [statsRef, statsInView] = useInView(0.2)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleJenjangSelect = (j) => {
    if (onNavigate) onNavigate(j.id)
  }

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
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#1e293b', letterSpacing: '-0.02em' }}>Numera</span>
          <span style={{ fontSize: '0.65rem', color: '#C8A96E', letterSpacing: '0.1em', textTransform: 'uppercase' }}>·</span>
        </div>
        <button
          onClick={() => setShowLoginModal(true)}
          style={{
            fontSize: '0.8125rem', padding: '7px 18px', borderRadius: 100,
            border: '1px solid rgba(200,169,110,0.4)', color: '#8B6B2E',
            background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#C8A96E'; e.currentTarget.style.color = '#1a1208'; e.currentTarget.style.borderColor = '#C8A96E' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8B6B2E'; e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)' }}
        >Login Siswa</button>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 24px 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent, #F9FAFB)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '5px 18px', borderRadius: 100, marginBottom: 32,
            border: '1px solid rgba(200,169,110,0.25)', background: 'rgba(200,169,110,0.06)',
            color: '#C8A96E', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase',
            opacity: heroInView ? 1 : 0, transform: heroInView ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s ease 0.1s',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C8A96E', display: 'inline-block' }} />
            Platform Belajar Matematika Indonesia
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            color: '#1e293b', marginBottom: 20,
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            Satu Sistem.<br />
            <span style={{ color: '#C8A96E' }}>Tiga Perjalanan.</span>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
            color: '#64748b', lineHeight: 1.7, maxWidth: 540, margin: '0 auto 16px',
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.32s',
          }}>
            Numera membangun jalur nalar dari SD hingga SMA — bukan dengan menghafal, melainkan dengan memahami <em>mengapa</em>.
          </p>

          {/* Scroll hint */}
          <div style={{
            marginTop: 48,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            opacity: heroInView ? 0.4 : 0, transition: 'opacity 0.7s ease 1.2s',
          }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#94a3b8' }}>Pilih jenjangmu</span>
            <div style={{ width: 1, height: 28, background: 'linear-gradient(180deg, #C8A96E, transparent)' }} />
          </div>
        </div>
      </section>

      {/* ── Jenjang Cards ── */}
      <section style={{ padding: '0 40px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {JENJANG.map((j, i) => (
            <JenjangCard key={j.id} j={j} index={i} onSelect={handleJenjangSelect} />
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} style={{ background: '#F3F3F1', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            textAlign: 'center', marginBottom: 48,
            opacity: statsInView ? 1 : 0, transform: statsInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8A96E', display: 'block', marginBottom: 12 }}>Filosofi 80:20</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#1e293b' }}>
              Nalar di atas Perhitungan
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {STATS.map((s, i) => (
              <div key={s.unit} style={{
                background: '#fff', borderRadius: 16,
                border: '1px solid rgba(0,0,0,0.07)',
                padding: '1.5rem', textAlign: 'center',
                opacity: statsInView ? 1 : 0,
                transform: statsInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.25rem', color: '#C8A96E', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#1e293b', marginBottom: 4 }}>{s.unit}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The 100-Step Method ── */}
      <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8A96E', display: 'block', marginBottom: 12 }}>Metode Numera</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: '#1e293b', lineHeight: 1.2, marginBottom: 20 }}>
              The 100-Step Method
            </h2>
            <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.75, marginBottom: 16 }}>
              Setiap fase terdiri dari <strong style={{ color: '#1e293b', fontWeight: 500 }}>100 soal yang dirancang bertahap</strong>. Tidak ada celah logika yang terlewati. Siswa tidak bisa lanjut sebelum benar-benar menguasai fondasi.
            </p>
            <p style={{ fontSize: '0.9375rem', color: '#94a3b8', lineHeight: 1.75 }}>
              Terinspirasi dari metode Kumon yang step-by-step, diperkaya dengan pendekatan nalar aktif — bukan sekadar mengisi lembar kerja.
            </p>
            {[
              { label: 'Active Learning', desc: 'Otak dipaksa bekerja sejak soal pertama' },
              { label: 'The "Why" Prompt', desc: 'Setiap 5 soal teknis, 1 soal "mengapa ini masuk akal?"' },
              { label: 'Silent Tutor', desc: 'Sistem sabar yang memberi feedback tanpa penghakiman' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 12, marginTop: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C8A96E', flexShrink: 0, marginTop: 6 }} />
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1e293b', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#94a3b8' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Visual */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: '#fff', borderRadius: 20,
              border: '1px solid rgba(0,0,0,0.08)',
              padding: '2rem', overflow: 'hidden',
            }}>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 16 }}>Progres Fase 1 — Fondasi SD</div>
              {[
                { label: 'Bilangan & Operasi', pct: 100, color: '#2D9B6F' },
                { label: 'Pecahan Visual', pct: 72, color: '#2D9B6F' },
                { label: 'Rasio & Logika', pct: 35, color: '#2D9B6F' },
                { label: 'Perkalian & Pembagian', pct: 0, color: '#e2e8f0' },
              ].map((item, i) => (
                <div key={item.label} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.8125rem', color: item.pct > 0 ? '#1e293b' : '#94a3b8' }}>{item.label}</span>
                    <span style={{ fontSize: '0.8125rem', color: item.pct === 100 ? '#2D9B6F' : '#94a3b8' }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: item.pct > 0 ? item.color : 'transparent', borderRadius: 3, transition: 'width 1s ease' }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(45,155,111,0.06)', borderRadius: 10, border: '1px solid rgba(45,155,111,0.15)' }}>
                <div style={{ fontSize: '0.75rem', color: '#2D9B6F', fontWeight: 500 }}>🔥 Streak 7 hari berturut-turut</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>340 XP terkumpul · Level 3</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: '#F3F3F1' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8A96E', display: 'block', marginBottom: 16 }}>Mulai Sekarang</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', color: '#1e293b', lineHeight: 1.2, marginBottom: 16 }}>
            Pilih Jenjang,<br />Mulai Perjalanan
          </h2>
          <p style={{ fontSize: '0.9375rem', color: '#94a3b8', marginBottom: 36, lineHeight: 1.65 }}>
            5 soal pertama gratis. Tidak perlu kartu kredit.
          </p>
          <button
            onClick={() => handleJenjangSelect(JENJANG[0])}
            style={{
              padding: '14px 36px', borderRadius: 100, border: 'none',
              background: '#2D9B6F', color: '#fff', cursor: 'pointer',
              fontSize: '0.9375rem', fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(45,155,111,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >Mulai dari SD →</button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.9375rem', color: '#475569' }}>Numera</div>
        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>© 2025 Numera · Platform Matematika Indonesia</div>
      </footer>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
