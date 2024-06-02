import { create } from "zustand";

interface ThemeState {
  dark: boolean;
  toggleMode: () => void;
}

const useThemeStore = create<ThemeState>()((set) => ({
  dark: true,
  toggleMode: () => {
    set((state) => ({ dark: !state.dark }));
  },
}));

export default useThemeStore;
