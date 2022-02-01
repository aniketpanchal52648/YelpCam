const express = require('express');
// const user=require('../models/user');
const router = express.Router();
const passport = require('passport');
const login = require('../controllers/login');

router.get('/login', login.renderLoginPage);
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), login.sendLoginRequest);
router.get('/logout', login.logout);
module.exports.loginRoute = router;