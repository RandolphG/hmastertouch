import { motion } from "framer-motion";
import React from "react";
import { IQuote } from "../../types";

const Quote = ({ quote, selectedLetters }: IQuote) => {
  const containerMotionSettings = {
    initial: { scale: 0.75, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { opacity: 1 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.div {...containerMotionSettings} className="word-board">
      {quote.split("").map((letter: string, idx: number) => {
        const showLetter = selectedLetters.find(
          (i) => i === letter.toUpperCase()
        );

        return (
          <span key={`word-${idx}`} className="word-board-letter">
            {showLetter ? letter : "_"}
          </span>
        );
      })}
    </motion.div>
  );
};

export default Quote;
