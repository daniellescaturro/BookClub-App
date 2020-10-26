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

//index book route
router.get('/', (req, res) => {
    Book.find({}, (error, allBooks) => {
        res.render('books/index.ejs', {
            books: allBooks,
						currentUser: req.session.currentUser
				})
    })
})

//create book route
router.post('/', (req, res) => {
	Book.create(req.body, (error, createdBook) => {
		if (error) console.log(error.message)
		else {
			console.log('added provided book data', createdBook)
		res.redirect('/bookclub')
		}
	})
})

//new book route
router.get('/new', (req, res) => {
	res.render('books/new.ejs', {
		currentUser: req.session.currentUser
	})
})

//edit comments route
router.get('/:id/comments/:index/edit', (req, res) => {
console.log(req.params.id)
console.log("hello")
	Book.findById(req.params.id, (error, foundBook) => {
		let comment = foundBook.comments[req.params.index]
		comment.userid = req.session.currentUser.id
		res.render('comments/edit.ejs', {
		// foundBook.comments.push(comment)
		// foundBook.save(()=>{
		// 	res.render('comments/edit.ejs', {
    //   book: foundBook,
			currentUser: req.session.currentUser,
			comment,
			bookid:req.params.id,
			commentIndex:req.params.index
			})
  	})
	})


	//update comments route
	router.put('/:id/comments/:index/edit', (req, res) => {
		Book.findById(req.params.id, (error, foundBook) => {
			foundBook.comments[req.params.index].rating = req.body.rating
			foundBook.comments[req.params.index].comments = req.body.comments

			foundBook.save(function(){
				res.redirect('/bookclub/'+req.params.id)
				})
	  	})
		})

//new comment route
router.get('/:id/comments/new', (req, res) => {
  Book.findById(req.params.id, (error, foundBook) => {
    res.render('comments/new.ejs', {
      book: foundBook,
			currentUser: req.session.currentUser
		})
  })
})


//create comment route
router.post('/:id/comments', (req, res) => {
  Book.findById(req.params.id, (error, foundBook) => {
			let comment = req.body
			comment.userid = req.session.currentUser.id
			foundBook.comments.push(comment)
			foundBook.save(() => {
				res.redirect(`/bookclub/${req.params.id}`)
		})
  })
})


//show book route
router.get('/:id', isAuthenticated, (req, res) => {
	Book.findById(req.params.id, (error, foundBook) => {
		let total = 0;
		foundBook.comments.forEach(comment => {
			total += comment.rating
		})
		console.log(foundBook)
		const avgRating = Math.round(total/foundBook.comments.length);

		res.render('books/show.ejs', {
			book: foundBook,
			avgRating: avgRating,
			currentUser: req.session.currentUser
		})
	})
})


//edit book route
router.get('/:id/edit', (req, res) => {
	Book.findById(req.params.id, (error, foundBook) => {
    res.render('books/edit.ejs', {
			book: foundBook,
			currentUser: req.session.currentUser
		})
  })
})


//update book route
router.put('/:id', isAuthenticated, (req, res) => {
	// console.log(req.params.id)
	// console.log(req.body)
 let book = req.body
 book.comments = [];
  Book.findByIdAndUpdate(req.params.id, { cover: req.body.cover, title: req.body.title, author: req.body.author, synopsis: req.body.synopsis }, {new: true}, (error, updatedModel) => {
		// console.log(updatedModel)
		// console.log(error)
		res.redirect('/bookclub/'+req.params.id)
  })
})


//destroy comments route
router.delete('/:id/comments/:index', isAuthenticated, (req, res) => {
  Book.findById(req.params.id, (error, book) => {
		book.comments[req.params.index].remove()
		book.save(()=>{
			res.redirect(`/bookclub/${req.params.id}`)
		})

  })
})

//destroy route
router.delete('/:id', isAuthenticated, (req, res) => {
  Book.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/bookclub')
  })
})


//NEED TO ADD A DELETE ROUTE FOR COMMENTS


module.exports = router
