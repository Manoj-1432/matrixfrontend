'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';
import Link from 'next/link';

type Stats = { total_users: number; total_orders: number; total_vehicles: number; total_revenue: number };
type OrderStat = { pending: number; processing: number; completed: number; cancelled: number };
type DayData = { date: string; label: string; count: number };
type RecentOrder = { id: number; order_ref: string; customer: string; vehicle: string; vehicle_registration: string; status: string; amount: number; created_at: string };
type DashData = { stats: Stats; order_stats: OrderStat; orders_per_day: DayData[]; recent_orders: RecentOrder[] };

const STATUS_STYLE: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  processing: 'bg-blue-50 text-blue-700 border-blue-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { router.push('/admin/login'); return; }
    adminApi.get<DashData>('/api/admin/dashboard')
      .then(setData)
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!data) return null;

  const { stats, order_stats, orders_per_day, recent_orders } = data;
  const maxDay = Math.max(...orders_per_day.map(d => d.count), 1);

  return (
    <div className="flex flex-col gap-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Orders', value: stats.total_orders, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: '#2563eb', bg: '#eff6ff' },
          { label: 'Revenue', value: `£${Number(stats.total_revenue).toFixed(2)}`, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: '#16a34a', bg: '#f0fdf4' },
          { label: 'Customers', value: stats.total_users, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color: '#7c3aed', bg: '#faf5ff' },
          { label: 'Vehicles', value: stats.total_vehicles, icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', color: '#ea580c', bg: '#fff7ed' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-500 text-sm font-medium">{s.label}</p>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <svg className="w-4.5 h-4.5" fill="none" stroke={s.color} strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orders per day chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <p className="font-bold text-slate-900 mb-6">Orders — Last 7 Days</p>
          <div className="flex items-end gap-3 h-36">
            {orders_per_day.map(d => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-slate-600">{d.count || ''}</span>
                <div className="w-full rounded-t-lg transition-all duration-500"
                  style={{
                    height: `${Math.max((d.count / maxDay) * 100, d.count > 0 ? 8 : 2)}%`,
                    background: d.count > 0 ? 'linear-gradient(180deg,#4f46e5,#2563eb)' : '#e2e8f0',
                    minHeight: '4px',
                  }} />
                <span className="text-xs text-slate-400 font-medium">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <p className="font-bold text-slate-900 mb-5">Order Status</p>
          <div className="flex flex-col gap-3">
            {(Object.entries(order_stats) as [string, number][]).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${STATUS_STYLE[status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                    {status}
                  </span>
                </div>
                <span className="font-bold text-slate-900">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <p className="font-bold text-slate-900">Recent Orders</p>
          <Link href="/admin/orders" className="text-blue-600 text-sm font-semibold hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Vehicle</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recent_orders.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400">No orders yet</td></tr>
              )}
              {recent_orders.map(o => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{o.order_ref}</td>
                  <td className="px-6 py-4 text-slate-600">{o.customer}</td>
                  <td className="px-6 py-4 text-slate-500">{o.vehicle_registration || o.vehicle || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${STATUS_STYLE[o.status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">£{Number(o.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
