import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import { useEffect } from "react";
import {
  isWalletConnected,
  loadMintedTransactions,
} from "../services/Web3.service";
import Alert from "./Alert";
import Header from "./Header";
import Hero from "./Hero";
import Loading from "./loading/Loading";
import TransactionHistory from "./transaction-history/TransactionHistory";

const App = () => {
  useEffect(async () => {
    loadMintedTransactions();
    isWalletConnected();
  }, []);

  return (
    <main>
      <Header />
      <Hero />
      <TransactionHistory />
      {/* <ListItems /> */}
      <Alert />
      <Loading />
    </main>
  );
};
export default App;
