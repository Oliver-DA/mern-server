const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

    const token = req.header("x-auth-token");
    
    if (!token) {
        return res.status(401).json({msg: "There is no token"})
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified.user;
        next();

    }catch(err) {
        res.status(401).json({ msg: "Invalid token"})
    }

}