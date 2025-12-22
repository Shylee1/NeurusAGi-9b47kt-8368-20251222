import { create } from 'zustand';
import { AuthUser, Profile } from '../types';

interface AuthState {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  login: (user: AuthUser) => void;
  setProfile: (profile: Profile | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  profile: null,
  loading: true,
  login: (user) => set({ user, loading: false }),
  setProfile: (profile) => set({ profile }),
  logout: () => set({ user: null, profile: null }),
  setLoading: (loading) => set({ loading }),
}));
