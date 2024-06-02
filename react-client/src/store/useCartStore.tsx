import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
    cart: {
        product: any,
        quantity: number,
        price: number
    }[],
    total: number,
    setCart: (product: any) => void,
    setTotal: () => void,
    remove: (index: number) => void
}

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            setCart: (cartItem: any) => set({ cart: [...get().cart, cartItem] }),
            total: 0,
            setTotal: () => set({
                total: get().cart.reduce((acc: any, cartOtem: any) => acc + cartOtem.price * cartOtem.quantity, 0)
            }),
            remove: (index: number) => set({ cart: get().cart.filter((_: any, i: number) => i !== index) })
        }),
        {
            name: "cart",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
export default useCartStore;
