const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
    },
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
