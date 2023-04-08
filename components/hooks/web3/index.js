import { useHooks } from "@components/providers/web3";

const enhanceHooks = (swrRes) => {
  return {
    ...swrRes,
    hasInitialResponse: swrRes.data || swrRes.error,
  };
};

export const useNetwork = () => {
  return useHooks((hooks) => {
    const swrRes = enhanceHooks(hooks.useNetwork());
    return {
      network: swrRes,
    };
  });
};

export const useAccount = () => {
  return useHooks((hooks) => {
    const swrRes = enhanceHooks(hooks.useAccount());
    return {
      account: swrRes,
    };
  });
};