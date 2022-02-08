import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestResetGameAction, selectSystemState } from "../../state-mgmt";
import { navigationLinks } from "../../types";
import { Game } from "../game";

export const useDashboard = () => {
  let navigate = useNavigate();
  const { gameState } = useSelector(selectSystemState);
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

  return {
    navigate,
    navigationLinks,
    gameState,
  };
};
