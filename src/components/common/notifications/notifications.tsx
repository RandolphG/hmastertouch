// @ts-nocheck
import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/_notificationsStyles.scss";
import { NotificationViewModel } from "./notificationViewModel";

/**
 * Notifications.
 * */
const Notifications = () => {
  const { motionSettings, remove, notifications } = NotificationViewModel();

  return createPortal(
    <div className="notification">
      <div className="notification_container">
        <ul className="notification_container_list">
          <AnimatePresence initial={false}>
            {notifications &&
              notifications.map((notification: any, idx: number) => {
                remove(notification.message);
                return (
                  <motion.li
                    className="notification_container_list_item"
                    key={idx}
                    {...motionSettings}
                  >
                    <span className="notification_container_list_item_message">
                      {notification.message}
                    </span>
                  </motion.li>
                );
              })}
          </AnimatePresence>
        </ul>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Notifications;
