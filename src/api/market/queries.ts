import { composeQueryKeys } from '../../common/helper';
const module = 'market';

export const MARKETKeys = {
  all: composeQueryKeys([{ module }]),
  nftInfo: () => composeQueryKeys(MARKETKeys.all, { scope: 'nftinfo' }),
  boundWallet: () => composeQueryKeys(MARKETKeys.all, { scope: 'boundwallet' }),
};
