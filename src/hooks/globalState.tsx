import type { DaoData } from '@nnsdao/nnsdao-kit/nnsdao/types';
import { createContext, useContext, useReducer } from 'react';

const initialState = {
  totalDaoList: [] as DaoData[],
};
const StateContext = createContext(null as any);

type TState = typeof initialState;
const reducer = (state, action) => {
  switch (action.type) {
    case 'changeDaoList':
      return {
        ...state,
        totalDaoList: action.data,
      };
  }
};

const GlobalStateProvider = ({ children }) => {
  // @ts-ignore
  const store = useReducer(reducer, initialState);
  return <StateContext.Provider value={store}>{children}</StateContext.Provider>;
};
export default GlobalStateProvider;

export const useGlobalState = () => useContext(StateContext) as [TState, (...arg: any[]) => void];
