import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
};

type AuthState = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (name) => set({ user: { name } }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);