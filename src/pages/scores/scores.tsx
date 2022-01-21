import React from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "../../components";
import { ScoresViewModel } from "./scoresViewModel";
import "./styles/_scoresStyles.scss";

/**
 * Scores
 */
const Scores = () => {
  const { sortedHighScore } = ScoresViewModel();

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
      {sortedHighScore.map((score, idx) => (
        <tr key={idx}>
          <td>{score.score}</td>
          <td>{score.userName}</td>
          <td>{score.duration}</td>
          <td>{score.errors}</td>
        </tr>
      ))}
    </tbody>
  );

  const Container = ({ children }: any) => (
    <div className="board__content-item board__content-leaderboard">
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
        <div
          /* ref={draggableArea}
          onMouseDown={startDragging}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={dragging}*/
          className="score_container"
        >
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
