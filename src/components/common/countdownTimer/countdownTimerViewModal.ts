import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuote, getHighScores } from "../../../services";
import {
  requestSetGameStateAction,
  selectSystemState,
} from "../../../state-mgmt";

export const CountdownTimerViewModal = () => {
  const dispatch = useDispatch();
  const { gameState } = useSelector(selectSystemState);

  useEffect(() => {
    let interval = setTimeout(() => {
      getHighScores(dispatch);
      fetchQuote(dispatch);
      dispatch(requestSetGameStateAction("PLAYING"));
    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, [dispatch]);

  const motionSettings = {
    initial: { scale: 0.85, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.85, opacity: 0 },
  };

  return { motionSettings, gameState };
};
