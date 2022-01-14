import React, { FC } from "react";
import { images } from "../../../resources";
import "./styles/_buttonStyles.scss";

/**
 * Button
 */
const Button: FC = (button: any) => (
  <div className="Button">
    <figure>
      <img src={images.texture} alt="img18" />
      <figcaption>
        <span>{button.text}</span>
      </figcaption>
    </figure>
  </div>
);

export default Button;
