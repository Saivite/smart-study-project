//In first function, we inject dependencies and in second, we can inject data
export const createCourseHash = (web3) => (courseId, account) => {
  //construct course hash and retrieve it from blockchain
  const hexCourseId = web3.utils.utf8ToHex(courseId);

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

  return courseHash;
};
