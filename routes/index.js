const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

const passport = require('passport')


// show the home page
router.get('/', async (req, res) => {
	// find all posts
	const posts = await Post.find().sort({ created: -1 }).exec()
	res.render('index', { posts: posts })
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
			return res.render('register', { error: 'Username was used'})
		} else {
			const newUser = new User({
				username,
				password
			})
	
			await newUser.save()
			req.flash('success', 'Please login with your account!')
			return res.redirect('/login')
		}
	} catch (err) {
		return res.render('register', { error: 'Something went wrong'})
	}
})


router.get('/login', (req, res) => {
	res.render('login')
})

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true 
}))

router.get('/logout', (req, res) => {
	req.logout()
	req.flash('success', 'Logged out!')
	res.redirect('/')
})

// export router
module.exports = router 