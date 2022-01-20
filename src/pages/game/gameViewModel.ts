import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuote, setUserHighScore } from "../../services";
import {
  selectSystemState,
  requestIncreaseCorrectAction,
  requestIncreaseErrorsAction,
  requestIncreaseGuessesAction,
  requestSetSelectedLetter,
  requestResetGameAction,
  requestStopTimer,
  requestAddNotification,
  requestSetButtonId,
  requestSetGameStateAction,
  requestSetScore,
} from "../../state-mgmt";
import { ErrorBoundary } from "../../components";
import { calculateScore } from "../../util";
import { gameDetails, handleSelectLetterProps } from "./types";

export const GameViewModel = () => {
  let navigate = useNavigate();
  const {
    gameState,
    correct,
    guesses,
    selectedLetters,
    errors,
    timer: { duration, elapsedTime },
    userName,
    api: {
      _id,
      length,
      uniqueCharacters,
      uniqueCharactersLength,
      author,
      quote,
    },
  } = useSelector(selectSystemState);
  const dispatch = useDispatch();

  function newQuote() {
    fetchQuote(dispatch);
    dispatch(requestResetGameAction(""));
    dispatch(requestSetGameStateAction("INITIAL"));
  }

  /* motion settings */
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
    transition: { duration: 0.3, delay: 1.3 },
  };

  const info: any = [
    { title: `User Name`, value: userName, style: "userName" },
    { title: `Correct`, value: correct, style: "userName" },
    { title: `Guesses`, value: guesses, style: "userName" },
    { title: `Errors`, value: errors, style: "errors" },
  ];

  /* game logic */
  const handleSelectLetter = useCallback(
    ({ letter, quote, selectedLetters }: handleSelectLetterProps) => {
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
        // dispatch(requestAddNotification({ title: "Game Complete!" }));

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

        const score = calculateScore(
          length,
          uniqueCharactersLength,
          errors,
          elapsedTime
        );

        dispatch(requestSetScore(score));
        dispatch(requestSetGameStateAction("FINISHED"));

        return;
      }

      /* If the letter is inside the quote */
      if (quote.indexOf(letter.toLowerCase()) === -1) {
        dispatch(requestIncreaseErrorsAction(undefined));
        dispatch(requestAddNotification({ title: `${letter} not found!` }));
        /* If the letter isn't inside the quote */
      } else if (quote.indexOf(letter.toLowerCase()) !== -1) {
        dispatch(requestIncreaseCorrectAction(undefined));
      }
    },
    []
  );

  useEffect(() => {
    dispatch(requestSetButtonId(1));
  }, []);

  return {
    info,
    gameState,
    handleSelectLetter,
    ErrorBoundary,
    requestResetGameAction,
    dispatch,
    navigate,
    motionSettings,
    author,
    quote,
    selectedLetters,
    authorMotionSettings,
    newQuote,
  };
};
