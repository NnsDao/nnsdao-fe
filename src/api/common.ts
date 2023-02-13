import { AccountIdentifier, LedgerCanister } from '@dfinity/nns';
import { Principal } from '@dfinity/principal';
import { anonymousAgent } from '@nnsdao/nnsdao-kit/helper/agent';
import { tokenType } from '@nnsdao/nnsdao-kit/helper/constants';
import { getTokenBalance } from '@nnsdao/nnsdao-kit/helper/pay';
import { useQuery } from '@tanstack/react-query';
export const useTokenBalance = (token: tokenType, principal: Principal) => {
  return useQuery(
    [{ token, principalID: principal.toText() }],
    async ({ queryKey }) => {
      // const { token, principalID } = queryKey[0];
      if (token == 'ICP') {
        const ledger = LedgerCanister.create({ agent: anonymousAgent });
        const balance = await ledger.accountBalance({
          accountIdentifier: AccountIdentifier.fromPrincipal({ principal }),
        });
        console.log('ICP balance', balance);
        return balance;
      }

      return getTokenBalance(token, principal);
    },
    {
      staleTime: Infinity,
    }
  );
};

export function useEtherData(address: string[]) {
  return useQuery(
    ['etherdata', address?.join(',') || 'address'],
    async () => {
      const notesOptions = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
          address: address,
          limit: 100,
          refresh: false,
          include_poap: false,
          ignore_contract: false,
          count_only: false,
          query_status: false,
        }),
      };

      const notes = fetch('https://api.rss3.io/v1/notes', notesOptions)
        .then(response => response.json())
        .then(res => res)
        .catch(err => null);

      const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({ address: address }),
      };

      const profiles = fetch('https://api.rss3.io/v1/profiles', options)
        .then(response => response.json())
        .then(res => res)
        .catch(err => null);

      const result = await Promise.all([notes, profiles]);
      console.log('ether data', result);
      return result;
      // const data = await fetch(
      //   `https://hoot.it/_next/data/q41T-CY6K3vwU6-OBemog/search/0xAAB27b150451726EC7738aa1d0A94505c8729bd1.json?keyword=0xAAB27b150451726EC7738aa1d0A94505c8729bd1`
      // );
    },
    {
      enabled: !!address,
    }
  );
}
