const router = require('express').Router()
const User = require('../models/User')


// show the home page
router.get('/', (req, res) => {
	res.render('index')
})

// show the register page
router.get('/register', (req, res) => {
	res.render('register')
})


router.post('/register', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username })
	try {
		if (user) {
			req.flash('error', 'Username was used')
			return res.render('register')
		} else {
			const newUser = new User({
				username,
				password
			})
	
			await newUser.save()
			req.flash('success', 'Please login with your account!')
			return res.redirect('/')
		}
	} catch (err) {
		req.flash('error', 'Something went wrong')
		return res.render('register')
	}
})

// export router
module.exports = router 