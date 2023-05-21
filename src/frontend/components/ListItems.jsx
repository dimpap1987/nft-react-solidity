import { useEffect, useState } from "react";
import { useGlobalState } from "../store";
import "./ListItems.css";
import { getMetadataFromIpfs } from "../services/Utils.service.js";

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

  return (
    <section className="md:w-4/5 m-auto">
      <div className="list-items-container">
        {ipfsMetadata?.map((nft) => (
          <div className="w-80" key={nft.id}>
            <img src={nft?.image} alt={nft?.name} />
          </div>
        ))}
      </div>
    </section>
  );
};
export default ListItems;
