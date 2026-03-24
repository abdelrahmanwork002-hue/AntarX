import { Link } from '@/navigation';
import { LayoutDashboard, ShoppingBasket, FileText, Send, Settings, LogOut } from 'lucide-react';
import { isAuthenticated, logout } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function AdminLayout(props: { 
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const { locale } = await props.params;

  const authenticated = await isAuthenticated();
  
  // Since we are in [locale]/admin/layout.tsx, this layout applies to all admin pages.
  // We handle the login page separately by checking authentication state.
  
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      {authenticated && (
        <aside className="fixed left-0 top-0 h-full w-64 border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3 mb-12">
            <img src="/logo.png" alt="AntarX" className="h-8 w-auto" />
            <span className="text-xl font-black text-black dark:text-white">Admin</span>
          </div>

          <nav className="space-y-2">
            <AdminNavLink href="/admin" icon={<LayoutDashboard size={20} />} label="Overview" />
            <AdminNavLink href="/admin/products" icon={<ShoppingBasket size={20} />} label="Products" />
            <AdminNavLink href="/admin/requests" icon={<Send size={20} />} label="B2B Requests" />
            <AdminNavLink href="/admin/blog" icon={<FileText size={20} />} label="Blog Posts" />
            <AdminNavLink href="/admin/settings" icon={<Settings size={20} />} label="Settings" />
          </nav>

          <div className="absolute bottom-8 left-6 right-6">
            <form action={logout}>
              <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/10">
                <LogOut size={20} />
                Logout
              </button>
            </form>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={authenticated ? "ml-64 w-full p-10" : "w-full"}>
        {children}
      </main>
    </div>
  );
}

function AdminNavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-black dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
    >
      {icon}
      {label}
    </Link>
  );
}
