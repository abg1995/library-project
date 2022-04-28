const router = require("express").Router();
const Author = require("../models/author.model")

const {isLoggedIn} = require("../middleware/route-guard")

//AUTHORS LIST ROUTES 

router.get("/authors",isLoggedIn, (req,res,next) => {


    Author.find()

        .then((authorsArr) => {
            res.render("authors/authors-list", {authors: authorsArr})} )
        .catch(err => console.log("there was an error: ", err))
})




module.exports = router;