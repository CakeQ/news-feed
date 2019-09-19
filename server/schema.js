const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageLink: { type: String, required: false },
  textContent: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: String, default: 'Anonymous' },
  featured: { type: Boolean, defualt: false },
  tags: [String],
  comments: [Object]
})

let Post = mongoose.model("Post", postSchema)
module.exports = {
  Post : Post
}
