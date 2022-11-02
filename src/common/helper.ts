export const isDev = import.meta.env.DEV;

export const isTestCanister = import.meta.env.__APP__canister_type === 'test';
