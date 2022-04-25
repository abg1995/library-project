const Book = require("../models/Book.model");
const router = require("express").Router();

router.get("/books", (req,res,next) => {
    Book.find() //always returns an array
    .then( (booksArr) => {
        res.render("books/books-list",{books: booksArr})
    })
    .catch(err => console.log("ther is an error",err))
});




module.exports = router;