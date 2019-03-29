// modules
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')

// routes
const indexRoutes = require('./routes/index')
const postRoutes = require('./routes/post')

// setup the environment
dotenv.config()

// connect database
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
.then(() => console.log('Mongodb connected')) 

// create app
const app = express()

// configuration ejs
app.set('view engine', 'ejs')

// setup public folder
app.use(express.static('public'))
// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false 
}))
app.use(flash())

// setup passport
require('./config/passport')(app)

// custom middeware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})


// setup routes
app.use('/', indexRoutes)
app.use('/post', postRoutes)

const PORT = process.env.PORT || 5000

// run server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))