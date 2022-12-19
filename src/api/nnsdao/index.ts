import { Principal } from '@dfinity/principal';
import type {
  DaoInfo,
  JoinDaoParams,
  MemberItems,
  Proposal,
  ProposalContent,
  UserVoteArgs,
} from '@nnsdao/nnsdao-kit/nnsdao/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useUserStore } from '../../hooks/userStore';
import { getNnsdaoActor } from '../../service';
import { daoManagerKeys } from '../dao_manager/queries';
import { nnsdaoKeys } from './queries';

export const get_proposal = async ({ queryKey }) => {
  const { module, cid, id, scope } = queryKey[0];
  const actor = await getNnsdaoActor(cid, false);
  const res = await actor.get_proposal(id);
  console.log('get_proposal', res);
  if ('Ok' in res) {
    return res.Ok;
  }
  return Promise.reject(null);
};
export const join = async (params: JoinDaoParams & { cid: string }) => {
  const actor = await getNnsdaoActor(params.cid, true);
  const cid = params.cid;
  Reflect.deleteProperty(params, 'cid');
  const res = await actor.join(params);
  params.cid = cid;
  console.log('join', res);
  if ('Ok' in res) {
    return res.Ok;
  }
  return Promise.reject('Failed Join!');
};
export const member_list = async ({ queryKey }) => {
  const { cid } = queryKey[0];
  const actor = await getNnsdaoActor(cid, false);
  const res = await actor.member_list();
  console.log('member_list', res);
  if ('Ok' in res) {
    return res.Ok;
  }
  return Promise.reject(null);
};

export const quit = async (cid: string) => {
  const actor = await getNnsdaoActor(cid, false);
  const res = await actor.quit();
  console.log('quit', res);
  if ('Ok' in res) {
    return res.Ok;
  }
  return Promise.reject(null);
};
export const getDaoInfo = async ({ queryKey }) => {
  const { module, scope, cid } = queryKey[0];
  const actor = await getNnsdaoActor(cid, false);
  const res = await actor.dao_info();

  if ('Ok' in res) {
    res.Ok.intro = JSON.parse(res.Ok.intro || '[]');
    console.log('dao_info', res);
    return res.Ok;
  }
  return Promise.reject(null);
};
export const user_info = async ({ queryKey }) => {
  const { module, scope, cid } = queryKey[0];

  if (!cid) {
    return Promise.reject(null);
  }
  const actor = await getNnsdaoActor(cid, true);
  // can also get someone other than caller`s user info
  const res = await actor.user_info([]);
  console.log('user_info', res);
  if ('Ok' in res) {
    return res.Ok;
  }
  return null;
};

export const getProposalList = async ({ queryKey }) => {
  const { module, scope, cid } = queryKey[0];
  const actor = await getNnsdaoActor(cid, false);
  const res = await actor.get_proposal_list();
  console.log(res, 'get_proposal_list');
  if ('Ok' in res) {
    return res.Ok;
  }
  return Promise.reject(res.Err);
};

/**
 *
 *  Hooks
 */

export const useGetProposalList = (cid: string, selector?: (data) => [bigint, Proposal][]) => {
  const defaultSelector = data => data;
  const queryClient = useQueryClient();
  return useQuery(nnsdaoKeys.proposal_lists(cid), getProposalList, {
    select: selector || defaultSelector,
  });
};

export const useGetProposal = (cid: string, id: string) => {
  const queryClient = useQueryClient();
  const listKey = nnsdaoKeys.proposal_lists(cid);
  return useQuery(
    nnsdaoKeys.proposal(cid, id),
    async ({ queryKey }) => {
      // const { module, scope } = queryKey[0];
      const actor = await getNnsdaoActor(cid, false);
      const res = await actor.get_proposal(BigInt(+id));
      console.log(res, 'get_proposal');
      if ('Ok' in res) {
        return res.Ok;
      }
      return Promise.reject(res.Err);
    },
    {
      initialData: () => {
        const list: any[] = queryClient.getQueryData(listKey) ?? [];
        const item = list.find(([ID]) => ID == id);
        if (item) {
          return item[1];
        }
      },
      initialDataUpdatedAt() {
        return queryClient.getQueryState(listKey)?.dataUpdatedAt;
      },
      onSuccess(data) {
        const preList: any[] = queryClient.getQueryData(listKey) ?? [];
        if (!preList.length) return;
        // console.log('preList', preList, data);
        const index = preList.findIndex(([id, item]) => data.id === id);

        queryClient.setQueryData(
          listKey,
          (preList || [])
            .slice(0, index)
            .concat([[data.id, data]])
            .concat(preList.slice(index + 1))
        );
      },
    }
  );
};

export const useGetUserInfo = (cid: string) => {
  return useQuery(nnsdaoKeys.userInfo(cid), user_info, {});
};

export const useGetDaoInfo = (cid: string) => {
  const queryClient = useQueryClient();
  return useQuery(nnsdaoKeys.daoInfo(cid), getDaoInfo, {
    onSuccess(data) {
      queryClient.setQueryData(daoManagerKeys.lists(), preList =>
        // @ts-ignore
        (preList || []).map(item => {
          const canisterId = item.canister_id == 'string' ? item.canister_id : item.canister_id.toText();

          if (canisterId == data.canister_id) {
            return { ...item, ...data, canister_id: Principal.fromText(canisterId) };
          }
          return item;
        })
      );
    },
  });
};
export const useGetDaoStatus = (cid: string) => {
  // const queryClient = useQueryClient();
  return useQuery(
    nnsdaoKeys.status(cid),
    async ({ queryKey }) => {
      const { module, scope, cid } = queryKey[0];
      const actor = await getNnsdaoActor(cid, false);
      const res = await actor.dao_status();

      if ('Ok' in res) {
        return res.Ok[0];
      }
      return Promise.reject(null);
    },
    {
      staleTime: Infinity,
    }
  );
};

export const useVote = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: UserVoteArgs & { cid: string }) => {
      const actor = await getNnsdaoActor(params.cid, true);
      const res = await actor.vote(params);
      console.log('vote', res);
      if ('Ok' in res) {
        return res.Ok;
      }
      return Promise.reject(res.Err);
    },
    {
      onSuccess(data, variables) {
        const { cid, id } = variables;
        // const queryKey = nnsdaoKeys.proposal_lists(cid);
        queryClient.invalidateQueries(nnsdaoKeys.proposal(cid, String(Number(id))));
      },
    }
  );
};
export const useQuit = () => {
  const [user] = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cid: string) => {
      if (!user.isLogin) {
        return Promise.reject('Please log in first!');
      }
      return quit(cid);
    },
    onSuccess(data, cid, context) {
      const queryKey = nnsdaoKeys.member_list(cid);
      queryClient.setQueryData(queryKey, preList =>
        // @ts-ignore
        (preList || []).filter(item => item.principal.toText() !== user.principalId)
      );
    },
  });
};

export const useMemberList = (cid: string, selector?: (data: MemberItems[]) => MemberItems[]) => {
  const defaultSelector = React.useCallback((data: MemberItems[]) => data, []);
  return useQuery(nnsdaoKeys.member_list(cid), member_list, {
    select: selector || defaultSelector,
  });
};
export const useJoin = () => {
  const [user] = useUserStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: JoinDaoParams & { cid: string }) => {
      if (!user.isLogin) {
        return Promise.reject('Please log in first!');
      }
      return join(params);
    },
    onSuccess(data, variables, context) {
      const { cid } = variables;
      const queryKey = nnsdaoKeys.member_list(cid);
      // const preList = queryClient.getQueryData(queryKey) ?? [];
      // @ts-ignore
      queryClient.setQueryData(queryKey, preList => (preList || []).concat(data));
    },
  });
};

export const useUpdateDaoInfo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: DaoInfo) => {
      const actor = await getNnsdaoActor(params.canister_id, true);
      const res = await actor.update_dao_info(params);
      console.log(res, 'update_dao_info');
      if ('Ok' in res) {
        return res.Ok;
      }
      return Promise.reject(null);
    },
    {
      onSuccess(data, variables) {
        queryClient.setQueryData(nnsdaoKeys.daoInfo(variables.canister_id), data);
      },
    }
  );
};

export const usePropose = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: ProposalContent & { cid: string }) => {
      const actor = await getNnsdaoActor(params.cid, true);
      const res = await actor.propose(params);
      console.log('propose', res);
      if ('Ok' in res) {
        return res.Ok;
      }
      return Promise.reject(res.Err);
    },
    {
      onSuccess(data, variables) {
        const cid = variables.cid;
        const queryKey = nnsdaoKeys.proposal_lists(cid);
        // @ts-ignore
        queryClient.setQueryData(queryKey, preList => (preList || []).concat([[data.id, data]]));
      },
    }
  );
};
