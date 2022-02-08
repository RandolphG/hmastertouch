import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { postHighScore } from "../../../services";
import {
  requestAddToFavoritesAction,
  requestResetGameAction,
  requestSetGameStateAction,
  requestSetHighScores,
  selectSystemState,
} from "../../../state-mgmt";
import { results, gameDetails } from "../../../types";

export const ModalViewModal = () => {
  const {
    highScores,
    userName,
    score,
    gameState,
    guesses,
    errors,
    timer: { elapsedTime },
    api: { quote, author, _id, uniqueCharacters, length },
  } = useSelector(selectSystemState);
  let interval: NodeJS.Timer;

  const dispatch = useDispatch();

  const motionSettings = {
    initial: { opacity: 0, translateX: -25 },
    animate: { opacity: 1, translateX: 0 },
  };

  const highScoreDetails = {
    query: `
          mutation {
            postScore(input: {
              userName: "${userName}",
              id: "${uuid()}",
              score: "${Number(score)}",
              quoteId: "${_id}",
              length: "${length}",
              uniqueCharacters: "${uniqueCharacters}",
              mistakes: "${errors}",
              duration: "${elapsedTime}",
              }) {
                userName
                id
                score
                quoteId
                length
                uniqueCharacters
                mistakes
                duration
              }
          }
        `,
  };

  /* game results to post to server */
  const gameDetails: gameDetails = {
    id: uuid(),
    score,
    userName,
    quoteId: _id,
    length,
    uniqueCharacters,
    errors,
    duration: elapsedTime,
  };

  console.log(`\ngameDetails -> `, gameDetails);

  postHighScore(highScoreDetails).then((data: any) => {
    console.log(`DATA : `, data);
  });

  const newLeaderboard = [...highScores, gameDetails];

  newLeaderboard.sort((a: any, b: any) => {
    return b.score - a.score;
  });

  const results: results = [
    { info: "Time", value: `${(Number(elapsedTime) / 1000).toFixed(1)}s` },
    { info: "Errors", value: errors },
    { info: "Guesses", value: guesses },
  ];

  const addToFavorites = useCallback(
    (quote: string) => {
      dispatch(requestAddToFavoritesAction(quote));
    },
    [dispatch]
  );

  const nextQuote = useCallback(() => {
    if (gameState !== "INITIAL") {
      interval = setTimeout(() => {
        dispatch(requestResetGameAction(""));
        dispatch(requestSetHighScores(newLeaderboard));
        dispatch(requestSetGameStateAction("INITIAL"));
      }, 1000);
    }
  }, [gameState, dispatch]);

  useEffect(() => {
    return () => {
      clearTimeout(interval);
    };
  }, []);

  return {
    nextQuote,
    addToFavorites,
    quote,
    author,
    score,
    gameState,
    results,
    motionSettings,
  };
};
