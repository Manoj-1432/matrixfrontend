'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Tyre = { id: number; brand: string; model: string; size: string; price: number; tyre_type?: string; season?: string; stock?: number };

const BLANK: Omit<Tyre, 'id'> = { brand: '', model: '', size: '', price: 0, tyre_type: '', season: '' };

function Modal({
  title, form, setForm, onSave, onClose, saving,
}: {
  title: string;
  form: Partial<Tyre>;
  setForm: (f: Partial<Tyre>) => void;
  onSave: () => void;
  onClose: () => void;
  saving: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7">
        <h3 className="font-black text-slate-900 text-lg mb-6">{title}</h3>
        <div className="grid grid-cols-2 gap-4">
          {([
            { key: 'brand', label: 'Brand', type: 'text', full: true },
            { key: 'model', label: 'Model', type: 'text', full: true },
            { key: 'size', label: 'Size (e.g. 205/55R16)', type: 'text', full: true },
            { key: 'price', label: 'Price (£)', type: 'number' },
            { key: 'tyre_type', label: 'Type', type: 'text' },
            { key: 'season', label: 'Season', type: 'text' },
          ] as { key: keyof Tyre; label: string; type: string; full?: boolean }[]).map(f => (
            <div key={f.key} className={f.full ? 'col-span-2' : ''}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{f.label}</label>
              <input
                type={f.type}
                step={f.type === 'number' ? '0.01' : undefined}
                value={(form[f.key] as string | number) ?? ''}
                onChange={e => setForm({ ...form, [f.key]: f.type === 'number' ? parseFloat(e.target.value) : e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm transition-colors">
            Cancel
          </button>
          <button onClick={onSave} disabled={saving}
            className="flex-1 text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TyresPage() {
  const router = useRouter();
  const [tyres, setTyres] = useState<Tyre[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Partial<Tyre> | null>(null);
  const [adding, setAdding] = useState<Partial<Tyre> | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    adminApi.get<{ data: Tyre[] }>('/api/admin/tyres')
      .then(d => setTyres(d.data ?? []))
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const filtered = tyres.filter(t =>
    [t.brand, t.model, t.size].join(' ').toLowerCase().includes(search.toLowerCase())
  );

  function showMsg(text: string) {
    setMsg(text);
    setTimeout(() => setMsg(''), 3000);
  }

  async function saveNew() {
    if (!adding) return;
    setSaving(true);
    try {
      const created = await adminApi.post<Tyre>('/api/admin/tyres', adding);
      setTyres(prev => [created, ...prev]);
      setAdding(null);
      showMsg('Tyre added successfully');
    } catch { showMsg('Failed to add tyre'); } finally { setSaving(false); }
  }

  async function saveEdit() {
    if (!editing?.id) return;
    setSaving(true);
    try {
      const updated = await adminApi.put<Tyre>(`/api/admin/tyres/${editing.id}`, editing);
      setTyres(prev => prev.map(t => t.id === editing.id ? { ...t, ...updated } : t));
      setEditing(null);
      showMsg('Tyre updated successfully');
    } catch { showMsg('Failed to save changes'); } finally { setSaving(false); }
  }

  async function deleteTyre(id: number) {
    if (!confirm('Delete this tyre?')) return;
    try {
      await adminApi.delete(`/api/admin/tyres/${id}`);
      setTyres(prev => prev.filter(t => t.id !== id));
      showMsg('Tyre deleted');
    } catch { showMsg('Failed to delete'); }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {msg && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium border ${msg.includes('fail') || msg.includes('Failed') ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
          {msg}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900">Tyres</h2>
            <p className="text-slate-400 text-sm mt-0.5">{tyres.length} total tyres</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search brand, model, size…"
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-56"
            />
            <button
              onClick={() => setAdding({ ...BLANK })}
              className="inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-md"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Tyre
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Brand</th>
                <th className="px-6 py-3 text-left">Model</th>
                <th className="px-6 py-3 text-left">Size</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Season</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    {search ? 'No tyres match your search' : 'No tyres yet — click "Add Tyre" to get started'}
                  </td>
                </tr>
              )}
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{t.brand}</td>
                  <td className="px-6 py-4 text-slate-600">{t.model}</td>
                  <td className="px-6 py-4 font-mono text-slate-500 text-xs">{t.size}</td>
                  <td className="px-6 py-4 text-slate-500 capitalize">{t.tyre_type ?? '—'}</td>
                  <td className="px-6 py-4 text-slate-500 capitalize">{t.season ?? '—'}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">£{Number(t.price).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => setEditing({ ...t })}
                        className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline">
                        Edit
                      </button>
                      <span className="text-slate-200">|</span>
                      <button onClick={() => deleteTyre(t.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {adding && (
        <Modal
          title="Add New Tyre"
          form={adding}
          setForm={setAdding}
          onSave={saveNew}
          onClose={() => setAdding(null)}
          saving={saving}
        />
      )}

      {editing && (
        <Modal
          title="Edit Tyre"
          form={editing}
          setForm={setEditing}
          onSave={saveEdit}
          onClose={() => setEditing(null)}
          saving={saving}
        />
      )}
    </div>
  );
}
