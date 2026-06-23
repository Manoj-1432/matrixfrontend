'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';

type ApiSetting = {
  id: number;
  key_name: string;
  value: string;
  is_enabled: boolean;
};

type EditState = { value: string; saving: boolean; toggling: boolean };

const INPUT = 'w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white font-mono';

function maskValue(val: string): string {
  if (!val || val.length <= 8) return '•'.repeat(Math.max(val.length, 8));
  return val.slice(0, 4) + '•'.repeat(val.length - 8) + val.slice(-4);
}

function formatKeyName(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function ApiSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<ApiSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStates, setEditStates] = useState<Record<number, EditState>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [debugRaw, setDebugRaw] = useState<string | null>(null);

  const showMsg = (text: string, ok = true, persist = false) => {
    setMsg({ text, ok });
    if (!persist) setTimeout(() => setMsg(null), 3000);
  };

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) { router.push('/admin/login'); return; }
    adminApi.get<{ settings: ApiSetting[]; api_settings?: ApiSetting[] }>('/api/admin/api-settings')
      .then(res => {
        setDebugRaw(JSON.stringify(res, null, 2));
        const s = res.settings ?? res.api_settings ?? [];
        setSettings(s);
        const states: Record<number, EditState> = {};
        s.forEach(x => { states[x.id] = { value: x.value, saving: false, toggling: false }; });
        setEditStates(states);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        setDebugRaw('ERROR: ' + msg);
        showMsg('Failed to load: ' + msg, false, true);
      })
      .finally(() => setLoading(false));
  }, [router]);

  function setEditValue(id: number, value: string) {
    setEditStates(prev => ({ ...prev, [id]: { ...prev[id], value } }));
  }

  async function handleSave(setting: ApiSetting) {
    const state = editStates[setting.id];
    if (!state) return;
    setEditStates(prev => ({ ...prev, [setting.id]: { ...prev[setting.id], saving: true } }));
    try {
      const updated = await adminApi.put<ApiSetting>(`/api/admin/api-settings/${setting.id}`, {
        key_name: setting.key_name,
        value: state.value,
        is_enabled: setting.is_enabled,
      });
      setSettings(prev => prev.map(s => s.id === setting.id ? { ...s, ...updated } : s));
      showMsg(`${formatKeyName(setting.key_name)} saved`);
    } catch (e: unknown) {
      showMsg(e instanceof Error ? e.message : 'Save failed', false);
    } finally {
      setEditStates(prev => ({ ...prev, [setting.id]: { ...prev[setting.id], saving: false } }));
    }
  }

  async function handleToggle(setting: ApiSetting) {
    setEditStates(prev => ({ ...prev, [setting.id]: { ...prev[setting.id], toggling: true } }));
    try {
      const updated = await adminApi.patch<ApiSetting>(`/api/admin/api-settings/${setting.id}/toggle`);
      setSettings(prev => prev.map(s => s.id === setting.id ? { ...s, ...updated } : s));
    } catch {
      showMsg('Toggle failed', false);
    } finally {
      setEditStates(prev => ({ ...prev, [setting.id]: { ...prev[setting.id], toggling: false } }));
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      {msg && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium border ${msg.ok ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {msg.text}
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p className="text-sm font-bold text-amber-800">Keep API keys secure</p>
          <p className="text-xs text-amber-700 mt-0.5">Values are masked. Click the eye icon to reveal. Changes are saved per-row.</p>
        </div>
      </div>

      {debugRaw !== null && (
        <details className="bg-slate-900 rounded-xl p-4 text-xs text-green-300 font-mono overflow-auto max-h-64">
          <summary className="cursor-pointer text-slate-400 mb-2">Debug: raw API response (click to expand)</summary>
          <pre>{debugRaw}</pre>
        </details>
      )}

      {settings.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-12 text-center text-slate-400">
          No API settings configured
        </div>
      )}

      {settings.map(setting => {
        const state = editStates[setting.id];
        if (!state) return null;
        const isRevealed = revealed[setting.id] ?? false;

        return (
          <div key={setting.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-bold text-slate-900">{formatKeyName(setting.key_name)}</h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{setting.key_name}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${setting.is_enabled ? 'text-green-600' : 'text-slate-400'}`}>
                  {setting.is_enabled ? 'Enabled' : 'Disabled'}
                </span>
                <button
                  onClick={() => handleToggle(setting)}
                  disabled={state.toggling}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-60 ${setting.is_enabled ? 'bg-blue-600' : 'bg-slate-200'}`}>
                  {state.toggling ? (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin opacity-60" />
                    </span>
                  ) : (
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${setting.is_enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={isRevealed ? 'text' : 'password'}
                  value={isRevealed ? state.value : maskValue(state.value)}
                  onChange={e => isRevealed && setEditValue(setting.id, e.target.value)}
                  readOnly={!isRevealed}
                  placeholder="Enter value…"
                  className={INPUT + (!isRevealed ? ' cursor-default' : '')}
                />
                <button
                  type="button"
                  onClick={() => setRevealed(prev => ({ ...prev, [setting.id]: !isRevealed }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                  {isRevealed ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <button
                onClick={() => handleSave(setting)}
                disabled={state.saving || !isRevealed}
                title={!isRevealed ? 'Reveal value first to edit' : 'Save'}
                className="inline-flex items-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50 shrink-0"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                {state.saving ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
                Save
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
