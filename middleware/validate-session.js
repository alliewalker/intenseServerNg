//what makes the token and sends it back. React app stores that component for you to use again.
let jwt = require("jsonwebtoken");
let sequelize = require("../db");
let User = sequelize.import("../models/users");

module.exports = function (req, res, next) {
    if (req.method == "OPTIONS") {
        next()
    } else {
        let sessionToken = req.headers.authorization;
        if (!sessionToken || sessionToken === undefined) return res.status(403).send({ auth: false, message: "no token provided." })
        else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                        req.user = user;
                        next();
                    },
                        function () {
                            res.status(401).send({ error: "Not authorized" })
                        })
                } else {
                    res.status(400).send({ error: "Not authorized" })
                }
            })
        }
    }
}