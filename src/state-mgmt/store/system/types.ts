export interface ISystemState {
  userName: string;
  status: string;
  alphabet: string[];
  selectedLetters: string[];
  loading: boolean;
  correct: number;
  errors: number;
  guesses: number;
  quote: IQuoteInfo;
  timer: ITimer;
  highScores: any[];
  buttonId: number;
  showModal: boolean;
}

export interface IPlayerCredentials {
  userName: string;
}

export interface IQuoteInfo {
  author: string;
  content: string;
  uniqueCharacters: string;
  uniqueCharactersLength: number;
  length: number;
  tags: string[];
  _id: string;
}

export interface ITimer {
  startTime: number;
  elapsedTime: number;
  endTime: number;
  running: boolean;
  duration: number;
}

export type Letter = string;
