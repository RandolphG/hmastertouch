import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuote } from "../../services";
import {
  requestResetGameAction,
  requestSetButtonId,
  requestSetGameStateAction,
  selectSystemState,
} from "../../state-mgmt";

import { ButtonOptions } from "./types";

export const HomeViewModel = () => {
  const system = useSelector(selectSystemState);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  function navigateTo() {
    fetchQuote(dispatch);
    dispatch(requestSetButtonId(2));
    navigate("/signIn");
  }

  function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    navigate("/dashboard");
  }

  const buttonOptions: ButtonOptions = [
    {
      id: 1,
      text: "Lets Go",
      onClick: navigateTo,
    },
    {
      id: 2,
      text: "Start Game",
      onClick: handleSubmit,
    },
  ];

  const motionSettings = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 3.5,
      },
    },
  };

  useEffect((): void => {
    dispatch(requestResetGameAction(""));
    dispatch(requestSetGameStateAction("INITIAL"));
  }, [dispatch]);

  return { buttonOptions, system, motionSettings };
};
