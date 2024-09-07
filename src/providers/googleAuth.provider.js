const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
require("dotenv").config();

const googleOptions = {
  clientID: `${process.env.GOOGLE_CLIENT_ID}`,
  clientSecret: `${process.env.GOOGLE_CLIENT_SECRET_KEY}`,
  callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
};

passport.use(
  new GoogleStrategy(
    {
      ...googleOptions,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { profile, accessToken });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
