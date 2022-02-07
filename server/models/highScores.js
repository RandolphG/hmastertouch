const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const highScoreSchema = new Schema(
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
    mistakes: {
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

module.exports = mongoose.model("HighScore", highScoreSchema);
