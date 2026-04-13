'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="hero-badge">New Arrivals</span>
          <h1 className="hero-title premium-serif">
            Artisanal Freshness <br /> 
            <span className="text-vibrant">In Every Sip & Bite</span>
          </h1>
          <p className="hero-subtitle">
            Experience the luxury of cold-pressed nature and handcrafted desserts. 
            Tailored for individuals, businesses, and your most memorable events.
          </p>
          <div className="hero-actions">
            <button className="btn-premium">Explore Catalogue</button>
            <button className="btn-outline">Our Story</button>
          </div>
        </motion.div>
      </div>
      
      <div className="hero-image-wrapper">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <Image 
            src="/hero-main.png" 
            alt="Premium Juice and Dessert" 
            width={800} 
            height={600} 
            className="hero-image"
            priority
          />
        </motion.div>
      </div>

      <style jsx>{`
        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 80px 5%;
          min-height: 85vh;
          gap: 40px;
          overflow: hidden;
        }

        .hero-content {
          flex: 1;
          max-width: 600px;
        }

        .hero-badge {
          display: inline-block;
          padding: 6px 16px;
          background: var(--accent-soft);
          color: var(--accent-brand);
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1.1;
          color: var(--accent-brand);
          margin-bottom: 24px;
        }

        .text-vibrant {
          color: var(--accent-vibrant);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 40px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid var(--accent-brand);
          color: var(--accent-brand);
          padding: 12px 28px;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-outline:hover {
          background: var(--accent-brand);
          color: white;
        }

        .hero-image-wrapper {
          flex: 1.2;
          display: flex;
          justify-content: center;
          position: relative;
        }

        .hero-image {
          object-fit: cover;
          border-radius: 40px;
          box-shadow: var(--shadow-premium);
        }

        @media (max-width: 968px) {
          .hero-container {
            flex-direction: column;
            text-align: center;
            padding-top: 40px;
          }
          .hero-content {
            max-width: 100%;
          }
          .hero-actions {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
