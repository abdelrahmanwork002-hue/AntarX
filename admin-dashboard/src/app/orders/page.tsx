'use client';

import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '@/lib/data';

const OrdersManagementPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateOrderStatus(id, newStatus);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <main style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 className="premium-serif" style={{ fontSize: '2.5rem', color: 'var(--accent-brand)' }}>
            Customer Orders
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track and fulfill artisanal juice and dessert orders.</p>
        </header>

        {loading ? (
            <div style={{ padding: '100px', textAlign: 'center' }}>Loading orders...</div>
        ) : (
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-glass)' }}>
                        <tr>
                            <th style={{ padding: '20px' }}>ID</th>
                            <th style={{ padding: '20px' }}>Customer</th>
                            <th style={{ padding: '20px' }}>Items</th>
                            <th style={{ padding: '20px' }}>Total</th>
                            <th style={{ padding: '20px' }}>Status</th>
                            <th style={{ padding: '20px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                                <td style={{ padding: '20px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>#{order.id.substring(0,8)}</td>
                                <td style={{ padding: '20px' }}>{order.profiles?.full_name || 'Guest'}</td>
                                <td style={{ padding: '20px' }}>
                                    <div style={{ fontSize: '0.9rem' }}>
                                        {order.order_items.map((item: any, idx: number) => (
                                            <div key={idx}>{item.quantity}x {item.products?.name_en}</div>
                                        ))}
                                    </div>
                                </td>
                                <td style={{ padding: '20px' }}>{order.total_amount} SAR</td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ 
                                        padding: '4px 12px', 
                                        borderRadius: '99px', 
                                        fontSize: '0.8rem',
                                        background: order.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : order.status === 'processing' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                        color: order.status === 'pending' ? '#F59E0B' : order.status === 'processing' ? '#3B82F6' : '#10B981'
                                    }}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <select 
                                        value={order.status} 
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        style={{ background: 'transparent', border: '1px solid var(--border-glass)', color: 'white', padding: '4px 8px', borderRadius: '4px' }}
                                    >
                                        <option value="pending" style={{ color: 'black' }}>Pending</option>
                                        <option value="processing" style={{ color: 'black' }}>Processing</option>
                                        <option value="delivered" style={{ color: 'black' }}>Delivered</option>
                                        <option value="cancelled" style={{ color: 'black' }}>Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </main>
  );
};

export default OrdersManagementPage;
