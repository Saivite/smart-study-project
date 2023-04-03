import { useEffect } from "react";
import useSWR from "swr";

const NETWORKS = {
  1: "Ethereum Main Network",
  1337: "Ganache Test Network",
  5: "Goeril Test Network",
  11155111: "Sepolia Test Network",
};

export const handler = (web3, provider) => () => {
  const { mutate, ...rest } = useSWR(
    () => {
      return web3 ? "web3/network" : null;
    },
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
    network: {
      mutate,
      ...rest,
    },
  };
};
