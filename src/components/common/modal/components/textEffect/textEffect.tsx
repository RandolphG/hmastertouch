import React, { Fragment, useEffect } from "react";
import "./styles/_textEffectStyles.scss";
import { RandomCharacterAnimation } from "./randomCharacterAnimation";

/**
 * TextEffect
 */
const TextEffect = ({ score }: { score: number }) => {
  let title = new RandomCharacterAnimation({
    d_element: ".random",
    d_kerning: 8000,
  });
  useEffect(() => {
    title.start();
  }, []);

  return (
    <Fragment>
      <div className="content">
        <h1 className="random">{score}</h1>
      </div>
    </Fragment>
  );
};

export default TextEffect;
