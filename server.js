const express = require('express')
const mongoose = require('mongoose')
//const Book = require('./models/books.js')
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()

const app = express()

//env variables
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

// Middleware to help with form submission
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'))

app.use(express.static('public'))

//add later app.use for sessions

// Mongoose connection code
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => {
  console.log('The connection with mongod is established')
})

// controllers
const booksController = require('./controllers/books.js')
app.use('/bookclub', booksController)

//add later controllers for users and sessions

//add get route for home page  later, if needed

app.listen(PORT, ()=> {
	console.log("Listening at port", PORT)
})
