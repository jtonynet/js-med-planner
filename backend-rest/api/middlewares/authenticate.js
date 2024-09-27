const { StatusCodes } = require('http-status-codes');
const { verify, decode } = require('jsonwebtoken');
const jsonSecret = process.env.JSON_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'unauthorized'
    });
  }

  const [, accessToken] = token.split(" ");

  try {
    verify(accessToken, jsonSecret);

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
