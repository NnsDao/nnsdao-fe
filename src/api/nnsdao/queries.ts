import { composeQueryKeys } from '../../common/helper';

const module = 'nnsdao';

export const nnsdaoKeys = {
  all: composeQueryKeys([{ module }]),
  status: (cid: string) => composeQueryKeys(nnsdaoKeys.all, { scope: 'dao_status', cid }),
  userInfos: () => composeQueryKeys(nnsdaoKeys.all, { scope: 'userInfo' }),
  userInfo: (cid: string) => composeQueryKeys(nnsdaoKeys.userInfos(), { cid }),
  daoInfos: () => composeQueryKeys(nnsdaoKeys.all, { scope: 'daoInfo' }),
  daoInfo: (cid: string) => composeQueryKeys(nnsdaoKeys.daoInfos(), { cid }),
  daoData: (cid: string) => composeQueryKeys(nnsdaoKeys.all, { scope: 'daoData', cid }),
  member_lists: () => composeQueryKeys(nnsdaoKeys.all, { scope: 'member_lists' }),
  member_list: (cid: string) => composeQueryKeys(nnsdaoKeys.member_lists(), { cid }),
  proposal_lists: (cid: string) => composeQueryKeys(nnsdaoKeys.all, { scope: 'proposal_lists', cid }),
  proposal: (cid: string, id: string) => composeQueryKeys(nnsdaoKeys.all, { scope: 'proposal', cid, id }),
  owners: (cid: string) => composeQueryKeys(nnsdaoKeys.all, { scope: 'owners', cid }),
};
