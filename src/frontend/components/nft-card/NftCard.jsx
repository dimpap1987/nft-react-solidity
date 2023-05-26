import React from "react";
import "./NftCard.css";

const NftCard = ({ nft }) => {
  return (
    <div key={nft.id} className="nft-container rounded-2xl">
      <div className="card fade-in rounded-2xl">
        <div className="content">
          <div className={`back ${nft.minted ? "minted" : "listed"}`}>
            <div className="back-content rounded-3xl">
              <div className="p-2.5 h-4/5">
                <img
                  className="rounded-md object-contain"
                  src={nft.image}
                  alt={"mintedNft.name"}
                />
              </div>
              <div className="flex justify-between font-mono p-2 w-full">
                <div className="overflow-x-hidden">
                  <strong>{nft.name}</strong>
                </div>
                <strong>#{nft.id}</strong>
              </div>
            </div>
          </div>
          <div className={`front ${nft.minted ? "minted" : "listed"}`}>
            <div className="front-content rounded-3xl p-2">
              <div className="pb-4 border-b-2 border-solid border-gray-300">
                <small className="badge">Attributes</small>
              </div>
              <div className="h-full mt-8">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {nft.attributes?.map((attr,index) => (
                    <React.Fragment key={index}>
                      <div className="font-semibold">
                        <span>{attr.trait_type}</span>
                      </div>
                      <div className="">{attr.value}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {nft.timestamp && (
                <div className="description">
                  <div className="title">
                    <p>
                      <strong>Day of creation</strong>
                    </p>
                  </div>
                  <p className="card-footer">{nft.timestamp}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
