import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  alert: { show: false, msg: "", color: "" },
  loading: { show: false, msg: "" },
  connectedAccount: "",
  contract: null,
  nfts: [],
  transactions: [],
});

const setAlert = (msg, color = "green") => {
  setGlobalState("alert", { show: true, msg, color });
  setTimeout(() => {
    setGlobalState("alert", { show: false, msg: "", color });
    setGlobalState("loading", false);
  }, 5000);
};

const setLoadingMsg = (msg) => {
  const loading = getGlobalState("loading");
  setGlobalState("loading", { ...loading, msg });
};

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setAlert,
  setLoadingMsg,
};
