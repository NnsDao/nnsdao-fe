import storage from '@nnsdao/nnsdao-kit/helper/storage';
import type { TotalUserInfo } from '@nnsdao/nnsdao-kit/nid/types';
import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import toast from 'react-hot-toast';
import { useNidLogin } from '../api/nid';
import { login } from '../common/helper';

const defaultValue = {
  loginType: storage.get('loginType') ?? '', // plug ,stoic || ''
  principalId: '',
  accountId: '',
  isLogin: false,
};
// @ts-ignore
function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        ...action.data,
      };
    case 'logout':
      return {
        ...state,
        ...defaultValue,
        loginType: '',
      };
  }
}
type UserStoreT = [userInfo: typeof defaultValue & TotalUserInfo, dispatch: React.Dispatch<any>];

const UserStore = createContext(null as unknown as UserStoreT);

// @ts-ignore
export function UserStoreProvider({ children }) {
  const [userInfo, dispatch] = useReducer(reducer, defaultValue);
  const queryClient = useQueryClient();
  const nidLoginAction = useNidLogin();
  useEffect(() => {
    console.log('login_userInfo', userInfo);
    // auto login
    if (userInfo.loginType && !userInfo?.isLogin) {
      autoLogin(userInfo.loginType);
    }
  }, [userInfo.loginType]);

  async function autoLogin(loginType: string) {
    const loginInfo = await login(loginType);
    nidLoginAction.mutate(loginType, {
      onSuccess(data, variables, context) {
        dispatch({
          type: 'login',
          data: { ...loginInfo, ...data },
        });
        toast.success('Auto login success!');
      },
    });
  }
  return <UserStore.Provider value={[userInfo, dispatch]}>{children}</UserStore.Provider>;
}

export function useUserStore() {
  return useContext(UserStore);
}
