const express = require("express");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");
const routes = require("./routes");
const dotenv = require("dotenv");
const path = require("path");
const MongoStore = require("connect-mongo");
const ApiError = require("./utils/ApiError");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Default route
app.get("/", (req, res) => res.send("API Running"));

// Routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

module.exports = app;
