const {userService} = require("../services");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");

module.exports = function (passport){

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userService.getUserById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


// ----------------------
// Local Strategy (email/password)
// ----------------------

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        // Check if the user exists
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));


// ----------------------
// Google Strategy
// ----------------------

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:4000/v1/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists
        let user = await userService.findOrCreateOAuthUser(profile, "google");

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

}
