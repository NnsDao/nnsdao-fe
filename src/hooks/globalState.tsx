import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  isLogin: false,
  count: 0,
};
const StateContext = createContext(null as any);

const reducer = (state: typeof initialState, action: { type: any; value: any }) => {
  switch (action.type) {
    case 'changeLogin':
      return {
        ...state,
        isLogin: action.value,
      };

    default:
      return {
        ...state,
        count: state.count + 1,
      };
  }
};

// @ts-ignore
const GlobalStateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
);
export default GlobalStateProvider;

export const useGlobalState = () => useContext(StateContext);
