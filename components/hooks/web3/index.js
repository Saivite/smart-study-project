import { useHooks } from "@components/providers/web3";
import { useEffect } from "react";
import { useWeb3 } from "@components/providers/";
import { useRouter } from "next/router";

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
  //if hasInitialResponse is false, it will be false
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

export const useAdmin = ({ redirectTo }) => {
  const { account } = useAccount();
  const { requireInstall } = useWeb3();
  const router = useRouter();
  useEffect(() => {
    //functionality to check account
    //reexecuting the function when we change account
    if (
      //requireInstall checks if we have metamask or not
      requireInstall ||
      (account.hasInitialResponse && !account.isAdmin) ||
      account.isEmpty
    ) {
      router.push(redirectTo);
    }
  }, [account]);
  return { account };
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

export const useManagedCourses = (...args) => {
  const swrRes = enhanceHooks(
    useHooks((hooks) => hooks.useManagedCourses)(...args)
  );
  return {
    //res is `useOwnedCourses is working`

    managedCourses: swrRes,
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
