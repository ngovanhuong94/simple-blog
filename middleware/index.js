const Post = require('../models/Post')
const Comment = require('../models/Comment')

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        req.flash('error', 'You must be logged')
        res.redirect('/login')
    }
}

// check ownership
exports.isOwnerPost = async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            // find post by id
            const post = await Post.findById(req.params.id)

            if (!post) {
                // if not found the post
                req.flash('error', 'Post not found')
                return res.redirect('back')
            } else {
                // check ownership
                if (post.userId.equals(req.user._id)) {
                    // same ids
                    next()
                } else {
                    // not same ids
                    req.flash('error', "You don't have permission")
                    return res.redirect('back')
                }
            }
        } catch (err) {
            req.flash('error', 'Something went wrong')
            return res.redirect('back')
        }
    } else {
        req.flash('error', 'You must be logged in')
        res.redirect('back')
    }
}

exports.checkOwnershipComment = async (req, res, next) => {
    if (req.isAuthenticated()) {
        try {
            // find post and comment
            const post = await Post.findById(req.params.id)
            const comment = await Comment.findById(req.params.commentId)
            // not found comment or post
            if (!comment || !post) {
                req.flash('error', 'Something went wrong')
                return res.redirect('back')
            }
            // check ownership of comment
            if (comment.author.id.equals(req.user._id)) {
                next()
            } else {
                // dont have permisson
                req.flash('error', "You don't have permission")
                return res.redirect('back')
            }
        } catch (err) {
            console.log(err)
            return res.redirect('back')
        }
    } else {
        req.flash('error', 'You must be logged in')
        return res.redirect('back')
    }
}