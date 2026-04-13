import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display, Tajawal } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from '@/context/CartContext';
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-tajawal" });

export const metadata: Metadata = {
  title: "AntarX | Premium Juices & Desserts",
  description: "High-end cold-pressed juices and artisanal desserts for individuals, businesses, and events.",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'ar'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} data-theme="dark">
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} ${tajawal.variable}`}>
        <NextIntlClientProvider messages={messages}>
            <CartProvider>
                <Navbar />
                {children}
                <Footer />
            </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
