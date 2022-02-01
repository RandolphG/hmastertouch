import { ISystemState } from "../../../types";

export const initialState: ISystemState = {
  gameState: "INITIAL",
  countdownTimer: false,
  selectedLetters: [],
  favorites: [],
  userName: "",
  score: 0,
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  correct: 0,
  errors: 0,
  guesses: 0,
  api: {
    author: "",
    quote: "",
    uniqueCharacters: "",
    uniqueCharactersLength: 0,
    length: 0,
    tags: [],
    _id: "",
  },
  timer: {
    startTime: 0,
    elapsedTime: 0,
    endTime: 0,
    running: false,
  },
  buttonId: 1,
  highScores: [],
  notifications: [],
};
