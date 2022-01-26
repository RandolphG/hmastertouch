import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { reducers } from "./reducers";

export const systemSlice = createSlice({
  name: "system",
  initialState,
  //@ts-ignore
  reducers,
});

export const {
  requestSetUserNameAction,
  requestSetQuoteAction,
  requestSetSelectedLetter,
  requestResetGameAction,
  requestIncreaseErrorsAction,
  requestIncreaseCorrectAction,
  requestIncreaseGuessesAction,
  requestResetTimer,
  requestStopTimer,
  requestStartTimer,
  requestSetHighScores,
  requestSetButtonId,
  requestSetGameStateAction,
  requestSetScore,
  requestRemoveNotification,
  requestAddNotification,
  requestAddToFavoritesAction,
} = systemSlice.actions;

export default systemSlice.reducer;
