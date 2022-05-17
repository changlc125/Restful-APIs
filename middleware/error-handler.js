const util = require('util');
module.exports = () => {
  return (erro, req, res, next) => {
    console.log(erro);
    res.status(500).json({
      // convert erro to string
      error: util.format(erro),
    });
  };
};
