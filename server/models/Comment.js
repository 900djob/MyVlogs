const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./User");
const { Video } = require("./Video")

const commentSchema = mongoose.Schema({  
  writer: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: Video
  },
  responseTo: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  content: {
    type: String
  }
},
  { timestamps: true }
);



const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
