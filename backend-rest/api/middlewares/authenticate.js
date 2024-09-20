const { StatusCodes } = require('http-status-codes');
const { verify, decode } = require('jsonwebtoken');
const jsonsecret = require('../config/jsonSecret');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'unauthorized'
    });
  }

  const [, accessToken] = token.split(" ");

  try {
    verify(accessToken, jsonsecret.secret);

    const { uuid, email } = await decode(accessToken);

    req.userUUID = uuid;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'unauthorized'
    });
  }
};
