exports.showTag = async (req, res, next) => {
  try {
    res.send('get /tags hello world');
  } catch (err) {
    next(err);
  }
};
