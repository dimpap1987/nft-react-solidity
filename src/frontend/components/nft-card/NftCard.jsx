import "./NftCard.css";

const NftCard = ({ nft }) => {
  return (
    <div key={nft.id} className="nft-container rounded-2xl">
      <div className="card fade-in rounded-2xl">
        <div className="content">
          <div className={`back ${nft.minted ? "minted" : "listed"}`}>
            <div className="back-content rounded-3xl">
              <div className="p-2.5">
                <img
                  className="rounded-md object-contain"
                  src={nft.image}
                  alt={"mintedNft.name"}
                />
              </div>
              <div className="flex justify-between font-mono p-2 w-full">
                <div className=" overflow-x-hidden title">
                  <strong>{nft.name}</strong>
                </div>
                <div>#{nft.id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
