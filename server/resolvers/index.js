const User = require("../models/users");
const HighScore = require("../models/highScores");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (user) => {
    console.log(`\ncreatUser: -->`);
    try {
      const localUser = user;
      const hashPassword = await User.findOne({
        email: user.userInput.email,
      }).then((user) => {
        if (user) {
          throw new Error("User exists already.");
        }

        const pw = localUser.userInput.password;
        return bcrypt
          .hash(pw, 12)
          .then((hash) => {
            return hash;
          })
          .catch((err) => {
            console.log(`\nerror: `, err);
            throw err;
          });
      });

      const createdUser = await new User({
        userName: user.userInput.userName,
        password: hashPassword,
      });

      const newUser = await createdUser.save();

      return { ...newUser._doc, _id: newUser.id };
    } catch (error) {
      throw error;
    }
  },
  postHighScore: async (score) => {
    console.log(`\npostScore: -->`);

    try {
      const postedScore = await new HighScore({
        userName: score.highScoreInput.userName,
        id: score.highScoreInput.id,
        score: score.highScoreInput.score,
        quoteId: score.highScoreInput.quoteId,
        length: score.highScoreInput.length,
        uniqueCharacters: score.highScoreInput.uniqueCharacters,
        error: score.highScoreInput.error,
        duration: score.highScoreInput.duration,
      });

      const newScore = await postedScore.save();

      return { ...newScore._doc, _id: newScore.id };
    } catch (error) {
      throw error;
    }
  },
  users: async () => {
    return User.find()
      .then((users) => {
        return users.map((user) => {
          return { ...user._doc };
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
};

/* validate */
function checkData(data) {
  if (!data) {
    console.log(`\nError found : `);
    throw Error("missing data");
  }
}
