import { motion } from "framer-motion";
import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { ModalViewModal } from "./modalViewModal";
import "./styles/_modalStyles.scss";

/**
 * Modal for results
 */
const Modal = () => {
  const { showModal, toggleModal, motionSettings, results } = ModalViewModal();

  return createPortal(
    <Fragment>
      {showModal && (
        <div className="results">
          <div className="results_container">
            <div className="results_container_modalTitle">Game Results</div>
            <div className="results_container_details">
              {results.map(({ info, value }, idx) => (
                <motion.div
                  key={`${info}-${idx}`}
                  {...motionSettings}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="details"
                >
                  {info} : {value}
                </motion.div>
              ))}
            </div>
            <button
              className="results_container_modalButton"
              onClick={toggleModal}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </Fragment>,
    document.getElementById("modal")!
  );
};

export default Modal;
