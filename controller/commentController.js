const Comment = require('../model/comment')

const addComment = async(req,res)=>{
    try {
    const {text,author,videoId} = req.body;
    const comment = new Comment({text,author,videoId});
    await comment.save();
    res.status(201).json({comment,message:"new comment added"})
    }
    catch (error) {
        res.status(400).json({message:error.message})
        }
}

const getComment = async(req,res)=>{
    try {
        console.log('req',req.params)
        const {videoId} = req.params
        const comments = await Comment.find({videoId}).sort({createdAt:-1})
        res.status(200).json({comments})
        }
        catch (error) {
            res.status(400).json({message:error.message})
            }
}

module.exports = { addComment,getComment}
