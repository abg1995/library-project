
const router = require("express").Router();
const bcryptjs = require('bcryptjs');

const User = require("../models/User.model");


const saltRounds = 10; // 10 extra random characters that get added to your length password. If pasword is 8 char, total length of salt is 18 + the original length  when hashed #


//REGISTRATION: display form
router.get("/register",(req, res, next) => {
    res.render("auth/register");
});

//REGISTRATION: process form
router.post("/register", (req, res, next) => {
    
    const { email, password } = req.body; //equivalent to const email = req.body.email & const password = req.body.password

    if( !email || !password){
        res.render("auth/register", {errorMessage: "Please provide email and password"});
        return; 
    }

    bcryptjs
        .genSalt(saltRounds)  //can put a number otherwise or in this case the variable from line 7
        .then( salt => {
            return bcryptjs.hash(password, salt);
        })
        .then( hash => {

            const userDetails = {
                email, // if key and value are same name you can declare once, same as email: email
                passwordHash: hash
            }

            return User.create(userDetails)
        })
        .then( userFromDB => {
            res.redirect("/login")
        })
        .catch( error => {
            console.log("error creating account", error);
            next(error);
        });

});


//LOGIN: display form
router.get("/login", (req, res, next) => {
    res.render("auth/login");
})

//LOGIN: process form
router.post("/login", (req, res, next) => {

    const {email, password} = req.body;

    if( !email || !password){
        res.render("auth/login", {errorMessage: "Please provide email and password"});
        return;
    }

    User.findOne({email: email})
        .then( userFromDB => {
            if( !userFromDB ) {
                //user doesn't exist
                res.render('auth/login', { errorMessage: 'Incorrect credentials (no user with that email address).' });
                return;
            } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)) {
                //login sucessful
                req.session.currentUser = userFromDB;

                res.redirect("/user-profile");
            } else {
                //login failed (password doesn't match)
                res.render('auth/login', { errorMessage: 'Incorrect credentials.' });
            }
        })
        .catch( error => {
            console.log("Error getting user details from DB", error);
            next(error);
        });
})


//PROFILE PAGE

router.get('/user-profile', (req, res, next) => {
    res.render('auth/user-profile');
});
//LOGOUT
router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {     //Destroy built in function on express session package to log out
        if (err){ 
         next(err)
        };
        res.redirect('/');
    });
});

module.exports = router;