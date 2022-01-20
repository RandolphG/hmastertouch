import { motion } from "framer-motion";
import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { ModalViewModal } from "./modalViewModal";
import "./styles/_modalStyles.scss";

/**
 * Modal for results
 */
const Modal = () => {
  const { showModal, score, toggleModal, gameState, motionSettings, results } =
    ModalViewModal();

  /* element container */
  const Container = ({ children }: any) => (
    <div className="results">
      <div className="results_container">{children}</div>
    </div>
  );

  /*container for game score details*/
  const ElementContainer = ({ children }: any) => (
    <div className="results_container_elementContainer">{children}</div>
  );

  /* modal title */
  const Title = () => (
    <div className="results_container_modalTitle">Game Results</div>
  );

  /* calculated game score*/
  const Score = () => (
    <div className="results_container_elementContainer_score">{score}</div>
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
    <button className="results_container_modalButton" onClick={toggleModal}>
      Accept
    </button>
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
