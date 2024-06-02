import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AUthState {
    token: string,
    setToken: (token: string) => void,
}

const useAuthStore = create<AUthState>()(
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
