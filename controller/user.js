const { User } = require('../model');
const jwt = require('../util/jwt');
const { jwtSecret } = require('../config/config.default');

exports.login = async (req, res, next) => {
  try {
    //test error-handler middleware
    //JSON.parse('dsdsdsd');

    const user = req.user.toJSON();
    // generate token by userId
    const token = await jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: 15,
    });
    // not expose password to outside
    delete user.password;

    res.status(200).json({
      ...user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.registry = async (req, res, next) => {
  try {
    let user = new User(req.body.user);
    await user.save();
    user = user.toJSON();
    delete user.password;

    res.status(201).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCurrentUser = async (req, res, next) => {
  try {
    res.send('put user');
  } catch (err) {
    next(err);
  }
};
