import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS = {
  1: "Ethereum Main Network",
  1337: "Ganache Test Network",
  5: "Goeril Test Network",
  11155111: "Sepolia Test Network",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => {
      return web3 ? "web3/network" : null;
    },
    //isValidating tells if the below function is currently loading data
    //It will be initially false
    //if data and error is undefined then below function isn't resolved
    async () => {
      const chainId = await web3.eth.getChainId();
      if (!chainId) {
        throw new Error(
          "Cannot retrieve an account. Please refresh the browser."
        );
      }
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    //You can also setup using provider
    console.log("SUBSCRIBING TO EVENTS");
    //we're subscribing to event every time we visit any page and we are calling funtion many times which is not very performant
    const mutator = (chainId) => mutate(parseInt(chainId, 16));

    provider &&
      provider.on(
        "chainChanged",
        //useSwr will return the data of mutate to here
        mutator
      );
    return () => {
      //whenever hook function navigates to new page, it will remove the listener
      provider && provider.removeListener("chainChanged", mutator);
    };
  }, [provider]);

  return {
    data,
    mutate,
    target: targetNetwork,
    isSupported: data === targetNetwork,
    ...rest,
  };
};
