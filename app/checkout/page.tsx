'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, customerApi, type CheckoutConfig } from '@/lib/api';
import BookingProgress from '@/components/BookingProgress';

function CheckoutInner() {
  const router = useRouter();
  const params = useSearchParams();

  const slotId      = params.get('slot_id') ?? '';
  const fittingDate = params.get('fitting_date') ?? '';
  const tyreId      = params.get('tyre_id') ?? '';
  const qtyParam    = params.get('qty') ?? '1';

  const [config, setConfig]       = useState<CheckoutConfig | null>(null);
  const [coupon, setCoupon]       = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const [deliveryFee, setDeliveryFee]       = useState<number | null>(null);
  const [calculatingDelivery, setCalcDelivery] = useState(false);

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    address: '', city: '', postcode: '',
    vehicle_registration: params.get('tyre_id') ? '' : '',
    vehicle_make: '', vehicle_model: '',
    tyre_brand: params.get('tyre_brand') ?? '',
    tyre_model: params.get('tyre_model') ?? '',
    tyre_size: params.get('tyre_size') ?? '',
    tyre_quantity: qtyParam,
    tyre_unit_price: params.get('tyre_price') ?? '',
    customer_comment: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    api.get<CheckoutConfig>('/api/public/checkout-config').then(setConfig).catch(() => null);

    // Pre-fill from logged-in customer
    const raw = typeof window !== 'undefined' ? localStorage.getItem('customer_user') : null;
    if (raw) {
      try {
        const user = JSON.parse(raw);
        setForm(f => ({
          ...f,
          first_name: (user.name ?? '').split(' ')[0] ?? '',
          last_name: (user.name ?? '').split(' ').slice(1).join(' ') ?? '',
          email: user.email ?? '',
          phone: user.phone ?? '',
          address: user.address ?? '',
          city: user.city ?? '',
          postcode: user.postcode ?? '',
          vehicle_registration: user.vehicle_registration_number ?? '',
        }));
      } catch { /* ignore */ }
    }
  }, []);

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function calculateDelivery() {
    if (!form.postcode.trim()) return;
    setCalcDelivery(true);
    try {
      const d = await api.post<{ charge: number }>('/api/public/delivery-quote', { postcode: form.postcode });
      setDeliveryFee(d.charge ?? 0);
    } catch { setDeliveryFee(null); }
    finally { setCalcDelivery(false); }
  }

  async function applyCoupon() {
    if (!coupon.trim()) return;
    setCheckingCoupon(true); setCouponMsg(null);
    try {
      const d = await api.post<{ valid: boolean; message: string; discount?: number }>('/api/public/checkout', {
        coupon_code: coupon, _check_coupon_only: true,
      });
      setCouponMsg({ text: d.message ?? 'Coupon applied', ok: true });
    } catch (e: unknown) {
      const err = e as { message?: string };
      setCouponMsg({ text: err.message ?? 'Invalid coupon', ok: false });
    } finally { setCheckingCoupon(false); }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true); setError(null); setFieldErrors({});
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('customer_token') : null;
      const postFn = token
        ? (path: string, body: unknown) => customerApi.post<{ order: { id: number } }>(path, body)
        : (path: string, body: unknown) => api.post<{ order: { id: number } }>(path, body);

      const order = await postFn('/api/public/checkout', {
        ...form,
        slot_id: slotId,
        fitting_date: fittingDate,
        tyre_id: tyreId || undefined,
        tyre_quantity: Number(form.tyre_quantity),
        tyre_unit_price: Number(form.tyre_unit_price),
        coupon_code: coupon || undefined,
      });
      const orderId = order.order.id;
      const stripe = await api.post<{ url: string }>(`/api/public/orders/${orderId}/stripe-checkout`, {
        success_url: `${window.location.origin}/checkout/success?order_id=${orderId}`,
        cancel_url: `${window.location.origin}/booking`,
      });
      window.location.href = stripe.url;
    } catch (err: unknown) {
      const e = err as { message?: string; errors?: Record<string, string[]> };
      setError(e.message ?? 'Something went wrong. Please try again.');
      setFieldErrors(e.errors ?? {});
    } finally { setSubmitting(false); }
  }

  const unitPrice  = Number(form.tyre_unit_price) || 0;
  const qty        = Number(form.tyre_quantity) || 1;
  const subtotal   = unitPrice * qty;
  const vatAmount  = config?.vat_enabled ? subtotal * ((config.vat_percentage ?? 0) / 100) : 0;
  const tpmsCharge = config?.tpms_charge_enabled ? (config.tpms_charge ?? 0) : 0;
  const delivery   = deliveryFee ?? 0;
  const total      = subtotal + vatAmount + tpmsCharge + delivery;

  const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-slate-300';

  function Field({ label, k, type = 'text', required = true, placeholder = '' }: { label: string; k: keyof typeof form; type?: string; required?: boolean; placeholder?: string }) {
    return (
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}{required && ' *'}</label>
        <input type={type} required={required} value={form[k]} placeholder={placeholder}
          onChange={e => set(k, e.target.value)}
          className={INPUT + (fieldErrors[k] ? ' border-red-300 ring-2 ring-red-50' : '')} />
        {fieldErrors[k] && <p className="text-xs text-red-500 mt-1">{fieldErrors[k][0]}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#0d1b3e] text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <BookingProgress step={2} />
          <h1 className="text-2xl lg:text-3xl font-black">Booking Details &amp; Payment</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {fittingDate && (
          <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 rounded-2xl px-5 py-3.5 text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25"/></svg>
            Fitting date: <strong>{new Date(fittingDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm">{error}</div>
        )}

        <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Personal */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</span>
                Personal Details
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Field label="First Name" k="first_name" />
                <Field label="Last Name" k="last_name" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <Field label="Email" k="email" type="email" />
                <Field label="Phone" k="phone" type="tel" />
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">2</span>
                Fitting Address
              </h2>
              <div className="flex flex-col gap-3">
                <Field label="Street Address" k="address" placeholder="123 High Street" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City" k="city" placeholder="Coventry" />
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Postcode *</label>
                    <div className="flex gap-2">
                      <input type="text" required value={form.postcode} placeholder="CV1 1AA"
                        onChange={e => set('postcode', e.target.value)}
                        className={INPUT + ' flex-1'} />
                      <button type="button" onClick={calculateDelivery} disabled={calculatingDelivery || !form.postcode}
                        className="shrink-0 text-xs font-bold text-blue-600 border border-blue-200 px-3 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-40">
                        {calculatingDelivery ? '…' : 'Quote'}
                      </button>
                    </div>
                    {deliveryFee !== null && (
                      <p className="text-xs text-green-600 font-medium mt-1">
                        Delivery charge: {deliveryFee === 0 ? 'Free' : `£${deliveryFee.toFixed(2)}`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">3</span>
                Vehicle Details
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Reg Number" k="vehicle_registration" required={false} placeholder="AB12 CDE" />
                <Field label="Make" k="vehicle_make" required={false} placeholder="Ford" />
                <Field label="Model" k="vehicle_model" required={false} placeholder="Focus" />
              </div>
            </div>

            {/* Tyre */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">4</span>
                Tyre Details
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <Field label="Brand" k="tyre_brand" />
                <Field label="Model" k="tyre_model" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Size" k="tyre_size" placeholder="205/55R16" />
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Quantity *</label>
                  <select value={form.tyre_quantity} onChange={e => set('tyre_quantity', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all cursor-pointer">
                    {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <Field label="Price / tyre (£)" k="tyre_unit_price" type="number" placeholder="0.00" />
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Additional Comments</label>
              <textarea value={form.customer_comment} rows={3} onChange={e => set('customer_comment', e.target.value)}
                placeholder="Any special instructions, access notes, etc."
                className={INPUT + ' resize-none'} />
            </div>
          </div>

          {/* Sidebar — Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-slate-900 mb-5">Order Summary</h2>

              {form.tyre_brand && (
                <div className="bg-slate-50 rounded-xl p-3.5 mb-4 text-sm">
                  <p className="font-bold text-slate-800">{form.tyre_brand} {form.tyre_model}</p>
                  <p className="text-slate-500 font-mono text-xs mt-0.5">{form.tyre_size}</p>
                </div>
              )}

              <div className="flex flex-col gap-2 text-sm mb-4">
                {unitPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tyres × {qty}</span>
                    <span className="font-semibold text-slate-800">£{subtotal.toFixed(2)}</span>
                  </div>
                )}
                {vatAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">VAT ({config?.vat_percentage}%)</span>
                    <span className="font-semibold text-slate-800">£{vatAmount.toFixed(2)}</span>
                  </div>
                )}
                {tpmsCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">TPMS Service</span>
                    <span className="font-semibold text-slate-800">£{tpmsCharge.toFixed(2)}</span>
                  </div>
                )}
                {deliveryFee !== null && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : 'text-slate-800'}`}>
                      {deliveryFee === 0 ? 'Free' : `£${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                )}
                {total > 0 && (
                  <>
                    <div className="h-px bg-slate-100 my-1" />
                    <div className="flex justify-between font-bold text-base">
                      <span className="text-slate-800">Total</span>
                      <span className="text-slate-900">£{total.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Coupon */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Coupon Code</label>
                <div className="flex gap-2">
                  <input type="text" value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())}
                    placeholder="SAVE10"
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
                  <button type="button" onClick={applyCoupon} disabled={checkingCoupon || !coupon.trim()}
                    className="shrink-0 text-xs font-bold text-blue-600 border border-blue-200 px-3 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-40">
                    {checkingCoupon ? '…' : 'Apply'}
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-xs mt-1.5 font-medium ${couponMsg.ok ? 'text-green-600' : 'text-red-500'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              <button type="submit" disabled={submitting}
                className="w-full text-white font-bold py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>
                {submitting ? 'Processing…' : 'Pay with Stripe →'}
              </button>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                Secured by Stripe. We never store card details.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <Suspense><CheckoutInner /></Suspense>;
}
