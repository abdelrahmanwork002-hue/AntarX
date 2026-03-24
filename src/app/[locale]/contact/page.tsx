'use client';

import { useTranslations } from 'next-intl';
import { useState, use } from 'react';
import { MessageCircle, CheckCircle2 } from 'lucide-react';

export default function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = use(props.params);
  const t = useTranslations('ContactPage');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen">
      <main className="mx-auto max-w-4xl px-4 pt-32 pb-20">
        <div className="text-center">
          <h1 className="text-4xl font-black text-black dark:text-white sm:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                <p className="mt-6 text-xl font-bold text-black dark:text-white">{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">{t('name')}</label>
                  <input
                    required
                    type="text"
                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-black outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Email</label>
                  <input
                    required
                    type="email"
                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-black outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t('message')}</label>
                  <textarea
                    required
                    rows={4}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-black outline-none focus:border-orange-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-black px-8 py-4 font-bold text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
                >
                  {t('send')}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col justify-center gap-8 rounded-3xl bg-orange-600 p-8 text-white">
            <h2 className="text-3xl font-bold">Direct Contact</h2>
            <p className="text-lg opacity-90">Ready to boost your business with AntarX? Chat with us directly.</p>
            <a
              href="https://wa.me/201000000000"
              className="flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-orange-600 transition-all hover:scale-105"
            >
              <MessageCircle />
              {t('whatsapp')}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
