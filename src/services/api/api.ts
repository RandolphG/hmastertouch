import axios from "axios";
import {
  requestAddNotification,
  requestSetHighScores,
  requestSetQuoteAction,
} from "../../state-mgmt/";
import { calculateScore, findUniqueLettersInString } from "../../util";
import { data, gameDetails } from "../../types";

/* environment variables */
const graphqlUrl: string | undefined = process.env.GRAPHQL_URL;
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

/* post highScore info */
export const postHighScore = async (requestBody: any) => {
  await fetch(graphqlUrl!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed");
      }
      console.log(`response`, response);
      return response.json();
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err[0]);
      return err;
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
      await response.data.results.map(async (items: any) => {
        if (items._id === quoteId) {
          console.log(`CONTENT -->`, items.content);
        }
      });
    })

    .catch((error) => {
      dispatch(requestAddNotification({ title: "Error with getting scores" }));
      console.log("Error :", error);
    });
};
