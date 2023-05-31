const { writeToFolder, etherscanVerify } = require("./utils");
const { ethers, network } = require("hardhat");

const contractValues = {
  contractName: "AwesomeNFT",
  constructor: [
    "Awesome NFTs",
    "AWSNFT",
    "https://ipfs.io/ipfs/QmXWTYxHaEeVPrXa7FoC5sQzdnyBTtDoziTPtgmrceXrCf/",
    10,
  ],
};

async function main() {
  const Contract = await ethers.getContractFactory(contractValues.contractName);
  const contract = await Contract.deploy(...contractValues.constructor);
  await contract.deployed();

  writeToFolder(
    "./src/backend/metadata/smart-contract-address.json",
    JSON.stringify({ address: contract.address }, null, 4)
  );
  return contract;
}

async function handleEtherscanVerification(contract) {
  if ((network.config.chainId === 5 || network.config.chainId === 11155111) && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    //wait
    await contract.deployTransaction.wait(6);
    //verify
    await etherscanVerify(contract.address, contractValues.constructor);
    console.log("Etherscan verification ended...");
  }
}

main()
  .then(async (contract) => {
    console.log(
      "######################################################################"
    );
    console.log("Deployed contract address", contract.address);
    console.log("Network Id : " + network.config.chainId);
    await handleEtherscanVerification(contract);
    console.log(
      "######################################################################"
    );
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
