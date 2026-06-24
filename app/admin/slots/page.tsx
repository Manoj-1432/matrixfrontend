'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Slot = {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  max_bookings: number;
  status: boolean;
};

type SlotForm = {
  day: string;
  start_time: string;
  end_time: string;
  max_bookings: string;
};

type BulkForm = {
  days: string[];
  start_time: string;
  end_time: string;
  interval_minutes: string;
  max_bookings: string;
};

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS: Record<string, string> = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' };
const BLANK_FORM: SlotForm = { day: 'monday', start_time: '09:00', end_time: '10:00', max_bookings: '4' };
const BLANK_BULK: BulkForm = { days: [], start_time: '08:00', end_time: '18:00', interval_minutes: '60', max_bookings: '4' };

const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function SlotsPage() {
  const router = useRouter();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<SlotForm | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [bulkForm, setBulkForm] = useState<BulkForm>({ ...BLANK_BULK });
  const [bulkSaving, setBulkSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const showMsg = (text: string, ok = true) => {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.get<{ slots: Slot[] }>('/api/admin/slots');
      setSlots(res.slots ?? []);
    } catch {
      showMsg('Failed to load slots', false);
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
    setForm({ ...BLANK_FORM });
  }

  function openEdit(s: Slot) {
    setEditingId(s.id);
    setForm({ day: s.day, start_time: s.start_time, end_time: s.end_time, max_bookings: String(s.max_bookings) });
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    try {
      const body = { day: form.day, start_time: form.start_time, end_time: form.end_time, max_bookings: Number(form.max_bookings) };
      if (editingId) {
        const updated = await adminApi.put<Slot>(`/api/admin/slots/${editingId}`, body);
        setSlots(prev => prev.map(s => s.id === editingId ? { ...s, ...updated } : s));
        showMsg('Slot updated');
      } else {
        const created = await adminApi.post<Slot>('/api/admin/slots', body);
        setSlots(prev => [...prev, created]);
        showMsg('Slot created');
      }
      setForm(null);
    } catch (e: unknown) {
      showMsg(e instanceof Error ? e.message : 'Save failed', false);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(id: number) {
    try {
      const updated = await adminApi.patch<Slot>(`/api/admin/slots/${id}/toggle-status`);
      setSlots(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    } catch {
      showMsg('Toggle failed', false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this slot?')) return;
    try {
      await adminApi.delete(`/api/admin/slots/${id}`);
      setSlots(prev => prev.filter(s => s.id !== id));
      showMsg('Slot deleted');
    } catch {
      showMsg('Delete failed', false);
    }
  }

  async function handleBulkGenerate() {
    if (bulkForm.days.length === 0) { showMsg('Select at least one day', false); return; }
    setBulkSaving(true);
    try {
      // Backend handles one day at a time — call once per selected day
      await Promise.all(bulkForm.days.map(day =>
        adminApi.post('/api/admin/slots/bulk-generate', {
          day,
          start_time: bulkForm.start_time,
          end_time: bulkForm.end_time,
          duration: Number(bulkForm.interval_minutes),
          max_bookings: Number(bulkForm.max_bookings),
        })
      ));
      showMsg('Slots generated successfully');
      setShowBulk(false);
      setBulkForm({ ...BLANK_BULK });
      await load();
    } catch (e: unknown) {
      showMsg(e instanceof Error ? e.message : 'Bulk generate failed', false);
    } finally {
      setBulkSaving(false);
    }
  }

  function toggleBulkDay(day: string) {
    setBulkForm(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day],
    }));
  }

  const grouped = DAYS.reduce<Record<string, Slot[]>>((acc, d) => {
    acc[d] = slots.filter(s => s.day === d);
    return acc;
  }, {});

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
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900">Booking Slots</h2>
            <p className="text-slate-400 text-sm mt-0.5">{slots.length} total slots</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowBulk(true)}
              className="inline-flex items-center gap-2 border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Bulk Generate
            </button>
            <button onClick={openAdd}
              className="inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-md"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Slot
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Day</th>
                <th className="px-6 py-3 text-left">Start</th>
                <th className="px-6 py-3 text-left">End</th>
                <th className="px-6 py-3 text-center">Max Bookings</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {slots.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">No slots yet</td>
                </tr>
              )}
              {DAYS.flatMap(day =>
                grouped[day].map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{DAY_LABELS[s.day] ?? s.day}</td>
                    <td className="px-6 py-4 font-mono text-slate-600">{s.start_time}</td>
                    <td className="px-6 py-4 font-mono text-slate-600">{s.end_time}</td>
                    <td className="px-6 py-4 text-center text-slate-600">{s.max_bookings}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleToggle(s.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all ${s.status ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}>
                        {s.status ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => openEdit(s)} className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline">Edit</button>
                        <span className="text-slate-200">|</span>
                        <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {form && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7">
            <h3 className="font-black text-slate-900 text-lg mb-6">{editingId ? 'Edit Slot' : 'Add Slot'}</h3>
            <div className="flex flex-col gap-4">
              <Field label="Day *">
                <select value={form.day} onChange={e => setForm({ ...form, day: e.target.value })} className={INPUT}>
                  {DAYS.map(d => <option key={d} value={d}>{DAY_LABELS[d]}</option>)}
                </select>
              </Field>
              <Field label="Start Time *">
                <input type="time" value={form.start_time} onChange={e => setForm({ ...form, start_time: e.target.value })} className={INPUT} />
              </Field>
              <Field label="End Time *">
                <input type="time" value={form.end_time} onChange={e => setForm({ ...form, end_time: e.target.value })} className={INPUT} />
              </Field>
              <Field label="Max Bookings *">
                <input type="number" min="1" value={form.max_bookings} onChange={e => setForm({ ...form, max_bookings: e.target.value })} className={INPUT} />
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

      {/* Bulk Generate Modal */}
      {showBulk && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7">
            <h3 className="font-black text-slate-900 text-lg mb-6">Bulk Generate Slots</h3>
            <div className="flex flex-col gap-4">
              <Field label="Days *">
                <div className="flex flex-wrap gap-2">
                  {DAYS.map(d => (
                    <button key={d} onClick={() => toggleBulkDay(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${bulkForm.days.includes(d) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}>
                      {DAY_LABELS[d]}
                    </button>
                  ))}
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Start Time *">
                  <input type="time" value={bulkForm.start_time} onChange={e => setBulkForm({ ...bulkForm, start_time: e.target.value })} className={INPUT} />
                </Field>
                <Field label="End Time *">
                  <input type="time" value={bulkForm.end_time} onChange={e => setBulkForm({ ...bulkForm, end_time: e.target.value })} className={INPUT} />
                </Field>
                <Field label="Interval (mins) *">
                  <input type="number" min="15" step="15" value={bulkForm.interval_minutes} onChange={e => setBulkForm({ ...bulkForm, interval_minutes: e.target.value })} className={INPUT} />
                </Field>
                <Field label="Max Bookings *">
                  <input type="number" min="1" value={bulkForm.max_bookings} onChange={e => setBulkForm({ ...bulkForm, max_bookings: e.target.value })} className={INPUT} />
                </Field>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowBulk(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm">Cancel</button>
              <button onClick={handleBulkGenerate} disabled={bulkSaving}
                className="flex-1 text-white font-bold py-3 rounded-xl text-sm disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                {bulkSaving ? 'Generating…' : 'Generate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
