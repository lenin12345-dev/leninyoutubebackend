const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},
{timestamp:true}
);

module.exports = mongoose.model("Chat", chatSchema);
