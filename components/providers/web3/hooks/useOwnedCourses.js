import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (courses, account) => {
  //function is returning a function
  const swrRes = useSWR(
    //as account will change useSWR will refetch data
    () => (web3 && account && contract ? `web3/ownedCourses/${account}` : null),
    async () => {
      console.log("Calling useOwnedCOurses");
      const ownedCourses = [];
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        if (!course.id) {
          //if course dont have id then break current iteration and continue from next one
          continue;
        }

        //construct course hash and retrieve it from blockchain
        const hexCourseId = web3.utils.utf8ToHex(course.id);

        const courseHash = web3.utils.soliditySha3(
          {
            type: "bytes16",
            value: hexCourseId,
          },
          {
            type: "address",
            value: account,
          }
        );
        //whenever calling a function - call
        //when sending a tx - send
        const ownedCourse = await contract.methods
          .getCourseByHash(courseHash)
          .call();
        //if course is owned by no one
        //20 byte address - 40 char
        if (
          ownedCourse.owner !== "0x0000000000000000000000000000000000000000"
        ) {
          const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);
          ownedCourses.push(normalized);
        }
      }
      return ownedCourses;
    }
  );
  return swrRes;
};
