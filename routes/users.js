const express = require("express");
const { createUser } = require("../controllers/userControler");
const router = express.Router();
const { check } = require("express-validator");

router.post("/", 
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Add avalid email").isEmail(),
        check("password", "Password must be at least 6 characters long").isLength({ min: 6})
    ],
    createUser
)


module.exports = router