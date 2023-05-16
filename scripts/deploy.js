const { writeToFolder } = require("./utils");
const { ethers } = require("hardhat");

const contract = {
  contractName: "AwesomeNFT",
  tokenName: "Famous Paintings",
  tokenSymbol: "AWSNFT",
  tokenURI:
    "https://ipfs.io/ipfs/QmXWTYxHaEeVPrXa7FoC5sQzdnyBTtDoziTPtgmrceXrCf/",
  totalNfts: 10,
};

async function main({
  contractName,
  tokenName,
  tokenSymbol,
  tokenURI,
  totalNfts,
}) {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(
    tokenName,
    tokenSymbol,
    tokenURI,
    totalNfts
  );
  await contract.deployed();

  writeToFolder(
    "./src/backend/metadata/smart-contract-address.txt",
    `address=${contract.address}\r\n`
  );
  return contract;
}

main(contract)
  .then((contract) => {
    console.log("Deployed contract address", contract.address);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
