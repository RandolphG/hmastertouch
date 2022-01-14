import { createSelector } from "reselect";
import { IState } from "../../../types";

export const getNotificationState = (state: IState) => state.notifications;

export const getNotifications = createSelector(
  getNotificationState,
  (state) => state.notifications
);
