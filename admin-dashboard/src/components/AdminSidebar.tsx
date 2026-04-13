'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/' },
    { name: 'Inquiries', href: '/inquiries' },
    { name: 'Orders', href: '/orders' },
    { name: 'Products', href: '/products' },
    { name: 'Customers', href: '/customers' },
  ];

  return (
    <aside style={{ width: '260px', height: '100vh', padding: '40px 20px', borderRight: '1px solid var(--border-glass)', background: 'rgba(255,255,255,0.02)', position: 'fixed', left: 0, top: 0 }}>
      <div style={{ marginBottom: '60px', paddingLeft: '20px' }}>
        <h2 className="premium-serif" style={{ color: 'var(--accent-brand)' }}>AntarX <br/> Admin</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            style={{ 
              padding: '12px 20px', 
              borderRadius: '12px', 
              textDecoration: 'none', 
              color: pathname === link.href ? 'var(--white)' : 'var(--text-secondary)',
              background: pathname === link.href ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
              fontWeight: pathname === link.href ? '600' : '400',
              border: pathname === link.href ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid transparent',
              transition: 'all 0.3s ease'
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: '20px', right: '20px' }}>
         <button className="btn-premium btn-small" style={{ width: '100%' }}>Logout</button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
