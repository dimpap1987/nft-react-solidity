import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  alert: { show: false, msg: "", type: "" },
  loading: { show: false, msg: "" },
  connectedAccount: "",
  contract: null,
  nfts: [],
  transactions: [],
});

const setAlert = (msg, type = "success", duration = 5000) => {
  setGlobalState("alert", { show: true, msg, type });
  setTimeout(() => {
    setGlobalState("alert", { show: false, msg: "", type });
    setGlobalState("loading", false);
  }, duration);
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
