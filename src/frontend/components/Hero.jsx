import { useState } from "react";
import { getMetadataFromIpfsById } from "../services/Utils.service.js";
import { loadMintedTransactions, payToMint } from "../services/Web3.service";
import {
  addNotification,
  removeNotification,
  setLoading
} from "../store";
import NftCard from "./nft-card/NftCard";

const Hero = () => {
  const [mintedNft, setMintedNft] = useState(null);

  const onMintNFT = async () => {
    setLoading({ show: true, msg: "Confirm your transaction..." });
    let mintTransaction;
    try {
      mintTransaction = await payToMint();

      setLoading({ show: false });

      addNotification({
        id: mintTransaction.hash,
        message: "Processing Transaction",
        description: "It might take a few seconds...",
        type: "spinner",
      });

      const receipt = await mintTransaction.wait();

      //Mint Successful
      removeNotification(mintTransaction.hash);
      addNotification({
        message: "Congratulations!",
        description: "You have successfully minted your NFT",
        type: "success",
      });

      const mintedId = receipt.events[0].args?.tokenId?.toString();
      const nftMetadata = await getMetadataFromIpfsById(mintedId);

      setMintedNft({
        id: mintedId,
        ...nftMetadata,
      });
      // loadMintedTransactions();
    } catch (e) {
      // Mint error
      console.error(e);
      setLoading({ show: false });
      if (mintTransaction) {
        removeNotification(mintTransaction?.hash);
        addNotification({
          message: "Ops, There was an error",
          description: "Try again later...",
          type: "error",
        });
      }
    }
  };

  return (
    <section
      className="w-4/5 m-auto flex flex-col"
      style={{ height: "calc(78vh - 80px)" }}
    >
      <div className="flex justify-center mt-2 mb-2">
        <button
          style={{ background: "var(--primary-color--button)" }}
          className="shadow-xl shadow-black text-white
             hover:bg-[#bd255f] p-2
            rounded-full cursor-pointer my-4"
          onClick={onMintNFT}
        >
          Mint Now
        </button>
      </div>

      {mintedNft && (
        <div className="flex justify-center items-center flex-1 p-2">
          <NftCard
            nft={{ ...mintedNft, minted: true }}
            // nft={{
            //   image: `https://ipfs.io/ipfs/QmRFghmDEQDFN61c258MZ4fxyYp97R5QDb4wjqEvytwMHH/6.jpg`,
            //   name: "image 12",
            //   id: 3,
            //   minted: true
            // }}
          />
        </div>
      )}
    </section>
  );
};
export default Hero;
