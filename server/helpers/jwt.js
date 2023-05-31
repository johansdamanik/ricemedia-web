const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

const encodeToken = (payload) => {
    return jwt.sign(payload, secret )
};

const decodeToken = (token) => {
    return jwt.verify(token, secret )
};

module.exports = {
    encodeToken,
    decodeToken
}