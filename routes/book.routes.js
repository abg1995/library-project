const Book = require("../models/Book.model");
const router = require("express").Router();
const Author = require("../models/author.model")


// READ ROUTES
router.get("/books", (req,res,next) => {
    Book.find()//always returns an array
        .populate('author') 
        .then( (booksArr) => {
            res.render("books/books-list",{books: booksArr})
        })
        .catch(err => console.log("ther is an error",err))
});

//We place this one before the one below because in JS READING ORDER MATTERS

// CREATE ROUTES
router.get("/books/create", (req,res,next)  => {

    Author.find()

    .then((authorsArr) => {
        res.render("books/books-create", {authors: authorsArr})
    })
    .catch(err => {
        console.log("error getting authors from DB", err)
        next(err);
    })

})

router.post("/books/create", (req,res,next) => {
    
    //create a object in var/const instead of putting req.body to be more specific with info from form 
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
        .populate('author') 
        .then((bookDetails) => {
            res.render("books/book-details",bookDetails)  //put the object to send more information, changed to follow the excercise like everyone 
        })
        .catch( err => {
            console.log("!error getting book details from DB", err)
            next(err);
        });
})

//UPDATE ROUTES


router.get("/books/:bookId/edit", (req, res, next) => {

    const id = req.params.bookId;
    Book.findById(id)
        .then((bookDetails) => {
            
            res.render("books/book-edit", bookDetails);
        })
        .catch(err => {
            console.log("error getting book details from DB", err)
            next(err);
        });
});


router.post("/books/:bookId/edit", (req,res,next) => {

    const id =  req.params.bookId;

    const newDetails = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating
    }

    Book.findByIdAndUpdate(id, newDetails)
    .then((bookFromDB) => {
        res.redirect(`/books/${bookFromDB._id}`)
    })
    .catch(err => {
        console.log("error updating book details from DB", err)
        next(err);
    });
})

// DELETE ROUTE 

router.post("/books/:bookId/delete", (req,res,next) => {
    const id = req.params.bookId;

    Book.findByIdAndRemove(id)
    .then( response => {
        res.redirect("/books")
    })
    .catch(err => console.log("error deleting from DB: ", err))
})


module.exports = router;