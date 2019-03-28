const router = require('express').Router()
const { isLoggedIn } = require('../middleware')

router.get('/new', isLoggedIn, (req, res) => {
    res.render('newpost')
})

module.exports = router 