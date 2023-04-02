//it will be dependent on web3 api
//function that will return hook itself(function)

import { useEffect, useState } from "react";

//function that will setup all the acccounts and provide it as hook functions
export const handler = (web3) => () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3 && getAccount();
  }, [web3]);

  useEffect(() => {
    //You can also setup using provider
    window.ethereum &&
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0] ?? null);
      });
  }, []);

  return { account };
};
