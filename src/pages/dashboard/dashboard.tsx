import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { CountdownTimer, Modal } from "../../components";
import { DashboardViewModel } from "./dashboardViewModel";
import "./styles/_dashboardStyles.scss";
import { button } from "./types";

/**
 * Dashboard
 */
const Dashboard = () => {
  const { buttons, gameState } = DashboardViewModel();

  const Buttons = () => {
    return (
      <Fragment>
        {gameState === "PLAYING" && (
          <div className="dashboard_container_max_buttons">
            {buttons.map((button, idx: number) => (
              <button
                key={idx}
                className="dashboard_container_max_buttons_button"
                onClick={button.onClick}
              >
                {button.title}
              </button>
            ))}
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      {gameState === "FINISHED" && <Modal />}
      {gameState === "INITIAL" && <CountdownTimer />}
      <motion.div className="dashboard">
        <div className="dashboard_container">
          <div className="dashboard_container_max">
            <Buttons />
            <Outlet />
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
};

export default Dashboard;
