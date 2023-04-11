import useSWR from "swr";

export const handler = (web3, contract) => (courses, account) => {
  //function is returning a function
  const swrRes = useSWR(
    () => (web3 && account && contract ? "web3/ownedCourses" : null),
    async () => {
      const ownedCourses = [];
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        ownedCourses.push(course.id);
      }
      return ownedCourses;
    }
  );
  return swrRes.data;
};
