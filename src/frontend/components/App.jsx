import { useEffect } from "react";
import { isWalletConnected } from "../services/Web3.service";
import Alert from "./Alert";
import Header from "./Header";

const App = () => {
  useEffect(async () => {
    isWalletConnected();
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Alert />
    </main>
  );
};
export default App;
