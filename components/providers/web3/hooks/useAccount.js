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
      //return account or error if there is no account
      //always check for data
      const account = accounts[0];
      if (!account) {
        throw new Error("Cannot retrieve account. Please refresh the browser.");
      }
      return account;
      // return "Hello World";
    }
  );

  // swrResponse.data; //Hello world

  // useEffect(() => {
  //   window.ethereum &&
  //     window.ethereum.on("accountsChanged", (accounts) => {
  //       mutate(accounts[0] ?? null);
  //     });
  // }, []);

  useEffect(() => {
    //You can also setup using provider
    console.log("SUBSCRIBING TO EVENTS");
    //we're subscribing to event every time we visit any page and we are calling funtion many times which is not very performant
    const mutator = (accounts) => mutate(accounts[0] ?? null);

    provider &&
      provider.on(
        "accountsChanged",
        //useSwr will return the data of mutate to here
        mutator
      );
    console.log(provider);
    return () => {
      //whenever hook function navigates to new page, it will remove the listener
      provider && provider.removeListener("accountsChanged", mutator);
    };
  }, [provider]);

  return {
    data,
    //check for admin
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};
