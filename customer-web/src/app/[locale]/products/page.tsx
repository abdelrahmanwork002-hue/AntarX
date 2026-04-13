'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './products.module.css';
import ProductCard from '@/components/ProductCard';
import { getProducts, Product } from '@/lib/data';

export default function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = React.use(params);
    const t = useTranslations('Products');
    
    const [filter, setFilter] = useState<'all' | 'juice' | 'dessert'>('all');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const filteredProducts = products.filter(p => filter === 'all' || p.category === filter);

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

            <div className={styles.content}>
                <aside className={styles.filters}>
                    <div className={styles.filterGroup}>
                        <h4 className="premium-serif">{t('categories')}</h4>
                        <ul className={styles.filterList}>
                            <li 
                                className={`${styles.filterItem} ${filter === 'all' ? styles.activeFilter : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                {t('filterAll')}
                            </li>
                            <li 
                                className={`${styles.filterItem} ${filter === 'juice' ? styles.activeFilter : ''}`}
                                onClick={() => setFilter('juice')}
                            >
                                {t('filterJuices')}
                            </li>
                            <li 
                                className={`${styles.filterItem} ${filter === 'dessert' ? styles.activeFilter : ''}`}
                                onClick={() => setFilter('dessert')}
                            >
                                {t('filterDesserts')}
                            </li>
                        </ul>
                    </div>
                </aside>

                <section className={styles.gridContainer}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                style={{ width: '40px', height: '40px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%' }}
                            />
                        </div>
                    ) : (
                        <motion.div layout className={styles.grid}>
                            <AnimatePresence mode='popLayout'>
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProductCard product={product} locale={locale} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </section>
            </div>
        </main>
    );
}
