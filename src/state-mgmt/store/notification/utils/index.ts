import { Notification } from "../types";

/* remove notification from array*/
export const remove = (arr: Notification[], item: Notification) => {
  const notificationsArray = [...arr];
  notificationsArray.splice(
    notificationsArray.findIndex((notification) => notification === item),
    1
  );

  return notificationsArray;
};

/* add notification to array*/
export const add = (arr: Notification[], message: Notification) => {
  return [...arr, { message }];
};

export const contains = (original: Notification, filter: Notification[]) => {
  const res = filter.map((item: Notification) => {
    return original.includes(item);
  });

  return !res.includes(false);
};

export const hasDuplicate = (array: Notification[]) => {
  return new Set(array).size !== array.length;
};
