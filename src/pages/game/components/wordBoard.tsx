import React from "react";
import { IWordBoard } from "../types";

const WordBoard = ({ word, selectedLetters }: IWordBoard) => (
  <div className="word-board">
    {word.split("").map((letter: string, idx: number) => {
      const showLetter = selectedLetters.find(
        (i) => i === letter.toUpperCase()
      );

      return (
        <span key={`word-${idx}`} className="word-board-letter">
          {showLetter ? letter : "_"}
        </span>
      );
    })}
  </div>
);

export default WordBoard;
