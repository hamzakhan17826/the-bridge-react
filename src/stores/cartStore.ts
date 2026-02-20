import { create } from 'zustand';

export interface CartItem {
  id: string; // feature identifier
  name: string; // display name
  qty: number;
  unitPrice: number; // price per unit
}

interface CartState {
  items: CartItem[];
  addItems: (newItems: CartItem[]) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

// load from localStorage with 7‑day expiration
const STORAGE_KEY = 'cart-storage';
function loadInitial(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const { ts, items } = JSON.parse(raw);
    if (Date.now() - ts > 7 * 24 * 3600 * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return items;
  } catch {
    return [];
  }
}

export const useCartStore = create<CartState>((set, get) => {
  const initial = loadInitial();

  // subscribe to changes so we persist
  set({
    items: initial,
    addItems: (newItems: CartItem[]) =>
      set((state: CartState) => {
        const updated = [...state.items, ...newItems].filter((i) => i.qty > 0);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ts: Date.now(), items: updated })
        );
        return { items: updated };
      }),
    removeItem: (id: string) =>
      set((state: CartState) => {
        const updated = state.items.filter((i) => i.id !== id);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ts: Date.now(), items: updated })
        );
        return { items: updated };
      }),
    clear: () => {
      localStorage.removeItem(STORAGE_KEY);
      set({ items: [] });
    },
  });

  return get();
});
