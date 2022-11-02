export const logListKeys = {
  all: ['log'] as const,
  lists: () => [...logListKeys.all, 'list'] as const,
  list: (filters: string) => [...logListKeys.lists(), { filters }] as const,
  details: () => [...logListKeys.all, 'detail'] as const,
  detail: (id: number) => [...logListKeys.details(), id] as const,
};
