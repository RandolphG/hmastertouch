import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSystemState } from "../../state-mgmt";

export const ScoresViewModel = () => {
  const { highScores } = useSelector(selectSystemState);
  let navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const motionSettings = {
    initial: { opacity: 0, translateX: 25 },
    animate: { opacity: 1, translateX: 0 },
  };

  return { navigate, highScores, containerRef, motionSettings };
};
