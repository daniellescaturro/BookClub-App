const express = require('express')
const router = express.Router()
const Comment = require('../models/comments.js')

const isAuthenticated = (req, res, next) =>  {
	if (req.session.currentUser) {
		return next()
	} else {
		res.redirect('/sessions/new')
	}
}

//new route
router.get('/new', (req, res) => {
	res.render('comments/new.ejs', {
		currentUser: req.session.currentUser
	})
})

//create route
router.post('/', (req, res) => {
	Comment.create(req.body, (error, createdComment) => {
		if (error) console.log(error.message)
		else {
			console.log('added comment data', createdComment)
		res.redirect('/bookclub')
		}
	})
})

// //show route
// router.get('/:id', isAuthenticated, (req, res) => {
// 	Comment.findById(req.params.id, (error, foundComment) => {
// 		res.render('bookclub/show.ejs', {
// 			comment: foundComment,
// 			currentUser: req.session.currentUser
// 		})
// 	})
// })

// //edit route
// router.get('/:id/edit', (req, res) => {
//   Comment.findById(req.params.id, (error, foundComment) => {
//     res.render('comments/edit.ejs', {
//       comment: foundComment,
// 			currentUser: req.session.currentUser
// 		})
//   })
// })
//
// //update route
// router.put('/:id', isAuthenticated, (req, res) => {
//   Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
// 		console.log(updatedModel)
// 		res.redirect('/comments'+req.params.id)
//   })
// })
//
// //destroy route
// router.delete('/:id', isAuthenticated, (req, res) => {
//   Comment.findByIdAndRemove(req.params.id, (error, data) => {
//     res.redirect('/bookclub')
//   })
// })

module.exports = router
