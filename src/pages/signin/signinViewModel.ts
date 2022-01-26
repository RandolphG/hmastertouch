import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestSetUserNameAction } from "../../state-mgmt";

type playerInfo = {
  userName: string;
};

export const SigninViewModel = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [playerInfo, setCredentials] = useState<playerInfo>({
    userName: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setCredentials({
      ...playerInfo,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    dispatch(requestSetUserNameAction(playerInfo));

    return () => {};
  }, [playerInfo, dispatch]);

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

  return { handleChange, playerInfo, navigate, motionSettings };
};
