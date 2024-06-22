const { verifyToken } = require("../services/jwtService");

function sessionMiddleware() {
    return function (req, res, next) {
        const token = req.cookies?.token;

        if (token) {
            try {
                const sessionData = verifyToken(token);
                req.user = {
                    email: sessionData.email,
                    _id: sessionData._id
                };
                res.locals.hasUser = true;
            } catch (err) {
                res.clearCookie('token');
            }
        }
        next();
    }
}

module.exports = { sessionMiddleware };