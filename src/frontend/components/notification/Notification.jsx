import { BsCheck2Circle } from "react-icons/bs";
import { useGlobalState } from "../../store";
import Spinner from "../spinner/Spinner";
import "./Notification.css";
import { FaRegTimesCircle } from "react-icons/fa";

export default function Notification() {
  const [notifications] = useGlobalState("notifications");

  return (
    <>
      {notifications?.length > 0 && (
        <section className="overflow-hidden fixed right-2 text-xs p-2 pl-5 z-50">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification-container bg-gray-800 my-1.5 p-2 border-purple-500 border-2 rounded-md text-white"
            >
              <div className="container-grid">
                {/* Type = 'Spinner' */}
                {notification.type == "spinner" && (
                  <div className="spinner-grid self-center p-1">
                    <Spinner />
                  </div>
                )}

                {/* Type = 'Success' */}
                {notification.type == "success" && (
                  <div className="spinner-grid self-center p-1">
                    <BsCheck2Circle className="text-green-600 text-3xl" />
                  </div>
                )}

                {/* Type = 'Error' */}
                {notification.type == "error" && (
                  <div className="spinner-grid self-center p-1">
                    <FaRegTimesCircle className="text-red-600 text-3xl cursor-pointer" />
                  </div>
                )}

                {/* Message */}
                {notification.message && (
                  <div className="grid-item-1 overflow-hidden text-ellipsis self-center">
                    <strong className="block p-0.5">
                      {notification.message}
                    </strong>
                  </div>
                )}

                {/* Description */}
                {notification.description && (
                  <div className="grid-item-2 overflow-hidden text-ellipsis self-center">
                    <small className="block p-0.5">
                      {notification.description}
                    </small>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
