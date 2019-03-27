// modules
const express = require('express')
const dotenv = require('dotenv')

// routes
const indexRoutes = require('./routes/index')

// setup the environment
dotenv.config()
// create app
const app = express()

// configuration ejs
app.set('view engine', 'ejs')


// setup routes
app.use('/', indexRoutes)

const PORT = process.env.PORT || 5000

// run server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))