import type { Metadata } from "next";
import BuildBadge from "./components/BuildBadge";

export const metadata: Metadata = {
  title: "Skew Demo: SSR Items + Contact",
  description: "Demonstrates Next.js skew failures on RSC and Server Actions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, -apple-system, sans-serif", margin: 0, padding: 0 }}>
        <BuildBadge />
        <main style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
