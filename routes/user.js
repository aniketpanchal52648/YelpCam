const express = require('express');

const router = express.Router();
const passport = require('passport')
const User = require('../controllers/user');
router.get('/register', User.renderPage);
router.post('/register', User.postRegisterRequest);

module.exports.userRoute = router;