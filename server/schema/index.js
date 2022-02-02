const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        userName: String!
        password: String
        createdAt: String!
    }
    
    type HighScore {
        _id: ID!
        userName: String!
        id: String!
        score: Int!
        quoteId: String!
        length: Int!
        uniqueCharacters: String!
        error: String!
        duration: Int!
    }
        
    input UserInput {
        userName: String!
        password: String!
    }
    
    type HighScoreInput {
        userName: String!
        id: String!
        score: Int!
        quoteId: String!
        length: Int!
        uniqueCharacters: String!
        error: String!
        duration: Int!
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
        createUser(userInput:UserInput): User
        postHighScore(highScoreInput:HighScoreInput): HighScore
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);
