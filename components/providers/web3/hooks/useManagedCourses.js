import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (account) => {
  //function is returning a function
  const swrRes = useSWR(
    //as account will change useSWR will refetch data
    () =>
      web3 && account && contract ? `web3/managedCourses/${account}` : null,
    async () => {
      const courses = [];
      //get all the count of courses
      const courseCount = await contract.methods.getCourseCount().call();
      //iterating backward so that newest course will be at beginning of array
      for (let i = Number(courseCount) - 1; i >= 0; i--) {
        const courseHash = await contract.methods
          .getCourseHashAtIndex(i)
          .call();
        const course = await contract.methods
          .getCourseByHash(courseHash)
          .call();
        if (course) {
          //we're passing null as admin dont need course metadata, he only needs to know price, proof, state etc
          const normalized = normalizeOwnedCourse(web3)(
            {
              hash: courseHash,
              //null
            },
            course
          );

          courses.push(normalized);
        }
      }
      return courses;
    }
  );
  return swrRes;
};
