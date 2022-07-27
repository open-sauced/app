//Context setup article: https://contactmentor.com/react-context-with-hooks/

import React, { useState } from "react";

interface AppState {
  appState: object;
  setAppState: React.Dispatch<React.SetStateAction<{}>>;
}

const AppContext = React.createContext<AppState | null>(null);

type Props = {
    children: React.ReactNode;
};

const GlobalState = ({children}: Props) => {

  const initialState = {};

  const [appState, setAppState] = useState(initialState);

  const providerValue = {
    appState,
    setAppState
  };

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useGobalStateContext = () => {
  return React.useContext(AppContext);
};

export default GlobalState;