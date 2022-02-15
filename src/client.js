import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `http://localhost:8000/graphql`,
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});

export const HIGH_SCORES = gql`
  {
    highScores {
      userName
      id
      score
      quoteId
      length
      uniqueCharacters
      mistakes
      duration
    }
  }
`;
