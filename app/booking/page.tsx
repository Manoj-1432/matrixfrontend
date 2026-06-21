'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, type Slot, type CheckoutConfig } from '@/lib/api';

const DAY_ABBR  = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const MON_ABBR  = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DAY_NAMES = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
const PHONE     = process.env.NEXT_PUBLIC_PHONE ?? '919392599067';
const DAYS_AHEAD = 20;

function fmt12(t: string) {
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2,'0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

function BookingInner() {
  const router = useRouter();
  const params = useSearchParams();
  const tyreId = params.get('tyre_id');

  const [allSlots, setAllSlots]       = useState<Slot[]>([]);
  const [minDate, setMinDate]         = useState('');
  const [today, setToday]             = useState('');
  const [occupiedKeys, setOccupied]   = useState<Set<string>>(new Set());
  const [selectedDate, setSelDate]    = useState<string | null>(null);
  const [selectedSlot, setSelSlot]    = useState<Slot | null>(null);
  const [loadingSlots, setLoadSlots]  = useState(false);

  useEffect(() => {
    const t = new Date().toISOString().split('T')[0];
    setToday(t);
    Promise.all([
      api.get<{ slots: Slot[] }>('/api/public/slots'),
      api.get<CheckoutConfig>('/api/public/checkout-config'),
    ]).then(([sData, cfg]) => {
      setAllSlots(sData.slots ?? []);
      setMinDate(cfg.min_fitting_date);
    });
  }, []);

  const dates = Array.from({ length: DAYS_AHEAD + 1 }, (_, i) => {
    const d = new Date(today + 'T00:00:00');
    d.setDate(d.getDate() + i);
    return d;
  });

  async function pickDate(iso: string) {
    setSelDate(iso);
    setSelSlot(null);
    setLoadSlots(true);
    try {
      const data = await api.get<{ occupancy: { slot_id: number; date: string }[] }>(
        `/api/public/slots/occupancy?from=${iso}&to=${iso}`
      );
      setOccupied(new Set((data.occupancy ?? []).map(o => `${o.slot_id}_${o.date}`)));
    } finally {
      setLoadSlots(false);
    }
  }

  function proceed() {
    if (!selectedDate || !selectedSlot) return;
    const p = new URLSearchParams({ slot_id: String(selectedSlot.id), fitting_date: selectedDate });
    if (tyreId) p.set('tyre_id', tyreId);
    router.push(`/checkout?${p}`);
  }

  const daySlots = selectedDate
    ? allSlots.filter(s => s.day === DAY_NAMES[new Date(selectedDate + 'T00:00:00').getDay()])
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8">

        <h1 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>📅</span> Select Fitting Slot
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT — date grid */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Select a date</p>
            <div className="grid grid-cols-5 gap-1.5">
              {!today ? (
                <p className="col-span-5 text-sm text-gray-400">Loading…</p>
              ) : dates.map(d => {
                const iso     = d.toISOString().split('T')[0];
                const isToday = iso === today;
                const isSel   = iso === selectedDate;
                return (
                  <button
                    key={iso}
                    disabled={isToday}
                    onClick={() => pickDate(iso)}
                    className={[
                      'flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-xs font-semibold transition-all',
                      isToday  ? 'opacity-40 cursor-not-allowed bg-gray-100 border-gray-200 text-gray-400' : '',
                      isSel    ? 'bg-green-600 border-green-600 text-white' : '',
                      !isToday && !isSel ? 'bg-white border-gray-200 text-gray-700 hover:border-gray-400 cursor-pointer' : '',
                    ].join(' ')}
                  >
                    <span className={`text-[0.6rem] font-bold tracking-wide ${isSel ? 'text-green-100' : 'text-gray-400'}`}>
                      {DAY_ABBR[d.getDay()]}
                    </span>
                    <span className="text-base font-extrabold leading-tight">{d.getDate()}</span>
                    <span className={`text-[0.6rem] ${isSel ? 'text-green-100' : 'text-gray-400'}`}>
                      {MON_ABBR[d.getMonth()]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* same-day notice */}
            <div className="mt-5 flex gap-2.5 p-3.5 rounded-xl bg-orange-50 border border-orange-200">
              <span className="text-orange-500 mt-0.5 shrink-0">⚠️</span>
              <p className="text-xs text-orange-800 leading-relaxed">
                <strong>Need same-day fitting?</strong><br />
                Online bookings require at least 1 day&apos;s notice. Contact us via{' '}
                <a href={`tel:+${PHONE}`} className="font-bold underline">call</a> or{' '}
                <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" className="font-bold underline">WhatsApp</a>.
              </p>
            </div>
          </div>

          {/* RIGHT — slots */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              {selectedDate
                ? `Slot for ${selectedDate.split('-').reverse().join('-')}`
                : 'Choose a time slot'}
            </p>

            {!selectedDate && (
              <p className="text-sm text-gray-400 py-6 text-center">Select a date to see available slots.</p>
            )}

            {loadingSlots && (
              <p className="text-sm text-gray-400 py-6 text-center">Loading slots…</p>
            )}

            {!loadingSlots && selectedDate && daySlots.length === 0 && (
              <p className="text-sm text-gray-400 py-6 text-center">No slots available on this day.</p>
            )}

            <div className="grid grid-cols-2 gap-2">
              {!loadingSlots && daySlots.map(slot => {
                const booked  = occupiedKeys.has(`${slot.id}_${selectedDate}`);
                const isSel   = selectedSlot?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    disabled={booked}
                    onClick={() => setSelSlot(slot)}
                    className={[
                      'flex flex-col items-center py-3 px-2 rounded-xl border text-sm font-semibold transition-all',
                      booked  ? 'opacity-35 cursor-not-allowed bg-gray-100 border-gray-200' : '',
                      isSel   ? 'border-green-500 bg-green-50 text-green-800' : '',
                      !booked && !isSel ? 'bg-white border-gray-200 hover:border-gray-400 text-gray-800 cursor-pointer' : '',
                    ].join(' ')}
                  >
                    <span className="font-bold">{fmt12(slot.start_time)}</span>
                    <span className="text-xs text-gray-400">{fmt12(slot.end_time)}</span>
                    {booked && <span className="text-xs text-red-400 font-medium mt-0.5">Fully booked</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between mt-8 pt-5 border-t border-gray-100">
          <button onClick={() => router.back()}
            className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-400 transition-colors">
            ‹ Back
          </button>
          <button
            disabled={!selectedDate || !selectedSlot}
            onClick={proceed}
            className="flex items-center gap-1 px-6 py-2 rounded-xl bg-gray-800 text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors">
            Continue ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense>
      <BookingInner />
    </Suspense>
  );
}
