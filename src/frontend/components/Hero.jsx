import { loadNfts, payToMint } from "../services/Web3.service";
import { setAlert, setGlobalState } from "../store";

const Hero = () => {
  const onMintNFT = async () => {
    setGlobalState("loading", {
      show: true,
      msg: "Confirm your transaction...",
    });

    payToMint()
      .then(() => {
        setAlert("Minting Successful...", "success");
        loadNfts();
      })
      .catch(() => setAlert("Try again later...", "error"))
      .finally(() => {
        setGlobalState("loading", { show: false, msg: "" });
      });
  };

  return (
    <section className="w-4/5 flex justify-center m-auto">
      <button
        style={{ background: "var(--primary-color--button)" }}
        className="shadow-xl shadow-black text-white
             hover:bg-[#bd255f] p-2
            rounded-full cursor-pointer my-4"
        onClick={onMintNFT}
      >
        Mint Now
      </button>
    </section>
  );
};
export default Hero;
