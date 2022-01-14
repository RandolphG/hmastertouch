import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuote } from "../../services";
import { requestResetGameAction, selectSystemState } from "../../state-mgmt";
import { buttons } from "./types";

export const DashboardViewModel = () => {
  let navigate = useNavigate();
  const system = useSelector(selectSystemState);
  const dispatch = useDispatch();

  function navigateToHighScores() {
    navigate("/scores");
  }

  function reset() {
    navigate("/");
    dispatch(requestResetGameAction());
  }

  function newQuote() {
    fetchQuote(dispatch);
    dispatch(requestResetGameAction());
  }

  const motionSettings = {
    initial: {
      x: 50,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const info: any = [
    { title: `User Name`, value: system.userName, style: "userName" },
    { title: `Correct`, value: system.correct, style: "userName" },
    { title: `Guesses`, value: system.guesses, style: "userName" },
    { title: `Errors`, value: system.errors, style: "errors" },
  ];

  const buttons: buttons = [
    { title: `Home`, onClick: reset },
    { title: `High Scores`, onClick: navigateToHighScores },
    { title: `New Quote`, onClick: newQuote },
  ];

  return {
    info,
    motionSettings,
    system,
    navigate,
    buttons,
  };
};
