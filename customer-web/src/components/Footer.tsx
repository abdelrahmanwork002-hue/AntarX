import React from 'react';

const Footer = () => {
  return (
    <footer className="glass-card" style={{ margin: '40px 5%', padding: '40px', borderRadius: '30px', textAlign: 'center' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 className="premium-serif" style={{ color: 'var(--primary)' }}>AntarX</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Artisanal Juices & Handcrafted Desserts</p>
      </div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        &copy; {new Date().getFullYear()} AntarX Platform. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
