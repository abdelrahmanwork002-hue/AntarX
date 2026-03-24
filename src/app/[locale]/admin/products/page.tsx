import prisma from '@/lib/prisma';
import { isAuthenticated } from '@/lib/actions';
import { redirect } from 'next/navigation';
import ProductManager from '@/components/ProductManager';
import { MOCK_PRODUCTS } from '@/lib/mock';

export default async function AdminProductsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Convert products to serializable objects if necessary (Decimal to string/number)
    const serializedProducts = products.map(p => ({
      ...p,
      price: p.price.toString()
    }));

    return (
      <div className="max-w-7xl mx-auto">
        <ProductManager products={serializedProducts} />
      </div>
    );
  } catch (error) {
    console.error('Database connection error in AdminProductsPage:', error);
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/20 text-center animate-pulse">
           <p className="text-orange-700 dark:text-orange-400 font-bold text-sm">
            📡 Live Database Unreachable. Showing Mock Products for testing purposes.
          </p>
        </div>
        <ProductManager products={MOCK_PRODUCTS} />
      </div>
    );
  }
}
