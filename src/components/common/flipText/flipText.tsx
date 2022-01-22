import React, { Fragment, useEffect, useLayoutEffect } from "react";
import "./styles/_flipTextStyles.scss";

const FlipText = ({ showLetter, letter }: any) => {
  useLayoutEffect(() => {}, [showLetter, letter]);

  return (
    <Fragment>
      <div className="departure-board">
        {showLetter ? (
          <span className={`flipLetter flipLetter-${letter}`} />
        ) : (
          <span className="flipLetter flipLetter-blank" />
        )}
      </div>
    </Fragment>
  );
};

export default FlipText;
