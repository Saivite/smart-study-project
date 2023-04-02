//it will be dependent on web3 api
//function that will return hook itself(function)
//function that will setup all the acccounts and provide it as hook functions
export const handler = (web3) => () => {
  return {
    account: web3 ? "Accounts" : "null",
  };
};
