require("dotenv").config();
require("./config/database").connect();
const User = require("./models/user");
const express = require("express");
const authentication = require("./controllers/authentication");
const users = require("./controllers/users");
const passport = require("passport");


const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use("/", authentication);
app.use("/users", users);

app.get("/", (req, res) => {
    console.log("API Working");
    res.json({ message: "API Working" });
    });

// Register





module.exports = app;