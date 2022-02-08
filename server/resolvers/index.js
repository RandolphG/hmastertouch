const User = require("../models/users");
const HighScore = require("../models/highScores");
const bcrypt = require("bcryptjs");

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
  postScore: async (score) => {
    console.log(`\npostScore func: -->\n`);
    console.log(`\nScore: -->`, score);

    try {
      const postedScore = await new HighScore({
        userName: score.input.userName,
        id: score.input.id,
        score: score.input.score,
        quoteId: score.input.quoteId,
        length: score.input.length,
        uniqueCharacters: score.input.uniqueCharacters,
        mistakes: score.input.mistakes,
        duration: score.input.duration,
      });

      const newScore = await postedScore.save();

      return { ...newScore._doc, _id: newScore.id };
    } catch (error) {
      throw error;
    }
  },
  highScores: async () => {
    console.log(`\nget highScores: -->`);

    try {
      return await HighScore.find()
        .sort({ score: -1 })
        .then((users) => {
          return users.map((user) => {
            return { ...user._doc };
          });
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
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
