export const isDev = import.meta.env.DEV;
export const starfishCanister = 'vcpye-qyaaa-aaaak-qafjq-cai';
import Web3 from 'web3';

import { Principal } from '@dfinity/principal';
import { plugLogin, stoicLogin } from '@nnsdao/nnsdao-kit';
import storage from '@nnsdao/nnsdao-kit/helper/storage';
import type { Proposal } from '@nnsdao/nnsdao-kit/nnsdao/types';
import toast from 'react-hot-toast';
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

  if (loginType == 'plug') {
    const list = await getTotalDaoList();
    loginRes = await plugLogin(collectUsedCanisterId().concat(list));
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
export async function connectWallet(walletType: string) {
  if (walletType == 'plug') {
    const res = await plugLogin([]);
    return res?.principalId;
  }
  if (walletType == 'stoic') {
    const res = await stoicLogin();
    return res?.principalId;
  }

  if (walletType == 'metamask') {
    if (!globalThis?.ethereum?.isMetaMask) {
      toast.error('Please install MetaMask Wallet first!');
    }
    const accounts = await globalThis?.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    return account;
  }
  if (walletType == 'petra') {
    if (!('aptos' in globalThis)) {
      return toast.error('Please install Petra Aptos Wallet first!');
    }
    const res = await globalThis?.aptos?.connect();
    // console.log(response); // { address: string, address: string }
    return res.address;
  }
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

export function arrToMap(arr: Array<[string, string]>) {
  return arr.reduce((acc, [key, val]) => {
    acc[key] = val;
    return acc;
  }, {});
}

export function getETHBalance(address: string) {
  // Initialize a Web3 instance
  const web3 = new Web3(Web3.givenProvider);
  return web3.eth
    .getBalance(address)
    .then(balance => {
      console.log(`Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
      return balance;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
}

export async function getTotalBalance(wallet: string[]) {
  console.log('address,wallet', wallet);

  let res: any = wallet.map(str => getETHBalance(str));
  res = await Promise.all(res);
  console.log('total balance', res);

  return res;
}
