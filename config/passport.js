const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        User.findByEmail(email, (err, user) => {
            if (err) return done(err);
            if (!user) {
                return done(null, false, { message: 'Email not registered' });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return done(err);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            });
        });
    }
));

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/api/facebook/callback',
        profileFields: ['id', 'displayName', 'emails']
    },
    (accessToken, refreshToken, profile, done) => {
        User.findByFacebookId(profile.id, (err, user) => {
            if (err) return done(err);
            if (!user) {
                const newUser = {
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    facebookId: profile.id,
                    role: 'user' // Default role for new users
                };
                User.add(newUser, (err, addedUser) => {
                    if (err) return done(err);
                    return done(null, addedUser);
                });
            } else {
                return done(null, user);
            }
        });
    })
);

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findByGoogleId(profile.id, (err, user) => {
            if (err) return done(err);
            if (!user) {
                const newUser = {
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    role: 'user' // Default role for new users
                };
                User.add(newUser, (err, addedUser) => {
                    if (err) return done(err);
                    return done(null, addedUser);
                });
            } else {
                return done(null, user);
            }
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);  // Assuming `user.id` is a unique identifier
  });

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});

module.exports = passport;