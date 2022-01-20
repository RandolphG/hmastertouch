import React, { FC } from "react";
import { motion } from "framer-motion";
import { SigninViewModel } from "./signinViewModel";
import "./styles/_signinStyles.scss";

/**
 * SignIn
 **/
const SignIn: FC = () => {
  const { handleChange, playerInfo, motionSettings } = SigninViewModel();

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
};

export default SignIn;
