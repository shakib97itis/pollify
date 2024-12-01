const { Schema, model } = require("mongoose");

const pollSchema = new Schema({
  title: {
    type: "string",
    required: true,
    trim: true,
  },
  description: {
    type: "string",
    required: true,
    trim: true,
  },
  totalVotes: {
    type: Number,
    default: 0,
  },
  options: {
    type: [
      {
        name: String,
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
});

const Poll = model("Poll", pollSchema);
module.exports = Poll;
