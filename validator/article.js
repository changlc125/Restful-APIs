const mongoose = require('mongoose');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');
const { Article } = require('../model');

exports.createArticle = validate([
  body('article.title')
    .notEmpty()
    .withMessage('The title of article can not be empty'),
  body('article.description')
    .notEmpty()
    .withMessage('The description of article can not be empty'),
  body('article.body')
    .notEmpty()
    .withMessage('The content of article can not be empty'),
]);

exports.getArticle = validate([
  validate.isValidObjectId(['params'], 'articleId'),
  // param("articleId").custom(async (value) => {
  //   if (!mongoose.isValidObjectId(value)) {
  //     return Promise.reject("ID is not valid ");
  //   }
  // }),
]);

exports.updateArticle = [
  // 1 to check if ObjectID is valid
  validate([validate.isValidObjectId(['params'], 'articleId')]),
  // 2 to check if there exit the article we are looking for
  async (req, res, next) => {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId);
    req.article = article;
    if (!article) {
      return res.status(404).end();
    }
    next();
  },
  // 3 to check if author of the article is the same as the current user
  async (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      return res.status(403).end();
    }
    next();
  },
];

exports.deleteArticle = exports.updateArticle;
