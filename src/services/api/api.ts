import axios from "axios";
import { gameDetails } from "../../pages";
import {
  requestAddNotification,
  requestSetHighScores,
  requestSetQuoteAction,
} from "../../state-mgmt/";
import { calculateScore, findUniqueLettersInString } from "../../util";
import { data } from "./types";

const url = process.env.REACT_APP_GET_URL;
const postUrl = process.env.REACT_APP_POST_URL;
const quotesUrl = process.env.REACT_APP_GET_QUOTES;

/* fetch quote info */
export const fetchQuote = (dispatch: any) => {
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

      const premiumScore = data.map((obj: any) => {
        return {
          ...obj,
          score: calculateScore(
            obj.length,
            obj.uniqueCharacters,
            obj.errors,
            obj.duration
          ),
        };
      });

      /*      const premium = premiumScore.map((obj: any) => {
        const result = getQuotes(dispatch, obj.quoteId);
        console.log(`QUOTE_ID -->`, result);
        // }
        /!*return {
          ...obj,
          quote: ,
        };*!/
      });

      console.log(`premium -->`, premium);*/

      const sortedPremiumScore = premiumScore.sort((a: any, b: any) => {
        return b.score - a.score;
      });

      dispatch(requestSetHighScores(sortedPremiumScore));
    })
    .catch((error) => {
      dispatch(requestAddNotification({ title: "Error with getting scores" }));
      console.log("Error :", error);
    });
};

/* get quotes */
export const getQuotes = async (dispatch: any, quoteId: string) => {
  await axios
    .get(`${quotesUrl}${quoteId}`)
    .then(async (response) => {
      let results: string[];

      await response.data.results.map(async (items: any) => {
        if (items._id === quoteId) {
          console.log(`CONTENT -->`, items.content);
          // results.push(items.content);
        }
      });
    })

    .catch((error) => {
      dispatch(requestAddNotification({ title: "Error with getting scores" }));
      console.log("Error :", error);
    });
};
