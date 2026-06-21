'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { customerApi, type Order } from '@/lib/api';

const STATUS_STYLE: Record<string, string> = {
  pending:    'bg-amber-50 text-amber-700 border border-amber-200',
  processing: 'bg-blue-50 text-blue-700 border border-blue-200',
  completed:  'bg-green-50 text-green-700 border border-green-200',
  cancelled:  'bg-red-50 text-red-700 border border-red-200',
};
const PAYMENT_STYLE: Record<string, string> = {
  paid:    'bg-green-50 text-green-700 border border-green-200',
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  failed:  'bg-red-50 text-red-700 border border-red-200',
};

function fmt(dateStr: string | null | undefined) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
function fmtTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('customer_token');
    if (!token) { router.push('/login'); return; }
    customerApi.get<{ order: Order }>(`/api/customer/orders/${id}`)
      .then(r => setOrder(r.order))
      .catch(() => setError('Order not found.'))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !order) return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <p className="text-slate-500">{error || 'Order not found.'}</p>
      <Link href="/account" className="text-blue-600 font-semibold hover:underline">← Back to Account</Link>
    </div>
  );

  const ref = order.order_ref ?? `#ORD-${String(order.id).padStart(4, '0')}`;
  const total = order.amount ? `£${(Number(order.amount) / 100).toFixed(2)}` : '—';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#0d1b3e] text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/account" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-4 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            Back to My Account
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">Order Details</p>
              <h1 className="text-2xl font-black">{ref}</h1>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize ${STATUS_STYLE[order.status] ?? 'bg-slate-100 text-slate-600'}`}>
                {order.status}
              </span>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize ${PAYMENT_STYLE[order.payment_status ?? 'pending'] ?? 'bg-slate-100 text-slate-600'}`}>
                {order.payment_status ?? 'pending'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-5">

        {/* Fitting details */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
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
          </div>
        </div>

        {/* Tyre details */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Tyre Brand</p>
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
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Tyre Size</p>
                <p className="text-slate-800 font-semibold">{order.tyre_size}</p>
              </div>
            )}
            {order.tyre_quantity && (
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Quantity</p>
                <p className="text-slate-800 font-semibold">{order.tyre_quantity} tyre{order.tyre_quantity > 1 ? 's' : ''}</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            Payment
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Paid</p>
              <p className="text-2xl font-black text-slate-900">{total}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Payment Status</p>
              <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full capitalize ${PAYMENT_STYLE[order.payment_status ?? 'pending'] ?? ''}`}>
                {order.payment_status ?? 'pending'}
              </span>
            </div>
            {order.paid_at && (
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Paid On</p>
                <p className="text-slate-800 font-semibold">{fmt(order.paid_at)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {order.customer_comment && (
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-slate-900 mb-3">Your Notes</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{order.customer_comment}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/account"
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">
            ← Back to Account
          </Link>
          <a href="https://wa.me/447721570075" target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </a>
          <Link href="/tyres"
            className="flex-1 flex items-center justify-center gap-2 text-white font-bold py-3.5 rounded-xl text-sm transition-colors"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
            Book Again
          </Link>
        </div>
      </div>
    </div>
  );
}
