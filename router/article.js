const express = require('express');
const router = express.Router();
const articleCtrl = require('../controller/article');
const articleValidator = require('../validator/article');
const auth = require('../middleware/auth');
// List Articles
router.get('/', articleCtrl.listAtl);

// Feed Articles
router.get('/feed', articleCtrl.feedAtl);

// Get Article
router.get('/:articleId', articleValidator.getArticle, articleCtrl.getAtl);

// Create Article
router.post('/', auth, articleValidator.createArticle, articleCtrl.createAtl);

// Update Article
router.put(
  '/:articleId',
  auth,
  articleValidator.updateArticle,
  articleCtrl.updateAtl
);

// Delete Article
router.delete(
  '/:articleId',
  auth,
  articleValidator.deleteArticle,
  articleCtrl.deleteAtl
);

// Add Comments to an Article
router.post('/:articleId/comments', articleCtrl.addComments);

// Get Comments from an Article
router.get('/:slug/comments', articleCtrl.getComments);

// Delete Comment
router.delete('/:slug/comments/:id', articleCtrl.deleteComments);

// Favorite Article
router.post('/:slug/favorite', articleCtrl.favoriteAtl);

// Unfavorite Article
router.delete('/:slug/favorite', articleCtrl.unfavoriteAtl);

module.exports = router;
