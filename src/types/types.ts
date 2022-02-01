import { RouterState } from "connected-react-router";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import { Reducer } from "redux";
import { History } from "history";
import { rootReducer } from "../state-mgmt";

export interface IState {
  system: ISystemState;
  router: (
    history: History<RouterState<ISystemState>>
  ) => Reducer<RouterState<RouterState<ISystemState>>>;
}

export type RootState = ReturnType<typeof rootReducer>;

export type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

/* DASHBOARD */
export type navigationLinks = link[];

export type link = {
  link: string;
  onClick: () => void;
};

/* STATE MANAGEMENT */
export interface ISystemState {
  gameState: gameState;
  countdownTimer: boolean;
  selectedLetters: string[];
  favorites: any;
  userName: string;
  score: number;
  alphabet: string[];
  correct: number;
  errors: number;
  guesses: number;
  api: Api;
  timer: Timer;
  highScores: any[];
  buttonId: number;
  notifications: Notification[];
}

export interface IPlayerCredentials {
  userName: string;
}

export interface Api {
  author: string;
  quote: string;
  uniqueCharacters: string;
  uniqueCharactersLength: number;
  length: number;
  tags: string[];
  _id: string;
}

export interface Timer {
  startTime: number;
  endTime: number;
  elapsedTime: number;
  running: boolean;
}

export type Letter = string;

export type gameState =
  | "INITIAL"
  | "COUNTDOWN"
  | "PLAYING"
  | "PAUSED"
  | "FINISHED";

export interface INotificationsPayload {
  title: Notification;
}

export type Notification = string;

/* API */
export type data = {
  _id: string;
  tags: string[];
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
};

/* HOME */
export type ButtonOptions = {
  id: number;
  text: string;
  onClick: (arg0: any) => void;
}[];

export type playerInfo = {
  userName: string;
};

/* GAME */
export interface ILetters {
  quote: string;
  onLetterClick: ({
    quote,
    letter,
    selectedLetters,
  }: handleSelectLetterProps) => void;
}

export interface ILetter {
  idx: number;
  letter: string;
  showLetter: boolean;
  selectedLetters: string[];
  quote: string;
  onLetterClick: ({
    quote,
    letter,
    selectedLetters,
  }: handleSelectLetterProps) => void;
}

export interface IQuote {
  quote: string;
  selectedLetters: string[];
}

export type charset = { [key: string]: string };

export type handleSelectLetterProps = {
  letter: string;
  quote: string;
  selectedLetters: string[];
};

export type gameDetails = {
  id: string;
  score: number;
  quoteId: string;
  length: number;
  uniqueCharacters: string;
  userName: string;
  errors: number;
  duration: number;
};

/* MODAL */
export type results = { info: string; value: number | string }[];

/* UTILS */
export type CalculateScoreProps = (
  quoteLength: number,
  uniqueLetters: number,
  errors: number,
  time: number
) => string;
