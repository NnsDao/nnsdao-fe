export const isDev = import.meta.env.DEV;

import { Principal } from '@dfinity/principal';
import { plugLogin, stoicLogin } from '@nnsdao/nnsdao-kit';
import storage from '@nnsdao/nnsdao-kit/helper/storage';
import type { Proposal } from '@nnsdao/nnsdao-kit/nnsdao/types';
import { getTotalDaoList } from '../api/dao_manager';
import { collectUsedCanisterId } from '../service/canister.config';

type QueryItemType = Record<string, any>;
type QueryType = [QueryItemType];

export function composeQueryKeys(baseQuery: QueryType, params?: QueryItemType): QueryType {
  if (!params) {
    return [{ ...baseQuery[0] }];
  }
  return [{ ...baseQuery[0], ...params }];
}

export async function login(loginType: string) {
  let loginRes = null as any;

  // request all cid before connect to wallet
  const list = await getTotalDaoList();
  if (loginType == 'plug') {
    loginRes = await plugLogin(collectUsedCanisterId().concat(list.map(item => item.canister_id.toText())));
  } else if (loginType == 'stoic') {
    loginRes = await stoicLogin();
  }
  if (!loginRes) return;
  console.log(`login res`, loginRes);
  const loginInfo = {
    loginType: loginType ?? '',
    principalId: loginRes.principalId,
    accountId: loginRes.accountId,
    isLogin: true,
    lastLoginAt: Date.now(), // last login timestamp
  };
  // @ts-ignore
  storage.set('userInfo', loginInfo);
  return loginInfo;
}

export function proposalStateToChipColor(item: Proposal['proposal_state']) {
  const state: string = Object.keys(item)?.[0];
  if (/Accepted|Succeeded/.test(state)) {
    return 'success';
  }
  if (/Failed|Rejected/.test(state)) {
    return 'error';
  }
  if (/Executing/.test(state)) {
    return 'warning';
  }

  return 'secondary';
  //
}

export function briefName(name: string) {
  if (name.length > 8) {
    return name.slice(0, 6) + '...' + name.slice(-6);
  }
  return name;
}

export function canisterID_str(cid: Principal | string) {
  if (typeof cid !== 'string') {
    return cid.toText();
  }
  return cid;
}
