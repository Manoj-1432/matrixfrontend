'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, type CustomerUser } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const data = await api.post<{ token: string; user: CustomerUser }>('/api/customer/login', form);
      localStorage.setItem('customer_token', data.token);
      localStorage.setItem('customer_user', JSON.stringify(data.user));
      router.push('/account');
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e.message ?? 'Login failed. Check your email and password.');
    } finally { setLoading(false); }
  }

  const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black text-[#0d1b3e]">Matrix Mobile Tyres</Link>
          <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
              <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                placeholder="your@email.com" className={INPUT} autoComplete="email" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline font-medium">Forgot password?</Link>
              </div>
              <input type="password" required value={form.password} onChange={e => set('password', e.target.value)}
                placeholder="••••••••" className={INPUT} autoComplete="current-password" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full text-white font-bold py-3.5 rounded-xl text-sm mt-1 transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
