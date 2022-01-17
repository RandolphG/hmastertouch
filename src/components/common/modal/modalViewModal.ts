import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestShowModalAction, selectSystemState } from "../../../state-mgmt";
import { results } from "./types";

export const ModalViewModal = () => {
  const {
    guesses,
    errors,
    timer: { duration },
    showModal,
  } = useSelector(selectSystemState);
  const [showResults, setShowResults] = useState<boolean>(true);
  const dispatch = useDispatch();

  const motionSettings = {
    initial: { opacity: 0, translateX: -25 },
    animate: { opacity: 1, translateX: 0 },
  };

  const results: results = [
    { info: "Score", value: 1999 },
    { info: "Time", value: duration },
    { info: "Errors", value: errors },
    { info: "Guesses", value: guesses },
  ];

  function toggleModal() {
    console.log(`CLICKED!`);
    dispatch(requestShowModalAction(!showModal));
  }

  return {
    results,
    motionSettings,
    showModal,
    showResults,
    setShowResults,
    toggleModal,
  };
};
