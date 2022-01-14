export interface INotifications {
  notifications: Notification[];
}

export interface INotificationsPayload {
  title: Notification;
}

export type Notification = string;
