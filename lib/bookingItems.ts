'use client';
import { useEffect, useState } from 'react';
import { api, type TyreResult } from './api';

/**
 * The tyres in a booking, carried between the tyre cart, booking and checkout
 * pages in the web address as `items=12:2,15:2` (tyre id : quantity).
 * Only ids and quantities travel in the address — names and prices are always
 * loaded from our own API (and the server prices the order itself).
 */
export type BookingLine = { tyre_id: number; qty: number };

export const MAX_LINES = 10;
export const MAX_QTY = 20;

const clampQty = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.floor(n) || 1));

type ParamsLike = { get(name: string): string | null };

export function parseBookingItems(params: ParamsLike): BookingLine[] {
  const raw = params.get('items');
  const lines: BookingLine[] = [];

  if (raw) {
    for (const part of raw.split(',')) {
      const [idStr, qtyStr] = part.split(':');
      const id = Number(idStr);
      if (!Number.isInteger(id) || id <= 0) continue;
      const existing = lines.find(l => l.tyre_id === id);
      if (existing) existing.qty = clampQty(existing.qty + Number(qtyStr));
      else if (lines.length < MAX_LINES) lines.push({ tyre_id: id, qty: clampQty(Number(qtyStr)) });
    }
    return lines;
  }

  // Older links: a single tyre_id + qty
  const id = Number(params.get('tyre_id'));
  if (Number.isInteger(id) && id > 0) lines.push({ tyre_id: id, qty: clampQty(Number(params.get('qty'))) });
  return lines;
}

export function encodeBookingItems(lines: BookingLine[]): string {
  return lines.map(l => `${l.tyre_id}:${clampQty(l.qty)}`).join(',');
}

export function tyreBrand(t: TyreResult): string {
  return t.brand_name ?? t.brand ?? '';
}

export function tyreSizeLabel(t: TyreResult): string {
  return t.size_label ?? t.size ?? '';
}

/**
 * GET /api/public/tyres/{id} returns the tyre with `brand` and `size` as
 * nested objects ({ name }, { label }); search results use flat strings.
 * Normalise to the flat shape the pages use.
 */
type RawTyre = Omit<TyreResult, 'brand' | 'size'> & {
  brand?: string | { name?: string } | null;
  size?: string | { label?: string } | null;
};

function normaliseTyre(raw: RawTyre | null | undefined): TyreResult | null {
  if (!raw || !raw.id) return null;
  const brand = typeof raw.brand === 'object' && raw.brand ? raw.brand.name : raw.brand ?? undefined;
  const size = typeof raw.size === 'object' && raw.size ? raw.size.label : raw.size ?? undefined;
  return {
    ...raw,
    brand: brand ?? undefined,
    brand_name: raw.brand_name ?? brand ?? undefined,
    size: size ?? undefined,
    size_label: raw.size_label ?? size ?? undefined,
  } as TyreResult;
}

/** Loads the tyre details (name, size, current price) for each booking line. */
export function useBookingTyres(lines: BookingLine[]) {
  const key = lines.map(l => l.tyre_id).join(',');
  // Remember which set of ids the loaded details belong to; "loading" until they match
  const [loaded, setLoaded] = useState<{ key: string; tyres: Record<number, TyreResult | null> }>({ key: '', tyres: {} });

  useEffect(() => {
    if (!key) return;
    const ids = key.split(',').map(Number);
    let cancelled = false;
    Promise.all(ids.map(id =>
      api.get<RawTyre>(`/api/public/tyres/${id}`)
        .then(d => [id, normaliseTyre(d)] as const)
        .catch(() => [id, null] as const),
    )).then(results => {
      if (!cancelled) setLoaded({ key, tyres: Object.fromEntries(results) });
    });
    return () => { cancelled = true; };
  }, [key]);

  return { tyres: loaded.tyres, loading: key !== '' && loaded.key !== key };
}
