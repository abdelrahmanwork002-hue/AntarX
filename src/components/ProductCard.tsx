'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string | null;
  descriptionEn: string | null;
  price: any; // Decimal type
  type: string;
  images: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations('MenuPage');
  const { locale } = useParams();
  
  const name = locale === 'ar' ? product.nameAr : product.nameEn;
  const description = locale === 'ar' ? product.descriptionAr : product.descriptionEn;

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={product.images[0] || '/logo.png'}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.type === 'fresh' && (
          <div className="absolute top-4 right-4 rounded-full bg-orange-600/90 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {t('inStoreOnly')}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-black dark:text-white">{name}</h3>
            {description && (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                {description}
              </p>
            )}
          </div>
          <div className="text-lg font-black text-orange-600">
            {t('price', { amount: Number(product.price).toLocaleString() })}
          </div>
        </div>
      </div>
    </div>
  );
}
