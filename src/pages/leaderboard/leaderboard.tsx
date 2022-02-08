import React from "react";
import { motion } from "framer-motion";
import { useLeaderboard } from "./useLeaderboard";
import "./styles/_leaderboardStyles.scss";

/**
 * Leaderboard
 */
const Leaderboard = () => {
  const { motionSettings, highScores } = useLeaderboard();

  return (
    <motion.div
      className="grid-container"
      initial={{ opacity: 0, translateY: -15 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -15 }}
    >
      <main className="grid-item main">
        <div className="items">
          {highScores.map((score, idx) => (
            <motion.div
              key={idx}
              className="item item1"
              {...motionSettings}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "green solid 3px",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    width: "100%",
                    textAlign: "center",
                    border: "green solid 3px",
                  }}
                >
                  {score.userName}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "2rem",
                      width: "100%",
                      textAlign: "center",
                      border: "green solid 3px",
                    }}
                  >
                    Score
                  </div>
                  <div
                    style={{
                      fontSize: "11rem",
                      width: "100%",
                      textAlign: "center",
                      border: "green solid 3px",
                    }}
                  >
                    {score.score}
                  </div>
                  <div
                    style={{
                      fontSize: "2rem",
                      width: "100%",
                      textAlign: "center",
                      border: "green solid 3px",
                    }}
                  >
                    character count: {score.length}
                  </div>
                  <div
                    style={{
                      fontSize: "2rem",
                      width: "100%",
                      textAlign: "center",
                      border: "green solid 3px",
                    }}
                  >
                    characters : {score.uniqueCharacters}
                  </div>
                </div>
                <div>time :{(score.duration / 1000).toFixed(1)}s</div>
                <div>Errors :{score.errors}</div>
                <div>{score.quoteId}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

export default Leaderboard;
