import { PayloadAction } from "@reduxjs/toolkit";

import {
  gameState,
  IPlayerCredentials,
  Api,
  ISystemState,
  Letter,
} from "./types";

export const reducers = {
  requestSetScore: (state: ISystemState, action: PayloadAction<number>) => {
    return { ...state, score: action.payload };
  },
  requestSetUserNameAction: (
    state: ISystemState,
    action: PayloadAction<IPlayerCredentials>
  ) => {
    const playerInfo = action.payload;
    return { ...state, userName: playerInfo.userName };
  },
  requestSetQuoteAction: (state: ISystemState, action: PayloadAction<Api>) => {
    return { ...state, api: action.payload };
  },
  requestSetHighScores: (state: ISystemState, action: PayloadAction<any[]>) => {
    return { ...state, highScores: action.payload };
  },
  requestResetGameAction: (state: ISystemState) => {
    return {
      ...state,
      selectedLetters: [],
      quote: {
        author: "",
        content: "",
        uniqueCharacters: "",
        uniqueCharactersLength: 0,
        length: 0,
        tags: [],
        _id: "",
      },
      loading: false,
      errors: 0,
      correct: 0,
      guesses: 0,
      timer: {
        startTime: 0,
        endTime: 0,
        running: false,
        duration: 0,
      },
      highScores: [],
    };
  },
  requestIncreaseGuessesAction: (
    state: ISystemState,
    action?: PayloadAction
  ) => {
    return { ...state, guesses: state.guesses + 1 };
  },
  requestIncreaseCorrectAction: (
    state: ISystemState,
    action: PayloadAction
  ) => {
    return { ...state, correct: state.correct + 1 };
  },
  requestIncreaseErrorsAction: (
    state: ISystemState,
    action?: PayloadAction
  ) => {
    return { ...state, errors: state.errors + 1 };
  },
  requestSetSelectedLetter: (
    state: ISystemState,
    action: PayloadAction<Letter>
  ) => {
    return {
      ...state,
      selectedLetters: [...state.selectedLetters, action.payload],
    };
  },
  requestStartTimer: (state: ISystemState, action?: PayloadAction) => {
    const { running } = state.timer;
    if (running) {
      console.log("its already running");
    } else {
      return {
        ...state,
        timer: { ...state.timer, running: true, startTime: Date.now() },
      };
    }
  },

  requestStopTimer: (state: ISystemState, action?: PayloadAction) => {
    const { running, startTime } = state.timer;

    if (!running) {
      console.log("its already stopped");
    } else {
      const endTime = Date.now();
      const duration = endTime - startTime;

      return {
        ...state,
        timer: {
          ...state.timer,
          running: false,
          endTime,
          duration,
        },
      };
    }
  },
  requestResetTimer: (state: ISystemState, action?: PayloadAction) => {
    return {
      ...state,
      timer: {
        ...state.timer,
        running: false,
        startTime: 0,
        endTime: 0,
        duration: 0,
      },
    };
  },
  requestSetButtonId: (state: ISystemState, action: PayloadAction<number>) => {
    return {
      ...state,
      buttonId: action.payload,
    };
  },
  requestShowModalAction: (
    state: ISystemState,
    action: PayloadAction<boolean>
  ) => {
    return {
      ...state,
      showModal: action.payload,
    };
  },
  requestSetGameStateAction: (
    state: ISystemState,
    action: PayloadAction<gameState>
  ) => {
    return {
      ...state,
      gameState: action.payload,
    };
  },
};
