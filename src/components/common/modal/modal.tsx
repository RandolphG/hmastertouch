import React, { memo } from "react";
import { motion } from "framer-motion";
import { ModalViewModal } from "./modalViewModal";
import "./styles/_modalStyles.scss";

/**
 * Modal for results
 */
const Modal = memo(() => {
  const {
    score,
    motionSettings,
    results,
    quote,
    addToFavorites,
    nextQuote,
    author,
  } = ModalViewModal();

  /* element container */
  const Container = ({ children }: any) => (
    <div className="results">
      <div className="results_container">{children}</div>
    </div>
  );

  const Header = () => (
    <div className="results_container_header">
      <Title />
      <button
        className="results_container_header_favoriteButton"
        onClick={() => {
          addToFavorites(quote);
        }}
      >
        Bookmark
      </button>
    </div>
  );

  /* container for game score details */
  const ElementContainer = ({ children }: any) => (
    <div className="results_container_elementContainer">{children}</div>
  );

  /* modal title */
  const Title = () => (
    <div className="results_container_header_modalTitle">Results</div>
  );

  /* calculated game score */
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
    <button className="results_container_modalButton" onClick={nextQuote}>
      Accept
    </button>
  );

  const Quote = () => (
    <div className="results_container_modalQuote">{quote}</div>
  );

  return (
    <Container>
      <Header />
      <Quote />
      <div className="results_container_modalAuthor">{author}</div>
      <ElementContainer>
        <Score />
        <Details />
      </ElementContainer>
      <Button />
    </Container>
  );
});

export default Modal;
