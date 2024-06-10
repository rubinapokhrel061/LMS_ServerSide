const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  bookName: {
    type: String,
    required: true,
    // unique: true,
  },
  bookPrice: {
    type: Number,
  },
  isbnNumber: {
    type: Number,
    required: true,
  },
  authorName: {
    type: String,
  },
  publishedAt: {
    type: String,
  },
  publication: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
