
const Jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { config } = require('../config/config');

const authRequiredUser = (req, res, next) => {
  cookieParser()(req, res, () => {
    const tokenUser = req.cookies.tokenUser;
    if (!tokenUser)
      return res.status(401).json({
        message: "no esta autorizado su ingreso",
      });
    Jwt.verify(tokenUser, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Token invalido.",
        });
      }
      req.user = user;
      next();
    });
    // const token = req.cookies.token;
  });
};


const authRequiredClient = (req, res, next) => {
  cookieParser()(req, res, () => {
    const tokenClient = req.cookies.tokenClient;
    if (!tokenClient)
      return res.status(401).json({
        message: "no esta autorizado su ingreso",
      });
    Jwt.verify(tokenClient, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "invalid token",
        });
      }
      req.user = user;
      next();
    });
    // const token = req.cookies.token;
  });
};
module.exports = {authRequiredUser, authRequiredClient};