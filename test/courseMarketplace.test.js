//get smartcontract
const CourseMarketplace = artifacts.require("CourseMarketplace");

//Internally truffle is using Mocha - testing framework
// and Chai - Assertion JS library

//it will return all accounts from ganache
contract("CourseMarketplace", (accounts) => {
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
    //test 1
    it(" should resolve into true", () => {
      assert(true, "Value is not true");
    });
  });
});
