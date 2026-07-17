'use client';
import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, customerApi, type CheckoutConfig } from '@/lib/api';
import BookingProgress from '@/components/BookingProgress';

const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-slate-300';
const LABEL = 'block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5';

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
  const [deliveryFee, setDeliveryFee]           = useState<number | null>(null);
  const [outOfRange, setOutOfRange]             = useState(false);
  const [deliveryError, setDeliveryError]       = useState<string | null>(null);
  const [calculatingDelivery, setCalcDelivery]  = useState(false);
  const deliveryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    address: '', city: '', postcode: '',
    vehicle_registration: '',
    vehicle_make: '', vehicle_model: '',
    tyre_brand: params.get('tyre_brand') ?? '',
    tyre_model: params.get('tyre_model') ?? '',
    tyre_size: params.get('tyre_size') ?? '',
    tyre_quantity: qtyParam,
    tyre_unit_price: params.get('tyre_price') ?? '',
    customer_comment: '',
  });

  const [submitting, setSubmitting]   = useState(false);
  const [error, setError]             = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [tpmsSelected, setTpmsSelected] = useState(false);

  useEffect(() => {
    api.get<CheckoutConfig>('/api/public/checkout-config').then(setConfig).catch(() => null);
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

  function set(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }));
    if (k === 'postcode') {
      const pc = v.replace(/\s/g, '');
      if (deliveryTimer.current) clearTimeout(deliveryTimer.current);
      if (pc.length >= 5) {
        deliveryTimer.current = setTimeout(() => autoQuoteDelivery(v), 700);
      } else {
        setDeliveryFee(null);
        setOutOfRange(false);
      }
    }
  }

  async function autoQuoteDelivery(postcode: string) {
    const pc = postcode.trim();
    if (pc.length < 5) return;
    setCalcDelivery(true);
    setOutOfRange(false);
    setDeliveryError(null);
    try {
      const d = await api.post<{ delivery_charge: number; out_of_range: boolean }>('/api/public/delivery-quote', { postcode: pc });
      if (d.out_of_range) {
        setOutOfRange(true);
        setDeliveryFee(null);
      } else {
        setDeliveryFee(d.delivery_charge ?? 0);
      }
    } catch (e: unknown) {
      const msg = (e as { message?: string })?.message ?? 'Could not calculate delivery';
      setDeliveryError(msg);
      setDeliveryFee(null);
    }
    finally { setCalcDelivery(false); }
  }

  function applyCoupon() {
    if (!coupon.trim()) return;
    setCouponMsg({ text: 'Coupon will be applied at checkout', ok: true });
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
        success_url: `${window.location.origin}/checkout/success?order_id=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/booking`,
      });
      window.location.href = stripe.url;
    } catch (err: unknown) {
      const e = err as { message?: string; errors?: Record<string, string[]> };
      setError(e.message ?? 'Something went wrong. Please try again.');
      setFieldErrors(e.errors ?? {});
    } finally { setSubmitting(false); }
  }

  const unitPrice   = Number(form.tyre_unit_price) || 0;
  const qty         = Number(form.tyre_quantity) || 1;
  const subtotal    = unitPrice * qty;
  const vatAmount   = config?.vat_enabled ? subtotal * ((config.vat_percentage ?? 0) / 100) : 0;
  const tpmsRate    = config?.tpms_charge_enabled ? (config.tpms_charge ?? 0) : 0;
  const tpmsCharge  = tpmsSelected ? tpmsRate : 0;
  const delivery    = deliveryFee ?? 0;
  const total       = subtotal + vatAmount + tpmsCharge + delivery;

  function err(k: string) {
    return fieldErrors[k] ? ' border-red-300 ring-2 ring-red-50' : '';
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
                <div>
                  <label className={LABEL}>First Name *</label>
                  <input type="text" required value={form.first_name} onChange={e => set('first_name', e.target.value)} className={INPUT + err('first_name')} />
                  {fieldErrors.first_name && <p className="text-xs text-red-500 mt-1">{fieldErrors.first_name[0]}</p>}
                </div>
                <div>
                  <label className={LABEL}>Last Name *</label>
                  <input type="text" required value={form.last_name} onChange={e => set('last_name', e.target.value)} className={INPUT + err('last_name')} />
                  {fieldErrors.last_name && <p className="text-xs text-red-500 mt-1">{fieldErrors.last_name[0]}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className={LABEL}>Email *</label>
                  <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} className={INPUT + err('email')} />
                  {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email[0]}</p>}
                </div>
                <div>
                  <label className={LABEL}>Phone *</label>
                  <input type="tel" required value={form.phone} onChange={e => set('phone', e.target.value)} className={INPUT + err('phone')} />
                  {fieldErrors.phone && <p className="text-xs text-red-500 mt-1">{fieldErrors.phone[0]}</p>}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">2</span>
                Fitting Address
              </h2>
              <div className="flex flex-col gap-3">
                <div>
                  <label className={LABEL}>Street Address *</label>
                  <input type="text" required value={form.address} placeholder="123 High Street" onChange={e => set('address', e.target.value)} className={INPUT + err('address')} />
                  {fieldErrors.address && <p className="text-xs text-red-500 mt-1">{fieldErrors.address[0]}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LABEL}>City *</label>
                    <input type="text" required value={form.city} placeholder="Coventry" onChange={e => set('city', e.target.value)} className={INPUT + err('city')} />
                    {fieldErrors.city && <p className="text-xs text-red-500 mt-1">{fieldErrors.city[0]}</p>}
                  </div>
                  <div>
                    <label className={LABEL}>Postcode *</label>
                    <div className="relative">
                      <input type="text" required value={form.postcode} placeholder="CV1 1AA"
                        onChange={e => set('postcode', e.target.value)}
                        className={INPUT + err('postcode')} />
                      {calculatingDelivery && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                    {fieldErrors.postcode && <p className="text-xs text-red-500 mt-1">{fieldErrors.postcode[0]}</p>}
                    {!calculatingDelivery && outOfRange && (
                      <p className="text-xs text-red-600 font-medium mt-1">
                        ✗ Sorry, we don't currently cover this area. Please call us to arrange.
                      </p>
                    )}
                    {!calculatingDelivery && deliveryError && (
                      <p className="text-xs text-red-500 mt-1">✗ {deliveryError}</p>
                    )}
                    {deliveryFee !== null && !calculatingDelivery && !outOfRange && (
                      <p className="text-xs text-green-600 font-medium mt-1">
                        ✓ Delivery charge: {deliveryFee === 0 ? 'Free' : `£${deliveryFee.toFixed(2)}`}
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
                <div>
                  <label className={LABEL}>Reg Number</label>
                  <input type="text" value={form.vehicle_registration} placeholder="AB12 CDE" onChange={e => set('vehicle_registration', e.target.value)} className={INPUT} />
                </div>
                <div>
                  <label className={LABEL}>Make</label>
                  <input type="text" value={form.vehicle_make} placeholder="Ford" onChange={e => set('vehicle_make', e.target.value)} className={INPUT} />
                </div>
                <div>
                  <label className={LABEL}>Model</label>
                  <input type="text" value={form.vehicle_model} placeholder="Focus" onChange={e => set('vehicle_model', e.target.value)} className={INPUT} />
                </div>
              </div>
            </div>

            {/* Tyre */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">4</span>
                Tyre Details
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={LABEL}>Brand *</label>
                  <input type="text" required value={form.tyre_brand} onChange={e => set('tyre_brand', e.target.value)} className={INPUT + err('tyre_brand')} />
                  {fieldErrors.tyre_brand && <p className="text-xs text-red-500 mt-1">{fieldErrors.tyre_brand[0]}</p>}
                </div>
                <div>
                  <label className={LABEL}>Model *</label>
                  <input type="text" required value={form.tyre_model} onChange={e => set('tyre_model', e.target.value)} className={INPUT + err('tyre_model')} />
                  {fieldErrors.tyre_model && <p className="text-xs text-red-500 mt-1">{fieldErrors.tyre_model[0]}</p>}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={LABEL}>Size *</label>
                  <input type="text" required value={form.tyre_size} placeholder="205/55R16" onChange={e => set('tyre_size', e.target.value)} className={INPUT + err('tyre_size')} />
                  {fieldErrors.tyre_size && <p className="text-xs text-red-500 mt-1">{fieldErrors.tyre_size[0]}</p>}
                </div>
                <div>
                  <label className={LABEL}>Quantity *</label>
                  <select value={form.tyre_quantity} onChange={e => set('tyre_quantity', e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all cursor-pointer">
                    {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className={LABEL}>Price / tyre (£)</label>
                  <div className={INPUT + ' bg-slate-50 text-slate-700 cursor-default'}>£{Number(form.tyre_unit_price).toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <label className={LABEL}>Additional Comments</label>
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
                {tpmsRate > 0 && (
                  <div className="flex items-center justify-between py-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={tpmsSelected} onChange={e => setTpmsSelected(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                      <span className="text-slate-600 text-sm">TPMS Diagnostic <span className="text-xs text-slate-400">(optional)</span></span>
                    </label>
                    <span className="font-semibold text-slate-800">£{tpmsRate.toFixed(2)}</span>
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
                <label className={LABEL}>Coupon Code</label>
                <div className="flex gap-2">
                  <input type="text" value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())}
                    placeholder="SAVE10"
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
                  <button type="button" onClick={applyCoupon} disabled={!coupon.trim()}
                    className="shrink-0 text-xs font-bold text-blue-600 border border-blue-200 px-3 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-40">
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-xs mt-1.5 font-medium ${couponMsg.ok ? 'text-green-600' : 'text-red-500'}`}>
                    {couponMsg.text}
                  </p>
                )}
              </div>

              <button type="submit" disabled={submitting || outOfRange}
                className="w-full text-white font-bold py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{ background: outOfRange ? '#94a3b8' : 'linear-gradient(135deg,#1e3a8a,#4f46e5)', boxShadow: outOfRange ? 'none' : '0 4px 16px rgba(79,70,229,0.3)' }}>
                {submitting ? 'Processing…' : outOfRange ? 'Area Not Covered' : 'Pay with Stripe →'}
              </button>
              {outOfRange && (
                <p className="mt-3 text-center text-xs text-slate-500">
                  Call us on <a href="tel:07721570075" className="font-bold text-blue-600 underline">07721 570075</a> to discuss your location.
                </p>
              )}

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
