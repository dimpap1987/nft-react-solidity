import { useEffect, useState } from "react";
import { useGlobalState } from "../store";
import "./ListItems.css";
import { getMetadataFromIpfs } from "../services/Utils.service.js";
import NftCard from "./nft-card/NftCard";
import { loadNfts } from "../services/Web3.service";

const ListItems = () => {
  const [nfts] = useGlobalState("nfts");
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [ipfsMetadata, setIpfsMetadata] = useState([]);

  useEffect(() => {
    if (!connectedAccount) return;
    loadNfts();
  }, [connectedAccount]);

  useEffect(async () => {
    if (!connectedAccount || !nfts?.length > 0) return;

    const metadataArray = await nfts.reduce(async (a, nft) => {
      return [
        ...(await a),
        {
          id: nft.id,
          ...(await getMetadataFromIpfs(nft.url)),
          buyer: nft.buyer,
          cost: nft.cost,
          timestamp: nft.timestamp,
        },
      ];
    }, []);
    //set state
    setIpfsMetadata(() => {
      return [...metadataArray];
    });
  }, [nfts]);

  return ipfsMetadata?.length > 0 ? (
    <section className="md:w-4/5 m-auto">
      <div className="text-3xl font-semibold text-white text-center my-5">
        My Collection
      </div>
      <div className="list-items-container">
        {ipfsMetadata?.map((nft) => (
          <NftCard key={nft.id} nft={nft} />
        ))}
      </div>
    </section>
  ) : null;
};
export default ListItems;
