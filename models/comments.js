const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  rating: {type: Number, max: 5},
  comments: String
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment