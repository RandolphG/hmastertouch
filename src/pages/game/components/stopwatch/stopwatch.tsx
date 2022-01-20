import React from "react";
import { useTimer } from "./hooks";
import "./styles/_stopwatchStyles.scss";

/**
 * Stopwatch
 */
const Stopwatch = () => {
  const {
    time: { SS, MM, HH },
  } = useTimer();

  return (
    <div className="stopwatch-time">
      <div className="stopwatch-time_container">
        <div className="hrs">{HH} :</div>
        <div className="mins">{MM} : </div>
        <div className="secs">{SS}</div>
      </div>
    </div>
  );
};

export default Stopwatch;
