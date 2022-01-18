import React, { FC, Fragment } from "react";
import { Modal } from "../../components";
import { CountdownTimer, Letters, Stopwatch, WordBoard } from "./components";
import { GameViewModel } from "./gameViewModel";
import { IGame } from "./types";
import { motion } from "framer-motion";
import "./styles/_gameStyles.scss";

/**
 * Game
 */
const Game: FC = () => {
  const {
    gameState,
    content,
    alphabet,
    author,
    handleSelectLetter,
    ErrorBoundary,
    selectedLetters,
    authorMotionSettings,
    containerMotionSettings,
  } = GameViewModel();

  const Author = () => (
    <motion.div {...authorMotionSettings} className="author">
      - {author}
    </motion.div>
  );

  const GameBoard = ({ word, selectedLetters, onLetterClick }: IGame) => (
    <Fragment>
      {gameState === "PLAYING" && (
        <motion.div {...containerMotionSettings} className="hang-man-game">
          <Stopwatch />
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
        </motion.div>
      )}
    </Fragment>
  );

  return (
    <ErrorBoundary>
      <Modal />
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
