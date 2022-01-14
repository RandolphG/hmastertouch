import { ChangeEvent, useState } from "react";
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

    console.log(`USER NAME: ${playerInfo.userName}`);
    dispatch(requestSetUserNameAction(playerInfo));
  }

  return { handleChange, playerInfo, navigate };
};
