import { connectWallet } from "../services/Web3.service";
import { useGlobalState } from "../store";

const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  return (
    <nav className="w-4/5 flex md:justify-center justify-between items-center p-5 mx-auto w-full z-50 bg-zinc-900">
      <div className="flex flex-row justify-start items-center md:flex-[0.5] flex-initial">
        {/* <img className="w-8 cursor-pointer" src={logo} alt="NFT Logo" /> */}
        <span className="text-white text-2xl ml-2">MyNfts</span>
      </div>

      <ul
        className="md:flex-[0.5] text-white 
        md:flex hidden list-none flex-row 
        justify-between items-center flex-initial"
      >
        {/* <li className="mx-4 cursor-pointer">Explore</li> */}
      </ul>

      {connectedAccount ? (
        <button
          style={{ background: "var(--primary-color--button)" }}
          className="shadow-xl cursor-default shadow-black text-white text-xs md:text-base p-2 rounded-full"
        >
          {connectedAccount.slice(0, 5) + "....." + connectedAccount.slice(-4)}
        </button>
      ) : (
        <button
          style={{ background: "var(--primary-color--button)" }}
          className="shadow-xl shadow-black text-white text-xs md:text-base p-2 rounded-full cursor-pointer"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Header;
