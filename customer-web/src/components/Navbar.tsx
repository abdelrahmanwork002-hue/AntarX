'use client';

import React from 'react';
import Image from 'next/image';
import { Link, usePathname, useRouter } from '@/navigation'; // Assuming we have a navigation.ts setup or just use next-intl/client
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { itemCount } = useCart();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="nav-container glass-card"
    >
      <div className="nav-logo">
        <Link href="/">
           <Image src="/logo.png" alt="AntarX Logo" width={120} height={40} priority />
        </Link>
      </div>
      
      <div className="nav-links">
        <Link href="/products" className="nav-link">{t('products')}</Link>
        <Link href="/inquiry" className="nav-link">{t('packages')}</Link>
        <Link href="/journal" className="nav-link">{t('journal')}</Link>
      </div>

      <div className="nav-utils">
        <div className="cart-link">
            <Link href="/checkout" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem' }}>🛒</span>
                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
        </div>
        <button className="lang-toggle" onClick={toggleLocale}>
          {locale === 'en' ? 'العربية' : 'English'}
        </button>
        <Link href="/login">
            <button className="btn-premium btn-small">{t('login')}</button>
        </Link>
      </div>

      <style jsx>{`
        .nav-container {
          margin: 20px 5%;
          padding: 12px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 999px !important;
          z-index: 1000;
          position: sticky;
          top: 20px;
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          font-weight: 500;
          color: var(--text-primary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: var(--accent-vibrant);
        }

        .nav-utils {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .lang-toggle {
          background: none;
          border: none;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          color: var(--text-primary);
          font-family: var(--font-arabic);
        }

        .btn-small {
          padding: 8px 24px;
          font-size: 0.9rem;
        }

        .cart-link {
          position: relative;
          cursor: pointer;
          margin-right: 10px;
        }

        .cart-count {
          position: absolute;
          top: -10px;
          right: -10px;
          background: var(--accent-vibrant);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
