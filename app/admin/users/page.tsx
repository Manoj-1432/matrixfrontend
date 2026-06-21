'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Role = { id: number; name: string };
type User = { id: number; name: string; email: string; role?: Role; role_id?: number };

type UserForm = {
  name: string;
  email: string;
  password: string;
  role_id: string;
};

const BLANK: UserForm = { name: '', email: '', password: '', role_id: '' };
const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<UserForm | null>(null);
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
      const res = await adminApi.get<{ users: User[]; roles?: Role[] }>('/api/admin/users');
      setUsers(res.users ?? []);
      if (res.roles) setRoles(res.roles);
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

  function openEdit(u: User) {
    setEditingId(u.id);
    setForm({ name: u.name, email: u.email, password: '', role_id: u.role?.id ? String(u.role.id) : (u.role_id ? String(u.role_id) : '') });
  }

  async function handleSave() {
    if (!form) return;
    if (!form.name.trim() || !form.email.trim()) { showMsg('Name and email are required', false); return; }
    if (!editingId && !form.password) { showMsg('Password is required for new users', false); return; }
    setSaving(true);
    try {
      const body: Record<string, unknown> = { name: form.name.trim(), email: form.email.trim(), role_id: form.role_id ? Number(form.role_id) : undefined };
      if (form.password) body.password = form.password;
      if (editingId) {
        const updated = await adminApi.put<User>(`/api/admin/users/${editingId}`, body);
        setUsers(prev => prev.map(u => u.id === editingId ? { ...u, ...updated } : u));
        showMsg('User updated');
      } else {
        const created = await adminApi.post<User>('/api/admin/users', body);
        setUsers(prev => [created, ...prev]);
        showMsg('User created');
      }
      setForm(null);
    } catch (e: unknown) {
      showMsg(e instanceof Error ? e.message : 'Save failed', false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this user?')) return;
    try {
      await adminApi.delete(`/api/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      showMsg('User deleted');
    } catch {
      showMsg('Delete failed', false);
    }
  }

  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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
            <h2 className="font-bold text-slate-900">Users</h2>
            <p className="text-slate-400 text-sm mt-0.5">{users.length} total</p>
          </div>
          <button onClick={openAdd}
            className="inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-md"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">No users yet</td>
                </tr>
              )}
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                        {getInitials(u.name)}
                      </div>
                      <span className="font-medium text-slate-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{u.email}</td>
                  <td className="px-6 py-4">
                    {u.role ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 capitalize">
                        {u.role.name}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => openEdit(u)} className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline">Edit</button>
                      <span className="text-slate-200">|</span>
                      <button onClick={() => handleDelete(u.id)} className="text-red-500 hover:text-red-700 text-xs font-semibold hover:underline">Delete</button>
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
            <h3 className="font-black text-slate-900 text-lg mb-6">{editingId ? 'Edit User' : 'Add User'}</h3>
            <div className="flex flex-col gap-4">
              <Field label="Name *">
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name" className={INPUT} />
              </Field>
              <Field label="Email *">
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com" className={INPUT} />
              </Field>
              <Field label={editingId ? 'New Password (leave blank to keep)' : 'Password *'}>
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder={editingId ? 'Leave blank to keep current' : 'Enter password'} className={INPUT} />
              </Field>
              {roles.length > 0 && (
                <Field label="Role">
                  <select value={form.role_id} onChange={e => setForm({ ...form, role_id: e.target.value })} className={INPUT}>
                    <option value="">Select role</option>
                    {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                  </select>
                </Field>
              )}
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
