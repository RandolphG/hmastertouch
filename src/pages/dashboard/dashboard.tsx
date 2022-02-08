import React, { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CountdownTimer, Modal } from "../../components";
import { Game } from "../game";
import { Leaderboard } from "../leaderboard";
import { useDashboard } from "./useDashboard";
import "./styles/_dashboardStyles.scss";

/**
 * Dashboard
 */
const Dashboard = () => {
  const { navigationLinks, gameState } = useDashboard();
  const views = [
    { id: 0, name: "Home", component: <Game /> },
    { id: 1, name: "High Scores", component: <Leaderboard /> },
  ];
  const [currentView, setCurrentView] = useState<any>(0);

  const Links = () => {
    return (
      <Fragment>
        {gameState === "PLAYING" && (
          <div className="dashboard_container_max_buttons">
            {navigationLinks.map((nav, idx: number) => (
              <button
                key={idx}
                className="dashboard_container_max_buttons_button"
                onClick={() => {
                  const view = nav.onClick;
                  const current = view();
                  console.log(`current -->`, current);
                  setCurrentView(current);
                }}
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
        {gameState === "PLAYING" && (
          <motion.div key={`dashboard`} className="dashboard">
            <div className="dashboard_container">
              <div className="dashboard_container_max">
                <Links />
                {/*<Outlet />*/}
                <AnimatePresence exitBeforeEnter>
                  {views.map((view, idx) => {
                    if (currentView === view.id) {
                      return <span key={idx}>{view.component}</span>;
                    }
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default Dashboard;
