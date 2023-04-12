import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";
import { handler as createOwnedCoursesHook } from "./useOwnedCourses";
import { handler as createOwnedCourseHook } from "./useOwnedCourse";
import { handler as createManagedCoursesHook } from "./useManagedCourses";

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
    useOwnedCourses: createOwnedCoursesHook(web3, contract),
    useOwnedCourse: createOwnedCourseHook(web3, contract),
    useManagedCourses: createManagedCoursesHook(web3, contract),
  };
};
