import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";

//we can call setupHooks function on web3Provider and we can integrate the hooks into that API
export const setupHooks = (...deps) => {
  console.log("Setting up hooks!!");
  return {
    //   return {
    //     account: web3 ? "Accounts" : "null",
    //   };
    //  It will return the above part of function in below
    useAccount: createAccountHook(...deps),
    useNetwork: createNetworkHook(...deps),
  };
};
