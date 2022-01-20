import { motion } from "framer-motion";
import React from "react";
import { ILetter } from "../../types";

const Letter = ({
  letter,
  idx,
  quote,
  selectedLetters,
  showLetter,
  onLetterClick,
}: ILetter) => {
  return (
    <motion.span
      initial={{ opacity: 0, translateY: 25 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.2, delay: idx * 0.05 }}
      onClick={() => {
        if (showLetter) return;
        onLetterClick({
          letter,
          quote,
          selectedLetters,
        });
      }}
      className={`letter ${showLetter ? "selected" : ""}`}
    >
      {letter}
    </motion.span>
  );
};

export default Letter;
