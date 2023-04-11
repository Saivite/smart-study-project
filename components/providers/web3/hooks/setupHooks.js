import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";
import { handler as createOwnedCourses } from "./useOwnedCourses";

//we can call setupHooks function on web3Provider and we can integrate the hooks into that API
export const setupHooks = ({ web3, provider, contract }) => {
  console.log("Setting up hooks!!");
  return {
    //   return {
    //     account: web3 ? "Accounts" : "null",
    //   };
    //  It will return the above part of function in below
    useAccount: createAccountHook(web3, provider),
    useNetwork: createNetworkHook(web3, provider),
    useOwnedCourses: createOwnedCourses(web3, contract),
  };
};
