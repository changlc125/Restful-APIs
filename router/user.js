const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user');
const auth = require('../middleware/auth');
const userValidator = require('../validator/user');

// User login
router.post('/users/login', userValidator.login, userCtrl.login);

//User registry
router.post('/users', userValidator.register, userCtrl.registry);

//get current user
router.get('/user', auth, userCtrl.getCurrentUser);

//update current user
router.put('/user', auth, userCtrl.updateCurrentUser);

module.exports = router;
