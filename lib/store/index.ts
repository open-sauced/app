import create from "zustand";

import { GlobalStateInterface } from "interfaces/global-state-types";
import { SortOptions } from "components/molecules/SortedBySelector/sorted-by-selector";

export const initialState: GlobalStateInterface = {
  range: 30,
  insightRepoLimit: 10
};

export interface AppStore extends GlobalStateInterface {
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
  updateSortBy: (sortBy: SortOptions) => void;
}

const store = create<AppStore>()((set) => ({
  ...initialState,
  setWaitlisted: () => set((state) => ({ ...state, waitlisted: true })),
  onboardUser: () => set((state) => ({ ...state, onboarded: true })),
  setSession: ({ onboarded, waitlisted, insightRepoLimit }: { onboarded: boolean; waitlisted: boolean, insightRepoLimit: number }) =>
    set((state) => ({ ...state, onboarded, waitlisted, insightRepoLimit })),
  updateRange: (range: number) => set((state) => ({ ...state, range })),
  updateSortBy: (sortBy: SortOptions) => set((state) => ({ ...state, sortBy: sortBy }))
}));

export default store;
