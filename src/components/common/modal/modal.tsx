import { motion } from "framer-motion";
import React, { ReactChild, ReactFragment, ReactPortal } from "react";
import { createPortal } from "react-dom";
import { TextEffect } from "./components";
import { ModalViewModal } from "./modalViewModal";
import "./styles/_modalStyles.scss";

type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

/**
 * Modal for results
 */
const Modal = () => {
  const { score, motionSettings, results } = ModalViewModal();
  console.log(`type of score`, typeof score);

  /* element container */
  const Container = ({ children }: any) => (
    <div className="results">
      <div className="results_container">{children}</div>
    </div>
  );

  /* container for game score details */
  const ElementContainer = ({ children }: any) => (
    <div className="results_container_elementContainer">{children}</div>
  );

  /* modal title */
  const Title = () => (
    <div className="results_container_modalTitle">Game Results</div>
  );

  /* calculated game score */
  const Score = () => (
    <div className="results_container_elementContainer_score">
      <TextEffect score={score} />
    </div>
  );

  /* statistic game details */
  const Details = () => (
    <div className="results_container_elementContainer_details">
      <div className="results_container_elementContainer_details_container">
        {results.map(({ info, value }, idx) => (
          <motion.div
            key={`${info}-${idx}`}
            {...motionSettings}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
          >
            {info} : {value}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const Button = () => (
    <button className="results_container_modalButton">Accept</button>
  );

  return createPortal(
    <Container>
      <Title />
      <ElementContainer>
        <Score />
        <Details />
      </ElementContainer>
      <Button />
    </Container>,
    document.getElementById("modal")!
  );
};

export default Modal;
