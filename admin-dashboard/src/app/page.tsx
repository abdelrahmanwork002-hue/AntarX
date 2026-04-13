'use client';

import React, { useEffect, useState } from 'react';
import { getInquiries, getOrders, getProducts } from '@/lib/data';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    inquiries: 0,
    orders: 0,
    products: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
        setLoading(true);
        const [inqs, ords, prods] = await Promise.all([
            getInquiries(),
            getOrders(),
            getProducts()
        ]);
        setStats({
            inquiries: inqs.length,
            orders: ords.length,
            products: prods.length
        });
        setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <main style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 className="premium-serif" style={{ fontSize: '2.5rem', color: 'var(--accent-brand)' }}>
          Command Center
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Administrator. Here's a summary of the AntarX platform.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-card" style={{ padding: '30px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>PENDING INQUIRIES</span>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', marginTop: '10px' }}>{loading ? '...' : stats.inquiries}</div>
          <p style={{ color: '#10B981', marginTop: '8px' }}>Active requests</p>
        </div>
        <div className="glass-card" style={{ padding: '30px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>TOTAL ORDERS</span>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', marginTop: '10px' }}>{loading ? '...' : stats.orders}</div>
          <p style={{ color: '#3B82F6', marginTop: '8px' }}>Store transactions</p>
        </div>
        <div className="glass-card" style={{ padding: '30px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>CATALOGUE SIZE</span>
          <div style={{ fontSize: '2.5rem', fontWeight: '700', marginTop: '10px' }}>{loading ? '...' : stats.products}</div>
          <p style={{ color: '#F59E0B', marginTop: '8px' }}>Live products</p>
        </div>
      </div>

      <section className="glass-card" style={{ padding: '40px' }}>
        <h2 className="premium-serif" style={{ marginBottom: '24px' }}>System Overview</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
            The AntarX platform is currently operational. Use the sidebar to manage specific modules. 
            All data is synchronized with the live Supabase instance.
        </p>
      </section>
    </main>
  );
}
