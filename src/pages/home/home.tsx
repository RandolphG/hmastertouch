import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "../../components";
import { HomeViewModel } from "./homeViewModel";
import "./styles/_homeStyles.scss";

/**
 * Home
 */
const Home: FC = () => {
  const { buttonOptions, system, motionSettings } = HomeViewModel();

  const button = buttonOptions.map((buttonOption, index) =>
    system.buttonId === buttonOption.id ? (
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

  return (
    <motion.div className="home" key="home">
      <motion.div className="home_container" {...motionSettings}>
        <div className="home_container_max">
          <Logo />
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
