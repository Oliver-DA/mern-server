const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const { authUser, authenticateUser } = require("../controllers/authController");

router.post("/", authUser)


router.get("/", 
    auth,
    authenticateUser
)


module.exports = router