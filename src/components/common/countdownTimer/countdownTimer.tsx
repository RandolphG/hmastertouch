import React, { FC } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { CountdownTimerViewModal } from "./countdownTimerViewModal";
import "./styles/_countdownTimerStyles.scss";

/**
 * Countdown Timer
 */
const CountdownTimer: FC = () => {
  const { motionSettings } = CountdownTimerViewModal();

  const Numbers = () => (
    <div className="countdown__timer countdown-timer">
      <div className="countdown-timer__rotator">
        {[5, 4, 3, 2, 1, 0].map((number, idx) => (
          <div key={idx} className="countdown-timer__item">
            {number}
          </div>
        ))}
      </div>
    </div>
  );

  const Spinner = () => (
    <svg className="countdown__indicator" viewBox="0 0 576 576">
      <circle className="countdown__circle countdown__indicator-placeholder" />
      <circle className="countdown__circle countdown__indicator-loader" />
    </svg>
  );

  const Container = ({ children }: any) => (
    <motion.div
      {...motionSettings}
      transition={{ duration: 1.0 }}
      className="app__screen countdown"
    >
      <div className="countdown__container">{children}</div>
    </motion.div>
  );

  return createPortal(
    <Container>
      <Numbers />
      <Spinner />
    </Container>,

    document.getElementById("countdownTimer")!
  );
};

export default CountdownTimer;
