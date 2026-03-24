import prisma from '@/lib/prisma';
import { format } from 'date-fns';

export default async function AdminRequestsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const requests = await prisma.b2BRequest.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 className="text-4xl font-black text-black dark:text-white">B2B Requests</h1>
      <p className="mt-2 text-zinc-500">Manage business inquiries and wholesale leads.</p>

      <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 dark:bg-zinc-800/50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Business</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Details</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {requests.map((req: any) => (
              <tr key={req.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold">{req.businessName}</div>
                  <div className="text-xs text-zinc-400">{req.businessType}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div>{req.contactPerson}</div>
                  <div className="text-zinc-500">{req.phone}</div>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-500 max-w-xs truncate">
                  {req.orderDetails}
                </td>
                <td className="px-6 py-4 text-sm">
                  {req.createdAt ? format(new Date(req.createdAt), 'MMM d, yyyy') : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <div className="py-12 text-center text-zinc-500 italic">No requests found.</div>
        )}
      </div>
    </div>
  );
}
