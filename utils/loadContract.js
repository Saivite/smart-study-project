const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;
export const loadContract = async (name, web3) => {
  //we'll fetch CourseMarketplace.json file in public/contracts folder
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  let contract = null;
  try {
    contract = new web3.eth.Contract(
      //we need abi of the contract and address of contract where it is deployed to
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );
  } catch (error) {
    console.error(`Contract ${name} can't be loaded`);
  }
  return contract;
};
