import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuote } from "../../services";
import { requestResetGameAction, selectSystemState } from "../../state-mgmt";
import { buttons } from "./types";

export const DashboardViewModel = () => {
  let navigate = useNavigate();
  const system = useSelector(selectSystemState);
  const dispatch = useDispatch();

  function navigateTo(url: string) {
    navigate(url);
  }

  function reset() {
    navigate("/");
    dispatch(requestResetGameAction());
  }

  function newQuote() {
    fetchQuote(dispatch);
    dispatch(requestResetGameAction());
  }

  const info: any = [
    { title: `User Name`, value: system.userName, style: "userName" },
    { title: `Correct`, value: system.correct, style: "userName" },
    { title: `Guesses`, value: system.guesses, style: "userName" },
    { title: `Errors`, value: system.errors, style: "errors" },
  ];

  const buttons = [
    { title: `Home`, onClick: reset },
    { title: `Game`, onClick: () => navigateTo("") },
    { title: `High Scores`, onClick: () => navigateTo("dashboard/scores") },
    { title: `New Quote`, onClick: newQuote },
  ];

  return {
    info,
    system,
    navigate,
    buttons,
  };
};
