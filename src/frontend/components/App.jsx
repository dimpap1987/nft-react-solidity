import { useEffect } from "react";
import { isWalletConnected } from "../services/Web3.service";
import { setLoading } from "../store";
import Alert from "./Alert";
import Header from "./Header";
import Loading from "./loading/Loading";

const App = () => {
  useEffect(async () => {
    isWalletConnected();

    setLoading({
      show: true,
      msg: 'Trying to connect'
    });
    setTimeout(() => {
      setLoading({ show: false });
    }, 3000);
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Alert />
      <Loading />
    </main>
  );
};
export default App;
