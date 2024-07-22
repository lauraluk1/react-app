const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Post schema
const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true }
}, { timestamps: true });

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

