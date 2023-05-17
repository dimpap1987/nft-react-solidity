import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  alert: { show: false, msg: "", type: "" },
  loading: { show: false, msg: "" },
  connectedAccount: "",
  contract: null,
  nfts: [],
  transactions: [],
});

const setAlert = (msg, type = "success", duration = 2500) => {
  setGlobalState("alert", { show: true, msg, type });
  setTimeout(() => {
    setGlobalState("alert", { show: false, msg: "", type });
    setGlobalState("loading", false);
  }, duration);
};

const setLoading = ({ show, msg = null }) => {
  setGlobalState("loading", { show, msg });
};

export { useGlobalState, setGlobalState, getGlobalState, setAlert, setLoading };
