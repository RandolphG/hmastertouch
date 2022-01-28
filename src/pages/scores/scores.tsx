// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "../../components";
import { ScoresViewModel } from "./scoresViewModel";
import "./styles/_scoresStyles.scss";

/**
 * Scores
 */
const Scores = () => {
  const { highScores, containerRef, motionSettings } = ScoresViewModel();

  const Header = () => (
    <thead>
      <tr>
        <th>#score</th>
        <th>nickname</th>
        <th>time</th>
        <th>errors</th>
      </tr>
    </thead>
  );

  const ScoreSheet = () => (
    <tbody>
      {highScores.map((score, idx) => (
        <motion.tr
          key={idx}
          {...motionSettings}
          transition={{ duration: 0.2, delay: idx * 0.05 }}
        >
          <td>{score.score}</td>
          <td>{score.userName}</td>
          <td>{score.duration}</td>
          <td>{score.errors}</td>
        </motion.tr>
      ))}
    </tbody>
  );

  const Container = ({ children }: any) => (
    <div
      className="board__content-item board__content-leaderboard"
      ref={containerRef}
    >
      <table
        className="board__leaderboard leaderboard"
        aria-label="leaderboard"
      >
        {children}
      </table>
    </div>
  );

  return (
    <ErrorBoundary>
      <motion.div className="score">
        <div className="score_container">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Container>
              <Header />
              <ScoreSheet />
            </Container>
          </div>
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};

export default Scores;
