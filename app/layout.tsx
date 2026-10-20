import type { Metadata } from "next";
import "./globals.css";
import MotionShell from "./motion-shell";

export const metadata: Metadata = {
  title: "Venture Society — PVPHS",
  description:
    "Peninsula High School students testing ideas, building ventures, and learning entrepreneurship together.",
  icons: {
    icon: "/brand/venture-society-logo.webp",
    shortcut: "/brand/venture-society-logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="noise" aria-hidden="true" />
        <MotionShell>{children}</MotionShell>
      </body>
    </html>
  );
}
