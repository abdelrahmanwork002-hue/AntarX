import { isAuthenticated } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function AdminDashboard(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;

  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }
  return (
    <div>
      <h1 className="text-4xl font-black text-black dark:text-white">Dashboard Overview</h1>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Orders" value="12" change="+20%" />
        <StatCard title="B2B Requests" value="4" label="All Time" />
        <StatCard title="Live Products" value="24" label="6 fresh / 18 ready" />
        <StatCard title="Store Visitors" value="1.2k" change="+5%" />
      </div>
      
      <div className="mt-12 rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
        <h2 className="text-2xl font-bold mb-6">Recent B2B Requests</h2>
        <div className="text-zinc-500">Table will go here...</div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, label }: { title: string; value: string; change?: string; label?: string }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{title}</h3>
      <div className="mt-4 flex items-end gap-2">
        <span className="text-4xl font-black">{value}</span>
        {change && <span className="mb-1 text-xs font-bold text-green-600">{change}</span>}
      </div>
      {label && <p className="mt-2 text-xs text-zinc-400">{label}</p>}
    </div>
  );
}
