const router = require('express').Router()


// show the home page
router.get('/', (req, res) => {
	res.render('index')
})

// show the register page
router.get('/register', (req, res) => {
	res.render('register')
})


// export router
module.exports = router 