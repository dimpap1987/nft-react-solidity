require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    },
    goerli: {
      url: process.env.API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
   }
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './src/backend/contracts',
    artifacts: './src/backend/abis',
    tests: "./src/backend/test"
  },
  mocha: {
    timeout: 40000,
  },
}
