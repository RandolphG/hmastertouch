import { useDispatch, useSelector } from "react-redux";
import {
  requestRemoveNotification,
  selectSystemState,
} from "../../../state-mgmt";

export const NotificationViewModel = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector(selectSystemState);

  function remove(id: string) {
    setTimeout(() => {
      dispatch(requestRemoveNotification(id));
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
