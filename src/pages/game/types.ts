import { ISystemState } from "../../state-mgmt";

export interface IGame {
  word: string;
  selectedLetters: string[];
  onLetterClick: ({
    word,
    letter,
    selectedLetters,
  }: {
    word: string;
    letter: string;
    selectedLetters: string[];
  }) => void;
}

export interface IWordBoard {
  word: string;
  selectedLetters: string[];
}

export interface ILetters {
  system: ISystemState;
  word: string;
  selectedLetters: string[];
  onLetterClick: ({
    word,
    letter,
    selectedLetters,
  }: {
    word: string;
    letter: string;
    selectedLetters: string[];
  }) => void;
}

export type charset = { [key: string]: string };

export type handleSelectLetterProps = {
  letter: string;
  word: string;
  selectedLetters: string[];
};

export type gameDetails = {
  quoteId: string;
  length: number;
  uniqueCharacters: string;
  userName: string;
  errors: number;
  duration: number;
};
