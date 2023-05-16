import abi from "../../backend/abis/src/backend/contracts/AwesomeNFT.sol/AwesomeNFT.json";
import address from "../../backend/metadata/smart-contract-address.json";
import { ethers } from "ethers";
import { getGlobalState, setAlert, setGlobalState } from "../store";

const isWalletConnected = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      setAlert("You need to install Metamask", error);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]);
    } else {
      setGlobalState("connectedAccount", "");
      console.log("No accounts found.");
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
  } catch (error) {
    reportError(error);
  }
};

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

// const getContract = () => {
//   const { ethereum } = window;
//   const contractAddress = address.address;
//   const contractAbi = abi.abi;
//   const connectedAccount = getGlobalState("connectedAccount");

//   if (connectedAccount) {
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, contractAbi, signer);

//     return contract;
//   } else {
//     return getGlobalState("contract");
//   }
// };

// const payToMint = async () => {
//   try {
//     const { ethereum } = window;
//     if (!ethereum) return alert("Please install Metamask");
//     const connectedAccount = getGlobalState("connectedAccount");
//     const contract = getEtheriumContract();
//     const amount = ethers.utils.parseEther("0.001");

//     await contract.payToMint({
//       from: connectedAccount,
//       value: amount._hex,
//     });

//     window.location.reload();
//   } catch (error) {
//     reportError(error);
//   }
// };

export { isWalletConnected, connectWallet };
