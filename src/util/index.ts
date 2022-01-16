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

/*
 * How to find unique characters of a string in JavaScript ?
 * https://www.geeksforgeeks.org/how-to-find-unique-characters-of-a-string-in-javascript/
 * */
export function findUniqueLettersInString(quote: string) {
  return [
    ...quote
      .replace(/[',-;/". ]+/g, "")
      .toLowerCase()
      .split(""),
  ].reduce((acc, curr) => {
    return acc.includes(curr) ? acc : acc + curr;
  }, "");
}
