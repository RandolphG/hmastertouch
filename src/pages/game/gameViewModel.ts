import { useCallback, useEffect } from "react";
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
  requestShowModalAction,
} from "../../state-mgmt";
import { ErrorBoundary } from "../../components";
import { gameDetails, handleSelectLetterProps } from "./types";

export const GameViewModel = () => {
  let navigate = useNavigate();
  const {
    gameState,
    selectedLetters,
    alphabet,
    showModal,
    errors,
    timer: { duration },
    userName,
    quote: { _id, length, uniqueCharacters, author, content },
  } = useSelector(selectSystemState);
  const dispatch = useDispatch();

  const motionSettings = {
    initial: {
      x: 50,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const authorMotionSettings = {
    initial: { x: 25, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { opacity: 1 },
    transition: { duration: 0.3, delay: 0.3 },
  };

  const containerMotionSettings = {
    initial: { scale: 0.75, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { opacity: 1 },
    transition: { duration: 0.3 },
  };

  const handleSelectLetter = useCallback(
    ({ letter, word, selectedLetters }: handleSelectLetterProps) => {
      dispatch(requestSetSelectedLetter(letter));
      dispatch(requestIncreaseGuessesAction(undefined));

      let matchWholeWord: boolean = true;
      let allSelectedLetters: string[] = [...selectedLetters, letter];

      /* compare selected letter against unique letters*/
      uniqueCharacters.split("").forEach((letter) => {
        if (allSelectedLetters.indexOf(letter.toUpperCase()) === -1) {
          matchWholeWord = false;
        }
      });

      /* Check if the quote is completed */
      if (matchWholeWord) {
        dispatch(requestStopTimer(undefined));
        dispatch(requestAddNotification({ title: "Game Complete!" }));

        /* game results to post to server */
        const gameDetails: gameDetails = {
          quoteId: _id,
          length,
          uniqueCharacters,
          userName,
          errors,
          duration,
        };

        setUserHighScore(dispatch, gameDetails);
        dispatch(requestShowModalAction(!showModal));
        return;
      }

      /* If the letter is inside the quote */
      if (word.indexOf(letter.toLowerCase()) === -1) {
        dispatch(requestIncreaseErrorsAction(undefined));
        dispatch(requestAddNotification({ title: `${letter} not found!` }));
        /* If the letter isn't inside the quote */
      } else if (word.indexOf(letter.toLowerCase()) !== -1) {
        dispatch(requestIncreaseCorrectAction(undefined));
      }
    },
    []
  );

  useEffect(() => {
    dispatch(requestSetButtonId(1));
  }, []);

  return {
    gameState,
    handleSelectLetter,
    ErrorBoundary,
    requestResetGameAction,
    dispatch,
    navigate,
    motionSettings,
    alphabet,
    author,
    content,
    selectedLetters,
    authorMotionSettings,
    containerMotionSettings,
  };
};
