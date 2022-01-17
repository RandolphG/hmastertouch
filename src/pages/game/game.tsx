import React, { FC } from "react";
import { Modal } from "../../components";
import { CountdownTimer, Letters, Stopwatch, WordBoard } from "./components";
import { GameViewModel } from "./gameViewModel";
import { IGame } from "./types";
import "./styles/_gameStyles.scss";

/**
 * Game
 */
const Game: FC = () => {
  const {
    content,
    alphabet,
    author,
    handleSelectLetter,
    ErrorBoundary,
    motionSettings,
    selectedLetters,
  } = GameViewModel();

  const Author = () => (
    <div {...motionSettings} className="author">
      - {author}
    </div>
  );

  const GameBoard = ({ word, selectedLetters, onLetterClick }: IGame) => (
    <div className="hang-man-game">
      <WordBoard word={word} selectedLetters={selectedLetters} />
      <div className="footer">
        <Author />
        <Letters
          alphabet={alphabet}
          word={word}
          selectedLetters={selectedLetters}
          onLetterClick={onLetterClick}
        />
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
      <Modal />
      <Stopwatch />
      <CountdownTimer />
      <GameBoard
        word={content}
        selectedLetters={selectedLetters}
        onLetterClick={handleSelectLetter}
      />
    </ErrorBoundary>
  );
};

export default Game;
