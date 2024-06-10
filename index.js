const express = require("express");
const connectToDatabase = require("./database/DbConnection");
const Book = require("./Model/bookModel");
const app = express();
const { storage } = require("./middleware/multerConfig");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ storage: storage });
const cors = require("cors");
const cron = require("node-cron");
// const backendUrl = require("./config");

cron.schedule(" */15 * * * *", () => {
  console.log("running");
});
//cors package
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
connectToDatabase();
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success",
  });
});

app.post("/book", upload.single("image"), async (req, res) => {
  console.log(req.file);
  let fileName;
  if (!req.file) {
    fileName =
      "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png";
  } else {
    fileName = "https://lms-server-v1j9.onrender.com/" + req.file.filename;
  }

  const {
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
  } = req.body;

  await Book.create({
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
    imageUrl: fileName,
  });
  res.json({
    message: "Book Created Successfully",
  });
});

//all read
app.get("/book", async (req, res) => {
  const books = await Book.find(); //return array garxa
  res.status(200).json({
    message: "Books Fetched Successfully",
    data: books,
  });
});

//single read
app.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id); //return object garxa
    if (!book) {
      res.status(404).json({
        message: "Nothing found",
      });
    } else {
      res.status(200).json({
        message: "Single Book Fetched Successfully",
        data: book,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

//delete Operation
app.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  const oldData = await Book.findById(id);
  const ImagePath = oldData.imageUrl;
  console.log(req.get("host"));
  const localHostUrlLength = "https://lms-server-v1j9.onrender.com/".length;
  // const localHostUrlLength = `${req.protocol}://${req.get("host")}/`.length;
  const newImagePath = ImagePath.slice(localHostUrlLength);

  fs.unlink(`storage/${newImagePath}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Book deleted successfully");
    }
  });
  await Book.findByIdAndDelete(id);
  res.status(200).json({
    message: "Book Deleted Successfullly",
  });
});

//update Operation in lms
app.patch("/book/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id; //kun book update garney id jun cahi request ma aako

  const {
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
  } = req.body;
  const oldData = await Book.findById(id);
  let fileName;
  if (req.file) {
    const oldImagePath = oldData.imageUrl;
    console.log(oldImagePath);
    const localHostUrlLength = "https://lms-server-v1j9.onrender.com/".length;
    const newOldImagePath = oldImagePath.slice(localHostUrlLength);
    console.log(newOldImagePath);
    fs.unlink(`storage/${newOldImagePath}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file deleted successfully");
      }
    });
    fileName = "https://lms-server-v1j9.onrender.com/" + req.file.filename;
  }

  await Book.findByIdAndUpdate(id, {
    bookName: bookName, //agadiko bookname database ma update hune ra paxadiko bookName body request batw aako
    bookPrice: bookPrice,
    isbnNumber: isbnNumber,
    authorName: authorName,
    publishedAt: publishedAt,
    publication: publication,
    imageUrl: fileName,
  });
  res.status(200).json({
    message: "Book Updated Successfullly",
  });
});

app.use(express.static("./storage/"));
app.listen(3000, () => {
  console.log("server started at port 3000");
});
