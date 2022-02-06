const mongoose = require("mongoose");
const { User } = require("./User");
const schema = mongoose.Schema;

const videoSchema = mongoose.Schema(
  {
    writer: {
      type: schema.Types.ObjectId,
      ref: User,
    },
    title: {
      type: String,
      maxLength: 50,
    },
    description: {
      type: String,
    },
    privacy: {
      type: Number,
    },
    filePath: {
      type: String,
    },
    category: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);



const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
