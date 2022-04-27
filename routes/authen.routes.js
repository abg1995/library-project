const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const User = require("../models/User.model");

const saltRounds = 10;

router.get("/register", (req,res,next) => {
    res.render("auth/register")
})
    
router.post("/register", (req,res,next) => {

    const {email, password} = req.body;  //object destructuring ES6 js

    if ( !email || !password){
        res.render("auth/register", {errorMessage: "please provide email and password"});
        return;
    }

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

//LOGIN: display form
router.get("/login", (req, res, next) => {
    res.render("auth/login");
})

//LOGIN: display form

router.post("/login", (req,res,next) => {

    const {email, password} = req.body;

    if( !email||!password){
    res.render("auth/login", {errorMessage: 'Please provide email and password'});
    return;
    }

    User.findOne({email: email})
        .then( (userFromDB) => {
            if( !userFromDB ){
                res.render('auth/login', {errorMessage: 'Email is not registerede. Try with other email'});
                return;
            } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)) {
                res.send('login succesful')
            }else{
                res.render('auth/login', { errorMessage: 'Incorrect credentials'});
            }
        })
        .catch(err => {
            console.log("erro getting details from DB",error);
            next(error);
        });


})

module.exports = router;