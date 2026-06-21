'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Tyre = {
  id: number; brand_id: number; brand_name?: string;
  model: string; size_id: number; size_label?: string;
  season_id?: number | null; season_name?: string;
  tyre_type_id?: number | null; tyre_type_name?: string;
  price: number; stock: number; description?: string;
  status: boolean; image_url?: string;
};

type Attr = { id: number; name?: string; label?: string };

type FormData = {
  brand_id: string; model: string; size_id: string;
  season_id: string; tyre_type_id: string;
  price: string; stock: string; description: string; status: string;
};

const BLANK: FormData = {
  brand_id: '', model: '', size_id: '', season_id: '',
  tyre_type_id: '', price: '', stock: '0', description: '', status: 'active',
};

const STATUS_BADGE = 'bg-green-50 text-green-700 border-green-200';
const STATUS_BADGE_OFF = 'bg-slate-100 text-slate-500 border-slate-200';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const INPUT = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white";

function TyreModal({
  title, form, setForm, brands, sizes, seasons, tyreTypes, onSave, onClose, saving,
}: {
  title: string; form: FormData; setForm: (f: FormData) => void;
  brands: Attr[]; sizes: Attr[]; seasons: Attr[]; tyreTypes: Attr[];
  onSave: () => void; onClose: () => void; saving: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-7 my-4">
        <h3 className="font-black text-slate-900 text-lg mb-6">{title}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Field label="Brand *">
              <select value={form.brand_id} onChange={e => setForm({ ...form, brand_id: e.target.value })} className={INPUT}>
                <option value="">Select brand</option>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Model *">
              <input type="text" value={form.model} onChange={e => setForm({ ...form, model: e.target.value })}
                placeholder="e.g. Pilot Sport 4S" className={INPUT} />
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Size *">
              <select value={form.size_id} onChange={e => setForm({ ...form, size_id: e.target.value })} className={INPUT}>
                <option value="">Select size</option>
                {sizes.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Season">
            <select value={form.season_id} onChange={e => setForm({ ...form, season_id: e.target.value })} className={INPUT}>
              <option value="">Any</option>
              {seasons.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>
          <Field label="Tyre Type">
            <select value={form.tyre_type_id} onChange={e => setForm({ ...form, tyre_type_id: e.target.value })} className={INPUT}>
              <option value="">Any</option>
              {tyreTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </Field>
          <Field label="Price (£) *">
            <input type="number" min="0" step="0.01" value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })} className={INPUT} />
          </Field>
          <Field label="Stock *">
            <input type="number" min="0" step="1" value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })} className={INPUT} />
          </Field>
          <div className="col-span-2">
            <Field label="Description">
              <textarea rows={3} value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Optional product description…"
                className={INPUT + ' resize-none'} />
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Status">
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={INPUT}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          </div>
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
  const [brands, setBrands] = useState<Attr[]>([]);
  const [sizes, setSizes] = useState<Attr[]>([]);
  const [seasons, setSeasons] = useState<Attr[]>([]);
  const [tyreTypes, setTyreTypes] = useState<Attr[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState<FormData | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    Promise.all([
      adminApi.get<{ tyres: Tyre[] }>('/api/admin/tyres'),
      adminApi.get<{ brands: Attr[] }>('/api/admin/attributes/brand'),
      adminApi.get<{ sizes: Attr[] }>('/api/admin/attributes/size'),
      adminApi.get<{ seasons: Attr[] }>('/api/admin/attributes/season'),
      adminApi.get<{ tyre_types: Attr[] }>('/api/admin/attributes/tyre-type'),
    ]).then(([t, b, s, se, tt]) => {
      setTyres(t.tyres ?? []);
      setBrands(b.brands ?? []);
      setSizes(s.sizes ?? []);
      setSeasons(se.seasons ?? []);
      setTyreTypes(tt.tyre_types ?? []);
    }).catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [router]);

  function showMsg(text: string, ok = true) {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3000);
  }

  function openAdd() {
    setEditingId(null);
    setForm({ ...BLANK });
  }

  function openEdit(t: Tyre) {
    setEditingId(t.id);
    setForm({
      brand_id: String(t.brand_id), model: t.model,
      size_id: String(t.size_id),
      season_id: t.season_id ? String(t.season_id) : '',
      tyre_type_id: t.tyre_type_id ? String(t.tyre_type_id) : '',
      price: String(t.price), stock: String(t.stock),
      description: t.description ?? '',
      status: t.status ? 'active' : 'inactive',
    });
  }

  function buildPayload(f: FormData) {
    return {
      brand_id: Number(f.brand_id),
      model: f.model,
      size_id: Number(f.size_id),
      season_id: f.season_id ? Number(f.season_id) : null,
      tyre_type_id: f.tyre_type_id ? Number(f.tyre_type_id) : null,
      price: parseFloat(f.price),
      stock: parseInt(f.stock),
      description: f.description || null,
      status: f.status,
    };
  }

  async function handleSave() {
    if (!form) return;
    if (!form.brand_id || !form.model || !form.size_id || !form.price) {
      showMsg('Brand, model, size and price are required.', false); return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const updated = await adminApi.put<Tyre>(`/api/admin/tyres/${editingId}`, buildPayload(form));
        setTyres(prev => prev.map(t => t.id === editingId ? { ...t, ...updated } : t));
        showMsg('Tyre updated successfully');
      } else {
        const created = await adminApi.post<Tyre>('/api/admin/tyres', buildPayload(form));
        setTyres(prev => [created, ...prev]);
        showMsg('Tyre added successfully');
      }
      setForm(null);
    } catch (e: unknown) {
      showMsg(e instanceof Error ? e.message : 'Save failed', false);
    } finally { setSaving(false); }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this tyre?')) return;
    try {
      await adminApi.delete(`/api/admin/tyres/${id}`);
      setTyres(prev => prev.filter(t => t.id !== id));
      showMsg('Tyre deleted');
    } catch { showMsg('Failed to delete', false); }
  }

  const filtered = tyres.filter(t =>
    [t.brand_name, t.model, t.size_label].join(' ').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {msg && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium border ${msg.ok ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {msg.text}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900">Tyres</h2>
            <p className="text-slate-400 text-sm mt-0.5">{tyres.length} total</p>
          </div>
          <div className="flex items-center gap-3">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search brand, model, size…"
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-56" />
            <button onClick={openAdd}
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
                <th className="px-6 py-3 text-left">Season</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-center">Stock</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-slate-400">
                    {search ? 'No tyres match your search' : 'No tyres yet — click "Add Tyre" to get started'}
                  </td>
                </tr>
              )}
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-800">{t.brand_name ?? '—'}</td>
                  <td className="px-6 py-4 text-slate-600">{t.model}</td>
                  <td className="px-6 py-4 font-mono text-slate-500 text-xs">{t.size_label ?? '—'}</td>
                  <td className="px-6 py-4 text-slate-500 capitalize">{t.season_name ?? '—'}</td>
                  <td className="px-6 py-4 text-slate-500 capitalize">{t.tyre_type_name ?? '—'}</td>
                  <td className="px-6 py-4 text-center text-slate-600 font-medium">{t.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${t.status ? STATUS_BADGE : STATUS_BADGE_OFF}`}>
                      {t.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">£{Number(t.price).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => openEdit(t)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline">Edit</button>
                      <span className="text-slate-200">|</span>
                      <button onClick={() => handleDelete(t.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {form && (
        <TyreModal
          title={editingId ? 'Edit Tyre' : 'Add New Tyre'}
          form={form} setForm={setForm}
          brands={brands} sizes={sizes} seasons={seasons} tyreTypes={tyreTypes}
          onSave={handleSave} onClose={() => setForm(null)} saving={saving}
        />
      )}
    </div>
  );
}
