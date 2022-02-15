import { useQuery } from "@apollo/client";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HIGH_SCORES } from "../../client";
import {
  requestResetGameAction,
  requestSetHighScores,
  selectSystemState,
} from "../../state-mgmt";
import { navigationLinks } from "../../types";
import { Game } from "../game";

export const useDashboard = () => {
  let navigate = useNavigate();
  const { gameState } = useSelector(selectSystemState);
  const { loading, error, data } = useQuery(HIGH_SCORES);
  const dispatch = useDispatch();

  const reset = useCallback(() => {
    dispatch(requestResetGameAction(""));
    navigate("/");
  }, []);

  const navigationLinks: navigationLinks = [
    { link: `Home`, onClick: reset },
    {
      link: `Game`,
      onClick: () => {
        console.log("Game");
        return 0;
      },
    },
    {
      link: `High Scores`,
      onClick: () => {
        console.log("High Scores");
        return 1;
      },
    },
  ];

  useEffect(() => {
    if (data) {
      const { highScores } = data;

      console.log(`%cHIGH SCORES --->`, "color : green;", highScores);

      dispatch(requestSetHighScores(highScores));
    }
  }, [data]);

  return {
    navigate,
    navigationLinks,
    gameState,
  };
};
