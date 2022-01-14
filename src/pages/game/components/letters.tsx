import { motion } from "framer-motion";
import React from "react";
import { ILetters } from "../types";

const Letters = ({
  system,
  word,
  selectedLetters,
  onLetterClick,
}: ILetters) => (
  <div className="letter-board">
    {system.alphabet.map((letter: string, idx: number) => {
      const showLetter = !!selectedLetters.find((i) => i === letter);

      return (
        <motion.span
          key={`${letter}-${idx}`}
          initial={{ opacity: 0, translateY: 25 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.2, delay: idx * 0.05 }}
          onClick={() => {
            if (showLetter) return;
            onLetterClick({
              letter,
              word,
              selectedLetters,
            });
          }}
          className={`letter ${showLetter ? "selected" : ""}`}
        >
          {letter}
        </motion.span>
      );
    })}
  </div>
);

export default Letters;
