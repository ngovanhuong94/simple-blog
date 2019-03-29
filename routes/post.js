const router = require('express').Router()
const { isLoggedIn } = require('../middleware')
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

module.exports = router 