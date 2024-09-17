import express from "express";
import bodyParser from "body-parser";

// initialize express and port 3000
const app = express();
const port = 3000;

// use middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// set posts array
let posts = [];

// set app.get for the root route
app.get("/", (req, res) => {
  // render the index.ejs
  res.render("index.ejs", { posts: posts });
});

// set app.post for the root route
app.post("/submit", (req, res) => {
  // get data from form
  const data = {
    title: req.body["title"],
    CreatorName: req.body["CreatorName"],
    time: new Date().toLocaleString(),
    content: req.body["content"],
  };
  // add data to posts array using push method
  posts.push(data);
  // redirect to the root route
  res.redirect("/");
});

// delete post
app.post("/delete", (req, res) => {
  // get the id of the post to delete
  const id = req.body.data;
  // check if id is valid
  if (id != 0) {
    // delete the post
    posts.splice(id, 1);
  }
  // redirect to the root route
  res.redirect("/");
});

// set app.get for the edit route
app.get("/edit", (req, res) => {
  // get the id from the edit button
  const id = req.body.data;
  // render the edit.ejs with the id and posts array
  res.render("edit.ejs", { id: id, posts: posts });
});

// edit post
app.post("/edit", (req, res) => {
  // get data from form
  const data = {
    title: req.body["title"],
    CreatorName: req.body["CreatorName"],
    time: new Date().toLocaleString(),
    content: req.body["content"],
  };
  // update the post
  posts[data] = data;
  // redirect to the root route
  res.redirect("/");
});

// Listen on port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
