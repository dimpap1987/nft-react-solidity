const { writeToFolder } = require("./utils");
const { ethers } = require("hardhat");

const contract = {
  contractName: "MyNFT",
  tokenName: "amazing name",
  tokenSymbol: "ANFT",
};

async function main({ contractName, tokenName, tokenSymbol }) {
  const contract_name = contractName;
  const Contract = await ethers.getContractFactory(contract_name);
  const contract = await Contract.deploy(tokenName, tokenSymbol);
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
