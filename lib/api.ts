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

// ── Customer authenticated API ──────────────────────────────────────────────
async function customerRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('customer_token') : null;
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  const json = await res.json();
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('customer_token');
      localStorage.removeItem('customer_user');
    }
    throw { status: 401, message: 'Session expired. Please log in again.' };
  }
  if (!res.ok) throw { status: res.status, errors: json.errors ?? null, message: json.message ?? 'Request failed' };
  return json.data as T;
}

export const customerApi = {
  get: <T>(path: string) => customerRequest<T>(path),
  post: <T>(path: string, body: unknown) =>
    customerRequest<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    customerRequest<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
};

// ── Types ────────────────────────────────────────────────────────────────────
export type TyreResult = {
  id: number;
  brand?: string;
  brand_name?: string;
  model: string;
  size?: string;
  size_label?: string;
  price: number | string;
  tyre_type?: string;
  tyre_type_name?: string;
  season?: string;
  season_name?: string;
  stock?: number;
  description?: string;
  fuel_efficiency?: { rating: string } | null;
  speed_rating?: { rating: string } | null;
};

export type VehicleLookupResult = {
  dvla_success: boolean;
  dvla_error: string | null;
  vehicle: {
    make?: string;
    model?: string;
    yearOfManufacture?: number;
    colour?: string;
    fuelType?: string;
    engineCapacity?: number;
  } | null;
  tyre: { likely_sizes: string[]; notes?: string[] } | null;
  tyre_error: { skipped?: boolean; error?: string } | null;
  tyres: TyreResult[];
  contact_number?: string;
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
  order_ref?: string;
  amount: number;
  status: string;
  payment_status: string;
  payment_provider?: string;
  paid_at?: string;
  customer_comment?: string;
  service_type: string;
  tyre_brand: string;
  tyre_model: string;
  tyre_size: string;
  tyre_quantity: number;
  vehicle_registration?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  fitting_date?: string;
  created_at?: string;
  slot?: { id: number; day: string; start_time: string; end_time: string } | null;
};

export type CustomerUser = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  vehicle_registration_number?: string;
  address?: string;
  city?: string;
  postcode?: string;
};

export type SearchOptions = {
  widths: string[];
  ratios: string[];
  rims: string[];
  speed_ratings: string[];
};
