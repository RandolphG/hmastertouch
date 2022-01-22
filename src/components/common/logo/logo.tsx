import React, { Fragment } from "react";
import "./styles/_logoStyles.scss";

/**
 * Logo
 */
const Logo = () => {
  const Graphic = () => (
    <Fragment>
      <div className="glitch" data-text="HangMan">
        HangMan
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="glitchContainer">
        <Graphic />
      </div>
      <div className="scanlines" />
    </Fragment>
  );
};

export default Logo;
