import React, { FC, Fragment } from "react";
import { Letters, Stopwatch, Quote } from "./components";
import { useGame } from "./useGame";
import { motion } from "framer-motion";
import "./styles/_gameStyles.scss";

/**
 * Game
 */
const Game: FC = () => {
  const {
    info,
    gameState,
    quote,
    author,
    handleSelectLetter,
    ErrorBoundary,
    selectedLetters,
    authorMotionSettings,
    newQuote,
    userName,
  } = useGame();

  return (
    <ErrorBoundary>
      <Fragment>
        {gameState === "PLAYING" && (
          <motion.div className="hang-man-game">
            <div className="dashboard_container_max_info">
              {userName}
              {info.map((info: any, idx: number) => (
                <motion.div
                  key={`info-${idx}`}
                  initial={{ opacity: 0, translateY: -15 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`dashboard_container_max_${info.style}`}
                >
                  {info.title} : {info.value}
                </motion.div>
              ))}
            </div>
            <Stopwatch />
            <Quote quote={quote} selectedLetters={selectedLetters} />
            <div className="footer">
              <motion.div {...authorMotionSettings} className="author">
                - {author}
              </motion.div>
              <Letters quote={quote} onLetterClick={handleSelectLetter} />
            </div>
            <button className="resetButton" onClick={newQuote}>
              New Quote
            </button>
          </motion.div>
        )}
      </Fragment>
    </ErrorBoundary>
  );
};

export default Game;
