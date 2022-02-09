const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type HighScore {
        _id: ID!
        userName: String!
        id: String!
        score: String!
        quoteId: String!
        length: String!
        uniqueCharacters: String!
        mistakes: String!
        duration: String!
        createdAt: String!
    }
        
    input HighScoreInput {
        userName: String!
        id: String!
        score: String!
        quoteId: String!
        length: String!
        uniqueCharacters: String!
        mistakes: String!
        duration: String!
    }

    type Query {
        highScores:[HighScore!]!
    }

    type Mutation {
        postScore(input:HighScoreInput): HighScore
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);
