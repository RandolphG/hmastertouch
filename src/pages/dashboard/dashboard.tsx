import React from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";
import { DashboardViewModel } from "./dashboardViewModel";
import "./styles/_dashboardStyles.scss";

/**
 * @description Dashboard page
 */
const Dashboard = () => {
  const { system, motionSettings, info, buttons } = DashboardViewModel();

  const Info = () => (
    <div className="dashboard_container_max_info">
      {info.map((info: any, idx: number) => (
        <div key={idx} className={`dashboard_container_max_${info.style}`}>
          {info.title} : {info.value}
        </div>
      ))}
    </div>
  );

  const Buttons = () => (
    <div className="dashboard_container_max_buttons">
      {buttons.map((button: any, idx: number) => (
        <button
          key={idx}
          className="dashboard_container_max_buttons_button"
          onClick={button.onClick}
        >
          {button.title}
        </button>
      ))}
    </div>
  );

  const Author = () => (
    <div {...motionSettings} className="dashboard_container_max_author">
      {system.quote.author}
    </div>
  );

  return (
    <motion.div className="dashboard">
      <div className="dashboard_container">
        <div className="dashboard_container_max">
          <Info />
          <Buttons />
          <Author />
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
