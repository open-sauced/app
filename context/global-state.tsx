import React, { useState } from "react";

const AppContext = React.createContext({});

type Props = {
    children: React.ReactNode;
};

const GlobalState = ({children}: Props) => {

  const initialState = {
    user: {}
  };

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

export default GlobalState;