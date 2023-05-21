# Web3 NFT Minting Dapp with React and Solidity

## Technology

This demo uses:

- Metamask
- Hardhat
- ReactJs
- Tailwind CSS
- Solidity
- EthersJs
- Infura

## Running the demo

To run the demo locally follow these steps:

1. Clone the project with the code below.
   ```sh
   # Make sure you have the above prerequisites installed already!
   git clone https://github.com/dimpap1987/nft-react-solidity.git
   npm install # Installs all the dependencies.
   ```
2. Start a local blockchain network
   ```sh
   npx hardhat node
   ```
3. Deploy the smart contract
   ```sh
   npx hardhat run scripts/deploy.js
   ```
4. Run the front end app by running `npm start`


## Scripts
### Compile and Deploy Smart contract to a network

`npx hardhat run scripts/deploy.js`

### Upload to Ipfs throw Infura

`npx hardhat run scripts/uploadToIpfs.js`

>>In order to upload your own images to Ipfs you need to
create a `.env` file and configure the above keys in [Infura](https://app.infura.io/dashboard)

```sh
    ENDPOINT_URL=<PROVIDER_URL>
    DEPLOYER_KEY=<YOUR_PRIVATE_KEY>
```


## Useful links

- ⚽ [Metamask](https://metamask.io/)
- 🚀 [Remix Editor](https://remix.ethereum.org/)
- 💡 [Hardhat](https://hardhat.org/)
- 🔥 [ReactJs](https://reactjs.org/)
- 🐻 [Solidity](https://soliditylang.org/)
- 👀 [Ethersjs](https://docs.ethers.io/v5/)
- 👀 [Infura](https://app.infura.io/dashboard)
