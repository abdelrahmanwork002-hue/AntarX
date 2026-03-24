import { getTranslations } from 'next-intl/server';
import { getProducts } from '@/lib/actions';
import ProductCard from '@/components/ProductCard';

export default async function MenuPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations('MenuPage');
  const products = await getProducts('fresh');

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <main className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-black text-black dark:text-white sm:text-6xl">
            {t('freshTitle')}
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('freshSubtitle')}
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-zinc-500">
              {t('noProducts')}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
