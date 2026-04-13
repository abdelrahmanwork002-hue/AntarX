import type { Metadata } from "next";
import { Inter, Outfit, Tajawal } from "next/font/google";
import AdminSidebar from "@/components/AdminSidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-tajawal" });

export const metadata: Metadata = {
  title: "AntarX | Admin Dashboard",
  description: "Internal management for AntarX Juices & Desserts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.variable} ${outfit.variable} ${tajawal.variable}`}>
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
          <AdminSidebar />
          <div style={{ flex: 1, marginLeft: '260px' }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
