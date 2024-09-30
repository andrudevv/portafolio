
require('dotenv').config();
function checkApiKey(req, res, next) {
  const apiKey = req.headers["api"];
  if (apiKey === config.apikey) {
    next();
  } else {
    next(new Error("no autorizado"));
  }
}

function checkUser(req, res, next) {
  const user = req.user;
  if (user.hasOwnProperty('document')) {
    next();
  } else {
    next(new Error("no esta autorizado"));
  }
}


module.exports = {checkApiKey,checkUser };
