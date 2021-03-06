//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const { title } = require("process");
const _ = require('lodash');

const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://admin-ttran05:nhan0378798302@cluster0.owi72.mongodb.net/blogwebDB', {useNewUrlParser: true});

const items_schema = new mongoose.Schema({
  name: String,
  content: String
})

const Item = mongoose.model("Item", items_schema);


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function (req,res) {
  Item.find({}, function(err, posts){
    let titles =[]
    let contents =[]
    let id = []
    for (var i =0; i < posts.length; i++){
      titles.push(posts[i].name)
      contents.push(posts[i].content)
      id.push(posts[i]._id)
    }

    console.log(titles)
    console.log(contents)
    console.log(id)
    res.render("home",{
      homeStartingContent: homeStartingContent,
      titles :titles,
      contents:contents,
      id: id
    })
})
})


app.get("/about", function (req,res) {
  res.render("about",{aboutContent: aboutContent})
  
})

app.get("/contact", function (req,res) {
  res.render("contact",{contactContent: contactContent})
  
})
app.get("/compose", function (req,res) {
  res.render("compose",{contactContent: contactContent})
  
})

app.post("/compose", function (req,res) {
  const title = req.body.post_title
  const message = req.body.post_message
  const item = new Item({
    name: title,
    content: message
  })
  item.save()

  res.redirect("/")
})

app.get("/posts/:id", function (req, res) {
  var request_id = req.params.id
  console.log(req.params.id)
 
  Item.findOne({_id: request_id}, function(err, post){
    console.log(post)
    res.render("post", {
      title: post.name,
      content: post.content
    })
  })



  // for (var i=0; i <id.length; i++){
  //   console.log(id.length)
  //   if (_.lowerCase(titles[i])===request_title){
  //     console.log(content[i])
  //     res.render("post",{title: titles[i], content: content[i]})
  //     console.log(content[i])
  //   }
  // }
    
})









app.listen(3000, function() {
  console.log("Server started on port 3000");
})
