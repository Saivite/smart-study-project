import { useAccount } from "./useAccount";

const DEFAULT_HOOKS = {
  useAccount: () => ({ account: "No Account" }),
};

//we can call setupHooks function on web3Provider and we can integrate the hooks into that API
export const setupHooks = (web3) => {
  if (!web3) {
    return DEFAULT_HOOKS;
  }
  return {
    //   return {
    //     account: web3 ? "Accounts" : "null",
    //   };
    //  It will return the above part of function in below
    useAccount: useAccount(web3),
  };
};
