const express = require('express')
const mongoose = require('mongoose')
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

//sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

// Mongoose connection code
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, () => {
  console.log('The connection with mongod is established')
})

// controllers
const booksController = require('./controllers/books.js')
app.use('/bookclub', booksController)

const commentsController = require('./controllers/comments.js')
app.use('/comments', commentsController)

const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

app.get('/', (req, res) => {
  res.render('home.ejs', { currentUser: req.session.currentUser })
})

app.listen(PORT, ()=> {
	console.log("Listening at port", PORT)
})
