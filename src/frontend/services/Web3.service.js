import { ethers } from "ethers";
import abi from "../../backend/abis/src/backend/contracts/AwesomeNFT.sol/AwesomeNFT.json";
import address from "../../backend/metadata/smart-contract-address.json";
import { getGlobalState, setGlobalState } from "../store";
import moment from "moment";

const deployedNetwork = "sepolia";

const isWalletConnected = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      return;
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]);
    } else {
      setGlobalState("connectedAccount", null);
      console.warn("No accounts found.");
    }

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]);
      await isWalletConnected();
    });
  } catch (error) {
    reportError(error);
  }
};

const connectWallet = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]);
    setGlobalState("contract", null);
  } catch (error) {
    reportError(error);
  }
};

const getNetworkProvider = (network) => {
  if (network === "sepolia") {
    return new ethers.getDefaultProvider("sepolia");
  } else if (network === "goerli") {
    return new ethers.getDefaultProvider("goerli");
  }
  return new ethers.providers.JsonRpcProvider("http://localhost:8545");
};

const getProviderOrSigner = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    return getNetworkProvider(deployedNetwork);
  }
  const provider = new ethers.providers.Web3Provider(ethereum);
  const userAccounts = await provider.listAccounts();
  if (userAccounts.length > 0) {
    return provider.getSigner();
  }
  return new ethers.providers.Web3Provider(web3.currentProvider);
};

const getContract = async () => {
  const cachedContract = getGlobalState("contract");
  if (!cachedContract) {
    const providerOrSigner = await getProviderOrSigner(); //get provider or signer
    const contract = new ethers.Contract( // create a new contract
      address.address,
      abi.abi,
      providerOrSigner
    );

    setGlobalState("contract", contract);
    return contract;
  }
  return cachedContract;
};

const payToMint = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    const amount = ethers.utils.parseEther("0.001");

    return await contract.mint({
      from: connectedAccount,
      value: amount._hex,
    });
  } catch (error) {
    reportError(error);
  }
};

const loadNfts = async () => {
  const contract = await getContract();
  let nfts = await contract?.getMintedNFTs();
  nfts = formatNfts(nfts);
  setGlobalState("nfts", nfts);
  return nfts;
};

const formatNfts = (nfts) =>
  nfts?.map((nft) => ({
    id: Number(nft.id),
    url: nft.tokenUri,
    buyer: nft.buyer,
    cost: parseInt(nft.cost._hex) / 10 ** 18,
    timestamp: new Date(nft.timestamp.toNumber() * 1000).toLocaleString(),
  }));

function reportError(error) {
  throw new Error(error?.message ?? "No ethereum object.");
}

async function getMintedLogs(provider) {
  const filter = await (await getContract()).filters.Minted();
  return await provider.getLogs({
    address: address.address,
    topics: filter.topics,
    fromBlock: 0,
    toBlock: "latest",
  });
}

async function loadMintedTransactions() {
  const provider = ethers.getDefaultProvider(deployedNetwork);
  const logs = await getMintedLogs(provider);

  const transactions = await logs.reduce(async (ac, log) => {
    const transactions = await ac;
    const transaction = await provider.getTransaction(log.transactionHash);
    const timestamp = await (
      await provider.getBlock(transaction.blockHash)
    ).timestamp;

    transactions.push({
      hash: transaction.hash,
      from: transaction.from,
      to: transaction.to,
      time: moment(timestamp * 1000).fromNow(),
      price: ethers.utils.formatEther(transaction.value),
    });
    return transactions;
  }, Promise.resolve([]));
  transactions.reverse();
  setGlobalState("transactions", transactions);
  return transactions;
}

export {
  isWalletConnected,
  connectWallet,
  getContract,
  payToMint,
  loadNfts,
  getNetworkProvider,
  loadMintedTransactions,
};
