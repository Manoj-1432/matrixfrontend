'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Charge = {
  id: number;
  from_distance: number;
  to_distance: number;
  charge: number;
  status: 'active' | 'inactive';
};

type ChargeForm = {
  from_distance: string;
  to_distance: string;
  charge: string;
  status: 'active' | 'inactive';
};

const BLANK: ChargeForm = { from_distance: '0', to_distance: '10', charge: '0', status: 'active' };
const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function DeliveryChargesPage() {
  const router = useRouter();
  const [charges, setCharges] = useState<Charge[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ChargeForm | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const showMsg = (text: string, ok = true) => {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.get<{ delivery_charges: Charge[] }>('/api/admin/delivery-charges');
      setCharges(res.delivery_charges ?? []);
    } catch {
      showMsg('Failed to load', false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    load();
  }, [router, load]);

  function openAdd() {
    setEditingId(null);
    setForm({ ...BLANK });
  }

  function openEdit(c: Charge) {
    setEditingId(c.id);
    setForm({ from_distance: String(c.from_distance), to_distance: String(c.to_distance), charge: String(c.charge), status: c.status });
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    try {
      const body = {
        from_distance: Number(form.from_distance),
        to_distance: Number(form.to_distance),
        charge: parseFloat(form.charge),
        status: form.status,
      };
      if (editingId) {
        const updated = await adminApi.put<Charge>(`/api/admin/delivery-charges/${editingId}`, body);
        setCharges(prev => prev.map(c => c.id === editingId ? { ...c, ...updated } : c));
        showMsg('Updated');
      } else {
        const created = await adminApi.post<Charge>('/api/admin/delivery-charges', body);
        setCharges(prev => [...prev, created]);
        showMsg('Created');
      }
      setForm(null);
    } catch (e: unknown) {
      showMsg(e instanceof Error ? e.message : 'Save failed', false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this charge?')) return;
    try {
      await adminApi.delete(`/api/admin/delivery-charges/${id}`);
      setCharges(prev => prev.filter(c => c.id !== id));
      showMsg('Deleted');
    } catch {
      showMsg('Delete failed', false);
    }
  }

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
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900">Delivery Charges</h2>
            <p className="text-slate-400 text-sm mt-0.5">{charges.length} rules</p>
          </div>
          <button onClick={openAdd}
            className="inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-md"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Rule
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-3 text-left">From (miles)</th>
                <th className="px-6 py-3 text-left">To (miles)</th>
                <th className="px-6 py-3 text-right">Charge</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {charges.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No delivery charge rules yet</td>
                </tr>
              )}
              {charges.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-600">{c.from_distance} mi</td>
                  <td className="px-6 py-4 text-slate-600">{c.to_distance} mi</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">£{Number(c.charge).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => openEdit(c)} className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline">Edit</button>
                      <span className="text-slate-200">|</span>
                      <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {form && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7">
            <h3 className="font-black text-slate-900 text-lg mb-6">{editingId ? 'Edit Charge' : 'Add Charge Rule'}</h3>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="From Distance (miles) *">
                  <input type="number" min="0" step="0.1" value={form.from_distance}
                    onChange={e => setForm({ ...form, from_distance: e.target.value })} className={INPUT} />
                </Field>
                <Field label="To Distance (miles) *">
                  <input type="number" min="0" step="0.1" value={form.to_distance}
                    onChange={e => setForm({ ...form, to_distance: e.target.value })} className={INPUT} />
                </Field>
              </div>
              <Field label="Charge (£) *">
                <input type="number" min="0" step="0.01" value={form.charge}
                  onChange={e => setForm({ ...form, charge: e.target.value })} className={INPUT} />
              </Field>
              <Field label="Status *">
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })} className={INPUT}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </Field>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setForm(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 text-white font-bold py-3 rounded-xl text-sm disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
