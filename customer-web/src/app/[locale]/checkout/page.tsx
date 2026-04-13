'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/data';
import styles from './checkout.module.css';

export default function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = React.use(params);
    const t = useTranslations('Checkout');
    const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
    const [isOrdered, setIsOrdered] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            await createOrder(null, totalAmount, cartItems);
            setIsOrdered(true);
            clearCart();
        } catch (err) {
            console.error('Order placement failed:', err);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (isOrdered) {
        return (
            <main className={styles.main}>
                <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '60px', textAlign: 'center' }}>
                    <h1 className="premium-serif" style={{ color: 'var(--primary)', marginBottom: '20px' }}>{t('confirmTitle')}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t('confirmMessage')}</p>
                </div>
            </main>
        );
    }

    if (cartItems.length === 0) {
        return (
            <main className={styles.main}>
                <div style={{ textAlign: 'center', padding: '100px' }}>
                    <h2 className="premium-serif">{t('emptyCart')}</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>{t('emptySubtitle')}</p>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.grid}>
                <section className={styles.cartSection}>
                    <h2 className="premium-serif" style={{ fontSize: '2rem', marginBottom: '20px' }}>{t('title')}</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div 
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="glass-card"
                                >
                                    <div className={styles.item}>
                                        <div className={styles.itemImage}>
                                            🍹
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h3 className={styles.itemName}>{locale === 'ar' ? item.name_ar : item.name_en}</h3>
                                            <p className={styles.itemPrice}>{item.price.toFixed(2)} SAR</p>
                                            <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                                        </div>
                                        <div className={styles.quantityControls}>
                                            <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                <aside className={`${styles.summarySection} glass-card`}>
                    <h3 className={`${styles.summaryTitle} premium-serif`}>{t('summary')}</h3>
                    <div className={styles.summaryRow}>
                        <span>{t('subtotal')}</span>
                        <span>{totalAmount.toFixed(2)} SAR</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>{t('delivery')}</span>
                        <span>{t('free')}</span>
                    </div>
                    
                    <div className={styles.totalRow}>
                        <span>{t('total')}</span>
                        <span>{totalAmount.toFixed(2)} SAR</span>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isProcessing}
                        className="btn-premium checkoutBtn"
                        onClick={handlePlaceOrder}
                    >
                        {isProcessing ? 'Processing...' : t('placeOrder')}
                    </motion.button>
                </aside>
            </div>
        </main>
    );
}
