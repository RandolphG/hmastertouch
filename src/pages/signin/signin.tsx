import { motion } from "framer-motion";
import React, { FC, memo } from "react";
import { SigninViewModel } from "./signinViewModel";
import "./styles/_signinStyles.scss";

/**
 * SignIn
 **/
const SignIn: FC = memo(() => {
  const { handleChange, playerInfo } = SigninViewModel();

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

  return (
    <motion.div {...motionSettings} className="signin" key="signIn">
      <motion.div className="signin_container">
        <input
          className="signin_container_userName"
          onChange={handleChange}
          value={playerInfo.userName}
          type="text"
          name="userName"
          id="userName"
          placeholder="enter user name..."
          autoComplete="off"
          required
        />
      </motion.div>
    </motion.div>
  );
});

export default SignIn;
