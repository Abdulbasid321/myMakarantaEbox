const jwt = require('jsonwebtoken');
const { unauthorized, badRequest } = require('../helpers/AppResponse');

const jwtVerify = (req, res, next) => {
  const token = req?.header('Authorization')?.split(' ')[1];

  if (!token) {
    unauthorized(res, 'Unauthorized.');
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      unauthorized(res, 'Invalid token.');
    }

    req.user = verifiedToken;
    next();
  } catch (error) {
    unauthorized(res, 'Invalid token');
  }
};

module.exports = { 
  jwtVerify
};