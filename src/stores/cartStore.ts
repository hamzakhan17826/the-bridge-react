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
  clear: () => void;
}

export const useCartStore = create<CartState>((set: any) => ({
  items: [],
  addItems: (newItems: CartItem[]) =>
    set((state: CartState) => ({
      items: [...state.items, ...newItems].filter((i) => i.qty > 0),
    })),
  clear: () => set({ items: [] }),
}));
