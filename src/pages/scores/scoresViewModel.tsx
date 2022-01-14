import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHighScores } from "../../services";
import { selectSystemState } from "../../state-mgmt";

export const ScoresViewModel = () => {
  const system = useSelector(selectSystemState);
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const calculateScore = system.highScores.map((obj) => {
    return { ...obj, score: parseInt((100 / (1 + obj.errors)).toFixed()) };
  });

  const sortedHighScore = calculateScore.sort(function (a, b) {
    return b.score - a.score;
  });

  useEffect(() => {
    getHighScores(dispatch);
  }, [dispatch]);

  return { system, navigate, sortedHighScore };
};
