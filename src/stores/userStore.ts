import { create } from "zustand";
import { User } from "@supabase/supabase-js";

type UserState = {
  user: User | null;
  setUser: (u: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));
