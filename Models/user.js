const mongoose = require("mongoose");
// const { Profiler } = require("react");
mongoose.connect("mongodb://127.0.0.1:27017/MiniProject1");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  ProfilePic: {
    type: String,
    default: "default.jpg",
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
