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
      return NETWORKS[chainId];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("chainChanged", (chainId) => mutate(parseInt(chainId, 16)));
  }, [web3]);

  return {
    data,
    mutate,
    target: targetNetwork,
    isSupported: data === targetNetwork,
    ...rest,
  };
};
