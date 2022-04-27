const router = require("express").Router();
const Author = require("../models/author.model")


//AUTHORS LIST ROUTES 

router.get("/authors", (req,res,next) => {


    Author.find()

        .then((authorsArr) => {
            res.render("authors/authors-list", {authors: authorsArr})} )
        .catch(err => console.log("there was an error: ", err))
})




module.exports = router;