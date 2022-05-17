const express = require('express');
const router = express.Router();

//users related routes
router.use(require('./user'));

// profiles related routes
router.use('/profiles', require('./profile'));

// articles related routes
router.use('/articles', require('./article'));

// tags related routes
router.use(require('./tag'));

module.exports = router;
