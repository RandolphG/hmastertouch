import React, { Fragment, useEffect, useState } from "react";
import "./styles/_countdownTimerStyles.scss";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

/**
 * Countdown Timer
 */
const CountdownTimer = () => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    let interval = setTimeout(() => {
      setHidden(false);
      console.log("Hidden!!");
    }, 5000);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  const motionSettings = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return createPortal(
    <Fragment>
      {hidden && (
        <motion.div
          {...motionSettings}
          transition={{ duration: 1.0 }}
          className="app__screen countdown"
          hidden={hidden}
        >
          <div className="countdown__container">
            <div className="countdown__timer countdown-timer">
              <div className="countdown-timer__rotator">
                {[5, 4, 3, 2, 1, 0].map((number, idx) => (
                  <div key={idx} className="countdown-timer__item">
                    {number}
                  </div>
                ))}
              </div>
            </div>
            <svg className="countdown__indicator" viewBox="0 0 576 576">
              <circle className="countdown__circle countdown__indicator-placeholder" />
              <circle className="countdown__circle countdown__indicator-loader" />
            </svg>
          </div>
        </motion.div>
      )}
    </Fragment>,
    document.getElementById("countdownTimer")!
  );
};

export default CountdownTimer;
