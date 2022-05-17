const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // buit in method

exports.sign = promisify(jwt.sign);
exports.verify = promisify(jwt.verify);
exports.decode = promisify(jwt.decode);
