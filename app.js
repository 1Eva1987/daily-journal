require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// connecting to mongoDB
mongoose
  .connect(process.env.MONGODB_CON, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("conected to mongoDB"))
  .catch((err) => "there is a problem conecting to mongoDB: " + err);

postSchema = {
  name: String,
  text: String,
};
const Post = mongoose.model("Post", postSchema);

const homeContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet deserunt repellendus illo nostrum aliquam laboriosam reiciendis illum fuga quos ea enim, et doloribus doloremque officia labore voluptate quaerat excepturi!";
const aboutContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet deserunt repellendus illo nostrum aliquam laboriosam reiciendis illum fuga quos ea enim, et doloribus doloremque officia labore voluptate quaerat excepturi!";
const contactContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet deserunt repellendus illo nostrum aliquam laboriosam reiciendis illum fuga quos ea enim, et doloribus doloremque officia labore voluptate quaerat excepturi!";

app.get("/", (req, res) => {
  Post.find({})
    .then((posts) => {
      res.render("home", {
        homeText: homeContent,
        postsArray: posts,
        lodash: _,
      });
    })
    .catch((err) => console.log(err));
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
  const postTitle = req.body.title;
  const postText = req.body.textarea;
  const post = new Post({ name: postTitle, text: postText });
  post
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.get("/posts/:post", (req, res) => {
  console.log(req.params.post);
  Post.find({}).then((posts) => {
    for (let i = 0; i < posts.length; i++) {
      if (
        _.replace(posts[i].name, " ", "-").toLocaleLowerCase() ===
        req.params.post
      ) {
        res.render("post", {
          postTitle: posts[i].name,
          postText: posts[i].text,
        });
      }
    }
  });
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
