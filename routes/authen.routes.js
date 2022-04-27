const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const User = require("../models/User.model");

const saltRounds = 10;

router.get("/register", (req,res,next) => {
    res.render("auth/register")
})
    
router.post("/register", (req,res,next) => {

    const {email, password} = req.body;  //object destructuring ES6 js

    bcryptjs.genSalt(saltRounds)
        .then(salt => {
            return bcryptjs.hash(password, salt);
        })
        .then( (hashedPassword) => {
            
            const userDetails = {
                email: email,
                passwordHash: hashedPassword
            }
            
           return User.create(userDetails);
        
        })
        .then( (userFromDB) => {
            res.send("user was created");
        })

        .catch(err => {
            console.log("error creating account", err);
            next(err)})

})



module.exports = router;