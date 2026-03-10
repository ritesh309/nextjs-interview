import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Architecture | StreamArch",
    description:
        "Interactive architecture diagram of a real-time streaming video platform — from capture to playback.",
};

const nodes = [
    {
        id: "camera",
        icon: "🎥",
        title: "Capture Device",
        subtitle: "Camera / Screen",
        description:
            "Raw video and audio is captured at the source — cameras, webcams, or screen-share. Typically outputs raw YUV frames at 30–120fps.",
        details: ["4K RAW @ 60fps input", "PCM Audio Capture", "H/W Acceleration via GPU"],
        color: "#3B82F6",
        badge: "Source",
    },
    {
        id: "encoder",
        icon: "⚙️",
        title: "Encoder",
        subtitle: "FFmpeg / OBS / x264",
        description:
            "The encoder compresses raw frames into a streamable codec (H.264, H.265, AV1). Outputs transport stream chunks (TS segments for HLS).",
        details: ["H.264 / H.265 / AV1 Codec", "Adaptive Bitrate Ladder", "Segment Duration: 2–6s"],
        color: "#8B5CF6",
        badge: "Processing",
    },
    {
        id: "ingest",
        icon: "📥",
        title: "Ingest Server",
        subtitle: "RTMP / SRT / WebRTC",
        description:
            "Receives the encoded stream via a low-latency protocol. RTMP is common for broadcast; SRT for unreliable networks; WebRTC for sub-second.",
        details: ["RTMP on port 1935", "SRT (Secure, Reliable)", "WebRTC WHIP protocol"],
        color: "#06B6D4",
        badge: "Ingestion",
    },
    {
        id: "transcoder",
        icon: "🔄",
        title: "Transcoder / Packager",
        subtitle: "AWS MediaLive / Wowza",
        description:
            "Transcodes the stream into multiple quality renditions (1080p, 720p, 480p, 360p) for Adaptive Bitrate (ABR) delivery.",
        details: ["Multi-rendition ABR ladder", "HLS & DASH packaging", "GPU-accelerated transcode"],
        color: "#F59E0B",
        badge: "Transcode",
    },
    {
        id: "origin",
        icon: "🗄️",
        title: "Origin Server",
        subtitle: "S3 / Media Storage",
        description:
            "The master source of truth. Stores segments and manifests (`.m3u8` / `.mpd`). The CDN fetches from here on cache miss.",
        details: ["Segment store (TS / fMP4)", "Manifest files (.m3u8)", "Redis segment cache"],
        color: "#10B981",
        badge: "Storage",
    },
    {
        id: "cdn",
        icon: "🌐",
        title: "CDN Edge Network",
        subtitle: "Cloudflare / Akamai / CloudFront",
        description:
            "Globally distributed edge nodes cache and serve segments to viewers closest to them, minimizing latency and reducing origin load.",
        details: ["200+ edge PoPs", "Cache-Control headers", "Real-time purge APIs"],
        color: "#EF4444",
        badge: "Distribution",
    },
    {
        id: "viewer",
        icon: "👁️",
        title: "Viewer Player",
        subtitle: "HLS.js / Shaka / Native",
        description:
            "The player fetches manifests and segments, auto-selecting quality based on bandwidth (ABR algorithm) for smooth, uninterrupted playback.",
        details: ["ABR quality switching", "DRM decryption (Widevine)", "Buffer: 3–10s ahead"],
        color: "#A78BFA",
        badge: "Playback",
    },
];

const dataFlows = [
    { from: "Capture", to: "Encoder", label: "Raw YUV Frames", protocol: "PCIe / USB3" },
    { from: "Encoder", to: "Ingest", label: "Encoded Stream", protocol: "RTMP / SRT" },
    { from: "Ingest", to: "Transcoder", label: "TS Chunks", protocol: "Internal gRPC" },
    { from: "Transcoder", to: "Origin", label: "HLS/DASH Segments", protocol: "HTTP PUT / S3 API" },
    { from: "Origin", to: "CDN", label: "Segments on cache miss", protocol: "HTTPS origin pull" },
    { from: "CDN", to: "Player", label: "Segment delivery", protocol: "HTTP/2 / HTTP/3" },
];

export default function ArchitecturePage() {
    return (
        <div style={{ padding: "60px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div
                className="animate-fade-in-up"
                style={{ textAlign: "center", marginBottom: 60 }}
            >
                <span className="badge badge-blue" style={{ marginBottom: 16, display: "inline-flex" }}>
                    🏗️ Architecture Deep Dive
                </span>
                <h1
                    style={{
                        fontSize: "clamp(2rem, 4vw, 3.2rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        marginBottom: 16,
                    }}
                >
                    Real-Time Streaming{" "}
                    <span className="gradient-text">Architecture Pipeline</span>
                </h1>
                <p
                    style={{
                        color: "var(--text-secondary)",
                        fontSize: "1.05rem",
                        maxWidth: 600,
                        margin: "0 auto",
                        lineHeight: 1.7,
                    }}
                >
                    Every stage of a live streaming platform — from camera input to
                    millions of concurrent viewers — explained in depth.
                </p>
            </div>

            {/* Pipeline Diagram */}
            <div
                className="glass animate-fade-in-up delay-200"
                style={{
                    padding: "40px 24px",
                    marginBottom: 48,
                    opacity: 0,
                    animationFillMode: "forwards",
                    textAlign: "center",
                }}
            >
                <p
                    style={{
                        color: "var(--text-muted)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: 32,
                    }}
                >
                    Full Pipeline — Hover each node for details
                </p>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: 0,
                    }}
                >
                    {nodes.map((node, i) => (
                        <div key={node.id} style={{ display: "flex", alignItems: "center" }}>
                            <div
                                className="tooltip-container"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "14px 12px",
                                    borderRadius: 12,
                                    border: `1px solid ${node.color}30`,
                                    background: `${node.color}08`,
                                    minWidth: 88,
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                }}
                            >
                                <div style={{ fontSize: "1.8rem" }}>{node.icon}</div>
                                <div
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "0.72rem",
                                        color: node.color,
                                        fontFamily: "Space Grotesk",
                                        textAlign: "center",
                                    }}
                                >
                                    {node.title}
                                </div>
                                <span
                                    className="badge"
                                    style={{
                                        background: `${node.color}15`,
                                        color: node.color,
                                        border: `1px solid ${node.color}30`,
                                        fontSize: "0.6rem",
                                    }}
                                >
                                    {node.badge}
                                </span>
                                <div
                                    className="tooltip"
                                    style={{ width: 180, whiteSpace: "normal", textAlign: "left" }}
                                >
                                    <strong>{node.title}</strong>
                                    <br />
                                    {node.subtitle}
                                </div>
                            </div>
                            {i < nodes.length - 1 && (
                                <div
                                    style={{
                                        width: "clamp(12px, 2.5vw, 36px)",
                                        height: 2,
                                        background: "rgba(99,179,237,0.15)",
                                        position: "relative",
                                        overflow: "hidden",
                                        flexShrink: 0,
                                    }}
                                    className="pipeline-line"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Node Details Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: 24,
                    marginBottom: 60,
                }}
            >
                {nodes.map((node, i) => (
                    <div
                        key={node.id}
                        className={`glass glass-hover animate-fade-in-up delay-${Math.min((i + 1) * 100, 600)}`}
                        style={{ padding: "24px", opacity: 0, animationFillMode: "forwards" }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                marginBottom: 14,
                            }}
                        >
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 12,
                                    background: `${node.color}15`,
                                    border: `1px solid ${node.color}30`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.4rem",
                                    flexShrink: 0,
                                }}
                            >
                                {node.icon}
                            </div>
                            <div>
                                <h3
                                    style={{
                                        fontWeight: 700,
                                        fontSize: "1rem",
                                        color: node.color,
                                        fontFamily: "Space Grotesk",
                                    }}
                                >
                                    {node.title}
                                </h3>
                                <p
                                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                                >
                                    {node.subtitle}
                                </p>
                            </div>
                        </div>
                        <p
                            style={{
                                fontSize: "0.85rem",
                                color: "var(--text-secondary)",
                                lineHeight: 1.65,
                                marginBottom: 14,
                            }}
                        >
                            {node.description}
                        </p>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                            {node.details.map((d) => (
                                <li
                                    key={d}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 8,
                                        fontSize: "0.8rem",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    <span style={{ color: node.color, fontSize: "0.6rem" }}>▶</span>
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Data Flow Table */}
            <div className="glass" style={{ padding: "32px", marginBottom: 60 }}>
                <h2
                    style={{
                        fontFamily: "Space Grotesk",
                        fontWeight: 700,
                        fontSize: "1.4rem",
                        marginBottom: 24,
                    }}
                >
                    📦 Data Flow & Protocols
                </h2>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                {["From", "To", "Data Type", "Protocol"].map((h) => (
                                    <th
                                        key={h}
                                        style={{
                                            textAlign: "left",
                                            padding: "10px 16px",
                                            fontSize: "0.75rem",
                                            color: "var(--text-muted)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            borderBottom: "1px solid rgba(99,179,237,0.15)",
                                        }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataFlows.map((flow, i) => (
                                <tr
                                    key={i}
                                    className="table-row-hover"
                                    style={{
                                        borderBottom: "1px solid rgba(99,179,237,0.07)",
                                    }}
                                >
                                    <td
                                        style={{
                                            padding: "12px 16px",
                                            fontSize: "0.85rem",
                                            fontWeight: 600,
                                            color: "var(--accent-blue)",
                                        }}
                                    >
                                        {flow.from}
                                    </td>
                                    <td
                                        style={{
                                            padding: "12px 16px",
                                            fontSize: "0.85rem",
                                            fontWeight: 600,
                                            color: "var(--accent-purple)",
                                        }}
                                    >
                                        {flow.to}
                                    </td>
                                    <td
                                        style={{
                                            padding: "12px 16px",
                                            fontSize: "0.85rem",
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        {flow.label}
                                    </td>
                                    <td style={{ padding: "12px 16px" }}>
                                        <code
                                            className="mono"
                                            style={{
                                                background: "rgba(99,179,237,0.08)",
                                                padding: "3px 8px",
                                                borderRadius: 6,
                                                fontSize: "0.78rem",
                                                color: "var(--accent-cyan)",
                                            }}
                                        >
                                            {flow.protocol}
                                        </code>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Adaptive Bitrate section */}
            <div className="glass" style={{ padding: "32px" }}>
                <h2
                    style={{
                        fontFamily: "Space Grotesk",
                        fontWeight: 700,
                        fontSize: "1.4rem",
                        marginBottom: 8,
                    }}
                >
                    📊 Adaptive Bitrate (ABR) Ladder
                </h2>
                <p
                    style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.875rem",
                        marginBottom: 24,
                        lineHeight: 1.6,
                    }}
                >
                    ABR allows players to switch quality renditions seamlessly based on
                    available bandwidth, ensuring smooth playback at the highest possible
                    quality.
                </p>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                        gap: 14,
                    }}
                >
                    {[
                        { res: "4K UHD", bitrate: "15–25 Mbps", fps: "60fps", color: "#A78BFA" },
                        { res: "1080p", bitrate: "4–8 Mbps", fps: "60fps", color: "#3B82F6" },
                        { res: "720p", bitrate: "2.5–4 Mbps", fps: "30fps", color: "#06B6D4" },
                        { res: "480p", bitrate: "1–2 Mbps", fps: "30fps", color: "#10B981" },
                        { res: "360p", bitrate: "400–1 Mbps", fps: "30fps", color: "#F59E0B" },
                        { res: "240p", bitrate: "150–400 Kbps", fps: "30fps", color: "#EF4444" },
                    ].map((r) => (
                        <div
                            key={r.res}
                            style={{
                                background: `${r.color}08`,
                                border: `1px solid ${r.color}25`,
                                borderRadius: 10,
                                padding: "14px",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: 800,
                                    fontSize: "1.1rem",
                                    color: r.color,
                                    fontFamily: "Space Grotesk",
                                }}
                            >
                                {r.res}
                            </div>
                            <div
                                style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: 4 }}
                            >
                                {r.bitrate}
                            </div>
                            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 2 }}>
                                {r.fps}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
