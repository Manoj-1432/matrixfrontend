'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api, type Order } from '@/lib/api';

const PHONE = '07721570075';
const WA    = 'https://wa.me/447721570075';

function fmt(date?: string) {
  if (!date) return '—';
  return new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function SuccessInner() {
  const params  = useSearchParams();
  const orderId = params.get('order_id');
  const [order, setOrder]     = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) { setLoading(false); return; }
    api.get<{ order: Order }>(`/api/public/orders/${orderId}`)
      .then(d => setOrder(d.order))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          {/* Top bar */}
          <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg,#16a34a,#059669)' }} />

          <div className="p-8">
            {/* Success icon */}
            <div className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-1">Matrix Mobile Tyres</p>
            <h1 className="text-center text-2xl font-black text-slate-900 mb-2">Booking Confirmed!</h1>
            <p className="text-center text-sm text-slate-500 mb-8 max-w-xs mx-auto">
              Your payment was successful and your fitting is booked. A confirmation email is on its way.
            </p>

            {order && (
              <div className="border border-slate-100 rounded-2xl overflow-hidden mb-6">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Order Details</p>
                </div>
                {([
                  ['Order Reference', order.order_ref ?? `#ORD-${String(order.id).padStart(4,'0')}`],
                  ['Tyre', `${order.tyre_brand} ${order.tyre_model} · ${order.tyre_size} × ${order.tyre_quantity}`],
                  ...(order.vehicle_registration ? [['Vehicle', order.vehicle_registration] as [string, string]] : []),
                  ['Fitting Date', fmt(order.fitting_date)],
                  ['Total Paid', `£${Number(order.amount).toFixed(2)}`],
                  ['Payment', order.payment_status],
                ] as [string, string][]).map(([label, value], i) => (
                  <div key={label} className={`flex items-start justify-between gap-4 px-5 py-3 ${i % 2 === 1 ? 'bg-slate-50/50' : ''}`}>
                    <span className="text-sm text-slate-500 shrink-0">{label}</span>
                    <span className="text-sm font-semibold text-slate-900 text-right">{value}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Link href="/"
                className="flex items-center justify-center w-full text-white font-bold py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>
                Return to Home
              </Link>
              <Link href="/account"
                className="flex items-center justify-center w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl text-sm transition-colors">
                View My Orders
              </Link>
            </div>

            <div className="mt-5 flex gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
              <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
              </svg>
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Need to change your booking?</strong> Contact us via{' '}
                <a href={`tel:${PHONE}`} className="font-bold underline">{PHONE}</a> or{' '}
                <a href={WA} target="_blank" rel="noopener noreferrer" className="font-bold underline">WhatsApp</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return <Suspense><SuccessInner /></Suspense>;
}
