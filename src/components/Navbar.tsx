'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const isAdminPage = pathname.includes('/admin');

  if (isAdminPage) return null;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="عنترX" className="h-10 w-auto" />
            <span className="text-2xl font-black tracking-tighter text-black dark:text-white">عنترX</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
              {t('home')}
            </Link>
            <Link href="/menu" className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
              {t('freshJuice')}
            </Link>
            <Link href="/ready" className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
              {t('readyToDeliver')}
            </Link>
            <Link href="/bulk" className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
              {t('bulkOrders')}
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white">
              {t('blog')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            locale={pathname.startsWith('/en') ? 'ar' : 'en'}
            className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            <Globe className="h-4 w-4" />
            {pathname.startsWith('/en') ? 'العربية' : 'English'}
          </Link>
          <Link
            href="/bulk"
            className="hidden rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black md:block"
          >
            {t('bulkOrders')}
          </Link>
        </div>
      </div>
    </nav>
  );
}
