export const isDev = import.meta.env.DEV;

export const isTestCanister = import.meta.env.__APP__canister_type === 'test';

type QueryItemType = Record<string, any>;
type QueryType = [QueryItemType];

export function composeQueryKeys(baseQuery: QueryType, params?: QueryItemType): QueryType {
  if (!params) {
    return [{ ...baseQuery[0] }];
  }
  return [{ ...baseQuery[0], ...params }];
}
