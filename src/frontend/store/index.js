import { createGlobalState } from "react-hooks-global-state";
import { v4 as uuidv4 } from "uuid";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  alert: { show: false, msg: "", type: "" },
  loading: { show: false, msg: "" },
  connectedAccount: null,
  contract: null,
  nfts: [],
  transactions: [],
  notifications: [],
});

const setAlert = (msg, type = "success", duration = 2000) => {
  setGlobalState("alert", { show: true, msg, type });
  setTimeout(() => {
    setGlobalState("alert", { show: false, msg: "", type });
    setGlobalState("loading", false);
  }, duration);
};

const setLoading = ({ show, msg = null }) => {
  setGlobalState("loading", { show, msg });
};


function addNotification({
  id = uuidv4(),
  icon,
  type,
  message,
  description,
  duration = 3000,
}) {
  setGlobalState("notifications", [
    {
      id,
      icon,
      type,
      message,
      description,
      duration,
    },
    ...getGlobalState("notifications"),
  ]);

  if (!duration || type === "spinner") return;

  setTimeout(() => {
    const newNotifications = getGlobalState("notifications")?.filter(
      (n) => n.id !== id
    );
    setGlobalState("notifications", newNotifications);
  }, duration);
}

function removeNotification(id) {
  const newNotifications = getGlobalState("notifications")?.filter(
    (n) => n.id !== id
  );
  setGlobalState("notifications", newNotifications);
}

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setAlert,
  setLoading,
  addNotification,
  removeNotification,
};
