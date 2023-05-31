require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomicfoundation/hardhat-verify");

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    goerli: {
      url: process.env.GOERLI_API_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 5
    },
    sepolia: {
      url: process.env.SEPOLIA_API_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    },
  },
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./src/backend/contracts",
    artifacts: "./src/backend/abis",
    tests: "./src/backend/test",
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
