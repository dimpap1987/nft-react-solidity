const { expect } = require("chai");
const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const fromWei = (num) => ethers.utils.formatEther(num);

const nftName = "Awesome NFTs";
const nftSymbol = "AWSNFT";
const nftBaseUrl =
  "https://ipfs.io/ipfs/QmXWTYxHaEeVPrXa7FoC5sQzdnyBTtDoziTPtgmrceXrCf/";
const totalNfts = 10;

describe("AwesomeNFT", async () => {
  let nftContract;
  let deployer, addr1, addr2;

  beforeEach(async () => {
    // Get the ContractFactories and Signers here.
    const NftContract = await ethers.getContractFactory("AwesomeNFT");
    [deployer, addr1, addr2] = await ethers.getSigners();

    // Deploy our contracts
    nftContract = await NftContract.deploy(
      nftName,
      nftSymbol,
      nftBaseUrl,
      totalNfts
    );
  });

  describe("Deployment Test", function () {
    it("Should track name and symbol of the nft collection", async function () {
      expect(await nftContract.name()).to.equal(nftName);
      expect(await nftContract.symbol()).to.equal(nftSymbol);
    });

    it("Should track the uru suffix", async function () {
      expect(await nftContract.uriSuffix()).to.equal(".json");
    });
  });

  
});
