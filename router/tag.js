const express = require('express');
const router = express.Router();
const tagCtrl = require('../controller/tag');
// Get Tags
router.get('/tags', tagCtrl.showTag);

module.exports = router;
