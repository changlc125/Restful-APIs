const { Article } = require('../model');
exports.listAtl = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0, tag, author } = req.query;

    const filter = {};

    if (tag) {
      filter.tagList = tag;
    }
    if (author) {
      const user = await User.findOne({ username: author });
      filter.author = user ? user._id : null;
    }

    const articles = await Article.find(filter)
      .skip(Number.parseInt(offset))
      .limit(Number.parseInt(limit))
      .sort({ createAt: -1 });
    const articlesCont = await Article.countDocuments();

    res.status(200).json({
      articles,
      articlesCont,
    });
  } catch (err) {
    next(err);
  }
};

exports.feedAtl = async (req, res, next) => {
  try {
    res.send('get /articles/feed');
  } catch (err) {
    next(err);
  }
};

exports.getAtl = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId).populate(
      'author'
    );
    if (!article) {
      return res.status(404).end();
    }
    res.status(200).json({
      article,
    });
  } catch (err) {
    next(err);
  }
};

exports.createAtl = async (req, res, next) => {
  try {
    const article = new Article(req.body.article);

    article.author = req.user._id;
    article.populate('author');
    await article.save();

    res.status(201).json({
      article,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAtl = async (req, res, next) => {
  try {
    const article = req.article;
    const bodyArticle = req.body.article;
    article.title = bodyArticle.title || article.title;
    article.description = bodyArticle.description || article.description;
    article.body = bodyArticle.body || article.body;
    await article.save();
    res.status(200).json({
      article,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAtl = async (req, res, next) => {
  try {
    console.log(req.article);
    const article = req.article;
    await article.remove();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.addComments = async (req, res, next) => {
  try {
    res.send('post /articles/:slug/comments');
  } catch (err) {
    next(err);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    res.send('get /articles/:slug/comments');
  } catch (err) {
    next(err);
  }
};

exports.deleteComments = async (req, res, next) => {
  try {
    res.send('delete /articles/:slug/comments/:id');
  } catch (err) {
    next(err);
  }
};

exports.favoriteAtl = async (req, res, next) => {
  try {
    res.send('post /articles/:slug/favorite');
  } catch (err) {
    next(err);
  }
};

exports.unfavoriteAtl = async (req, res, next) => {
  try {
    res.send('delete /articles/:slug/favorite');
  } catch (err) {
    next(err);
  }
};
