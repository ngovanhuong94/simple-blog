const router = require('express').Router()
const { isLoggedIn, isOwnerPost } = require('../middleware')
const Post = require('../models/Post')

router.get('/new', isLoggedIn, (req, res) => {
    res.render('newpost')
})

router.post('/new', isLoggedIn, async (req, res) => {
    const { title, image, body } = req.body
    try {
        await (new Post({
            title,
            image,
            body,
            userId: req.user._id
        }).save())

        return res.redirect('/')
    } catch (err) {
        return res.render('newpost', { error: 'Something went wrong'})
    }
})


router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        return res.render('showpost', { post: post })
    } catch (err) {
        return res.redirect('/')
    }
})

router.get('/:id/edit', isOwnerPost,async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        return res.render('editpost', { post: post })
    } catch (err) {
        return res.redirect('/')
    }
})


module.exports = router 