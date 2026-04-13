'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './login.module.css';
import Link from 'next/link';

export default function LoginPage() {
  const t = useTranslations('Auth');

  return (
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${styles.card} glass-card`}
      >
        <h1 className={`${styles.title} premium-serif`}>{t('loginTitle')}</h1>
        <p className={styles.subtitle}>{t('loginSubtitle')}</p>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>{t('email')}</label>
            <input type="email" className={styles.input} placeholder="john@example.com" />
          </div>

          <div className={styles.formGroup}>
            <label>{t('password')}</label>
            <input type="password" className={styles.input} />
          </div>

          <button type="submit" className={`${styles.submitBtn} btn-premium`}>
            {t('loginBtn')}
          </button>
        </form>

        <div className={styles.footer}>
          <p>{t('noAccount')}</p>
          <Link href="/register" style={{ display: 'block', marginTop: '10px' }}>
            {t('submit')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
