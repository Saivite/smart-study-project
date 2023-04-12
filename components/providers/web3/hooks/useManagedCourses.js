import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (account) => {
  //function is returning a function
  const swrRes = useSWR(
    //as account will change useSWR will refetch data
    () =>
      web3 && account && contract ? `web3/managedCourses/${account}` : null,
    async () => {
      const courses = [1, 2, 3, 4];
      return courses;
    }
  );
  return swrRes;
};
