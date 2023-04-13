//get smartcontract
const CourseMarketplace = artifacts.require("CourseMarketplace");
const { catchRevert } = require("./utils/exceptions");

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
  let courseHash = null;

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

  describe("Activate the purchased course", () => {
    before(async () => {
      await _contract.activateCourse(courseHash, { from: contractOwner });
    });

    //test for activating course by not contract owner
    //when we get error then test should pass
    it("course CAN'T be activated by people other than contract owner", async () => {
      //   try {
      //     await _contract.activateCourse(courseHash, { from: buyer });
      //   } catch (error) {
      //     //one property of error object is message
      //     assert(error, "Expected an error but didn't get one!");
      await catchRevert(_contract.activateCourse(courseHash, { from: buyer }));
    });

    it("should have activated status", async () => {
      const course = await _contract.getCourseByHash(courseHash);
      const expectedState = 1;

      assert.equal(
        course.state,
        expectedState,
        "Course should have 'activated' state"
      );
    });
  });

  describe("Transfer Ownership", () => {
    let currentOwner = null;
    before(async () => {
      currentOwner = await _contract.getContractOwner();
    });

    //test for activating course by not contract owner
    //when we get error then test should pass
    it("getContractOwner should return deployer address", async () => {
      //contractOwner = deployer
      assert.equal(
        contractOwner,
        currentOwner,
        "Contract owner is not matching one from getCurrentOwner function i.e currentOwner"
      );
    });
    it("should not transfer ownership when contractOwner is not sending transaction", async () => {
      //account 3 from account 4 but 4 is not owner
      await catchRevert(
        _contract.transferOwnership(accounts[3], { from: accounts[4] })
      );
    });

    it("should transfer ownership to 3rd address from accounts", async () => {
      //account 3 from account 4 but 4 is not owner
      await _contract.transferOwnership(accounts[2], { from: contractOwner });
      const owner = await _contract.getContractOwner();
      assert.equal(
        owner,
        accounts[2],
        "Contract Owner is not the second account"
      );
    });

    it("should transfer ownership to back to inital contract owner", async () => {
      //account 3 from account 4 but 4 is not owner
      _contract.transferOwnership(contractOwner, { from: accounts[2] });
      const owner = await _contract.getContractOwner();
      assert.equal(owner, accounts[2], "Contract Owner is not set");
    });
  });
});
