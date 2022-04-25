const Book = require("../models/Book.model");
const router = require("express").Router();

router.get("/books", (req,res,next) => {
    Book.find() //always returns an array
    .then( (booksArr) => {
        res.render("books/books-list",{books: booksArr})
    })
    .catch(err => console.log("ther is an error",err))
});

//We place this one before the one below because in JS READING ORDER MATTERS


router.get("/books/create", (req,res,next)  => {
    res.render("books/books-create")
})

router.post("/books/create", (req,res,next) => {
    
    //create a object i¡in var instead of putting req.boy to be more specific
    const newBook = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        rating: req.body.rating,
    }
            Book.create(newBook)
            .then((bookFromDB) => {
                    res.redirect("/books")
            })
            .catch( err => {
                console.log("error creating book from DB", err)
                next(err);
            });
})



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