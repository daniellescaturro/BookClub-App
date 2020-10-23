const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')

//add authentication function later if using users and sessions

//new route
router.get('/new', (req, res) => {
	res.render('books/new.ejs', {
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
            books: allBooks
				})
    })
})

//show route
router.get('/:id', (req, res) => {
	Book.findById(req.params.id, (error, foundBook) => {
		res.render('books/show.ejs', {
			book: foundBook
		})
	})
})

//edit route
router.get('/:id/edit', (req, res) => {
  Book.findById(req.params.id, (error, foundBook) => {
    res.render('books/edit.ejs', {
      book: foundBook
		})
  })
})

//update route
router.put('/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
		console.log(updatedModel)
		res.redirect('/bookclub')
  })
})

//destroy route
router.delete('/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/bookclub')
  })
})

module.exports = router
