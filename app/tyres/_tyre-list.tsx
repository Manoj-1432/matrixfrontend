'use client';
import { useMemo, useState } from 'react';
import type { TyreResult } from '@/lib/api';

/* ─────────────────────────── helpers ─────────────────────────── */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export function resolveImageUrl(url?: string | null): string | null {
  if (!url) return null;
  // If it's already a full URL from a different host, use it directly
  if (url.startsWith('http') && !url.includes('localhost')) return url;
  // Strip any wrong origin and re-attach the correct API base
  const path = url.startsWith('http') ? new URL(url).pathname : url;
  return `${API_BASE}${path}`;
}

export function getBrandName(t: TyreResult) {
  return t.brand_name ?? t.brand ?? '—';
}
export function getSizeLabel(t: TyreResult) {
  return t.size_label ?? t.size ?? '—';
}
export function getPrice(t: TyreResult) {
  return Number(t.price).toFixed(2);
}

const GRADES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
// EU label colour scale: A (best, dark green) → G (worst, red)
const GRADE_COLOUR: Record<string, string> = {
  A: '#00a651', B: '#4cb848', C: '#bfd630', D: '#fff200', E: '#fdb913', F: '#f37021', G: '#ed1c24',
};

/** "205/55 R16 V (91)" — size, then speed rating and load index when known */
function fullSize(t: TyreResult) {
  const speed = t.speed_rating?.rating;
  const load = t.load_index;
  return [getSizeLabel(t), speed, load ? `(${load})` : null].filter(Boolean).join(' ');
}

function fmtFitDate(iso?: string | null) {
  if (!iso) return null;
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

/* ─────────────────────────── filters ─────────────────────────── */

export type TyreFilters = {
  sort: '' | 'price-asc' | 'price-desc' | 'brand';
  brand: string;
  speed: string;
  load: string;
  runFlat: '' | 'yes' | 'no';
  season: string;
  fuel: string;  // "B" = B or better
  wet: string;   // "B" = B or better
  maxPrice: string;
};

export const NO_FILTERS: TyreFilters = {
  sort: '', brand: '', speed: '', load: '', runFlat: '', season: '', fuel: '', wet: '', maxPrice: '',
};

const gradeAtLeast = (value: string | null | undefined, best: string) =>
  !!value && GRADES.indexOf(value.toUpperCase()) <= GRADES.indexOf(best);

export function applyTyreFilters(tyres: TyreResult[], f: TyreFilters): TyreResult[] {
  const out = tyres.filter(t =>
    (!f.brand || getBrandName(t) === f.brand) &&
    (!f.speed || t.speed_rating?.rating === f.speed) &&
    (!f.load || t.load_index === f.load) &&
    (!f.runFlat || (f.runFlat === 'yes') === !!t.run_flat) &&
    (!f.season || (t.season_name ?? '') === f.season) &&
    (!f.fuel || gradeAtLeast(t.fuel_efficiency?.rating, f.fuel)) &&
    (!f.wet || gradeAtLeast(t.wet_grip, f.wet)) &&
    (!f.maxPrice || Number(t.price) <= Number(f.maxPrice)),
  );
  if (f.sort === 'price-asc') out.sort((a, b) => Number(a.price) - Number(b.price));
  if (f.sort === 'price-desc') out.sort((a, b) => Number(b.price) - Number(a.price));
  if (f.sort === 'brand') out.sort((a, b) => getBrandName(a).localeCompare(getBrandName(b)) || a.model.localeCompare(b.model));
  return out;
}

const uniq = (values: (string | null | undefined)[]) =>
  Array.from(new Set(values.filter((v): v is string => !!v))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const SELECT = 'shrink-0 appearance-none bg-white border border-slate-200 hover:border-slate-300 rounded-full pl-4 pr-9 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 cursor-pointer';
const SELECT_ON = 'shrink-0 appearance-none bg-blue-50 border border-blue-300 rounded-full pl-4 pr-9 py-2 text-sm font-semibold text-blue-800 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer';

function FilterSelect({ label, value, onChange, children }: {
  label: string; value: string; onChange: (v: string) => void; children: React.ReactNode;
}) {
  return (
    <div className="relative shrink-0">
      <select aria-label={label} value={value} onChange={e => onChange(e.target.value)} className={value ? SELECT_ON : SELECT}>
        {children}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

/** Sort + filter bar. Only shows a filter when the results have something to choose between. */
export function TyreFilterBar({ tyres, filters, setFilters }: {
  tyres: TyreResult[]; filters: TyreFilters; setFilters: (f: TyreFilters) => void;
}) {
  const opts = useMemo(() => {
    const prices = tyres.map(t => Number(t.price)).filter(n => n > 0);
    const max = prices.length ? Math.max(...prices) : 0;
    const min = prices.length ? Math.min(...prices) : 0;
    const steps = [50, 75, 100, 125, 150, 200, 250, 300, 400].filter(p => p > min && p < max);
    return {
      brands: uniq(tyres.map(getBrandName)),
      speeds: uniq(tyres.map(t => t.speed_rating?.rating)),
      loads: uniq(tyres.map(t => t.load_index)),
      seasons: uniq(tyres.map(t => t.season_name)),
      fuels: uniq(tyres.map(t => t.fuel_efficiency?.rating?.toUpperCase())),
      wets: uniq(tyres.map(t => t.wet_grip?.toUpperCase())),
      hasRunFlat: tyres.some(t => t.run_flat),
      prices: steps,
    };
  }, [tyres]);

  const set = (k: keyof TyreFilters) => (v: string) => setFilters({ ...filters, [k]: v });
  const active = Object.entries(filters).some(([k, v]) => k !== 'sort' && v);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm px-3 py-3 mb-5">
      {/* Swipe sideways on phones; wraps onto extra lines on wider screens */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 md:flex-wrap md:overflow-visible md:pb-0 md:mb-0">
        <FilterSelect label="Sort by" value={filters.sort} onChange={set('sort')}>
          <option value="">Sort: Recommended</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="brand">Brand A–Z</option>
        </FilterSelect>
        {opts.brands.length > 1 && (
          <FilterSelect label="Brand" value={filters.brand} onChange={set('brand')}>
            <option value="">Brand</option>
            {opts.brands.map(b => <option key={b} value={b}>{b}</option>)}
          </FilterSelect>
        )}
        {opts.speeds.length > 0 && (
          <FilterSelect label="Speed rating" value={filters.speed} onChange={set('speed')}>
            <option value="">Speed</option>
            {opts.speeds.map(s => <option key={s} value={s}>Speed {s}</option>)}
          </FilterSelect>
        )}
        {opts.loads.length > 0 && (
          <FilterSelect label="Load index" value={filters.load} onChange={set('load')}>
            <option value="">Load</option>
            {opts.loads.map(l => <option key={l} value={l}>Load {l}</option>)}
          </FilterSelect>
        )}
        {opts.hasRunFlat && (
          <FilterSelect label="Run-flat" value={filters.runFlat} onChange={set('runFlat')}>
            <option value="">Run Flat</option>
            <option value="yes">Run-flat only</option>
            <option value="no">Not run-flat</option>
          </FilterSelect>
        )}
        {opts.seasons.length > 0 && (
          <FilterSelect label="Season" value={filters.season} onChange={set('season')}>
            <option value="">Season</option>
            {opts.seasons.map(s => <option key={s} value={s}>{s}</option>)}
          </FilterSelect>
        )}
        {opts.fuels.length > 0 && (
          <FilterSelect label="Fuel efficiency" value={filters.fuel} onChange={set('fuel')}>
            <option value="">Fuel Efficiency</option>
            {opts.fuels.map(g => <option key={g} value={g}>Fuel {g}{g !== 'A' ? ' or better' : ''}</option>)}
          </FilterSelect>
        )}
        {opts.wets.length > 0 && (
          <FilterSelect label="Wet grip" value={filters.wet} onChange={set('wet')}>
            <option value="">Wet Grip</option>
            {opts.wets.map(g => <option key={g} value={g}>Wet grip {g}{g !== 'A' ? ' or better' : ''}</option>)}
          </FilterSelect>
        )}
        {opts.prices.length > 0 && (
          <FilterSelect label="Maximum price" value={filters.maxPrice} onChange={set('maxPrice')}>
            <option value="">Price</option>
            {opts.prices.map(p => <option key={p} value={p}>Up to £{p}</option>)}
          </FilterSelect>
        )}
        {active && (
          <button type="button" onClick={() => setFilters({ ...NO_FILTERS, sort: filters.sort })}
            className="shrink-0 text-sm font-semibold text-blue-700 hover:underline px-2">
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────── list item ─────────────────────────── */

function LabelGrade({ icon, grade, label }: { icon: React.ReactNode; grade: string; label: string }) {
  const g = grade.toUpperCase();
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2">
        <span className="text-slate-500" aria-hidden>{icon}</span>
        <span className="text-white font-black text-sm w-6 h-6 rounded-md flex items-center justify-center"
          style={{ background: GRADE_COLOUR[g] ?? '#94a3b8', color: g === 'D' || g === 'C' ? '#1e293b' : '#fff' }}>
          {g}
        </span>
      </div>
      <span className="text-[11px] text-slate-500 mt-1">{label}</span>
      <span className="h-0.5 w-full mt-1 rounded-full" style={{ background: GRADE_COLOUR[g] ?? '#cbd5e1' }} />
    </div>
  );
}

const FUEL_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 21V5a2 2 0 012-2h7a2 2 0 012 2v7h1a2 2 0 012 2v3a1 1 0 002 0v-6.6l-2.3-2.3 1.4-1.4 2.6 2.6c.2.2.3.5.3.7V17a3 3 0 01-6 0v-3h-1v7H3zm3-15v4h5V6H6z" /></svg>
);
const WET_ICON = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 15a4 4 0 01-.8-7.9A5 5 0 0116 7a3.5 3.5 0 011 6.9M8 18l-1 2m5-2l-1 2m5-2l-1 2" /></svg>
);
const NOISE_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4V9zm12.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4z" /></svg>
);

function TyrePlaceholder() {
  return (
    <svg className="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="20" /><circle cx="24" cy="24" r="9" /><circle cx="24" cy="24" r="3" />
    </svg>
  );
}

const QTY_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

/** One tyre in the results list: picture · details & EU label · fit date, price, quantity and basket. */
export function TyreListItem({ t, fitFrom, onAdd, onQtyChange, cartQty }: {
  t: TyreResult;
  fitFrom?: string | null;
  onAdd: (t: TyreResult, qty: number) => void;
  onQtyChange: (tyreId: number, qty: number) => void;
  cartQty: number; // 0 = not in cart
}) {
  const imgSrc = resolveImageUrl(t.image_url);
  const [imgFailed, setImgFailed] = useState(false);
  const inCart = cartQty > 0;
  // Quantity chosen before adding; once in the cart the select edits the cart directly
  const [pickQty, setPickQty] = useState(1);
  const qty = inCart ? cartQty : pickQty;
  const fit = fmtFitDate(fitFrom);
  const fuel = t.fuel_efficiency?.rating;
  const hasLabel = !!(fuel || t.wet_grip || t.noise_db);

  return (
    <article className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-slate-200/60 transition-shadow p-4 sm:p-5 grid grid-cols-[72px_1fr] sm:grid-cols-[120px_1fr] lg:grid-cols-[140px_1fr_260px] gap-x-4 sm:gap-x-6 gap-y-4">
      {/* Picture */}
      <div className="row-span-1 lg:row-span-1 flex items-center justify-center bg-slate-50 rounded-xl h-[72px] sm:h-[120px] lg:h-[140px] overflow-hidden">
        {imgSrc && !imgFailed
          ? <img src={imgSrc} alt={`${getBrandName(t)} ${t.model}`} className="w-full h-full object-contain" onError={() => setImgFailed(true)} />
          : <TyrePlaceholder />}
      </div>

      {/* Details + EU label */}
      <div className="min-w-0">
        <span className="inline-block text-[11px] font-black uppercase tracking-[0.14em] text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
          {getBrandName(t)}
        </span>
        <h3 className="font-black text-slate-900 text-lg leading-tight mt-1.5">{t.model}</h3>
        <p className="text-slate-500 text-sm mt-0.5 font-mono">{fullSize(t)}</p>

        {hasLabel && (
          <div className="flex flex-wrap gap-x-5 gap-y-3 mt-3">
            {fuel && <LabelGrade icon={FUEL_ICON} grade={fuel} label="Fuel Efficiency" />}
            {t.wet_grip && <LabelGrade icon={WET_ICON} grade={t.wet_grip} label="Wet Grip" />}
            {t.noise_db != null && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500" aria-hidden>{NOISE_ICON}</span>
                  <span className="font-black text-slate-900 text-sm">{t.noise_db}<span className="text-[11px] font-semibold text-slate-500 ml-0.5">dB</span></span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1">External Noise</span>
                <span className="h-0.5 w-full mt-1 rounded-full bg-slate-300" />
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-slate-600">
          {t.tyre_type_name && <span className="flex items-center gap-1"><Tick />{t.tyre_type_name}</span>}
          {t.season_name && <span className="flex items-center gap-1"><Tick />{t.season_name}</span>}
          {t.run_flat && <span className="flex items-center gap-1 font-semibold text-slate-800"><Tick />Run-flat</span>}
        </div>
      </div>

      {/* Fit date, price, quantity, basket */}
      <div className="col-span-2 lg:col-span-1 lg:border-l lg:border-slate-100 lg:pl-6 flex flex-col gap-3 justify-center">
        {fit && (
          <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 text-sm">
            <span className="flex items-center gap-2 text-slate-500">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" /></svg>
              Fit from
            </span>
            <span className="font-bold text-slate-900">{fit}</span>
          </div>
        )}
        <div className="flex items-end justify-between gap-2">
          <span className="text-xs text-slate-500 leading-tight">Price per tyre,<br />fitting included</span>
          <span className="text-3xl font-black text-slate-900 leading-none">
            <span className="text-lg align-top">£</span>{Math.floor(Number(t.price))}
            <span className="text-lg">.{getPrice(t).split('.')[1]}</span>
          </span>
        </div>
        {qty > 1 && <p className="text-xs text-slate-500 text-right -mt-2">£{(Number(t.price) * qty).toFixed(2)} for {qty}</p>}
        <div className="flex items-center gap-2">
          <label htmlFor={`qty-${t.id}`} className="sr-only">Quantity</label>
          <select id={`qty-${t.id}`} value={qty}
            onChange={e => {
              const n = Number(e.target.value);
              if (inCart) onQtyChange(t.id, n); else setPickQty(n);
            }}
            className="w-20 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-800 bg-white outline-none focus:border-blue-400 cursor-pointer">
            {(QTY_OPTIONS.includes(qty) ? QTY_OPTIONS : [...QTY_OPTIONS, qty]).map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <button type="button"
            onClick={() => { if (!inCart) onAdd(t, pickQty); }}
            className={`flex-1 inline-flex items-center justify-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl transition-all ${inCart ? 'bg-green-600 text-white cursor-default' : 'text-white hover:-translate-y-0.5 hover:shadow-lg'}`}
            style={inCart ? {} : { background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
            {inCart ? '✓ In basket' : (
              <>
                Add to basket
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

function Tick() {
  return (
    <svg className="w-3.5 h-3.5 text-green-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
