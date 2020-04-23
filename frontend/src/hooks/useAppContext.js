import { useContext } from 'react';

import { AppContext } from '../state/AppContext';

const useAppContext = () => {
  const [state, setState] = useContext(AppContext);

  const setError = error => {
    setState(prevState => ({ ...prevState, error }));
  };

  const setLoading = loading => {
    setState(prevState => ({ ...prevState, loading }));
  };

  return {
    error: state.error,
    setError,
    setLoading,
    loading: state.loading,
    currentRoute: state.currentRoute,
  };
};

export default useAppContext;
