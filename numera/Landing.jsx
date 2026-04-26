import { useState, useEffect, useRef } from 'react'

const C = '#2D9B6F'
const CL = 'rgba(45,155,111,0.12)'
const CB = 'rgba(45,155,111,0.25)'

const PHOTOS = {
  hero: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=900&q=80',
  study1: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
  study2: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80',
  study3: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
}

const PAIN_POINTS = [
  { emoji: '😭', title: 'Nangis tiap PR?', body: 'Kami ubah ketakutan jadi rasa penasaran. Metode Story Telling Numbers membuat angka terasa seperti teman bukan musuh.' },
  { emoji: '🐢', title: 'Ketinggalan di kelas?', body: '100 soal bertahap — tidak ada yang terlewati. Anak tidak bisa lanjut sebelum benar-benar paham fondasinya.' },
  { emoji: '😴', title: 'Belajar tapi cepat lupa?', body: 'Bukan hafalan. Kami bangun pemahaman mendalam sehingga rumus tidak perlu dihafal — cukup dimengerti.' },
  { emoji: '💸', title: 'Les privat terlalu mahal?', body: 'Rp 150.000/bulan. Lebih murah dari satu sesi les privat — tapi tersedia 24 jam sehari, 7 hari seminggu.' },
]

const LEVELS = [
  { code: 'A', kelas: 'Kelas 1–2', title: 'Aritmatika & Pola', method: 'Story Telling Numbers', color: '#E05555', bg: '#FFF5F5', topics: ['Bilangan 1–100', 'Penjumlahan', 'Pengurangan', 'Pola Angka'], desc: 'Angka punya karakter. Penjumlahan adalah pertemuan dua sahabat yang saling melengkapi.' },
  { code: 'B', kelas: 'Kelas 3–4', title: 'Pecahan & Perkalian', method: 'Area Model Visual', color: '#0891B2', bg: '#F0FFFE', topics: ['Perkalian Visual', 'Pecahan', 'Pembagian Adil', 'Desimal'], desc: 'Bukan hafalan tabel. Anak melihat perkalian sebagai luas persegi panjang yang bisa dirasakan.' },
  { code: 'C', kelas: 'Kelas 5–6', title: 'Rasio & Logika', method: 'Timbangan Logika', color: '#B45309', bg: '#FFFBEB', topics: ['Rasio', 'Proporsi', 'Persentase', 'Problem Solving'], desc: 'Fondasi aljabar dimulai di sini. Logika timbangan membuat abstrak menjadi nyata dan teraba.' },
]

const TESTIMONIALS = [
  { name: 'Ibu Rina, S.Pd', kota: 'Surabaya', text: 'Anak saya yang tadinya takut matematika, sekarang malah yang pertama selesai PR. Metodenya beda banget!', level: 'Level A', avatar: '👩‍🏫' },
  { name: 'Ibu Dewi', kota: 'Bandung', text: 'Nilai naik dari 60 ke 85 dalam 2 bulan. Saya tidak perlu dampingi lagi — Numera yang jagain anak saya belajar.', level: 'Level B', avatar: '👩' },
  { name: 'Bapak Hendra', kota: 'Jakarta', text: 'Skeptis awalnya. Tapi setelah coba gratis, anak minta lanjut sendiri. Worth every penny!', level: 'Level A', avatar: '👨' },
  { name: 'Ibu Sari', kota: 'Medan', text: 'Akhirnya ketemu platform yang sabar. Anak bisa ulangi soal berkali-kali tanpa merasa dimarahi.', level: 'Level C', avatar: '👩‍💼' },
]

function useInView(t = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect() }
    }, { threshold: t })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [t])
  return [ref, inView]
}

function Reveal({ children, delay = 0, dir = 'up' }) {
  const [ref, inView] = useInView()
  const t = { up: 'translateY(28px)', left: 'translateX(-28px)', right: 'translateX(28px)' }
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : t[dir], transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  )
}

export default function LandingSD({ onOpenAuth, onBack }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeLevel, setActiveLevel] = useState(0)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleCTA = () => onOpenAuth('register')
  const handleLogin = () => onOpenAuth('login')

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: '#fff', color: '#1a1a2e', overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5%', background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none', transition: 'all 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '0.85rem', fontFamily: "'Poppins', sans-serif" }}>← Semua Jenjang</button>
          <div style={{ width: 1, height: 18, background: '#e2e8f0' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a1a2e' }}>Numera</span>
            <span style={{ background: C, color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>SD</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={handleLogin} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '0.875rem', fontFamily: "'Poppins', sans-serif", fontWeight: 500 }}>Masuk</button>
          <button onClick={handleCTA} style={{ background: C, color: '#fff', border: 'none', borderRadius: 100, padding: '10px 24px', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", boxShadow: '0 4px 16px rgba(45,155,111,0.35)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,155,111,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(45,155,111,0.35)' }}>
            Coba Gratis →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 60, padding: '100px 5% 60px', maxWidth: 1200, margin: '0 auto' }}>
        <div>
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: CL, border: `1px solid ${CB}`, borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <span>🎯</span>
              <span style={{ fontSize: '0.8rem', color: C, fontWeight: 600 }}>Khusus Kelas 1–6 SD</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: 20, color: '#1a1a2e' }}>
              Anakmu Bisa Jago<br />Matematika.<br /><span style={{ color: C }}>Tanpa Drama.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: 1.8, marginBottom: 36, maxWidth: 460 }}>
              Sistem belajar yang membangun <strong style={{ color: '#1a1a2e' }}>intuisi angka secara permanen</strong> — bukan hafalan yang hilang seminggu setelah ujian.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
              <button onClick={handleCTA} style={{ background: C, color: '#fff', border: 'none', borderRadius: 14, padding: '16px 32px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", boxShadow: '0 8px 28px rgba(45,155,111,0.4)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(45,155,111,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(45,155,111,0.4)' }}>
                🚀 Coba 5 Soal Gratis
              </button>
              <button onClick={() => document.getElementById('level-section').scrollIntoView({ behavior: 'smooth' })} style={{ background: 'transparent', color: '#64748b', border: '2px solid #e2e8f0', borderRadius: 14, padding: '16px 24px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C; e.currentTarget.style.color = C }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b' }}>
                Lihat Kurikulum
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ display: 'flex', gap: 32 }}>
              {[{ n: '3', l: 'Level Belajar' }, { n: '300+', l: 'Soal Bertahap' }, { n: '24/7', l: 'Akses Bebas' }].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: C }}>{s.n}</div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Photo Hero */}
        <Reveal dir="right" delay={0.15}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -24, right: -24, width: 180, height: 180, borderRadius: '50%', background: 'rgba(45,155,111,0.08)' }} />
            <div style={{ position: 'absolute', bottom: -16, left: -16, width: 140, height: 140, borderRadius: '50%', background: 'rgba(224,85,85,0.07)' }} />
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.14)' }}>
              <img src={PHOTOS.hero} alt="Anak SD belajar matematika dengan senang" style={{ width: '100%', height: 460, objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 28, left: -24, background: '#fff', borderRadius: 16, padding: '12px 18px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}>
              <div style={{ fontSize: '1.1rem' }}>🔥</div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1a1a2e', marginTop: 2 }}>Streak 7 Hari!</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>340 XP terkumpul</div>
            </div>
            <div style={{ position: 'absolute', top: 28, right: -24, background: '#fff', borderRadius: 16, padding: '12px 18px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}>
              <div style={{ fontSize: '1.1rem' }}>⭐</div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1a1a2e', marginTop: 2 }}>Nilai 95!</div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Level A selesai</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PAIN POINTS */}
      <section style={{ background: '#F8FAFC', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Kami Mengerti</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.25 }}>Masalah yang Bikin Orang Tua Pusing 😤</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {PAIN_POINTS.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ background: '#fff', borderRadius: 20, padding: '1.75rem', border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', transition: 'all 0.25s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '2.25rem', marginBottom: 14 }}>{p.emoji}</div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.7 }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section style={{ padding: '80px 5%', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[PHOTOS.study1, PHOTOS.study2, PHOTOS.study3].map((src, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ borderRadius: 18, overflow: 'hidden', boxShadow: '0 8px 28px rgba(0,0,0,0.09)', aspectRatio: '4/3' }}>
                <img src={src} alt="Suasana belajar matematika" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>
              Anak yang belajar dengan <strong style={{ color: '#1a1a2e' }}>metode yang tepat</strong> tidak takut matematika — mereka <strong style={{ color: C }}>menyukainya.</strong>
            </p>
          </div>
        </Reveal>
      </section>

      {/* LEVELS */}
      <section id="level-section" style={{ background: '#F8FAFC', padding: '80px 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Kurikulum SD</p>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.25 }}>
                Tiga Level, Satu Fondasi yang Tidak Tergoyahkan 💪
              </h2>
            </div>
          </Reveal>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
            {LEVELS.map((lv, i) => (
              <button key={i} onClick={() => setActiveLevel(i)} style={{ padding: '10px 22px', borderRadius: 100, cursor: 'pointer', background: activeLevel === i ? lv.color : '#fff', color: activeLevel === i ? '#fff' : '#64748b', border: `2px solid ${activeLevel === i ? lv.color : '#e2e8f0'}`, fontWeight: 700, fontSize: '0.875rem', fontFamily: "'Poppins', sans-serif", transition: 'all 0.2s' }}>
                Level {lv.code} · {lv.kelas}
              </button>
            ))}
          </div>
          {LEVELS.map((lv, i) => (
            <div key={i} style={{ display: activeLevel === i ? 'grid' : 'none', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: lv.bg, borderRadius: 100, padding: '6px 14px', marginBottom: 18 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.8rem', color: lv.color }}>{lv.method}</span>
                </div>
                <h3 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 14, lineHeight: 1.2 }}>{lv.title}</h3>
                <p style={{ fontSize: '0.975rem', color: '#64748b', lineHeight: 1.8, marginBottom: 22 }}>{lv.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {lv.topics.map(t => (
                    <span key={t} style={{ background: lv.bg, color: lv.color, borderRadius: 100, padding: '6px 14px', fontSize: '0.85rem', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <button onClick={handleCTA} style={{ background: lv.color, color: '#fff', border: 'none', borderRadius: 12, padding: '14px 28px', fontSize: '0.975rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", boxShadow: `0 8px 24px ${lv.color}40`, transition: 'all 0.2s' }}>
                  Mulai Level {lv.code} — Gratis →
                </button>
              </div>
              <div style={{ background: '#fff', borderRadius: 20, padding: '1.75rem', border: '1px solid #f1f5f9', boxShadow: '0 8px 28px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 }}>Contoh Progres Siswa</div>
                {['Soal 1–25', 'Soal 26–50', 'Soal 51–75', 'Soal 76–100'].map((s, j) => (
                  <div key={s} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: j < 2 ? '#1a1a2e' : '#94a3b8' }}>{s}</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: j < 2 ? lv.color : '#cbd5e1' }}>{['100%', '68%', '24%', '—'][j]}</span>
                    </div>
                    <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: ['100%', '68%', '24%', '0%'][j], background: lv.color, borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 18, padding: '12px 14px', background: lv.bg, borderRadius: 10 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: lv.color }}>💡 Rata-rata 3–4 minggu per level</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 3 }}>Belajar 20 menit per hari sudah cukup!</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 5%', maxWidth: 1200, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: C, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Kata Mereka</p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: '#1a1a2e' }}>Orang Tua yang Sudah Merasakannya ❤️</h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ background: '#fff', borderRadius: 20, padding: '1.75rem', border: '1px solid #f1f5f9', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 12 }}>
                  {[...Array(5)].map((_, j) => <span key={j}>⭐</span>)}
                </div>
                <p style={{ fontSize: '0.975rem', color: '#475569', lineHeight: 1.75, marginBottom: 18, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: CL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#1a1a2e' }}>{t.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.kota}</div>
                    </div>
                  </div>
                  <span style={{ background: CL, color: C, padding: '4px 12px', borderRadius: 100, fontSize: '0.75rem', fontWeight: 700 }}>{t.level}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0f2318 0%, #1a4d30 50%, #2D9B6F 100%)', padding: '80px 5%', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Harga & Mulai</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            Kurang dari Sekali<br />Makan Siang 🍱
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)', marginBottom: 8, lineHeight: 1.7 }}>
            <strong style={{ color: '#fff', fontSize: '1.3rem' }}>Rp 150.000/bulan</strong> — akses penuh semua level SD.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', marginBottom: 44 }}>5 soal pertama gratis · Tidak perlu kartu kredit · Batalkan kapan saja</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleCTA} style={{ background: '#fff', color: C, border: 'none', borderRadius: 14, padding: '18px 40px', fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", boxShadow: '0 8px 28px rgba(0,0,0,0.2)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 44px rgba(0,0,0,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.2)' }}>
              🚀 Mulai Gratis Sekarang
            </button>
            <button onClick={handleLogin} style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.35)', borderRadius: 14, padding: '18px 32px', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif", transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'}>
              Sudah punya akun? Masuk
            </button>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0a160f', padding: '28px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Numera</span>
          <span style={{ background: C, color: '#fff', fontSize: '0.6rem', fontWeight: 700, padding: '2px 7px', borderRadius: 100 }}>SD</span>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>© 2025 Numera · Platform Matematika Indonesia</span>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', fontFamily: "'Poppins', sans-serif" }}>← Semua Jenjang</button>
      </footer>
    </div>
  )
}
