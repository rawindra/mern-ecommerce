import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
    token: string,
    setToken: (token: string) => void,
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: "",
            setToken: (token: string) => set({ token: token }),
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
export default useAuthStore;
