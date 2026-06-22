'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Order = {
  id: number; order_ref?: string; status: string; payment_status: string;
  amount: number; tyre_brand: string; tyre_model: string; tyre_size: string;
  tyre_quantity: number; vehicle_registration?: string; fitting_date?: string;
  created_at: string; customer?: { name: string; email: string };
};

const STATUS_STYLE: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  processing: 'bg-blue-50 text-blue-700 border-blue-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    adminApi.get<{ data: Order[] }>('/api/admin/orders')
      .then(d => setOrders(d.data ?? []))
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  async function updateStatus(id: number, status: string) {
    setUpdating(id);
    try {
      await adminApi.patch(`/api/admin/orders/${id}/status`, { status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch { /* ignore */ } finally {
      setUpdating(null);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h2 className="font-bold text-slate-900">All Orders</h2>
        <p className="text-slate-400 text-sm mt-0.5">{orders.length} total orders</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-3 text-left">Order</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Reg</th>
              <th className="px-6 py-3 text-left">Tyre</th>
              <th className="px-6 py-3 text-left">Fitting Date</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-400">No orders yet</td></tr>
            )}
            {orders.map(o => (
              <tr key={o.id} onClick={e => { if ((e.target as HTMLElement).closest('select,button,a')) return; router.push(`/admin/orders/${o.id}`); }} className="hover:bg-slate-50 transition-colors cursor-pointer">
                <td className="px-6 py-4 font-bold text-slate-800">
                  {o.order_ref ?? `#ORD-${String(o.id).padStart(3, '0')}`}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <p>{o.customer?.name ?? 'Guest'}</p>
                  {o.customer?.email && <p className="text-xs text-slate-400">{o.customer.email}</p>}
                </td>
                <td className="px-6 py-4 font-mono text-slate-600 text-xs">{o.vehicle_registration ?? '—'}</td>
                <td className="px-6 py-4 text-slate-600">
                  {o.tyre_brand} {o.tyre_model}<br />
                  <span className="text-xs text-slate-400">{o.tyre_size} × {o.tyre_quantity}</span>
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">{o.fitting_date ?? '—'}</td>
                <td className="px-6 py-4">
                  <select
                    value={o.status}
                    disabled={updating === o.id}
                    onChange={e => updateStatus(o.id, e.target.value)}
                    className={`text-xs font-semibold border rounded-full px-2.5 py-1 outline-none cursor-pointer ${STATUS_STYLE[o.status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}
                  >
                    {['pending','processing','completed','cancelled'].map(s => (
                      <option key={s} value={s} className="text-slate-800 bg-white">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-right font-bold text-slate-900">£{Number(o.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
