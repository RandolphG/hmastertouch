import React, { memo } from "react";
import { ILetters } from "../types";
import Letter from "./letter";

const Letters = memo(
  ({ alphabet, word, selectedLetters, onLetterClick }: ILetters) => (
    <div className="letter-board">
      {alphabet.map((letter: string, idx: number) => {
        const showLetter = !!selectedLetters.find((i) => i === letter);

        return (
          <Letter
            key={`${letter}-${idx}`}
            idx={idx}
            letter={letter}
            showLetter={showLetter}
            word={word}
            selectedLetters={selectedLetters}
            onLetterClick={onLetterClick}
          />
        );
      })}
    </div>
  )
);

export default Letters;
