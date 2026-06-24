import type { TyreResult } from './api';

export type CartItem = {
  tyre: TyreResult;
  qty: number;
};

const KEY = 'matrix_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(tyre: TyreResult, qty = 1): CartItem[] {
  const cart = getCart();
  const idx = cart.findIndex(i => i.tyre.id === tyre.id);
  if (idx >= 0) {
    cart[idx].qty += qty;
  } else {
    cart.push({ tyre, qty });
  }
  saveCart(cart);
  return cart;
}

export function updateQty(tyreId: number, qty: number): CartItem[] {
  const cart = getCart().map(i => i.tyre.id === tyreId ? { ...i, qty } : i).filter(i => i.qty > 0);
  saveCart(cart);
  return cart;
}

export function removeFromCart(tyreId: number): CartItem[] {
  const cart = getCart().filter(i => i.tyre.id !== tyreId);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  localStorage.removeItem(KEY);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + Number(i.tyre.price) * i.qty, 0);
}
