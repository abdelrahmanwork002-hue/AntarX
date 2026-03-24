import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations('HomePage');

  return (
    <div className="bg-white dark:bg-black">
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden pt-16">
        {/* Hero Background Decor */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]" />
        
        {/* Hero Section */}
        <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="animate-in fade-in slide-in-from-bottom-8 duration-1000 text-5xl font-black tracking-tight text-black dark:text-white sm:text-7xl lg:text-8xl">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mt-6 max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
            {t('heroSubtext')}
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 sm:flex-row">
            <Link
              href="/menu"
              className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-full bg-orange-600 px-8 font-bold text-white transition-all hover:bg-orange-700 sm:w-auto"
            >
              {t('viewMenu')}
            </Link>
            <Link
              href="/bulk"
              className="flex h-14 w-full items-center justify-center rounded-full border-2 border-zinc-900 px-8 font-bold text-black transition-colors hover:bg-zinc-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black sm:w-auto"
            >
              {t('bulkOrders')}
            </Link>
          </div>

          <div className="mt-20 flex justify-center transition-all hover:scale-110">
            <img
              src="/logo.png"
              alt="AntarX Logo"
              className="h-40 w-auto"
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="mt-40 w-full max-w-7xl px-4 pb-20">
          <h2 className="text-center text-3xl font-black text-black dark:text-white sm:text-5xl">
            {t('categories.title')}
          </h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              { key: 'fresh', href: '/menu', color: 'bg-orange-500' },
              { key: 'ready', href: '/ready', color: 'bg-green-500' },
              { key: 'bulk', href: '/bulk', color: 'bg-blue-500' },
            ].map((cat) => (
              <Link
                key={cat.key}
                href={cat.href}
                className="group relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-2"
              >
                <div className={`absolute inset-0 ${cat.color} opacity-10 group-hover:opacity-20`} />
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  {t(`categories.${cat.key}`)}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {t('heroSubtext')}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Why AntarX Section */}
        <section className="w-full bg-zinc-900 py-32 text-white dark:bg-zinc-800">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-black sm:text-5xl">{t('whyAntarX.title')}</h2>
            <div className="mt-20 grid gap-12 sm:grid-cols-3">
              {['pure', 'fresh', 'strong'].map((item) => (
                <div key={item} className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-orange-600 flex items-center justify-center mb-6 text-2xl font-bold">
                    {item[0].toUpperCase()}
                  </div>
                  <h3 className="text-2xl font-bold">{t(`whyAntarX.${item}`)}</h3>
                  <p className="mt-4 text-zinc-400">{t(`whyAntarX.${item}Desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
