import { useDispatch, useSelector } from "react-redux";
import {
  requestRemoveNotification,
  selectSystemState,
} from "../../../state-mgmt";
import { Notification } from "../../../types";

export const NotificationViewModel = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector(selectSystemState);

  function remove(id: Notification) {
    setTimeout(() => {
      dispatch(requestRemoveNotification({ title: id }));
    }, 2500);
  }

  const motionSettings = {
    initial: { opacity: 0, y: 50, scale: 0.3 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return { motionSettings, remove, notifications };
};
