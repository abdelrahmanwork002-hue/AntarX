'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
    locale: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, locale }) => {
    const t = useTranslations('Products');
    const { addToCart } = useCart();
    
    const name = locale === 'ar' ? product.name_ar : product.name_en;
    const description = locale === 'ar' ? product.description_ar : product.description_en;

    return (
        <motion.div 
            className={`${styles.card} glass-card`}
            whileHover={{ y: -5 }}
        >
            <div className={styles.imageWrapper}>
                <div className={styles.imagePlaceholder}>
                    [ Image: {name} ]
                </div>
            </div>
            
            <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={`${styles.name} premium-serif`}>{name}</h3>
                <p className={styles.description}>{description}</p>
                <div className={styles.price}>{product.price.toFixed(2)} SAR</div>
                <motion.button 
                    className={styles.btn}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                >
                    {t('addToCart')}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
