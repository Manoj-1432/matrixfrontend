'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, type CustomerUser } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    password: '', password_confirmation: '',
  });
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
      const data = await api.post<{ token: string; user: CustomerUser }>('/api/customer/register', form);
      localStorage.setItem('customer_token', data.token);
      localStorage.setItem('customer_user', JSON.stringify(data.user));
      router.push('/account');
    } catch (err: unknown) {
      const e = err as { message?: string; errors?: Record<string, string[]> };
      setError(e.message ?? 'Registration failed.');
      setFieldErrors(e.errors ?? {});
    } finally { setLoading(false); }
  }

  const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all';

  function Field({ label, k, type = 'text', placeholder = '', autocomplete = '' }: { label: string; k: keyof typeof form; type?: string; placeholder?: string; autocomplete?: string }) {
    return (
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
        <input type={type} required value={form[k]} onChange={e => set(k, e.target.value)}
          placeholder={placeholder} autoComplete={autocomplete || undefined}
          className={INPUT + (fieldErrors[k] ? ' border-red-300' : '')} />
        {fieldErrors[k] && <p className="text-xs text-red-500 mt-1">{fieldErrors[k][0]}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black text-[#0d1b3e]">Matrix Mobile Tyres</Link>
          <p className="text-slate-500 text-sm mt-1">Create your account</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First Name" k="first_name" placeholder="John" />
              <Field label="Last Name" k="last_name" placeholder="Smith" />
            </div>
            <Field label="Email Address" k="email" type="email" placeholder="your@email.com" autocomplete="email" />
            <Field label="Phone Number" k="phone" type="tel" placeholder="07700 000000" />
            <Field label="Password" k="password" type="password" placeholder="Min. 8 characters" autocomplete="new-password" />
            <Field label="Confirm Password" k="password_confirmation" type="password" placeholder="Re-enter password" autocomplete="new-password" />

            <button type="submit" disabled={loading}
              className="w-full text-white font-bold py-3.5 rounded-xl text-sm mt-1 transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
