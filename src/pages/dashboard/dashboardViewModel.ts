import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestResetGameAction, selectSystemState } from "../../state-mgmt";
import { buttons } from "./types";

export const DashboardViewModel = () => {
  let navigate = useNavigate();
  const { gameState } = useSelector(selectSystemState);
  const dispatch = useDispatch();

  const navigateTo = useCallback((url: string) => {
    navigate(url);
  }, []);

  const reset = useCallback(() => {
    navigate("/");
    dispatch(requestResetGameAction(""));
  }, []);

  const buttons: buttons = [
    { title: `Home`, location: "/", onClick: reset },
    { title: `Game`, location: "/dashboard", onClick: () => navigateTo("") },
    {
      title: `High Scores`,
      location: "dashboard/dashboard/scores",
      onClick: () => navigateTo("scores"),
    },
  ];

  return {
    navigate,
    buttons,
    gameState,
  };
};
