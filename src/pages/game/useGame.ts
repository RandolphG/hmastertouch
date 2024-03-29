import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchQuote } from "../../services";
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
  requestStartTimer,
} from "../../state-mgmt";
import { ErrorBoundary } from "../../components";
import { calculateScore } from "../../util";
import { handleSelectLetterProps, stats } from "../../types";

export const useGame = () => {
  /*TODO Add share button to*/
  let navigate = useNavigate();
  const {
    correct,
    guesses,
    selectedLetters,
    errors,
    timer: { elapsedTime },
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

  const stats:stats = [
    { title: `Correct`, value: correct, style: "userName" },
    { title: `Guesses`, value: guesses, style: "userName" },
    { title: `Errors`, value: errors, style: "errors" },
  ];

  /* If the letter is inside the quote */
  const handleLetterInQuoteCheck = (letter: string) => {
    /* If the letter is inside the quote */
    if (quote.indexOf(letter.toLowerCase()) === -1) {
      dispatch(requestIncreaseErrorsAction(undefined));
      // dispatch(requestAddNotification({ title: `${letter} not found!` }));
      /* If the letter isn't inside the quote */
    } else if (quote.indexOf(letter.toLowerCase()) !== -1) {
      dispatch(requestIncreaseCorrectAction(undefined));
    }
  };

  /* Check if the quote is completed */
  const handleGameComplete = (matchWholeWord: boolean) => {
    /* Check if the quote is completed */
    if (matchWholeWord) {
      dispatch(requestStopTimer(undefined));
      // dispatch(requestAddNotification({ title: "Game Complete!" }));

      const score = calculateScore(
        length,
        uniqueCharactersLength,
        errors,
        elapsedTime
      );

      dispatch(requestSetScore(score));
      dispatch(requestSetGameStateAction("FINISHED"));
    }
  };

  /* game logic */
  const handleSelectLetter = useCallback(
    ({ letter, selectedLetters }: handleSelectLetterProps) => {
      dispatch(requestSetSelectedLetter(letter));
      dispatch(requestIncreaseGuessesAction(undefined));

      let matchWholeWord: boolean = true;
      let allSelectedLetters: string[] = [...selectedLetters, letter];

      handleLetterInQuoteCheck(letter);

      /* compare selected letter against unique letters*/
      uniqueCharacters
        .split("")
        .forEach((letter) => {
          if (allSelectedLetters.indexOf(letter.toUpperCase()) === -1) {
            matchWholeWord = false;
          }
        });

      handleGameComplete(matchWholeWord);
    },
    [uniqueCharacters]
  );

  useEffect(() => {
    dispatch(requestSetButtonId(1));
    dispatch(requestStartTimer(undefined));
  }, [dispatch]);

  return {
    ErrorBoundary,
    requestResetGameAction,
    dispatch,
    newQuote,
    userName,
    stats,
    handleSelectLetter,
    navigate,
    motionSettings,
    author,
    quote,
    selectedLetters,
    authorMotionSettings,
  };
};
