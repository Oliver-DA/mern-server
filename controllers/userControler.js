const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: "This user already exists" })
        }

        user = new User(req.body);
        user.password = await bcrypt.hash(password, 10)

        await user.save();

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

       
    } catch(err) {
        console.log(err);
        res.status(400).send("An error has occured");
    }

}