import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Next.js Best Practices | StreamArch",
    description:
        "Next.js 14+ App Router best practices applied in production: Server Components, Suspense, Edge Runtime, Metadata API, Image Optimization, and more.",
};

const practices = [
    {
        id: "server-components",
        icon: "⚛️",
        title: "React Server Components",
        badge: "App Router",
        badgeClass: "badge-blue",
        color: "#3B82F6",
        summary:
            "Server Components render on the server — zero JavaScript bundle cost for the client. Use them for data-heavy UI, reducing client-side hydration.",
        example: `// app/streams/page.tsx — Server Component (default)
// No 'use client' directive needed
import { getStreams } from '@/lib/api'; // Direct DB/API call

export default async function StreamsPage() {
  // Runs on the server — no API round-trip from client!
  const streams = await getStreams();

  return (
    <div>
      {streams.map(stream => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  );
}

// Only interactive parts need 'use client'
// "use client";
// export function LikeButton() { ... }`,
        keyPoints: [
            "No JavaScript sent to browser for static UI",
            "Direct database access without API layer",
            "Data fetched at render time — always fresh",
            "Compose with Client Components for interactivity",
        ],
    },
    {
        id: "streaming-suspense",
        icon: "🌊",
        title: "Streaming with Suspense",
        badge: "Performance",
        badgeClass: "badge-cyan",
        color: "#06B6D4",
        summary:
            "Use React Suspense to progressively stream HTML from server to client. Slow data doesn't block the whole page — content appears as it's ready.",
        example: `// app/dashboard/page.tsx
import { Suspense } from 'react';
import { StreamStats, SkeletonStats } from '@/components';

export default function Dashboard() {
  return (
    <div>
      <h1>Stream Dashboard</h1>
      
      {/* Instantly visible */}
      <HeroSection />
      
      {/* Streams while data loads — shows skeleton */}
      <Suspense fallback={<SkeletonStats />}>
        {/* This async component streams in when ready */}
        <StreamStats />
      </Suspense>
      
      {/* Independent — doesn't wait for StreamStats */}
      <Suspense fallback={<SkeletonChart />}>
        <ViewerChart />
      </Suspense>
    </div>
  );
}`,
        keyPoints: [
            "Page HTML starts streaming immediately (TTFB improvement)",
            "Each Suspense boundary streams independently",
            "Skeleton/loading states shown during fetch",
            "No client-side loading spinners needed for initial data",
        ],
    },
    {
        id: "metadata-api",
        icon: "🏷️",
        title: "Metadata API & SEO",
        badge: "SEO",
        badgeClass: "badge-green",
        color: "#10B981",
        summary:
            "Next.js 14's Metadata API generates SEO tags at the route level — static exports or dynamic generation based on data.",
        example: `// app/streams/[id]/page.tsx
import type { Metadata } from 'next';

// Dynamic metadata from route params
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const stream = await getStream(params.id);
  
  return {
    title: \`\${stream.title} | StreamArch Live\`,
    description: stream.description,
    openGraph: {
      title: stream.title,
      images: [{ url: stream.thumbnail }],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title: stream.title,
    },
  };
}`,
        keyPoints: [
            "Static metadata exported as a const",
            "Dynamic metadata with generateMetadata()",
            "Open Graph, Twitter Card, robots auto-generated",
            "Nested layouts merge metadata automatically",
        ],
    },
    {
        id: "route-handlers",
        icon: "🛣️",
        title: "Route Handlers (API Routes)",
        badge: "API",
        badgeClass: "badge-purple",
        color: "#8B5CF6",
        summary:
            "Route Handlers in app/api use Web Request/Response APIs. Support GET, POST, PUT, DELETE with proper HTTP semantics and streaming responses.",
        example: `// app/api/stream/[id]/metrics/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Run on Edge Network

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const since = searchParams.get('since') ?? '1h';

  const metrics = await fetchStreamMetrics(params.id, since);

  return NextResponse.json(metrics, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10',
    },
  });
}

// Streaming response for real-time events
export async function GET_stream(req: NextRequest) {
  const stream = new ReadableStream({ /* push live events */ });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}`,
        keyPoints: [
            "Full Web Fetch API standards (Request/Response)",
            "Edge runtime for global low-latency API routes",
            "Streaming responses with ReadableStream",
            "Proper HTTP caching with Cache-Control headers",
        ],
    },
    {
        id: "image-optimization",
        icon: "🖼️",
        title: "Image Optimization",
        badge: "Performance",
        badgeClass: "badge-orange",
        color: "#F59E0B",
        summary:
            "next/image automatically resizes, optimizes to WebP/AVIF, lazy-loads, and serves via CDN. Critical for stream thumbnails at scale.",
        example: `// components/StreamThumbnail.tsx
import Image from 'next/image';

export function StreamThumbnail({ stream }: { stream: Stream }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '16/9' }}>
      <Image
        src={stream.thumbnailUrl}
        alt={stream.title}
        fill                      // Fills container
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={stream.featured} // LCP optimization
        quality={85}
        placeholder="blur"
        blurDataURL={stream.blurHash}
        style={{ objectFit: 'cover', borderRadius: 12 }}
      />
      {stream.isLive && (
        <span className="live-badge">🔴 LIVE</span>
      )}
    </div>
  );
}

// next.config.ts — whitelist image domains
// images: { remotePatterns: [{ hostname: '*.cloudfront.net' }] }`,
        keyPoints: [
            "Auto-converts to WebP/AVIF (30–50% smaller)",
            "Responsive sizes via the sizes prop",
            "Lazy loading with blur placeholder",
            "priority prop for above-the-fold LCP images",
        ],
    },
    {
        id: "edge-runtime",
        icon: "🌐",
        title: "Edge Runtime & Middleware",
        badge: "Edge",
        badgeClass: "badge-red",
        color: "#EF4444",
        summary:
            "Run logic at the CDN edge — zero cold starts, globally distributed. Middleware for auth, geo-routing, A/B testing before the page is served.",
        example: `// middleware.ts (runs on Vercel Edge Network)
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export const config = {
  matcher: ['/dashboard/:path*', '/api/stream/:path*'],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Add user info to headers for Server Components
  const res = NextResponse.next();
  res.headers.set('x-user-id', payload.sub);
  return res;
}`,
        keyPoints: [
            "Runs at the CDN edge — sub-millisecond latency",
            "No cold starts (V8 isolates, not containers)",
            "Auth checks before page reaches server",
            "Geo-based routing & feature flags possible",
        ],
    },
    {
        id: "caching",
        icon: "⚡",
        title: "Caching Strategies",
        badge: "Performance",
        badgeClass: "badge-blue",
        color: "#3B82F6",
        summary:
            "Next.js has multiple caching layers: Request Memoization, Data Cache, Full Route Cache, Router Cache. Understand each to avoid stale data bugs.",
        example: `// Revalidation strategies in RSC data fetching

// 1. Cached forever (build time) — for static content
const protocols = await fetch('/api/protocols', {
  cache: 'force-cache',
});

// 2. Revalidate every 60s (ISR) — for semi-static data
const streams = await fetch('/api/streams', {
  next: { revalidate: 60 },
});

// 3. Never cache — for real-time live data
const viewerCount = await fetch('/api/viewers', {
  cache: 'no-store',
});

// 4. Tag-based revalidation — precise invalidation
const stream = await fetch(\`/api/stream/\${id}\`, {
  next: { tags: [\`stream-\${id}\`] },
});
// Invalidate from Server Action:
// revalidateTag(\`stream-\${id}\`);`,
        keyPoints: [
            "force-cache for static/build-time data",
            "next.revalidate for ISR (time-based)",
            "no-store for always-fresh live data",
            "Tag-based revalidation for on-demand purge",
        ],
    },
    {
        id: "server-actions",
        icon: "🔄",
        title: "Server Actions",
        badge: "App Router",
        badgeClass: "badge-cyan",
        color: "#06B6D4",
        summary:
            "Server Actions allow calling server-side functions directly from client components — no manual API routes needed for mutations.",
        example: `// app/streams/actions.ts
'use server';

import { revalidateTag } from 'next/cache';
import { db } from '@/lib/db';

export async function startStream(streamId: string) {
  // Runs on the server — has direct DB access
  await db.stream.update({
    where: { id: streamId },
    data: { status: 'live', startedAt: new Date() },
  });

  // Purge cached data for this stream
  revalidateTag(\`stream-\${streamId}\`);
}

// components/StreamControls.tsx (client component)
'use client';
import { startStream } from '@/app/streams/actions';

export function StartButton({ streamId }: { streamId: string }) {
  return (
    <button onClick={() => startStream(streamId)}>
      🔴 Go Live
    </button>
  );
}`,
        keyPoints: [
            "No manual fetch() or API route boilerplate",
            "Type-safe end-to-end (TypeScript)",
            "Automatic CSRF protection",
            "Works with forms via action prop",
        ],
    },
];

function LoadingPractices() {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 24,
            }}
        >
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="glass"
                    style={{
                        padding: 28,
                        height: 300,
                        background:
                            "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                    }}
                />
            ))}
        </div>
    );
}

function PracticesGrid() {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 24,
            }}
        >
            {practices.map((p, i) => (
                <div
                    key={p.id}
                    className={`glass glass-hover animate-fade-in-up delay-${Math.min((i + 1) * 100, 600)}`}
                    style={{ padding: "26px", opacity: 0, animationFillMode: "forwards" }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            marginBottom: 14,
                        }}
                    >
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 12,
                                background: `${p.color}15`,
                                border: `1px solid ${p.color}30`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.4rem",
                                flexShrink: 0,
                            }}
                        >
                            {p.icon}
                        </div>
                        <div>
                            <h3
                                style={{
                                    fontFamily: "Space Grotesk",
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    color: p.color,
                                    marginBottom: 4,
                                }}
                            >
                                {p.title}
                            </h3>
                            <span className={`badge ${p.badgeClass}`}>{p.badge}</span>
                        </div>
                    </div>

                    <p
                        style={{
                            fontSize: "0.84rem",
                            color: "var(--text-secondary)",
                            lineHeight: 1.65,
                            marginBottom: 14,
                        }}
                    >
                        {p.summary}
                    </p>

                    {/* Key Points */}
                    <ul
                        style={{
                            listStyle: "none",
                            display: "flex",
                            flexDirection: "column",
                            gap: 5,
                            marginBottom: 16,
                        }}
                    >
                        {p.keyPoints.map((point) => (
                            <li
                                key={point}
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 8,
                                    fontSize: "0.8rem",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <span style={{ color: p.color, marginTop: 2, flexShrink: 0 }}>▶</span>
                                {point}
                            </li>
                        ))}
                    </ul>

                    {/* Code */}
                    <div
                        className="code-block"
                        data-lang="typescript"
                        style={{ maxHeight: 220, overflowY: "auto" }}
                    >
                        <pre
                            style={{
                                color: "#a5f3fc",
                                fontSize: "0.72rem",
                                lineHeight: 1.65,
                                whiteSpace: "pre",
                            }}
                        >
                            <code>{p.example}</code>
                        </pre>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function NextJSPracticesPage() {
    return (
        <div style={{ padding: "60px 24px 80px", maxWidth: 1280, margin: "0 auto" }}>
            {/* Header */}
            <div
                className="animate-fade-in-up"
                style={{ textAlign: "center", marginBottom: 52 }}
            >
                <span
                    className="badge badge-green"
                    style={{ marginBottom: 16, display: "inline-flex" }}
                >
                    ⚡ Next.js 15 Best Practices
                </span>
                <h1
                    style={{
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        marginBottom: 14,
                    }}
                >
                    Industry-Grade{" "}
                    <span className="gradient-text-green">Next.js Patterns</span>
                </h1>
                <p
                    style={{
                        color: "var(--text-secondary)",
                        fontSize: "1rem",
                        maxWidth: 600,
                        margin: "0 auto",
                        lineHeight: 1.7,
                    }}
                >
                    App Router, Server Components, Suspense streaming, Edge Runtime,
                    Metadata API — the patterns used in production streaming platforms
                    at scale.
                </p>
            </div>

            {/* Practices Grid — Suspense wrapped to demonstrate streaming */}
            <Suspense fallback={<LoadingPractices />}>
                <PracticesGrid />
            </Suspense>

            {/* Bottom callout */}
            <div
                className="glass"
                style={{
                    padding: "36px",
                    marginTop: 52,
                    textAlign: "center",
                    background:
                        "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))",
                    borderColor: "rgba(99,179,237,0.3)",
                }}
            >
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>🚀</div>
                <h2
                    style={{
                        fontFamily: "Space Grotesk",
                        fontWeight: 700,
                        fontSize: "1.4rem",
                        marginBottom: 10,
                    }}
                >
                    This App Demonstrates All These Patterns
                </h2>
                <p
                    style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.9rem",
                        maxWidth: 520,
                        margin: "0 auto 20px",
                        lineHeight: 1.7,
                    }}
                >
                    StreamArch itself was built with App Router, Server Components, Suspense
                    boundaries, the Metadata API, and proper TypeScript — serving as a live
                    reference implementation.
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: 10,
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {["App Router", "TypeScript", "Server Components", "Metadata API", "Suspense", "Edge-ready"].map(
                        (tag) => (
                            <span key={tag} className="badge badge-blue">
                                {tag}
                            </span>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
