import create from "zustand";

import { GlobalStateInterface } from "interfaces/global-state-types";

export const initialState: GlobalStateInterface = {
  range: 30
};

export interface AppStore extends GlobalStateInterface {
  setWaitlisted: () => void;
  onboardUser: () => void;
  setSession: ({ onboarded, waitlisted }: { onboarded: boolean; waitlisted: boolean }) => void;
  updateRange: (range: number) => void;
}

const store = create<AppStore>()((set) => ({
  ...initialState,
  setWaitlisted: () => set((state) => ({ ...state, waitlisted: true })),
  onboardUser: () => set((state) => ({ ...state, onboarded: true })),
  setSession: ({ onboarded, waitlisted }: { onboarded: boolean; waitlisted: boolean }) =>
    set((state) => ({ ...state, onboarded, waitlisted })),
  updateRange: (range: number) => set((state) => ({ ...state, range }))
}));

export default store;
