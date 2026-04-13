import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Featured Sections Placeholder */}
      <section style={{ padding: '80px 5%' }}>
        <h2 className="premium-serif" style={{ fontSize: '2.5rem', marginBottom: '40px', color: 'var(--accent-brand)' }}>
          Curated Collections
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '40px', minHeight: '300px' }}>
            <h3 className="premium-serif">Signature Juices</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Cold-pressed with organic local ingredients.</p>
          </div>
          <div className="glass-card" style={{ padding: '40px', minHeight: '300px' }}>
            <h3 className="premium-serif">Artisanal Desserts</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Handcrafted with a modern twist on tradition.</p>
          </div>
          <div className="glass-card" style={{ padding: '40px', minHeight: '300px' }}>
            <h3 className="premium-serif">Event Packages</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>Tailored catering for your most special moments.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
