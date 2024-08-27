const mongoose = require('mongoose');
const { Schema } = mongoose;
const commentSchema  = new Schema({
    text:{
        type:String,
        required:true
    },
    author:{
        type:String,
        default:"Anonymous"
    },
    videoId: { type: String, required: true }, 
},
{timestamps:true}
) 
module.exports = mongoose.model('Comment',commentSchema)