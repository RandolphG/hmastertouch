import { motion } from "framer-motion";
import React, { memo } from "react";
import { ILetter } from "../types";

const Letter = memo(
  ({
    letter,
    idx,
    word,
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
            word,
            selectedLetters,
          });
        }}
        className={`letter ${showLetter ? "selected" : ""}`}
      >
        {letter}
      </motion.span>
    );
  }
);

export default Letter;
