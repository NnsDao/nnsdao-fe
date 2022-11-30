import { Principal } from '@dfinity/principal';
import type { ControllerAction, CreateDaoOptions } from '@nnsdao/nnsdao-kit/dao_manager/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDaoManagerActor } from '../../service';
import { daoManagerKeys } from './queries';

export const daoStatus = async ({ queryKey }) => {
  const { module, scope, cid } = queryKey[0];
  const actor = await getDaoManagerActor(false);
  try {
    const res = await actor.dao_status(cid);
    console.log('dao_status', res);
    return res;
  } catch (error) {
    console.log('dao_status', error);
    return Promise.reject(null);
  }
};

export const getPayInfo = async () => {
  // const { module, scope, cid } = queryKey[0];
  const actor = await getDaoManagerActor(true);
  const res = await actor.get_pay_info();
  console.log('get_pay_info', res);
  if ('Err' in res) {
    return Promise.reject(res.Err);
  }
  return res.Ok;
};

export async function createDao(params: CreateDaoOptions) {
  const actor = await getDaoManagerActor(true);
  const res = await actor.create_dao(params);
  if ('Err' in res) {
    return Promise.reject(res.Err);
  }
  // res.Ok.canister_id = res.Ok.canister_id.toText();
  // res.Ok.controller = res.Ok.controller.map(principal => principal.toText());
  // res.Ok.owner = res.Ok.owner.toText();
  return res.Ok;
}

/**
 *  Hooks
 *
 */

export const useTotalDaoLists = () => {
  return useQuery(
    daoManagerKeys.lists(),
    async ({ queryKey }) => {
      const { module, scope } = queryKey[0];
      const actor = await getDaoManagerActor(false);
      try {
        const res = await actor.dao_list();
        console.log('total dao_list', res);
        return res;
      } catch (error) {
        console.log('dao_list', error);
        return Promise.reject(null);
      }
    },
    {
      // refetchInterval: 6e4,
      // refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: Infinity,
    }
  );
};
export const useDaoStatus = (cid: string) => {
  return useQuery(daoManagerKeys.status(cid), daoStatus, {
    refetchOnWindowFocus: import.meta.env.PROD,
  });
};

export const useCreateAction = () => {
  const queryClient = useQueryClient();
  return useMutation(createDao, {
    onSuccess: (data, variable, ctx) => {
      // console.log('createAction', data, variable, ctx);
      queryClient.invalidateQueries(daoManagerKeys.lists());
    },
  });
};

export function useUpdateBaseDaoInfo() {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: [Principal, ControllerAction]) => {
      const actor = await getDaoManagerActor(true);
      const res = await actor.update_dao_controller(params[0], params[1]);
      if ('Err' in res) {
        return Promise.reject(res.Err);
      }
      return res.Ok;
    },
    {
      onSuccess: (data, variable, ctx) => {
        const keys = daoManagerKeys.lists();
        // const preList = queryClient.getQueryData(keys) as DaoInfo[];
        // preList.forEach(info => {
        //   if (info.id == variable[0]) {
        //     info = data;
        //   }
        // });
        queryClient.setQueryData(keys, preList =>
          // @ts-ignore
          preList?.map(info => {
            if (info.id == variable[0]) {
              info = data;
            }
          })
        );
        queryClient.invalidateQueries(daoManagerKeys.lists());
      },
    }
  );
}
