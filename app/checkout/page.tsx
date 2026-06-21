'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

function CheckoutInner() {
  const router = useRouter();
  const params = useSearchParams();
  const slotId     = params.get('slot_id') ?? '';
  const fittingDate= params.get('fitting_date') ?? '';

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    address: '', city: '', postcode: '',
    vehicle_registration: '', vehicle_make: '', vehicle_model: '',
    tyre_brand: '', tyre_model: '', tyre_size: '', tyre_quantity: '1', tyre_unit_price: '',
    customer_comment: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});
    try {
      const order = await api.post<{ order: { id: number } }>('/api/public/checkout', {
        ...form,
        slot_id: slotId,
        fitting_date: fittingDate,
        tyre_quantity: Number(form.tyre_quantity),
        tyre_unit_price: Number(form.tyre_unit_price),
      });
      const orderId = order.order.id;

      const stripe = await api.post<{ url: string }>(`/api/public/orders/${orderId}/stripe-checkout`, {
        success_url: `${window.location.origin}/checkout/success?order_id=${orderId}`,
        cancel_url:  `${window.location.origin}/booking`,
      });
      window.location.href = stripe.url;
    } catch (err: unknown) {
      const e = err as { message?: string; errors?: Record<string, string[]> };
      setError(e.message ?? 'Something went wrong.');
      setFieldErrors(e.errors ?? {});
    } finally {
      setSubmitting(false);
    }
  }

  function field(label: string, key: keyof typeof form, type = 'text', required = true) {
    return (
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">{label}{required && ' *'}</label>
        <input
          type={type}
          required={required}
          value={form[key]}
          onChange={e => set(key, e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-500 transition-colors"
        />
        {fieldErrors[key] && <p className="text-xs text-red-500 mt-1">{fieldErrors[key][0]}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Booking Details</h1>

        {fittingDate && (
          <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 text-sm text-green-800 font-medium">
            📅 Fitting date: <strong>{fittingDate}</strong>
          </div>
        )}

        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={submit} className="flex flex-col gap-5">

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-800 mb-4">Personal Details</h2>
            <div className="grid grid-cols-2 gap-3">
              {field('First Name', 'first_name')}
              {field('Last Name', 'last_name')}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {field('Email', 'email', 'email')}
              {field('Phone', 'phone', 'tel')}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-800 mb-4">Fitting Address</h2>
            <div className="flex flex-col gap-3">
              {field('Address', 'address')}
              <div className="grid grid-cols-2 gap-3">
                {field('City', 'city')}
                {field('Postcode', 'postcode')}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-800 mb-4">Vehicle</h2>
            <div className="grid grid-cols-3 gap-3">
              {field('Reg Number', 'vehicle_registration', 'text', false)}
              {field('Make', 'vehicle_make', 'text', false)}
              {field('Model', 'vehicle_model', 'text', false)}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-gray-800 mb-4">Tyre Details</h2>
            <div className="grid grid-cols-2 gap-3">
              {field('Brand', 'tyre_brand')}
              {field('Model', 'tyre_model')}
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {field('Size', 'tyre_size')}
              {field('Quantity', 'tyre_quantity', 'number')}
              {field('Price per tyre (£)', 'tyre_unit_price', 'number')}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Additional Comments</label>
            <textarea
              value={form.customer_comment}
              onChange={e => set('customer_comment', e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-base transition-colors">
            {submitting ? 'Processing…' : 'Proceed to Payment'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <Suspense><CheckoutInner /></Suspense>;
}
