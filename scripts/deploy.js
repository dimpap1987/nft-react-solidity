const { writeToFolder } = require("./utils");
const { ethers } = require("hardhat");

const contract = {
  contractName: "AwsomeNFT",
  tokenName: "Famous Paintings",
  tokenSymbol: "FPNT",
  tokenURI: "https://ipfs.io/ipfs/QmXWTYxHaEeVPrXa7FoC5sQzdnyBTtDoziTPtgmrceXrCf/",
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

  await writeToFolder(
    "./src/metadata/smart-contract-address.txt",
    `address=${contract.address}\r\n`
  );
  console.log("Deployed contract address", contract.address);
}

main(contract).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
