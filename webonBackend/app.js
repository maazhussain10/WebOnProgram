const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const SigningUp = require("./routes/signup");
const LoggingIn = require("./routes/login");
const Account = require("./routes/account");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "Dwabzy Zaam Mr.Indolent nmpro",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1825 * 86400 * 1000,
      httpOnly: false,
    },
  })
);

app.get("/", function (req, res) {
  res.send("abcd");
  // res.sendFile(path.join(__dirname, build, "index.html"));
});

new SigningUp(app);
new LoggingIn(app);
new Account(app);

app.listen(5000, () => console.log("Running on port 5000"));