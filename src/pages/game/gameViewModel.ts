import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserHighScore } from "../../services";
import {
  requestIncreaseCorrectAction,
  requestIncreaseErrorsAction,
  requestIncreaseGuessesAction,
  requestSetSelectedLetter,
  requestResetGameAction,
  requestStopTimer,
  requestAddNotification,
  requestSetButtonId,
  selectSystemState,
} from "../../state-mgmt";
import { ErrorBoundary } from "../../components";
import { gameDetails, handleSelectLetterProps } from "./types";

export const GameViewModel = () => {
  let navigate = useNavigate();
  const system = useSelector(selectSystemState);
  const dispatch = useDispatch();

  const handleSelectLetter = ({
    letter,
    word,
    selectedLetters,
  }: handleSelectLetterProps) => {
    dispatch(requestSetSelectedLetter(letter));
    dispatch(requestIncreaseGuessesAction());

    const { uniqueCharacters } = system.quote;

    /* Check if the quote is completed */
    let matchWholeWord: boolean = true;
    let allSelectedLetters: string[] = [...selectedLetters, letter];

    uniqueCharacters.split("").forEach((letter) => {
      if (allSelectedLetters.indexOf(letter.toUpperCase()) === -1) {
        matchWholeWord = false;
      }
    });

    if (matchWholeWord) {
      dispatch(requestStopTimer());
      dispatch(requestAddNotification({ title: "Game Complete!" }));

      const gameDetails: gameDetails = {
        quoteId: system.quote._id,
        length: system.quote.length,
        uniqueCharacters: system.quote.uniqueCharacters,
        userName: system.userName,
        errors: system.errors,
        duration: system.timer.duration,
      };

      setUserHighScore(dispatch, gameDetails);
      return;
    }

    /* If the letter is inside the quote */
    if (word.indexOf(letter.toLowerCase()) === -1) {
      dispatch(requestIncreaseErrorsAction());
      dispatch(requestAddNotification({ title: `${letter} not found!` }));
      /* If the letter isn't inside the quote */
    } else if (word.indexOf(letter.toLowerCase()) !== -1) {
      dispatch(requestIncreaseCorrectAction());
    }
  };

  useEffect(() => {
    dispatch(requestSetButtonId(1));
  }, [dispatch]);

  return {
    system,
    handleSelectLetter,
    ErrorBoundary,
    requestResetGameAction,
    dispatch,
    navigate,
  };
};
