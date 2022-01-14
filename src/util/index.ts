import { CalculateScoreProps } from "./types";

/**
 * Calculates the score of a given quote.
 *
 * @returns {number}
 * @param quoteLength
 * @param uniqueLetters
 * @param errors
 * @param time
 */
export const calculateScore: CalculateScoreProps = (
  quoteLength,
  uniqueLetters,
  errors,
  time
) => {
  const seconds: number = time / 1000;
  return ((quoteLength * uniqueLetters) / (1 + errors * seconds)).toFixed();
};

export const simpleFunction = () => {
  return "Hello World";
};
