const { createContext, useContext, useEffect, useState } = require("react");
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

//if context is not provided
const Web3Context = createContext(null);

//here we'll load web3, integrate with metamask - load provider and create instance of it
export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    //we'll keep the state in web3Api and return this as context of all components
    provider: null,
    web3: null,
    contract: null,
    isInitialized: false,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        //create instance of web3
        const web3 = new Web3(provider);
        setWeb3Api({
          provider,
          web3,
          contarct: null,
          isInitialized: true,
        });
      } else {
        setWeb3Api((api) => ({ ...api, isInitialized: true }));
        console.error("Please Install Metamask");
      }
    };
    loadProvider();
  }, []);

  //we are using architecture of context, if there is a component where we need to provide some context i.e some set of values to all children ele ments
  return (
    <Web3Context.Provider value={web3Api}>
      {/* passing the values to all children elements */}
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  //consume the context with useContext
  //return the values
  return useContext(Web3Context);
  //we  can use the values passed to components using useContext() function
}
