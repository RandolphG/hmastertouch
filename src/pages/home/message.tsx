import React, { useEffect } from "react";
import "./styles/_homeStyles.scss";
import { useDispatch } from "react-redux";
import { MessageText } from "../../components/common/logo/messageText";
import { requestSetButtonId } from "../../state-mgmt";

/**
 * Message
 */
const Message = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestSetButtonId(1));
  }, [dispatch]);

  return (
    <div className="message">
      <MessageText />
    </div>
  );
};

export default Message;
