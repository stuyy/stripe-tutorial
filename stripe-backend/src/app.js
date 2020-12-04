require("dotenv").config();
require("./strategies/discord");
const express = require("express");
const session = require("express-session");
const SessionStore = require("connect-mongo");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const routes = require("./routes");
const { createSubscription } = require("./utils/stripe");
const app = express();

const MongoStore = SessionStore(session);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3001;

// Registering Middleware for Parsing Request Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Registering Session Middleware
app.use(
  session({
    cookie: {
      maxAge: 3600000 * 24,
    },
    saveUninitialized: false,
    resave: false,
    secret: "basjhdbasjhasdbasjdbasduh",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

app.listen(PORT, () => console.log(`Listening to requests on Port ${PORT}`));
