'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type User = { id: number; name: string; email: string; phone?: string };
type Vehicle = {
  id: number; registration: string; make?: string; model?: string;
  year?: number; status: string; notes?: string; user?: User; created_at: string;
};
type Meta = { current_page: number; last_page: number; total: number };
type Stats = { total: number; active: number; inactive: number; pending: number };

const STATUS_STYLE: Record<string, string> = {
  active:   'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-slate-50 text-slate-600 border-slate-200',
  pending:  'bg-amber-50 text-amber-700 border-amber-200',
};

const EMPTY_FORM = { registration: '', make: '', model: '', year: '', status: 'active', notes: '' };

export default function AdminVehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
  }, [router]);

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, statusFilter, page]);

  async function fetchVehicles() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ per_page: '20', page: String(page) });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const res = await adminApi.get<{ data: { vehicles: Vehicle[]; meta: Meta; stats: Stats } }>(`/api/admin/vehicles?${params}`);
      setVehicles(res.data.vehicles);
      setMeta(res.data.meta);
      setStats(res.data.stats);
    } catch { router.push('/admin/login'); }
    finally { setLoading(false); }
  }

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormErr('');
    setModal('add');
  }
  function openEdit(v: Vehicle) {
    setEditing(v);
    setForm({ registration: v.registration, make: v.make ?? '', model: v.model ?? '', year: v.year ? String(v.year) : '', status: v.status, notes: v.notes ?? '' });
    setFormErr('');
    setModal('edit');
  }

  async function saveVehicle() {
    if (!form.registration.trim()) { setFormErr('Registration is required.'); return; }
    setSaving(true); setFormErr('');
    try {
      const payload = { ...form, year: form.year ? Number(form.year) : null };
      if (modal === 'add') {
        await adminApi.post('/api/admin/vehicles', payload);
      } else if (editing) {
        await adminApi.put(`/api/admin/vehicles/${editing.id}`, payload);
      }
      setModal(null);
      fetchVehicles();
    } catch (e: unknown) {
      const err = e as { message?: string };
      setFormErr(err?.message ?? 'Failed to save vehicle.');
    } finally { setSaving(false); }
  }

  async function deleteVehicle(id: number) {
    if (!confirm('Delete this vehicle? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await adminApi.delete(`/api/admin/vehicles/${id}`);
      setVehicles(prev => prev.filter(v => v.id !== id));
      if (stats) setStats(s => s ? { ...s, total: s.total - 1 } : s);
    } catch { /* ignore */ } finally { setDeleting(null); }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-black text-slate-900">Vehicles</h1>
          {stats && <p className="text-slate-400 text-xs mt-0.5">{stats.total} total · {stats.active} active · {stats.pending} pending</p>}
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 text-sm font-bold text-white px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Add Vehicle
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text" placeholder="Search reg, make, model, owner…" value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 flex-1 min-w-[180px]"
        />
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="px-5 py-3 text-left">Registration</th>
                  <th className="px-5 py-3 text-left">Make / Model</th>
                  <th className="px-5 py-3 text-left">Year</th>
                  <th className="px-5 py-3 text-left">Owner</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {vehicles.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">No vehicles found</td></tr>
                )}
                {vehicles.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="inline-block bg-yellow-400 text-slate-900 font-black px-2.5 py-0.5 rounded text-xs tracking-widest">
                        {v.registration}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{[v.make, v.model].filter(Boolean).join(' ') || '—'}</td>
                    <td className="px-5 py-3.5 text-slate-500">{v.year ?? '—'}</td>
                    <td className="px-5 py-3.5">
                      {v.user ? (
                        <div>
                          <p className="font-medium text-slate-800">{v.user.name}</p>
                          <p className="text-xs text-slate-400">{v.user.email}</p>
                        </div>
                      ) : <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize border ${STATUS_STYLE[v.status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(v)}
                          className="text-xs text-blue-600 font-semibold hover:underline">Edit</button>
                        <button onClick={() => deleteVehicle(v.id)} disabled={deleting === v.id}
                          className="text-xs text-red-500 font-semibold hover:underline disabled:opacity-40">
                          {deleting === v.id ? '…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {meta && meta.last_page > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 text-xs text-slate-500">
            <span>Page {meta.current_page} of {meta.last_page} ({meta.total} total)</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50">Prev</button>
              <button disabled={page >= meta.last_page} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="font-black text-slate-900 text-lg mb-5">{modal === 'add' ? 'Add Vehicle' : 'Edit Vehicle'}</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Registration *</label>
                <input type="text" value={form.registration} onChange={e => setForm(f => ({ ...f, registration: e.target.value.toUpperCase() }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 font-mono tracking-widest"
                  placeholder="AB12 CDE" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Make</label>
                  <input type="text" value={form.make} onChange={e => setForm(f => ({ ...f, make: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="Ford" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Model</label>
                  <input type="text" value={form.model} onChange={e => setForm(f => ({ ...f, model: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="Focus" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Year</label>
                  <input type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                    min={1900} max={2100}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400" placeholder="2020" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white">
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 resize-none" />
              </div>
              {formErr && <p className="text-red-500 text-xs">{formErr}</p>}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={saveVehicle} disabled={saving}
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
