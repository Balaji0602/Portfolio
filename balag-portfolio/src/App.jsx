import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["About", "Skills", "Services", "Projects", "Contact"];

const SKILLS = {
  Frontend: ["React", "HTML5", "CSS3", "Material UI"],
  Backend: ["Node.js", "Express.js", "Python", "FastAPI", "REST APIs", "Microservices"],
  Database: ["PostgreSQL", "MySQL"],
  Cloud: ["AWS Lambda", "API Gateway", "CloudWatch", "S3"],
  Programming: ["JavaScript", "TypeScript", "Python"],
  "Core CS": ["Data Structures", "Algorithms", "OOPs", "Design Patterns"],
  AI: ["Generative AI", "Agentic AI", "Prompt Engineering"],
};

const SKILL_LEVELS = {
  React: 92, "Node.js": 88, PostgreSQL: 80, "AWS Lambda": 75,
  JavaScript: 95, TypeScript: 82, Python: 70, "Generative AI": 65,
  "Express.js": 85, "REST APIs": 90, "HTML5": 95, "CSS3": 88,
  "Material UI": 80, FastAPI: 68, MySQL: 75, "API Gateway": 72,
  CloudWatch: 68, S3: 70, "Data Structures": 78, Algorithms: 75,
  OOPs: 85, "Design Patterns": 80, Microservices: 78, "Prompt Engineering": 70,
  "Agentic AI": 65,
};

const SERVICES = [
  {
    icon: "⚡",
    title: "Full Stack Web Development",
    desc: "End-to-end React & Node.js applications with clean architecture, modern UI, and robust backend systems.",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    icon: "🔗",
    title: "API Development",
    desc: "Scalable REST APIs and microservices designed for performance, security, and maintainability.",
    tags: ["REST APIs", "Express.js", "Microservices"],
  },
  {
    icon: "🚀",
    title: "Performance Optimization",
    desc: "React performance tuning, lazy loading, code splitting, and database query optimization.",
    tags: ["Code Splitting", "Caching", "Query Tuning"],
  },
  {
    icon: "☁️",
    title: "Cloud Deployment",
    desc: "AWS-based serverless deployments using Lambda, API Gateway, and CloudWatch monitoring.",
    tags: ["AWS Lambda", "API Gateway", "CloudWatch"],
  },
];

const PROJECTS = [
  {
    title: "POS System — RACPad",
    description: "A full-featured Point-of-Sale system with inventory management, dynamic pricing, and customer relationship features.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    color: "#5B6CFF",
    highlights: ["Inventory Management", "Pricing Engine", "Customer CRM"],
    icon: "🛒",
  },
];


const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        background: scrolled
          ? darkMode ? "rgba(10,10,20,0.85)" : "rgba(248,249,255,0.85)"
          : "transparent",
        borderBottom: scrolled ? `1px solid ${darkMode ? "rgba(255,255,255,0.07)" : "rgba(91,108,255,0.1)"}` : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.04 }} style={{ cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 24,
            background: "linear-gradient(135deg, #5B6CFF, #8F6BFF)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}>BalaG</span>
        </motion.div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <motion.button
              key={link}
              onClick={() => scrollTo(link === "Contact" ? "contact" : link.toLowerCase())}
              whileHover={{ y: -1 }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
                color: darkMode ? "#CBD5E1" : "#374151",
                position: "relative", padding: "4px 0",
                transition: "color 0.2s",
              }}
              className="nav-link"
            >
              {link}
            </motion.button>
          ))}
          {/* Dark mode toggle */}
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {/* Mobile menu btn */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            fontSize: 24, color: darkMode ? "#fff" : "#1E1E1E",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: darkMode ? "rgba(10,10,20,0.97)" : "rgba(248,249,255,0.97)",
              backdropFilter: "blur(24px)",
              padding: "16px 5% 24px",
              display: "flex", flexDirection: "column", gap: 4,
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 500,
                  color: darkMode ? "#CBD5E1" : "#374151",
                  textAlign: "left", padding: "12px 0",
                  borderBottom: `1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                }}
              >
                {link}
              </button>
            ))}
            {/* Theme toggle in mobile menu */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, color: darkMode ? "#CBD5E1" : "#374151" }}>
                {darkMode ? "Dark Mode" : "Light Mode"}
              </span>
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <motion.button
      onClick={() => setDarkMode(!darkMode)}
      whileTap={{ scale: 0.93 }}
      style={{
        position: "relative",
        width: 64, height: 32, borderRadius: 100,
        background: darkMode
          ? "linear-gradient(135deg, #5B6CFF, #6E3AFF)"
          : "rgba(91,108,255,0.12)",
        border: `1.5px solid ${darkMode ? "rgba(255,255,255,0.15)" : "rgba(91,108,255,0.3)"}`,
        cursor: "pointer",
        display: "flex", alignItems: "center",
        padding: "0 4px",
        flexShrink: 0,
        transition: "background 0.4s, border 0.4s",
      }}
      aria-label="Toggle theme"
    >
      {/* Track icons */}
      <span style={{
        position: "absolute", left: 7, fontSize: 13,
        opacity: darkMode ? 0 : 1, transition: "opacity 0.3s",
        userSelect: "none",
      }}>☀️</span>
      <span style={{
        position: "absolute", right: 7, fontSize: 13,
        opacity: darkMode ? 1 : 0, transition: "opacity 0.3s",
        userSelect: "none",
      }}>🌙</span>

      {/* Sliding knob */}
      <motion.div
        animate={{ x: darkMode ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          width: 24, height: 24, borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, zIndex: 1,
          flexShrink: 0,
        }}
      >
        {darkMode ? "🌙" : "☀️"}
      </motion.div>
    </motion.button>
  );
}
function FloatingOrbs({ darkMode }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {[
        { x: "10%", y: "20%", size: 400, color: "#5B6CFF", delay: 0 },
        { x: "75%", y: "15%", size: 300, color: "#6E3AFF", delay: 2 },
        { x: "50%", y: "65%", size: 350, color: "#8F6BFF", delay: 4 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          style={{
            position: "absolute",
            left: orb.x, top: orb.y,
            width: orb.size, height: orb.size,
            background: `radial-gradient(circle, ${orb.color}${darkMode ? "22" : "18"}, transparent 70%)`,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(40px)",
          }}
        />
      ))}
    </div>
  );
}

function Hero({ darkMode }) {
  const handleGetInTouch = async () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    try {
      await fetch("/api/contact-notification", { method: "POST" });
    } catch (_) {}
  };

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
      <FloatingOrbs darkMode={darkMode} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 5%", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          {/* Left content */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 100,
              background: "linear-gradient(135deg, rgba(91,108,255,0.15), rgba(110,58,255,0.15))",
              border: "1px solid rgba(91,108,255,0.3)",
              marginBottom: 24,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#5B6CFF", display: "inline-block" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: "#5B6CFF" }}>
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Poppins', sans-serif", fontWeight: 800,
              fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.1,
              color: darkMode ? "#F1F5F9" : "#1E1E1E",
              marginBottom: 20, letterSpacing: "-1.5px",
            }}>
              Full-Stack<br />
              <span style={{ background: "linear-gradient(135deg, #5B6CFF, #8F6BFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Developer
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'Inter', sans-serif", fontSize: 18, lineHeight: 1.7,
              color: darkMode ? "#94A3B8" : "#6B7280", marginBottom: 16, maxWidth: 480,
            }}>
              My focus is on transforming complex challenges into clean, modern, and high-performance web applications.
            </motion.p>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.7,
              color: darkMode ? "#64748B" : "#9CA3AF", marginBottom: 40, maxWidth: 460,
            }}>
              Hi, I'm <strong style={{ color: darkMode ? "#CBD5E1" : "#374151" }}>S R Balaji</strong> — a Technical Lead at Zeb, previously Software Engineer at Avasoft, with 2.5+ years of experience building scalable web apps and AI-driven solutions.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(91,108,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  padding: "14px 32px", borderRadius: 12,
                  background: "linear-gradient(135deg, #5B6CFF, #6E3AFF)",
                  color: "#fff", fontFamily: "'Inter', sans-serif", fontWeight: 600,
                  fontSize: 15, border: "none", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(91,108,255,0.3)",
                  transition: "box-shadow 0.3s",
                }}
              >
                View Projects →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGetInTouch}
                style={{
                  padding: "14px 32px", borderRadius: 12,
                  background: "transparent",
                  color: darkMode ? "#CBD5E1" : "#374151",
                  fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15,
                  border: `1.5px solid ${darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
                  cursor: "pointer",
                }}
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: 32, marginTop: 48 }}>
              {[["2.5+", "Years Experience"], ["80%", "Performance Gains"], ["2", "Companies"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, color: "#5B6CFF" }}>{num}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: darkMode ? "#64748B" : "#9CA3AF" }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}
          >
            {/* Glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute", width: 320, height: 320,
                borderRadius: "50%",
                background: "conic-gradient(from 0deg, #5B6CFF, #6E3AFF, #8F6BFF, transparent, #5B6CFF)",
                filter: "blur(2px)", opacity: 0.5,
              }}
            />
            {/* Avatar card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "relative", width: 280, height: 280, borderRadius: "50%",
                background: darkMode
                  ? "linear-gradient(135deg, #1e1e3a, #2d2b5e)"
                  : "linear-gradient(135deg, #EEF0FF, #E8E4FF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 20px 80px rgba(91,108,255,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                fontSize: 120, zIndex: 1,
              }}
            >
              👨‍💻
            </motion.div>

            {/* Floating badges */}
            {[
              { icon: "⚛️", label: "React", x: -80, y: -60 },
              { icon: "🟩", label: "Node.js", x: 90, y: -40 },
              { icon: "☁️", label: "AWS", x: -70, y: 80 },
              { icon: "🐘", label: "PostgreSQL", x: 95, y: 70 },
            ].map((badge) => (
              <motion.div
                key={badge.label}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${badge.x}px)`,
                  top: `calc(50% + ${badge.y}px)`,
                  transform: "translate(-50%, -50%)",
                  padding: "8px 14px", borderRadius: 12,
                  background: darkMode ? "rgba(30,30,50,0.9)" : "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(91,108,255,0.15)"}`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600,
                  color: darkMode ? "#CBD5E1" : "#374151",
                  whiteSpace: "nowrap", zIndex: 2,
                }}
              >
                {badge.icon} {badge.label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function About({ darkMode }) {
  const [ref, inView] = useScrollReveal();
  return (
    <section id="about" style={{ padding: "100px 5%", position: "relative" }} ref={ref}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <SectionLabel label="About Me" darkMode={darkMode} />
          <motion.h2 variants={fadeUp} style={headingStyle(darkMode)}>
            Crafting Digital<br />
            <span style={gradientText}>Experiences</span>
          </motion.h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 60, alignItems: "start" }} className="about-grid">
            {/* Left */}
            <motion.div variants={fadeUp}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, lineHeight: 1.8, color: darkMode ? "#94A3B8" : "#6B7280", marginBottom: 24 }}>
                I'm <strong style={{ color: darkMode ? "#E2E8F0" : "#1E1E1E" }}>S R Balaji</strong>, currently a Technical Lead at Zeb, previously a Software Engineer at Avasoft. With 2.5+ years of experience, I build clean, performant web applications and AI-driven solutions — from pixel-perfect React UIs to cloud-native backends.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, lineHeight: 1.8, color: darkMode ? "#94A3B8" : "#6B7280", marginBottom: 32 }}>
                Beyond code, I apply solid OOP principles, Design Patterns, and DSA knowledge to architect maintainable systems. I'm also exploring Generative AI and Python to stay ahead of the curve.
              </p>

              {/* Achievements */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "⚡", text: "Improved application loading time by 80%" },
                  { icon: "🔍", text: "Optimized complex DB queries, reducing latency significantly" },
                ].map((item) => (
                  <div key={item.text} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={{ fontSize: 18, marginTop: 2 }}>{item.icon}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: darkMode ? "#94A3B8" : "#6B7280", lineHeight: 1.6 }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Timeline */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Current Role — Zeb */}
              <div style={{
                padding: 28, borderRadius: 24,
                background: darkMode ? "rgba(30,30,50,0.6)" : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(20px)",
                border: `1px solid rgba(91,108,255,0.3)`,
                boxShadow: darkMode ? "0 20px 60px rgba(91,108,255,0.15)" : "0 20px 60px rgba(91,108,255,0.1)",
                position: "relative", overflow: "hidden",
              }}>
                {/* Active badge */}
                <div style={{ position: "absolute", top: 20, right: 20, padding: "3px 10px", borderRadius: 100, background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.15))", border: "1px solid rgba(16,185,129,0.4)" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, color: "#10B981", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} /> Current
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #10B981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🚀</div>
                  <div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: darkMode ? "#E2E8F0" : "#1E1E1E" }}>Technical Lead</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#10B981", fontWeight: 600 }}>Zeb</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: darkMode ? "#64748B" : "#9CA3AF", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                  📅 Feb 2026 – Present
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Python", "Generative AI", "Agentic AI", "React", "Node.js", "TypeScript", "LLMs", "RAG"].map((tech) => (
                    <span key={tech} style={{
                      padding: "4px 12px", borderRadius: 8,
                      background: "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.1))",
                      border: "1px solid rgba(16,185,129,0.25)",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500,
                      color: "#10B981",
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Previous Role — Avasoft */}
              <div style={{
                padding: 28, borderRadius: 24,
                background: darkMode ? "rgba(30,30,50,0.6)" : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(91,108,255,0.12)"}`,
                boxShadow: darkMode ? "0 12px 40px rgba(0,0,0,0.3)" : "0 12px 40px rgba(91,108,255,0.06)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #5B6CFF, #6E3AFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏢</div>
                  <div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: darkMode ? "#E2E8F0" : "#1E1E1E" }}>Software Engineer</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#5B6CFF", fontWeight: 600 }}>Avasoft</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: darkMode ? "#64748B" : "#9CA3AF", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                  📅 June 2023 – Feb 2026
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["React", "Node.js", "PostgreSQL", "AWS Lambda", "Microservices", "TypeScript"].map((tech) => (
                    <span key={tech} style={{
                      padding: "4px 12px", borderRadius: 8,
                      background: "linear-gradient(135deg, rgba(91,108,255,0.12), rgba(110,58,255,0.12))",
                      border: "1px solid rgba(91,108,255,0.2)",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500,
                      color: "#5B6CFF",
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div style={{
                padding: 24, borderRadius: 20,
                background: darkMode ? "rgba(30,30,50,0.4)" : "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: darkMode ? "#94A3B8" : "#6B7280", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Education</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>🎓</span>
                  <div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: darkMode ? "#E2E8F0" : "#1E1E1E" }}>B.E. Computer Science</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: darkMode ? "#64748B" : "#9CA3AF" }}>2019 – 2023</div>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillBar({ skill, level, darkMode, delay }) {
  const [ref, inView] = useScrollReveal(0.1);
  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, color: darkMode ? "#CBD5E1" : "#374151" }}>{skill}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#5B6CFF", fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 6, background: darkMode ? "rgba(255,255,255,0.08)" : "rgba(91,108,255,0.1)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%", borderRadius: 6,
            background: "linear-gradient(90deg, #5B6CFF, #8F6BFF)",
          }}
        />
      </div>
    </div>
  );
}

function Skills({ darkMode }) {
  const [ref, inView] = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState("Frontend");

  return (
    <section id="skills" style={{ padding: "100px 5%", position: "relative" }} ref={ref}>
      <div style={{
        position: "absolute", inset: 0,
        background: darkMode
          ? "linear-gradient(180deg, transparent, rgba(91,108,255,0.03), transparent)"
          : "linear-gradient(180deg, transparent, rgba(91,108,255,0.04), transparent)",
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <SectionLabel label="Skills" darkMode={darkMode} />
          <motion.h2 variants={fadeUp} style={headingStyle(darkMode)}>
            Technologies I<br />
            <span style={gradientText}>Work With</span>
          </motion.h2>

          {/* Category tabs */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 8, marginTop: 40, marginBottom: 40, flexWrap: "wrap" }}>
            {Object.keys(SKILLS).map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 20px", borderRadius: 100,
                  background: activeCategory === cat
                    ? "linear-gradient(135deg, #5B6CFF, #6E3AFF)"
                    : darkMode ? "rgba(255,255,255,0.05)" : "rgba(91,108,255,0.08)",
                  border: activeCategory === cat ? "none" : `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(91,108,255,0.15)"}`,
                  color: activeCategory === cat ? "#fff" : (darkMode ? "#94A3B8" : "#6B7280"),
                  fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
                  cursor: "pointer", transition: "all 0.3s",
                }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="skills-grid">
            {/* Left: Skill badges */}
            <motion.div variants={fadeUp}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
                >
                  {SKILLS[activeCategory].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      style={{
                        padding: "10px 18px", borderRadius: 12,
                        background: darkMode ? "rgba(30,30,50,0.8)" : "rgba(255,255,255,0.9)",
                        border: `1px solid ${darkMode ? "rgba(91,108,255,0.25)" : "rgba(91,108,255,0.2)"}`,
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 500,
                        color: darkMode ? "#CBD5E1" : "#374151",
                        boxShadow: "0 4px 20px rgba(91,108,255,0.08)",
                        cursor: "default",
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right: Progress bars */}
            <motion.div variants={fadeUp} style={{
              padding: 28, borderRadius: 20,
              background: darkMode ? "rgba(30,30,50,0.6)" : "rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(91,108,255,0.12)"}`,
              boxShadow: darkMode ? "0 20px 60px rgba(0,0,0,0.3)" : "0 20px 60px rgba(91,108,255,0.06)",
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {SKILLS[activeCategory].filter(s => SKILL_LEVELS[s]).map((skill, i) => (
                    <SkillBar key={skill} skill={skill} level={SKILL_LEVELS[skill] || 75} darkMode={darkMode} delay={i * 0.1} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services({ darkMode }) {
  const [ref, inView] = useScrollReveal();
  return (
    <section id="services" style={{ padding: "100px 5%", position: "relative" }} ref={ref}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <SectionLabel label="Services" darkMode={darkMode} />
          <motion.h2 variants={fadeUp} style={headingStyle(darkMode)}>
            What I <span style={gradientText}>Offer</span>
          </motion.h2>

          <motion.div
            variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 60 }}
          >
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8, boxShadow: darkMode ? "0 30px 80px rgba(91,108,255,0.2)" : "0 30px 80px rgba(91,108,255,0.15)" }}
                style={{
                  padding: 32, borderRadius: 24,
                  background: darkMode ? "rgba(30,30,50,0.7)" : "#fff",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(91,108,255,0.1)"}`,
                  boxShadow: darkMode ? "0 8px 40px rgba(0,0,0,0.3)" : "0 8px 40px rgba(91,108,255,0.06)",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{service.icon}</div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: darkMode ? "#E2E8F0" : "#1E1E1E", marginBottom: 12 }}>
                  {service.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: darkMode ? "#64748B" : "#9CA3AF", marginBottom: 20 }}>
                  {service.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {service.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: "4px 10px", borderRadius: 6,
                      background: "linear-gradient(135deg, rgba(91,108,255,0.1), rgba(110,58,255,0.1))",
                      border: "1px solid rgba(91,108,255,0.15)",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500,
                      color: "#5B6CFF",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Projects({ darkMode }) {
  const [ref, inView] = useScrollReveal();
  return (
    <section id="projects" style={{ padding: "100px 5%", position: "relative" }} ref={ref}>
      <div style={{
        position: "absolute", inset: 0,
        background: darkMode
          ? "linear-gradient(180deg, transparent, rgba(110,58,255,0.04), transparent)"
          : "linear-gradient(180deg, transparent, rgba(91,108,255,0.04), transparent)",
      }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <SectionLabel label="Projects" darkMode={darkMode} />
          <motion.h2 variants={fadeUp} style={headingStyle(darkMode)}>
            Featured <span style={gradientText}>Work</span>
          </motion.h2>

          <motion.div
            variants={stagger}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28, marginTop: 60 }}
          >
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -10 }}
                style={{
                  borderRadius: 24, overflow: "hidden",
                  background: darkMode ? "rgba(30,30,50,0.8)" : "#fff",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(91,108,255,0.1)"}`,
                  boxShadow: darkMode ? "0 8px 40px rgba(0,0,0,0.4)" : "0 8px 40px rgba(91,108,255,0.08)",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  cursor: "default",
                }}
              >
                {/* Header gradient */}
                <div style={{
                  height: 140, position: "relative", overflow: "hidden",
                  background: `linear-gradient(135deg, ${project.color}33, ${project.color}66)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ fontSize: 64 }}
                  >
                    {project.icon}
                  </motion.div>
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
                    background: `linear-gradient(transparent, ${darkMode ? "rgb(30,30,50)" : "#fff"})`,
                  }} />
                </div>

                {/* Content */}
                <div style={{ padding: 28 }}>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: darkMode ? "#E2E8F0" : "#1E1E1E", marginBottom: 10 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: darkMode ? "#64748B" : "#9CA3AF", marginBottom: 20 }}>
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
                    {project.highlights.map((h) => (
                      <div key={h} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: project.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: darkMode ? "#94A3B8" : "#6B7280" }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {project.tech.map((t) => (
                      <span key={t} style={{
                        padding: "4px 10px", borderRadius: 6,
                        background: `${project.color}18`,
                        border: `1px solid ${project.color}33`,
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500,
                        color: project.color,
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact({ darkMode }) {
  const [ref, inView] = useScrollReveal();
  const [step, setStep] = useState("form"); // "form" | "sending" | "sent"
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  // Get Google Sheet URL from environment variable
  const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { 
      setErrors(e);
      setAlert({ show: true, msg: 'Please fill all fields correctly', type: 'error' });
      setTimeout(() => setAlert({ show: false, msg: "", type: "" }), 3000);
      return;
    }
    
    setErrors({});
    setStep("sending");
    
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...form, 
          timestamp: new Date().toISOString() 
        }),
      });
      
      setAlert({ show: true, msg: "Sent! I'll reply soon.", type: 'success' });
      setTimeout(() => {
        setStep("sent");
        setAlert({ show: false, msg: "", type: "" });
      }, 1200);
    } catch (error) {
      setAlert({ show: true, msg: 'Error. Try again.', type: 'error' });
      setStep("form");
      setTimeout(() => setAlert({ show: false, msg: "", type: "" }), 3000);
    }
  };

  const inputStyle = (hasError, darkMode) => ({
    width: "100%", padding: "13px 16px", borderRadius: 12, fontSize: 14,
    fontFamily: "'Inter', sans-serif", fontWeight: 400,
    background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(91,108,255,0.04)",
    border: `1.5px solid ${hasError ? "#EF4444" : darkMode ? "rgba(255,255,255,0.1)" : "rgba(91,108,255,0.18)"}`,
    color: darkMode ? "#E2E8F0" : "#1E1E1E",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  });

  return (
    <section id="contact" style={{ padding: "100px 5% 140px", position: "relative" }} ref={ref}>
      <FloatingOrbs darkMode={darkMode} />
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <SectionLabel label="Contact" darkMode={darkMode} />
          <motion.h2 variants={fadeUp} style={{ ...headingStyle(darkMode), textAlign: "center" }}>
            Let's Work <span style={gradientText}>Together</span>
          </motion.h2>
          <motion.p variants={fadeUp} style={{
            fontFamily: "'Inter', sans-serif", fontSize: 17, lineHeight: 1.7,
            color: darkMode ? "#94A3B8" : "#6B7280", textAlign: "center", maxWidth: 480, margin: "0 auto 52px",
          }}>
            Have a project in mind or just want to say hello? Fill in your details and I'll get back to you.
          </motion.p>

          {/* Alert notification */}
          <AnimatePresence>
            {alert.show && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  padding: "14px 20px", borderRadius: 12, marginBottom: 20,
                  background: alert.type === 'success' 
                    ? "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.15))"
                    : "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(220,38,38,0.15))",
                  border: `1px solid ${alert.type === 'success' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
                  display: "flex", alignItems: "center", gap: 10,
                }}
              >
                <span style={{ fontSize: 18 }}>{alert.type === 'success' ? '✅' : '⚠️'}</span>
                <span style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: 14, 
                  fontWeight: 500,
                  color: alert.type === 'success' ? '#10B981' : '#EF4444'
                }}>
                  {alert.msg}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={fadeUp} style={{
            padding: "44px 48px", borderRadius: 28,
            background: darkMode ? "rgba(30,30,50,0.85)" : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(30px)",
            border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(91,108,255,0.15)"}`,
            boxShadow: darkMode ? "0 30px 100px rgba(0,0,0,0.5)" : "0 30px 100px rgba(91,108,255,0.1)",
          }}>
            <AnimatePresence mode="wait">
              {step === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: "center", padding: "24px 0" }}
                >
                  <motion.div
                    animate={{ scale: [0.8, 1.15, 1] }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: 64, marginBottom: 20 }}
                  >
                    ✅
                  </motion.div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, color: darkMode ? "#E2E8F0" : "#1E1E1E", marginBottom: 12 }}>
                    Message Received!
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: darkMode ? "#64748B" : "#9CA3AF", lineHeight: 1.7, marginBottom: 28 }}>
                    Thanks <strong style={{ color: "#5B6CFF" }}>{form.name}</strong>! I've received your message and will get back to you at <strong style={{ color: "#5B6CFF" }}>{form.email}</strong> soon. 🎉
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { 
                      setStep("form"); 
                      setForm({ name: "", email: "", message: "" });
                      setErrors({});
                      setAlert({ show: false, msg: "", type: "" });
                    }}
                    style={{
                      padding: "10px 28px", borderRadius: 10,
                      background: "transparent",
                      color: "#5B6CFF", border: "1.5px solid rgba(91,108,255,0.4)",
                      cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14,
                    }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Email row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="form-row">
                    <div>
                      <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: darkMode ? "#94A3B8" : "#6B7280", marginBottom: 6 }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={inputStyle(errors.name, darkMode)}
                        onFocus={(e) => e.target.style.borderColor = "#5B6CFF"}
                        onBlur={(e) => e.target.style.borderColor = errors.name ? "#EF4444" : darkMode ? "rgba(255,255,255,0.1)" : "rgba(91,108,255,0.18)"}
                      />
                      {errors.name && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: darkMode ? "#94A3B8" : "#6B7280", marginBottom: 6 }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={inputStyle(errors.email, darkMode)}
                        onFocus={(e) => e.target.style.borderColor = "#5B6CFF"}
                        onBlur={(e) => e.target.style.borderColor = errors.email ? "#EF4444" : darkMode ? "rgba(255,255,255,0.1)" : "rgba(91,108,255,0.18)"}
                      />
                      {errors.email && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: darkMode ? "#94A3B8" : "#6B7280", marginBottom: 6 }}>
                      What's on your mind? *
                    </label>
                    <textarea
                      placeholder="Tell me about your project, opportunity, or just say hi..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      style={{ ...inputStyle(errors.message, darkMode), resize: "vertical", minHeight: 120 }}
                      onFocus={(e) => e.target.style.borderColor = "#5B6CFF"}
                      onBlur={(e) => e.target.style.borderColor = errors.message ? "#EF4444" : darkMode ? "rgba(255,255,255,0.1)" : "rgba(91,108,255,0.18)"}
                    />
                    {errors.message && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 12px 40px rgba(91,108,255,0.45)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    disabled={step === "sending"}
                    style={{
                      width: "100%", padding: "15px", borderRadius: 14,
                      background: step === "sending"
                        ? "linear-gradient(135deg, #4B5CC4, #5A2FCC)"
                        : "linear-gradient(135deg, #5B6CFF, #6E3AFF)",
                      color: "#fff", border: "none", cursor: step === "sending" ? "not-allowed" : "pointer",
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 16,
                      boxShadow: "0 4px 24px rgba(91,108,255,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      transition: "all 0.3s",
                    }}
                  >
                    {step === "sending" ? (
                      <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ display: "inline-block" }}>⏳</motion.span> Sending your message...</>
                    ) : (
                      <>✉️ Get In Touch</>
                    )}
                  </motion.button>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: darkMode ? "#475569" : "#9CA3AF", textAlign: "center", marginTop: 16 }}>
                    📧 I typically respond within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ darkMode }) {
  return (
    <footer style={{
      padding: "32px 5%", textAlign: "center",
      borderTop: `1px solid ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}`,
    }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: darkMode ? "#374151" : "#D1D5DB" }}>
        Crafted with ❤️ by{" "}
        <span style={{ background: "linear-gradient(135deg, #5B6CFF, #8F6BFF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700 }}>
          S R Balaji (BalaG)
        </span>{" "}
        · {new Date().getFullYear()}
      </div>
    </footer>
  );
}

// ─── Shared style helpers ────────────────────────────────────────────────────

const gradientText = {
  background: "linear-gradient(135deg, #5B6CFF, #8F6BFF)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const headingStyle = (darkMode) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 800,
  fontSize: "clamp(32px, 4vw, 52px)",
  lineHeight: 1.15,
  color: darkMode ? "#F1F5F9" : "#1E1E1E",
  marginBottom: 8,
  letterSpacing: "-1px",
});

function SectionLabel({ label, darkMode }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "5px 14px", borderRadius: 100,
        background: "linear-gradient(135deg, rgba(91,108,255,0.12), rgba(143,107,255,0.12))",
        border: "1px solid rgba(91,108,255,0.25)",
        marginBottom: 20,
      }}
    >
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: "#5B6CFF", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {label}
      </span>
    </motion.div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);

  const bg = darkMode ? "#080815" : "#F8F9FF";
  const textColor = darkMode ? "#F1F5F9" : "#1E1E1E";

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { width: 100%; min-height: 100%; }
        html { scroll-behavior: smooth; }
        body { background: ${bg}; color: ${textColor}; transition: background 0.4s, color 0.4s; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#5B6CFF, #8F6BFF); border-radius: 3px; }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1.5px;
          background: linear-gradient(90deg, #5B6CFF, #8F6BFF);
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link:hover { color: #5B6CFF !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-grid > div:last-child { display: none; }
          .about-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ background: bg, minHeight: "100vh", width: "100%", transition: "background 0.4s" }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Services darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Contact darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}
