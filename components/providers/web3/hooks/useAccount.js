//it will be dependent on web3 api
//function that will return hook itself(function)

import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0x4e844b2e6dda33f4e24cc0cf2e17986e48fdada0514bd3c2c2204a5f10d3ae92": true,
};

//function that will setup all the acccounts and provide it as hook functions
export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () =>
      // 1st parameter is a function
      //identifier of the function - if we have web3 then execute function
      web3 != null ? "web3/accounts" : null,
    async () => {
      //callback function
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
      // return "Hello World";
    }
  );

  // swrResponse.data; //Hello world

  useEffect(() => {
    window.ethereum &&
      window.ethereum.on("accountsChanged", (accounts) => {
        mutate(accounts[0] ?? null);
      });
  }, []);

  useEffect(() => {
    //You can also setup using provider
    provider &&
      provider.on(
        "accountsChanged",
        //useSwr will return the data of mutate to here
        (accounts) => mutate(accounts[0] ?? null)
      );
  }, [provider]);

  return {
    account: {
      data,
      //check for admin
      isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest,
    },
  };
};
