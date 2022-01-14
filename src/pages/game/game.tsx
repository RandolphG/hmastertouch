import React, { FC } from "react";
import { Letters, WordBoard } from "./components";
import { GameViewModel } from "./gameViewModel";
import { IGame } from "./types";
import "./styles/_gameStyles.scss";

/**
 * Game
 */
const Game: FC = () => {
  const { system, handleSelectLetter, ErrorBoundary } = GameViewModel();

  const GameBoard = ({ word, selectedLetters, onLetterClick }: IGame) => (
    <div className="hang-man-game">
      <WordBoard word={word} selectedLetters={selectedLetters} />
      <Letters
        system={system}
        word={word}
        selectedLetters={selectedLetters}
        onLetterClick={onLetterClick}
      />
    </div>
  );

  return (
    <ErrorBoundary>
      <GameBoard
        word={system.quote.content}
        selectedLetters={system.selectedLetters}
        onLetterClick={handleSelectLetter}
      />
    </ErrorBoundary>
  );
};

export default Game;
