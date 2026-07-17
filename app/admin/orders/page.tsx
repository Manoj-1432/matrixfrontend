'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Order = {
  id: number; order_ref?: string; status: string; payment_status: string;
  amount: number; tyre_brand: string; tyre_model: string; tyre_size: string;
  tyre_quantity: number; vehicle_registration?: string; fitting_date?: string;
  created_at: string;
  user?: { name: string; email: string; phone?: string; address?: string; city?: string; postcode?: string };
  slot?: { start_time: string; end_time: string; day: string };
};

type Meta = { current_page: number; last_page: number; per_page: number; total: number };
type Stats = { total: number; pending: number; processing: number; completed: number; cancelled: number };

function fmtDate(d?: string) {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const STATUS_STYLE: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  processing: 'bg-blue-50 text-blue-700 border-blue-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [page, setPage] = useState(1);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchOrders = useCallback((q: string, status: string, payment: string, p: number) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (status) params.set('status', status);
    if (payment) params.set('payment', payment);
    params.set('page', String(p));
    params.set('per_page', '25');
    adminApi.get<{ orders: Order[]; meta: Meta; stats: Stats }>(`/api/admin/orders?${params}`)
      .then(d => { setOrders(d.orders ?? []); setMeta(d.meta ?? null); setStats(d.stats ?? null); })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    fetchOrders('', '', '', 1);
  }, [router, fetchOrders]);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchOrders(value, statusFilter, paymentFilter, 1), 350);
  }

  function handleStatus(value: string) {
    setStatusFilter(value);
    setPage(1);
    fetchOrders(search, value, paymentFilter, 1);
  }

  function handlePayment(value: string) {
    setPaymentFilter(value);
    setPage(1);
    fetchOrders(search, statusFilter, value, 1);
  }

  function handlePage(p: number) {
    setPage(p);
    fetchOrders(search, statusFilter, paymentFilter, p);
  }

  function clearAll() {
    setSearch(''); setStatusFilter(''); setPaymentFilter(''); setPage(1);
    fetchOrders('', '', '', 1);
  }

  async function updateStatus(id: number, status: string) {
    setUpdating(id);
    try {
      await adminApi.patch(`/api/admin/orders/${id}/status`, { status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch { /* ignore */ } finally {
      setUpdating(null);
    }
  }

  const hasFilters = search || statusFilter || paymentFilter;

  return (
    <div className="flex flex-col gap-5">
      {/* Stats strip — clickable to filter by status */}
      {stats && (
        <div className="grid grid-cols-5 gap-3">
          {([
            { label: 'Total', value: stats.total, key: '', color: 'text-slate-800' },
            { label: 'Pending', value: stats.pending, key: 'pending', color: 'text-amber-600' },
            { label: 'Processing', value: stats.processing, key: 'processing', color: 'text-blue-600' },
            { label: 'Completed', value: stats.completed, key: 'completed', color: 'text-green-600' },
            { label: 'Cancelled', value: stats.cancelled, key: 'cancelled', color: 'text-red-500' },
          ] as const).map(s => (
            <button
              key={s.label}
              onClick={() => handleStatus(s.key)}
              className={`bg-white border rounded-xl px-4 py-3 text-left transition-all hover:shadow-sm ${statusFilter === s.key && s.key !== '' ? 'border-blue-300 ring-2 ring-blue-50' : 'border-slate-100'}`}
            >
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
            </button>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Search & filter bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search customer, reg, tyre…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
            {search && (
              <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={e => handleStatus(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-400 bg-white text-slate-700 cursor-pointer"
          >
            <option value="">All Statuses</option>
            {['pending','processing','completed','cancelled'].map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>
            ))}
          </select>

          <select
            value={paymentFilter}
            onChange={e => handlePayment(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-400 bg-white text-slate-700 cursor-pointer"
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="not_paid">Unpaid</option>
          </select>

          {hasFilters && (
            <button onClick={clearAll} className="text-xs text-blue-600 font-semibold hover:underline whitespace-nowrap">
              Clear all
            </button>
          )}

          <span className="ml-auto text-sm text-slate-400">
            {meta ? `${meta.total} order${meta.total !== 1 ? 's' : ''}` : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-3 text-left">Order</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Address</th>
                  <th className="px-6 py-3 text-left">Reg</th>
                  <th className="px-6 py-3 text-left">Tyre</th>
                  <th className="px-6 py-3 text-left">Fitting Date & Time</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Payment</th>
                  <th className="px-6 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-slate-400">
                      {hasFilters ? 'No orders match your search.' : 'No orders yet'}
                    </td>
                  </tr>
                )}
                {orders.map(o => (
                  <tr key={o.id} onClick={e => { if ((e.target as HTMLElement).closest('select,button,a')) return; router.push(`/admin/orders/${o.id}`); }} className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {o.order_ref ?? `#ORD-${String(o.id).padStart(3, '0')}`}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <p className="font-medium">{o.user?.name ?? 'Guest'}</p>
                      {o.user?.email && <p className="text-xs text-slate-400">{o.user.email}</p>}
                      {o.user?.phone && <p className="text-xs text-slate-400">{o.user.phone}</p>}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {o.user?.address ? (
                        <>
                          <p>{o.user.address}</p>
                          {o.user.city && <p>{o.user.city}</p>}
                          {o.user.postcode && <p className="font-mono font-semibold">{o.user.postcode}</p>}
                        </>
                      ) : '—'}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600 text-xs">{o.vehicle_registration ?? '—'}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {o.tyre_brand} {o.tyre_model}<br />
                      <span className="text-xs text-slate-400">{o.tyre_size} × {o.tyre_quantity}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      <p>{fmtDate(o.fitting_date)}</p>
                      {o.slot && (
                        <p className="text-slate-400">{o.slot.start_time} – {o.slot.end_time}</p>
                      )}
                    </td>
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
                    <td className="px-6 py-4">
                      {o.payment_status === 'paid'
                        ? <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">✓ Paid</span>
                        : <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">Unpaid</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                      <div className="flex items-center justify-end gap-2">
                        £{Number(o.amount).toFixed(2)}
                        <button
                          title="Download Invoice"
                          onClick={e => {
                            e.stopPropagation();
                            const token = localStorage.getItem('admin_token');
                            fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/admin/orders/${o.id}/invoice`, {
                              headers: { Authorization: `Bearer ${token}` },
                            }).then(r => r.blob()).then(blob => {
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `invoice-${o.order_ref ?? o.id}.pdf`;
                              a.click();
                              URL.revokeObjectURL(url);
                            });
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {meta && meta.last_page > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Page {meta.current_page} of {meta.last_page} · {meta.total} orders
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => handlePage(page - 1)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              {Array.from({ length: Math.min(meta.last_page, 7) }, (_, i) => {
                const p = meta.last_page <= 7 ? i + 1 : Math.max(1, page - 3) + i;
                if (p > meta.last_page) return null;
                return (
                  <button
                    key={p}
                    onClick={() => handlePage(p)}
                    className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${p === page ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                disabled={page >= meta.last_page}
                onClick={() => handlePage(page + 1)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
