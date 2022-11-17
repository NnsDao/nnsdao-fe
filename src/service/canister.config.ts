import { idlFactory as ndp_IDL } from '@nnsdao/nnsdao-kit/dip20/index';
import { isTestCanister } from '../common/helper';

import { idlFactory as dao_manager_IDL } from '@nnsdao/nnsdao-kit/dao_manager/index';
import { idlFactory as nid_IDL } from '@nnsdao/nnsdao-kit/nid/index';
import { idlFactory as nnsdao_IDL } from '@nnsdao/nnsdao-kit/nnsdao/index';
export { nnsdao_IDL };

export const canister = {
  nnsdao: {
    cid: isTestCanister ? '67bzx-5iaaa-aaaam-aah5a-cai' : '67bzx-5iaaa-aaaam-aah5a-cai',
    idl: nnsdao_IDL,
  },
  dao_manager: {
    cid: isTestCanister ? 'w3p32-waaaa-aaaah-aboyq-cai' : 'w3p32-waaaa-aaaah-aboyq-cai',
    idl: dao_manager_IDL,
  },
  nid: {
    cid: 'vgqnj-miaaa-aaaal-qaapa-cai',
    idl: nid_IDL,
  },
  ndp: {
    cid: 'vgqnj-miaaa-aaaal-qaapa-cai',
    idl: ndp_IDL,
  },
};

// plug create actor whitelist
export const canisterIdList = ['w3p32-waaaa-aaaah-aboyq-cai'];
export default canister;

export const getTotalCanisterIdList = (): string[] => {
  return canisterIdList.concat(Object.values(canister).map(item => item.cid));
};
