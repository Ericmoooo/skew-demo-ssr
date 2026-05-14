import Link from "next/link";

const BUILD_LABEL = process.env.NEXT_PUBLIC_BUILD_LABEL ?? "dev";

const BUILD_FINGERPRINT = `ssr-items-build-${BUILD_LABEL}-2026`;

export default function BuildBadge() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: BUILD_LABEL === "A" ? "#1f6feb" : BUILD_LABEL === "B" ? "#bf3989" : "#666",
        color: "white",
        padding: "0.75rem 1.5rem",
        display: "flex",
        gap: "1.5rem",
        alignItems: "center",
        fontSize: 14,
      }}
    >
      <strong>Build: {BUILD_LABEL}</strong>
      <span style={{ opacity: 0.7, fontSize: 12 }}>{BUILD_FINGERPRINT}</span>
      <nav style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
        <Link href="/" style={{ color: "white" }}>Items</Link>
        <Link href="/contact" style={{ color: "white" }}>Contact</Link>
      </nav>
    </header>
  );
}
