import { CalculateScoreProps } from "./types";
import { Notification } from "../state-mgmt";

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

/* remove notification from array */
export const remove = (arr: string[], item: string) => {
  const notificationsArray = [...arr];
  notificationsArray.splice(
    notificationsArray.findIndex((notification) => notification === item),
    1
  );

  return notificationsArray;
};

/* add notification to array */
export const add = (arr: string[], message: string) => {
  return [...arr, { message }];
};

/* check to see if elements exist in array */
export const contains = (original: Notification[], filter: Notification[]) => {
  const res = filter.map((item: Notification) => {
    return original.includes(item);
  });

  return !res.includes(false);
};

export const determineScore = (highScores: any) => {
  highScores.map((obj: any) => {
    return { ...obj, score: parseInt((100 / (1 + obj.errors)).toFixed()) };
  });
};

/* sort scores alphabetically */
export const sort = (scores: any[]) => {
  scores.sort((a, b) => {
    return b.score - a.score;
  });
};
