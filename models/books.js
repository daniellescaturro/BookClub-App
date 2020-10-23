const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  cover: {
    type: String,
    required: true
  },
  title: String,
  author: String,
  dateRead: Date,
  rating: {type: Number, max: 5},
  synopsis: String,
  comments: String
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
