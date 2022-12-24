import { BasicUserInfo } from '@nnsdao/nnsdao-kit/src/nid/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNIDActor } from '../../service';
import { NIDKeys } from './queries';

// Hooks
export const useNidInfo = () => {
  const queryClient = useQueryClient();
  return useQuery(
    NIDKeys.userInfo(),
    async ({ queryKey }) => {
      const { module, scope } = queryKey[0];
      const actor = await getNIDActor(true);
      const res = await actor.user_info();

      console.log('nid info', res);
      if ('Ok' in res) {
        // res.Ok.wallet.forEach(wallet => {
        //   wallet.push(principalIdToAccountId(wallet[2]));
        // });
        return res.Ok;
      }
      return Promise.reject(res.Err);
    },
    {
      staleTime: Infinity,
    }
  );
};

export function useNidLogin() {
  const queryClient = useQueryClient();
  return useMutation(async (walletType: string) => {
    const actor = await getNIDActor(true);
    const res = await actor.login(walletType);
    console.log('nid login', res);
    if ('Ok' in res) {
      return res.Ok;
    }
    return Promise.reject(res.Err);
  });
}

export const useUpdateNID = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: BasicUserInfo) => {
      const actor = await getNIDActor(true);
      const res = await actor.update_user_info(params);
      if ('Ok' in res) {
        return res.Ok;
      }
      return Promise.reject(res.Err);
    },
    {
      onSuccess(data, variables) {
        // const { cid } = variables;
        const queryKey = NIDKeys.userInfo();
        queryClient.setQueriesData(queryKey, data);
      },
    }
  );
};
