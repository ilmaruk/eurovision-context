// https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react

import React, { useState, useEffect } from 'react';

const AppContext = React.createContext([{}, () => {}]);

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    error: null,
    loading: false,
    currentRoute: '/',
  });

  const handlePathChange = () => {
    const path = document.location.pathname.substr(1);

    if (path !== state.currentRoute) {
      setState(prevState => ({ ...prevState, currentRoute: path }));
    }
  };

  useEffect(handlePathChange);

  return <AppContext.Provider value={[state, setState]}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
