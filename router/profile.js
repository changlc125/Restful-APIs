const express = require('express');
const router = express.Router();
const profileCtrl = require('../controller/profile');
// Get Profile
router.get('/:username', profileCtrl.getProfile);

// Follow user
router.post('/:username/follow', profileCtrl.followUser);

// Unfollow user
router.delete('/:username/follow', profileCtrl.deleteUser);

module.exports = router;
