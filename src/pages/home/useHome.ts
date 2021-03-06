import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuote } from "../../services";
import {
  selectSystemState,
  requestAddNotification,
  requestResetGameAction,
  requestSetButtonId,
  requestSetGameStateAction,
} from "../../state-mgmt";

import { ButtonOptions } from "../../types";

export const useHome = () => {
  const { buttonId, userName } = useSelector(selectSystemState);
  let navigate = useNavigate();
  const dispatch = useDispatch();

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

  function navigateTo() {
    fetchQuote(dispatch);
    dispatch(requestSetButtonId(2));
    navigate("/signIn");
  }

  function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    if (userName.length < 3) {
      dispatch(requestAddNotification({ title: "Username too short" }));
      return;
    } else {
      navigate("/dashboard");
    }
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

  useEffect((): void => {
    dispatch(requestResetGameAction(undefined));
    dispatch(requestSetGameStateAction("INITIAL"));
  }, [dispatch]);

  return { buttonOptions, buttonId, motionSettings };
};
