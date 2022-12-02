//Context setup article: https://jamiehaywood.medium.com/typesafe-global-state-with-typescript-react-react-context-c2df743f3ce

import React, { useState } from "react";
import { GlobalStateInterface } from "interfaces/global-state-types";

const AppContext = React.createContext({
  appState: {} as Partial<GlobalStateInterface>,
  setAppState: {} as React.Dispatch<React.SetStateAction<Partial<GlobalStateInterface>>>
});

type Props = {
  children: React.ReactNode;
};

const GlobalState = ({ children }: Props) => {
  const initialState = {
    repoMetaCount: 0,
    contributorsMetaCount: 0
  } as Partial<GlobalStateInterface>;

  const [appState, setAppState] = useState(initialState);

  const providerValue = {
    appState,
    setAppState
  };

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
};

export const useGlobalStateContext = () => {
  return React.useContext(AppContext);
};

export default GlobalState;
