const router = require('express').Router()
const Comment = require('../models/Comment')
const Post = require('../models/Post')

const { isLoggedIn } = require('../middleware')

router.post('/', isLoggedIn, async (req, res) => {
    // get data from comment form
    const { text } = req.body
    try {
        console.log(req.params.id)
        // find post by id
        const post = await Post.findById(req.params.id)
        console.log(post)
        // create new mongoose collection
        const comment = new Comment({
            text,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        })
        await comment.save()
        // add comment to post
        post.comments.push(comment)
        // save post after add comment
        await post.save()
        // redirect user after created comment
        return res.redirect('back')
    } catch (err) {
        console.log(err)
        return res.redirect('back')
    }
})

module.exports = router 