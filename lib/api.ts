const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw { status: res.status, errors: json.errors ?? null, message: json.message ?? 'Request failed' };
  return json.data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
};

export type Tyre = {
  id: number;
  brand: string;
  model: string;
  size: string;
  price: number;
  tyre_type?: string;
  season?: string;
};

export type Slot = {
  id: number;
  day: string;
  start_time: string;
  end_time: string;
  status: string;
};

export type CheckoutConfig = {
  vat_enabled: boolean;
  vat_percentage: number;
  platform_fee_enabled: boolean;
  platform_fee: number;
  tpms_charge_enabled: boolean;
  tpms_charge: number;
  currency: string;
  min_fitting_date: string;
};

export type Order = {
  id: number;
  amount: number;
  status: string;
  payment_status: string;
  service_type: string;
  tyre_brand: string;
  tyre_model: string;
  tyre_size: string;
  tyre_quantity: number;
  vehicle_registration?: string;
  fitting_date?: string;
};
