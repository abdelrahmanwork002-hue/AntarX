'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './inquiry.module.css';
import { submitInquiry } from '@/lib/data';

export default function InquiryPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = React.use(params);
    const t = useTranslations('Inquiry');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const inquiryData = {
            event_type: formData.get('eventType') as string,
            event_date: formData.get('eventDate') as string,
            guest_count: parseInt(formData.get('guestCount') as string),
            location: formData.get('location') as string,
            notes: formData.get('notes') as string,
        };

        try {
            await submitInquiry(inquiryData);
            setIsSubmitted(true);
        } catch (err) {
            console.error('Inquiry error:', err);
            setErrorMsg('Something went wrong. Please try again.');
        } finally {
            setIsLoading(true);
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <main className={styles.main}>
                <div className={`${styles.formContainer} glass-card`}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles.successMessage}
                    >
                        <h2 className={`${styles.successTitle} premium-serif`}>{t('successTitle')}</h2>
                        <p className={styles.subtitle}>{t('successMessage')}</p>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={styles.submitBtn}
                            onClick={() => setIsSubmitted(false)}
                            style={{ marginTop: '30px' }}
                        >
                            Return to Form
                        </motion.button>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${styles.title} premium-serif`}
                >
                    {t('title')}
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={styles.subtitle}
                >
                    {t('subtitle')}
                </motion.p>
            </section>

            <div className={`${styles.formContainer} glass-card`}>
                {errorMsg && <p style={{ color: 'red', marginBottom: '20px' }}>{errorMsg}</p>}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('eventType')}</label>
                            <select name="eventType" className={styles.select} required defaultValue="">
                                <option value="" disabled>Select event type...</option>
                                <option value="corporate">Corporate Gala</option>
                                <option value="wedding">Private Wedding</option>
                                <option value="social">Social VIP Gathering</option>
                                <option value="other">Other Unique Celebration</option>
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('eventDate')}</label>
                            <input name="eventDate" type="date" className={styles.input} required />
                        </div>
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('guestCount')}</label>
                            <input name="guestCount" type="number" className={styles.input} placeholder="e.g. 50" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>{t('location')}</label>
                            <input name="location" type="text" className={styles.input} placeholder="Riyadh, Unified Tower..." required />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>{t('additionalNotes')}</label>
                        <textarea name="notes" className={styles.textarea} placeholder={t('additionalNotes')}></textarea>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        className={styles.submitBtn}
                        type="submit"
                    >
                        {isLoading ? '...' : t('submitInquiry')}
                    </motion.button>
                </form>
            </div>
        </main>
    );
}
