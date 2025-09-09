import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CartRoyal Admin",
  description: "Africa Global E-Commerce. Shopping like a King",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
