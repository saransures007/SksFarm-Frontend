import { useMemo, useReducer, createContext, useContext } from 'react';
import { initialState, contextReducer } from './reducer';
import contextActions from './actions';
import contextSelectors from './selectors';

const sksContext = createContext();

function sksContextProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <sksContext.Provider value={value}>{children}</sksContext.Provider>;
}

function usesksContext() {
  const context = useContext(sksContext);
  if (context === undefined) {
    throw new Error('usesksContext must be used within a sksContextProvider');
  }
  const [state, dispatch] = context;
  const sksContextAction = contextActions(dispatch);
  const sksContextSelector = contextSelectors(state);
  return { state, sksContextAction, sksContextSelector };
}

export { sksContextProvider, usesksContext };
