import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { reducers } from "./reducers";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  //@ts-ignore
  reducers,
});

export const { requestRemoveNotification, requestAddNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
