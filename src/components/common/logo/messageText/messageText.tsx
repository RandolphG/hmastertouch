import React from "react";
import { MessageTextViewModel } from "./messagetextViewModel";
import "./styles/_messageTextStyles.scss";

/**
 * MessageText
 */
const MessageText = () => {
  const { messages, wordRef } = MessageTextViewModel();
  return (
    <div className="text">
      <p className="message">Hanging with&#160;</p>
      <p className="message">
        {messages.map((message, idx) => (
          <span
            ref={wordRef}
            key={`word-${idx}`}
            className={`word ${message.style}`}
          >
            {message.text}
          </span>
        ))}
      </p>
    </div>
  );
};

export default MessageText;
