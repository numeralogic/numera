import { useState, useEffect, useRef } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────
const CURRICULUM = [
  {
    code: "01",
    title: "Fondasi",
    latin: "Fundamentum",
    desc: "Bilangan, operasi dasar, pecahan, dan persentase. Titik awal dari semua pemahaman matematis yang solid.",
    topics: ["Bilangan & Operasi", "Pecahan & Desimal", "Persentase", "Rasio & Proporsi"],
  },
  {
    code: "02",
    title: "Aljabar",
    latin: "Algebra",
    desc: "Bahasa simbol dan hubungan. Variabel, persamaan, dan sistem yang membentuk cara berpikir abstrak.",
    topics: ["Variabel & Ekspresi", "Persamaan Linear", "Sistem Persamaan", "Pertidaksamaan"],
  },
  {
    code: "03",
    title: "Geometri",
    latin: "Geometria",
    desc: "Ruang, bentuk, dan dimensi. Melatih intuisi visual dan kemampuan berpikir spasial yang presisi.",
    topics: ["Garis & Sudut", "Segitiga & Teorema", "Lingkaran", "Bangun Ruang"],
  },
  {
    code: "04",
    title: "Analitis",
    latin: "Analytica",
    desc: "Statistika, probabilitas, dan pola data. Fondasi berpikir kritis berbasis bukti di era informasi.",
    topics: ["Statistika Deskriptif", "Probabilitas", "Distribusi Data", "Inferensi Dasar"],
  },
  {
    code: "05",
    title: "Kalkulus",
    latin: "Calculus",
    desc: "Puncak nalar matematis. Limit, turunan, dan integral sebagai alat memahami perubahan dan akumulasi.",
    topics: ["Limit & Kontinuitas", "Turunan", "Integral", "Aplikasi Kalkulus"],
  },
];

const DUMMY_CREDENTIALS = { email: "siswa@numera.id", password: "numera2024" };

// ─── Hooks ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Login Modal ────────────────────────────────────────────────────────────
function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email === DUMMY_CREDENTIALS.email && pass === DUMMY_CREDENTIALS.password) {
        const session = { email, name: "Arief Kurniawan", loggedAt: Date.now() };
        localStorage.setItem("numera_session", JSON.stringify(session));
        onLogin(session);
      } else {
        setError("Email atau kata sandi tidak sesuai.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,15,15,0.55)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-10 shadow-2xl"
        style={{ background: "#FAFAFA", border: "1px solid rgba(200,169,110,0.2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors text-xl leading-none"
        >×</button>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.18em] uppercase text-gold mb-2">Portal Siswa</p>
          <h2 className="font-serif text-2xl text-slate-800">Selamat Datang Kembali</h2>
          <p className="text-sm text-slate-400 mt-1">Masuk untuk melanjutkan perjalanan belajarmu.</p>
        </div>

        {/* Hint */}
        <div className="mb-6 px-4 py-3 rounded-xl text-xs text-slate-500" style={{ background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.15)" }}>
          <span className="font-medium text-gold">Demo:</span> siswa@numera.id · numera2024
        </div>

        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-slate-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@numera.id"
              required
              className="w-full px-4 py-3 rounded-xl text-sm text-slate-700 outline-none transition-all"
              style={{
                background: "#F0F0EE",
                border: "1px solid transparent",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid rgba(200,169,110,0.5)")}
              onBlur={(e) => (e.target.style.border = "1px solid transparent")}
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-slate-400 mb-1.5">Kata Sandi</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl text-sm text-slate-700 outline-none transition-all"
              style={{
                background: "#F0F0EE",
                border: "1px solid transparent",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid rgba(200,169,110,0.5)")}
              onBlur={(e) => (e.target.style.border = "1px solid transparent")}
            />
          </div>

          {error && <p className="text-xs text-rose-500 pt-1">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all mt-2"
            style={{
              background: loading ? "rgba(200,169,110,0.5)" : "#C8A96E",
              color: "#1a1208",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Memverifikasi..." : "Masuk →"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Dashboard (post-login) ─────────────────────────────────────────────────
function Dashboard({ session, onLogout }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#F9FAFB" }}>
      <div className="text-center max-w-md px-6" style={{ animation: "fadeUp 0.6s ease both" }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-serif mx-auto mb-6"
          style={{ background: "rgba(200,169,110,0.12)", color: "#C8A96E", border: "1px solid rgba(200,169,110,0.3)" }}
        >
          {session.name[0]}
        </div>
        <p className="text-xs tracking-[0.18em] uppercase text-gold mb-2">Sesi Aktif</p>
        <h1 className="font-serif text-3xl text-slate-800 mb-2">Halo, {session.name.split(" ")[0]}</h1>
        <p className="text-sm text-slate-500 mb-8">Kamu telah masuk sebagai <span className="text-slate-700">{session.email}</span></p>
        <button
          onClick={onLogout}
          className="text-sm text-slate-400 hover:text-slate-700 transition-colors underline underline-offset-4"
        >
          Keluar dari sesi
        </button>
      </div>
    </div>
  );
}

// ─── Curriculum Card ────────────────────────────────────────────────────────
function CurrCard({ item, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-8 cursor-default transition-all duration-300"
      style={{
        background: hovered ? "#FFFFFF" : "#FDFDFC",
        border: hovered ? "1px solid rgba(200,169,110,0.35)" : "1px solid rgba(0,0,0,0.07)",
        boxShadow: hovered ? "0 16px 48px rgba(200,169,110,0.1), 0 4px 16px rgba(0,0,0,0.06)" : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        opacity: inView ? 1 : 0,
        translate: inView ? "0 0" : "0 24px",
        transition: `opacity 0.5s ease ${index * 0.09}s, translate 0.5s ease ${index * 0.09}s, transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease`,
      }}
    >
      {/* Code + Title Row */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <span
            className="text-xs font-medium tracking-[0.15em] uppercase block mb-1"
            style={{ color: "#C8A96E" }}
          >Fase {item.code}</span>
          <h3 className="font-serif text-xl text-slate-800">{item.title}</h3>
          <span className="text-xs text-slate-400 italic">{item.latin}</span>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{
            background: hovered ? "rgba(200,169,110,0.15)" : "rgba(0,0,0,0.04)",
            color: hovered ? "#C8A96E" : "#94a3b8",
            transition: "all 0.25s",
          }}
        >{item.code}</div>
      </div>

      {/* Desc */}
      <p className="text-sm text-slate-500 leading-relaxed mb-6">{item.desc}</p>

      {/* Divider */}
      <div className="h-px mb-5" style={{ background: "rgba(0,0,0,0.05)" }} />

      {/* Topics */}
      <div className="flex flex-wrap gap-2">
        {item.topics.map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: hovered ? "rgba(200,169,110,0.08)" : "rgba(0,0,0,0.04)",
              color: hovered ? "#8B6B2E" : "#64748b",
              border: hovered ? "1px solid rgba(200,169,110,0.2)" : "1px solid transparent",
              transition: "all 0.25s",
            }}
          >{t}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [session, setSession] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [heroRef, heroInView] = useInView(0.01);
  const [philRef, philInView] = useInView(0.2);
  const [currRef, currInView] = useInView(0.05);

  // Restore session
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("numera_session"));
      if (s) setSession(s);
    } catch (_) {}
  }, []);

  // Navbar scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogin = (s) => { setSession(s); setShowLogin(false); };
  const handleLogout = () => { localStorage.removeItem("numera_session"); setSession(null); };

  if (session) return <Dashboard session={session} onLogout={handleLogout} />;

  return (
    <div className="min-h-screen" style={{ background: "#F9FAFB", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(249,250,251,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl text-slate-800 tracking-tight">Numera</span>
            <span className="text-xs tracking-[0.15em] uppercase" style={{ color: "#C8A96E" }}>·</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Filosofi", "Kurikulum"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >{item}</a>
            ))}
          </div>

          {/* Login */}
          <button
            onClick={() => setShowLogin(true)}
            className="text-sm px-5 py-2 rounded-full transition-all duration-200"
            style={{
              border: "1px solid rgba(200,169,110,0.4)",
              color: "#8B6B2E",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C8A96E";
              e.currentTarget.style.color = "#1a1208";
              e.currentTarget.style.borderColor = "#C8A96E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#8B6B2E";
              e.currentTarget.style.borderColor = "rgba(200,169,110,0.4)";
            }}
          >
            Login Siswa
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16"
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #F9FAFB 100%)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-3 mb-10 px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase"
            style={{
              border: "1px solid rgba(200,169,110,0.25)",
              color: "#C8A96E",
              background: "rgba(200,169,110,0.06)",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.6s ease 0.1s",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C8A96E", display: "inline-block" }} />
            Platform Belajar Matematika
          </div>

          {/* Headline */}
          <h1
            className="font-serif leading-[1.1] text-slate-800 mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.02em",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.2s",
            }}
          >
            Seni Menalar
            <br />
            <span style={{ color: "#C8A96E" }}>Matematika</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-slate-500 leading-relaxed mb-10 mx-auto"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              maxWidth: 520,
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.35s",
            }}
          >
            Lebih dari sekadar angka. Bangun fondasi kognitif dan logika yang tajam untuk masa depan yang tak terbatas.
          </p>

          {/* CTA */}
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.5s",
            }}
          >
            <button
              onClick={() => setShowLogin(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300"
              style={{ background: "#C8A96E", color: "#1a1208" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#B8955A";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(200,169,110,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#C8A96E";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Mulai Perjalanan
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{
              opacity: heroInView ? 0.4 : 0,
              transition: "opacity 0.7s ease 1s",
            }}
          >
            <span className="text-xs tracking-widest uppercase text-slate-400">Jelajahi</span>
            <div className="w-px h-8" style={{ background: "linear-gradient(180deg, #C8A96E, transparent)" }} />
          </div>
        </div>
      </section>

      {/* ── Philosophy Section ── */}
      <section
        id="filosofi"
        ref={philRef}
        className="py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Big Number */}
            <div
              style={{
                opacity: philInView ? 1 : 0,
                transform: philInView ? "translateX(0)" : "translateX(-24px)",
                transition: "all 0.7s ease 0.1s",
              }}
            >
              <div className="relative inline-block">
                <span
                  className="font-serif leading-none select-none"
                  style={{ fontSize: "clamp(7rem, 16vw, 11rem)", color: "rgba(200,169,110,0.1)", lineHeight: 1 }}
                >80</span>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 pl-4">
                  <span className="text-xs tracking-[0.18em] uppercase block mb-1" style={{ color: "#C8A96E" }}>Prinsip Inti</span>
                  <p className="font-serif text-2xl text-slate-700 leading-tight">
                    Nalar di atas<br />Perhitungan
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Text */}
            <div
              style={{
                opacity: philInView ? 1 : 0,
                transform: philInView ? "translateX(0)" : "translateX(24px)",
                transition: "all 0.7s ease 0.25s",
              }}
            >
              <p className="text-xs tracking-[0.18em] uppercase mb-4" style={{ color: "#C8A96E" }}>Filosofi Kami</p>
              <h2 className="font-serif text-slate-800 mb-6" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", lineHeight: 1.2 }}>
                Filosofi 80:20
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6" style={{ fontSize: "1.0625rem" }}>
                Di Numera, kami percaya matematika adalah bahasa logika. Kami mengalokasikan <strong className="text-slate-700 font-medium">80% fokus</strong> pada pengembangan nalar dan <strong className="text-slate-700 font-medium">20% pada ketangkasan berhitung</strong>.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                Karena siswa yang memahami <em>mengapa</em> sebuah rumus bekerja akan selalu lebih unggul dari mereka yang hanya menghafalnya. Itulah standar Numera.
              </p>

              {/* Divider */}
              <div className="mt-8 pt-8" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                <div className="flex gap-10">
                  {[{ pct: "80%", label: "Pengembangan Nalar" }, { pct: "20%", label: "Ketangkasan Hitung" }].map((item) => (
                    <div key={item.label}>
                      <div className="font-serif text-2xl text-slate-800 mb-1">{item.pct}</div>
                      <div className="text-xs text-slate-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section id="kurikulum" ref={currRef} className="py-24 px-6" style={{ background: "#F4F4F2" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className="max-w-xl mb-16"
            style={{
              opacity: currInView ? 1 : 0,
              transform: currInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <p className="text-xs tracking-[0.18em] uppercase mb-3" style={{ color: "#C8A96E" }}>Kurikulum</p>
            <h2 className="font-serif text-slate-800 mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", lineHeight: 1.2 }}>
              Lima Fase,<br />Satu Tujuan
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Setiap fase dirancang sebagai pondasi untuk fase berikutnya — sebuah perjalanan intelektual yang kohesif dari akar hingga puncak.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CURRICULUM.map((item, i) => (
              <div key={item.code} className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}>
                <CurrCard item={item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Footer Band ── */}
      <section className="py-28 px-6 text-center" style={{ background: "#F9FAFB" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.18em] uppercase mb-4" style={{ color: "#C8A96E" }}>Bergabung Sekarang</p>
          <h2 className="font-serif text-slate-800 mb-5" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.2 }}>
            Siap Memulai<br />Perjalananmu?
          </h2>
          <p className="text-slate-500 text-sm mb-10">
            Ribuan siswa telah membuktikan bahwa matematika bukan tentang bakat — melainkan metode.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300"
            style={{ background: "#C8A96E", color: "#1a1208" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(200,169,110,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Mulai Perjalanan →
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-slate-700">Numera</span>
            <span className="text-xs text-slate-400">· Platform Matematika</span>
          </div>
          <p className="text-xs text-slate-400">© 2025 Numera. Semua hak dilindungi.</p>
        </div>
      </footer>

      {/* ── Login Modal ── */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
