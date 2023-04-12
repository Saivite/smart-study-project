import { useHooks } from "@components/providers/web3";

const _isEmpty = (data) => {
  //to check if data is empty
  // == can also check for undefined values
  //we have to check for all possibilities as useNetwork will return Number, useAccount - string, courses - array, useOwnedCourses - object
  return (
    data == null ||
    data == "" ||
    Array.isArray(data && data.length == 0) ||
    (data.constructor === Object && Object.keys(data).length == 0)
  );
};

const enhanceHooks = (swrRes) => {
  const { data, error } = swrRes;
  const hasInitialResponse = !!(data || error);
  //initial response is received but data is empty or not
  const isEmpty = hasInitialResponse && _isEmpty(data);
  return {
    ...swrRes,
    isEmpty,
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
  const swrRes = enhanceHooks(
    useHooks((hooks) => hooks.useOwnedCourses)(...args)
  );
  return {
    //res is `useOwnedCourses is working`

    ownedCourses: swrRes,
  };
};

export const useOwnedCourse = (...args) => {
  const swrRes = enhanceHooks(
    useHooks((hooks) => hooks.useOwnedCourse)(...args)
  );
  return {
    //res is `useOwnedCourses is working`

    ownedCourse: swrRes,
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
