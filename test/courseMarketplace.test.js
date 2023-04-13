//get smartcontract
const CourseMarketplace = artifacts.require("CourseMarketplace");

//Internally truffle is using Mocha - testing framework
// and Chai - Assertion JS library

//it will return all accounts from ganache
contract("CourseMarketplace", (accounts) => {
  const courseId = "0x00000000000000000000000000003130";
  const proof =
    "0x0000000000000000000000000000313000000000000000000000000000003130";
  const value = "9000000000";

  //encapsulated environment of contract
  //before, describe, it
  //before is executed before test - useful for initialisation
  let _contract = null;
  let contractOwner = null;
  let buyer = null;

  before(async () => {
    //deploy contract here
    _contract = await CourseMarketplace.deployed();
    contractOwner = accounts[0];
    buyer = accounts[1];
    console.log(_contract);
    console.log(contractOwner + " " + buyer);
  });

  //describe groups multiple tests
  describe("Purchasing a new course", () => {
    let courseHash;
    before(async () => {
      //here we are working with abstraction of truffle so we dont need to write contract.methods... like in web3
      await _contract.purchaseCourse(courseId, proof, {
        from: buyer,
        value,
      });
    });

    //test 1 - if we purchase the course, we'll be able to readi it by index
    it("can get purchased course hash by index", async () => {
      const index = 0;
      courseHash = await _contract.getCourseHashAtIndex(index);
      const expectedCourseHash = web3.utils.soliditySha3(
        {
          type: "bytes16",
          value: courseId,
        },
        {
          type: "address",
          value: buyer,
        }
      );
      assert.equal(
        courseHash,
        expectedCourseHash,
        "Course Hash is not matching the hash of purchased course!"
      );
    });

    it("should match the  data of the course purchased by buyer", async () => {
      const expectedIndex = 0;
      const expectedState = 0;
      const course = await _contract.getCourseByHash(courseHash);
      assert.equal(course.id, expectedIndex, "Course index should be 0");
      //value is at which we have purchased the course
      assert.equal(course.price, value, `Course price should be ${value}!`);
      assert.equal(course.proof, proof, `Course proof should be ${proof}!`);
      assert.equal(course.owner, buyer, `Course buyer should be ${buyer}!`);
      assert.equal(
        course.state,
        expectedState,
        `Course state should be ${expectedState}!`
      );
    });
  });
});
