import React from "react";
import { ErrorBoundary } from "../../components";
import { ScoresViewModel } from "./scoresViewModel";
import "./styles/_scoresStyles.scss";

/**
 * Scores
 */
const Scores = () => {
  const { sortedHighScore } = ScoresViewModel();

  return (
    <ErrorBoundary>
      <div className="score">
        <div className="score_container">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="board__content-item board__content-leaderboard">
              <table
                className="board__leaderboard leaderboard"
                aria-label="leaderboard"
              >
                <thead>
                  <tr>
                    <th>#score</th>
                    <th>nickname</th>
                    <th>time</th>
                    <th>errors</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHighScore.map((score, idx) => (
                    <tr>
                      <td>{score.score}</td>
                      <td>{score.userName}</td>
                      <td>{score.duration}</td>
                      <td>{score.errors}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Scores;
