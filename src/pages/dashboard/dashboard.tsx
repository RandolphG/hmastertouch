import React, { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { CountdownTimer, Modal } from "../../components";
import { DashboardViewModel } from "./dashboardViewModel";
import "./styles/_dashboardStyles.scss";

/**
 * Dashboard
 */
const Dashboard = () => {
  const { navigationLinks, gameState } = DashboardViewModel();

  const Links = () => {
    return (
      <Fragment>
        {gameState === "PLAYING" && (
          <div className="dashboard_container_max_buttons">
            {navigationLinks.map((nav, idx: number) => (
              <button
                key={idx}
                className="dashboard_container_max_buttons_button"
                onClick={nav.onClick}
              >
                {nav.link}
              </button>
            ))}
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter>
        {gameState === "FINISHED" && <Modal />}
        {gameState === "INITIAL" && <CountdownTimer />}
        <motion.div key={`dashboard`} className="dashboard">
          <div className="dashboard_container">
            <div className="dashboard_container_max">
              <Links />
              <Outlet />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Fragment>
  );
};

export default Dashboard;
