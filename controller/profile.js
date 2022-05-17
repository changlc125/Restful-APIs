exports.getProfile = async (req, res, next) => {
  try {
    res.send('get /profile/:username');
  } catch (err) {
    next(err);
  }
};

exports.followUser = async (req, res, next) => {
  try {
    res.send('post /profile/:username/follow');
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    res.send(`delete /pr ofile/:username/follow`);
  } catch (err) {
    next(err);
  }
};
