'use client';

import React, { useEffect, useState } from 'react';
import { getInquiries, updateInquiryStatus, Inquiry } from '@/lib/data';

const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      const data = await getInquiries();
      setInquiries(data);
      setLoading(false);
    };
    fetchInquiries();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: Inquiry['status']) => {
    try {
      await updateInquiryStatus(id, newStatus);
      setInquiries(prev => prev.map(inq => 
        inq.id === id ? { ...inq, status: newStatus } : inq
      ));
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <main style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 className="premium-serif" style={{ fontSize: '2.5rem', color: 'var(--accent-brand)' }}>
            Event Inquiries
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage and respond to upcoming event catering requests.</p>
        </header>

        {loading ? (
            <div style={{ padding: '100px', textAlign: 'center' }}>Loading inquiries...</div>
        ) : (
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border-glass)' }}>
                        <tr>
                            <th style={{ padding: '20px' }}>Date</th>
                            <th style={{ padding: '20px' }}>Event Type</th>
                            <th style={{ padding: '20px' }}>Guests</th>
                            <th style={{ padding: '20px' }}>Location</th>
                            <th style={{ padding: '20px' }}>Status</th>
                            <th style={{ padding: '20px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((inq) => (
                            <tr key={inq.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                                <td style={{ padding: '20px' }}>{new Date(inq.event_date).toLocaleDateString()}</td>
                                <td style={{ padding: '20px' }}>{inq.event_type}</td>
                                <td style={{ padding: '20px' }}>{inq.guest_count}</td>
                                <td style={{ padding: '20px' }}>{inq.location}</td>
                                <td style={{ padding: '20px' }}>
                                    <span style={{ 
                                        padding: '4px 12px', 
                                        borderRadius: '99px', 
                                        fontSize: '0.8rem',
                                        background: inq.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : inq.status === 'reviewed' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                        color: inq.status === 'pending' ? '#F59E0B' : inq.status === 'reviewed' ? '#3B82F6' : '#10B981'
                                    }}>
                                        {inq.status.toUpperCase()}
                                    </span>
                                </td>
                                <td style={{ padding: '20px' }}>
                                    <select 
                                        value={inq.status} 
                                        onChange={(e) => handleStatusUpdate(inq.id, e.target.value as Inquiry['status'])}
                                        style={{ background: 'transparent', border: '1px solid var(--border-glass)', color: 'white', padding: '4px 8px', borderRadius: '4px' }}
                                    >
                                        <option value="pending" style={{ color: 'black' }}>Pending</option>
                                        <option value="reviewed" style={{ color: 'black' }}>Reviewed</option>
                                        <option value="completed" style={{ color: 'black' }}>Completed</option>
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

export default InquiriesPage;
