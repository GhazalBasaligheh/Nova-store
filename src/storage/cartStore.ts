import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Product } from '@/types/product';

export interface CartItem {
  id: number;
  title: string;
  /** USD */
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (product: Pick<Product, 'id' | 'title' | 'price' | 'image'>) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}

const MIN_QUANTITY = 1;

const changeQuantity = (items: CartItem[], id: number, delta: number) =>
  items.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(MIN_QUANTITY, item.quantity + delta) } : item,
  );

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: ({ id, title, price, image }) =>
        set((state) =>
          state.items.some((item) => item.id === id)
            ? { items: changeQuantity(state.items, id, 1) }
            : { items: [...state.items, { id, title, price, image, quantity: 1 }] },
        ),
      increment: (id) => set((state) => ({ items: changeQuantity(state.items, id, 1) })),
      // Never below 1; removing is a separate, explicit action.
      decrement: (id) => set((state) => ({ items: changeQuantity(state.items, id, -1) })),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'nova-cart',
      version: 1,
      // Cart contents are not sensitive, so localStorage is acceptable 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      // Rehydrated manually after mount so server HTML and the first client render match.
      skipHydration: true,
    },
  ),
);

// Derived values: computed from items, never stored.
export const selectItemCount = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
