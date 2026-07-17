'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Vehicle = {
  id: number;
  registration: string;
  make?: string;
  model?: string;
  year?: number;
  status: string;
  notes?: string;
  user?: { id: number; name: string; email: string; phone?: string };
  created_at: string;
};

type Meta = { current_page: number; last_page: number; per_page: number; total: number };
type Stats = { total: number; active: number; inactive: number; pending: number };

const STATUS_STYLE: Record<string, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-slate-50 text-slate-500 border-slate-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
};

const EMPTY_FORM = { registration: '', make: '', model: '', year: '', status: 'active', notes: '' };

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchVehicles = useCallback((q: string, status: string, p: number) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set('search', q);
    if (status) params.set('status', status);
    params.set('page', String(p));
    params.set('per_page', '25');
    adminApi.get<{ vehicles: Vehicle[]; meta: Meta; stats: Stats }>(`/api/admin/vehicles?${params}`)
      .then(d => { setVehicles(d.vehicles ?? []); setMeta(d.meta ?? null); setStats(d.stats ?? null); })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    fetchVehicles('', '', 1);
  }, [router, fetchVehicles]);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchVehicles(value, statusFilter, 1), 350);
  }

  function handleStatus(value: string) {
    setStatusFilter(value);
    setPage(1);
    fetchVehicles(search, value, 1);
  }

  function handlePage(p: number) {
    setPage(p);
    fetchVehicles(search, statusFilter, p);
  }

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormErr('');
    setModal('add');
  }

  function openEdit(v: Vehicle) {
    setEditing(v);
    setForm({
      registration: v.registration,
      make: v.make ?? '',
      model: v.model ?? '',
      year: v.year ? String(v.year) : '',
      status: v.status,
      notes: v.notes ?? '',
    });
    setFormErr('');
    setModal('edit');
  }

  async function save() {
    if (!form.registration.trim()) { setFormErr('Registration is required.'); return; }
    setSaving(true); setFormErr('');
    try {
      const payload = {
        registration: form.registration.trim().toUpperCase(),
        make: form.make.trim() || null,
        model: form.model.trim() || null,
        year: form.year ? Number(form.year) : null,
        status: form.status,
        notes: form.notes.trim() || null,
      };
      if (modal === 'add') {
        const res = await adminApi.post<Vehicle>('/api/admin/vehicles', payload);
        setVehicles(prev => [res, ...prev]);
        if (stats) setStats(s => s ? { ...s, total: s.total + 1, [payload.status]: (s[payload.status as keyof Stats] ?? 0) + 1 } : s);
      } else if (editing) {
        const res = await adminApi.put<Vehicle>(`/api/admin/vehicles/${editing.id}`, payload);
        setVehicles(prev => prev.map(v => v.id === editing.id ? res : v));
      }
      setModal(null);
    } catch (e: unknown) {
      const err = e as { message?: string };
      setFormErr(err?.message ?? 'Failed to save.');
    } finally { setSaving(false); }
  }

  async function del(id: number) {
    if (!confirm('Delete this vehicle? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await adminApi.delete(`/api/admin/vehicles/${id}`);
      setVehicles(prev => prev.filter(v => v.id !== id));
      if (stats) setStats(s => s ? { ...s, total: s.total - 1 } : s);
    } catch { /* ignore */ } finally { setDeleting(null); }
  }

  const hasFilters = search || statusFilter;

  return (
    <div className="flex flex-col gap-5">
      {stats && (
        <div className="grid grid-cols-4 gap-3">
          {([
            { label: 'Total', key: '', value: stats.total, color: 'text-slate-800' },
            { label: 'Active', key: 'active', value: stats.active, color: 'text-green-600' },
            { label: 'Inactive', key: 'inactive', value: stats.inactive, color: 'text-slate-500' },
            { label: 'Pending', key: 'pending', value: stats.pending, color: 'text-amber-600' },
          ] as const).map(s => (
            <button
              key={s.label}
              onClick={() => handleStatus(s.key)}
              className={`bg-white border rounded-xl px-4 py-3 text-left transition-all hover:shadow-sm ${statusFilter === s.key && s.key !== '' ? 'border-blue-300 ring-2 ring-blue-50' : 'border-slate-100'}`}
            >
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
            </button>
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search reg, make, model, owner…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
            {search && (
              <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={e => handleStatus(e.target.value)}
            className="text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-400 bg-white text-slate-700 cursor-pointer"
          >
            <option value="">All Statuses</option>
            {['active','inactive','pending'].map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>
            ))}
          </select>

          {hasFilters && (
            <button onClick={() => { setSearch(''); setStatusFilter(''); setPage(1); fetchVehicles('','',1); }} className="text-xs text-blue-600 font-semibold hover:underline whitespace-nowrap">
              Clear all
            </button>
          )}

          <span className="text-sm text-slate-400">{meta ? `${meta.total} vehicle${meta.total !== 1 ? 's' : ''}` : ''}</span>

          <button
            onClick={openAdd}
            className="ml-auto inline-flex items-center gap-2 text-sm font-bold text-white px-4 py-2 rounded-xl hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            Add Vehicle
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-3 text-left">Registration</th>
                  <th className="px-6 py-3 text-left">Make / Model</th>
                  <th className="px-6 py-3 text-left">Year</th>
                  <th className="px-6 py-3 text-left">Owner</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Notes</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {vehicles.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      {hasFilters ? 'No vehicles match your search.' : (
                        <span>No vehicles yet. <button onClick={openAdd} className="text-blue-600 font-semibold hover:underline">Add the first one.</button></span>
                      )}
                    </td>
                  </tr>
                )}
                {vehicles.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-800 tracking-wider">{v.registration}</td>
                    <td className="px-6 py-4 text-slate-700">
                      {v.make || v.model ? `${v.make ?? ''} ${v.model ?? ''}`.trim() : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{v.year ?? '—'}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {v.user ? (
                        <>
                          <p className="font-medium">{v.user.name}</p>
                          <p className="text-xs text-slate-400">{v.user.email}</p>
                        </>
                      ) : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex text-xs font-semibold border px-2.5 py-0.5 rounded-full capitalize ${STATUS_STYLE[v.status] ?? 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs max-w-[160px] truncate">{v.notes || '—'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => openEdit(v)} className="text-xs text-blue-600 font-semibold hover:underline">Edit</button>
                        <button
                          onClick={() => del(v.id)}
                          disabled={deleting === v.id}
                          className="text-xs text-red-500 font-semibold hover:underline disabled:opacity-40"
                        >
                          {deleting === v.id ? '…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {meta && meta.last_page > 1 && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">Page {meta.current_page} of {meta.last_page} · {meta.total} vehicles</p>
            <div className="flex items-center gap-2">
              <button disabled={page <= 1} onClick={() => handlePage(page - 1)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
                ← Prev
              </button>
              {Array.from({ length: Math.min(meta.last_page, 7) }, (_, i) => {
                const p = meta.last_page <= 7 ? i + 1 : Math.max(1, page - 3) + i;
                if (p > meta.last_page) return null;
                return (
                  <button key={p} onClick={() => handlePage(p)}
                    className={`w-8 h-8 text-xs font-semibold rounded-lg transition-colors ${p === page ? 'bg-blue-600 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                    {p}
                  </button>
                );
              })}
              <button disabled={page >= meta.last_page} onClick={() => handlePage(page + 1)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="font-black text-slate-900 text-lg mb-5">{modal === 'add' ? 'Add Vehicle' : 'Edit Vehicle'}</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Registration *</label>
                <input
                  type="text"
                  value={form.registration}
                  onChange={e => setForm(f => ({ ...f, registration: e.target.value.toUpperCase() }))}
                  maxLength={20}
                  placeholder="e.g. CV12 ABC"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono uppercase outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Make</label>
                  <input type="text" value={form.make} onChange={e => setForm(f => ({ ...f, make: e.target.value }))}
                    placeholder="e.g. Ford" maxLength={100}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Model</label>
                  <input type="text" value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
                    placeholder="e.g. Focus" maxLength={100}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Year</label>
                  <input type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    placeholder="e.g. 2020" min={1900} max={2100}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white cursor-pointer">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3} maxLength={2000} placeholder="Optional notes…"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none" />
              </div>
              {formErr && <p className="text-red-500 text-xs">{formErr}</p>}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={save} disabled={saving}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                {saving ? 'Saving…' : modal === 'add' ? 'Add Vehicle' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
