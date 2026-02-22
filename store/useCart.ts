import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/sanity/types";

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1) => {
                const { items } = get();
                const existingItem = items.find((item) => item._id === product._id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item._id === product._id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity }] });
                }
            },
            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item._id !== productId),
                });
            },
            updateQuantity: (productId, quantity) => {
                set({
                    items: get().items.map((item) =>
                        item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                });
            },
            clearCart: () => set({ items: [] }),
            getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
            getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
        {
            name: "batela-cart-storage",
        }
    )
);
