const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const highScoresSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    quoteId: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    uniqueCharacters: {
      type: String,
      required: true,
    },
    errors: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HighScores", highScoresSchema);
