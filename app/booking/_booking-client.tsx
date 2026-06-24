'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, type Slot, type CheckoutConfig, type TyreResult } from '@/lib/api';
import BookingProgress from '@/components/BookingProgress';

const DAY_ABBR   = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const MON_ABBR   = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DAY_NAMES  = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
const PHONE      = '07721570075';
const DAYS_AHEAD = 21;

function fmt12(t: string) {
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

function BookingInner() {
  const router = useRouter();
  const params = useSearchParams();
  const tyreId    = params.get('tyre_id');
  const tyreBrand = params.get('tyre_brand') ?? '';
  const tyreModel = params.get('tyre_model') ?? '';
  const tyreSize  = params.get('tyre_size') ?? '';
  const tyrePrice = params.get('tyre_price') ?? '';

  const [tyre, setTyre] = useState<TyreResult | null>(null);
  const [allSlots, setAllSlots]     = useState<Slot[]>([]);
  const [today, setToday]           = useState('');
  const [occupiedKeys, setOccupied] = useState<Set<string>>(new Set());
  const [selectedDate, setSelDate]  = useState<string | null>(null);
  const [selectedSlot, setSelSlot]  = useState<Slot | null>(null);
  const [loadingSlots, setLoadSlots]= useState(false);
  const [qty, setQty]               = useState(1);

  useEffect(() => {
    const now = new Date();
    const t = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    setToday(t);
    Promise.all([
      api.get<{ slots: Slot[] }>('/api/public/slots'),
      api.get<CheckoutConfig>('/api/public/checkout-config'),
    ]).then(([sData]) => setAllSlots(sData.slots ?? []));

    if (tyreId) {
      api.get<{ tyre: TyreResult }>(`/api/public/tyres/${tyreId}`)
        .then(d => setTyre(d.tyre))
        .catch(() => null);
    }
  }, [tyreId]);

  const dates = Array.from({ length: DAYS_AHEAD }, (_, i) => {
    const d = new Date(today + 'T00:00:00');
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  async function pickDate(iso: string) {
    setSelDate(iso); setSelSlot(null); setLoadSlots(true);
    try {
      const data = await api.get<{ occupancy: { slot_id: number; date: string }[] }>(
        `/api/public/slots/occupancy?from=${iso}&to=${iso}`
      );
      setOccupied(new Set((data.occupancy ?? []).map(o => `${o.slot_id}_${o.date}`)));
    } finally { setLoadSlots(false); }
  }

  function proceed() {
    if (!selectedDate || !selectedSlot) return;
    const p = new URLSearchParams({
      slot_id: String(selectedSlot.id),
      fitting_date: selectedDate,
      qty: String(qty),
    });
    if (tyreId) p.set('tyre_id', tyreId);
    if (tyreBrand) p.set('tyre_brand', tyreBrand);
    if (tyreModel) p.set('tyre_model', tyreModel);
    if (tyreSize)  p.set('tyre_size', tyreSize);
    if (tyrePrice) p.set('tyre_price', tyrePrice);
    router.push(`/checkout?${p}`);
  }

  const daySlots = selectedDate
    ? allSlots.filter(s => s.day === DAY_NAMES[new Date(selectedDate + 'T00:00:00').getDay()])
    : [];

  const displayBrand = tyre ? (tyre.brand_name ?? tyre.brand ?? tyreBrand) : tyreBrand;
  const displayModel = tyre?.model ?? tyreModel;
  const displaySize  = tyre ? (tyre.size_label ?? tyre.size ?? tyreSize) : tyreSize;
  const displayPrice = tyre ? Number(tyre.price) : Number(tyrePrice);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#0d1b3e] text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <BookingProgress step={1} />
          <h1 className="text-2xl lg:text-3xl font-black">Select Fitting Date &amp; Slot</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tyre summary */}
        {(displayBrand || displayModel) && (
          <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-6 flex items-center justify-between gap-4 shadow-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">Selected Tyre</p>
              <p className="font-bold text-slate-900">{displayBrand} {displayModel}</p>
              {displaySize && <p className="text-sm text-slate-500 font-mono">{displaySize}</p>}
            </div>
            <div className="text-right shrink-0">
              {displayPrice > 0 && <p className="text-xl font-black text-slate-900">£{displayPrice.toFixed(2)}</p>}
              <div className="flex items-center gap-2 mt-1 justify-end">
                <label className="text-xs text-slate-500 font-medium">Qty:</label>
                <select value={qty} onChange={e => setQty(Number(e.target.value))}
                  className="border border-slate-200 rounded-lg px-2 py-1 text-sm font-bold text-slate-700 outline-none focus:border-blue-400">
                  {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Date picker */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Select a Date</p>
            <div className="grid grid-cols-5 gap-1.5">
              {!today ? (
                <div className="col-span-5 flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : dates.map(d => {
                const iso  = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
                const isSel = iso === selectedDate;
                return (
                  <button key={iso} onClick={() => pickDate(iso)}
                    className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border text-xs font-semibold transition-all duration-150 ${
                      isSel ? 'bg-[#0d1b3e] border-[#0d1b3e] text-white shadow-md' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                    }`}>
                    <span className={`text-[0.6rem] font-bold tracking-wide ${isSel ? 'text-blue-300' : 'text-slate-400'}`}>
                      {DAY_ABBR[d.getDay()]}
                    </span>
                    <span className="text-sm font-black leading-tight">{d.getDate()}</span>
                    <span className={`text-[0.6rem] ${isSel ? 'text-blue-300' : 'text-slate-400'}`}>
                      {MON_ABBR[d.getMonth()]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200">
              <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
              </svg>
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Same-day fitting?</strong> Call or{' '}
                <a href="https://wa.me/447721570075" className="font-bold underline" target="_blank" rel="noopener noreferrer">WhatsApp</a> us directly on{' '}
                <a href={`tel:${PHONE}`} className="font-bold underline">{PHONE}</a>.
              </p>
            </div>
          </div>

          {/* Slot picker */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              {selectedDate
                ? `Available Slots — ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}`
                : 'Available Slots'}
            </p>

            {!selectedDate && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <svg className="w-10 h-10 text-slate-200 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
                </svg>
                <p className="text-slate-400 text-sm">Select a date on the left to see available time slots.</p>
              </div>
            )}

            {loadingSlots && (
              <div className="flex justify-center py-10">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loadingSlots && selectedDate && daySlots.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm">No slots available on this day.<br />Please choose another date.</div>
            )}

            <div className="grid grid-cols-2 gap-2">
              {!loadingSlots && daySlots.map(slot => {
                const booked = occupiedKeys.has(`${slot.id}_${selectedDate}`);
                const isSel  = selectedSlot?.id === slot.id;
                return (
                  <button key={slot.id} disabled={booked} onClick={() => setSelSlot(slot)}
                    className={`flex flex-col items-center py-3 px-2 rounded-xl border text-sm font-semibold transition-all ${
                      booked  ? 'opacity-30 cursor-not-allowed bg-slate-50 border-slate-200' :
                      isSel   ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-md' :
                      'bg-white border-slate-200 hover:border-slate-400 text-slate-700 cursor-pointer'
                    }`}>
                    <span className="font-bold">{fmt12(slot.start_time)}</span>
                    <span className="text-xs text-slate-400">{fmt12(slot.end_time)}</span>
                    {booked && <span className="text-[10px] text-red-400 font-medium mt-0.5">Booked</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          <button onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-400 hover:bg-slate-50 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            Back
          </button>
          <button disabled={!selectedDate || !selectedSlot} onClick={proceed}
            className="flex items-center gap-2 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>
            Continue to Checkout
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookingClient() {
  return <Suspense><BookingInner /></Suspense>;
}
