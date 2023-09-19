const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = 
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done)   =>  {
        try {
            const user = await User.findOne({ email });
    
            if (!user) {
              return done(null, false, { message: "User not found" });
            }
    
            const passwordMatch = await bcrypt.compare(password, user.password);
    
            if (!passwordMatch) {
              return done(null, false, { message: "Invalid password" });
            }
    
            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
    
  )
);
