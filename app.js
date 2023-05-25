const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const homeContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet deserunt repellendus illo nostrum aliquam laboriosam reiciendis illum fuga quos ea enim, et doloribus doloremque officia labore voluptate quaerat excepturi!";
const aboutContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet deserunt repellendus illo nostrum aliquam laboriosam reiciendis illum fuga quos ea enim, et doloribus doloremque officia labore voluptate quaerat excepturi!";
const contactContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet deserunt repellendus illo nostrum aliquam laboriosam reiciendis illum fuga quos ea enim, et doloribus doloremque officia labore voluptate quaerat excepturi!";
const posts = [];

app.get("/", (req, res) => {
  res.render("home", { homeText: homeContent, postsArray: posts });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutText: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactText: contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = {
    postTitle: req.body.title,
    postText: req.body.textarea,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:post", (req, res) => {
  for (let i = 0; i < posts.length; i++) {
    if (
      _.replace(posts[i].postTitle, " ", "-").toLocaleLowerCase() ===
      req.params.post
    ) {
      res.render("post", {
        postTitle: posts[i].postTitle,
        postText: posts[i].postText,
      });
      console.log("match found");
    } else {
      console.log("no");
    }
  }
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
