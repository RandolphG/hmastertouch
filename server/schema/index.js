const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        userName: String!
        password: String
        createdAt: String!
    }
    
    input UserInput {
        userName: String!
        password: String!
    }
    
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
    
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type Query {
        users:[User!]!
        highScores:[HighScore!]!
    }

    type Mutation {
        createUser(input:UserInput): User
        postScore(input:HighScoreInput): HighScore
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);
