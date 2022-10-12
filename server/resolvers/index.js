const User = require("../models/users");
const HighScore = require("../models/highScores");

module.exports = {
  postScore: async (score) => {
    try {
      const localScore = score;
      const userNameNotFound = await HighScore.findOne({
        userName: localScore.input.userName,
      }).then((score) => {
        if (score === null) {
          return true;
        }

        console.log(`\nscore.score: -->`, score.score);
        console.log(`\nuserName.input.userName -->`, localScore.input.userName);

        const { score: userScore } = score;

        const isHighScore = ()=> userScore < localScore.input.score

        if (isHighScore()) {
          score.score = localScore.input.score;
          score.save().then(() => console.log("Inserted"));
          return false;
        }
        throw new Error("Score is not high.");
      });

      console.log(`\nuserNameNotFound: -->`, userNameNotFound);

      if (userNameNotFound) {
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
      }
    } catch (error) {
      console.err(error);
      throw error;
    }
  },
  highScores: async () => {
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
      console.error(error)
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
        console.error(err);
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
