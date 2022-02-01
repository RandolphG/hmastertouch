import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestResetGameAction, selectSystemState } from "../../state-mgmt";
import { navigationLinks } from "../../types";

export const useDashboard = () => {
  let navigate = useNavigate();
  const { gameState } = useSelector(selectSystemState);
  const dispatch = useDispatch();

  const navigateTo = useCallback((url: string) => {
    navigate(url);
  }, []);

  const reset = useCallback(() => {
    dispatch(requestResetGameAction(""));
    navigate("/");
  }, []);

  const navigationLinks: navigationLinks = [
    { link: `Home`, onClick: reset },
    { link: `Game`, onClick: () => navigateTo("") },
    {
      link: `High Scores`,
      onClick: () => navigateTo("scores"),
    },
  ];

  return {
    navigate,
    navigationLinks,
    gameState,
  };
};
