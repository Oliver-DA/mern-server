const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ msg: "User does not exists"})
        }

        const correctPassword = await bcrypt.compare(password, user.password)

        if (!correctPassword) {
            return res.status(400).json({ msg:"Incorrect password"})
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.SECRET, 
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) {
                    throw err
                }
                res.status(201).json({ token })
            }
        )
        
    }catch(err) {
        console.log(err)
    }

}

exports.authenticateUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json({user});

    }catch(err) {
        console.log(err);
        res.status(500).send("There was an error")
    }
}