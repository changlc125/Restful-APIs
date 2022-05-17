const crypto = require('crypto');

module.exports = (str) => {
  return crypto
    .createHash('md5')
    .update('yk' + str) //yk can be any string, in order to be more safe
    .digest('hex');
};
