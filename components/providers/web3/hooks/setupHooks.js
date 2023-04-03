import { handler as createUseAccount } from "./useAccount";

//we can call setupHooks function on web3Provider and we can integrate the hooks into that API
export const setupHooks = (...deps) => {
  return {
    //   return {
    //     account: web3 ? "Accounts" : "null",
    //   };
    //  It will return the above part of function in below
    useAccount: createUseAccount(...deps),
  };
};
