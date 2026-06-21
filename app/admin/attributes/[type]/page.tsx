'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type AttrItem = { id: number; name?: string; label?: string; rating?: string };

type TypeConfig = {
  endpoint: string;
  listKey: string;
  field: 'name' | 'label' | 'rating';
  label: string;
  placeholder: string;
};

const TYPE_MAP: Record<string, TypeConfig> = {
  brand: { endpoint: 'attributes/brand', listKey: 'brands', field: 'name', label: 'Brands', placeholder: 'e.g. Michelin' },
  size: { endpoint: 'attributes/size', listKey: 'sizes', field: 'label', label: 'Sizes', placeholder: 'e.g. 205/55R16' },
  season: { endpoint: 'attributes/season', listKey: 'seasons', field: 'name', label: 'Seasons', placeholder: 'e.g. Summer' },
  'tyre-type': { endpoint: 'attributes/tyre-type', listKey: 'tyre_types', field: 'name', label: 'Tyre Types', placeholder: 'e.g. Run-Flat' },
  'fuel-efficiency': { endpoint: 'attributes/fuel-efficiency', listKey: 'fuel_efficiencies', field: 'rating', label: 'Fuel Efficiency', placeholder: 'e.g. A' },
  'speed-rating': { endpoint: 'attributes/speed-rating', listKey: 'speed_ratings', field: 'rating', label: 'Speed Ratings', placeholder: 'e.g. V' },
};

const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white';

function Modal({
  title, value, onChange, onSave, onClose, saving, placeholder,
}: {
  title: string; value: string; onChange: (v: string) => void;
  onSave: () => void; onClose: () => void; saving: boolean; placeholder: string;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7">
        <h3 className="font-black text-slate-900 text-lg mb-5">{title}</h3>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={INPUT}
          onKeyDown={e => e.key === 'Enter' && onSave()}
          autoFocus
        />
        <div className="flex gap-3 mt-5">
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

export default function AttributePage() {
  const router = useRouter();
  const params = useParams();
  const typeParam = Array.isArray(params.type) ? params.type[0] : params.type ?? '';

  const config = TYPE_MAP[typeParam];

  const [items, setItems] = useState<AttrItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ mode: 'add' | 'edit'; id?: number } | null>(null);
  const [fieldValue, setFieldValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const showMsg = (text: string, ok = true) => {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3000);
  };

  const load = useCallback(async () => {
    if (!config) return;
    setLoading(true);
    try {
      const res = await adminApi.get<Record<string, AttrItem[]>>(`/api/admin/${config.endpoint}`);
      setItems(res[config.listKey] ?? []);
    } catch {
      showMsg('Failed to load data', false);
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    if (!config) { router.push('/admin/dashboard'); return; }
    load();
  }, [router, config, load]);

  function openAdd() {
    setFieldValue('');
    setModal({ mode: 'add' });
  }

  function openEdit(item: AttrItem) {
    setFieldValue((item[config.field] as string) ?? '');
    setModal({ mode: 'edit', id: item.id });
  }

  async function handleSave() {
    if (!fieldValue.trim()) { showMsg('Value is required', false); return; }
    setSaving(true);
    try {
      const body = { [config.field]: fieldValue.trim() };
      if (modal?.mode === 'add') {
        const created = await adminApi.post<AttrItem>(`/api/admin/${config.endpoint}`, body);
        setItems(prev => [...prev, created]);
        showMsg(`${config.label.slice(0, -1)} added`);
      } else if (modal?.id) {
        const updated = await adminApi.put<AttrItem>(`/api/admin/${config.endpoint}/${modal.id}`, body);
        setItems(prev => prev.map(i => i.id === modal.id ? { ...i, ...updated } : i));
        showMsg('Updated successfully');
      }
      setModal(null);
    } catch (e: unknown) {
      showMsg(e instanceof Error ? e.message : 'Save failed', false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this item?')) return;
    try {
      await adminApi.delete(`/api/admin/${config.endpoint}/${id}`);
      setItems(prev => prev.filter(i => i.id !== id));
      showMsg('Deleted');
    } catch {
      showMsg('Delete failed', false);
    }
  }

  function getDisplay(item: AttrItem): string {
    return (item[config.field] as string) ?? '—';
  }

  if (!config) return null;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      {msg && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium border ${msg.ok ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {msg.text}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900">{config.label}</h2>
            <p className="text-slate-400 text-sm mt-0.5">{items.length} total</p>
          </div>
          <button onClick={openAdd}
            className="inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-md"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add {config.label.slice(0, -1)}
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Value</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                  No {config.label.toLowerCase()} yet — click &quot;Add&quot; to get started
                </td>
              </tr>
            )}
            {items.map((item, i) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-slate-400 text-xs">{i + 1}</td>
                <td className="px-6 py-4 font-medium text-slate-800">{getDisplay(item)}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => openEdit(item)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline">Edit</button>
                    <span className="text-slate-200">|</span>
                    <button onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title={modal.mode === 'add' ? `Add ${config.label.slice(0, -1)}` : `Edit ${config.label.slice(0, -1)}`}
          value={fieldValue}
          onChange={setFieldValue}
          onSave={handleSave}
          onClose={() => setModal(null)}
          saving={saving}
          placeholder={config.placeholder}
        />
      )}
    </div>
  );
}
