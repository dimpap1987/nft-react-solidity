import "./NftCard.css";

const NftCard = ({ nft }) => {
  return (
    <div key={nft.id} className="nft-container rounded-2xl">
      <div className="card w-80 fade-in rounded-2xl">
        <div className="content">
          <div className="back">
            <div className="back-content rounded-3xl">
              <div className="flex justify-between w-3/4 font-mono">
                <span className="w-3/4 overflow-x-hidden title">
                  <strong>{nft.name}</strong>
                </span>
                <span>#{nft.id}</span>
              </div>
              <div className="p-1.5">
                <img
                  className="rounded-md"
                  src={nft.image}
                  alt={"mintedNft.name"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
