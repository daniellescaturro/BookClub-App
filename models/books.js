const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  rating: {type: Number, min: 0, max: 5},
  comments: String,
  date: {type: Date, default: Date.now},
  userid: String
})

const bookSchema = new mongoose.Schema({
  cover: {
    type: String,
    required: true
  },
  title: String,
  author: String,
  synopsis: String,
  rating: {type: Number, max: 5},
  comments: [commentSchema]
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
