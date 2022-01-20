import { useSelector } from "react-redux";
import { selectSystemState } from "../../../../state-mgmt";

export const LettersViewModel = () => {
  const {
    selectedLetters,
    alphabet,
    showModal,
    api: { quote },
  } = useSelector(selectSystemState);
  return {
    selectedLetters,
    alphabet,
    showModal,
    quote,
  };
};
