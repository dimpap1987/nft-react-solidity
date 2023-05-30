const fs = require("fs");
const { run } = require("hardhat");

async function writeToFolder(folder, content) {
  if (!folder || !content) return;
  return new Promise((resolve, reject) => {
    fs.writeFileSync(folder, content, "utf8", (err) => {
      if (err) {
        console.error(err);
        reject(false);
      }
    });
    console.log(`Successfully wrote to folder/file: '${folder}'`);
    resolve(true);
  });
}

async function etherscanVerify(contractAddress, constructorArguments) {
  console.log("Verifying contract on Etherscan...");
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: constructorArguments,
  });
}

module.exports = { writeToFolder, etherscanVerify };
