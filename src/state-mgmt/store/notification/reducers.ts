import { PayloadAction } from "@reduxjs/toolkit";
import { INotifications, INotificationsPayload } from "./types";
import { add, remove } from "./utils";

export const reducers = {
  requestAddNotification: (
    state: INotifications,
    action: PayloadAction<INotificationsPayload>
  ) => {
    const { title } = action.payload;
    const message = `${title}`;

    return {
      ...state,
      notifications: add(state.notifications, message),
    };
  },
  requestRemoveNotification: (
    state: INotifications,
    action: PayloadAction<Notification>
  ) => {
    const { title } = action.payload;

    return {
      ...state,
      notifications: remove(state.notifications, title),
    };
  },
};
