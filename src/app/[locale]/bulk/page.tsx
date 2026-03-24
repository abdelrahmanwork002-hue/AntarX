'use client';

import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { submitB2BRequest } from '@/lib/actions';
import { useState, use } from 'react';
import { CheckCircle2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('B2BPage');

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-orange-600 px-8 py-4 font-bold text-white transition-all hover:bg-orange-700 disabled:opacity-50"
    >
      {pending ? '...' : t('submit')}
    </button>
  );
}

export default function B2BPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = use(props.params); 
  const t = useTranslations('B2BPage');
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await submitB2BRequest(formData);
    if (result.success) {
      setSubmitted(true);
    } else {
      alert(result.error);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white dark:bg-black min-h-screen pt-32">
        <main className="flex min-h-[50vh] items-center justify-center px-4">
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-20 w-20 text-green-500" />
            <h1 className="mt-6 text-3xl font-bold text-black dark:text-white">{t('success')}</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen">
      <main className="mx-auto max-w-4xl px-4 pt-32 pb-20">
        <div className="text-center">
          <h1 className="text-4xl font-black text-black dark:text-white sm:text-6xl text-center">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 text-center">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-12 rounded-3xl bg-white p-8 shadow-xl shadow-orange-500/5 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-8">{t('formTitle')}</h2>
          
          <form action={handleSubmit} className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t('businessName')}</label>
              <input
                required
                name="businessName"
                type="text"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-orange-500 dark:border-zinc-800 dark:bg-black"
                placeholder="Gym X / Cafe Y"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t('contactPerson')}</label>
              <input
                required
                name="contactPerson"
                type="text"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-orange-500 dark:border-zinc-800 dark:bg-black"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t('phone')}</label>
              <input
                required
                name="phone"
                type="tel"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-orange-500 dark:border-zinc-800 dark:bg-black"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t('email')}</label>
              <input
                required
                name="email"
                type="email"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-orange-500 dark:border-zinc-800 dark:bg-black"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t('businessType')}</label>
              <select
                name="businessType"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-orange-500 dark:border-zinc-800 dark:bg-black"
              >
                <option value="Gym">{t('types.gym')}</option>
                <option value="Cafe">{t('types.cafe')}</option>
                <option value="Restaurant">{t('types.restaurant')}</option>
                <option value="Event Organizer">{t('types.event')}</option>
                <option value="Other">{t('types.other')}</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t('deliveryDate')}</label>
              <input
                name="deliveryDate"
                type="date"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-orange-500 dark:border-zinc-800 dark:bg-black"
              />
            </div>

            <div className="col-span-full flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t('location')}</label>
              <input
                name="location"
                type="text"
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-orange-500 dark:border-zinc-800 dark:bg-black"
              />
            </div>

            <div className="col-span-full flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{t('orderDetails')}</label>
              <textarea
                required
                name="orderDetails"
                rows={4}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-orange-500 dark:border-zinc-800 dark:bg-black"
                placeholder="Describe your needs (quantities, types of juices, etc.)"
              />
            </div>

            <div className="col-span-full mt-4">
              <SubmitButton />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
