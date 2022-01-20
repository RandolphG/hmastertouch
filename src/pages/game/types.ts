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
  quoteId: string;
  length: number;
  uniqueCharacters: string;
  userName: string;
  errors: number;
  duration: number;
};
