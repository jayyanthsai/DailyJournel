//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = " journal is a record that stores every details of your life ranging from events, ideas, feelings, and your daily thoughts and memories.The journal is a diary you keep of daily events or of your thoughts or a publication dealing with a specific industry or field.";
const aboutContent = "We the team of code predators.We developed a web application which is very useful to record your daily experiences and wonderfull activities very easily !!.To develop this technologies like 'HTML',  'CSS',  'JS',    'Nodemon',  'Embedded JavaScript(i.e. EJS)',   'MONGOOSE(MongoDB)',  and  'Node as Backend'.";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};
const subscribingSchema = {
  firstName: String,
  lastName: String,
  email: String
};

const Post = mongoose.model("Post", postSchema);

const Post2 = mongoose.model("Post2", subscribingSchema);

app.get("/home", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});
app.get("/", function(req, res){
  res.render("signup");
  // Post.find({}, function(err, posts){
  //   res.render("home", {
  //     startingContent: homeStartingContent,
  //     posts: posts
  //     });
  // });
});
app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const secondName = req.body.lName;
  const email = req.body.email;
  const listId = "8a725d2f95";

  const post2 = new Post2({
    firstName: firstName,
    lastName: secondName,
    email: email
  });
  post2.save();
  res.redirect("/home");
});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/home");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent,contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
