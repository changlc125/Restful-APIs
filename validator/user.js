// body = body inside req
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { User } = require('../model');
const md5 = require('../util/md5');

exports.register = validate([
  body('user.username')
    .notEmpty()
    .withMessage('User name can not be empty')
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject('The user name already exists');
      }
    }),

  body('user.password').notEmpty().withMessage('Password cannot be empty'),

  body('user.email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Please enter a correct email')
    .bail() // if wrong， it wont continue
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        return Promise.reject('The Email already exists');
      }
    }),
]);

// 3 middleware
exports.login = [
  // 1
  validate([
    body('user.email').notEmpty().withMessage('Email cannot be empty'),
    body('user.password').notEmpty().withMessage('Password cannot be empty'),
  ]),
  // 2 to check if the user name already exists
  validate([
    body('user.email').custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select([
        'email',
        'password',
        'username',
        'bio',
        'image',
      ]);
      if (!user) {
        return Promise.reject('The user dose not exist');
      }
      // if there exits the user,add the user (as an attribute) to req object
      req.user = user;
    }),
  ]),
  // 3 to check if password is correct
  validate([
    body('user.password').custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject('Please enter a correct password');
      }
    }),
  ]),
];
