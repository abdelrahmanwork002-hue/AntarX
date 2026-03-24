import { getTranslations } from 'next-intl/server';

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations('AboutPage');

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <main className="mx-auto max-w-4xl px-4 pt-32 pb-20">
        <div className="text-center">
          <h1 className="text-4xl font-black text-black dark:text-white sm:text-6xl">
            {t('title')}
          </h1>
        </div>

        <div className="mt-20 space-y-20">
          <section>
            <h2 className="text-3xl font-bold text-black dark:text-white">{t('storyTitle')}</h2>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t('story')}
            </p>
          </section>

          <section className="rounded-[3rem] bg-orange-600 p-12 text-white">
            <h2 className="text-3xl font-bold">{t('missionTitle')}</h2>
            <p className="mt-6 text-xl font-medium leading-relaxed opacity-90">
              {t('mission')}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
