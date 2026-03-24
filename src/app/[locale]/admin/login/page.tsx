'use client';

import { useState } from 'react';
import { login } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(result.error || 'Login failed');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-10 shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
        <div className="text-center">
          <img src="/logo.png" alt="AntarX" className="mx-auto h-16 w-auto" />
          <h2 className="mt-6 text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Please enter your credentials to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="relative block w-full rounded-2xl border-0 bg-zinc-100 px-4 py-4 text-zinc-900 placeholder-zinc-500 focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 dark:focus:ring-white sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-2xl border-0 bg-zinc-100 px-4 py-4 text-zinc-900 placeholder-zinc-500 focus:ring-2 focus:ring-black dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-400 dark:focus:ring-white sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm font-medium text-red-500 text-center bg-red-50 dark:bg-red-900/10 py-2 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-2xl bg-black py-4 text-sm font-bold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
