import React, { FC } from "react";
import { Letters, WordBoard } from "./components";
import { GameViewModel } from "./gameViewModel";
import { IGame } from "./types";
import "./styles/_gameStyles.scss";

/**
 * Game
 */
const Game: FC = () => {
  const { system, handleSelectLetter, ErrorBoundary, motionSettings } =
    GameViewModel();

  const Author = () => (
    <div {...motionSettings} className="author">
      - {system.quote.author}
    </div>
  );

  const GameBoard = ({ word, selectedLetters, onLetterClick }: IGame) => (
    <div className="hang-man-game">
      <WordBoard word={word} selectedLetters={selectedLetters} />
      <div className="footer">
        <Author />
        <Letters
          system={system}
          word={word}
          selectedLetters={selectedLetters}
          onLetterClick={onLetterClick}
        />
      </div>
    </div>
  );

  const Results = () => (
    <div className="results">
      <div
        style={{
          border: "green 3px solid",
          width: "70%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            border: "purple 3px solid",
            width: "100%",
            height: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Game Results
        </div>
        <div
          style={{
            border: "red 3px solid",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "2rem",
          }}
        >
          <div className="details">Score : 1999</div>
          <div className="details">Errors : {system.errors}</div>
          <div className="details">Guesses : {system.guesses}</div>
        </div>
        <button
          className="modalButton"
          onClick={() => {
            console.log(`CLICKED`);
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
      <Results />
      <GameBoard
        word={system.quote.content}
        selectedLetters={system.selectedLetters}
        onLetterClick={handleSelectLetter}
      />
    </ErrorBoundary>
  );
};

export default Game;
