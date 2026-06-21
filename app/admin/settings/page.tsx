'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type Settings = {
  business_name: string;
  phone: string;
  email: string;
  address: string;
  vat_enabled: boolean;
  vat_percentage: number | string;
  platform_fee_enabled: boolean;
  platform_fee: number | string;
  tpms_charge_enabled: boolean;
  tpms_charge: number | string;
  currency: string;
  min_fitting_date: number | string;
};

const DEFAULTS: Settings = {
  business_name: '', phone: '', email: '', address: '',
  vat_enabled: false, vat_percentage: 20,
  platform_fee_enabled: false, platform_fee: 0,
  tpms_charge_enabled: false, tpms_charge: 0,
  currency: 'GBP', min_fitting_date: 1,
};

const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white';

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <button type="button" onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-slate-200'}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-5 pb-3 border-b border-slate-100">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>({ ...DEFAULTS });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const showMsg = (text: string, ok = true) => {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 4000);
  };

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    adminApi.get<Settings>('/api/admin/settings')
      .then(data => setSettings({ ...DEFAULTS, ...data }))
      .catch(() => showMsg('Failed to load settings', false))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        ...settings,
        vat_percentage: Number(settings.vat_percentage),
        platform_fee: Number(settings.platform_fee),
        tpms_charge: Number(settings.tpms_charge),
        min_fitting_date: Number(settings.min_fitting_date),
      };
      await adminApi.put('/api/admin/settings', payload);
      showMsg('Settings saved successfully');
    } catch (e: unknown) {
      showMsg(e instanceof Error ? e.message : 'Save failed', false);
    } finally {
      setSaving(false);
    }
  }

  function upd<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {msg && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium border ${msg.ok ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {msg.text}
        </div>
      )}

      {/* Business Info */}
      <SectionCard title="Business Information">
        <Field label="Business Name">
          <input type="text" value={settings.business_name} onChange={e => upd('business_name', e.target.value)}
            placeholder="Matrix Mobile Tyres" className={INPUT} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Phone">
            <input type="tel" value={settings.phone} onChange={e => upd('phone', e.target.value)}
              placeholder="+44 7700 000000" className={INPUT} />
          </Field>
          <Field label="Email">
            <input type="email" value={settings.email} onChange={e => upd('email', e.target.value)}
              placeholder="info@example.com" className={INPUT} />
          </Field>
        </div>
        <Field label="Address">
          <textarea rows={3} value={settings.address} onChange={e => upd('address', e.target.value)}
            placeholder="Business address..." className={INPUT + ' resize-none'} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Currency">
            <select value={settings.currency} onChange={e => upd('currency', e.target.value)} className={INPUT}>
              <option value="GBP">GBP (£)</option>
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
            </select>
          </Field>
          <Field label="Min Fitting Days" hint="Minimum days from now for bookings">
            <input type="number" min="0" step="1" value={settings.min_fitting_date}
              onChange={e => upd('min_fitting_date', e.target.value)} className={INPUT} />
          </Field>
        </div>
      </SectionCard>

      {/* Pricing & Fees */}
      <SectionCard title="Pricing & Fees">
        <div className="p-4 bg-slate-50 rounded-xl flex flex-col gap-3">
          <Toggle value={settings.vat_enabled} onChange={v => upd('vat_enabled', v)} label="Enable VAT" />
          {settings.vat_enabled && (
            <Field label="VAT Percentage (%)">
              <input type="number" min="0" max="100" step="0.1" value={settings.vat_percentage}
                onChange={e => upd('vat_percentage', e.target.value)} className={INPUT} />
            </Field>
          )}
        </div>

        <div className="p-4 bg-slate-50 rounded-xl flex flex-col gap-3">
          <Toggle value={settings.platform_fee_enabled} onChange={v => upd('platform_fee_enabled', v)} label="Enable Platform Fee" />
          {settings.platform_fee_enabled && (
            <Field label="Platform Fee (£)">
              <input type="number" min="0" step="0.01" value={settings.platform_fee}
                onChange={e => upd('platform_fee', e.target.value)} className={INPUT} />
            </Field>
          )}
        </div>

        <div className="p-4 bg-slate-50 rounded-xl flex flex-col gap-3">
          <Toggle value={settings.tpms_charge_enabled} onChange={v => upd('tpms_charge_enabled', v)} label="Enable TPMS Charge" />
          {settings.tpms_charge_enabled && (
            <Field label="TPMS Charge (£)">
              <input type="number" min="0" step="0.01" value={settings.tpms_charge}
                onChange={e => upd('tpms_charge', e.target.value)} className={INPUT} />
            </Field>
          )}
        </div>
      </SectionCard>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving}
          className="inline-flex items-center gap-2 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 shadow-md disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
}
