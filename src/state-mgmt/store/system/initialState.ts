import { ISystemState } from "./types";

export const initialState: ISystemState = {
  gameState: "INITIAL",
  countdownTimer: false,
  userName: "",
  score: 0,
  status: "",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  selectedLetters: [],
  loading: false,
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
    duration: 0,
  },
  buttonId: 1,
  highScores: [],
  showModal: false,
};
