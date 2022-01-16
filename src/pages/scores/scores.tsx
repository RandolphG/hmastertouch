import React from "react";
import { ErrorBoundary } from "../../components";
import { ScoresViewModel } from "./scoresViewModel";
import "./styles/_scoresStyles.scss";

/**
 * Scores
 */
const Scores = () => {
  const { navigate, sortedHighScore } = ScoresViewModel();

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
            {sortedHighScore.map((score, idx) => (
              <div
                key={`score-${idx}`}
                style={{
                  marginBottom: "0.5rem",
                  border: "solid pink 2px",
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ color: "green" }}>{score.userName}</div>
                <div>Errors: {score.errors}</div>
                <div>Duration: {score.duration}</div>
                <div>Score: {score.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Scores;
