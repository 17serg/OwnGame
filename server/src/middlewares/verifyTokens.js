const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyAccessToken = (req, res, next) => {
  try {
    console.log('Authorization header:', req.headers.authorization);
    const accessToken = req.headers.authorization.split(' ')[1]; // Bearer <token>
    console.log('Access token:', accessToken);
    const { user } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log('Decoded user:', user);
    res.locals.user = user;
    return next();
  } catch (error) {
    console.log('Invalid access token', error);
    return res.sendStatus(403);
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;

    return next();
  } catch (error) {
    console.log('Invalid refresh token', error);
    return res.clearCookie('refreshToken').sendStatus(401);
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
