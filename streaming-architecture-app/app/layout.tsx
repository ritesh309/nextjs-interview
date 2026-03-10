import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "StreamArch — Real-Time Video Streaming Architecture",
  description:
    "Explore the complete architecture of real-time streaming video platforms — protocols, tools, technologies, and Next.js best practices.",
  keywords: [
    "streaming architecture",
    "HLS",
    "WebRTC",
    "CDN",
    "video streaming",
    "real-time",
    "Next.js",
  ],
  openGraph: {
    title: "StreamArch — Real-Time Video Streaming Architecture",
    description:
      "Explore the complete architecture of real-time streaming video platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <footer
          style={{
            background: "rgba(5,10,20,0.9)",
            borderTop: "1px solid rgba(99,179,237,0.1)",
            padding: "40px 20px",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            marginTop: "80px",
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                fontSize: "1.2rem",
                marginBottom: 8,
                fontFamily: "Space Grotesk, sans-serif",
              }}
            >
              StreamArch
            </p>
            <p>
              Built with Next.js 15 · App Router · TypeScript · Tailwind CSS
            </p>
            <p style={{ marginTop: 6 }}>
              © 2026 StreamArch — Real-Time Streaming Architecture Explorer
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
