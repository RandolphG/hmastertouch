import axios from "axios";
import { gameDetails } from "../../pages";
import {
  requestAddNotification,
  requestSetHighScores,
  requestSetQuoteAction,
  requestStartTimer,
} from "../../state-mgmt/";
import { findUniqueLettersInString } from "../../util";
import { data } from "./types";

const url = process.env.REACT_APP_GET_URL;
const postUrl = process.env.REACT_APP_POST_URL;

/* fetch quote info */
export const fetchQuote = (dispatch: any) => {
  dispatch(requestStartTimer(undefined));

  axios
    .get(url!)
    .then((response) => {
      const data: data = response.data;
      const { author, content: quote, length, tags, _id } = data;

      const uniqueCharacters = findUniqueLettersInString(quote);
      const uniqueCharactersLength = findUniqueLettersInString(quote).length;

      dispatch(
        requestSetQuoteAction({
          author,
          quote,
          uniqueCharacters,
          uniqueCharactersLength,
          length,
          tags,
          _id,
        })
      );
    })
    .catch((error) => {
      dispatch(
        requestAddNotification({ title: "Error with the words API request" })
      );

      console.log("Error with the words API request:", error);
    });
};

/* set highScore info */
export const setUserHighScore = (dispatch: any, gameDetails: gameDetails) => {
  const config = { headers: { "Content-Type": "application/json" } };

  axios
    .post(postUrl!, gameDetails, config)
    .then(() => {
      dispatch(requestAddNotification({ title: "Score Posted" }));
    })
    .catch((error) => {
      dispatch(requestAddNotification({ title: "Error with posting score" }));
      console.log("Error :", error);
    });
};

/* get highScore info*/
export const getHighScores = (dispatch: any) => {
  axios
    .get(postUrl!)
    .then((response) => {
      const { data } = response;

      dispatch(requestSetHighScores(data));
    })
    .catch((error) => {
      dispatch(requestAddNotification({ title: "Error with getting scores" }));
      console.log("Error :", error);
    });
};
