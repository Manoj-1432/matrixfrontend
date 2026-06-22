'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Notification = {
  id: number; title: string; color: string; link?: string | null;
  created_at?: string; updated_at?: string;
};

const PRESET_COLORS = ['#0d1b3e', '#1e3a8a', '#4f46e5', '#16a34a', '#dc2626', '#d97706', '#0891b2', '#7c3aed'];

const EMPTY_FORM = { title: '', color: '#1e3a8a', link: '' };

export default function AdminNotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing] = useState<Notification | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function fetchNotifications() {
    setLoading(true);
    try {
      const res = await adminApi.get<{ notifications: Notification[] }>('/api/admin/notifications');
      setNotifications(res.notifications ?? []);
    } catch { router.push('/admin/login'); }
    finally { setLoading(false); }
  }

  function openAdd() {
    setEditing(null); setForm(EMPTY_FORM); setFormErr(''); setModal('add');
  }
  function openEdit(n: Notification) {
    setEditing(n);
    setForm({ title: n.title, color: n.color, link: n.link ?? '' });
    setFormErr(''); setModal('edit');
  }

  async function save() {
    if (!form.title.trim()) { setFormErr('Title is required.'); return; }
    if (!/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(form.color)) { setFormErr('Enter a valid hex color.'); return; }
    setSaving(true); setFormErr('');
    try {
      const payload = { title: form.title.trim(), color: form.color, link: form.link.trim() || null };
      if (modal === 'add') {
        const res = await adminApi.post<{ data: Notification }>('/api/admin/notifications', payload);
        setNotifications(prev => [res.data, ...prev]);
      } else if (editing) {
        const res = await adminApi.put<{ data: Notification }>(`/api/admin/notifications/${editing.id}`, payload);
        setNotifications(prev => prev.map(n => n.id === editing.id ? res.data : n));
      }
      setModal(null);
    } catch (e: unknown) {
      const err = e as { message?: string };
      setFormErr(err?.message ?? 'Failed to save.');
    } finally { setSaving(false); }
  }

  async function del(id: number) {
    if (!confirm('Delete this notification banner?')) return;
    setDeleting(id);
    try {
      await adminApi.delete(`/api/admin/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch { /* ignore */ } finally { setDeleting(null); }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-black text-slate-900">Notification Banners</h1>
          <p className="text-slate-400 text-xs mt-0.5">Site-wide announcement bars shown to all visitors</p>
        </div>
        <button onClick={openAdd}
          className="inline-flex items-center gap-2 text-sm font-bold text-white px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Add Banner
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <svg className="w-10 h-10 text-slate-200 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <p className="text-slate-400 text-sm">No notification banners yet</p>
          <button onClick={openAdd} className="mt-4 text-blue-600 text-sm font-semibold hover:underline">Create your first banner</button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Live preview + list */}
          <div className="flex flex-col gap-3">
            {notifications.map(n => (
              <div key={n.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                {/* Banner preview */}
                <div className="px-5 py-3 text-white text-sm font-semibold flex items-center justify-between gap-4" style={{ background: n.color }}>
                  <span>{n.title}</span>
                  {n.link && <span className="text-xs opacity-70 truncate max-w-[200px]">{n.link}</span>}
                </div>
                <div className="px-5 py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="inline-block w-4 h-4 rounded-full border border-slate-200 shrink-0" style={{ background: n.color }} />
                    <span className="font-mono">{n.color}</span>
                    {n.link && <span className="truncate max-w-[200px]">{n.link}</span>}
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button onClick={() => openEdit(n)} className="text-xs text-blue-600 font-semibold hover:underline">Edit</button>
                    <button onClick={() => del(n.id)} disabled={deleting === n.id}
                      className="text-xs text-red-500 font-semibold hover:underline disabled:opacity-40">
                      {deleting === n.id ? '…' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.45)' }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="font-black text-slate-900 text-lg mb-5">{modal === 'add' ? 'Add Notification Banner' : 'Edit Banner'}</h2>

            {/* Live preview */}
            <div className="rounded-xl mb-5 px-4 py-2.5 text-white text-sm font-semibold" style={{ background: form.color || '#1e3a8a' }}>
              {form.title || 'Your banner text will appear here…'}
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Title *</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  maxLength={255}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  placeholder="🔥 20% off all orders this weekend!" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Background Colour</label>
                <div className="flex items-center gap-3">
                  <input type="text" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400 font-mono"
                    placeholder="#1e3a8a" />
                  <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                    className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5" />
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {PRESET_COLORS.map(c => (
                    <button key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${form.color === c ? 'border-blue-500 scale-110' : 'border-transparent'}`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Link (optional)</label>
                <input type="url" value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                  placeholder="https://example.com/offer" />
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
                {saving ? 'Saving…' : modal === 'add' ? 'Create Banner' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
