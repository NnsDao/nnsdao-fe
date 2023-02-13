import { composeQueryKeys } from '../../common/helper';
const module = 'nid';

export const NIDKeys = {
  all: composeQueryKeys([{ module }]),
  userInfo: () => composeQueryKeys(NIDKeys.all, { scope: 'userinfo' }),
  boundWallet: () => composeQueryKeys(NIDKeys.all, { scope: 'boundwallet' }),
};
