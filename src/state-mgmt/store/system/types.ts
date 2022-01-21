export interface ISystemState {
  gameState: gameState;
  countdownTimer: boolean;
  userName: string;
  score: number;
  alphabet: string[];
  selectedLetters: string[];
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

export type gameState = "INITIAL" | "PLAYING" | "PAUSED" | "FINISHED";

export interface INotificationsPayload {
  title: Notification;
}

export type Notification = string;
