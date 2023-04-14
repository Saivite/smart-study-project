const {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} = require("react");
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";
import { loadContract } from "@utils/loadContract";

//if context is not provided
const Web3Context = createContext(null);

//Helper functions
const setListeners = (provider) => {
  provider.on("chainChanged",_() => window.location.reload());
};

const createWeb3State = ({ web3, provider, contract, isLoading }) => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ web3, provider, contract }),
  };
};

//here we'll load web3, integrate with metamask - load provider and create instance of it

//we are using architecture of context, if there is a component where we need to provide some context i.e some set of values to all children ele ments
export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState(
    //we'll keep the state in web3Api and return this as context of all components
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        //create instance of web3
        const web3 = new Web3(provider);
        //load instance of contract
        const contract = await loadContract("CourseMarketplace", web3);
        setListeners(provider);
        setWeb3Api(
          createWeb3State({ web3, provider, contract, isLoading: false })
        );
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error("Please Install Metamask");
      }
    };
    loadProvider();
  }, []);

  //useMemo is used for catching purposes, it will return new object only when web3Api will change
  const _web3Api = useMemo(
    () => {
      const { web3, provider, isLoading } = web3Api;
      //return an object only when dependencies of object will change
      return {
        ...web3Api,
        //these functions will be created when web3Api will change, if not change same version will be provided
        // isWeb3Loaded: !web3Api.isLoading && web3Api.web3,
        // isWeb3Loaded: web3 != null,
        //it tells if we require metamask
        requireInstall: !isLoading && !web3,
        connect: provider
          ? async () => {
              try {
                await provider.request({
                  method: "eth_requestAccounts",
                });
              } catch (error) {
                location.reload();
                console.error("Cannot Retrieve Account");
              }
            }
          : () =>
              console.error(
                "Cannot connect to Metamask, try to reload your browser please."
              ),
      };
    },
    /* set of dependencies*/ [web3Api]
  );

  //function to connect to metamaske and pass that function to web3Api
  return (
    <Web3Context.Provider value={_web3Api}>
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

export function useHooks(cb) {
  const { hooks } = useWeb3();
  return cb(hooks);
}
