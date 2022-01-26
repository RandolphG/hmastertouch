import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSystemState } from "../../state-mgmt";

export const ScoresViewModel = () => {
  const { highScores } = useSelector(selectSystemState);
  let navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (null !== containerRef.current) {
      // containerRef.current.innerText = "Hello world!";
    }
  }, []);

  return { navigate, highScores, containerRef };
};
