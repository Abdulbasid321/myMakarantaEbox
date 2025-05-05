const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "../config/config.env" });
const JWT_SECRET_KEY = process.env.JWT_SECRET;

const genAccessToken = (payload) => {
    const token = jwt.sign(
        payload,
        JWT_SECRET_KEY,
        {
            expiresIn: "30 days"
        }
    );

    return token;
}

const genRefreshToken = (payload) => {
    const token = jwt.sign(
        payload,
        JWT_SECRET_KEY,
        {
            expiresIn: "1 year"
        }
    );

    return token;
}

module.exports = {
    genAccessToken,
    genRefreshToken
}