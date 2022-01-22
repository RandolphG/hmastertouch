import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { requestSetButtonId } from "../../state-mgmt";
import { motion } from "framer-motion";
import "./styles/_homeStyles.scss";

/**
 * Message
 */
const Message = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestSetButtonId(1));
  }, [dispatch]);

  return <motion.div className="mainMessage" />;
};

export default Message;
