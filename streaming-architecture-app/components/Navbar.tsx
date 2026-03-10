"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/architecture", label: "Architecture" },
    { href: "/protocols", label: "Protocols" },
    { href: "/tools", label: "Tools & Tech" },
    { href: "/nextjs-practices", label: "Next.js Practices" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav
            style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                background: "rgba(5, 10, 20, 0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(99,179,237,0.12)",
            }}
        >
            <div
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                    padding: "0 24px",
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Link href="/" style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: 10,
                                background: "var(--gradient-primary)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1rem",
                                boxShadow: "0 0 15px rgba(59,130,246,0.4)",
                            }}
                        >
                            📡
                        </div>
                        <span
                            style={{
                                fontFamily: "Space Grotesk, sans-serif",
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                background: "var(--gradient-primary)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            StreamArch
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 32,
                    }}
                    className="hidden-mobile"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${pathname === link.href ? "active" : ""}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <Link href="/architecture" style={{ textDecoration: "none" }}>
                    <button
                        className="btn-glow"
                        style={{ padding: "8px 20px", fontSize: "0.82rem" }}
                    >
                        Explore Architecture →
                    </button>
                </Link>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
        </nav>
    );
}
