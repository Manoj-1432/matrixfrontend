'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Coupon = {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number | null;
  max_uses: number | null;
  expires_at: string | null;
  is_active: boolean;
  uses_count?: number;
};

type CouponForm = {
  code: string;
  discount_type: string;
  discount_value: string;
  min_order_amount: string;
  max_uses: string;
  expires_at: string;
  is_active: boolean;
};

const BLANK: CouponForm = {
  code: '', discount_type: 'percentage', discount_value: '10',
  min_order_amount: '', max_uses: '', expires_at: '', is_active: true,
};

const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function CouponsPage() {
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<CouponForm | null>(null);
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
      const res = await adminApi.get<{ coupons: Coupon[] }>('/api/admin/coupons');
      setCoupons(res.coupons ?? []);
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

  function openEdit(c: Coupon) {
    setEditingId(c.id);
    setForm({
      code: c.code,
      discount_type: c.discount_type,
      discount_value: String(c.discount_value),
      min_order_amount: c.min_order_amount != null ? String(c.min_order_amount) : '',
      max_uses: c.max_uses != null ? String(c.max_uses) : '',
      expires_at: c.expires_at ? c.expires_at.split('T')[0] : '',
      is_active: c.is_active,
    });
  }

  function buildPayload(f: CouponForm) {
    return {
      code: f.code.trim().toUpperCase(),
      discount_type: f.discount_type,
      discount_value: parseFloat(f.discount_value),
      min_order_amount: f.min_order_amount ? parseFloat(f.min_order_amount) : null,
      max_uses: f.max_uses ? parseInt(f.max_uses) : null,
      expires_at: f.expires_at || null,
      is_active: f.is_active,
    };
  }

  async function handleSave() {
    if (!form) return;
    if (!form.code.trim()) { showMsg('Code is required', false); return; }
    setSaving(true);
    try {
      if (editingId) {
        const updated = await adminApi.put<Coupon>(`/api/admin/coupons/${editingId}`, buildPayload(form));
        setCoupons(prev => prev.map(c => c.id === editingId ? { ...c, ...updated } : c));
        showMsg('Coupon updated');
      } else {
        const created = await adminApi.post<Coupon>('/api/admin/coupons', buildPayload(form));
        setCoupons(prev => [created, ...prev]);
        showMsg('Coupon created');
      }
      setForm(null);
    } catch (e: unknown) {
      showMsg(e instanceof Error ? e.message : 'Save failed', false);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(c: Coupon) {
    try {
      const updated = await adminApi.put<Coupon>(`/api/admin/coupons/${c.id}`, { ...c, is_active: !c.is_active });
      setCoupons(prev => prev.map(x => x.id === c.id ? { ...x, ...updated } : x));
    } catch {
      showMsg('Toggle failed', false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this coupon?')) return;
    try {
      await adminApi.delete(`/api/admin/coupons/${id}`);
      setCoupons(prev => prev.filter(c => c.id !== id));
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
            <h2 className="font-bold text-slate-900">Coupons</h2>
            <p className="text-slate-400 text-sm mt-0.5">{coupons.length} total</p>
          </div>
          <button onClick={openAdd}
            className="inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-md"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Coupon
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Code</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Value</th>
                <th className="px-6 py-3 text-left">Min Order</th>
                <th className="px-6 py-3 text-left">Uses</th>
                <th className="px-6 py-3 text-left">Expires</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">No coupons yet</td>
                </tr>
              )}
              {coupons.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-slate-800">{c.code}</td>
                  <td className="px-6 py-4 capitalize text-slate-600">{c.discount_type}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {c.discount_type === 'percentage' ? `${c.discount_value}%` : `£${Number(c.discount_value).toFixed(2)}`}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{c.min_order_amount != null ? `£${Number(c.min_order_amount).toFixed(2)}` : '—'}</td>
                  <td className="px-6 py-4 text-slate-600">{c.uses_count ?? 0}{c.max_uses != null ? ` / ${c.max_uses}` : ''}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{c.expires_at ? new Date(c.expires_at).toLocaleDateString() : '—'}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleToggle(c)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all ${c.is_active ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}>
                      {c.is_active ? 'Active' : 'Inactive'}
                    </button>
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 my-4">
            <h3 className="font-black text-slate-900 text-lg mb-6">{editingId ? 'Edit Coupon' : 'Add Coupon'}</h3>
            <div className="flex flex-col gap-4">
              <Field label="Code *">
                <input type="text" value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. SAVE20" className={INPUT} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Discount Type *">
                  <select value={form.discount_type} onChange={e => setForm({ ...form, discount_type: e.target.value })} className={INPUT}>
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed (£)</option>
                  </select>
                </Field>
                <Field label="Value *">
                  <input type="number" min="0" step="0.01" value={form.discount_value}
                    onChange={e => setForm({ ...form, discount_value: e.target.value })} className={INPUT} />
                </Field>
                <Field label="Min Order (£)">
                  <input type="number" min="0" step="0.01" value={form.min_order_amount}
                    onChange={e => setForm({ ...form, min_order_amount: e.target.value })} placeholder="Optional" className={INPUT} />
                </Field>
                <Field label="Max Uses">
                  <input type="number" min="1" step="1" value={form.max_uses}
                    onChange={e => setForm({ ...form, max_uses: e.target.value })} placeholder="Unlimited" className={INPUT} />
                </Field>
              </div>
              <Field label="Expires At">
                <input type="date" value={form.expires_at} onChange={e => setForm({ ...form, expires_at: e.target.value })} className={INPUT} />
              </Field>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, is_active: !form.is_active })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.is_active ? 'bg-blue-600' : 'bg-slate-200'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${form.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className="text-sm font-medium text-slate-700">Active</span>
              </div>
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
