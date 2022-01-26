import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestAddToFavoritesAction,
  requestResetGameAction,
  requestSetGameStateAction,
  selectSystemState,
} from "../../../state-mgmt";
import { results } from "./types";

export const ModalViewModal = () => {
  console.log(`RE-RENDER`);
  const {
    score,
    gameState,
    guesses,
    errors,
    timer: { elapsedTime },
    api: { quote, author },
  } = useSelector(selectSystemState);
  let interval: NodeJS.Timer;

  const dispatch = useDispatch();

  const motionSettings = {
    initial: { opacity: 0, translateX: -25 },
    animate: { opacity: 1, translateX: 0 },
  };

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
