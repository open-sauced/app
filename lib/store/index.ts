import { create } from "zustand";

import { User } from "@supabase/supabase-js";
import { GlobalStateInterface } from "interfaces/global-state-types";

const initialState: GlobalStateInterface = {
  insightRepoLimit: 10,
  user: null,
  sessionToken: null,
  providerToken: null,
  userId: null,
  hasReports: false,
  openSearch: false,
  dismissFeaturedInsights: false,
};

interface AppStore extends GlobalStateInterface {
  setWaitlisted: () => void;
  onboardUser: () => void;
  setSession: ({
    onboarded,
    waitlisted,
    insightRepoLimit,
  }: {
    onboarded: boolean;
    waitlisted: boolean;
    insightRepoLimit: number;
  }) => void;
  setUser: (user: User | null) => void;
  setSessionToken: (sessionToken?: string | null) => void;
  setProviderToken: (providerToken?: string | null) => void;
  setUserId: (userId?: number | null) => void;
  setHasReports: (hasReports: boolean) => void;
  setOpenSearch: (openSearch: boolean) => void;
  setDismissFeaturedInsights: () => void;
}

const store = create<AppStore>()((set) => ({
  ...initialState,
  setWaitlisted: () => set((state) => ({ ...state, waitlisted: true })),
  onboardUser: () => set((state) => ({ ...state, onboarded: true })),
  setSession: ({
    onboarded,
    waitlisted,
    insightRepoLimit,
  }: {
    onboarded: boolean;
    waitlisted: boolean;
    insightRepoLimit: number;
  }) => set((state) => ({ ...state, onboarded, waitlisted, insightRepoLimit })),
  setUser: (user: User | null) => set((state) => ({ ...state, user })),
  setSessionToken: (sessionToken?: string | null) => set((state) => ({ ...state, sessionToken })),
  setProviderToken: (providerToken?: string | null) => set((state) => ({ ...state, providerToken })),
  setUserId: (userId?: number | null) => set((state) => ({ ...state, userId })),
  setHasReports: (hasReports: boolean) => set((state) => ({ ...state, hasReports })),
  setOpenSearch: (openSearch: boolean) => set((state) => ({ ...state, openSearch: openSearch })),
  setDismissFeaturedInsights: () => set((state) => ({ ...state, dismissFeaturedInsights: true })),
}));

export default store;
