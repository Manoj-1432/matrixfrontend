'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Tyre = { id: number; brand: string; model: string; size: string; price: number; tyre_type?: string; season?: string; stock?: number };

export default function TyresPage() {
  const router = useRouter();
  const [tyres, setTyres] = useState<Tyre[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Tyre | null>(null);
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

  async function saveEdit() {
    if (!editing) return;
    setSaving(true);
    try {
      const updated = await adminApi.put<Tyre>(`/api/admin/tyres/${editing.id}`, editing);
      setTyres(prev => prev.map(t => t.id === editing.id ? { ...t, ...updated } : t));
      setMsg('Saved successfully');
      setEditing(null);
      setTimeout(() => setMsg(''), 3000);
    } catch { setMsg('Save failed'); } finally { setSaving(false); }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {msg && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium ${msg.includes('fail') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
          {msg}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900">Tyres</h2>
            <p className="text-slate-400 text-sm mt-0.5">{tyres.length} total tyres</p>
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search brand, model, size…"
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-64"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Brand</th>
                <th className="px-6 py-3 text-left">Model</th>
                <th className="px-6 py-3 text-left">Size</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No tyres found</td></tr>
              )}
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{t.brand}</td>
                  <td className="px-6 py-4 text-slate-600">{t.model}</td>
                  <td className="px-6 py-4 font-mono text-slate-500 text-xs">{t.size}</td>
                  <td className="px-6 py-4 text-slate-500 capitalize">{t.tyre_type ?? '—'}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">£{Number(t.price).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => setEditing({ ...t })}
                      className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7">
            <h3 className="font-black text-slate-900 text-lg mb-6">Edit Tyre</h3>
            <div className="flex flex-col gap-4">
              {(['brand','model','size','price'] as const).map(field => (
                <div key={field}>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 capitalize">{field}</label>
                  <input
                    type={field === 'price' ? 'number' : 'text'}
                    step={field === 'price' ? '0.01' : undefined}
                    value={editing[field] ?? ''}
                    onChange={e => setEditing({ ...editing, [field]: field === 'price' ? parseFloat(e.target.value) : e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm transition-colors">
                Cancel
              </button>
              <button onClick={saveEdit} disabled={saving}
                className="flex-1 text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
