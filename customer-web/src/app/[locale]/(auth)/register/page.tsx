'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './register.module.css';
import Link from 'next/link';

export default function RegisterPage() {
  const t = useTranslations('Auth');
  const [role, setRole] = useState('individual');

  return (
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${styles.card} glass-card`}
      >
        <h1 className={`${styles.title} premium-serif`}>{t('registerTitle')}</h1>
        <p className={styles.subtitle}>{t('registerSubtitle')}</p>

        <div className={styles.roleSelection}>
          <label className={styles.label}>{t('selectRole')}</label>
          <div className={styles.roleGrid}>
            {['individual', 'business', 'eventCreator'].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`${styles.roleButton} ${role === r ? styles.roleButtonActive : ''}`}
              >
                {t(r)}
              </button>
            ))}
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>{t('fullName')}</label>
            <input type="text" className={styles.input} placeholder="John Doe" />
          </div>

          <div className={styles.formGroup}>
            <label>{t('email')}</label>
            <input type="email" className={styles.input} placeholder="john@example.com" />
          </div>

          <AnimatePresence mode="wait">
            {role === 'business' && (
              <motion.div
                key="business-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className={styles.formGroup}>
                  <label>{t('companyName')}</label>
                  <input type="text" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>{t('vatNumber')}</label>
                  <input type="text" className={styles.input} />
                </div>
              </motion.div>
            )}

            {role === 'eventCreator' && (
              <motion.div
                key="event-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className={styles.formGroup}>
                  <label>{t('eventName')}</label>
                  <input type="text" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label>{t('approxGuests')}</label>
                  <input type="number" className={styles.input} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className={styles.formGroup}>
            <label>{t('password')}</label>
            <input type="password" className={styles.input} />
          </div>

          <button type="submit" className={`${styles.submitBtn} btn-premium`}>
            {t('submit')}
          </button>
        </form>

        <div className={styles.footer}>
          <Link href="/login">{t('haveAccount')}</Link>
        </div>
      </motion.div>
    </div>
  );
}
