// import express from "express";
const express = require('express');
const passport = require('passport');

const router = express.Router();
const AuthController = require('../controllers/auth');

router.get('/',AuthController.showForm);
router.post('/register',AuthController.Register);
router.post('/login',AuthController.Login);
// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/product');
});
// Facebook Auth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/api' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/product');
});

//OTP
router.route('/forgot-password')
.get(AuthController.showForgotForm)
.post(AuthController.sendOtp)

router.route('/reset-password')
.get(AuthController.showResetForm)
.post(AuthController.resetPass)

router.route('/verify-otp')
.get((req,res)=>{
    res.render('checkOtp');
})
.post(AuthController.checkOtp)

router.get('/logout', AuthController.Logout);

module.exports = router;