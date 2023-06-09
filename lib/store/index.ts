import { create } from "zustand";

import { GlobalStateInterface } from "interfaces/global-state-types";
import { User } from "@supabase/supabase-js";

const initialState: GlobalStateInterface = {
  range: 30,
  insightRepoLimit: 10,
  user: null,
  sessionToken: null,
  providerToken: null,
  userId: null,
  hasReports: false,
  isLoading: false
};

interface AppStore extends GlobalStateInterface {
  setWaitlisted: () => void;
  onboardUser: () => void;
  setSession: ({
    onboarded,
    waitlisted,
    insightRepoLimit
  }: {
    onboarded: boolean;
    waitlisted: boolean;
    insightRepoLimit: number;
  }) => void;
  updateRange: (range: number) => void;
  setUser: (user: User | null) => void;
  setSessionToken: (sessionToken?: string | null) => void;
  setProviderToken: (providerToken?: string | null) => void;
  setUserId: (userId?: number | null) => void;
  setHasReports: (hasReports: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const store = create<AppStore>()((set) => ({
  ...initialState,
  setWaitlisted: () => set((state) => ({ ...state, waitlisted: true })),
  onboardUser: () => set((state) => ({ ...state, onboarded: true })),
  setSession: ({
    onboarded,
    waitlisted,
    insightRepoLimit
  }: {
    onboarded: boolean;
    waitlisted: boolean;
    insightRepoLimit: number;
  }) => set((state) => ({ ...state, onboarded, waitlisted, insightRepoLimit })),
  updateRange: (range: number) => set((state) => ({ ...state, range })),
  setUser: (user: User | null) => set((state) => ({ ...state, user })),
  setSessionToken: (sessionToken?: string | null) => set((state) => ({ ...state, sessionToken })),
  setProviderToken: (providerToken?: string | null) => set((state) => ({ ...state, providerToken })),
  setUserId: (userId?: number | null) => set((state) => ({ ...state, userId })),
  setHasReports: (hasReports: boolean) => set((state) => ({ ...state, hasReports })),
  setIsLoading: (isLoading: boolean) => set((state) => ({ ...state, isLoading }))
}));

export default store;
