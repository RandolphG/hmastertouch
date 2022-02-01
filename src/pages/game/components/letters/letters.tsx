import React from "react";
import { ILetters } from "../../../../types";
import Letter from "./letter";
import { LettersViewModel } from "./LettersViewModel";

const Letters = ({ onLetterClick }: ILetters) => {
  const { alphabet, selectedLetters, quote } = LettersViewModel();
  return (
    <div className="letter-board">
      {alphabet.map((letter: string, idx: number) => {
        const showLetter = !!selectedLetters.find((i) => i === letter);

        return (
          <Letter
            key={`${letter}-${idx}`}
            idx={idx}
            letter={letter}
            showLetter={showLetter}
            quote={quote}
            selectedLetters={selectedLetters}
            onLetterClick={onLetterClick}
          />
        );
      })}
    </div>
  );
};

export default Letters;
