"use client";

import { useState } from "react";

const protocols = [
    {
        id: "hls",
        label: "HLS",
        fullName: "HTTP Live Streaming",
        icon: "📺",
        color: "#3B82F6",
        badgeClass: "badge-blue",
        latency: "6–30 seconds",
        latencyLevel: "High",
        useCase: "VOD, Broadcast, Mass Streaming",
        developer: "Apple",
        year: 2009,
        description:
            "HLS breaks video into small HTTP-based file segments and delivers them using a standard HTTP server. Universally supported — iOS, Android, browsers, smart TVs. Ideal for large-scale VOD & live streaming but suffers from 6–30s latency in standard mode.",
        how: [
            "Encoder outputs .ts segments (2–6s each)",
            "Manifest file (.m3u8) lists segment URLs",
            "Player downloads manifest, then fetches segments sequentially",
            "ABR: player monitors bandwidth and switches rendition",
            "CDN caches segments — scales to millions of viewers",
        ],
        code: `# FFmpeg HLS output example
ffmpeg -i input.mp4 \\
  -c:v libx264 \\
  -c:a aac \\
  -start_number 0 \\
  -hls_time 4 \\
  -hls_list_size 5 \\
  -f hls output.m3u8

# HLS Manifest (.m3u8) example
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:4
#EXTINF:4.0,
segment0.ts
#EXTINF:4.0,
segment1.ts`,
        pros: ["Universal device support", "CDN-friendly HTTP delivery", "Mature & battle-tested"],
        cons: ["High latency (6–30s)", "Not suitable for real-time interaction"],
    },
    {
        id: "dash",
        label: "MPEG-DASH",
        fullName: "Dynamic Adaptive Streaming over HTTP",
        icon: "⚡",
        color: "#8B5CF6",
        badgeClass: "badge-purple",
        latency: "4–20 seconds",
        latencyLevel: "Medium-High",
        useCase: "Netflix, YouTube, Premium VOD",
        developer: "ISO / MPEG",
        year: 2012,
        description:
            "MPEG-DASH is the open-standard equivalent of HLS, using `.mpd` manifests and fMP4/WebM segments. Netflix and YouTube rely on DASH for premium VOD. Codec-agnostic — supports H.264, H.265, VP9, AV1.",
        how: [
            "Packager outputs fMP4 segments & MPD manifest",
            "MPD describes periods, adaptation sets, representations",
            "Player parses MPD and requests appropriate segments",
            "Supports timeline & timeline-less manifests",
            "DRM: CommonEncryption (CENC) with Widevine/PlayReady",
        ],
        code: `<!-- MPEG-DASH MPD manifest example -->
<MPD xmlns="urn:mpeg:dash:schema:mpd:2011"
     type="dynamic" minimumUpdatePeriod="PT5S">
  <Period>
    <AdaptationSet mimeType="video/mp4"
                   codecs="avc1.64001e">
      <Representation id="1080p" 
                      bandwidth="4000000"
                      width="1920" height="1080" />
      <Representation id="720p"
                      bandwidth="2000000"
                      width="1280" height="720" />
    </AdaptationSet>
  </Period>
</MPD>`,
        pros: ["Codec-agnostic (AV1, VP9, H.265)", "Open standard", "Superior DRM support (CENC)"],
        cons: ["No native Safari support", "Complex manifest format"],
    },
    {
        id: "webrtc",
        label: "WebRTC",
        fullName: "Web Real-Time Communication",
        icon: "🔴",
        color: "#EF4444",
        badgeClass: "badge-red",
        latency: "< 500ms",
        latencyLevel: "Ultra-Low",
        useCase: "Video Calls, Live Auctions, Gaming",
        developer: "Google / W3C",
        year: 2011,
        description:
            "WebRTC enables sub-second, peer-to-peer audio/video communication directly in browsers. Built on top of DTLS, SRTP, and ICE. Powers Google Meet, Discord, and live interactive applications.",
        how: [
            "Signaling server exchanges SDP offer/answer",
            "ICE (STUN/TURN) handles NAT traversal",
            "DTLS-SRTP: encrypted media transport",
            "RTP packets carry audio/video in real-time",
            "SCTP DataChannel for arbitrary data",
        ],
        code: `// WebRTC Peer Connection (browser)
const pc = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

// Add local stream
const stream = await navigator.mediaDevices.getUserMedia(
  { video: true, audio: true }
);
stream.getTracks().forEach(track => pc.addTrack(track, stream));

// Create offer and start signaling
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);
// Send offer to remote via WebSocket signaling server`,
        pros: ["Sub-500ms latency", "P2P — no server needed for 1:1", "Built into all browsers"],
        cons: ["Scales poorly beyond ~1000 viewers", "Complex NAT traversal"],
    },
    {
        id: "websocket",
        label: "WebSockets",
        fullName: "WebSocket Protocol (RFC 6455)",
        icon: "🔌",
        color: "#10B981",
        badgeClass: "badge-green",
        latency: "< 100ms",
        latencyLevel: "Real-Time",
        useCase: "Chat, Live Stats, Real-Time Events",
        developer: "IETF",
        year: 2011,
        description:
            "WebSockets provide full-duplex communication over a single TCP connection. Not used for video transport, but critical for real-time metadata — chat messages, viewer counts, live reactions, stream health events.",
        how: [
            "HTTP Upgrade handshake establishes WS connection",
            "Full-duplex: server pushes events instantly",
            "Framed messages: text or binary payloads",
            "Heartbeat ping/pong for connection health",
            "Socket.io & ws are common Node.js libraries",
        ],
        code: `// Server-side WebSocket (Node.js + ws)
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  // Send live viewer count every second
  const interval = setInterval(() => {
    ws.send(JSON.stringify({
      type: 'viewer_count',
      count: getViewerCount(),
      timestamp: Date.now()
    }));
  }, 1000);

  ws.on('message', (msg) => {
    const { type, data } = JSON.parse(msg.toString());
    if (type === 'chat') broadcastChat(data);
  });

  ws.on('close', () => clearInterval(interval));
});`,
        pros: ["< 100ms round-trip", "Full-duplex bidirectional", "Lightweight framing overhead"],
        cons: ["Not for video transport", "Requires persistent connections at scale"],
    },
    {
        id: "srt",
        label: "SRT",
        fullName: "Secure Reliable Transport",
        icon: "🔐",
        color: "#F59E0B",
        badgeClass: "badge-orange",
        latency: "120ms–1s",
        latencyLevel: "Low",
        useCase: "Contribution feeds, Remote production",
        developer: "Haivision (open-sourced)",
        year: 2017,
        description:
            "SRT is an open-source transport protocol built for reliable streaming over unpredictable public internet. Adds ARQ (Automatic Repeat reQuest) retransmission and AES-256 encryption on top of UDP.",
        how: [
            "UDP-based with ARQ retransmission",
            "Latency configured to absorb jitter & loss",
            "AES-128/256 encryption built-in",
            "Caller / Listener / Rendezvous connection modes",
            "Widely supported: OBS, FFmpeg, vMix, Wowza",
        ],
        code: `# SRT with FFmpeg (listener mode)
ffmpeg -i srt://0.0.0.0:9000?mode=listener \\
  -c:v copy -c:a copy \\
  -f flv rtmp://localhost/live/stream

# SRT caller (broadcasting side)
ffmpeg -re -i input.mp4 \\
  -c:v libx264 -b:v 4M \\
  -c:a aac -b:a 128k \\
  -f mpegts \\
  "srt://media-server.com:9000?mode=caller&latency=200"`,
        pros: ["Reliable over lossy networks", "Built-in AES encryption", "ARQ retransmission"],
        cons: ["Less widely supported than RTMP", "Requires firewall config for UDP"],
    },
];

const comparisonData = [
    { metric: "Protocol", hls: "HTTP/HTTPS", dash: "HTTP/HTTPS", webrtc: "DTLS-SRTP / RTP", srt: "UDP+ARQ" },
    { metric: "Latency", hls: "6–30s", dash: "4–20s", webrtc: "<500ms", srt: "120ms–1s" },
    { metric: "Scalability", hls: "★★★★★", dash: "★★★★★", webrtc: "★★☆☆☆", srt: "★★★☆☆" },
    { metric: "Device Support", hls: "Universal", dash: "Wide (no Safari)", webrtc: "All browsers", srt: "Broadcast tools" },
    { metric: "DRM Support", hls: "FairPlay", dash: "Widevine/PlayReady", webrtc: "None", srt: "N/A" },
    { metric: "CDN Friendly", hls: "✅ Yes", dash: "✅ Yes", webrtc: "❌ No", srt: "❌ No" },
];

export default function ProtocolsPage() {
    const [active, setActive] = useState("hls");
    const current = protocols.find((p) => p.id === active)!;

    return (
        <div style={{ padding: "60px 24px 80px", maxWidth: 1200, margin: "0 auto" }}>
            {/* Header */}
            <div className="animate-fade-in-up" style={{ textAlign: "center", marginBottom: 52 }}>
                <span className="badge badge-cyan" style={{ marginBottom: 16, display: "inline-flex" }}>
                    📡 Protocols Deep Dive
                </span>
                <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 14 }}>
                    Streaming <span className="gradient-text-cyan">Protocols</span> Explained
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                    HLS, MPEG-DASH, WebRTC, WebSockets, SRT — understand latency, use-cases, and when to use each.
                </p>
            </div>

            {/* Tab Selector */}
            <div
                className="glass"
                style={{ padding: "8px", display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 32, justifyContent: "center" }}
            >
                {protocols.map((p) => (
                    <button
                        key={p.id}
                        className={`tab-btn ${active === p.id ? "active" : ""}`}
                        onClick={() => setActive(p.id)}
                    >
                        {p.icon} {p.label}
                    </button>
                ))}
            </div>

            {/* Protocol Detail */}
            <div key={current.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
                {/* Left: info */}
                <div className="glass animate-fade-in-left" style={{ padding: "28px", opacity: 0, animationFillMode: "forwards" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <span style={{ fontSize: "2.5rem" }}>{current.icon}</span>
                        <div>
                            <h2 style={{ fontFamily: "Space Grotesk", fontWeight: 800, fontSize: "1.4rem", color: current.color }}>
                                {current.label}
                            </h2>
                            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{current.fullName}</p>
                        </div>
                    </div>

                    <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 20 }}>
                        {current.description}
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                        {[
                            { label: "Latency", value: current.latency },
                            { label: "Use Case", value: current.useCase },
                            { label: "Origin", value: `${current.developer} (${current.year})` },
                            { label: "Latency Level", value: current.latencyLevel },
                        ].map((item) => (
                            <div key={item.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 12px" }}>
                                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{item.label}</div>
                                <div style={{ fontSize: "0.84rem", fontWeight: 600, color: current.color }}>{item.value}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>✅ Pros</div>
                        {current.pros.map((p) => (
                            <div key={p} style={{ display: "flex", gap: 8, fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 4 }}>
                                <span style={{ color: "#10B981" }}>+</span> {p}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>⚠️ Cons</div>
                        {current.cons.map((c) => (
                            <div key={c} style={{ display: "flex", gap: 8, fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: 4 }}>
                                <span style={{ color: "#EF4444" }}>−</span> {c}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: how it works + code */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div className="glass animate-fade-in-right" style={{ padding: "24px", opacity: 0, animationFillMode: "forwards" }}>
                        <h3 style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "1rem", marginBottom: 14, color: current.color }}>
                            ⚙️ How It Works
                        </h3>
                        <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                            {current.how.map((step, i) => (
                                <li key={i} style={{ fontSize: "0.84rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="glass animate-fade-in-right delay-200" style={{ padding: "24px", opacity: 0, animationFillMode: "forwards" }}>
                        <h3 style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "1rem", marginBottom: 14, color: current.color }}>
                            💻 Code Example
                        </h3>
                        <div className="code-block" data-lang={current.id === "webrtc" || current.id === "websocket" ? "typescript" : current.id === "dash" ? "xml" : "bash"}>
                            <pre style={{ color: "#a5f3fc", fontSize: "0.78rem", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                <code>{current.code}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="glass" style={{ padding: "32px" }}>
                <h2 style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "1.3rem", marginBottom: 24 }}>
                    📊 Protocol Comparison
                </h2>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                {["Metric", "HLS", "MPEG-DASH", "WebRTC", "SRT"].map((h) => (
                                    <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid rgba(99,179,237,0.15)", fontFamily: "Space Grotesk" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row) => (
                                <tr key={row.metric} style={{ borderBottom: "1px solid rgba(99,179,237,0.07)" }}>
                                    <td style={{ padding: "11px 14px", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}>{row.metric}</td>
                                    <td style={{ padding: "11px 14px", fontSize: "0.82rem", color: active === "hls" ? "#3B82F6" : "var(--text-secondary)" }}>{row.hls}</td>
                                    <td style={{ padding: "11px 14px", fontSize: "0.82rem", color: active === "dash" ? "#8B5CF6" : "var(--text-secondary)" }}>{row.dash}</td>
                                    <td style={{ padding: "11px 14px", fontSize: "0.82rem", color: active === "webrtc" ? "#EF4444" : "var(--text-secondary)" }}>{row.webrtc}</td>
                                    <td style={{ padding: "11px 14px", fontSize: "0.82rem", color: active === "srt" ? "#F59E0B" : "var(--text-secondary)" }}>{row.srt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
