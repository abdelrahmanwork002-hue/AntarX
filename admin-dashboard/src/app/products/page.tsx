'use client';

import React, { useEffect, useState } from 'react';
import { getProducts, createProduct } from '@/lib/data';

const ProductsManagementPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const productData = {
        name_en: formData.get('name_en'),
        name_ar: formData.get('name_ar'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price') as string),
        description_en: formData.get('description_en'),
        description_ar: formData.get('description_ar'),
        stock: parseInt(formData.get('stock') as string) || 0,
        calories: parseInt(formData.get('calories') as string) || 0,
    };

    try {
        const newProd = await createProduct(productData);
        setProducts(prev => [...prev, newProd]);
        setShowAddForm(false);
    } catch (err) {
        console.error('Failed to add product:', err);
        alert('Error adding product. Check console.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="premium-serif" style={{ fontSize: '2.5rem', color: 'var(--accent-brand)' }}>
            Product Catalogue
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your signature juices and artisanal desserts.</p>
        </div>
        {!showAddForm && (
            <button className="btn-premium" onClick={() => setShowAddForm(true)}>
            + Add New Product
            </button>
        )}
      </header>

      {showAddForm && (
          <div className="glass-card" style={{ padding: '40px', marginBottom: '40px', border: '1px solid var(--accent-brand)' }}>
              <h2 className="premium-serif" style={{ marginBottom: '20px' }}>Add New Product</h2>
              <form onSubmit={handleAddProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Name (EN)</label>
                      <input name="name_en" className="admin-input" required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Name (AR)</label>
                      <input name="name_ar" className="admin-input" required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category</label>
                      <select name="category" className="admin-input">
                          <option value="juice">Juice</option>
                          <option value="dessert">Dessert</option>
                      </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Price (SAR)</label>
                      <input name="price" type="number" step="0.01" className="admin-input" required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Description (EN)</label>
                      <textarea name="description_en" className="admin-input" style={{ minHeight: '80px' }}></textarea>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Description (AR)</label>
                      <textarea name="description_ar" className="admin-input" style={{ minHeight: '80px' }}></textarea>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Initial Stock</label>
                      <input name="stock" type="number" className="admin-input" defaultValue="0" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Calories</label>
                      <input name="calories" type="number" className="admin-input" defaultValue="0" />
                  </div>
                  
                  <div style={{ gridColumn: 'span 2', display: 'flex', gap: '15px', marginTop: '10px' }}>
                      <button type="submit" disabled={isSubmitting} className="btn-premium">
                          {isSubmitting ? 'Saving...' : 'Save Product'}
                      </button>
                      <button type="button" onClick={() => setShowAddForm(false)} style={{ background: 'transparent', border: '1px solid var(--border-glass)', color: 'white', padding: '12px 32px', borderRadius: '99px', cursor: 'pointer' }}>
                          Cancel
                      </button>
                  </div>
              </form>
          </div>
      )}

      {loading ? (
        <div style={{ padding: '100px', textAlign: 'center' }}>Loading catalogue...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {products.length === 0 ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1' }}>
                <p>No products found in the database. Please seed your data or add a new one.</p>
            </div>
          ) : (
            products.map((p) => (
              <div key={p.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '180px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.image_url ? <img src={p.image_url} alt={p.name_en} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '[Image Placeholder]'}
                </div>
                <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>{p.category}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{p.price} SAR</span>
                    </div>
                    <h3 className="premium-serif" style={{ marginBottom: '4px' }}>{p.name_en}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>{p.description_en?.substring(0, 60)}...</p>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>Edit</button>
                        <button style={{ flex: 1, padding: '8px', background: 'rgba(239, 68, 68, 0.1)', border: 'none', borderRadius: '8px', color: '#EF4444', cursor: 'pointer' }}>Delete</button>
                    </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <style jsx>{`
          .admin-input {
              padding: 12px;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid var(--border-glass);
              border-radius: 8px;
              color: white;
              font-size: 0.95rem;
          }
          .admin-input:focus {
              outline: none;
              border-color: var(--accent-brand);
              background: rgba(255, 255, 255, 0.08);
          }
      `}</style>
    </main>
  );
};

export default ProductsManagementPage;
