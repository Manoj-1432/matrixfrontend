'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, type Tyre } from '@/lib/api';

export default function TyresPage() {
  const [tyres, setTyres] = useState<Tyre[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get<{ tyres: Tyre[] }>('/api/public/tyres')
      .then(d => setTyres(d.tyres ?? []))
      .catch(() => setTyres([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = tyres.filter(t =>
    [t.brand, t.model, t.size].join(' ').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Tyres</h1>
        <p className="text-gray-500">Browse our range and book a fitting.</p>
      </div>

      <input
        type="text"
        placeholder="Search by brand, model or size…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-md mb-8 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-green-500"
      />

      {loading && <p className="text-gray-400 text-sm">Loading tyres…</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-gray-400 text-sm">No tyres found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(tyre => (
          <div key={tyre.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-1">{tyre.tyre_type ?? 'Tyre'}</p>
              <h2 className="font-bold text-gray-900 text-lg leading-tight">{tyre.brand} {tyre.model}</h2>
              <p className="text-gray-500 text-sm mt-0.5">{tyre.size}</p>
            </div>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
              <span className="text-2xl font-extrabold text-gray-900">£{Number(tyre.price).toFixed(2)}</span>
              <Link
                href={`/booking?tyre_id=${tyre.id}`}
                className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                Book Fitting
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
