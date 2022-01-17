import axios from "axios";
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

export const fetchQuote = (dispatch: any) => {
  dispatch(requestStartTimer(undefined));

  /* fetch quote info */
  axios
    .get(url!)
    .then(function (response) {
      const data: data = response.data;
      const { author, content, length, tags, _id } = data;

      const uniqueCharacters = findUniqueLettersInString(content);
      const uniqueCharactersLength = findUniqueLettersInString(content).length;

      dispatch(
        requestSetQuoteAction({
          author,
          content,
          uniqueCharacters,
          uniqueCharactersLength,
          length,
          tags,
          _id,
        })
      );

      dispatch(requestAddNotification({ title: "Quote loaded !" }));
    })
    .catch(function (error) {
      dispatch(
        requestAddNotification({ title: "Error with the words API request" })
      );

      console.log("Error with the words API request:", error);
    });
};

export const setUserHighScore = (dispatch: any, gameDetails: any) => {
  const config = { headers: { "Content-Type": "application/json" } };

  axios
    .post(postUrl!, gameDetails, config)
    .then(function (response) {
      dispatch(requestAddNotification({ title: "Score Posted" }));
    })
    .catch(function (error) {
      dispatch(requestAddNotification({ title: "Error with posting score" }));

      console.log("Error :", error);
    });
};

export const getHighScores = (dispatch: any) => {
  axios
    .get(postUrl!)
    .then(function (response) {
      console.log(`highScore response`, response);
      const { data } = response;

      dispatch(requestSetHighScores(data));
      dispatch(requestAddNotification({ title: "Success" }));
    })
    .catch(function (error) {
      dispatch(requestAddNotification({ title: "Error with getting scores" }));

      console.log("Error :", error);
    });
};
