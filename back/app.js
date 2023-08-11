require("dotenv").config();
require("./config/database").connect();
const User = require("./models/user");
const express = require("express");
const authentication = require("./controllers/authentication");


const app = express();

app.use(express.json());
 app.use("/", authentication);

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
    });

// Register





module.exports = app;