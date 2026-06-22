'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { adminApi } from '@/lib/adminApi';

type Slot = { id: number; day: string; start_time: string; end_time: string };
type User = { id: number; name: string; email: string; phone?: string };
type Order = {
  id: number; order_ref?: string; status: string; payment_status: string;
  amount: number; payment_provider?: string; paid_at?: string;
  tyre_brand?: string; tyre_model?: string; tyre_size?: string; tyre_quantity?: number;
  vehicle_registration?: string; vehicle_make?: string; vehicle_model?: string;
  service_type?: string; fitting_date?: string; notes?: string;
  coupon_code?: string; created_at: string;
  user?: User; slot?: Slot;
};

const STATUS_OPTS = ['pending', 'processing', 'completed', 'cancelled'];
const STATUS_STYLE: Record<string, string> = {
  pending:    'bg-amber-50 text-amber-700 border-amber-200',
  processing: 'bg-blue-50 text-blue-700 border-blue-200',
  completed:  'bg-green-50 text-green-700 border-green-200',
  cancelled:  'bg-red-50 text-red-700 border-red-200',
};
const PAYMENT_STYLE: Record<string, string> = {
  paid:    'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  failed:  'bg-red-50 text-red-700 border-red-200',
};

function fmt(d?: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function fmtTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

export default function AdminOrderDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    adminApi.get<{ data: Order }>(`/api/admin/orders/${id}`)
      .then(r => { setOrder(r.data); setStatus(r.data.status); })
      .catch(() => router.push('/admin/orders'))
      .finally(() => setLoading(false));
  }, [id, router]);

  async function saveStatus() {
    if (!order || status === order.status) return;
    setSaving(true);
    try {
      await adminApi.patch(`/api/admin/orders/${order.id}/status`, { status });
      setOrder(o => o ? { ...o, status } : o);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { /* ignore */ } finally { setSaving(false); }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!order) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <p className="text-slate-500">Order not found.</p>
      <Link href="/admin/orders" className="text-blue-600 font-semibold hover:underline">← Back to Orders</Link>
    </div>
  );

  const ref = order.order_ref ?? `#ORD-${String(order.id).padStart(4, '0')}`;
  const total = order.amount ? `£${Number(order.amount).toFixed(2)}` : '—';

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <Link href="/admin/orders" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-700 text-sm mb-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            All Orders
          </Link>
          <h1 className="text-xl font-black text-slate-900">{ref}</h1>
          <p className="text-slate-400 text-xs mt-0.5">Placed {fmt(order.created_at)}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize border ${STATUS_STYLE[order.status] ?? 'bg-slate-100 text-slate-600'}`}>
            {order.status}
          </span>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize border ${PAYMENT_STYLE[order.payment_status ?? 'pending'] ?? 'bg-slate-100 text-slate-600'}`}>
            {order.payment_status ?? 'pending'}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left: main details */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Fitting */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Fitting Appointment
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Date</p>
                <p className="text-slate-800 font-semibold">{fmt(order.fitting_date)}</p>
              </div>
              {order.slot && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Time Slot</p>
                  <p className="text-slate-800 font-semibold capitalize">
                    {order.slot.day} · {fmtTime(order.slot.start_time)} – {fmtTime(order.slot.end_time)}
                  </p>
                </div>
              )}
              {order.service_type && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Service</p>
                  <p className="text-slate-800 font-semibold capitalize">{order.service_type}</p>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle & Tyre */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
              Tyre &amp; Vehicle
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              {order.vehicle_registration && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Registration</p>
                  <span className="inline-block bg-yellow-400 text-slate-900 font-black px-3 py-1 rounded text-sm tracking-widest">
                    {order.vehicle_registration}
                  </span>
                </div>
              )}
              {(order.vehicle_make || order.vehicle_model) && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Vehicle</p>
                  <p className="text-slate-800 font-semibold">{[order.vehicle_make, order.vehicle_model].filter(Boolean).join(' ')}</p>
                </div>
              )}
              {order.tyre_brand && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Brand</p>
                  <p className="text-slate-800 font-semibold">{order.tyre_brand}</p>
                </div>
              )}
              {order.tyre_model && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Tyre Model</p>
                  <p className="text-slate-800 font-semibold">{order.tyre_model}</p>
                </div>
              )}
              {order.tyre_size && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Size</p>
                  <p className="text-slate-800 font-semibold">{order.tyre_size}</p>
                </div>
              )}
              {order.tyre_quantity && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Qty</p>
                  <p className="text-slate-800 font-semibold">{order.tyre_quantity} tyre{order.tyre_quantity > 1 ? 's' : ''}</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-slate-900 mb-3 text-sm">Customer Notes</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Right: customer + payment + status */}
        <div className="flex flex-col gap-5">

          {/* Customer */}
          {order.user && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-slate-900 mb-4 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                Customer
              </h2>
              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Name</p>
                  <p className="text-slate-800 font-semibold">{order.user.name}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Email</p>
                  <a href={`mailto:${order.user.email}`} className="text-blue-600 hover:underline break-all">{order.user.email}</a>
                </div>
                {order.user.phone && (
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Phone</p>
                    <a href={`tel:${order.user.phone}`} className="text-blue-600 hover:underline">{order.user.phone}</a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payment */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-4 text-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
              Payment
            </h2>
            <div className="flex flex-col gap-3 text-sm">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Total</p>
                <p className="text-2xl font-black text-slate-900">{total}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Payment Status</p>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full capitalize border ${PAYMENT_STYLE[order.payment_status ?? 'pending'] ?? ''}`}>
                  {order.payment_status ?? 'pending'}
                </span>
              </div>
              {order.payment_provider && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Provider</p>
                  <p className="text-slate-800 font-semibold capitalize">{order.payment_provider}</p>
                </div>
              )}
              {order.paid_at && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Paid On</p>
                  <p className="text-slate-800 font-semibold">{fmt(order.paid_at)}</p>
                </div>
              )}
              {order.coupon_code && (
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-0.5">Coupon</p>
                  <p className="text-slate-800 font-mono font-semibold">{order.coupon_code}</p>
                </div>
              )}
            </div>
          </div>

          {/* Update Status */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-4 text-sm">Update Status</h2>
            <div className="flex flex-col gap-2">
              {STATUS_OPTS.map(s => (
                <label key={s} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${status === s ? 'border-blue-400 bg-blue-50' : 'border-slate-100 hover:bg-slate-50'}`}>
                  <input type="radio" name="status" value={s} checked={status === s} onChange={() => setStatus(s)} className="accent-blue-600" />
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize border ${STATUS_STYLE[s] ?? ''}`}>{s}</span>
                </label>
              ))}
            </div>
            <button
              onClick={saveStatus}
              disabled={saving || status === order.status}
              className="mt-4 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}
            >
              {saving ? 'Saving…' : saved ? '✓ Saved' : 'Save Status'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
