import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestSetGameStateAction,
  selectSystemState,
} from "../../../state-mgmt";

export const CountdownTimerViewModal = () => {
  const dispatch = useDispatch();
  const { gameState } = useSelector(selectSystemState);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    let interval = setTimeout(() => {
      dispatch(requestSetGameStateAction("PLAYING"));
      setHidden(false);
    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  const motionSettings = {
    initial: { scale: 0.85, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  return { motionSettings, gameState };
};
