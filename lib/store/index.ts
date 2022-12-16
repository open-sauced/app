import create from "zustand";

import { GlobalStateInterface } from "interfaces/global-state-types";

export const initialState: GlobalStateInterface = {
  range: 30,
  contributorRange: 30
};

export interface AppStore extends GlobalStateInterface {
  setWaitlisted: () => void;
  onboardUser: () => void;
  setSession: ({ onboarded, waitlisted }: { onboarded: boolean; waitlisted: boolean }) => void;
  updateRange: (range: number) => void;
  updateContributorRange: (range: number) => void;
}

const store = create<AppStore>()((set) => ({
  ...initialState,
  setWaitlisted: () => set((state) => ({ ...state, waitlisted: true })),
  onboardUser: () => set((state) => ({ ...state, onboarded: true })),
  setSession: ({ onboarded, waitlisted }: { onboarded: boolean; waitlisted: boolean }) =>
    set((state) => ({ ...state, onboarded, waitlisted })),
  updateRange: (range: number) => set((state) => ({ ...state, range })),
  updateContributorRange: (contributorRange: number) => set((state) => ({ ...state, contributorRange }))
}));

export default store;
