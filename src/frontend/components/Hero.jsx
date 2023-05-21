import { useState } from "react";
import { getMetadataFromIpfsById } from "../services/Utils.service.js";
import { loadNfts, payToMint } from "../services/Web3.service";
import { setAlert, setGlobalState } from "../store";
import NftCard from "./nft-card/NftCard";

const Hero = () => {
  const [mintedNft, setMintedNft] = useState(null);

  const onMintNFT = async () => {
    setGlobalState("loading", {
      show: true,
      msg: "Confirm your transaction...",
    });

    payToMint()
      .then(async (receipt) => {
        // setAlert("Finished Minting...", "success");
        const mintedId = receipt.events[0].args?.tokenId?.toString();
        // console.log("new nft minted with id : " + mintedId);
        const nftMetadata = await getMetadataFromIpfsById(mintedId);
        // console.log(nftMetadata);
        setMintedNft({
          id: mintedId,
          ...nftMetadata,
        });
        loadNfts();
      })
      .catch(() => setAlert("Try again later...", "error"))
      .finally(() => {
        setGlobalState("loading", { show: false, msg: "" });
      });
  };

  return (
    <section className="w-4/5 m-auto" style={{ height: "86vh" }}>
      <div className="flex justify-center mt-5 mb-5">
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
        <div className="flex justify-center">
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
