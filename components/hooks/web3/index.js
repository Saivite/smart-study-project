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

export const useOwnedCourses = (...args) => {
  const swrRes = useHooks((hooks) => hooks.useOwnedCourses)(...args);
  return {
    //res is `useOwnedCourses is working`
    ownedCourses: swrRes,
  };
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();
  const canPurchaseCourse = !!(account.data && network.isSupported);
  return {
    account,
    network,
    canPurchaseCourse: !!(account.data && network.isSupported),
  };
};
