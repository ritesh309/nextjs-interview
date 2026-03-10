import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StreamArch — Real-Time Video Streaming Architecture Explorer",
  description:
    "Deep-dive into the architecture of real-time streaming platforms like YouTube Live, Twitch & Netflix. Explore protocols, CDN, encoding, and more.",
};

const stats = [
  { value: "4K+", label: "Concurrent Streams", color: "var(--accent-blue)" },
  { value: "~500ms", label: "Ultra-Low Latency", color: "var(--accent-cyan)" },
  { value: "99.99%", label: "CDN Uptime SLA", color: "var(--accent-green)" },
  { value: "10Gbps+", label: "Throughput Capacity", color: "var(--accent-purple)" },
];

const features = [
  {
    icon: "🏗️",
    title: "End-to-End Architecture",
    desc: "Explore the full pipeline from broadcaster capture to viewer playback with animated flow diagrams.",
    href: "/architecture",
    badge: "Interactive",
    badgeClass: "badge-blue",
  },
  {
    icon: "📡",
    title: "Streaming Protocols",
    desc: "HLS, MPEG-DASH, WebRTC, SRT, RTMP — understand latency, use-cases, and trade-offs of each.",
    href: "/protocols",
    badge: "Deep Dive",
    badgeClass: "badge-cyan",
  },
  {
    icon: "🛠️",
    title: "Tools & Technologies",
    desc: "FFmpeg, Kafka, Redis, Nginx RTMP, AWS MediaLive, Cloudflare Stream — the full tech stack.",
    href: "/tools",
    badge: "40+ Tools",
    badgeClass: "badge-purple",
  },
  {
    icon: "⚡",
    title: "Next.js Best Practices",
    desc: "Server Components, Suspense streaming, App Router, Edge Runtime, Metadata API — done right.",
    href: "/nextjs-practices",
    badge: "Industry Grade",
    badgeClass: "badge-green",
  },
];

const pipeline = [
  { icon: "🎥", label: "Broadcaster", sub: "OBS / Camera", color: "#3B82F6" },
  { icon: "⚙️", label: "Encoder", sub: "FFmpeg / x264", color: "#8B5CF6" },
  { icon: "📺", label: "Media Server", sub: "Nginx / Wowza", color: "#06B6D4" },
  { icon: "🌐", label: "CDN Edge", sub: "CloudFront / Akamai", color: "#10B981" },
  { icon: "👁️", label: "Viewer", sub: "HLS / DASH Player", color: "#F59E0B" },
];

export default function HomePage() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "80px 24px 60px",
          position: "relative",
        }}
      >
        {/* Background orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <div
          className="animate-fade-in-up"
          style={{ position: "relative", zIndex: 1 }}
        >
          <span
            className="badge badge-blue"
            style={{ marginBottom: 20, display: "inline-flex" }}
          >
            🔴 Realtime Architecture Explorer
          </span>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              maxWidth: 900,
            }}
          >
            How{" "}
            <span className="gradient-text">Real-Time Video</span>
            <br />
            Streaming{" "}
            <span className="gradient-text-cyan">Actually Works</span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--text-secondary)",
              maxWidth: 640,
              lineHeight: 1.7,
              margin: "0 auto 40px",
            }}
          >
            A complete technical deep-dive into the architecture powering
            YouTube Live, Twitch, Netflix, and beyond. Protocols, CDN pipelines,
            encoding, edge computing — all in one place.
          </p>

          <div
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/architecture" style={{ textDecoration: "none" }}>
              <button className="btn-glow">Explore Architecture →</button>
            </Link>
            <Link href="/protocols" style={{ textDecoration: "none" }}>
              <button className="btn-outline">View Protocols</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Animated Pipeline Preview ── */}
      <section style={{ padding: "0 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div className="glass" style={{ padding: "32px 20px", overflow: "hidden" }}>
          <p
            style={{
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Streaming Data Pipeline — Live Preview
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
              flexWrap: "wrap",
            }}
          >
            {pipeline.map((node, i) => (
              <div
                key={node.label}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  className="tooltip-container animate-fade-in-up"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    opacity: 0,
                    animationFillMode: "forwards",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    padding: "16px 18px",
                    borderRadius: 14,
                    background: `rgba(${node.color === "#3B82F6" ? "59,130,246" : node.color === "#8B5CF6" ? "139,92,246" : node.color === "#06B6D4" ? "6,182,212" : node.color === "#10B981" ? "16,185,129" : "245,158,11"},0.08)`,
                    border: `1px solid ${node.color}30`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    minWidth: 90,
                  }}
                >
                  <div style={{ fontSize: "2rem" }}>{node.icon}</div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      color: node.color,
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    {node.label}
                  </div>
                  <div
                    style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}
                  >
                    {node.sub}
                  </div>
                  <div className="tooltip">Click to learn more</div>
                </div>
                {i < pipeline.length - 1 && (
                  <div
                    style={{
                      width: "clamp(20px, 4vw, 50px)",
                      height: 2,
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 2,
                      background: "rgba(99,179,237,0.15)",
                    }}
                    className="pipeline-line"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        style={{ padding: "20px 24px 80px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`glass glass-hover animate-fade-in-up delay-${(i + 1) * 100}`}
              style={{
                padding: "28px 24px",
                textAlign: "center",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <div
                className="stat-value"
                style={{ color: s.color, marginBottom: 8 }}
              >
                {s.value}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" style={{ maxWidth: 1100, margin: "0 auto 80px" }} />

      {/* ── Feature Cards ── */}
      <section
        style={{ padding: "0 24px 100px", maxWidth: 1100, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            What You&apos;ll{" "}
            <span className="gradient-text">Explore</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Four deep-dive sections covering every layer of modern streaming infrastructure
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {features.map((f, i) => (
            <Link key={f.title} href={f.href} style={{ textDecoration: "none" }}>
              <div
                className={`glass glass-hover animate-fade-in-up delay-${(i + 1) * 100}`}
                style={{
                  padding: "28px 24px",
                  height: "100%",
                  opacity: 0,
                  animationFillMode: "forwards",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>
                  {f.icon}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span className={`badge ${f.badgeClass}`}>{f.badge}</span>
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: 10,
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
