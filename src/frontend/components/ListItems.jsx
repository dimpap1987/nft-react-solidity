import { useEffect, useState } from "react";
import { useGlobalState } from "../store";
import "./ListItems.css";
import { getMetadataFromIpfs } from "../services/Utils.service.js";
import NftCard from "./nft-card/NftCard";

const ListItems = () => {
  const [nfts] = useGlobalState("nfts");

  const [ipfsMetadata, setIpfsMetadata] = useState([]);

  useEffect(async () => {
    if (nfts?.length > 0) {
      const metadataArray = [];
      for (const nft of nfts) {
        const metadata = await getMetadataFromIpfs(nft.url);
        metadataArray.push({
          id: nft.id,
          ...metadata,
          buyer: nft.buyer,
          cost: nft.cost,
          timestamp: nft.timestamp,
        });
      }
      console.log(metadataArray);
      setIpfsMetadata(() => {
        return [...metadataArray];
      });
    }
  }, [nfts]);

  return ipfsMetadata?.length > 0 ? (
    <section className="md:w-4/5 m-auto">
      <div className="text-3xl font-semibold text-white text-center my-5">My Collection</div>
      <div className="list-items-container">
        {ipfsMetadata?.map((nft) => (
          <NftCard key={nft.id} nft={nft} />
        ))}
      </div>
    </section>
  ) : null;
};
export default ListItems;
