import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "生痕 · 你的人生传记",
  description: "把散落的记忆，变成一部属于你的传记",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="min-h-screen" style={{ background: 'var(--bg)' }}>
        {children}
      </body>
    </html>
  );
}
