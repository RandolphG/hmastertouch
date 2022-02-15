import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FloatingLogo } from "../../components";
import { useHome } from "./useHome";
import "./styles/_homeStyles.scss";

/**
 * Home
 */
const Home: FC = () => {
  const { buttonOptions, buttonId, motionSettings } = useHome();

  const button = buttonOptions.map((buttonOption, index) =>
    buttonId === buttonOption.id ? (
      <button
        key={`button-${index}`}
        className="home_container_max_buttons_button"
        onClick={buttonOption.onClick}
      >
        {buttonOption.text}
      </button>
    ) : null
  );

  const Button = () => (
    <div className="home_container_max_buttons">{button} </div>
  );
  /*TODO add tracker pop uo to the bottom of UI */
  return (
    <motion.div className="home" key="home">
      <motion.div className="home_container" {...motionSettings}>
        <div className="home_container_max">
          <FloatingLogo />
          {/*TODO remove routing */}
          <AnimatePresence exitBeforeEnter>
            <Outlet />
          </AnimatePresence>
          <Button />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
