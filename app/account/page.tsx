'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { customerApi, type CustomerUser, type Order } from '@/lib/api';

type Tab = 'orders' | 'profile' | 'password';

const STATUS_STYLE: Record<string, string> = {
  pending:    'bg-amber-50 text-amber-700 border-amber-200',
  processing: 'bg-blue-50 text-blue-700 border-blue-200',
  completed:  'bg-green-50 text-green-700 border-green-200',
  cancelled:  'bg-red-50 text-red-700 border-red-200',
};

const PAYMENT_STYLE: Record<string, string> = {
  paid:    'bg-green-50 text-green-700 border-green-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  failed:  'bg-red-50 text-red-700 border-red-200',
};

export default function AccountPage() {
  const router = useRouter();
  const [tab, setTab]         = useState<Tab>('orders');
  const [user, setUser]       = useState<CustomerUser | null>(null);
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', vehicle_registration_number: '', address: '', city: '', postcode: '' });
  const [pwForm, setPwForm]           = useState({ current_password: '', password: '', password_confirmation: '' });
  const [saving, setSaving]           = useState(false);
  const [msg, setMsg]                 = useState<{ text: string; ok: boolean } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const token = localStorage.getItem('customer_token');
    if (!token) { router.push('/login'); return; }

    Promise.all([
      customerApi.get<{ user: CustomerUser }>('/api/customer/me'),
      customerApi.get<{ orders: Order[] }>('/api/customer/orders'),
    ]).then(([me, ord]) => {
      setUser(me.user);
      setOrders(ord.orders ?? []);
      setProfileForm({
        name: me.user.name ?? '',
        email: me.user.email ?? '',
        phone: me.user.phone ?? '',
        vehicle_registration_number: me.user.vehicle_registration_number ?? '',
        address: me.user.address ?? '',
        city: me.user.city ?? '',
        postcode: me.user.postcode ?? '',
      });
    }).catch(() => { router.push('/login'); })
      .finally(() => setLoading(false));
  }, [router]);

  function showMsg(text: string, ok = true) {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 4000);
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setFieldErrors({});
    try {
      const data = await customerApi.put<{ user: CustomerUser }>('/api/customer/profile', profileForm);
      setUser(data.user);
      localStorage.setItem('customer_user', JSON.stringify(data.user));
      showMsg('Profile updated successfully');
    } catch (err: unknown) {
      const e = err as { message?: string; errors?: Record<string, string[]> };
      showMsg(e.message ?? 'Update failed', false);
      setFieldErrors(e.errors ?? {});
    } finally { setSaving(false); }
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pwForm.password !== pwForm.password_confirmation) {
      setFieldErrors({ password_confirmation: ['Passwords do not match.'] }); return;
    }
    setSaving(true); setFieldErrors({});
    try {
      await customerApi.put('/api/customer/password', pwForm);
      setPwForm({ current_password: '', password: '', password_confirmation: '' });
      showMsg('Password changed successfully');
    } catch (err: unknown) {
      const e = err as { message?: string; errors?: Record<string, string[]> };
      showMsg(e.message ?? 'Password change failed', false);
      setFieldErrors(e.errors ?? {});
    } finally { setSaving(false); }
  }

  function logout() {
    customerApi.post('/api/customer/logout', {}).catch(() => null);
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_user');
    router.push('/login');
  }

  const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all';

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#0d1b3e] text-white py-10 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.18em] mb-1">My Account</p>
            <h1 className="text-2xl font-black">{user?.name ?? 'Account'}</h1>
            <p className="text-blue-200/70 text-sm mt-0.5">{user?.email}</p>
          </div>
          <button onClick={logout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {msg && (
          <div className={`mb-6 px-5 py-3.5 rounded-xl text-sm font-medium border ${msg.ok ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {msg.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm w-fit">
          {([['orders', 'My Orders'], ['profile', 'Profile'], ['password', 'Password']] as [Tab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === key ? 'bg-[#0d1b3e] text-white shadow-md' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Orders tab */}
        {tab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">Order History</h2>
              <p className="text-slate-400 text-sm mt-0.5">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
            </div>
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                </div>
                <p className="text-slate-700 font-bold mb-1">No orders yet</p>
                <p className="text-slate-400 text-sm mb-5">Book your first tyre fitting today.</p>
                <Link href="/tyres"
                  className="inline-flex items-center gap-2 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
                  style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                  Find Tyres
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-3 text-left">Order</th>
                      <th className="px-6 py-3 text-left">Tyre</th>
                      <th className="px-6 py-3 text-left">Fitting Date</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Payment</th>
                      <th className="px-6 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-800">
                          {o.order_ref ?? `#ORD-${String(o.id).padStart(4,'0')}`}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          <p className="font-medium">{o.tyre_brand} {o.tyre_model}</p>
                          <p className="text-xs text-slate-400 font-mono">{o.tyre_size} × {o.tyre_quantity}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-xs">{o.fitting_date ?? '—'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${STATUS_STYLE[o.status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${PAYMENT_STYLE[o.payment_status] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                            {o.payment_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">£{Number(o.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Profile tab */}
        {tab === 'profile' && (
          <form onSubmit={saveProfile} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 max-w-xl">
            <h2 className="font-bold text-slate-900 mb-5">Personal Information</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Full Name</label>
                <input type="text" required value={profileForm.name} onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                  className={INPUT + (fieldErrors.name ? ' border-red-300' : '')} />
                {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name[0]}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
                <input type="email" required value={profileForm.email} onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))}
                  className={INPUT + (fieldErrors.email ? ' border-red-300' : '')} />
                {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email[0]}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Phone</label>
                <input type="tel" value={profileForm.phone} onChange={e => setProfileForm(f => ({ ...f, phone: e.target.value }))} className={INPUT} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Vehicle Reg (saved for fast checkout)</label>
                <input type="text" value={profileForm.vehicle_registration_number}
                  onChange={e => setProfileForm(f => ({ ...f, vehicle_registration_number: e.target.value.toUpperCase() }))}
                  placeholder="AB12 CDE" className={INPUT} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Address</label>
                <input type="text" value={profileForm.address} onChange={e => setProfileForm(f => ({ ...f, address: e.target.value }))} className={INPUT} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">City</label>
                  <input type="text" value={profileForm.city} onChange={e => setProfileForm(f => ({ ...f, city: e.target.value }))} className={INPUT} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Postcode</label>
                  <input type="text" value={profileForm.postcode} onChange={e => setProfileForm(f => ({ ...f, postcode: e.target.value.toUpperCase() }))} className={INPUT} />
                </div>
              </div>
            </div>
            <button type="submit" disabled={saving}
              className="mt-6 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        )}

        {/* Password tab */}
        {tab === 'password' && (
          <form onSubmit={savePassword} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 max-w-md">
            <h2 className="font-bold text-slate-900 mb-5">Change Password</h2>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Current Password', k: 'current_password' },
                { label: 'New Password', k: 'password' },
                { label: 'Confirm New Password', k: 'password_confirmation' },
              ].map(({ label, k }) => (
                <div key={k}>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
                  <input type="password" required
                    value={pwForm[k as keyof typeof pwForm]}
                    onChange={e => setPwForm(f => ({ ...f, [k]: e.target.value }))}
                    className={INPUT + (fieldErrors[k] ? ' border-red-300' : '')} />
                  {fieldErrors[k] && <p className="text-xs text-red-500 mt-1">{fieldErrors[k][0]}</p>}
                </div>
              ))}
            </div>
            <button type="submit" disabled={saving}
              className="mt-6 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
              {saving ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
