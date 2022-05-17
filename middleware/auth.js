const { verify } = require('../util/jwt');
const { jwtSecret } = require('../config/config.default');
const { User } = require('../model');

module.exports = async (req, res, next) => {
  let token = req.headers['authorization'];
  // to check if there exist the token
  token = token ? token.split('Bearer ')[1] : null;
  // if not exist
  if (!token) {
    return res.status(401).end();
  }
  try {
    // to check if token is calid
    const decodedToken = await verify(token, jwtSecret);

    // add "record" to req.user
    req.user = await User.findById(decodedToken.userId);
    next();
  } catch (err) {
    return res.status(401).end();
  }
};
