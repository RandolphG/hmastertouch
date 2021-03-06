import { Notification, CalculateScoreProps } from "../types";

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

export function removeItem<T>([...arr]: T[], item: T) {
  const index = arr.indexOf(item);
  index > -1 && arr.splice(index, 1);
  return arr;
}

export function closestItem<T>(arr: T[], item: T) {
  const index = arr.indexOf(item);
  if (index === -1) {
    return arr[0];
  } else if (index === arr.length - 1) {
    return arr[arr.length - 2];
  } else {
    return arr[index + 1];
  }
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

/* filter object based on keys
 * https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
 * */
export const filterObjectByKey = (key: string, data: any) => {
  return Object.keys(data)
    .filter((item) => item.includes(key))
    .reduce((obj: any, key: any) => {
      obj[key] = data[key];
      return obj;
    }, {});
};
