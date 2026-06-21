'use client';
import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      await api.post('/api/customer/forgot-password', { email });
      setSent(true);
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e.message ?? 'Something went wrong.');
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-black text-[#0d1b3e]">Matrix Mobile Tyres</Link>
          <p className="text-slate-500 text-sm mt-1">Reset your password</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h2 className="font-bold text-slate-900 text-lg mb-2">Check your email</h2>
              <p className="text-slate-500 text-sm mb-6">If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link.</p>
              <Link href="/login" className="text-blue-600 font-semibold text-sm hover:underline">Back to sign in</Link>
            </div>
          ) : (
            <>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-5">{error}</div>}
              <p className="text-slate-500 text-sm mb-5">Enter your email and we&apos;ll send you a link to reset your password.</p>
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full text-white font-bold py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-slate-500 mt-5">
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">← Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
