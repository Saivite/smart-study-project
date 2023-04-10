export const loadContract = async (name, provider) => {
  //we'll fetch CourseMarketplace.json file in public/contracts folder
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();
  //TruffleContract is globally available
  const _contract = window.TruffleContract(Artifact);
  _contract.setProvider(provider);

  let deployedContract = null;
  try {
    deployedContract = await _contract.deployed();
  } catch (error) {
    console.error(`Contract ${name} can't be loaded`);
  }
  return deployedContract;
};
