'use client';

import { useState } from 'react';
import { createProduct, updateProduct, deleteProduct, toggleProductVisibility } from '@/lib/actions';
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string | null;
  descriptionEn: string | null;
  price: any;
  type: string;
  category: string | null;
  images: string[];
  visible: boolean;
}

export default function ProductManager({ products }: { products: Product[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    let result;
    if (editingProduct) {
      result = await updateProduct(editingProduct.id, formData);
    } else {
      result = await createProduct(formData);
    }

    if (result.success) {
      setIsModalOpen(false);
      setEditingProduct(null);
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      const result = await deleteProduct(id);
      if (result.success) router.refresh();
      else alert(result.error);
    }
  }

  async function handleToggleVisibility(id: string, visible: boolean) {
    const result = await toggleProductVisibility(id, visible);
    if (result.success) router.refresh();
    else alert(result.error);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-black dark:text-white">Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-full bg-black px-6 py-3 font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className={`group relative overflow-hidden rounded-3xl bg-white p-4 shadow-sm transition-all hover:shadow-xl dark:bg-zinc-900 border ${product.visible ? 'border-zinc-100 dark:border-zinc-800' : 'border-red-200 opacity-75 dark:border-red-900/30'}`}>
            <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 relative">
              <img
                src={product.images[0] || '/logo.png'}
                alt={product.nameEn}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => handleToggleVisibility(product.id, !product.visible)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm hover:bg-white transition-colors"
                title={product.visible ? 'Hide Product' : 'Show Product'}
              >
                {product.visible ? <Eye size={18} className="text-zinc-600" /> : <EyeOff size={18} className="text-red-500" />}
              </button>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg leading-tight">{product.nameEn}</h3>
                <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{product.type}</span>
              </div>
              <h4 className="text-sm font-medium text-zinc-500 mb-2">{product.nameAr}</h4>
              <div className="text-xl font-black text-black dark:text-white">{Number(product.price)} EGP</div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setEditingProduct(product);
                  setIsModalOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-zinc-100 py-2.5 text-sm font-bold dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex items-center justify-center rounded-xl bg-red-100 px-3 py-2.5 text-sm font-bold text-red-600 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Name (English)</label>
                  <input
                    name="nameEn"
                    defaultValue={editingProduct?.nameEn}
                    required
                    className="w-full rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">الاسم (عربي)</label>
                  <input
                    name="nameAr"
                    defaultValue={editingProduct?.nameAr}
                    required
                    dir="rtl"
                    className="w-full rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Description (English)</label>
                  <textarea
                    name="descriptionEn"
                    defaultValue={editingProduct?.descriptionEn || ''}
                    rows={2}
                    className="w-full rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">الوصف (عربي)</label>
                  <textarea
                    name="descriptionAr"
                    defaultValue={editingProduct?.descriptionAr || ''}
                    dir="rtl"
                    rows={2}
                    className="w-full rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Price (EGP)</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct ? Number(editingProduct.price) : ''}
                    required
                    className="w-full rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Type</label>
                  <select
                    name="type"
                    defaultValue={editingProduct?.type || 'fresh'}
                    className="w-full rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  >
                    <option value="fresh">Fresh Juice</option>
                    <option value="ready">Ready to Deliver</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Category</label>
                <input
                  name="category"
                  defaultValue={editingProduct?.category || ''}
                  placeholder="e.g. Traditional, Blended, Seasonal"
                  className="w-full rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold">Images (Comma separated URLs)</label>
                <textarea
                  name="images"
                  rows={3}
                  defaultValue={editingProduct?.images.join(', ')}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  className="w-full rounded-2xl bg-zinc-100 px-4 py-3 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="visible"
                  name="visible"
                  defaultChecked={editingProduct ? editingProduct.visible : true}
                  className="h-5 w-5 rounded border-zinc-300 text-black focus:ring-black"
                />
                <label htmlFor="visible" className="text-sm font-bold">Visible on website</label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-black py-4 text-center font-bold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
