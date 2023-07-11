import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMarketActor } from '../../service';
import { MARKETKeys } from './queries';

// Hooks
export const useMarkeftNftList = (aid, cid) => {
  console.log(aid, cid, 2929293939);

  const queryClient = useQueryClient();
  return useQuery(
    MARKETKeys.nftInfo(),
    async ({ queryKey }) => {
      const { module, scope } = queryKey[0];
      const actor = await getMarketActor(true);
      console.log(actor, 90909090);

      const res = await actor.market_tokens_ext(aid, cid);

      console.log('nft info', res);
      if ('Ok' in res) {
        // return res.Ok?.[0]?.[1] || [];
        return res.Ok;
      }

      return Promise.reject(res.Err);
    },
    {
      staleTime: Infinity,
    }
  );
};
