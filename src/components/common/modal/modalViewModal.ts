import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuote } from "../../../services";
import {
  requestResetGameAction,
  requestSetGameStateAction,
  selectSystemState,
} from "../../../state-mgmt";
import { results } from "./types";

export const ModalViewModal = () => {
  const {
    score,
    gameState,
    guesses,
    errors,
    timer: { elapsedTime },
  } = useSelector(selectSystemState);

  const [showResults, setShowResults] = useState<boolean>(true);
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

  useEffect(() => {
    // fetchQuote(dispatch);
    // dispatch(requestResetGameAction(""));
    if (gameState !== "INITIAL") {
      /*let interval = setTimeout(() => {
        dispatch(requestSetGameStateAction("INITIAL"));
      }, 5000);*/

      return () => {
        // clearTimeout(interval);
      };
    }
  }, []);

  return {
    score,
    gameState,
    results,
    motionSettings,
    showResults,
    setShowResults,
  };
};
