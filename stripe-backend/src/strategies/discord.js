const passport = require("passport");
const { Strategy } = require("passport-discord");
const User = require("../database/models/User");
const { createStripeCustomer } = require("../utils/stripe");

passport.serializeUser((user, done) => {
  console.log("Serializing User");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing User");
  try {
    const userDB = await User.findOne({ id });
    return userDB ? done(null, userDB) : done(null, null);
  } catch (err) {
    console.log(err);
    return done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ["email", "identify"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, id } = profile;
      try {
        const userDB = await User.findOne({ id });
        if (!userDB) {
          console.log("User was not found. Creating...");
          const stripeCustomer = await createStripeCustomer({ email });
          const newUser = await User.create({
            id,
            email,
            customer: { stripeId: stripeCustomer.id },
          });
          return done(null, newUser);
        }
        console.log("User was found.");
        return done(null, userDB);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
