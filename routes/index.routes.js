const app = require("../app");
const Book = require("../models/Book.model");
const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



module.exports = router;
