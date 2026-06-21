'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';

function ResetInner() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token') ?? '';
  const emailParam = params.get('email') ?? '';

  const [form, setForm] = useState({ email: emailParam, password: '', password_confirmation: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      setFieldErrors({ password_confirmation: ['Passwords do not match.'] }); return;
    }
    setLoading(true); setError(null); setFieldErrors({});
    try {
      await api.post('/api/customer/reset-password', { ...form, token });
      router.push('/login?reset=1');
    } catch (err: unknown) {
      const e = err as { message?: string; errors?: Record<string, string[]> };
      setError(e.message ?? 'Reset failed. The link may have expired.');
      setFieldErrors(e.errors ?? {});
    } finally { setLoading(false); }
  }

  const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all';

  if (!token) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-slate-700 font-bold mb-2">Invalid reset link</p>
        <Link href="/forgot-password" className="text-blue-600 text-sm hover:underline">Request a new one</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black text-[#0d1b3e]">Matrix Mobile Tyres</Link>
          <p className="text-slate-500 text-sm mt-1">Set a new password</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}

          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
              <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                className={INPUT} autoComplete="email" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">New Password</label>
              <input type="password" required value={form.password} onChange={e => set('password', e.target.value)}
                placeholder="Min. 8 characters" className={INPUT + (fieldErrors.password ? ' border-red-300' : '')} />
              {fieldErrors.password && <p className="text-xs text-red-500 mt-1">{fieldErrors.password[0]}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Confirm New Password</label>
              <input type="password" required value={form.password_confirmation} onChange={e => set('password_confirmation', e.target.value)}
                placeholder="Re-enter password" className={INPUT + (fieldErrors.password_confirmation ? ' border-red-300' : '')} />
              {fieldErrors.password_confirmation && <p className="text-xs text-red-500 mt-1">{fieldErrors.password_confirmation[0]}</p>}
            </div>
            <button type="submit" disabled={loading}
              className="w-full text-white font-bold py-3.5 rounded-xl text-sm mt-1 transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
              {loading ? 'Resetting…' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return <Suspense><ResetInner /></Suspense>;
}
