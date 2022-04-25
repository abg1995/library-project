const Book = require("../models/Book.model");
const router = require("express").Router();

router.get("/books", (req,res,next) => {
    Book.find() //always returns an array
    .then( (booksArr) => {
        res.render("books/books-list",{books: booksArr})
    })
    .catch(err => console.log("ther is an error",err))
});

router.get("/books/:bookId", (req,res,next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .then((bookDetails) => {
            res.render("books/book-details",{book:bookDetails})  //put the object to send more information
        })
        .catch( err => {
            console.log("!error getting book details from DB", err)
            next(err);
        });
})


module.exports = router;