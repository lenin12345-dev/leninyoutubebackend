const express = require("express")
const router = express.Router()
const {addComment,getComment} = require("../controller/commentController")

router.post('/comment',addComment);
router.get('/comments/:videoId',getComment);
module.exports = router;  //export the router to use in other files