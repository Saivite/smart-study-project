import { createCourseHash } from "@utils/hash";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (course, account) => {
  //function is returning a function
  const swrRes = useSWR(
    //as account will change useSWR will refetch data
    () => (web3 && account && contract ? `web3/ownedCourse/${account}` : null),
    async () => {
      //construct course hash and retrieve it from blockchain

      const courseHash = createCourseHash(web3)(course.id, account);
      //whenever calling a function - call
      //when sending a tx - send
      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call();
      //if course is owned by no one
      //20 byte address - 40 char
      if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
        return null;
      }
      return normalizeOwnedCourse(web3)(course, ownedCourse);
    }
  );
  return swrRes;
};
