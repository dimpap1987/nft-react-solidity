import { useEffect } from "react";
import { isWalletConnected, loadNfts } from "../services/Web3.service";
import Alert from "./Alert";
import Header from "./Header";
import Hero from "./Hero";
import ListItems from "./ListItems";
import Loading from "./loading/Loading";

const App = () => {
  useEffect(async () => {
    await isWalletConnected();
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
