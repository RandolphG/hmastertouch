import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
  } = useSelector(selectSystemState);

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
    if (gameState !== "INITIAL") {
      let interval = setTimeout(() => {
        dispatch(requestResetGameAction(""));
        dispatch(requestSetGameStateAction("INITIAL"));
      }, 5000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, []);

  return {
    score,
    gameState,
    results,
    motionSettings,
  };
};
