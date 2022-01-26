// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "../../components";
import { ScoresViewModel } from "./scoresViewModel";
import "./styles/_scoresStyles.scss";

/**
 * Scores
 */
const Scores = () => {
  const { highScores, containerRef } = ScoresViewModel();

  let isDown: boolean = false;
  let startY: number;
  let scrollTop: number;

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
    const pos = {
      /* The current scroll */
      left: containerRef.current.scrollLeft,
      top: containerRef.current.scrollTop,
      /* Get the current mouse position */
      x: e.clientX,
      y: e.clientY,
    };
    console.log(`MOUSE DOWN`);

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    /* How far the mouse has been moved */
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    /* Change the cursor and prevent user from selecting the text */
    containerRef.current.style.cursor = "grabbing";
    containerRef.current.style.userSelect = "none";

    /* Scroll the element */
    containerRef.current.scrollTop = pos.top - dy;
    containerRef.current.scrollLeft = pos.left - dx;
    console.log(`MOUSE MOVE`);
  };

  const mouseUpHandler = function () {
    console.log(`MOUSE UP`);

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);

    containerRef.current.style.cursor = "grab";
    containerRef.current.style.removeProperty("user-select");
  };

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
          initial={{ opacity: 0, translateX: 25 }}
          animate={{ opacity: 1, translateX: 0 }}
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
            onMouseMove={mouseMoveHandler}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
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
