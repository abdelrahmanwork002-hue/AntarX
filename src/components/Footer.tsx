'use client';

import { Link, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const isAdminPage = pathname.includes('/admin');

  if (isAdminPage) return null;
  
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-2xl font-bold tracking-tighter text-black dark:text-white">
            عنترX
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
              {t('home')}
            </Link>
            <Link href="/menu" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
              {t('freshJuice')}
            </Link>
            <Link href="/bulk" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
              {t('bulkOrders')}
            </Link>
            <Link href="/blog" className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
              {t('blog')}
            </Link>
          </div>
          
          <div className="text-sm text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} AntarX Platform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
