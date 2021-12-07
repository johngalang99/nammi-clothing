const jwt = require('jsonwebtoken');

// Is there a token?
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(
            token.slice(7, token.length),
            process.env.JWT_SECRET,
            (error, user) => {
                if (error) {
                    res.status(403).json('Invalid Token!');
                } else {
                    req.user = user;
                    next();
                }
            }
        );
    } else {
        return res.status(401).json('No authentication!');
    }
};

// Authenticated or Admin
const verifyTokenAndAuth = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('Not authenticated!');
        }
    });
};

// Admin only
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('Not an admin!');
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
