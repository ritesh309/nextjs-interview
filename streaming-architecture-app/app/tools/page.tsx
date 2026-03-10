import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tools & Technologies | StreamArch",
    description:
        "The full technology stack for real-time video streaming — encoders, servers, CDN, databases, message queues, and monitoring tools.",
};

const categories = [
    {
        id: "capture-encode",
        label: "Capture & Encoding",
        icon: "🎥",
        color: "#3B82F6",
        tools: [
            {
                name: "FFmpeg",
                icon: "⚙️",
                desc: "The Swiss-army knife of multimedia. Encode, transcode, mux, stream — handles virtually any format.",
                tags: ["Open Source", "CLI", "Encoding"],
                badge: "badge-blue",
                details: "H.264/H.265/AV1 encoding, HLS segmentation, real-time transcoding pipelines",
            },
            {
                name: "OBS Studio",
                icon: "🎬",
                desc: "Free and open-source screen recorder and live streaming software used by millions of streamers.",
                tags: ["Open Source", "Desktop", "Broadcast"],
                badge: "badge-blue",
                details: "Scene management, plugin ecosystem, RTMP/SRT/WebRTC output",
            },
            {
                name: "x264 / x265",
                icon: "🔧",
                desc: "Industry-standard H.264 and H.265 video encoders. Used inside FFmpeg and hardware encoders.",
                tags: ["Codec", "Open Source"],
                badge: "badge-blue",
                details: "CRF mode, 2-pass encoding, preset tuning (ultrafast to veryslow)",
            },
            {
                name: "AV1 (libaom / SVT-AV1)",
                icon: "🌟",
                desc: "Next-gen royalty-free codec by Alliance for Open Media. 30–50% better compression than H.265.",
                tags: ["Codec", "Next-Gen"],
                badge: "badge-blue",
                details: "Used by YouTube, Netflix for storage efficiency at scale",
            },
        ],
    },
    {
        id: "ingest",
        label: "Ingest & Media Servers",
        icon: "📥",
        color: "#8B5CF6",
        tools: [
            {
                name: "Nginx RTMP Module",
                icon: "🌐",
                desc: "Extends Nginx web server with RTMP streaming capabilities. Powers many self-hosted streaming setups.",
                tags: ["Open Source", "RTMP", "Server"],
                badge: "badge-purple",
                details: "HLS/DASH output, stream authentication, on-publish hooks",
            },
            {
                name: "Wowza Streaming Engine",
                icon: "💪",
                desc: "Enterprise-grade media server supporting RTMP, HLS, DASH, WebRTC ingestion and delivery.",
                tags: ["Enterprise", "Multi-Protocol"],
                badge: "badge-purple",
                details: "RESTful API, dynamic transcoding, DRM integration",
            },
            {
                name: "SRS (Simple Realtime Server)",
                icon: "⚡",
                desc: "High-performance RTMP/WebRTC media server in C++. Handles thousands of concurrent streams.",
                tags: ["Open Source", "High Performance"],
                badge: "badge-purple",
                details: "WebRTC, HLS output, Prometheus metrics, edge-origin architecture",
            },
            {
                name: "mediasoup",
                icon: "🔴",
                desc: "WebRTC SFU (Selective Forwarding Unit) for Node.js. Powers conferencing and fan-out streaming.",
                tags: ["WebRTC", "SFU", "Node.js"],
                badge: "badge-purple",
                details: "Simulcast, SVC, SRTP forwarding, no transcoding overhead",
            },
        ],
    },
    {
        id: "cloud",
        label: "Cloud Transcoding",
        icon: "☁️",
        color: "#06B6D4",
        tools: [
            {
                name: "AWS MediaLive",
                icon: "🟠",
                desc: "Managed live video encoding service. Handles input failover, multi-bitrate output, captions.",
                tags: ["AWS", "Managed", "Enterprise"],
                badge: "badge-cyan",
                details: "H.264/H.265, HLS/DASH/UDP output, SCTE-35 ad insertion",
            },
            {
                name: "AWS MediaPackage",
                icon: "📦",
                desc: "Packaging & origination service. Converts encoded stream to HLS/DASH and delivers to CDN.",
                tags: ["AWS", "Packaging"],
                badge: "badge-cyan",
                details: "Just-in-time packaging, DRM (Widevine/FairPlay), time-shift DVR",
            },
            {
                name: "Cloudflare Stream",
                icon: "🌩️",
                desc: "End-to-end video API: upload, encode, deliver with Cloudflare's global edge network.",
                tags: ["Cloudflare", "API", "Managed"],
                badge: "badge-cyan",
                details: "AES-128 HLS keys, per-video analytics, signed URLs",
            },
            {
                name: "Mux",
                icon: "🎯",
                desc: "Developer-friendly video infrastructure API: ingest, encode, stream, and monitor with great DX.",
                tags: ["API", "Developer-First"],
                badge: "badge-cyan",
                details: "Mux Data analytics, real-time metrics, webhooks on stream events",
            },
        ],
    },
    {
        id: "cdn",
        label: "CDN & Edge Delivery",
        icon: "🌐",
        color: "#10B981",
        tools: [
            {
                name: "Cloudflare CDN",
                icon: "🌩️",
                desc: "250+ PoPs globally, HTTP/3 support, automatic caching, DDoS protection for streaming.",
                tags: ["CDN", "Global", "HTTP/3"],
                badge: "badge-green",
                details: "Cache rules for HLS segments, Workers for edge logic, Argo smart routing",
            },
            {
                name: "AWS CloudFront",
                icon: "🟠",
                desc: "Amazon's CDN deeply integrated with MediaPackage, S3, MediaLive for end-to-end AWS streaming.",
                tags: ["AWS", "CDN", "Enterprise"],
                badge: "badge-green",
                details: "Signed URLs/Cookies, Lambda@Edge, Field-Level Encryption",
            },
            {
                name: "Akamai CDN",
                icon: "🔵",
                desc: "One of the world's largest CDNs. Powers NFL, Olympics, major broadcast events at scale.",
                tags: ["Enterprise", "CDN", "Broadcast"],
                badge: "badge-green",
                details: "Adaptive Media Delivery (AMD), NetStorage, Edge Auth tokens",
            },
            {
                name: "Fastly",
                icon: "⚡",
                desc: "Edge cloud platform with real-time cache purge (<150ms), VCL/Compute@Edge programmability.",
                tags: ["CDN", "Edge Compute"],
                badge: "badge-green",
                details: "Instant purge for live streams, WebAssembly at edge, real-time logging",
            },
        ],
    },
    {
        id: "realtime",
        label: "Real-Time & Messaging",
        icon: "⚡",
        color: "#F59E0B",
        tools: [
            {
                name: "Apache Kafka",
                icon: "📨",
                desc: "Distributed event streaming platform. Handles millions of events/sec — stream events, analytics, chat.",
                tags: ["Open Source", "Event Streaming"],
                badge: "badge-orange",
                details: "Topic partitioning, consumer groups, 7-day message retention, Kafka Streams",
            },
            {
                name: "Redis Pub/Sub",
                icon: "🔴",
                desc: "In-memory data store used for session management, leaderboards, WebSocket pub/sub fan-out.",
                tags: ["In-Memory", "Cache", "Pub/Sub"],
                badge: "badge-orange",
                details: "Redis Streams for event sourcing, Cluster for scale, TTL-based caching",
            },
            {
                name: "Socket.io",
                icon: "🔌",
                desc: "Full-featured WebSocket library for Node.js with rooms, namespaces, and auto-reconnect.",
                tags: ["Node.js", "WebSocket"],
                badge: "badge-orange",
                details: "Redis adapter for horizontal scaling, binary events, acknowledgements",
            },
            {
                name: "Ably",
                icon: "📡",
                desc: "Managed realtime messaging platform. Chat, presence, live updates — with 4-zone redundancy.",
                tags: ["Managed", "Realtime"],
                badge: "badge-orange",
                details: "99.999% SLA, MQTT support, SDKs for 15+ platforms",
            },
        ],
    },
    {
        id: "monitoring",
        label: "Monitoring & Observability",
        icon: "📊",
        color: "#EF4444",
        tools: [
            {
                name: "Prometheus + Grafana",
                icon: "📈",
                desc: "Industry-standard metrics collection (Prometheus) and visualization (Grafana) stack.",
                tags: ["Open Source", "Metrics", "Dashboards"],
                badge: "badge-red",
                details: "Stream health metrics, alert rules, provisioned dashboards",
            },
            {
                name: "Mux Data",
                icon: "🎯",
                desc: "Video QoE analytics. Tracks buffering ratio, startup time, bitrate shifts, error rates.",
                tags: ["Analytics", "Video QoE"],
                badge: "badge-red",
                details: "Rebuffering ratio, TTFF, video startup failures, dimension breakdown",
            },
            {
                name: "OpenTelemetry",
                icon: "🔭",
                desc: "Vendor-neutral observability framework — traces, metrics, and logs for the entire pipeline.",
                tags: ["Open Source", "Tracing", "Logs"],
                badge: "badge-red",
                details: "Distributed tracing across encoder → CDN → player with Jaeger/Zipkin",
            },
            {
                name: "Datadog",
                icon: "🐕",
                desc: "Full-stack monitoring platform. APM, infrastructure metrics, log management in one pane.",
                tags: ["APM", "Enterprise", "Logs"],
                badge: "badge-red",
                details: "RUM (Real User Monitoring), synthetic monitors, anomaly detection",
            },
        ],
    },
];

export default function ToolsPage() {
    return (
        <div style={{ padding: "60px 24px 80px", maxWidth: 1280, margin: "0 auto" }}>
            {/* Header */}
            <div className="animate-fade-in-up" style={{ textAlign: "center", marginBottom: 60 }}>
                <span className="badge badge-purple" style={{ marginBottom: 16, display: "inline-flex" }}>
                    🛠️ Tools & Technologies
                </span>
                <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 14 }}>
                    The Complete{" "}
                    <span style={{ background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Streaming Stack
                    </span>
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                    The tools and technologies used at every layer of a production-grade streaming platform — from encoder to viewer.
                </p>
            </div>

            {/* Category Sections */}
            {categories.map((cat, ci) => (
                <section key={cat.id} style={{ marginBottom: 60 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                background: `${cat.color}15`,
                                border: `1px solid ${cat.color}30`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.2rem",
                            }}
                        >
                            {cat.icon}
                        </div>
                        <div>
                            <h2 style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "1.2rem", color: cat.color }}>
                                {cat.label}
                            </h2>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 18 }}>
                        {cat.tools.map((tool, ti) => (
                            <div
                                key={tool.name}
                                className={`glass glass-hover animate-fade-in-up delay-${Math.min((ti + 1) * 100, 400)}`}
                                style={{ padding: "22px", opacity: 0, animationFillMode: "forwards" }}
                            >
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 10,
                                            background: `${cat.color}12`,
                                            border: `1px solid ${cat.color}25`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.3rem",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {tool.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "0.98rem", color: cat.color, marginBottom: 2 }}>
                                            {tool.name}
                                        </h3>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                            {tool.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`badge ${tool.badge}`}
                                                    style={{ fontSize: "0.6rem", padding: "2px 7px" }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
                                    {tool.desc}
                                </p>
                                <div
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        borderRadius: 8,
                                        padding: "8px 10px",
                                        fontSize: "0.75rem",
                                        color: "var(--text-muted)",
                                        lineHeight: 1.5,
                                        borderLeft: `3px solid ${cat.color}40`,
                                    }}
                                >
                                    {tool.details}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
