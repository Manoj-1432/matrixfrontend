'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api, type TyreResult, type VehicleLookupResult, type SearchOptions } from '@/lib/api';
import ScrollToTop from '@/components/ScrollToTop';

const PHONE = '07721570075';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

function resolveImageUrl(url?: string | null): string | null {
  if (!url) return null;
  // If it's already a full URL from a different host, use it directly
  if (url.startsWith('http') && !url.includes('localhost')) return url;
  // Strip any wrong origin and re-attach the correct API base
  const path = url.startsWith('http') ? new URL(url).pathname : url;
  return `${API_BASE}${path}`;
}

function getBrandName(t: TyreResult) {
  return t.brand_name ?? t.brand ?? '—';
}
function getSizeLabel(t: TyreResult) {
  return t.size_label ?? t.size ?? '—';
}
function getPrice(t: TyreResult) {
  return Number(t.price).toFixed(2);
}

function TyreCard({ t, onBook }: { t: TyreResult; onBook: (t: TyreResult) => void }) {
  const imgSrc = resolveImageUrl(t.image_url);
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-200">
      {imgSrc && (
        <div className="w-full h-40 bg-slate-50 overflow-hidden">
          <img src={imgSrc} alt={t.model} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 flex flex-col gap-4 flex-1">
      <div>
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
            {getBrandName(t)}
          </span>
          {t.season_name && (
            <span className="text-xs text-slate-500 font-medium capitalize">{t.season_name}</span>
          )}
        </div>
        <h3 className="font-bold text-slate-900 text-base leading-tight mt-2">{t.model}</h3>
        <p className="text-slate-500 text-sm mt-0.5 font-mono">{getSizeLabel(t)}</p>
        {t.tyre_type_name && (
          <p className="text-xs text-slate-400 mt-1 capitalize">{t.tyre_type_name}</p>
        )}
      </div>
      {(t.fuel_efficiency?.rating || t.speed_rating?.rating) && (
        <div className="flex gap-2 flex-wrap">
          {t.speed_rating?.rating && (
            <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md">
              Speed: {t.speed_rating.rating}
            </span>
          )}
          {t.fuel_efficiency?.rating && (
            <span className="text-xs bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-md">
              Fuel: {t.fuel_efficiency.rating}
            </span>
          )}
        </div>
      )}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
        <div>
          <span className="text-2xl font-black text-slate-900">£{getPrice(t)}</span>
          <span className="text-xs text-slate-400 ml-1">per tyre</span>
        </div>
        <button
          onClick={() => onBook(t)}
          className="text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
          Book Fitting
        </button>
      </div>
      </div>
    </div>
  );
}

function TyresInner() {
  const params = useSearchParams();
  const router = useRouter();

  const [tab, setTab] = useState<'reg' | 'size'>('reg');
  const [reg, setReg] = useState('');
  const [options, setOptions] = useState<SearchOptions | null>(null);
  const [width, setWidth] = useState('');
  const [ratio, setRatio] = useState('');
  const [rim, setRim] = useState('');
  const [speed, setSpeed] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<VehicleLookupResult['vehicle'] | null>(null);
  const [tyres, setTyres] = useState<TyreResult[] | null>(null);
  const [likelySizes, setLikelySizes] = useState<string[]>([]);
  const [tyreNote, setTyreNote] = useState<string | null>(null);

  useEffect(() => {
    api.get<SearchOptions>('/api/public/tyre-search-options')
      .then(setOptions)
      .catch(() => null);
  }, []);

  useEffect(() => {
    const regParam = params.get('reg');
    if (regParam) {
      const v = regParam.trim().toUpperCase();
      setReg(v);
      setTab('reg');
      // Auto-trigger search after options load (slight delay to ensure component is ready)
      const t = setTimeout(async () => {
        setLoading(true); setError(null);
        try {
          const data = await api.post<VehicleLookupResult>('/api/vehicle/lookup', { registration_number: v });
          setVehicle(data.vehicle ?? null);
          setTyres(data.tyres ?? []);
          setLikelySizes(data.tyre?.likely_sizes ?? []);
          setTyreNote(data.tyre?.notes?.[0] ?? null);
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : 'Could not look up vehicle.');
        } finally { setLoading(false); }
      }, 100);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function searchByReg() {
    const v = reg.trim().replace(/\s+/g, '').toUpperCase();
    if (!v) return;
    setLoading(true); setError(null); setTyres(null); setVehicle(null); setLikelySizes([]);
    try {
      const data = await api.post<VehicleLookupResult>('/api/vehicle/lookup', { registration_number: v });
      setVehicle(data.vehicle);
      setTyres(data.tyres ?? []);
      setLikelySizes(data.tyre?.likely_sizes ?? []);
      if (data.tyre_error && !data.tyre_error.skipped) {
        setTyreNote(data.tyre_error.error ?? null);
      }
    } catch (e: unknown) {
      const err = e as { message?: string };
      setError(err.message ?? 'Could not look up vehicle. Check the registration and try again.');
    } finally { setLoading(false); }
  }

  async function searchBySize() {
    if (!width || !ratio || !rim) { setError('Please select Width, Profile and Rim size.'); return; }
    const sizeLabel = `${width}/${ratio}R${rim}`;
    setLoading(true); setError(null); setTyres(null); setVehicle(null); setLikelySizes([sizeLabel]);
    try {
      const data = await api.post<VehicleLookupResult>('/api/vehicle/lookup', {
        tyre_size: sizeLabel,
        speed_rating: speed || undefined,
      });
      setTyres(data.tyres ?? []);
    } catch (e: unknown) {
      const err = e as { message?: string };
      setError(err.message ?? 'Search failed. Please try again.');
    } finally { setLoading(false); }
  }

  function handleBook(t: TyreResult) {
    router.push(`/booking?tyre_id=${t.id}&tyre_brand=${encodeURIComponent(getBrandName(t))}&tyre_model=${encodeURIComponent(t.model)}&tyre_size=${encodeURIComponent(getSizeLabel(t))}&tyre_price=${getPrice(t)}`);
  }

  const SELECT = 'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all cursor-pointer';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero bar */}
      <div className="bg-[#0d1b3e] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.18em] mb-3">Tyre Search</p>
          <h1 className="text-3xl lg:text-4xl font-black mb-3">Find Tyres for Your Car</h1>
          <p className="text-blue-200/70 text-sm max-w-md mx-auto">Search by registration number or enter your tyre size manually to see matching tyres and prices.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Search card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            {([['reg', 'Search by Reg Plate'], ['size', 'Search by Tyre Size']] as const).map(([key, label]) => (
              <button key={key} onClick={() => { setTab(key); setError(null); }}
                className={`flex-1 py-4 text-sm font-bold transition-colors ${tab === key ? 'text-blue-700 border-b-2 border-blue-600 bg-blue-50/40' : 'text-slate-500 hover:text-slate-800'}`}>
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {tab === 'reg' ? (
              <div>
                <p className="text-sm text-slate-500 mb-4">Enter your number plate — we&apos;ll look up your vehicle and find compatible tyres.</p>
                <div className="flex gap-3">
                  <div className="flex rounded-xl overflow-hidden ring-2 ring-yellow-400 shadow-md flex-1 max-w-sm">
                    <div className="bg-[#f5d100] flex items-center pl-3 pr-2 shrink-0">
                      <div className="bg-[#003399] text-white text-[7px] font-black tracking-[1.5px] px-1.5 py-0.5 rounded-sm leading-none">GB</div>
                    </div>
                    <input
                      type="text"
                      value={reg}
                      onChange={e => setReg(e.target.value.toUpperCase())}
                      onKeyDown={e => e.key === 'Enter' && searchByReg()}
                      placeholder="AB12 CDE"
                      maxLength={8}
                      spellCheck={false}
                      className="flex-1 bg-[#f5d100] outline-none font-black text-xl tracking-[0.18em] uppercase text-slate-900 placeholder:text-yellow-600/40 px-3 py-3"
                    />
                  </div>
                  <button onClick={searchByReg} disabled={loading || !reg.trim()}
                    className="text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                    {loading ? 'Searching…' : 'Find Tyres'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-slate-500 mb-4">Select your tyre size — found on the sidewall of your existing tyre (e.g. <strong>205/55 R16</strong>).</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Width *</label>
                    <select value={width} onChange={e => setWidth(e.target.value)} className={SELECT}>
                      <option value="">Select</option>
                      {(options?.widths ?? []).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Profile *</label>
                    <select value={ratio} onChange={e => setRatio(e.target.value)} className={SELECT}>
                      <option value="">Select</option>
                      {(options?.ratios ?? []).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rim (R) *</label>
                    <select value={rim} onChange={e => setRim(e.target.value)} className={SELECT}>
                      <option value="">Select</option>
                      {(options?.rims ?? []).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Speed</label>
                    <select value={speed} onChange={e => setSpeed(e.target.value)} className={SELECT}>
                      <option value="">Any</option>
                      {(options?.speed_ratings ?? []).map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
                {width && ratio && rim && (
                  <p className="text-sm text-slate-500 mb-4">
                    Searching for: <strong className="text-slate-800 font-mono">{width}/{ratio}R{rim}{speed ? ` ${speed}` : ''}</strong>
                  </p>
                )}
                <button onClick={searchBySize} disabled={loading}
                  className="text-white font-bold px-8 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                  {loading ? 'Searching…' : 'Search Tyres'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div>
            {/* vehicle info skeleton */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-6 animate-pulse">
              <div className="h-3 w-24 bg-slate-200 rounded mb-3" />
              <div className="h-5 w-48 bg-slate-200 rounded" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 animate-pulse">
                  <div className="flex justify-between mb-4">
                    <div className="h-5 w-20 bg-slate-200 rounded-full" />
                    <div className="h-5 w-12 bg-slate-200 rounded-full" />
                  </div>
                  <div className="h-6 w-3/4 bg-slate-200 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-slate-100 rounded mb-4" />
                  <div className="flex gap-2 mb-5">
                    <div className="h-5 w-16 bg-slate-100 rounded-full" />
                    <div className="h-5 w-16 bg-slate-100 rounded-full" />
                  </div>
                  <div className="h-10 w-full bg-slate-200 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 mb-6 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Vehicle result */}
        {vehicle && !loading && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">Vehicle Found</p>
            <div className="flex flex-wrap gap-4 text-sm">
              {vehicle.make && <span><strong className="text-slate-700">Make:</strong> {vehicle.make}</span>}
              {vehicle.model && <span><strong className="text-slate-700">Model:</strong> {vehicle.model}</span>}
              {vehicle.yearOfManufacture && <span><strong className="text-slate-700">Year:</strong> {vehicle.yearOfManufacture}</span>}
              {vehicle.colour && <span><strong className="text-slate-700">Colour:</strong> {vehicle.colour}</span>}
              {vehicle.fuelType && <span><strong className="text-slate-700">Fuel:</strong> {vehicle.fuelType}</span>}
            </div>
            {likelySizes.length > 0 && (
              <p className="text-xs text-blue-600 mt-2 font-medium">
                Recommended size{likelySizes.length > 1 ? 's' : ''}: {likelySizes.join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Tyre note */}
        {tyreNote && !loading && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-2xl px-5 py-4 mb-6 text-sm">
            {tyreNote}
          </div>
        )}

        {/* Results */}
        {tyres !== null && !loading && (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-slate-900 text-lg">
                {tyres.length > 0 ? `${tyres.length} tyre${tyres.length !== 1 ? 's' : ''} found` : 'No tyres found'}
              </h2>
            </div>

            {tyres.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
                  </svg>
                </div>
                <p className="text-slate-700 font-bold mb-1">No matching tyres in stock</p>
                <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">We may still be able to help — contact us directly and we&apos;ll source the right tyre for you.</p>
                <div className="flex justify-center gap-3">
                  <a href={`tel:${PHONE}`}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:-translate-y-0.5 transition-all">
                    Call Us
                  </a>
                  <a href="https://wa.me/447721570075" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all">
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {tyres.map(t => <TyreCard key={t.id} t={t} onBook={handleBook} />)}
              </div>
            )}
          </>
        )}

        {/* Initial state */}
        {tyres === null && !loading && !error && (
          <div className="text-center py-16 text-slate-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
              <path strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2" />
            </svg>
            <p className="font-medium text-slate-500">Enter your reg plate or tyre size above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TyresClient() {
  return <><Suspense><TyresInner /></Suspense><ScrollToTop /></>;
}
