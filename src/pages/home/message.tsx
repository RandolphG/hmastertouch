import React, { useEffect } from "react";
import "./styles/_homeStyles.scss";
import { useDispatch } from "react-redux";
import { requestSetButtonId } from "../../state-mgmt";

/**
 * Message
 */
const Message = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestSetButtonId(1));
  }, [dispatch]);

  return <div className="message">hanging with all the wise men...</div>;
};

export default Message;
