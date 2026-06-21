'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api, type Order } from '@/lib/api';

const PHONE = process.env.NEXT_PUBLIC_PHONE ?? '919392599067';

function SuccessInner() {
  const params  = useSearchParams();
  const orderId = params.get('order_id');
  const [order, setOrder]     = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) { setLoading(false); return; }
    api.get<{ order: Order }>(`/api/public/orders/${orderId}`)
      .then(d => setOrder(d.order))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading…</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

          {/* icon */}
          <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Matrix Mobile Tyres</p>
          <h1 className="text-center text-2xl font-extrabold text-gray-900 mb-2">Payment confirmed</h1>
          <p className="text-center text-sm text-gray-500 mb-6">Your booking is locked in. A confirmation email is on its way.</p>

          {order && (
            <div className="border border-gray-100 rounded-xl overflow-hidden mb-6 text-sm">
              {(
                [
                  ['Order', `#${order.id}`],
                  ['Service', order.service_type],
                  ['Tyre', `${order.tyre_brand} ${order.tyre_model} · ${order.tyre_size} ×${order.tyre_quantity}`],
                  ...(order.vehicle_registration ? [['Vehicle', order.vehicle_registration]] : []),
                  ...(order.fitting_date ? [['Fitting date', order.fitting_date]] : []),
                  ['Total paid', `£${Number(order.amount).toFixed(2)}`],
                  ['Status', order.payment_status],
                ] as [string, string][]
              ).map(([label, value], i) => (
                <div key={label} className={`flex justify-between px-4 py-2.5 ${i % 2 === 1 ? 'bg-gray-50' : ''}`}>
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold text-gray-900 text-right">{value}</span>
                </div>
              ))}
            </div>
          )}

          <Link href="/"
            className="block w-full text-center bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors">
            Return to home
          </Link>

          <div className="mt-4 flex gap-2.5 p-3 rounded-xl bg-orange-50 border border-orange-200">
            <span className="text-orange-400 shrink-0 mt-0.5">⚠️</span>
            <p className="text-xs text-orange-800 leading-relaxed">
              <strong>Need same-day fitting?</strong> Contact us via{' '}
              <a href={`tel:+${PHONE}`} className="font-bold underline">call</a> or{' '}
              <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" className="font-bold underline">WhatsApp</a>.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">Matrix Mobile Tyres</p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return <Suspense><SuccessInner /></Suspense>;
}
