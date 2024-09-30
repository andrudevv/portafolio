
const {config} = require('../config/config.js');
const jwt = require('jsonwebtoken');

function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwtSecret, { expiresIn: 60 * 60 }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}


function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}
module.exports ={createAccessToken, verifyToken }