// modules
const express = require('express')
const dotenv = require('dotenv')

// setup the environment
dotenv.config()
// create app
const app = express()

// configuration ejs
app.set('view engine', 'ejs')


// index route
app.get('/', (req, res) => {
	res.render('index')
})

const PORT = process.env.PORT || 5000

// run server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))