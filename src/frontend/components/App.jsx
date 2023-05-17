import { useEffect } from "react";
import { isWalletConnected, loadNfts } from "../services/Web3.service";
import Alert from "./Alert";
import Header from "./Header";
import Hero from "./Hero";
import Loading from "./loading/Loading";
import ListItems from "./ListItems";

const App = () => {
  useEffect(async () => {
    await isWalletConnected();
    await loadNfts();
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ListItems />
      <Alert />
      <Loading />
    </main>
  );
};
export default App;
