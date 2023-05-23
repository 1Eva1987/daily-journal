const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("viw engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
