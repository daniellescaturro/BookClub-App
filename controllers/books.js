const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')

const isAuthenticated = (req, res, next) =>  {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}

//new route
router.get('/new', (req, res) => {
	res.render('books/new.ejs', {
		currentUser: req.session.currentUser
	})
})

//create route
router.post('/', (req, res) => {
	Book.create(req.body, (error, createdBook) => {
		if (error) console.log(error.message)
		else {
			console.log('added provided book data', createdBook)
		res.redirect('/bookclub')
		}
	})
})

//index route
router.get('/', (req, res) => {
    Book.find({}, (error, allBooks) => {
        res.render('books/index.ejs', {
            books: allBooks,
						currentUser: req.session.currentUser
				})
    })
})

//show route
router.get('/:id', isAuthenticated, (req, res) => {
	Book.findById(req.params.id, (error, foundBook) => {
		res.render('books/show.ejs', {
			book: foundBook,
			currentUser: req.session.currentUser
		})
	})
})

//edit route
router.get('/:id/edit', (req, res) => {
  Book.findById(req.params.id, (error, foundBook) => {
    res.render('books/edit.ejs', {
      book: foundBook,
			currentUser: req.session.currentUser
		})
  })
})

//update route
router.put('/:id', isAuthenticated, (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
		console.log(updatedModel)
		res.redirect('/bookclub/'+req.params.id)
  })
})

//destroy route
router.delete('/:id', isAuthenticated, (req, res) => {
  Book.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/bookclub')
  })
})

module.exports = router
